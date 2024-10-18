const express = require('express');
const { getTasksForUser, addTask } = require('../Controllers/TaskController');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = express.Router();

// Protected route to get tasks for the logged-in user
router.get('/', ensureAuthenticated, getTasksForUser);

// Protected route to add a new task
router.post('/', ensureAuthenticated, addTask);

module.exports = router;
