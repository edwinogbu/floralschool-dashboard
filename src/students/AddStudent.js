// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faUser,
//   faPhone,
//   faCalendar,
//   faMapMarked,
//   faCity,
//   faUserTie,
//   faVenusMars,
//   faSortNumericUp,
//   faSortNumericDown,
//   faImage,
// } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';
// import CustomGroupSubtitlePicker from './CustomGroupSubtitlePicker ';
// // import { useAuth } from './../AuthContext';



// export default function AddStudent() {

//   // const { signUp } = useAuth();

//   const navigate = useNavigate();
//   const API_URL = 'http://localhost:8080/api/users/';

//   const BaseUrl = 'http://localhost:8080/api/students';

//     // State to manage form data
//     const [signupData, setSignupData] = useState({
//       username: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       password: '',
//       roles: '',
//     });
  

//   const [student, setStudent] = useState({

//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//     entryYear: '',
//     graduationYear: '',
//     image: null,
//   });

//   const {

//     studentName,
//     phoneNumber,
//     dob,
//     homeAddress,
//     stateOfOrigin,
//     guardianName,
//     sex,
//     level,
//     entryYear,
//     graduationYear,
//     image,
//   } = student;


//   // Handler for form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };



//   const onInputChange = (e) => {
//     if (e.target.name === 'image') {
//       setStudent({ ...student, image: e.target.files[0] });
//     } else {
//       setStudent({ ...student, [e.target.name]: e.target.value });
//     }
//   };



//   const handleLevelChange = (selectedLevel) => {
//     setStudent({ ...student, level: selectedLevel });
//   };

//   const handleUserSignup = async () => {
//     try {
//       const response = await axios.post(API_URL + '/signup', signupData);
//       console.log(response);

//       // Assuming response.data contains the token
//       const { token } = response.data;
//       localStorage.setItem('token', token);

//       Swal.fire({
//         icon: 'success',
//         title: 'User Signup Success',
//         text: 'User added successfully!',
//       });
//     } catch (error) {
//       console.error('User Signup Error:', error);
//       throw error; // Rethrow the error to trigger the student creation error block
//     }
//   };

//   const handleStudentCreation = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('studentName', studentName);
//       formData.append('phoneNumber', phoneNumber);
//       formData.append('dob', dob);
//       formData.append('homeAddress', homeAddress);
//       formData.append('stateOfOrigin', stateOfOrigin);
//       formData.append('guardianName', guardianName);
//       formData.append('sex', sex);
//       formData.append('level', level);
//       formData.append('entryYear', entryYear);
//       formData.append('graduationYear', graduationYear);
//       formData.append('image', image);

//       const studentsResponse = await axios.post(BaseUrl + '/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Students Response:', studentsResponse);

//       localStorage.setItem('students', JSON.stringify(studentsResponse.data));

//       Swal.fire({
//         icon: 'success',
//         title: 'Student Creation Success',
//         text: 'Student added successfully!',
//       });
//     } catch (error) {
//       console.error('Student Creation Error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Student Creation Error',
//         text: 'An error occurred while adding the student.',
//       });
//       throw error; // Rethrow the error to handle it in the main onSubmit catch block
//     }
//   };

//   // const onSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     await handleUserSignup();
//   //     await handleStudentCreation();

//   //     // Navigate only if both user signup and student creation are successful
//   //     navigate('/');
//   //   } catch (error) {
//   //     // The error has already been handled in the individual functions
//   //     // If needed, additional error handling can be done here
//   //   }
//   // };



  
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       // Send a POST request with signupData
//       const response = await axios.post(API_URL + '/signup', signupData);
//       console.log(response);

//       // Assuming response.data contains the token
//       const { token } = response.data;
//       localStorage.setItem('token', token);

//       // Show success alert and navigate to '/users'
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'User added successfully!',
//       }).then(() => {
//         navigate('/users');
//       });
//     } catch (error) {
//       // Show error alert
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the user.',
//       });
//     }
//   };


   

//   const renderImagePreview = () => {
//     if (image) {
//       return (
//         <div className="mb-3">
//           <label className="form-label">Image Preview</label>
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Student Image Preview"
//             className="img-fluid"
//           />
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <form onSubmit={handleStudentCreation} >

//               <h6 className="mb-4 mt-0 text-center">Sign Up Here</h6>

//               <div className="form-group mb-4 mt-0">
//                   <input
//                     type="text"
//                     name="username"
//                     value={signupData.username}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse "
//                     placeholder="First name/ username"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={signupData.lastName}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse"
//                     placeholder="Last name"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="email"
//                     value={signupData.email}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse"
//                     placeholder="Email"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="phone"
//                     value={signupData.phone}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse"
//                     placeholder="Phone"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="password"
//                     name="password"
//                     value={signupData.password}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse"
//                     placeholder="Password"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <div className="pb_select-wrap">
//                     <select
//                       name="roles"
//                       value={signupData.roles}
//                       onChange={handleChange}
//                       className="form-control pb_height-50 reverse"
//                       required
//                     >
//                       <option value="" disabled>
//                         Select Role
//                       </option>
//                       <option value="ROLE_ADMIN">Admin</option>
//                       <option value="ROLE_USER">User</option>
//                       <option value="ROLE_STAFF">Staff</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Student Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Student Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Student Name"
//                       name="studentName"
//                       value={studentName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

              

//                 {/* Date of Birth */}
//                 <div className="mb-3">
//                   <label className="form-label">Date of Birth</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={dob}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Home Address */}
//                 <div className="mb-3">
//                   <label className="form-label">Home Address</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faMapMarked} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Home Address"
//                       name="homeAddress"
//                       value={homeAddress}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* State of Origin */}
//                 <div className="mb-3">
//                   <label className="form-label">State of Origin</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCity} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter State of Origin"
//                       name="stateOfOrigin"
//                       value={stateOfOrigin}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Guardian Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Guardian Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUserTie} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Guardian Name"
//                       name="guardianName"
//                       value={guardianName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                   {/* Phone Number */}
//                   <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faPhone} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Phone Number"
//                       name="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Sex */}
//                 <div className="mb-3">
//                   <label className="form-label">Gender</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faVenusMars} />
//                     </span>
//                     <select
//                       className="form-control form-select"
//                       name="sex"
//                       value={sex}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="">Select Sex</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Level */}
//                 {/* <div className="mb-3">
//                   <label className="form-label">Level</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faSortNumericUp} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Level"
//                       name="level"
//                       value={level}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div> */}
//                  <div className="mb-3">
//                 <label className="form-label">Level</label>
//                 <CustomGroupSubtitlePicker
//                   options={[
//                     { value: 'SS1', label: 'SS1', group: 'Senior Secondary' },
//                     { value: 'SS2', label: 'SS2', group: 'Senior Secondary' },
//                     { value: 'SS3', label: 'SS3', group: 'Senior Secondary' },
//                     { value: 'JSS1', label: 'JSS1', group: 'Junior Secondary' },
//                     { value: 'JSS2', label: 'JSS2', group: 'Junior Secondary' },
//                     { value: 'JSS3', label: 'JSS3', group: 'Junior Secondary' },
//                     { value: '1', label: '1', group: 'Primary' },
//                     { value: '2', label: '2', group: 'Primary' },
//                     { value: '3', label: '3', group: 'Primary' },
//                     { value: '4', label: '4', group: 'Primary' },
//                     { value: '5', label: '5', group: 'Primary' },
//                     { value: 'Pre-Nursery', label: 'Pre-Nursery', group: 'Pre Primary' },
//                     { value: 'Nursery', label: 'Nursery', group: 'Pre Primary' },
//                     { value: 'KG', label: 'KG', group: 'Pre Primary' },
//                     { value: 'LKG', label: 'LKG (Lower Kindergarten)', group: 'Pre Primary' },
//                     { value: 'UKG', label: 'UKG (Upper Kindergarten)', group: 'Pre Primary' },
                 
//                   ]}
//                   selectedValue={level}
//                   onValueChange={handleLevelChange}
//                   placeholder="Select Level"
//                 />
//               </div>

//                 {/* Entry Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Entry Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faSortNumericUp} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Entry Year"
//                       name="entryYear"
//                       value={entryYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Graduation Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Graduation Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faSortNumericDown} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Graduation Year"
//                       name="graduationYear"
//                       value={graduationYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Image */}
//                 <div className="mb-3">
//                   <label className="form-label">Image</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     name="image"
//                     accept="image/*"
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//                 {renderImagePreview()}

//                 {/* Buttons */}
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </button>
//                   <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
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
// }

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faUser,
//   faPhone,
//   faCalendar,
//   faMapMarked,
//   faCity,
//   faUserTie,
//   faVenusMars,
//   faSortNumericUp,
//   faSortNumericDown,
//   faImage,
// } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';
// import CustomGroupSubtitlePicker from './CustomGroupSubtitlePicker ';



// export default function AddStudent() {
//   const navigate = useNavigate();
//   const API_URL = 'http://localhost:8080/api/users/';

//   const BaseUrl = 'http://localhost:8080/api/students';

//     // State to manage form data
//     const [signupData, setSignupData] = useState({
//       username: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       password: '',
//       roles: '',
//     });
  

//   const [student, setStudent] = useState({

//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//     entryYear: '',
//     graduationYear: '',
//     image: null,
//   });

//   const {

//     studentName,
//     phoneNumber,
//     dob,
//     homeAddress,
//     stateOfOrigin,
//     guardianName,
//     sex,
//     level,
//     entryYear,
//     graduationYear,
//     image,
//   } = student;


//   // Handler for form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };



//   const onInputChange = (e) => {
//     if (e.target.name === 'image') {
//       setStudent({ ...student, image: e.target.files[0] });
//     } else {
//       setStudent({ ...student, [e.target.name]: e.target.value });
//     }
//   };



//   const handleLevelChange = (selectedLevel) => {
//     setStudent({ ...student, level: selectedLevel });
//   };



// const onSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     // Send a POST request with signupData
//     const response = await axios.post(API_URL + '/signup', signupData);
//     console.log(response);

//     // Assuming response.data contains the token
//     const { token } = response.data;
//     localStorage.setItem('token', token);

//     // Show success alert and navigate to '/users'
//     Swal.fire({
//       icon: 'success',
//       title: 'Success',
//       text: 'User added successfully!',
//     }).then(() => {
//       navigate('/users');
//     });
//   } catch (error) {
//     // Show error alert
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'An error occurred while adding the user.',
//     });
//   }

//   try {
//     // Create form data for student details
//     const formData = new FormData();
//     formData.append('studentName', studentName);
//     formData.append('phoneNumber', phoneNumber);
//     formData.append('dob', dob);
//     formData.append('homeAddress', homeAddress);
//     formData.append('stateOfOrigin', stateOfOrigin);
//     formData.append('guardianName', guardianName);
//     formData.append('sex', sex);
//     formData.append('level', level);
//     formData.append('entryYear', entryYear);
//     formData.append('graduationYear', graduationYear);
//     formData.append('image', image);

  
    
//     const studentsResponse = await axios.post(BaseUrl + '/create', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // Log the responses to the console
//     // console.log('Signup Response:', signUpResponse);
//     console.log('Students Response:', studentsResponse);

//     // Store the response data in local storage or perform other actions as needed
//     localStorage.setItem('students', JSON.stringify(studentsResponse.data));

//     Swal.fire({
//       icon: 'success',
//       title: 'Success',
//       text: 'Student added successfully!',
//     }).then(() => {
//       navigate('/');
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     console.error('Response:', error.response);

//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'An error occurred while adding the student.',
//     });
//   }
// };

//   const renderImagePreview = () => {
//     if (image) {
//       return (
//         <div className="mb-3">
//           <label className="form-label">Image Preview</label>
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Student Image Preview"
//             className="img-fluid"
//           />
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <form onSubmit={(e) => onSubmit(e)}>

//               <h6 className="mb-4 mt-0 text-center">Sign Up Here</h6>

//               <div className="form-group mb-4 mt-0">
//                   <input
//                     type="text"
//                     name="username"
//                     value={signupData.username}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse "
//                     placeholder="First name/ username"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={signupData.lastName}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse"
//                     placeholder="Last name"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="email"
//                     value={signupData.email}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse"
//                     placeholder="Email"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="phone"
//                     value={signupData.phone}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse"
//                     placeholder="Phone"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="password"
//                     name="password"
//                     value={signupData.password}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse"
//                     placeholder="Password"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <div className="pb_select-wrap">
//                     <select
//                       name="roles"
//                       value={signupData.roles}
//                       onChange={handleChange}
//                       className="form-control pb_height-50 reverse"
//                       required
//                     >
//                       <option value="" disabled>
//                         Select Role
//                       </option>
//                       <option value="ROLE_ADMIN">Admin</option>
//                       <option value="ROLE_USER">User</option>
//                       <option value="ROLE_STAFF">Staff</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Student Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Student Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Student Name"
//                       name="studentName"
//                       value={studentName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

              

//                 {/* Date of Birth */}
//                 <div className="mb-3">
//                   <label className="form-label">Date of Birth</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={dob}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Home Address */}
//                 <div className="mb-3">
//                   <label className="form-label">Home Address</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faMapMarked} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Home Address"
//                       name="homeAddress"
//                       value={homeAddress}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* State of Origin */}
//                 <div className="mb-3">
//                   <label className="form-label">State of Origin</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCity} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter State of Origin"
//                       name="stateOfOrigin"
//                       value={stateOfOrigin}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Guardian Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Guardian Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUserTie} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Guardian Name"
//                       name="guardianName"
//                       value={guardianName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                   {/* Phone Number */}
//                   <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faPhone} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Phone Number"
//                       name="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Sex */}
//                 <div className="mb-3">
//                   <label className="form-label">Gender</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faVenusMars} />
//                     </span>
//                     <select
//                       className="form-control form-select"
//                       name="sex"
//                       value={sex}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="">Select Sex</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Level */}
//                 {/* <div className="mb-3">
//                   <label className="form-label">Level</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faSortNumericUp} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Level"
//                       name="level"
//                       value={level}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div> */}
//                  <div className="mb-3">
//                 <label className="form-label">Level</label>
//                 <CustomGroupSubtitlePicker
//                   options={[
//                     { value: 'SS1', label: 'SS1', group: 'Senior Secondary' },
//                     { value: 'SS2', label: 'SS2', group: 'Senior Secondary' },
//                     { value: 'SS3', label: 'SS3', group: 'Senior Secondary' },
//                     { value: 'JSS1', label: 'JSS1', group: 'Junior Secondary' },
//                     { value: 'JSS2', label: 'JSS2', group: 'Junior Secondary' },
//                     { value: 'JSS3', label: 'JSS3', group: 'Junior Secondary' },
//                     { value: '1', label: '1', group: 'Primary' },
//                     { value: '2', label: '2', group: 'Primary' },
//                     { value: '3', label: '3', group: 'Primary' },
//                     { value: '4', label: '4', group: 'Primary' },
//                     { value: '5', label: '5', group: 'Primary' },
//                     { value: 'Pre-Nursery', label: 'Pre-Nursery', group: 'Pre Primary' },
//                     { value: 'Nursery', label: 'Nursery', group: 'Pre Primary' },
//                     { value: 'KG', label: 'KG', group: 'Pre Primary' },
//                     { value: 'LKG', label: 'LKG (Lower Kindergarten)', group: 'Pre Primary' },
//                     { value: 'UKG', label: 'UKG (Upper Kindergarten)', group: 'Pre Primary' },
                 
//                   ]}
//                   selectedValue={level}
//                   onValueChange={handleLevelChange}
//                   placeholder="Select Level"
//                 />
//               </div>

//                 {/* Entry Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Entry Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faSortNumericUp} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Entry Year"
//                       name="entryYear"
//                       value={entryYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Graduation Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Graduation Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faSortNumericDown} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Graduation Year"
//                       name="graduationYear"
//                       value={graduationYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Image */}
//                 <div className="mb-3">
//                   <label className="form-label">Image</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     name="image"
//                     accept="image/*"
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//                 {renderImagePreview()}

//                 {/* Buttons */}
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </button>
//                   <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
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
// }

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPhone,
  faCalendar,
  faMapMarked,
  faCity,
  faUserTie,
  faVenusMars,
  faSortNumericUp,
  faSortNumericDown,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import CustomGroupSubtitlePicker from './CustomGroupSubtitlePicker ';



export default function AddStudent() {
  const navigate = useNavigate();
  const API_URL = 'http://localhost:8080/api/users';

  const BaseUrl = 'http://localhost:8080/api/students';

  const [userData, setUserData] = useState({
    username: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    roles: '',
  });


  const [student, setStudent] = useState({
    username: '', 
    lastName: '',
    email: '',
    phone: '',
    password: '',
    roles: '', 

    studentName: '',
    phoneNumber: '',
    dob: '',
    homeAddress: '',
    stateOfOrigin: '',
    guardianName: '',
    sex: '',
    level: '',
    entryYear: '',
    graduationYear: '',
    image: null,
  });

  const {
    username, 
    lastName,
    email,
    phone,
    password,
    roles, 

    studentName,
    phoneNumber,
    dob,
    homeAddress,
    stateOfOrigin,
    guardianName,
    sex,
    level,
    entryYear,
    graduationYear,
    image,
  } = student;


const onInputChange = (e) => {
  if (e.target.name === 'image') {
    setStudent({ ...student, image: e.target.files[0] });
  } else {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [e.target.name]: e.target.value,
      studentName:
        e.target.name === 'username'
          ? `${e.target.value} ${prevStudent.lastName}`
          : e.target.name === 'lastName'
          ? `${prevStudent.username} ${e.target.value}`
          : prevStudent.studentName,
      phoneNumber:
        e.target.name === 'phone'
          ? e.target.value
          : prevStudent.phoneNumber,
    }));
  }
};



  const handleLevelChange = (selectedLevel) => {
    setStudent({ ...student, level: selectedLevel });
  };



const onSubmit = async (e) => {
  e.preventDefault();

  try {
    // Step 1: Create user
    const userResponse = await axios.post(API_URL + '/signup', {
      username,
      lastName,
      email,
      phone,
      password,
      roles,
    });
    console.log(userResponse.data.id);
    console.log(userResponse);
    setUserData(userResponse);
    const { token, id: userId } = userResponse.data;
    localStorage.setItem('token', token);

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'User added successfully!',
    }).then(() => {
      navigate('/users');
    });

    // Step 2: Create student
    const formData = new FormData();
    formData.append('studentName', studentName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('dob', dob);
    formData.append('homeAddress', homeAddress);
    formData.append('stateOfOrigin', stateOfOrigin);
    formData.append('guardianName', guardianName);
    formData.append('sex', sex);
    formData.append('level', level);
    formData.append('entryYear', entryYear);
    formData.append('graduationYear', graduationYear);
    formData.append('image', image);
    formData.append('user_id', userId);

    const studentsResponse = await axios.post(BaseUrl + '/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Students Response:', studentsResponse);

    localStorage.setItem('students', JSON.stringify(studentsResponse.data));

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Student added successfully!',
    }).then(() => {
      navigate('/');
    });
  } catch (error) {
    console.error('Error:', error);
    console.error('Response:', error.response);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while adding the user or student.',
    });
  }
};



const renderImagePreview = () => {
    if (image) {
      return (
        <div className="mb-3">
          <label className="form-label">Image Preview</label>
          <img
            src={URL.createObjectURL(image)}
            alt="Student Image Preview"
            className="img-fluid"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Add Student</h2>
              <form onSubmit={(e) => onSubmit(e)}>
              {/* <form onSubmit={handleSubmit}> */}

              <h6 className="mb-4 mt-0 text-center">Sign Up Details</h6>

                {/*  Name */}
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Student Name/ userName"
                      name="username"
                      value={username}
                      onChange={(e) => onInputChange(e)}
                      // value={signupData.username}
                      // onChange={handleChange}
                    />
                  </div>
                </div>

              <div className="form-group">
                <input type="text"
                 name="lastName"
                 value={lastName}
                 onChange={(e) => onInputChange(e)}
                // value={signupData.lastName}
                // onChange={handleChange}
                 className="form-control pb_height-50 reverse"
                  placeholder="Last name" />
              </div>
              <div className="form-group">
                <input type="text" 
                 name="email"
                 value={email}
                 onChange={(e) => onInputChange(e)}
                // value={signupData.email}
                // onChange={handleChange}
                 className="form-control pb_height-50 reverse" 
                placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="text" 
                  name="phone"
                  value={phone}
                  onChange={(e) => onInputChange(e)}
                  // value={signupData.phone}
                  // onChange={handleChange}
                  className="form-control pb_height-50 reverse" 
                placeholder="Phone" />
              </div>
              <div className="form-group">
                <input type="text" 
                  name="password"
                  value={password}
                  onChange={(e) => onInputChange(e)}
                  // value={signupData.password}
                  // onChange={handleChange}
                  className="form-control pb_height-50 reverse" 
                placeholder="Password" />
              </div>
              <div className="form-group">
                <div className="pb_select-wrap">
                  <select
                    name="roles"
                    value={roles}
                    onChange={(e) => onInputChange(e)}
                    // value={signupData.roles}
                    // onChange={handleChange}
                    className="form-control pb_height-50 reverse"
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
         
              <h6 className="mb-4 mt-0 text-center">Student Details</h6>

                {/* Student Name */}
                <div className="mb-3">
                  <label className="form-label">Student Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Student Name"
                      name="studentName"
                      value={studentName}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

              

                {/* Date of Birth */}
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCalendar} />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      value={dob}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

                {/* Home Address */}
                <div className="mb-3">
                  <label className="form-label">Home Address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faMapMarked} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Home Address"
                      name="homeAddress"
                      value={homeAddress}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

                {/* State of Origin */}
                <div className="mb-3">
                  <label className="form-label">State of Origin</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCity} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter State of Origin"
                      name="stateOfOrigin"
                      value={stateOfOrigin}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

                {/* Guardian Name */}
                <div className="mb-3">
                  <label className="form-label">Guardian Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUserTie} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Guardian Name"
                      name="guardianName"
                      value={guardianName}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

                  {/* Phone Number */}
                  <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

                {/* Sex */}
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faVenusMars} />
                    </span>
                    <select
                      className="form-control form-select"
                      name="sex"
                      value={sex}
                      onChange={(e) => onInputChange(e)}
                    >
                      <option value="">Select Sex</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Level */}
                {/* <div className="mb-3">
                  <label className="form-label">Level</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faSortNumericUp} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Level"
                      name="level"
                      value={level}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div> */}
                 <div className="mb-3">
                <label className="form-label">Level</label>
                <CustomGroupSubtitlePicker
                  options={[
                    { value: 'SS1', label: 'SS1', group: 'Senior Secondary' },
                    { value: 'SS2', label: 'SS2', group: 'Senior Secondary' },
                    { value: 'SS3', label: 'SS3', group: 'Senior Secondary' },
                    { value: 'JSS1', label: 'JSS1', group: 'Junior Secondary' },
                    { value: 'JSS2', label: 'JSS2', group: 'Junior Secondary' },
                    { value: 'JSS3', label: 'JSS3', group: 'Junior Secondary' },
                    { value: '1', label: '1', group: 'Primary' },
                    { value: '2', label: '2', group: 'Primary' },
                    { value: '3', label: '3', group: 'Primary' },
                    { value: '4', label: '4', group: 'Primary' },
                    { value: '5', label: '5', group: 'Primary' },
                    { value: 'Pre-Nursery', label: 'Pre-Nursery', group: 'Pre Primary' },
                    { value: 'Nursery', label: 'Nursery', group: 'Pre Primary' },
                    { value: 'KG', label: 'KG', group: 'Pre Primary' },
                    { value: 'LKG', label: 'LKG (Lower Kindergarten)', group: 'Pre Primary' },
                    { value: 'UKG', label: 'UKG (Upper Kindergarten)', group: 'Pre Primary' },
                 
                  ]}
                  selectedValue={level}
                  onValueChange={handleLevelChange}
                  placeholder="Select Level"
                />
              </div>

                {/* Entry Year */}
                <div className="mb-3">
                  <label className="form-label">Entry Year</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faSortNumericUp} />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Entry Year"
                      name="entryYear"
                      value={entryYear}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

                {/* Graduation Year */}
                <div className="mb-3">
                  <label className="form-label">Graduation Year</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faSortNumericDown} />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Graduation Year"
                      name="graduationYear"
                      value={graduationYear}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    accept="image/*"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                {renderImagePreview()}

                {/* Buttons */}
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Save
                  </button>
                  <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
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


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPhone, faCalendar, faHome, faUserTie, faVenusMars, faChalkboard, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';
// import CustomGroupSubtitlePicker from './CustomGroupSubtitlePicker ';

// export default function AddStudent() {
//   const navigate = useNavigate();

//   // Define the base URL for your API.
//   const BaseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: 'pre-nursery',
//     entryYear: '',
//     graduationYear: '',
//     image:null
//   });

//   const { studentName, phoneNumber, dob, homeAddress, stateOfOrigin, guardianName, sex, level, entryYear, graduationYear, image } = student;


//   const onInputChange = (e) => {
//     if (e.target.name === 'image') {
//       setStudent({ ...student, image: e.target.files[0] });
//     } else {
//        setStudent({ ...student, [e.target.name]: e.target.value });

//     }
//   };

//   const handleLevelChange = (selectedLevel) => {
//     setStudent({ ...student, level: selectedLevel });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a POST request to the API to add the student with the form data.
//       const response = await axios.post(BaseUrl + '/save', student);
//       console.log(response);
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/view-students');
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       console.error('Response:', error.response);  // Log the response for more details
  
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };


//   const renderImagePreview = () => {
//     if (image) {
//       return (
//         <div className="mb-3">
//           <label className="form-label">Image Preview</label>
//           <img src={URL.createObjectURL(image)} alt="Student Preview"  className="img-fluid"
//           />
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     // <div className="container">
//     //   <div className="row justify-content-center mt-5">
//     //     <div className="col-md-6">
//     //       <div className="card shadow">
//     //         <div className="card-body">
//     //           <h2 className="text-center mb-4">Add Student</h2>
//     //           <form onSubmit={(e) => onSubmit(e)}>
//     //             <div className="mb-3">
//     //               <label className="form-label">Student Name</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faUser} />
//     //                 </span>
//     //                 <input
//     //                   type="text"
//     //                   className="form-control"
//     //                   placeholder="Enter Student Name"
//     //                   name="studentName"
//     //                   value={studentName}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 />
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">Phone Number</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faPhone} />
//     //                 </span>
//     //                 <input
//     //                   type="tel"
//     //                   className="form-control"
//     //                   placeholder="Enter Phone Number"
//     //                   name="phoneNumber"
//     //                   value={phoneNumber}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 />
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">Date of Birth</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faCalendar} />
//     //                 </span>
//     //                 <input
//     //                   type="date"
//     //                   className="form-control"
//     //                   name="dob"
//     //                   value={dob}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 />
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">Home Address</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faHome} />
//     //                 </span>
//     //                 <input
//     //                   type="text"
//     //                   className="form-control"
//     //                   placeholder="Enter Home Address"
//     //                   name="homeAddress"
//     //                   value={homeAddress}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 />
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">State of Origin</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faUserTie} />
//     //                 </span>
//     //                 <input
//     //                   type="text"
//     //                   className="form-control"
//     //                   placeholder="Enter State of Origin"
//     //                   name="stateOfOrigin"
//     //                   value={stateOfOrigin}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 />
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">Guardian Name</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faUser} />
//     //                 </span>
//     //                 <input
//     //                   type="text"
//     //                   className="form-control"
//     //                   placeholder="Enter Guardian Name"
//     //                   name="guardianName"
//     //                   value={guardianName}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 />
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">Sex</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faVenusMars} />
//     //                 </span>
//     //                 <select
//     //                   className="form-select form-control"
//     //                   name="sex"
//     //                   value={sex}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 >
//     //                   <option value="" disabled>Select Sex</option>
//     //                   <option value="male">Male</option>
//     //                   <option value="female">Female</option>
//     //                 </select>
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">Level</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faChalkboard} />
//     //                 </span>
//     //                 <select
//     //                   className="custom-form-select form-control"
//     //                   name="level"
//     //                   value={level}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 >
//     //                   <option value="pre-nursery">Pre-Nursery</option>
//     //                   <option value="nursery">Nursery</option>
//     //                   <option value="pre-primary">Pre-Primary</option>
//     //                   <option value="primary">Primary</option>
//     //                   <option value="secondary">Secondary</option>
//     //                 </select>
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">Entry Year</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faCalendar} />
//     //                 </span>
//     //                 <input
//     //                   type="date"
//     //                   className="form-control"
//     //                   name="entryYear"
//     //                   value={entryYear}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 />
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">Graduation Year</label>
//     //               <div className="input-group">
//     //                 <span className="input-group-text">
//     //                   <FontAwesomeIcon icon={faGraduationCap} />
//     //                 </span>
//     //                 <input
//     //                   type="date"
//     //                   className="form-control"
//     //                   name="graduationYear"
//     //                   value={graduationYear}
//     //                   onChange={(e) => onInputChange(e)}
//     //                 />
//     //               </div>
//     //             </div>
//     //             <div className="mb-3">
//     //               <label className="form-label">Image</label>
//     //               <input
//     //                 type="file"
//     //                 className="form-control"
//     //                 name="image"
//     //                 accept="image/*"
//     //                 onChange={(e) => onInputChange(e)}
//     //               />
//     //             </div>
//     //             {renderImagePreview()}
//     //             <div className="d-flex justify-content-center">
//     //               <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//     //                 Save
//     //               </button>
//     //               <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
//     //                 Cancel
//     //               </Link>
//     //             </div>
//     //           </form>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="container">
//     <div className="row justify-content-center mt-5">
//       <div className="col-md-6">
//         <div className="card shadow">
//           <div className="card-body">
//             <h2 className="text-center mb-4">Add Student</h2>
//             <form onSubmit={(e) => onSubmit(e)}>
//               <div className="mb-3">
//                 <label className="form-label">Student Name</label>
//                 <div className="input-group">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faUser} />
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Student Name"
//                     name="studentName"
//                     value={studentName}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Phone Number</label>
//                 <div className="input-group">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faPhone} />
//                   </span>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     placeholder="Enter Phone Number"
//                     name="phoneNumber"
//                     value={phoneNumber}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Date of Birth</label>
//                 <div className="input-group">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faCalendar} />
//                   </span>
//                   <input
//                     type="date"
//                     className="form-control"
//                     name="dob"
//                     value={dob}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Home Address</label>
//                 <div className="input-group">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faHome} />
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Home Address"
//                     name="homeAddress"
//                     value={homeAddress}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">State of Origin</label>
//                 <div className="input-group">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faUserTie} />
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter State of Origin"
//                     name="stateOfOrigin"
//                     value={stateOfOrigin}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Guardian Name</label>
//                 <div className="input-group">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faUser} />
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Guardian Name"
//                     name="guardianName"
//                     value={guardianName}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Sex</label>
//                 <div className="input-group">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faVenusMars} />
//                   </span>
//                   <select
//                     className="form-select form-control"
//                     name="sex"
//                     value={sex}
//                     onChange={(e) => onInputChange(e)}
//                   >
//                     <option value="" disabled>Select Sex</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Level</label>
//                 <CustomGroupSubtitlePicker
//                   options={[
//                     { value: 'SS1', label: 'SS1', group: 'Senior Secondary' },
//                     { value: 'SS2', label: 'SS2', group: 'Senior Secondary' },
//                     { value: 'SS3', label: 'SS3', group: 'Senior Secondary' },
//                     { value: 'JSS1', label: 'JSS1', group: 'Junior Secondary' },
//                     { value: 'JSS2', label: 'JSS2', group: 'Junior Secondary' },
//                     { value: 'JSS3', label: 'JSS3', group: 'Junior Secondary' },
//                     { value: '1', label: '1', group: 'Primary' },
//                     { value: '2', label: '2', group: 'Primary' },
//                     { value: '3', label: '3', group: 'Primary' },
//                     { value: '4', label: '4', group: 'Primary' },
//                     { value: '5', label: '5', group: 'Primary' },
//                     { value: 'Pre-Nursery', label: 'Pre-Nursery', group: 'Pre Primary' },
//                     { value: 'Nursery', label: 'Nursery', group: 'Pre Primary' },
//                     { value: 'KG', label: 'KG', group: 'Pre Primary' },
//                     { value: 'LKG', label: 'LKG (Lower Kindergarten)', group: 'Pre Primary' },
//                     { value: 'UKG', label: 'UKG (Upper Kindergarten)', group: 'Pre Primary' },
                 
//                   ]}
//                   selectedValue={level}
//                   onValueChange={handleLevelChange}
//                   placeholder="Select Level"
//                 />
//                </div>
//               <div className="mb-3">
//                 <label className="form-label">Entry Year</label>
//                 <div className="input-group">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faCalendar} />
//                   </span>
//                   <input
//                     type="date"
//                     className="form-control"
//                     name="entryYear"
//                     value={entryYear}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Graduation Year</label>
//                 <div className="input-group">
//                   <span className="input-group-text">
//                     <FontAwesomeIcon icon={faGraduationCap} />
//                   </span>
//                   <input
//                     type="date"
//                     className="form-control"
//                     name="graduationYear"
//                     value={graduationYear}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Image</label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   name="image"
//                   accept="image/*"
//                   onChange={(e) => onInputChange(e)}
//                 />
//               </div>
//               {renderImagePreview()}
//               <div className="d-flex justify-content-center">
//                 <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                   Save
//                 </button>
//                 <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
//                   Cancel
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// }


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPhone, faCalendar, faHome, faUserTie, faVenusMars, faChalkboard, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';

// export default function AddStudent() {
//   const navigate = useNavigate();

//   // Define the base URL for your API.
//   const BaseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: 'pre-nursery',
//     entryYear: '',
//     graduationYear: '',
//     image:null
//   });

//   const { studentName, phoneNumber, dob, homeAddress, stateOfOrigin, guardianName, sex, level, entryYear, graduationYear, image } = student;


//   const onInputChange = (e) => {
//     if (e.target.name === 'image') {
//       setStudent({ ...student, image: e.target.files[0] });
//     } else {
//        setStudent({ ...student, [e.target.name]: e.target.value });

//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a POST request to the API to add the student with the form data.
//       await axios.post(BaseUrl + '/create', student);

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/view-students');
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       console.error('Response:', error.response);  // Log the response for more details
  
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };


//   const renderImagePreview = () => {
//     if (image) {
//       return (
//         <div className="mb-3">
//           <label className="form-label">Image Preview</label>
//           <img src={URL.createObjectURL(image)} alt="Student Preview"  className="img-fluid"
//           />
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 <div className="mb-3">
//                   <label className="form-label">Student Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Student Name"
//                       name="studentName"
//                       value={studentName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faPhone} />
//                     </span>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       placeholder="Enter Phone Number"
//                       name="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Date of Birth</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={dob}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Home Address</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faHome} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Home Address"
//                       name="homeAddress"
//                       value={homeAddress}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">State of Origin</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUserTie} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter State of Origin"
//                       name="stateOfOrigin"
//                       value={stateOfOrigin}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Guardian Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Guardian Name"
//                       name="guardianName"
//                       value={guardianName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Sex</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faVenusMars} />
//                     </span>
//                     <select
//                       className="form-select form-control"
//                       name="sex"
//                       value={sex}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="" disabled>Select Sex</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Level</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faChalkboard} />
//                     </span>
//                     <select
//                       className="custom-form-select form-control"
//                       name="level"
//                       value={level}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="pre-nursery">Pre-Nursery</option>
//                       <option value="nursery">Nursery</option>
//                       <option value="pre-primary">Pre-Primary</option>
//                       <option value="primary">Primary</option>
//                       <option value="secondary">Secondary</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Entry Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="entryYear"
//                       value={entryYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Graduation Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faGraduationCap} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="graduationYear"
//                       value={graduationYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Image</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     name="image"
//                     accept="image/*"
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//                 {renderImagePreview()}
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </button>
//                   <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
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
// }


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPhone, faCalendar, faHome, faUserTie, faVenusMars, faChalkboard, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';

// export default function AddStudent() {
//   const navigate = useNavigate();

//   // Define the base URL for your API.
//   const BaseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: 'pre-nursery',
//     entryYear: '',
//     graduationYear: '',
//   });

//   const { studentName, phoneNumber, dob, homeAddress, stateOfOrigin, guardianName, sex, level, entryYear, graduationYear } = student;

//   const onInputChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a POST request to the API to add the student with the form data.
//       await axios.post(BaseUrl + '/create', student);

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/');
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       console.error('Response:', error.response);  // Log the response for more details
  
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 <div className="mb-3">
//                   <label className="form-label">Student Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Student Name"
//                       name="studentName"
//                       value={studentName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faPhone} />
//                     </span>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       placeholder="Enter Phone Number"
//                       name="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Date of Birth</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={dob}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Home Address</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faHome} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Home Address"
//                       name="homeAddress"
//                       value={homeAddress}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">State of Origin</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUserTie} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter State of Origin"
//                       name="stateOfOrigin"
//                       value={stateOfOrigin}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Guardian Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Guardian Name"
//                       name="guardianName"
//                       value={guardianName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Sex</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faVenusMars} />
//                     </span>
//                     <select
//                       className="form-select form-control"
//                       name="sex"
//                       value={sex}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="" disabled>Select Sex</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Level</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faChalkboard} />
//                     </span>
//                     <select
//                       className="custom-form-select form-control"
//                       name="level"
//                       value={level}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="pre-nursery">Pre-Nursery</option>
//                       <option value="nursery">Nursery</option>
//                       <option value="pre-primary">Pre-Primary</option>
//                       <option value="primary">Primary</option>
//                       <option value="secondary">Secondary</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Entry Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="entryYear"
//                       value={entryYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Graduation Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faGraduationCap} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="graduationYear"
//                       value={graduationYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </button>
//                   <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
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
// }


// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const AddStudent = () => {
//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//     entryYear: '',
//     graduationYear: '',
//     registerNumber: '',
//     imageUrl: '', // Assuming the image is stored as a URL
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudent({ ...student, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setStudent({ ...student, imageUrl: file });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       for (const key in student) {
//         formData.append(key, student[key]);
//       }

//       await axios.post('http://localhost:8080/api/students/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Reset form after successful submission
//       setStudent({
//         studentName: '',
//         phoneNumber: '',
//         dob: '',
//         homeAddress: '',
//         stateOfOrigin: '',
//         guardianName: '',
//         sex: '',
//         level: '',
//         entryYear: '',
//         graduationYear: '',
//         registerNumber: '',
//         imageUrl: '',
//       });

//       // Show success message using SweetAlert2
//       Swal.fire({
//         title: 'Success!',
//         text: 'Student added successfully.',
//         icon: 'success',
//       });
//     } catch (error) {
//       console.error('Error adding student:', error);

//       // Show error message using SweetAlert2
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to add student. Please try again.',
//         icon: 'error',
//       });
//     }
//   };

//   return (
//     <div className="container mt-5">
//     <div className="card">
//       <div className="card-header bg-primary text-white">
//         <h2 className="mb-0">Exam Results Viewer</h2>
//       </div>
//       <h2>Add Student</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Add Bootstrap 4 form elements here */}
//         <div className="form-group">
//           <label htmlFor="studentName">Student Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="studentName"
//             name="studentName"
//             value={student.studentName}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="phoneNumber">Phone Number</label>
//           <input
//             type="text"
//             className="form-control"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={student.phoneNumber}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="dob">Date of Birth</label>
//           <input
//             type="date"
//             className="form-control"
//             id="dob"
//             name="dob"
//             value={student.dob}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="homeAddress">Home Address</label>
//           <textarea
//             className="form-control"
//             id="homeAddress"
//             name="homeAddress"
//             value={student.homeAddress}
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         <div className="form-group">
//           <label htmlFor="stateOfOrigin">State of Origin</label>
//           <input
//             type="text"
//             className="form-control"
//             id="stateOfOrigin"
//             name="stateOfOrigin"
//             value={student.stateOfOrigin}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="guardianName">Guardian Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="guardianName"
//             name="guardianName"
//             value={student.guardianName}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="sex">Sex</label>
//           <select
//             className="form-control"
//             id="sex"
//             name="sex"
//             value={student.sex}
//             onChange={handleChange}
//           >
//             <option value="">Select Sex</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>

      
//         <div className="form-group">
//           <label htmlFor="level">Level</label>
//           <select
//             className="form-control"
//             id="level"
//             name="level"
//             value={student.level}
//             onChange={handleChange}
//           >
//             <option value="" disabled>Select Level</option>
//             <option value="Pre-school">Pre-school</option>
//             <option value="Nursery">Nursery</option>
//             <option value="Primary">Primary</option>
//             <option value="Secondary">Secondary</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="entryYear">Entry Year</label>
//           <input
//             type="date"
//             className="form-control"
//             id="entryYear"
//             name="entryYear"
//             value={student.entryYear}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="graduationYear">Graduation Year</label>
//           <input
//             type="date"
//             className="form-control"
//             id="graduationYear"
//             name="graduationYear"
//             value={student.graduationYear}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="registerNumber">Register Number</label>
//           <input
//             type="text"
//             className="form-control"
//             id="registerNumber"
//             name="registerNumber"
//             value={student.registerNumber}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Image</label>
//           <input
//             type="file"
//             className="form-control-file"
//             id="image"
//             name="image"
//             onChange={handleImageChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Add Student
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default AddStudent;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// function AddStudent() {
//   const navigate = useNavigate();
//   const baseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     entryYear: '',
//     homeAddress: '',
//     level: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     graduationYear: '',
//   });

//   const [image, setImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');

//   const onInputChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const onImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setImageUrl(URL.createObjectURL(file));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('studentName', student.studentName);
//       formData.append('phoneNumber', student.phoneNumber);
//       formData.append('dob', student.dob);
//       formData.append('entryYear', student.entryYear);
//       formData.append('homeAddress', student.homeAddress);
//       formData.append('level', student.level);
//       formData.append('stateOfOrigin', student.stateOfOrigin);
//       formData.append('guardianName', student.guardianName);
//       formData.append('sex', student.sex);
//       formData.append('graduationYear', student.graduationYear);
//       formData.append('image', image);

//       await axios.post(baseUrl + '/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/view-students');
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <Form onSubmit={onSubmit}>
//                 {/* Student Name */}
//                 <Form.Group controlId="formStudentName">
//                   <Form.Label>Student Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter student name"
//                     name="studentName"
//                     value={student.studentName}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Phone Number */}
//                 <Form.Group controlId="formPhoneNumber">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     placeholder="Enter phone number"
//                     name="phoneNumber"
//                     value={student.phoneNumber}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Date of Birth */}
//                 <Form.Group controlId="formDob">
//                   <Form.Label>Date of Birth</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="dob"
//                     value={student.dob}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Date of Entry */}
//                 <Form.Group controlId="formEntryYear">
//                   <Form.Label>Date of Entry</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="entryYear"
//                     value={student.entryYear}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Home Address */}
//                 <Form.Group controlId="formHomeAddress">
//                   <Form.Label>Home Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter home address"
//                     name="homeAddress"
//                     value={student.homeAddress}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* State of Origin */}
//                 <Form.Group controlId="formStateOfOrigin">
//                   <Form.Label>State of Origin</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter state of origin"
//                     name="stateOfOrigin"
//                     value={student.stateOfOrigin}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Guardian Name */}
//                 <Form.Group controlId="formGuardianName">
//                   <Form.Label>Guardian Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter guardian name"
//                     name="guardianName"
//                     value={student.guardianName}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Sex */}
//                 <Form.Group controlId="formSex">
//                   <Form.Label>Sex</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="sex"
//                     value={student.sex}
//                     onChange={onInputChange}
//                   >
//                     <option value="" disabled>Select sex</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </Form.Control>
//                 </Form.Group>

//                 {/* Level */}
//                 <Form.Group controlId="formLevel">
//                   <Form.Label>Level</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="level"
//                     value={student.level}
//                     onChange={onInputChange}
//                   >
//                     <option value="" disabled>Select Level</option>
//                     <option value="Pre-school">Pre-school</option>
//                     <option value="Nursery">Nursery</option>
//                     <option value="Primary">Primary</option>
//                     <option value="Secondary">Secondary</option>
//                   </Form.Control>
//                 </Form.Group>

//                 {/* Graduation Year */}
//                 <Form.Group controlId="formGraduationYear">
//                   <Form.Label>Graduation Year</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="graduationYear"
//                     value={student.graduationYear}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Image Upload */}
//                 <Form.Group controlId="formImage">
//                   <Form.Label>Image</Form.Label>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={onImageChange}
//                   />
//                 </Form.Group>

//                 {/* Image Preview */}
//                 {imageUrl && (
//                   <div className="mb-3">
//                     <label className="form-label">Image Preview</label>
//                     <img
//                       src={imageUrl}
//                       alt="Student Image Preview"
//                       className="img-fluid"
//                     />
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <div className="d-flex justify-content-center">
//                   <Button type="submit" variant="outline-primary" size="lg" className="mx-5">
//                     Save
//                   </Button>
//                   <Link to="/view-students" className="btn btn-outline-danger btn-lg mx-5">
//                     Cancel
//                   </Link>
//                 </div>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddStudent;



// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const AddStudent = () => {
//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//     entryYear: '',
//     graduationYear: '',
//     registerNumber: '',
//     imageUrl: '',
//   });

//   const [error, setError] = useState(null); // New state to handle errors

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudent((prevStudent) => ({
//       ...prevStudent,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const image = e.target.files[0];
//     setStudent((prevStudent) => ({
//       ...prevStudent,
//       image,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Log the collected data
//       console.log('Collected Data:', student);

//       const formData = new FormData();
//       for (const key in student) {
//         formData.append(key, student[key]);
//       }

//       // Log the FormData
//       console.log('Form Data:', formData);

//       await axios.post('http://localhost:8080/api/students/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Log a success message
//       console.log('Student Added Successfully');

//       Swal.fire({
//         icon: 'success',
//         title: 'Student Added Successfully',
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       // Handle success, e.g., redirect or show a success message
//     } catch (error) {
//       // Log and set the error state
//       console.error('Error adding student:', error);
//       setError('An error occurred while adding the student.');

//       // Display an error message using SweetAlert2
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!',
//       });
//     }
//   };

//   // const [student, setStudent] = useState({
//   //   studentName: '',
//   //   phoneNumber: '',
//   //   dob: '',
//   //   homeAddress: '',
//   //   stateOfOrigin: '',
//   //   guardianName: '',
//   //   sex: '',
//   //   level: '',
//   //   entryYear: '',
//   //   graduationYear: '',
//   //   registerNumber: '',
//   //   imageUrl: '',
//   //   image: null,
//   // });

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setStudent((prevStudent) => ({
//   //     ...prevStudent,
//   //     [name]: value,
//   //   }));
//   // };

//   // const handleImageChange = (e) => {
//   //   const file = e.target.files[0];
//   //   setStudent((prevStudent) => ({
//   //     ...prevStudent,
//   //     image: file,
//   //   }));
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   try {
//   //     const formData = new FormData();
  
//   //     formData.append('studentName', student.studentName);
//   //     formData.append('phoneNumber', student.phoneNumber);
//   //     formData.append('dob', student.dob);
//   //     formData.append('homeAddress', student.homeAddress);
//   //     formData.append('stateOfOrigin', student.stateOfOrigin);
//   //     formData.append('guardianName', student.guardianName);
//   //     formData.append('sex', student.sex);
//   //     formData.append('level', student.level);
//   //     formData.append('entryYear', student.entryYear);
//   //     formData.append('graduationYear', student.graduationYear);
//   //     formData.append('registerNumber', student.registerNumber);
      
//   //     // Append the image file
//   //     formData.append('image', student.image);
  
//   //     const response = await axios.post('http://localhost:8080/api/students/create', formData);
  
//   //     if (response.status === 201) {
//   //       Swal.fire({
//   //         icon: 'success',
//   //         title: 'Success',
//   //         text: 'Student created successfully!',
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error('Error creating student:', error);
  
//   //     Swal.fire({
//   //       icon: 'error',
//   //       title: 'Error',
//   //       html: `An error occurred while creating the student.<br><pre>${JSON.stringify(error, null, 2)}</pre>`,
//   //     });
//   //   }
//   // };
  

//   return (
//     <div className="container">
//     <div className="row justify-content-center mt-5">
//       <div className="col-md-8">
//         <div className="card shadow">
//           <div className="card-body">
//       <h1 className="h3 mb-4 text-gray-800">Add Student</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="studentName">Student Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="studentName"
//             name="studentName"
//             value={student.studentName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="phoneNumber">Phone Number:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={student.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="dob">Date of Birth:</label>
//           <input
//             type="date"
//             className="form-control"
//             id="dob"
//             name="dob"
//             value={student.dob}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="homeAddress">Home Address:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="homeAddress"
//             name="homeAddress"
//             value={student.homeAddress}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="stateOfOrigin">State of Origin:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="stateOfOrigin"
//             name="stateOfOrigin"
//             value={student.stateOfOrigin}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="guardianName">Guardian Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="guardianName"
//             name="guardianName"
//             value={student.guardianName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="sex">Sex:</label>
//           <select
//             className="form-control"
//             id="sex"
//             name="sex"
//             value={student.sex}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Sex</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="level">Level:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="level"
//             name="level"
//             value={student.level}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="entryYear">Entry Year:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="entryYear"
//             name="entryYear"
//             value={student.entryYear}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="graduationYear">Graduation Year:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="graduationYear"
//             name="graduationYear"
//             value={student.graduationYear}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="registerNumber">Register Number:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="registerNumber"
//             name="registerNumber"
//             value={student.registerNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Student Image:</label>
//           <input
//             type="file"
//             className="form-control-file"
//             id="image"
//             name="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//           />
//           {student.image && (
//             <img
//               src={URL.createObjectURL(student.image)}
//               alt="Student Preview"
//               className="img-thumbnail mt-2"
//               style={{ width: '200px', height: '200px' }}
//             />
//           )}
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Create Student
//         </button>
//       </form>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default AddStudent;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Form, Button, } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// function AddStudent() {
//   const navigate = useNavigate();
//   const baseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     entryYear: '',
//     homeAddress: '',
//     level: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//   });

//   const onInputChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(baseUrl + '/createStudent', student);

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/view-students');
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <Form onSubmit={onSubmit}>
//                 {/* Student Name */}
//                 <Form.Group controlId="formStudentName">
//                   <Form.Label>Student Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter student name"
//                     name="studentName"
//                     value={student.studentName}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Phone Number */}
//                 <Form.Group controlId="formPhoneNumber">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     placeholder="Enter phone number"
//                     name="phoneNumber"
//                     value={student.phoneNumber}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Date of Birth */}
//                 <Form.Group controlId="formDob">
//                   <Form.Label>Date of Birth</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="dob"
//                     value={student.dob}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>
//                 {/* Date of Birth */}
//                 <Form.Group controlId="formDob">
//                   <Form.Label>Date of Entry</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="entryYear"
//                     value={student.entryYear}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>
//                 {/* Date of Birth */}
//                 <Form.Group controlId="formDob">
//                   <Form.Label>Date of GraduationYear</Form.Label>
//                   <Form.Control
//                     type="date"   
//                     name="graduationYear"
//                     value={student.graduationYear}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Home Address */}
//                 <Form.Group controlId="formHomeAddress">
//                   <Form.Label>Home Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter home address"
//                     name="homeAddress"
//                     value={student.homeAddress}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* State of Origin */}
//                 <Form.Group controlId="formStateOfOrigin">
//                   <Form.Label>State of Origin</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter state of origin"
//                     name="stateOfOrigin"
//                     value={student.stateOfOrigin}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Guardian Name */}
//                 <Form.Group controlId="formGuardianName">
//                   <Form.Label>Guardian Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter guardian name"
//                     name="guardianName"
//                     value={student.guardianName}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Sex */}
//                 <Form.Group controlId="formSex">
//                   <Form.Label>Sex</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="sex"
//                     value={student.sex}
//                     onChange={onInputChange}
//                   >
//                     <option value="" disabled>Select sex</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </Form.Control>
//                 </Form.Group>

//                 {/* Level */}
//                 <Form.Group controlId="formLevel">
//                   <Form.Label>Level</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="level"
//                     value={student.level}
//                     onChange={onInputChange}
//                   >
//                     <option value="" disabled>Select Level</option>
//                     <option value="Pre-school">Pre-school</option>
//                     <option value="Nursery">Nursery</option>
//                     <option value="Primary">Primary</option>
//                     <option value="Secondary">Secondary</option>
//                   </Form.Control>
//                 </Form.Group>

//                 {/* Submit Button */}
//                 <div className="d-flex justify-content-center">
//                   <Button type="submit" variant="outline-primary" size="lg" className="mx-5">
//                     Save
//                   </Button>
//                   <Link to="/view-students" className="btn btn-outline-danger btn-lg mx-5">
//                     Cancel
//                   </Link>
//                 </div>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddStudent;



// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const AddExamRecord = () => {
//   const [schoolLevels, setSchoolLevels] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState('');
//   const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [terms, setTerms] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [selectedTerms, setSelectedTerms] = useState('');
//   const [studentsData, setStudentsData] = useState([]);
//   const studentNameUrl = 'http://localhost:8080/api/students';

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['pre-school', 'Nursery', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
    
//   }, []);

//   // Simulated API call to fetch student names
//   useEffect(() => {
//     const fetchStudentNames = async () => {
//       try {
//         const response = await axios.get(studentNameUrl + '/viewAllStudents');
//         const studentNames = response.data.map((student) => student.studentName);
//         setStudentsData(getSimulatedStudentData(selectedCourse, studentNames));
//       } catch (error) {
//         console.error('Error fetching student names:', error);
//       }
//     };

//     fetchStudentNames();
//   }, [selectedLevel, selectedYear, selectedCourse, selectedTerms]);

//   // Fetch years based on selected level
//   useEffect(() => {
//     if (selectedLevel) {
//       // Simulated API call to fetch years based on selected level
//       const fetchedYears = generateYearRange();
//       setYears(fetchedYears);
//     } else {
//       setYears([]);
//       setSelectedYear('');
//     }
//   }, [selectedLevel]);

//   // Fetch courses based on selected level and year
//   useEffect(() => {
//     if (selectedLevel && selectedYear) {
//       // Simulated API call to fetch courses based on selected level and year
//       const fetchedCourses = ['Mathematics', 'English Language', 'Science'];
//       setCourses(fetchedCourses);
//     } else {
//       setCourses([]);
//       setSelectedCourse('');
//     }
//   }, [selectedLevel, selectedYear]);

//   // Fetch terms based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse) {
//       // Simulated API call to fetch terms based on selected level, year, and course
//       const fetchedTerms = ['first', 'second', 'third'];
//       setTerms(fetchedTerms);
//     } else {
//       setTerms([]);
//       setSelectedTerms('');
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   // Function to handle score input change
//   const handleScoreChange = (index, score) => {
//     const updatedStudentsData = [...studentsData];
//     updatedStudentsData[index].score = score;
//     const numericScore = parseInt(score, 10);
//     if (!isNaN(numericScore)) {
//       updatedStudentsData[index].grade = calculateGrade(numericScore);
//       updatedStudentsData[index].remark = calculateRemark(updatedStudentsData[index].grade);
//     } else {
//       updatedStudentsData[index].grade = 'Not Graded';
//       updatedStudentsData[index].remark = '';
//     }
//     setStudentsData(updatedStudentsData);
//   };

//   // Function to calculate grade based on score
//   const calculateGrade = (score) => {
//     if (score >= 75) {
//       return 'A';
//     } else if (score >= 60) {
//       return 'B';
//     } else if (score >= 50) {
//       return 'C';
//     } else if (score >= 40) {
//       return 'D';
//     } else {
//       return 'F';
//     }
//   };

//   // Function to calculate remark based on grade
//   const calculateRemark = (grade) => {
//     switch (grade) {
//       case 'A':
//         return 'Excellent';
//       case 'B':
//         return 'Very Good';
//       case 'C':
//         return 'Good';
//       case 'D':
//         return 'Pass';
//       case 'F':
//         return 'Fail';
//       default:
//         return '';
//     }
//   };

//   // Function to generate a range of years (past, current, and future)
//   const generateYearRange = () => {
//     const currentYear = new Date().getFullYear();
//     const pastYearRange = 5; // Number of past years to include

//     const years = [];
//     for (let i = currentYear - pastYearRange; i <= currentYear; i++) {
//       years.push(i.toString());
//     }

//     return years;
//   };

//   // Function to get course details based on selected course
// const getCourseDetails = (course) => {
//   switch (course) {
//     case 'Mathematics':
//       return { courseCode: 'MATH101', courseTitle: 'Mathematics' };
//     case 'English Language':
//       return { courseCode: 'ENG102', courseTitle: 'English Language' };
//     case 'Science':
//       return { courseCode: 'SCI103', courseTitle: 'Science' };
//     default:
//       return { courseCode: '', courseTitle: '' };
//   }
// };


//   // Function to simulate different course titles and course codes based on selected course
//   const getSimulatedStudentData = (course, names) => {
//     const { courseCode, courseTitle } = getCourseDetails(course);

//     // Replace dummy names with retrieved names
//     const simulatedStudentData = names.map((name, index) => ({
//       name,
//       score: '',
//       courseCode,
//       courseTitle,
//       grade: 'Not Graded',
//       remark: '',
//     }));

//     return simulatedStudentData;
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log('Submitted Data:', studentsData);

//       if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Incomplete or invalid data. Please fill in all fields.',
//         });
//         return;
//       }

//       const completeData = studentsData.map((student) => ({
//         ...student,
//         level: selectedLevel,
//         year: selectedYear,
//         course: selectedCourse,
//         terms: selectedTerms,
//       }));

//       const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);

//       if (response.status === 200) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Data saved successfully!',
//         }).then(() => {
//           // Reset the form or perform any other post-submission logic
//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Unexpected response status ' + response.status,
//         });
//       }
//     } catch (error) {
//       // Handle errors here
//       console.error('Error submitting data:', error);
//     }
//   };

//   return (
    // <div className="container mt-5">
    //   <div className="card">
    //     <div className="card-header bg-primary text-white">
    //       <h2 className="mb-0">Exam Results Viewer</h2>
    //     </div>
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-3">
//               <label className="form-label">Select School Level:</label>
//               <select
//                 className="custom-select custom-select-lg"
//                 onChange={(e) => setSelectedLevel(e.target.value)}
//               >
//                 <option value="">Select Level</option>
//                 {schoolLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Select Year:</label>
//               <select
//                 className="custom-select custom-select-lg"
//                 onChange={(e) => setSelectedYear(e.target.value)}
//                 disabled={!selectedLevel}
//               >
//                 <option value="">Select Year</option>
//                 {years.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Select Course:</label>
//               <select
//                 className="custom-select custom-select-lg"
//                 onChange={(e) => setSelectedCourse(e.target.value)}
//                 disabled={!selectedYear}
//               >
//                 <option value="">Select Course</option>
//                 {courses.map((course) => (
//                   <option key={course} value={course}>
//                     {course}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label className="form-label">Select Terms:</label>
//               <select
//                 className="custom-select custom-select-lg"
//                 onChange={(e) => setSelectedTerms(e.target.value)}
//                 disabled={!selectedCourse}
//               >
//                 <option value="">Select Course</option>
//                 {terms.map((term) => (
//                   <option key={term} value={term}>
//                     {term}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {selectedLevel && selectedYear && selectedCourse && studentsData.length > 0 && (
//             <div>
//               <h3>Add Student Scores for {selectedCourse}</h3>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Course Code</th>
//                     <th>Course Title</th>
//                     <th>Score</th>
//                     <th>Grade</th>
//                     <th>Remark</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {studentsData.map((student, index) => (
//                     <tr key={student.name}>
//                       <td>{student.name}</td>
//                       <td>{student.courseCode}</td>
//                       <td>{student.courseTitle}</td>
//                       <td>
//                         <input
//                           type="number"
//                           className="form-control sm-4"
//                           placeholder="Enter score"
//                           value={student.score}
//                           onChange={(e) => handleScoreChange(index, e.target.value)}
//                         />
//                       </td>
//                       <td>{student.grade}</td>
//                       <td>{student.remark}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="text-center mt-4 col-sm-12">
//                 <button
//                   type="button"
//                   className="btn btn-primary btn-lg p-2 m-2"
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExamRecord;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Form, Button, } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// function AddStudent() {
//   const navigate = useNavigate();
//   const baseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     entryYear: '',
//     homeAddress: '',
//     level: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//   });

//   const onInputChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(baseUrl + '/createStudent', student);

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/view-students');
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <Form onSubmit={onSubmit}>
//                 {/* Student Name */}
//                 <Form.Group controlId="formStudentName">
//                   <Form.Label>Student Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter student name"
//                     name="studentName"
//                     value={student.studentName}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Phone Number */}
//                 <Form.Group controlId="formPhoneNumber">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     placeholder="Enter phone number"
//                     name="phoneNumber"
//                     value={student.phoneNumber}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Date of Birth */}
//                 <Form.Group controlId="formDob">
//                   <Form.Label>Date of Birth</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="dob"
//                     value={student.dob}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>
//                 {/* Date of Birth */}
//                 <Form.Group controlId="formDob">
//                   <Form.Label>Date of Entry</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="entryYear"
//                     value={student.entryYear}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>
//                 {/* Date of Birth */}
//                 <Form.Group controlId="formDob">
//                   <Form.Label>Date of GraduationYear</Form.Label>
//                   <Form.Control
//                     type="date"   
//                     name="graduationYear"
//                     value={student.graduationYear}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Home Address */}
//                 <Form.Group controlId="formHomeAddress">
//                   <Form.Label>Home Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter home address"
//                     name="homeAddress"
//                     value={student.homeAddress}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* State of Origin */}
//                 <Form.Group controlId="formStateOfOrigin">
//                   <Form.Label>State of Origin</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter state of origin"
//                     name="stateOfOrigin"
//                     value={student.stateOfOrigin}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Guardian Name */}
//                 <Form.Group controlId="formGuardianName">
//                   <Form.Label>Guardian Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter guardian name"
//                     name="guardianName"
//                     value={student.guardianName}
//                     onChange={onInputChange}
//                   />
//                 </Form.Group>

//                 {/* Sex */}
                // <Form.Group controlId="formSex">
                //   <Form.Label>Sex</Form.Label>
                //   <Form.Control
                //     as="select"
                //     name="sex"
                //     value={student.sex}
                //     onChange={onInputChange}
                //   >
                //     <option value="" disabled>Select sex</option>
                //     <option value="Male">Male</option>
                //     <option value="Female">Female</option>
                //   </Form.Control>
                // </Form.Group>

//                 {/* Level */}
//                 <Form.Group controlId="formLevel">
//                   <Form.Label>Level</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="level"
//                     value={student.level}
//                     onChange={onInputChange}
//                   >
//                     <option value="" disabled>Select Level</option>
//                     <option value="Pre-school">Pre-school</option>
//                     <option value="Nursery">Nursery</option>
//                     <option value="Primary">Primary</option>
//                     <option value="Secondary">Secondary</option>
//                   </Form.Control>
//                 </Form.Group>

//                 {/* Submit Button */}
//                 <div className="d-flex justify-content-center">
//                   <Button type="submit" variant="outline-primary" size="lg" className="mx-5">
//                     Save
//                   </Button>
//                   <Link to="/view-students" className="btn btn-outline-danger btn-lg mx-5">
//                     Cancel
//                   </Link>
//                 </div>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddStudent;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPhone, faCalendar, faHome, faMapMarkerAlt, faUserFriends, faVenusMars, faGraduationCap, faImage } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';

// const AddStudent = () => {
//   const navigate = useNavigate();
//   const baseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
    // level: '',
    // entryYear: '',
//     graduationYear: '',
//     image: null,
//   });

//   const { studentName, phoneNumber, dob, homeAddress, stateOfOrigin, guardianName, sex, level, entryYear, graduationYear, image } = student;

//   const onInputChange = (e) => {
//     if (e.target.name === 'image') {
//       setStudent({ ...student, image: e.target.files[0] });
//     } else {
//       setStudent({ ...student, [e.target.name]: e.target.value });
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('studentName', studentName);
//       formData.append('phoneNumber', phoneNumber);
//       formData.append('dob', dob);
//       formData.append('homeAddress', homeAddress);
//       formData.append('stateOfOrigin', stateOfOrigin);
//       formData.append('guardianName', guardianName);
//       formData.append('sex', sex);
//       formData.append('level', level);
//       formData.append('entryYear', entryYear);
//       formData.append('graduationYear', graduationYear);
//       formData.append('image', image);

//       await axios.post(baseUrl + '/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/');
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       console.error('Response:', error.response);  // Log the response for more details
  
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };

//   const renderImagePreview = () => {
//     if (image) {
//       return (
//         <div className="mb-3">
//           <label className="form-label">Image Preview</label>
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Student Image Preview"
//             className="img-fluid"
//           />
//         </div>
//       );
//     }
//     return null;
//   };
//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 {/* Student Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Student Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Student Name"
//                       name="studentName"
//                       value={studentName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Phone Number */}
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faPhone} />
//                     </span>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       placeholder="Enter Phone Number"
//                       name="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="mb-3">
//                   <label className="form-label">Date of Birth</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={dob}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Home Address */}
//                 <div className="mb-3">
//                   <label className="form-label">Home Address</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faHome} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Home Address"
//                       name="homeAddress"
//                       value={homeAddress}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* State of Origin */}
//                 <div className="mb-3">
//                   <label className="form-label">State of Origin</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faMapMarkerAlt} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter State of Origin"
//                       name="stateOfOrigin"
//                       value={stateOfOrigin}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Guardian Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Guardian Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUserFriends} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Guardian Name"
//                       name="guardianName"
//                       value={guardianName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Sex */}
//                 <div className="mb-3">
//                   <label className="form-label">Sex</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faVenusMars} />
//                     </span>
//                     <select
//                       className="custom-select custom-select-lg"
//                       name="sex"
//                       value={sex}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="">Select Sex</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Level */}
//                 <div className="mb-3">
//                   <label className="form-label">Level</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faGraduationCap} />
//                     </span>
//                     <select
//                       className="custom-select custom-select-lg"
//                       name="level"
//                       value={level}
//                       onChange={(e) => onInputChange(e)}
//                     >
                    //  <option value="" disabled>Select Level</option>
                    // <option value="Pre-Nursery">Pre-Nursery</option>
                    // <option value="Nursery">Nursery</option>
                    // <option value="Pre-Primary">Pre-Primary</option>
                    // <option value="Primary">Primary</option>
                    // <option value="Secondary">Secondary</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Entry Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Entry Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Entry Year"
//                       name="entryYear"
//                       value={entryYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Graduation Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Graduation Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Graduation Year"
//                       name="graduationYear"
//                       value={graduationYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Image Upload */}
//                 <div className="mb-3">
//                   <label className="form-label">Image</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     name="image"
//                     accept="image/*"
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>

//                 {renderImagePreview()}

//                 {/* Form Buttons */}
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </button>
//                   <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
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

// export default AddStudent;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPhone, faCalendar, faHome, faMapMarkerAlt, faUserFriends, faVenusMars, faGraduationCap, faImage } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';

// const AddStudent = () => {
//   const navigate = useNavigate();
//   const baseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//     entryYear: '',
//     graduationYear: '',
//     image: null,
//   });

//   const { studentName, phoneNumber, dob, homeAddress, stateOfOrigin, guardianName, sex, level, entryYear, graduationYear, image } = student;

//   const onInputChange = (e) => {
//     if (e.target.name === 'image') {
//       setStudent({ ...student, image: e.target.files[0] });
//     } else {
//       setStudent({ ...student, [e.target.name]: e.target.value });
//     }
//   };

//   const generateRegistrationNumber = () => {
//     const nameInitials = studentName
//       .split(' ')
//       .map((word) => word.charAt(0))
//       .join('');
//     const birthYear = new Date(dob).getFullYear().toString().slice(-2);
//     const lastTwoDigits = phoneNumber.slice(-2);
//     const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');
//     const registerNumber = `${nameInitials}${birthYear}${lastTwoDigits}${randomDigits}`;
//     return registerNumber.toUpperCase();
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('studentName', studentName);
//       formData.append('phoneNumber', phoneNumber);
//       formData.append('dob', dob);
//       formData.append('homeAddress', homeAddress);
//       formData.append('stateOfOrigin', stateOfOrigin);
//       formData.append('guardianName', guardianName);
//       formData.append('sex', sex);
//       formData.append('level', level);
//       formData.append('entryYear', entryYear);
//       formData.append('graduationYear', graduationYear);
//       formData.append('image', image);

//       // Generate and save the registration number
//       const registerNumber = generateRegistrationNumber();
//       formData.append('registrationNumber', registerNumber);

//       await axios.post(baseUrl + '/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/');
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       console.error('Response:', error.response);  // Log the response for more details
  
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };

//   const renderImagePreview = () => {
//     if (image) {
//       return (
//         <div className="mb-3">
//           <label className="form-label">Image Preview</label>
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Student Image Preview"
//             className="img-fluid"
//           />
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 {/* Student Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Student Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Student Name"
//                       name="studentName"
//                       value={studentName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Phone Number */}
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faPhone} />
//                     </span>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       placeholder="Enter Phone Number"
//                       name="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="mb-3">
//                   <label className="form-label">Date of Birth</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={dob}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Home Address */}
//                 <div className="mb-3">
//                   <label className="form-label">Home Address</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faHome} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Home Address"
//                       name="homeAddress"
//                       value={homeAddress}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* State of Origin */}
//                 <div className="mb-3">
//                   <label className="form-label">State of Origin</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faMapMarkerAlt} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter State of Origin"
//                       name="stateOfOrigin"
//                       value={stateOfOrigin}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Guardian Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Guardian Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUserFriends} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Guardian Name"
//                       name="guardianName"
//                       value={guardianName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Sex */}
//                 <div className="mb-3">
//                   <label className="form-label">Sex</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faVenusMars} />
//                     </span>
//                     <select
//                       className="custom-select custom-select-lg"
//                       name="sex"
//                       value={sex}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="">Select Sex</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Level */}
//                 <div className="mb-3">
//                   <label className="form-label">Level</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faGraduationCap} />
//                     </span>
//                     <select
//                       className="custom-select custom-select-lg"
//                       name="level"
//                       value={level}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="" disabled>Select Level</option>
//                       <option value="Pre-Nursery">Pre-Nursery</option>
//                       <option value="Nursery">Nursery</option>
//                       <option value="Pre-Primary">Pre-Primary</option>
//                       <option value="Primary">Primary</option>
//                       <option value="Secondary">Secondary</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Entry Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Entry Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Entry Year"
//                       name="entryYear"
//                       value={entryYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Graduation Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Graduation Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Graduation Year"
//                       name="graduationYear"
//                       value={graduationYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Image Upload */}
//                 <div className="mb-3">
//                   <label className="form-label">Image</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     name="image"
//                     accept="image/*"
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>

//                 {renderImagePreview()}

//                 {/* Form Buttons */}
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </button>
//                   <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
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

// export default AddStudent;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPhone, faCalendar, faHome, faMapMarkerAlt, faUserFriends, faVenusMars, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';

// const AddStudent = () => {
//   const navigate = useNavigate();
//   const baseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//     entryYear: '',
//     graduationYear: '',
//   });

//   const { studentName, phoneNumber, dob, homeAddress, stateOfOrigin, guardianName, sex, level, entryYear, graduationYear } = student;

//   const onInputChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const generateRegistrationNumber = () => {
//     const nameInitials = studentName
//       .split(' ')
//       .map((word) => word.charAt(0))
//       .join('');
//     const birthYear = new Date(dob).getFullYear().toString().slice(-2);
//     const lastTwoDigits = phoneNumber.slice(-2);
//     const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');
//     const registerNumber = `${nameInitials}${birthYear}${lastTwoDigits}${randomDigits}`;
//     return registerNumber.toUpperCase();
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('studentName', studentName);
//       formData.append('phoneNumber', phoneNumber);
//       formData.append('dob', dob);
//       formData.append('homeAddress', homeAddress);
//       formData.append('stateOfOrigin', stateOfOrigin);
//       formData.append('guardianName', guardianName);
//       formData.append('sex', sex);
//       formData.append('level', level);
//       formData.append('entryYear', entryYear);
//       formData.append('graduationYear', graduationYear);

//       // Generate and save the registration number
//       const registerNumber = generateRegistrationNumber();
//       formData.append('registerNumber', registerNumber);
//         console.log(formData);
//       await axios.post(baseUrl + '/createStudent', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/');
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       console.error('Response:', error.response);  // Log the response for more details
  
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 {/* Student Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Student Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Student Name"
//                       name="studentName"
//                       value={studentName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Phone Number */}
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faPhone} />
//                     </span>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       placeholder="Enter Phone Number"
//                       name="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="mb-3">
//                   <label className="form-label">Date of Birth</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={dob}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Home Address */}
//                 <div className="mb-3">
//                   <label className="form-label">Home Address</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faHome} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Home Address"
//                       name="homeAddress"
//                       value={homeAddress}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* State of Origin */}
//                 <div className="mb-3">
//                   <label className="form-label">State of Origin</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faMapMarkerAlt} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter State of Origin"
//                       name="stateOfOrigin"
//                       value={stateOfOrigin}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Guardian Name */}
//                 <div className="mb-3">
//                   <label className="form-label">Guardian Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUserFriends} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Guardian Name"
//                       name="guardianName"
//                       value={guardianName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Sex */}
//                 <div className="mb-3">
//                   <label className="form-label">Sex</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faVenusMars} />
//                     </span>
//                     <select
//                       className="custom-select custom-select-lg"
//                       name="sex"
//                       value={sex}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="">Select Sex</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Level */}
//                 <div className="mb-3">
//                   <label className="form-label">Level</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faGraduationCap} />
//                     </span>
//                     <select
//                       className="custom-select custom-select-lg"
//                       name="level"
//                       value={level}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="" disabled>Select Level</option>
//                       <option value="Pre-Nursery">Pre-Nursery</option>
//                       <option value="Nursery">Nursery</option>
//                       <option value="Pre-Primary">Pre-Primary</option>
//                       <option value="Primary">Primary</option>
//                       <option value="Secondary">Secondary</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Entry Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Entry Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Entry Year"
//                       name="entryYear"
//                       value={entryYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Graduation Year */}
//                 <div className="mb-3">
//                   <label className="form-label">Graduation Year</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Enter Graduation Year"
//                       name="graduationYear"
//                       value={graduationYear}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>

//                 {/* Form Buttons */}
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </button>
//                   <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
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

// export default AddStudent;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Form, Button, } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// export default function AddStudent() {
//   const navigate = useNavigate();
//   const baseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//     image: null,
//   });

//   const { studentName,
//     phoneNumber,
//     dob,
//     homeAddress,
//     stateOfOrigin,
//     guardianName,
//     sex,
//     level, image } = student;

//   const onInputChange = (e) => {
//     if (e.target.name === 'image') {
//             setStudent({ ...student, image: e.target.files[0] });

//           } else {
//       setStudent({ ...student, [e.target.name]: e.target.value });
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('studentName', studentName);
//       formData.append(' phoneNumber', phoneNumber);
//       formData.append('dob', dob);
//       formData.append(' homeAddress', homeAddress);
//       formData.append('stateOfOrigin', stateOfOrigin);
//       formData.append('guardianName', guardianName);
//       formData.append('sex', sex);
//       formData.append('level', level);
//       formData.append('image', image);

//       // Make a POST request to the API to add the post with the form data.
//       await axios.post(baseUrl + '/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/');
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the Student.',
//       });
//     }
//   };

//   const renderImagePreview = () => {
//     if (image) {
//       return (
//         <div className="mb-3">
//           <label className="form-label">Image Preview</label>
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Post Image Preview"
//             className="img-fluid"
//           />
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Post</h2>
//               {/* <form onSubmit={(e) => onSubmit(e)}> */}
//                 {/* <div className="mb-3">
//                   <label className="form-label">Post Title</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faHeading} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Post Title"
//                       name="title"
//                       value={title}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Post Content</label>
//                   <textarea
//                     className="form-control"
//                     placeholder="Enter Post Content"
//                     name="content"
//                     value={content}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div> */}
//                  <h2 className="text-center mb-4">Add Student</h2>
//               <Form onSubmit={(e) => onSubmit(e)}>
//                 {/* Student Name */}
//                 <Form.Group controlId="formStudentName">
//                   <Form.Label>Student Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter student name"
//                     name="studentName"
//                     value={studentName}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </Form.Group>

//                 {/* Phone Number */}
//                 <Form.Group controlId="formPhoneNumber">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     placeholder="Enter phone number"
//                     name="phoneNumber"
//                     value={phoneNumber}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </Form.Group>

//                 {/* Date of Birth */}
//                 <Form.Group controlId="formDob">
//                   <Form.Label>Date of Birth</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="dob"
//                     value={dob}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </Form.Group>

//                 {/* Home Address */}
//                 <Form.Group controlId="formHomeAddress">
//                   <Form.Label>Home Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter home address"
//                     name="homeAddress"
//                     value={homeAddress}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </Form.Group>

//                 {/* State of Origin */}
//                 <Form.Group controlId="formStateOfOrigin">
//                   <Form.Label>State of Origin</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter state of origin"
//                     name="stateOfOrigin"
//                     value={stateOfOrigin}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </Form.Group>

//                 {/* Guardian Name */}
//                 <Form.Group controlId="formGuardianName">
//                   <Form.Label>Guardian Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter guardian name"
//                     name="guardianName"
//                     value={guardianName}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </Form.Group>

//                 {/* Sex */}
//                 <Form.Group controlId="formSex">
//                   <Form.Label>Sex</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="sex"
//                     value={sex}
//                     onChange={(e) => onInputChange(e)}
//                   >
//                     <option value="" disabled>Select sex</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </Form.Control>
//                 </Form.Group>

//                 {/* Level */}
//                 <Form.Group controlId="formLevel">
//                   <Form.Label>Level</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="level"
//                     value={level}
//                     onChange={(e) => onInputChange(e)}
//                   >
//                     <option value="" disabled>Select Level</option>
//                     <option value="Pre-school">Pre-school</option>
//                     <option value="Nursery">Nursery</option>
//                     <option value="Primary">Primary</option>
//                     <option value="Secondary">Secondary</option>
//                   </Form.Control>
//                 </Form.Group>

//                 <div className="mb-3">
//                   <label className="form-label">Image</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     name="image"
//                     accept="image/*"
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//                 {renderImagePreview()}
//                 {/* <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </button>
//                   <Link to="/" className="btn btn-outline-danger btn-lg mx-5">
//                     Cancel
//                   </Link>
//                 </div> */}
//                 <div className="d-flex justify-content-center">
//                   <Button type="submit" variant="outline-primary" size="lg" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </Button>
//                   <Link to="/view-students" className="btn btn-outline-danger btn-lg mx-5">
//                     Cancel
//                   </Link>
//                 </div>
//                 </Form>
//               {/* </form> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPhone, faCalendar, faHome, faAddressCard, faUserGraduate, faVenusMars, faKey } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';

// export default function AddStudent() {
//   const navigate = useNavigate();
//   const [levels, setLevels] = useState([]);
//   const baseUrl = 'http://localhost:8080/api/students';

//   const [student, setStudent] = useState({
//     studentName: '',
//     phoneNumber: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level:levels,
//   });

//   const { studentName, phoneNumber, dob, homeAddress, stateOfOrigin, guardianName, sex, level } = student;

//   // const onInputChange = (e) => {
//   //   setStudent({ ...student, [e.target.name]: e.target.value });
    
//   // };

//   const onInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudent({ ...student, [name]: value });
  
//     // If the changed input is the level, update the levels state
//     if (name === "level") {
//       setLevels(value);
//     }
//   };
  
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(baseUrl + '/create', student);

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student added successfully!',
//       }).then(() => {
//         navigate('/students');
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student.',
//       });
//     }
//   };

//     // Fetch school levels on component mount
//     useEffect(() => {
//       // Simulated API call to fetch school levels
//       const fetchedSchoolLevels = ['pre-school','Nursery', 'Primary', 'Secondary'];
//       setLevels(fetchedSchoolLevels);
//     }, []);
    

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Student</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 <div className="mb-3">
//                   <label className="form-label">Student Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter student name"
//                       name="studentName"
//                       value={studentName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faPhone} />
//                     </span>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       placeholder="Enter phone number"
//                       name="phoneNumber"
//                       value={phoneNumber}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Date of Birth</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendar} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={dob}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Home Address</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faHome} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter home address"
//                       name="homeAddress"
//                       value={homeAddress}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">State of Origin</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faAddressCard} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter state of origin"
//                       name="stateOfOrigin"
//                       value={stateOfOrigin}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Guardian Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUser} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter guardian name"
//                       name="guardianName"
//                       value={guardianName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Sex</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faVenusMars} />
//                     </span>
//                     <select
//                       className="custom-select custom-select-lg"
//                       name="sex"
//                       value={sex}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="" disabled>Select sex</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Level</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faUserGraduate} />
//                     </span>
//                     {/* <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter level"
//                       name="level"
//                       value={level}
//                       onChange={(e) => onInputChange(e)}
//                     /> */}
//                       <select
//                         className="custom-select custom-select-lg"
//                         name="level"  // Update the name to "level"
//                         value={level}
//                         onChange={(e) => onInputChange(e)}
//                       >
//                         <option value="">Select Level</option>
//                         {levels.map((level) => (
//                           <option key={level} value={level}>
//                             {level}
//                           </option>
//                         ))}
//                       </select>

//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">Save</button>
//                   <Link to="/view-students" className="btn btn-outline-danger btn-lg mx-5">Cancel</Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
