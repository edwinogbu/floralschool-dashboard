import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';

export default function ViewPayment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseUrl = 'http://localhost:8080/api/payments'; // Update with the correct API endpoint

  const [fee, setFee] = useState({
    name: '',
    amount: 0,
    checked: false,
  });

  useEffect(() => {
    loadFee();
  }, []);

  const loadFee = async () => {
    try {
      const result = await axios.get(`${baseUrl}/viewFee/${id}`);
      setFee(result.data);
    } catch (error) {
      console.error('Error loading Fee:', error);
    }
  };

  const styles = `
    .container {
      margin-top: 20px;
    }
    /* Add other CSS styles as needed */
  `;

  return (
    <div className="container mb-5">
      <style>{styles}</style>

      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Fee Details</h2>
              <div className="list-group">
                <FeeDetailItem icon={faUser} label="Full Name" value={fee.name} />
                <FeeDetailItem icon={faEnvelope} label="Amount" value={fee.amount} />
                <FeeDetailItem icon={faPhone} label="Checked" value={fee.checked ? 'Yes' : 'No'} />
              </div>
            </div>
            <div className="card-footer d-flex justify-content-center">
              <button
                className="btn btn-primary btn-edit mx-5"
                onClick={() => navigate(`/edit-Fee/${id}`)}
              >
                Edit Fee
              </button>
              <button
                className="btn btn-danger mx-5 btn-back"
                onClick={() => navigate('/Fee-list')}
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

function FeeDetailItem({ icon, label, value }) {
  return (
    <div className="list-group-item mb-3">
      <div className="d-flex justify-content-between">
        <div className="fee-icon mx-2">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="fee-detail d-flex my-2">
          <div className="fee-label mx-5">{label}:</div>
          <div className="fee-value">{value}</div>
        </div>
      </div>
    </div>
  );
}
