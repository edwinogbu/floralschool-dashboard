
// import React, { useState } from 'react';

// import Swal from 'sweetalert2';
// // import { useAuth } from './AuthContext'; // Update the path accordingly
// import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

// import { AuthProvider, useAuth } from './AuthContext';


// const Authenticate = () => {
//   const { authState, login, setAuthStatus } = useAuth();
//   const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'



//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const onInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Call the login function from the context
//       const token = await login(formData);

//       // Show a SweetAlert success message
//       Swal.fire({
//         icon: 'success',
//         title: 'Login successful!',
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       // Navigate to the UserProfile component and pass the token
//       navigate('/dashboard');
//       // navigate(`/dashboard/${token}`);
//     } catch (error) {
//       // Handle authentication failure
//       console.error('Authentication failed:', error);
//       // You might want to display an error message to the user
//     }
//   };

// import React, { useState } from 'react';
// import { createContext, useContext } from 'react';

// import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from './AuthContext';
// import { login } from './service/AuthService';

// const Authenticate = () => {
//   // const { authState, login, setAuthStatus } = useAuth();
//   const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'



//   // State to manage form data
//   const [signinData, setSigninData] = useState({
//     username: '',
//     password: '',
//   });

//   // Handler for form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSigninData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handler for form submission
//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       // Call login function from the context
//       const result = await login(signinData);
//       console.log(result);

//       // Set authentication status to true
//       // setAuthStatus(true);

//       // Redirect to the dashboard after successful sign-in
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Sign-in failed:', error);
//       // Handle error as needed
//     }
//   };


//   return (
   
//       <body data-spy="scroll" data-target="#pb-navbar" data-offset="200">
      
     
//         {/* Bootstrap Navigation Bar */}
//         <nav className="navbar navbar-expand-lg navbar-light bg-primary pb_navbar pb_scrolled-light">


//       <div className="container">
//         {/* <div className="navbar-brand"> */}
//         <Link to="/" className="navbar-brand">
//         <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:40, height:40, borderRadius:25}}/>
//         </Link>
//         {/* </div> */}
//         <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#probootstrap-navbar" aria-controls="probootstrap-navbar" aria-expanded="false" aria-label="Toggle navigation">
//           <span><i className="ion-navicon"></i></span>
//         </button>
//         <div className="collapse navbar-collapse" id="probootstrap-navbar">
//           <ul className="navbar-nav ml-auto">
             
//              <li className="nav-item cta-btn"> 
//               <Link to="/login" className="nav-link ">              
//                 <span className="pb_rounded-4 px-4">Login</span>
//               </Link>
//             </li>
            
//             <li className="nav-item cta-btn "> 
//               <Link to="/signup" className="nav-link">              
//                 <span className="pb_rounded-4 px-4">SignUp</span>
//               </Link>
//             </li>
//             <li className="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0"> 
//             {/* {authState.isAuthenticated && ( */}
//                 <li className="nav-item">
//                   <Link to="/dashboard" className="nav-link">
//                   <span className="pb_rounded-4 px-4">Dashboard</span>
//                   </Link>
//                 </li>
//               {/* )} */}
              
//             </li>
           

//           </ul>
          
//         </div>
//       </div>
//     </nav>


//     <section className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb-light" id="section-home" style={{marginBottom:23}}>
//         {/* Placeholder content for the home section */}
//         <div className="container">
//           <div className="row align-items-center justify-content-center">
//             <div className="col-md-6">
//               <h2 className="heading mb-3 bold">The Floral School Admin</h2>
//               <div className="sub-heading">
//                 <p className="mb-4">Where Your Knowledge Blossoms Like Beautiful Flowers. Join Us Today!</p>
//                 {/* <p className="mb-5"><Link to="/signup" className="btn btn-success btn-lg pb_btn-pill smoothscroll"><span className="pb_font-14 text-uppercase pb_letter-spacing-1">Get Started</span></Link></p> */}
//               </div>
//             </div>
//             <div className="col-md-1">
//           </div>
//             <div className="col-md-5 relative align-self-center mt-5 ">
           
//           <form onSubmit={handleSignIn} className="bg-white rounded pb_form_v1 mb-5">
//           <h2 className="mb-4 text-center">Sign In</h2>
//           <div className="form-group mb-4">
//             <input
//               type="text"
//               name="username"
//               value={signinData.username}
//               onChange={handleChange}
//               className="form-control pb_height-50 reverse"
//               placeholder="Username"
//               required
//             />
//           </div>
//           <div className="form-group mb-4">
           
//              <input type="text" 
//                   name="password"
//                   value={signinData.password}
//                   onChange={handleChange}
//                 className="form-control pb_height-50 reverse" 
//                 placeholder="Password" />
//           </div>
//           <div className="form-group">
//             <input
//               type="submit"
//               className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue"
//               value="Sign In"
//             />
//           </div>
//           <p className="text-center">
//             Don't have an account? <Link to="/signup">Sign Up</Link>
//           </p>
//         </form>
//           </div>
//           </div>
//         </div>
//       </section>
//     {/* <> */}
     
//       {/* Section 2 */}
//       <section className="pb_section pb_slant-light bg-light">
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

// export default Authenticate;





import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AuthContext, useAuth} from './AuthContext'
import Swal from 'sweetalert2';


const Authenticate = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  // const { user, login, getAuthToken } = useAuth();

  // const { login } = useContext(AuthContext);
  const { login } = useAuth();


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const success = await login(formData.username, formData.password);

  //   if (success) {
  //     // Redirect to the dashboard or any other desired route after successful login
  //     navigate('/dashboard');
  //   } else {
  //     // Handle login failure, show error message or perform other actions
  //     console.error('Login failed');
  //   }
  // };
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        // Redirect to the dashboard or any other desired route after successful login
        navigate('/dashboard');
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
        });
      } else {
        // Handle login failure, show error message or perform other actions
        console.error('Login failed');
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password.',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle other errors if needed
    }
  };



  return (
    <body data-spy="scroll" data-target="#pb-navbar" data-offset="200">
        {/* Bootstrap Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-primary pb_navbar pb_scrolled-light">
          <div className="container">
            {/* <div className="navbar-brand"> */}
            <Link to="/" className="navbar-brand">
            <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:20,}}/>
            </Link>
            {/* </div> */}
            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#probootstrap-navbar" aria-controls="probootstrap-navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span><i className="ion-navicon"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="probootstrap-navbar">
              <ul className="navbar-nav ml-auto">
                
                <li className="nav-item cta-btn"> 
                  <Link to="/login" className="nav-link ">              
                    <span className="pb_rounded-4 px-4">Login</span>
                  </Link>
                </li>
                
                <li className="nav-item cta-btn "> 
                  <Link to="/signup" className="nav-link">              
                    <span className="pb_rounded-4 px-4">SignUp</span>
                  </Link>
                </li>
                <li className="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0"> 
                {/* {authState.isAuthenticated && ( */}
                    <li className="nav-item">
                      <Link to="/dashboard" className="nav-link">
                      <span className="pb_rounded-4 px-4">Dashboard</span>
                      </Link>
                    </li>
                  {/* )} */}
                  
                </li>
              

              </ul>
              
            </div>
          </div>
        </nav>

      {/* Authentication Form Section */}
      <section className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb-light" id="section-auth" style={{ marginBottom: 23 }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
              <h2 className="heading mb-3 bold">Authenticate</h2>
              <div className="sub-heading">
                <p className="mb-4">Login to Your Account</p>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5 relative align-self-center mt-0">
              {/* <form onSubmit={handleSubmit} className="bg-white rounded pb_form_v1 mb-5 mb-4 mt-0">
                <h2 className="mb-4 mt-0 text-center">Login</h2>
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
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control pb_height-50 reverse"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input type="submit" className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue" value="Login" />
                </div>
              </form> */}
              <form onSubmit={handleSubmit} className="bg-white rounded pb_form_v1 mb-5 mb-4 mt-0">
                <h2 className="mb-4 mt-0 text-center">Login</h2>
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
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control pb_height-50 reverse"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input type="submit" className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue" value="Login" />
                </div>
              </form>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

  
    </body>
  );
};

export default Authenticate;



// Authenticate.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux'; // Import useDispatch
// import { loginAsync } from './service/userService';

// const Authenticate = () => {
//   const dispatch = useDispatch(); // Get the dispatch function from Redux
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prevCredentials) => ({
//       ...prevCredentials,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const success = await loginAsync(credentials, dispatch);

//     if (success) {
//       // Handle successful login (e.g., redirect to dashboard)
//       console.log('Login successful');
//     } else {
//       // Handle login failure (e.g., show an error message)
//       console.log('Login failed');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title">Login</h2>
//               <form onSubmit={handleLogin}>
//                 <div className="form-group">
//                   <label htmlFor="username">Username:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     name="username"
//                     value={credentials.username}
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
//                     value={credentials.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Login
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Authenticate;




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// // import { useAuth } from './AuthContext'; // Update the path accordingly
// import { login } from './service/AuthService';

// const Authenticate = () => {

//   // const { login } = 
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const onInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Call the login function from the context
//       const token = await login(formData);

//       // Show a SweetAlert success message
//       Swal.fire({
//         icon: 'success',
//         title: 'Login successful!',
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       // Navigate to the UserProfile component and pass the token
//       navigate('/dashboard');
//       // navigate(`/dashboard/${token}`);
//     } catch (error) {
//       // Handle authentication failure
//       console.error('Authentication failed:', error);
//       // You might want to display an error message to the user
//     }
//   };


//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Login</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 <div className="mb-3">
//                   <label className="form-label">Username</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter username"
//                     name="username"
//                     value={formData.username}
//                     onChange={(e) => onInputChange(e)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password"
//                     name="password"
//                     value={formData.password}
//                     onChange={(e) => onInputChange(e)}
//                     required
//                   />
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Login
//                   </button>
//                   <Link to="/signup" className="btn btn-outline-danger btn-lg mx-5">
//                     Sign Up
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

// export default Authenticate;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { login } from './service/AuthService';

// const Authenticate = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const onInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Call the login function from the AuthService
//       const token = await login(formData);

//       // Show a SweetAlert success message
//       Swal.fire({
//         icon: 'success',
//         title: 'Login successful!',
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       // Navigate to the Dashboard component after successful login
//       navigate('/dashboard');
//       // If you need to pass the token, you can do something like:
//       // navigate(`/dashboard/${token}`);
//     } catch (error) {
//       // Handle authentication failure
//       console.error('Authentication failed:', error);
//       // You might want to display an error message to the user
//       Swal.fire({
//         icon: 'error',
//         title: 'Authentication failed',
//         text: 'Please check your username and password',
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Login</h2>
//               <form onSubmit={onSubmit}>
//                 <div className="mb-3">
//                   <label className="form-label">Username</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter username"
//                     name="username"
//                     value={formData.username}
//                     onChange={onInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password"
//                     name="password"
//                     value={formData.password}
//                     onChange={onInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Login
//                   </button>
//                   <Link to="/signup" className="btn btn-outline-danger btn-lg mx-5">
//                     Sign Up
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

// export default Authenticate;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const Authenticate = () => {
//   const baseUrl = 'http://localhost:8080/api/users';

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   // State to store the authentication token
//   const [token, setToken] = useState('');

//   const onInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
   

//         // Show a SweetAlert success message
//         Swal.fire({
//           icon: 'success',
//           title: 'Login successful!',
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         // Navigate to the dashboard or other authenticated page
//         navigate('/dashboard');
//       } else {
//         // Handle authentication failure
//         console.error('Authentication failed:', response.data);
//         // You might want to display an error message to the user
//       }
//     } catch (error) {
//       // Handle other errors (e.g., network issues)
//       console.error('Authentication failed:', error);
//       // You might want to display an error message to the user
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Login</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 <div className="mb-3">
//                   <label className="form-label">Username</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter username"
//                     name="username"
//                     value={formData.username}
//                     onChange={(e) => onInputChange(e)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password"
//                     name="password"
//                     value={formData.password}
//                     onChange={(e) => onInputChange(e)}
//                     required
//                   />
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Login
//                   </button>
//                   <Link to="/signup" className="btn btn-outline-danger btn-lg mx-5">
//                     Sign Up
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

// export default Authenticate;
