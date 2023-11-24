import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faCalendar, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function ViewPin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseUrl = 'http://localhost:8080/api/pins';

  const [pin, setPin] = useState({
    pinNumber: '',
    expiryDate: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    loadPin();
  }, []);

  const loadPin = async () => {
    try {
      const result = await axios.get(`${baseUrl}/viewPin/${id}`);
      setPin(result.data);
    } catch (error) {
      console.error('Error loading Pin:', error);
      setError('An error occurred while loading the Pin. Please try again later.');
    }
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Pin Details</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="list-group">
                <PinDetailItem icon={faKey} label="Pin Number" value={pin.pinNumber} />
                <PinDetailItem icon={faCalendar} label="Expiry Date" value={pin.expiryDate} />
              </div>
            </div>
            <div className="card-footer d-flex justify-content-center">
              <button
                className="btn btn-danger mx-5 btn-back"
                onClick={() => navigate('/pin-list')}
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PinDetailItem({ icon, label, value }) {
  return (
    <div className="list-group-item mb-3">
      <div className="d-flex justify-content-between">
        <div className="pin-icon mx-2">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="pin-detail d-flex my-2">
          <div className="pin-label mx-5">{label}:</div>
          <div className="pin-value">{value}</div>
        </div>
      </div>
    </div>
  );
}
