import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function AddPin() {
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

  const [pin, setPin] = useState({
    pinNumber: '',
    expiryDate: '',
  });

  const { pinNumber, expiryDate } = pin;

  const onInputChange = (e) => {
    setPin({ ...pin, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(baseUrl + '/create', pin);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'PIN added successfully!',
      }).then(() => {
        navigate('/pins');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the PIN.',
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Add PIN</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">PIN Number</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faKey} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter PIN Number"
                      name="pinNumber"
                      value={pinNumber}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Expiry Date</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCalendarPlus} />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      name="expiryDate"
                      value={expiryDate}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Save
                  </button>
                  <Link to="/pins-list" className="btn btn-outline-danger btn-lg mx-5">
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
