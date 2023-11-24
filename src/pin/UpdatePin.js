import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UpdatePin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

  const [pin, setPin] = useState({
    pinNumber: '',
    expiryDate: '',
  });

  const [error, setError] = useState(null);

  const { pinNumber, expiryDate } = pin;

  const onInputChange = (e) => {
    setPin({ ...pin, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the updated pin data
      const updatedPin = {
        pinNumber,
        expiryDate,
      };

      // Send a PUT request with JSON data
      await axios.put(`${baseUrl}/update/${id}`, updatedPin, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle success
      alert('Pin updated successfully!'); // You can replace this with a more user-friendly notification

      // Redirect to the pins list page
      navigate(`/pins`);
    } catch (error) {
      console.error('Error updating Pin:', error);

      // Set the error message based on the error response or a generic message
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while updating the Pin. Please try again later.');
      }
    }
  };

  const loadPin = async () => {
    try {
      const result = await axios.get(`${baseUrl}/getPin/${id}`);
      setPin(result.data);
    } catch (error) {
      console.error('Error loading Pin:', error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    loadPin();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Edit Pin</h2>
              {/* Display the error message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Pin Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Pin Number"
                    name="pinNumber"
                    value={pinNumber}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Expiry Date"
                    name="expiryDate"
                    value={expiryDate}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Save
                  </button>
                  <Link to="/pins" className="btn btn-outline-danger btn-lg mx-5">
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
