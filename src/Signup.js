import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send signup data to the server (implement this endpoint on the server)
      await axios.post('/api/users/signup', formData);

      // Display a success message or perform other actions
      Swal.fire({
        icon: 'success',
        title: 'Signup Successful!',
        text: 'You have successfully signed up.',
      });

      // Redirect to the login page after successful signup
      navigate('/login');
    } catch (error) {
      // Display an error message or perform other actions on signup failure
      console.error('Signup failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: 'An error occurred during signup. Please try again.',
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter first name"
                      name="username"
                      value={formData.username}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter last name"
                      name="lastname"
                      value={formData.lastname}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
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
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Sign Up
                  </button>
                  <Link to="/login" className="btn btn-outline-danger btn-lg mx-5">
                    Cancel
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

export default Signup;
