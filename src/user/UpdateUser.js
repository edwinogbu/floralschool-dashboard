import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const baseUrl = 'http://51.20.78.81:8082/Jrexapp/api/users';
  const baseUrl = 'http://192.168.1.101:8080/api/users';

  // const baseUrl = 'http://jrex-test-env.eba-w2mk3spp.eu-north-1.elasticbeanstalk.com/Jrexapp/api/users';


  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const { firstname, lastname, email, phone, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('email', email);
//       formData.append('phone', phone);
//       formData.append('password', password);

//       await axios.put(`${baseUrl}/update/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'User updated successfully!',
//       }).then(() => {
//         navigate(`/users`);
//       });
//     } catch (error) {
//       console.error('Error updating user:', error);

//       // Set the error message based on the error response or a generic message
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError('An error occurred while updating the user. Please try again later.');
//       }
//     }
//   };
  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userData = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
      };
  
      // Send a PUT request with JSON data
      await axios.put(`${baseUrl}/update/${id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User updated successfully!',
      }).then(() => {
        navigate(`/users`);
      });
    } catch (error) {
      console.error('Error updating user:', error);
  
      // Set the error message based on the error response or a generic message
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while updating the user. Please try again later.');
      }
    }
  };
  

  const loadUser = async () => {
    try {
      const result = await axios.get(`${baseUrl}/viewUser/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error('Error loading user:', error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Edit User</h2>
              {/* Display the error message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
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
                      placeholder="Enter firstname "
                      name="firstname"
                      value={firstname}
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
                      placeholder="Enter lastname "
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
                      type="text"
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
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Save
                  </button>
                  <Link to={`/users`} className="btn btn-outline-danger btn-lg mx-5">
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
}
