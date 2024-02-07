import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseUrl = 'http://localhost:8080/api/users'; // Update with the correct API endpoint

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(baseUrl + '/viewAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
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

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdate = async () => {
    try {
      // Send a PUT request with updated user data
      const response = await axios.put(`${baseUrl}/update/${selectedUser.id}`, selectedUser);
      console.log(response);

      // Close the modal
      closeEditModal();

      // Show success alert and refresh the user list
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User updated successfully!',
      }).then(() => {
        fetchUsers();
      });
    } catch (error) {
      // Show error alert
      console.error('Error updating user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the user.',
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
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.roles}</td>
                      <td>
                        <button
                          onClick={() => openEditModal(user)}
                          className="btn btn-primary btn-sm mx-1"
                        >
                          Edit
                        </button>
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

      {/* Update User Modal */}
    {/* Update User Modal */}
 {/* {isModalOpen && selectedUser && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update User</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={closeEditModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body" style={{ overflowY: 'auto' }}>

          <div className="form-group">
            <label htmlFor="editUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="editUsername"
              value={selectedUser.username}
              onChange={(e) =>
                setSelectedUser((prevUser) => ({ ...prevUser, username: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="editFirstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="editFirstName"
              value={selectedUser.firstName}
              onChange={(e) =>
                setSelectedUser((prevUser) => ({ ...prevUser, firstName: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="editLastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="editLastName"
              value={selectedUser.lastName}
              onChange={(e) =>
                setSelectedUser((prevUser) => ({ ...prevUser, lastName: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="editEmail">Email</label>
            <input
              type="text"
              className="form-control"
              id="editEmail"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser((prevUser) => ({ ...prevUser, email: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="editPhone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="editPhone"
              value={selectedUser.phone}
              onChange={(e) =>
                setSelectedUser((prevUser) => ({ ...prevUser, phone: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="editPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="editPassword"
              value={selectedUser.password}
              onChange={(e) =>
                setSelectedUser((prevUser) => ({ ...prevUser, password: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="editRoles">Role</label>
            <select
              id="editRoles"
              className="form-control"
              value={selectedUser.roles}
              onChange={(e) =>
                setSelectedUser((prevUser) => ({ ...prevUser, roles: e.target.value }))
              }
            >
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_STAFF">Staff</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
)}  */}

{/* Update User Modal */}
{isModalOpen && selectedUser && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update User</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={closeEditModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <form onSubmit={handleUpdate} className="bg-white rounded pb_form_v1 mb-5 mb-4 mt-0">
            <div className="form-group mb-4 mt-0">
              <label htmlFor="editUsername">Username</label>
              <input
                type="text"
                id="editUsername"
                className="form-control pb_height-50 reverse"
                value={selectedUser.username}
                onChange={(e) =>
                  setSelectedUser((prevUser) => ({ ...prevUser, username: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="editLastName">Last Name</label>
              <input
                type="text"
                id="editLastName"
                className="form-control pb_height-50 reverse"
                value={selectedUser.lastName}
                onChange={(e) =>
                  setSelectedUser((prevUser) => ({ ...prevUser, lastName: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="editEmail">Email</label>
              <input
                type="text"
                id="editEmail"
                className="form-control pb_height-50 reverse"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser((prevUser) => ({ ...prevUser, email: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="editPhone">Phone</label>
              <input
                type="text"
                id="editPhone"
                className="form-control pb_height-50 reverse"
                value={selectedUser.phone}
                onChange={(e) =>
                  setSelectedUser((prevUser) => ({ ...prevUser, phone: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="editPassword">Password</label>
              <input
                type="password"
                id="editPassword"
                className="form-control pb_height-50 reverse"
                value={selectedUser.password}
                onChange={(e) =>
                  setSelectedUser((prevUser) => ({ ...prevUser, password: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="editRoles">Role</label>
              <div className="pb_select-wrap">
                <select
                  id="editRoles"
                  className="form-control pb_height-50 reverse"
                  value={selectedUser.roles}
                  onChange={(e) =>
                    setSelectedUser((prevUser) => ({ ...prevUser, roles: e.target.value }))
                  }
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="ROLE_ADMIN">Admin</option>
                  <option value="ROLE_USER">User</option>
                  <option value="ROLE_STAFF">Staff</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue"
                value="Update"
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </>
  );
}

export default UserList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function UserList() {
//   const [users, setUsers] = useState([]);
//   // const baseUrl = 'http://192.168.1.101:8080/api/users';

//   const baseUrl = 'http://localhost:8080/api/users'; // Update with the correct API endpoint

//   // const baseUrl = 'http://jrex-test-env.eba-w2mk3spp.eu-north-1.elasticbeanstalk.com/Jrexapp/api/users';


//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllUsers');

//     //   const response = await axios.get('http://localhost:8082/Jrexapp/api/users/allUsers');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//     //   await axios.delete(baseUrl + '/delete/' + id);
//     //   await axios.delete('http://localhost:8082/Jrexapp/api/users/delete/' + id);
//       await axios.delete(baseUrl + '/delete/' + id);
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'User deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting user:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the user.',
//       });
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="card shadow mb-4">
//           <div className="card-header py-3 d-flex justify-content-between">
//             <div className="mx-5 py-3">
//               <h6 className="m-0 font-weight-bold text-primary">Users List Table</h6>
//             </div>
//             <div className="mx-5 py-3">
//             <Link to={`/add-user`} className="btn btn-primary mb-3">
//                 Add User
//             </Link>
//             </div>
//           </div>
//           <div className="card-body">
//             <div className="table-responsive">
//               <table className="table table-bordered table-striped" id="dataTable" width="100%" cellSpacing={0}>
//                 <thead>
//                   <tr>
//             <th>ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.username}</td>
//               <td>{user.lastName}</td>
//               <td>{user.email}</td>
//               <td>{user.phone}</td>
//               <td>
//                 <Link to={`/edit-user/${user.id}`} className="btn btn-primary btn-sm mx-1">
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => deleteUser(user.id)}
//                   className="btn btn-danger btn-sm mx-1"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       </>
//   );
// }

// export default UserList;
