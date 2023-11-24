import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddBatchPins() {
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

  const [numberOfPins, setNumberOfPins] = useState(1);

  const onInputChange = (e) => {
    setNumberOfPins(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to generate and save a batch of pins
      await axios.post(`${baseUrl}/generate-batch`, { numberOfPins });

      // Handle success
      alert(`${numberOfPins} Pins generated and saved successfully!`); // You can replace this with a more user-friendly notification

      // Redirect to the pins list page
      navigate(`/pins`);
    } catch (error) {
      console.error('Error generating batch of Pins:', error);

      // Handle errors, e.g., display an error message to the user
      alert('An error occurred while generating the batch of Pins. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Generate Batch of Pins</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Number of Pins</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Number of Pins to Generate"
                    value={numberOfPins}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Generate and Save
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
