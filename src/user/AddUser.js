import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function AddUser() {
  const navigate = useNavigate();
  const baseUrl = 'http://192.168.1.101:8080/api/users';
  // const baseUrl = 'http://jrex-test-env.eba-w2mk3spp.eu-north-1.elasticbeanstalk.com/Jrexapp/api/users';

  const [user, setUser] = useState({
    username: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
  });

  const { username, lastname, email, phone, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
    //   await axios.post('http://localhost:8082/Jrexapp/api/users/create', user);
      await axios.post(baseUrl + '/create', user);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User added successfully!',
      }).then(() => {
        navigate('/users');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the user.',
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Add User</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">first Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter username"
                      name="username"
                      value={username}
                      onChange={(e) => onInputChange(e)}
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
                      placeholder="Enter last Name"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => onInputChange(e)}
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
                      placeholder="Enter Email"
                      name="email"
                      value={email}
                      onChange={(e) => onInputChange(e)}
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
                      placeholder="Enter Phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => onInputChange(e)}
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
                      placeholder="Enter Password"
                      name="password"
                      value={password}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">Save</button>
                  <Link to="/user-list" className="btn btn-outline-danger btn-lg mx-5">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
