// inventoryItems.js (or similar - adjust based on your backend framework)

import express from 'express';
const router = express.Router();
import db from '../db'; // Assuming you have a database connection setup

// 1. GET /inventory: Retrieves a list of all inventory items.
router.get('/', (_req, res) => {
  db.query('SELECT item_id, category_id, item_name, description, quantity, unit, price FROM inventory_items', (err, results) => {
    if (err) {
      console.error('Error fetching inventory items:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// 2. GET /inventory/{item_id}: Retrieves a specific inventory item by ID.
router.get('/:item_id', (req, res) => {
  const { item_id } = req.params;
  db.query('SELECT item_id, category_id, item_name, description, quantity, unit, price FROM inventory_items WHERE item_id = ?', [item_id], (err, results) => {
    if (err) {
      console.error('Error fetching inventory item:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(results.rows[0]);
  });
});

// 3. POST /inventory: Creates a new inventory item.
router.post('/', (req, res) => {
  const { category_id, item_name, description, quantity, unit, price } = req.body;
  if (!item_name || !category_id || quantity === undefined || price === undefined) {
    res.status(400).json({ error: 'Item name, category ID, quantity, and price are required' });
    return;
  }

  db.query('INSERT INTO inventory_items (category_id, item_name, description, quantity, unit, price) VALUES (?, ?, ?, ?, ?, ?)',
    [category_id, item_name, description, quantity, unit, price],
    (err, results) => {
      if (err) {
        console.error('Error creating inventory item:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const insertedId = results.rows?.[0]?.item_id || null; // Adjust based on your database library
      db.query('SELECT item_id, category_id, item_name, description, quantity, unit, price FROM inventory_items WHERE item_id = ?', [insertedId], (err2, results2) => {
        if(err2){
          console.error('Error retrieving created item', err2);
          res.status(500).json({error: 'Internal Server Error'})
          return;
        }
        res.status(201).json(results2.rows[0]);
      })
    });
});

// 4. PUT /inventory/{item_id}: Updates an existing inventory item.
router.put('/:item_id', (req, res) => {
  const { item_id } = req.params;
  const { category_id, item_name, description, quantity, unit, price } = req.body;

  db.query('UPDATE inventory_items SET category_id = ?, item_name = ?, description = ?, quantity = ?, unit = ?, price = ? WHERE item_id = ?',
    [category_id, item_name, description, quantity, unit, price, item_id],
    (err, results) => {
      if (err) {
        console.error('Error updating inventory item:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (results.rowCount === 0) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      db.query('SELECT item_id, category_id, item_name, description, quantity, unit, price FROM inventory_items WHERE item_id = ?', [item_id], (err2, results2) => {
        if(err2){
          console.error('Error retrieving updated item', err2);
          res.status(500).json({error: 'Internal Server Error'})
          return;
        }
        res.json(results2.rows[0]);
      })
    });
});

// 5. DELETE /inventory/{item_id}: Deletes an inventory item.
router.delete('/:item_id', (req, res) => {
  const { item_id } = req.params;

  db.query('DELETE FROM inventory_items WHERE item_id = ?', [item_id], (err, results) => {
    if (err) {
      console.error('Error deleting inventory item:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.rowCount === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.status(204).send(); // 204 No Content
  });
});

module.exports = router;