import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Authenticate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // State to store the authentication token
  const [token, setToken] = useState('');

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send authentication data to the server (implement this endpoint on the server)
      const response = await axios.post('/api/users/authenticate', formData);

      // Check if authentication is successful
      if (response.status === 200) {
        // Save the token to local storage and state for future requests
        const authToken = response.data;
        localStorage.setItem('token', authToken);
        setToken(authToken);

        // Show a SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          showConfirmButton: false,
          timer: 1500,
        });

        // Navigate to the dashboard or other authenticated page
        navigate('/dashboard');
      } else {
        // Handle authentication failure
        console.error('Authentication failed:', response.data);
        // You might want to display an error message to the user
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error('Authentication failed:', error);
      // You might want to display an error message to the user
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Login
                  </button>
                  <Link to="/signup" className="btn btn-outline-danger btn-lg mx-5">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
