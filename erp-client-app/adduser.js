import { hash } from 'bcrypt';
import { createInterface } from 'readline';

async function encryptPasswordFromTerminal() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter password to encrypt: ', async (password) => {
    try {
      const saltRounds = 10;
      const hashedPassword = await hash(password, saltRounds);
      console.log('Encrypted password:', hashedPassword);
    } catch (error) {
      console.error('Error encrypting password:', error);
    } finally {
      rl.close();
    }
  });
}

encryptPasswordFromTerminal();






//INSERT INTO users (username, password, role, email)
//VALUES ('jdurham937', '$2b$10$dXjtoPjl0Vd/9u05eiH69OXu.y3JEt.V2gtEWBUTynNimtoYIbGWO', 'admin', 'jdurham937@gmail.com');