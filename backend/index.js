// const express = require('express');
 
// const bodyParser = require('body-parser');
 
// const cors = require('cors');
// //const dotenv= require('dotenv'); // Import dotenv to manage environment variables
// const AuthRouter = require('./Routes/AuthRouter'); // Authentication routes
// const ProductRouter = require('./Routes/ProductRouter'); // Product-related routes
 
// require('dotenv').config(); // Load environment variables from .env file

// // Initialize Express app
// const app = express();
// require('./Models/db'); // Ensure the database connection is established

// const PORT = process.env.PORT || 3000; // Set the port

// // Middleware

// app.use(bodyParser.json()); // Parse JSON bodies
// app.use(cors()); // Enable CORS

// const morgan = require('morgan');
// app.use(morgan('dev')); // Log requests to the console

// const helmet = require('helmet');
// app.use(helmet());

// // Health Check Route
// app.get('/ping', (req, res) => {
//     res.send('PONG');
// });

// // Define Routes
// app.use('/auth', AuthRouter); // Authentication routes
// app.use('/products', ProductRouter); // Product-related routes

// // Global error handler
 
// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const AuthRouter = require('./Routes/AuthRouter'); // Import Authentication routes
const ProductRouter = require('./Routes/ProductRouter'); // Import Product-related routes
const TaskRouter = require('./Routes/TaskRouter'); // Import Task routes
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();
require('./Models/db'); // Ensure the database connection is established

const PORT = process.env.PORT || 3000; // Set the port

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log requests to the console
app.use(helmet()); // Security headers
app.use('/tasks', TaskRouter);

// Health Check Route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Define Routes
app.use('/auth', AuthRouter); // Authentication routes
app.use('/products', ProductRouter); // Product-related routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
