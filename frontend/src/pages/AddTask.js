import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to add a task');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });
            const result = await response.json();
            if (result.success) {
                toast.success('Task added successfully');
            } else {
                toast.error(result.message || 'Failed to add task');
            }
        } catch (err) {
            toast.error('Error during task addition');
        }
    };

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Add Task</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddTask;
