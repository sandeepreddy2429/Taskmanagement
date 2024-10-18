const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();

// Define the route for fetching products (this will be /products due to the mounting in index.js)
router.get('/', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---', req.user); // Log the authenticated user details
   
    
});

module.exports = router;
