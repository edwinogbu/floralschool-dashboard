// UserProfile.js
// import React, { useEffect, useState } from 'react';
// import { fetchUserList } from './../service/userService';

// const UserProfile = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userList = await fetchUserList();
//         setUsers(userList);
//       } catch (error) {
//         console.error('Error fetching user list', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useEffect, useState } from 'react';
// import { useAuth } from './../AuthContext'; // Update the path accordingly

// const UserProfile = () => {
//   const { authState, fetchUserData } = useAuth();
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getUserProfileData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Use fetchUserData function from the context to get updated user data
//         await fetchUserData(authState.token);

//         // Now authState should contain the latest user data
//         setUserProfile(authState.user);

//         setLoading(false);
//       } catch (error) {
//         setError(`Error fetching user profile data: ${error.message}`);
//         setLoading(false);
//       }
//     };

//     // Call the function to fetch user profile data
//     getUserProfileData();
//   }, [fetchUserData, authState.token]);

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               {loading && <p>Loading...</p>}
//               {error && <p>{error}</p>}
//               {!loading && !error && (
//                 <div className="row">
//                   <div className="col-md-4">
//                     <img
//                       src="https://via.placeholder.com/150"
//                       alt="Profile"
//                       className="img-fluid rounded-circle"
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     {authState.isAuthenticated ? (
//                       <>
//                         <h3>{authState.user.username}</h3>
//                         <p>Last Name: {authState.user.lastName}</p>
//                         <p>Phone: {authState.user.phone}</p>
//                         <p>Email: {authState.user.email}</p>
//                         <p>Roles: {authState.user.roles.join(', ')}</p>
//                         <p>Token: {authState.token}</p>
//                         <hr />
//                         {userProfile && (
//                           <>
//                             <h5>About floral school</h5>
//                             <p>{/* Display additional profile data here */}</p>
//                           </>
//                         )}
//                       </>
//                     ) : (
//                       <p>User not authenticated.</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useEffect, useState } from 'react';
// import { useAuth } from './../AuthContext'; // Update the path accordingly

// const UserProfile = () => {
//   const { authState, fetchUserData } = useAuth();
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getUserProfileData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Use fetchUserData function to get updated user data
//         await fetchUserData(authState.token);

//         // Now authState should contain the latest user data
//         setUserProfile(authState.user);

//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching user profile data.');
//         setLoading(false);
//       }
//     };

//     // Call the function to fetch user profile data
//     getUserProfileData();
//   }, [fetchUserData, authState.token]);

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               {loading && <p>Loading...</p>}
//               {error && <p>{error}</p>}
//               {!loading && !error && (
//                 <div className="row">
//                   <div className="col-md-4">
//                     <img
//                       src="https://via.placeholder.com/150"
//                       alt="Profile"
//                       className="img-fluid rounded-circle"
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     {authState.isAuthenticated ? (
//                       <>
//                         <h3>{authState.user.username}</h3>
//                         <p>Last Name: {authState.user.lastName}</p>
//                         <p>Phone: {authState.user.phone}</p>
//                         <p>Email: {authState.user.email}</p>
//                         <p>Roles: {authState.user.roles.join(', ')}</p>
//                         <p>Token: {authState.token}</p>
//                         <hr />
//                         {userProfile && (
//                           <>
//                             <h5>About floral school</h5>
//                             <p>{/* Display additional profile data here */}</p>
//                           </>
//                         )}
//                       </>
//                     ) : (
//                       <p>User not authenticated.</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useEffect, useState } from 'react';
// import { useAuth } from './../AuthContext'; // Update the path accordingly

// const UserProfile = () => {
//   const { authState, fetchUserData, user } = useAuth();
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch user profile data using the token from local storage
//     const token = localStorage.getItem('token');

//     if (token) {
//       fetchUserProfile(token);
      
//       console.log(user);
//     }
//   }, []);

//   const fetchUserProfile = async (token) => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Fetch user profile data using the token
//       const response = await fetch('http://localhost:8080/api/users/currentUser', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const userProfileData = await response.json();
//         setUserProfile(userProfileData);
//       } else {
//         setError(`Error: ${response.statusText}`);
//       }
//     } catch (error) {
//       setError(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               {loading && <p>Loading...</p>}
//               {error && <p>{error}</p>}
//               {!loading && !error && (
//                 <div className="row">
//                   <div className="col-md-4">
//                     <img
//                       src="https://via.placeholder.com/150"
//                       alt="Profile"
//                       className="img-fluid rounded-circle"
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     {authState.isAuthenticated ? (
//                       <>
//                         <h3>{authState.username}</h3>
//                         <p>Last Name: {authState.user.lastName}</p>
//                         <p>Phone: {authState.user.phone}</p>
//                         <p>Email: {authState.user.email}</p>
//                         <p>Roles: {authState.user.roles}</p>
//                         <p>Token: {authState.token}</p>
//                         <hr />
//                         {userProfile && (
//                           <>
//                             <h5>About floral school</h5>
//                             <p>{/* Display additional profile data here */}</p>
//                           </>
//                         )}
//                       </>
//                     ) : (
//                       <p>User not authenticated.</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useContext } from 'react';
import { useAuth } from './../AuthContext';

export default function UserProfile() {
  const { isAuthenticated, user, logout, getRole } = useAuth();
  const userRole = getRole();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4>User Profile</h4>
            </div>
            <div className="card-body">
              {isAuthenticated ? (
                <>
                  <h2 className="mb-4">Dashboard</h2>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">User Information</h5>
                      <p className="card-text">
                        <strong>Username:</strong> {user.username} {user.lastName}
                      </p>
                      <p className="card-text">
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p className="card-text">
                        <strong>Token:</strong> {user.token}
                      </p>
                      <p className="card-text">
                        <strong>Role:</strong> {userRole}
                        {userRole === 'ROLE_ADMIN' && <p>You have admin privileges.</p>}
                        {userRole === 'ROLE_USER' && <p>You have user privileges.</p>}
                      </p>
                      <p className="card-text">
                        <strong>Roles:</strong> {user.roles}
                      </p>
                      <button className="btn btn-danger" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-danger">Please log in to view the dashboard.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useContext } from 'react';
// import { AuthContext, useAuth } from './../AuthContext';

// const UserProfile = () => {
//   // const { user, logout, getAuthToken } = useContext(AuthContext);
//   const { isAuthenticated, user, logout, getRole } = useAuth();
//   const userRole = getRole();
  
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 </div>
//                 <div className="col-md-8">
//                 <div className="container mt-5">
//       {isAuthenticated ? (
//         <>
//           <h2 className="mb-4">Dashboard</h2>
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">User Information</h5>
//               <p className="card-text">
//                 <strong>Username:</strong> {user.username} {user.lastName}
//               </p>
//               <p className="card-text">
//                 <strong>Email:</strong> {user.email}
//               </p>
//               <p className="card-text">
//                 <strong>Token:</strong> {user.token}
//               </p>
//               <p className="card-text">
//                 <strong>Role:</strong>{userRole}
//                 {userRole === 'ROLE_ADMIN' && <p>You have admin privileges.</p>}
//                 {userRole === 'ROLE_USER' && <p>You have user privileges.</p>} 
//               </p>
//               <p className="card-text">
//                 <strong>Roles:</strong> {user.roles} 
//               </p>
//               <button className="btn btn-danger" onClick={logout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <p className="text-danger">Please log in to view the dashboard.</p>
//       )}
//                </div>
//                 </div>

                
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;




// import React, { useContext } from 'react';
// import { AuthContext } from './../AuthContext';

// const UserProfile = () => {
//   const { user, logout, getAuthToken } = useContext(AuthContext);

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   {user ? (
//                     <>
//                       <h3>{user.username}</h3>
//                       <p>Last Name: {user.lastName}</p>
//                       <p>Phone: {user.phone}</p>
//                       <p>Email: {user.email}</p>
//                       <p>Roles: {user.roles}</p>
//                       <p>Token: {getAuthToken()}</p>
//                     </>
//                   ) : (
//                     <p>User not authenticated.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from './../AuthContext';

// const UserProfile = () => {
//   const { user, logout, getAuthToken } = useContext(AuthContext);
//   const [userProfile, setUserProfile] = useState(null);

//   // Example: Fetch additional user profile data using the user ID or any other identifier
//   const fetchUserProfile = async () => {
//     try {
//       const authToken = getAuthToken();

//       // Replace the following API call with your actual endpoint to fetch user profile data
//       const response = await fetch('https://api.example.com/user-profile', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const profileData = await response.json();
//         setUserProfile(profileData);
//       } else {
//         console.error('Failed to fetch user profile data');
//       }
//     } catch (error) {
//       console.error('Error fetching user profile data:', error.message);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchUserProfile();
//     }
//   }, [user]);

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   {user ? (
//                     <>
//                       <h3>{user.username}</h3>
//                       <p>Last Name: {user.lastName}</p>
//                       <p>Phone: {user.phone}</p>
//                       <p>Email: {user.email}</p>
//                       <p>Roles: {user.roles}</p>
//                       <p>Token: {getAuthToken()}</p>
//                       <hr />
//                       {userProfile && (
//                         <>
//                           <h5>About Floral School</h5>
//                           <p>{/* Display additional profile data here */}</p>
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <p>User not authenticated.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from './../AuthContext'; // Update the path accordingly

// const UserProfile = () => {
//   const { authState, fetchUserData } = useContext(AuthContext);
//   const [userProfile, setUserProfile] = useState(null);

//   useEffect(() => {
//     // Fetch user profile data using the token from authState
//     if (authState.isAuthenticated) {
//       fetchUserProfile(authState.user.token);
//     }
//   }, [authState]);

//   const fetchUserProfile = async (token) => {
//     try {
//       // Fetch user profile data using the token
//       const response = await fetch('http://localhost:8080/api/users/currentUser', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log(`response: ${response}`);
//       if (response.ok) {
//         const userProfileData = await response.json();
//         setUserProfile(userProfileData);
//       } else {
//         console.error('Error fetching user profile:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   {authState.isAuthenticated ? (
//                     <>
//                       <h3>{authState.username}</h3>
//                       <p>Last Name: {authState.user.lastName}</p>
//                       <p>Phone: {authState.user.phone}</p>
//                       <p>Email: {authState.user.email}</p>
//                       <p>Roles: {authState.user.roles}</p>
//                       <p>Token: {authState.token}</p>
//                       <hr />
//                       {userProfile && (
//                         <>
//                           <h5>About floral school</h5>
//                           <p>{/* Display additional profile data here */}</p>
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <p>User not authenticated.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


// import React from 'react';
// import { useAuth } from './../AuthContext';

// const UserProfile = () => {
//   const { authState } = useAuth();
//   const { username, lastName, phone, email, roles, token } = authState.user;

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   <h3>{username}</h3>
//                   <p>Last Name: {lastName}</p>
//                   <p>Phone: {phone}</p>
//                   <p>Email: {email}</p>
//                   {/* <p>Roles: {roles.join(', ')}</p> */}
//                   <p>Roles: {roles}</p>
//                   <p>Token: {token}</p>
//                   <hr />
//                   <h5>About floral school</h5>
//                   <p>floral school</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserProfile = () => {
//   const [user, setUser] = useState({
//     username: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     roles: [],
//     token: '',
//   });

//   useEffect(() => {
//     // Replace with your API endpoint for fetching user details
//     const apiUrl = 'http://localhost:8080/api/users/currentUser';

//     axios.get(apiUrl, { headers: { Authorization: `Bearer ${user.token}` } })
//       .then(response => {
//         setUser(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user details:', error);
//       });
//   }, [user.token]);

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   <h3>{user.username}</h3>
//                   <p>Last Name: {user.lastName}</p>
//                   <p>Phone: {user.phone}</p>
//                   <p>Email: {user.email}</p>
//                   <p>Roles: {user.roles.join(', ')}</p>
//                   <p>Token: {user.token}</p>
//                   <hr />
//                   <h5>About floral school</h5>
//                   <p>
//                     floral school
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


// import React from 'react';

// const UserProfile = () => {
//   // Replace the placeholder values with actual user data
//   const user = {
//     username: 'john.doe',
//     lastName: 'Doe',
//     phone: '123-456-7890',
//     email: 'john.doe@example.com',
//     roles: ['Admin', 'User'],
//     token: 'your_token_here',
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   <h3>{user.username}</h3>
//                   <p>Last Name: {user.lastName}</p>
//                   <p>Phone: {user.phone}</p>
//                   <p>Email: {user.email}</p>
//                   <p>Roles: {user.roles.join(', ')}</p>
//                   <p>Token: {user.token}</p>
//                   <hr />
//                   <h5>About Me</h5>
//                   <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';

// // export default function UserProfile() {
// //   const navigate = useNavigate();
// //   const { id } = useParams();
// //   // const baseUrl = 'http://51.20.78.81:8082/Jrexapp/api/users/';
// //   // const baseUrl = 'http://jrex-test-env.eba-w2mk3spp.eu-north-1.elasticbeanstalk.com/Jrexapp/api/users';

// //   const baseUrl = 'http://192.168.1.101:8080/api/users';

// //   const [user, setUser] = useState({
// //         firstname: '',
// //         lastname: '',
// //         email: '',
// //         phone: '',
// //         password: '',
// //   });

// //   useEffect(() => {
// //     loadUser();
// //   }, []);

// //   const loadUser = async () => {
// //     try {
// //       const result = await axios.get(`${baseUrl}viewUser/${id}`);
// //       setUser(result.data);
// //     } catch (error) {
// //       console.error('Error loading user:', error);
// //     }
// //   };

// //   const styles = `
// //     .container {
// //       margin-top: 20px;
// //     }
    
// //     /* Add other CSS styles as needed */
// //   `;

// //   return (
// //     <div className="container mb-5">
// //       <style>{styles}</style>

// //       <div className="row justify-content-center mt-5">
// //         <div className="col-md-8">
// //           <div className="card shadow">
// //             <div className="card-body">
// //               <h2 className="text-center mb-4">User Details</h2>
// //               <div className="list-group">
// //                 <UserDetailItem icon={faUser} label="Full Name" value={user.firstname} />
// //                 <UserDetailItem icon={faUser} label="Full Name" value={user.lastname} />
// //                 <UserDetailItem icon={faEnvelope} label="Email" value={user.email} />
// //                 <UserDetailItem icon={faPhone} label="Phone" value={user.phone} />
// //                 <UserDetailItem icon={faLock} label="Password" value={user.password} />
// //               </div>
// //             </div>
// //             <div className="card-footer d-flex justify-content-center">
// //               <button
// //                 className="btn btn-primary btn-edit mx-5"
// //                 onClick={() => navigate(`/edit-user/${id}`)}
// //               >
// //                 Edit User
// //               </button>
// //               <button
// //                 className="btn btn-danger mx-5 btn-back"
// //                 onClick={() => navigate('/user-list')}
// //               >
// //                 Back to List
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function UserDetailItem({ icon, label, value }) {
// //   return (
// //     <div className="list-group-item mb-3">
// //       <div className="d-flex justify-content-between">
// //         <div className="user-icon mx-2">
// //           <FontAwesomeIcon icon={icon} />
// //         </div>
// //         <div className="user-detail d-flex my-2">
// //           <div className="user-label mx-5">{label}:</div>
// //           <div className="user-value">{value}</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
