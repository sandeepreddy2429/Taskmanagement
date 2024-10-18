// const express = require('express');
// const { signup, login } = require('../Controllers/AuthController'); // Import controller functions
// const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation'); // Import validation middleware

// const router = express.Router(); // Create a new router

// // Login route with validation
// router.post('/login', loginValidation, login);

// // Signup route with validation
// router.post('/signup', signupValidation, signup);

// // Export the router for use in the main app
// module.exports = router;
const express = require('express');
const { signup, login } = require('../Controllers/AuthController'); // Import controller functions
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation'); // Import validation middleware

const router = express.Router(); // Create a new router

// Login route with validation
router.post('/login', loginValidation, login);

// Signup route with validation
router.post('/signup', signupValidation, signup);

module.exports = router;
