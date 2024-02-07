// // SignUp.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { signupAsync } from './service/userService';

// const Signup = () => {
//   const dispatch = useDispatch();
//   const [userData, setUserData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [name]: value,
//     }));
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const success = await signupAsync(userData, dispatch);

//     if (success) {
//       // Handle successful signup (e.g., redirect to login page)
//       console.log('Signup successful');
//     } else {
//       // Handle signup failure (e.g., show an error message)
//       console.log('Signup failed');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title">Sign Up</h2>
//               <form onSubmit={handleSignUp}>
//                 <div className="form-group">
//                   <label htmlFor="username">Username:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     name="username"
//                     value={userData.username}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="email">Email:</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={userData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">Password:</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     value={userData.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Sign Up
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useState } from 'react';
// import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// const Signup = () => {
//   const { signUp } = useAuth();
//   const [formData, setFormData] = useState({
//     username: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     roles: '',
//   });

//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send signup data to the server (implement this endpoint on the server)
//       const success = await signUp({ formData });
//     //  const success = await axios.post('http://localhost:8080/api/users/signup', formData);

//       // Display a success message or perform other actions
//       Swal.fire({
//         icon: 'success',
//         title: 'Signup Successful!',
//         text: 'You have successfully signed up.',
//       });

//       if (success) {
//         navigate('/dashboard'); // Redirect to a protected route after successful signup
//       }
//       // Redirect to the login page after successful signup
//       navigate('/dashboard');
//     } catch (error) {
//       // Display an error message or perform other actions on signup failure
//       console.error('Signup failed:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Signup Failed',
//         text: 'An error occurred during signup. Please try again.',
//       });
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Username:</label>
//           <input
//             type="text"
//             className="form-control"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Last Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             className="form-control"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Phone:</label>
//           <input
//             type="tel"
//             className="form-control"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Roles:</label>
//           <div className="pb_select-wrap">
//             <select
//               name="roles"
//               value={formData.roles}
//               onChange={handleChange}
//               className="form-control pb_height-50 reverse"
//               required
//             >
//               <option value="" disabled>
//                 Select Role
//               </option>
//               <option value="ROLE_ADMIN">Admin</option>
//               <option value="ROLE_USER">User</option>
//               <option value="ROLE_STAFF">Staff</option>
//             </select>
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from './AuthContext';

const Signup = () => {
const {signUp} = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    roles: 'USER_ROLE', // Set a default role, you can change this as needed
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Inside your component
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
   const response = await signUp(formData);
    // const response = await axios.post('http://localhost:8080/api/users/signup', formData);
    const newUser = response.data;
    console.log(newUser);

    Swal.fire({
      icon: 'success',
      title: 'Signup Successful!',
      text: 'You have successfully signed up.',
    });

    // Clear the form
    setFormData({
      username: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      roles: 'USER_ROLE',
    });

    if (newUser) {
      navigate('/dashboard');
    }
    // Redirect to the dashboard or any other desired route after successful signup
    navigate('/dashboard');
  } catch (error) {
    console.error('Signup failed:', error.response ? error.response.data : error.message);

    Swal.fire({
      icon: 'error',
      title: 'Signup Failed',
      text: 'An error occurred while signing up. Please try again.',
    });
  } finally {
    setLoading(false);
  }
};



  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:8080/api/users/signup', formData);
  //     const newUser = response.data;

  //     // Fetch and set the list of users after successful signup
  //     // const usersResponse = await axios.get('http://localhost:8080/api/users');
  //     // const usersData = usersResponse.data;

  //     // You can uncomment the above lines if you need to fetch and set the list of users

  //     // Optionally, you can display a success message
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Signup Successful!',
  //       text: 'You have successfully signed up.',
  //     });

  //     // Redirect to the dashboard or any other desired route after successful signup
  //     navigate('/dashboard');
  //   } catch (error) {
  //     console.error('Signup failed:', error.response ? error.response.data : error.message);

  //     // Optionally, you can display an error message
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Signup Failed',
  //       text: 'An error occurred while signing up. Please try again.',
  //     });
  //   }
  // };

  return (
    <body data-spy="scroll" data-target="#pb-navbar" data-offset="200">
      {/* Bootstrap Navigation Bar */}
      {/* ... (Same as in your Authenticate component) */}

      {/* Signup Form Section */}
      <section className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb-light" id="section-signup" style={{ marginBottom: 23 }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
              <h2 className="heading mb-3 bold">Sign Up</h2>
              <div className="sub-heading">
                <p className="mb-4">Create Your Account</p>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5 relative align-self-center mt-0">
              <form onSubmit={handleSubmit} className="bg-white rounded pb_form_v1 mb-5 mb-4 mt-0">
                <h2 className="mb-4 mt-0 text-center">Sign Up</h2>
                <div className="form-group mb-4 mt-0">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control pb_height-50 reverse"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group mb-4 mt-0">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control pb_height-50 reverse"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group mb-4 mt-0">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control pb_height-50 reverse"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group mb-4 mt-0">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control pb_height-50 reverse"
                    placeholder="Phone"
                  />
                </div>
                <div className="form-group mb-4 mt-0">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control pb_height-50 reverse"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group mb-4 mt-0">
                  <select
                    name="roles"
                    value={formData.roles}
                    onChange={handleChange}
                    className="form-control pb_height-50 reverse"
                  >
                    <option value="USER_ROLE">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="ROLE_STAFF">Staff</option>
                  </select>
                </div>
               
                  <div className="form-group">
                    <input type="submit" className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue" value={loading ? 'Signing Up...' : 'Sign Up'} disabled={loading} />
                  </div>
              </form>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
};

export default Signup;

// import React, { useContext, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
// import { AuthContext, useAuth,  } from './AuthContext';


// const Signup = () => {
//   const navigate = useNavigate();
//   // const  signUp  = useAuth();
//   // const { signUp } = useAuth();

//   // const { signUp } = useContext(AuthContext);
//   const { signUp } = useAuth();

//   const [formData, setFormData] = useState({
//     username: '', 
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     roles: '', 
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Call the signUp function from AuthContext
  //   const success = await signUp(formData);
  //   console.log(success);

  //   if (success) {
  //     // Redirect to the desired page after successful signup
  //     navigate('/dashboard');
  //   }
  //   // Handle signup failure (you can display an error message here)
  // };

   
//   return (
   
//       <body data-spy="scroll" data-target="#pb-navbar" data-offset="200">
      
     
//         {/* Bootstrap Navigation Bar */}
//         <nav className="navbar navbar-expand-lg navbar-light bg-primary pb_navbar pb_scrolled-light">
//           <div className="container">
//             {/* <div className="navbar-brand"> */}
//             <Link to="/" className="navbar-brand">
//             <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:20,}}/>
//             </Link>
//             {/* </div> */}
//             <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#probootstrap-navbar" aria-controls="probootstrap-navbar" aria-expanded="false" aria-label="Toggle navigation">
//               <span><i className="ion-navicon"></i></span>
//             </button>
//             <div className="collapse navbar-collapse" id="probootstrap-navbar">
//               <ul className="navbar-nav ml-auto">
                
//                 <li className="nav-item cta-btn"> 
//                   <Link to="/login" className="nav-link ">              
//                     <span className="pb_rounded-4 px-4">Login</span>
//                   </Link>
//                 </li>
                
//                 <li className="nav-item cta-btn "> 
//                   <Link to="/signup" className="nav-link">              
//                     <span className="pb_rounded-4 px-4">SignUp</span>
//                   </Link>
//                 </li>
//                 <li className="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0"> 
//                 {/* {authState.isAuthenticated && ( */}
//                     <li className="nav-item">
//                       <Link to="/dashboard" className="nav-link">
//                       <span className="pb_rounded-4 px-4">Dashboard</span>
//                       </Link>
//                     </li>
//                   {/* )} */}
                  
//                 </li>
              

//               </ul>
              
//             </div>
//           </div>
//         </nav>


//     <section className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb-light" id="section-home" style={{marginBottom:23}}>
//         {/* Placeholder content for the home section */}
//         <div className="container">
//           <div className="row align-items-center justify-content-center">
//             <div className="col-md-6">
//               <h6 className="heading mb-3 bold">The Floral School Portal</h6>
//               <div className="sub-heading">
//                 <p className="mb-4">Where Your Knowledge Blossoms Like Beautiful Flowers. Join Us Today!</p>
//                 <p className="mb-5"><Link to="/login" className="btn btn-success btn-lg pb_btn-pill smoothscroll"><span className="pb_font-14 text-uppercase pb_letter-spacing-1">Get Started</span></Link></p>
//               </div>
//             </div>
//             <div className="col-md-1">
//           </div>
//             <div className="col-md-5 relative align-self-center mt-0 mb-5">
//             <form onSubmit={handleSubmit} className="bg-white rounded pb_form_v1 mb-5 mb-4 mt-0">
//               <h2 className="mb-4 mt-0 text-center">Sign Up Here</h2>
//               <div className="form-group mb-4 mt-0">
//                 <input type="text"
//                  name="username"
//                  value={formData.username}
//                  onChange={handleChange}
//                  className="form-control pb_height-50 reverse "
//                   placeholder="First name/ user name" />
//               </div>
//               <div className="form-group">
//                 <input type="text"
//                  name="lastName"
//                  value={formData.lastName}
//                  onChange={handleChange}
//                  className="form-control pb_height-50 reverse"
//                   placeholder="Last name" />
//               </div>
//               <div className="form-group">
//                 <input type="text" 
//                  name="email"
//                  value={formData.email}
//                  onChange={handleChange}
//                 className="form-control pb_height-50 reverse" 
//                 placeholder="Email" />
//               </div>
//               <div className="form-group">
//                 <input type="text" 
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 className="form-control pb_height-50 reverse" 
//                 placeholder="Phone" />
//               </div>
//               <div className="form-group">
//                 <input type="text" 
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 className="form-control pb_height-50 reverse" 
//                 placeholder="Password" />
//               </div>
            //   <div className="form-group">
            //     <div className="pb_select-wrap">
            //       <select
            //         name="roles"
            //         value={formData.roles}
            //         onChange={handleChange}
            //         className="form-control pb_height-50 reverse"
            //         required
            //       >
            //   <option value="" disabled>
            //     Select Role
            //   </option>
            //   <option value="ROLE_ADMIN">Admin</option>
            //   <option value="ROLE_USER">User</option>
            //   <option value="ROLE_STAFF">Staff</option>
            // </select>
            //     </div>
            //   </div>
//               <div className="form-group">
//                 <input type="submit" className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue" value="Register" />
//               </div>
//             </form>
           
//           </div>
//           </div>
//         </div>
//       </section>
//     {/* <> */}
     
//       {/* Section 2 */}
//       <section className="overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb-light">
//         <div className="container">
       
           
//         </div>
//       </section>
//       {/* END section 2 */}

//       <footer className="pb_footer bg-primary" role="contentinfo">
//         <div className="container">
//           <div className="row text-center">
//             <div className="col">
//               <ul className="list-inline">
//                 <li className="list-inline-item"><Link to="#" className="p-2"><i className="fa fa-facebook"></i></Link></li>
//                 <li className="list-inline-item"><Link to="#" className="p-2"><i className="fa fa-twitter"></i></Link></li>
//                 <li className="list-inline-item"><Link to="#" className="p-2"><i className="fa fa-linkedin"></i></Link></li>
//               </ul>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col text-center">
//               {/* Placeholder content for the footer */}
//               <p className="pb_font-14">© 2023. Floral School. All Rights Reserved. <br />  <Link to="https://floralschool.com/">Visit our Floral School Website</Link></p>
//               <p className="pb_font-14">Floral School Socials: <Link to="/" target="_blank" rel="nofollow" className='text-light'>Floral School.</Link></p>
//             </div>
//           </div>
//         </div>
//       </footer>

    
    
//     {/* </> */}

     
//       {/* </div> */}
    
//       </body>
 
//   );
// };

// export default Signup;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';
// import { signup } from './AuthContext';
// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     lastname: '',
//     email: '',
//     phone: '',
//     password: '',
//     roles: '',
//   });

//   const onInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Send signup data to the server (implement this endpoint on the server)
  //     const success = await signup({ formData });
  //   //  const success = await axios.post('http://localhost:8080/api/users/signup', formData);

  //     // Display a success message or perform other actions
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Signup Successful!',
  //       text: 'You have successfully signed up.',
  //     });

  //     if (success) {
  //       navigate('/dashboard'); // Redirect to a protected route after successful signup
  //     }
  //     // Redirect to the login page after successful signup
  //     navigate('/login');
  //   } catch (error) {
  //     // Display an error message or perform other actions on signup failure
  //     console.error('Signup failed:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Signup Failed',
  //       text: 'An error occurred during signup. Please try again.',
  //     });
  //   }
  // };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Sign Up</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 <div className="mb-3">
//                   <label className="form-label">First Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter first name"
//                       name="username"
//                       value={formData.username}
//                       onChange={(e) => onInputChange(e)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Last Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter last name"
//                       name="lastname"
//                       value={formData.lastname}
//                       onChange={(e) => onInputChange(e)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faEnvelope} />
//                     </span>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter email"
//                       name="email"
//                       value={formData.email}
//                       onChange={(e) => onInputChange(e)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faPhone} />
//                     </span>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       placeholder="Enter phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={(e) => onInputChange(e)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faLock} />
//                     </span>
//                     <input
//                       type="password"
//                       className="form-control"
//                       placeholder="Enter password"
//                       name="password"
//                       value={formData.password}
//                       onChange={(e) => onInputChange(e)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Sign Up
//                   </button>
//                   <Link to="/login" className="btn btn-outline-danger btn-lg mx-5">
//                     Cancel
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
