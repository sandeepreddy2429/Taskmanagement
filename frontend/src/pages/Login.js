import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
 
 

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    // Handle login process
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from submitting

        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo) // Use dynamic loginInfo state
            });

            const result = await response.json();

            if (result.success && result.jwtToken) {
                localStorage.setItem('token', result.jwtToken); // Store the JWT token
                localStorage.setItem('loggedInUser', result.name); // Store the logged-in user details
                console.log('Token stored:', result.jwtToken); // Log the token for debugging
            
            
                handleSuccess('Login successful');
                setTimeout(() => navigate('/home'), 1000); // Redirect after success
            } else {
                handleError(result.message || 'Login failed');
            }
        } catch (err) {
            handleError('Error during login');
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        value={loginInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                     
                </div> 
                <button type='submit' > Login  </button>
               
  
  
 
              
                {/* <button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24"></svg>
 
</button> */}
                <span>
                    Don’t have an account? <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
