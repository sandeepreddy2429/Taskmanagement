const Task = require('../Models/Task');

// Fetch tasks for the logged-in user
const getTasksForUser = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }); // Get tasks for this user
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Add a new task
const addTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = new Task({
            userId: req.user.id, // Associate task with the logged-in user
            title,
            description,
        });
        await newTask.save();
        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update or delete other task methods (e.g., mark as complete) similarly.
module.exports = { getTasksForUser, addTask };
