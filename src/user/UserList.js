import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function UserList() {
  const [users, setUsers] = useState([]);
  // const baseUrl = 'http://192.168.1.101:8080/api/users';

  const baseUrl = 'http://localhost:8080/api/users'; // Update with the correct API endpoint

  // const baseUrl = 'http://jrex-test-env.eba-w2mk3spp.eu-north-1.elasticbeanstalk.com/Jrexapp/api/users';


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(baseUrl + '/viewAllUsers');

    //   const response = await axios.get('http://localhost:8082/Jrexapp/api/users/allUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
    //   await axios.delete(baseUrl + '/delete/' + id);
    //   await axios.delete('http://localhost:8082/Jrexapp/api/users/delete/' + id);
      await axios.delete(baseUrl + '/delete/' + id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting user:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the user.',
      });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex justify-content-between">
            <div className="mx-5 py-3">
              <h6 className="m-0 font-weight-bold text-primary">Users List Table</h6>
            </div>
            <div className="mx-5 py-3">
            <Link to={`/add-user`} className="btn btn-primary mb-3">
                Add User
            </Link>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                  <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/edit-user/${user.id}`} className="btn btn-primary btn-sm mx-1">
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-danger btn-sm mx-1"
                >
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
      </>
  );
}

export default UserList;
