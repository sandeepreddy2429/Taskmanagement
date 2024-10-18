import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';


 

function HomeAndTo() {
    const [loggedInUser, setLoggedInUser] = useState(''); // Stores the logged-in user's name
    const [tasks, setTasks] = useState([]); // Tasks for To-Do list
    const [taskInput, setTaskInput] = useState(''); // Input for new task
    const [completedCount, setCompletedCount] = useState(0); // Count of completed tasks
    const [uncompletedCount, setUncompletedCount] = useState(0); // Count of uncompleted tasks
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser')) // Get the logged-in user from localStorage
    }, []);

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('loggedInUser'); // Remove user data from localStorage
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login'); // Redirect to login page
        }, 1000);
    };

    // Handle To-Do List: Calculate completed and uncompleted tasks
    useEffect(() => {
        let completed = 0;
        let uncompleted = 0;
        tasks.forEach(task => {
            if (task.completed) {
                completed++;
            } else {
                uncompleted++;
            }
        });
        setCompletedCount(completed);
        setUncompletedCount(uncompleted);
    }, [tasks]);

    const addTask = () => {
        const trimmedTask = taskInput.trim();
        if (!trimmedTask) {
            alert('Please write down a task');
            return;
        }
        setTasks([...tasks, { text: trimmedTask, completed: false }]);
        setTaskInput('');
    };

    const Completed = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const editTask = (index, newText) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].text = newText;
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        if (window.confirm('you want to delete this task?')) {
            const updatedTasks = [...tasks];
            updatedTasks.splice(index, 1);
            setTasks(updatedTasks);
        }
    };

    return (
        <div>
            
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            <div className="container" class="w-16 md:w-32 lg:w-48">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Add Task"
                />
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className={task.completed ? 'completed' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => {
                                        Completed(index);
                                        setCompletedCount(prevCount => prevCount + (task.completed ? -1 : 1));
                                        setUncompletedCount(prevCount => prevCount + (task.completed ? 1 : -1));
                                    }}
                                />
                                <span>{task.text}</span>
                            </label>
                            
                            <button onClick={() => editTask(index, prompt('Edit task:', task.text))} style={{marginLeft:"20px"}}>
                           Edit
                                </button>
                             
                              

                               
                            <button onClick={() => deleteTask(index)} style={{marginLeft:"10px"}}>Delete</button>
                            
                        </li>
                    ))}
                </ul>
                <p>Completed: {completedCount}</p>
                <p>Uncompleted: {uncompletedCount}</p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default HomeAndTo;
