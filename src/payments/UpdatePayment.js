import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFee, faEnvelope, faPhone, faLock, faFile } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function UpdatePayment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseUrl = 'http://localhost:8080/api/fees'; // Update with the correct API endpoint

  const [fee, setFee] = useState({
    name: '',
    amount: 0, // Corrected to set the default value as a number
    checked: false, // Corrected to set the default value as a boolean
  });

  const [error, setError] = useState(null);

  const { name, amount, checked } = fee;

  const onInputChange = (e) => {
    setFee({ ...fee, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the updated fee data
      const updatedFee = {
        name,
        amount,
        checked,
      };

      // Send a PUT request with JSON data
      await axios.put(`${baseUrl}/update/${id}`, updatedFee, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Fee updated successfully!',
      }).then(() => {
        navigate(`/fees`);
      });
    } catch (error) {
      console.error('Error updating Fee:', error);

      // Set the error message based on the error response or a generic message
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while updating the Fee. Please try again later.');
      }
    }
  };

  const loadFee = async () => {
    try {
      const result = await axios.get(`${baseUrl}/getFee/${id}`);
      setFee(result.data);
    } catch (error) {
      console.error('Error loading Fee:', error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    loadFee();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Edit Fee</h2>
              {/* Display the error message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Fee Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faFile} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Fee Name"
                      name="name"
                      value={name}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      type="number" // Use type="number" for the amount
                      className="form-control"
                      placeholder="Enter Amount"
                      name="amount"
                      value={amount}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Checked</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="checked"
                      checked={checked}
                      onChange={(e) => onInputChange(e)}
                    />
                    <label className="form-check-label">Is Checked</label>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Save
                  </button>
                  <Link to="/fees" className="btn btn-outline-danger btn-lg mx-5">
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
