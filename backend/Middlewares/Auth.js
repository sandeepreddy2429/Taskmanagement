// const jwt = require('jsonwebtoken')

// const ensureAuthenticated = (req, res, next) => {
//     const authHeader = req.header('Authorization'); // Get the Authorization header

//     if (!authHeader) {
//         return res.status(401).json({ message: 'Access denied, no token provided' });
//     }

//     const token = authHeader.split(' ')[1]; // Extract the token part after 'Bearer'
//     console.log('Token received by backend:', token); // Log the token received by backend

//     if (!token) {
//         return res.status(401).json({ message: 'Access denied, no token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using JWT_SECRET
//         req.user = decoded; // Attach the decoded user to the request object
//         next(); // Proceed to the next middleware
//     } catch (err) {
//         console.error('Token verification error:', err); // Log token verification error
//         return res.status(400).json({ message: 'Invalid token' });
//     }
// };

// module.exports = ensureAuthenticated;
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Get the Authorization header

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part after 'Bearer'
    console.log('Token received by backend:', token); // Log the token received by backend

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using JWT_SECRET
        req.user = decoded; // Attach the decoded user to the request object
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error('Token verification error:', err); // Log token verification error
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = ensureAuthenticated;

