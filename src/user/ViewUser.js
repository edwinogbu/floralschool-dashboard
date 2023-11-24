import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';

export default function ViewUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const baseUrl = 'http://51.20.78.81:8082/Jrexapp/api/users/';
  // const baseUrl = 'http://jrex-test-env.eba-w2mk3spp.eu-north-1.elasticbeanstalk.com/Jrexapp/api/users';

  const baseUrl = 'http://192.168.1.101:8080/api/users';

  const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`${baseUrl}viewUser/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error('Error loading user:', error);
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
              <h2 className="text-center mb-4">User Details</h2>
              <div className="list-group">
                <UserDetailItem icon={faUser} label="Full Name" value={user.firstname} />
                <UserDetailItem icon={faUser} label="Full Name" value={user.lastname} />
                <UserDetailItem icon={faEnvelope} label="Email" value={user.email} />
                <UserDetailItem icon={faPhone} label="Phone" value={user.phone} />
                <UserDetailItem icon={faLock} label="Password" value={user.password} />
              </div>
            </div>
            <div className="card-footer d-flex justify-content-center">
              <button
                className="btn btn-primary btn-edit mx-5"
                onClick={() => navigate(`/edit-user/${id}`)}
              >
                Edit User
              </button>
              <button
                className="btn btn-danger mx-5 btn-back"
                onClick={() => navigate('/user-list')}
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

function UserDetailItem({ icon, label, value }) {
  return (
    <div className="list-group-item mb-3">
      <div className="d-flex justify-content-between">
        <div className="user-icon mx-2">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="user-detail d-flex my-2">
          <div className="user-label mx-5">{label}:</div>
          <div className="user-value">{value}</div>
        </div>
      </div>
    </div>
  );
}
