import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function PinsList() {
  const [pins, setPins] = useState([]);
  const baseUrl = 'http://localhost:8080/pins/'; // Update with the correct API endpoint

  useEffect(() => {
    fetchPins();
  }, []);

  const fetchPins = async () => {
    try {
      const response = await axios.get(baseUrl + '/getAllPins');
      setPins(response.data);
    } catch (error) {
      console.error('Error fetching pins:', error);
    }
  };

  const deletePin = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this pin?');

    if (confirmDelete) {
      try {
        await axios.delete(baseUrl + '/delete/' + id);
        setPins((prevPins) => prevPins.filter((pin) => pin.id !== id));

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Pin deleted successfully!',
        });
      } catch (error) {
        console.error('Error deleting pin:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the pin.',
        });
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <div className="mx-5 py-3">
            <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
          </div>
          <div className="mx-5 py-3">
            <Link to="/create-pin" className="btn btn-primary mb-3">
              Add Pin
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pin Number</th>
                  <th>Expiry Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pins.map((pin) => (
                  <tr key={pin.id}>
                    <td>{pin.id}</td>
                    <td>{pin.pinNumber}</td>
                    <td>{pin.expiryDate}</td>
                    <td>
                      <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
                        Edit
                      </Link>
                      <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PinsList;
