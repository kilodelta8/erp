![Not my picture and not sure who owns it, just found it in a google search and using it](assets/infographic-erp-modules.avif)

Not my image, I'm just bogarting it....(idgaf shoulder shrug)

# ERP System
ERP System: s a software solution that integrates and manages core business processes like finance, HR, manufacturing, supply chain, and sales, providing a centralized platform for data and operations across an organization.
As of right now I have zero intentions of developing this software any further than "Inventory Management", "Order Management" and certain parts of "Human Resources Management".  I originally just wanted an invenotry management system that I could use to track Vacuum Tube Guitar Amplifier Builds and Rebuilds as well as Vacuum Tube Radio Restoration parts.  I wanted to host it on an Rpi connected to my home network, proxied outward as well.

# React & PostGreSQL
Yep, I'm using React.  I am new to PostGresql.  It's already jacked my Mac once.

# The plan
Component Hierarchy and Structure
We can structure the React application using a hierarchical component tree. Here's a possible breakdown:
App
AuthContext Provider (for managing user authentication state)
Router (for navigation)
Login (for user login)
PrivateRoute (a wrapper component to protect routes that require authentication)
Layout (provides the basic page structure)
Header (navigation bar)
Sidebar (for navigation links)
Content (where the main content of each page is rendered)
Dashboard (overview of the system)
InventoryCategoriesPage
InventoryCategoriesList (displays a list of categories)
InventoryCategoryForm (for creating/editing categories)
InventoryItemsPage
InventoryItemsList (displays a list of inventory items)
InventoryItemForm (for creating/editing items)
InventoryItemDetails (displays details of a single item)
BOMsPage
BOMsList (displays a list of BOMs)
BOMForm (for creating/editing BOMs)
BOMDetails (displays details of a single BOM and its items)
UsersPage (Admin only)
UsersList (displays a list of users)
UserForm (for creating/editing users)
LaborEntriesPage
LaborEntriesList (displays a list of labor entries)
LaborEntryForm (for creating/editing labor entries)
CustomersPage
CustomersList (displays a list of customers)
CustomerForm (for creating/editing customers)
OrdersPage
OrdersList (displays a list of orders)
OrderForm (for creating/editing orders)
OrderDetails (displays details of a single order)
ReportsPage (for generating reports)
Component Details
Here's a more detailed look at some of the key components:
App:
The root component of the application.
Handles routing and authentication context.
AuthContext Provider:
Provides authentication state (e.g., current user, login status) to the application using React's Context API.
Router:
Uses React Router to handle navigation between different pages.
Login:
Displays the login form and handles user authentication.
Communicates with the /login API endpoint (which we'll need to create in the backend).
PrivateRoute:
A wrapper component that checks if the user is authenticated before rendering its child components.
Redirects unauthenticated users to the Login page.
Layout:
Provides the basic structure for all pages within the application.
Includes the Header, Sidebar, and Content components.
Header:
Displays the application header, navigation links, and user information.
Sidebar:
Provides navigation links to different sections of the application (e.g., Inventory, BOMs, Labor, etc.).
May display different links based on the user's role.
Content:
Renders the main content of each page.
Dashboard:
Displays an overview of the system, such as recent activity, inventory summaries, and upcoming orders.
InventoryCategoriesPage:
Renders the InventoryCategoriesList and InventoryCategoryForm components.
InventoryCategoriesList:
Displays a list of inventory categories in a table or grid.
Allows users to view, edit, and delete categories.
Fetches data from the /categories API endpoint.
InventoryCategoryForm:
Displays a form for creating or editing inventory categories.
Handles form submission and communicates with the /categories API endpoint.
InventoryItemsPage:
Renders the InventoryItemsList and InventoryItemForm components.
InventoryItemsList:
Displays a list of inventory items, possibly with filtering and sorting options.
Allows users to view, edit, and delete items.
Fetches data from the /inventory API endpoint.
InventoryItemForm:
Displays a form for creating or editing inventory items.
Handles form submission and communicates with the /inventory API endpoint.
InventoryItemDetails:
Displays detailed information about a single inventory item.
BOMsPage:
Renders the BOMsList and BOMForm components.
BOMsList:
Displays a list of BOMs.
Allows users to view, edit, and delete BOMs.
Fetches data from the /boms API endpoint.
BOMForm:
Displays a form for creating or editing BOMs.
Handles form submission and communicates with the /boms API endpoint.
BOMDetails:
Displays detailed information about a single BOM, including the list of items in the BOM.
Allows users to add, edit, and delete items from the BOM.
UsersPage:
Renders the UsersList and UserForm components (Admin only).
UsersList:
Displays a list of users.
Allows admins to view, edit, and delete users.
Fetches data from the /users API endpoint.
UserForm:
Displays a form for creating or editing users.
Handles form submission and communicates with the /users API endpoint.
LaborEntriesPage:
Renders the LaborEntriesList and LaborEntryForm components.
LaborEntriesList:
Displays a list of labor entries, possibly with filtering and sorting options.
Allows users to view, edit, and delete their own entries (and managers/admins to manage others' entries).
Fetches data from the /labor API endpoint.
LaborEntryForm:
Displays a form for creating or editing labor entries.
Handles form submission and communicates with the /labor API endpoint.
CustomersPage:
Renders the CustomersList and CustomerForm components.
CustomersList:
Displays a list of customers.
Allows users to view, edit, and delete customers.
Fetches data from the /customers API endpoint.
CustomerForm:
Displays a form for creating or editing customers.
Handles form submission and communicates with the /customers API endpoint.
OrdersPage:
Renders the OrdersList and OrderForm components.
OrdersList:
Displays a list of orders.
Allows users to view, edit, and delete orders.
Fetches data from the /orders API endpoint.
OrderForm:
Displays a form for creating or editing orders.
Handles form submission and communicates with the /orders API endpoint.
OrderDetails:
Displays detailed information about a single order.
ReportsPage:
Displays various reports, such as inventory reports, labor reports, and financial reports.
Fetches data from various API endpoints and performs calculations.
Data Flow
The React components will interact with the backend API to fetch and update data. Here's a general overview of the data flow:
Component Mount: When a component is mounted (e.g., InventoryItemsList), it will typically use useEffect to fetch data from the corresponding API endpoint (e.g., /inventory).
API Request: The component will use a library like axios or fetch to make an HTTP request to the API.
API Response: The API will respond with JSON data.
State Update: The component will update its state with the received data, causing the UI to re-render.
User Interaction: When the user interacts with the component (e.g., clicks a button, submits a form), the component will call the appropriate API endpoint to perform the desired action (e.g., create a new item, update an existing item).
API Request: The component will make an HTTP request (e.g., POST, PUT, DELETE) to the API with the necessary data.
API Response: The API will respond with a status code and, optionally, updated data.
State Update (if necessary): The component may update its state based on the API response.
