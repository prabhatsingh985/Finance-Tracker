💰 Finance Tracker

Finance Tracker is a full-stack web application built using React, Express.js, and MongoDB that helps you manage and track your personal expenses. It includes functionality to add, update, delete, and visualize financial transactions. The user interface is built with modern styling using Tailwind CSS and shadcn/ui components to provide a clean and responsive experience.

The frontend is powered by Vite and structured using component-based architecture in React. It features a form for transaction entry, a transaction list with update/delete options, and a visual chart to show monthly expenses. On the backend, Express.js handles API routing and communicates with a MongoDB database for storing and retrieving transaction data.

To get started, clone the repository and set up both frontend and backend. First, navigate into the backend folder, install dependencies using npm install, and run the server using npm start. Make sure MongoDB is running locally or update your connection string in the .env file. Then, go to the frontend folder, run npm install, and start the development server using npm run dev. The app will be available at http://localhost:5173.

The application supports all CRUD operations through the following API endpoints: GET /api/transactions to fetch all transactions, GET /api/transactions/:id to fetch one, POST to add, PUT to update, and DELETE to remove a transaction.

This project is organized with a clear folder structure. The backend contains routes and the server configuration, while the frontend includes all components, UI elements, and service handlers. All UI components like cards, buttons, and inputs follow a consistent design pattern.

Additional planned features include user authentication, recurring transactions, and export to CSV. If shadcn CLI fails during component installation, you can manually copy components from the shadcn/ui GitHub repository or create your own using Tailwind CSS.
