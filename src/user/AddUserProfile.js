import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faAddressCard, faPhone, faEnvelope, faImages } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function AddUserProfile() {
  const navigate = useNavigate();
  const BaseUrl = 'http://localhost:8080/api/userprofiles';

  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userName: '',
    email: '',
    dob: '',
    homeAddress: '',
    stateOfOrigin: '',
    guardianName: '',
    sex: '',
    level: 'pre-nursery',
    entryYear: '',
    graduationYear: '',
    image: null,
  });

  const { firstName, lastName, phoneNumber, userName, email, dob, homeAddress, stateOfOrigin, guardianName, sex, level, entryYear, graduationYear, image } = userProfile;

  const onInputChange = (e) => {
    if (e.target.name === 'image') {
      setUserProfile({ ...userProfile, image: e.target.files[0] });
    } else {
      setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('phoneNumber', phoneNumber);
      formData.append('userName', userName);
      formData.append('email', email);
      formData.append('dob', dob);
      formData.append('homeAddress', homeAddress);
      formData.append('stateOfOrigin', stateOfOrigin);
      formData.append('guardianName', guardianName);
      formData.append('sex', sex);
      formData.append('level', level);
      formData.append('entryYear', entryYear);
      formData.append('graduationYear', graduationYear);
      formData.append('image', image);

      await axios.post(`${BaseUrl}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User profile added successfully!',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Error:', error);
      console.error('Response:', error.response);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the user profile.',
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
            alt="User Profile Image Preview"
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
              <h2 className="text-center mb-4">Add User Profile</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                    name="userName"
                    value={userName}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      name="email"
                      value={email}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
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
                <div className="mb-3">
                  <label className="form-label">Home Address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faAddressCard} />
                    </span>
                    <textarea
                      className="form-control"
                      placeholder="Enter Home Address"
                      name="homeAddress"
                      value={homeAddress}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">State of Origin</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter State of Origin"
                    name="stateOfOrigin"
                    value={stateOfOrigin}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Guardian Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Guardian Name"
                    name="guardianName"
                    value={guardianName}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sex</label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      name="sex"
                      value={sex}
                      onChange={(e) => onInputChange(e)}
                    >
                      <option value="">Select Sex</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Level</label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      name="level"
                      value={level}
                      onChange={(e) => onInputChange(e)}
                    >
                      <option value="pre-nursery">Pre-Nursery</option>
                      <option value="nursery">Nursery</option>
                      <option value="pre-primary">Pre-Primary</option>
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Entry Year</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCalendar} />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      name="entryYear"
                      value={entryYear}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Graduation Year</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCalendar} />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      name="graduationYear"
                      value={graduationYear}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faImages} />
                    </span>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      accept="image/*"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                {renderImagePreview()}
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
// import { faUser, faCalendar, faAddressCard, faPhone, faEnvelope, faImages } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';

// const AddUserProfile = () => {
//   const navigate = useNavigate();
//   const BaseUrl = 'http://localhost:8080/api/userprofiles';

//   const [userProfile, setUserProfile] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     userName: '',
//     email: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: 'pre-nursery',
//     entryYear: '',
//     graduationYear: '',
//     image: null,
//   });

//   const { firstName, lastName, phoneNumber, userName, email, dob, homeAddress, stateOfOrigin, guardianName, sex, level, entryYear, graduationYear, image } = userProfile;

//   const onInputChange = (e) => {
//     if (e.target.name === 'image') {
//       setUserProfile({ ...userProfile, image: e.target.files[0] });
//     } else {
//       setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('firstName', firstName);
//       formData.append('lastName', lastName);
//       formData.append('phoneNumber', phoneNumber);
//       formData.append('userName', userName);
//       formData.append('email', email);
//       formData.append('dob', dob);
//       formData.append('homeAddress', homeAddress);
//       formData.append('stateOfOrigin', stateOfOrigin);
//       formData.append('guardianName', guardianName);
//       formData.append('sex', sex);
//       formData.append('level', level);
//       formData.append('entryYear', entryYear);
//       formData.append('graduationYear', graduationYear);
//       formData.append('image', image);

//       await axios.post(`${BaseUrl}/create`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'User profile added successfully!',
//       }).then(() => {
//         navigate('/');
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       console.error('Response:', error.response);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the user profile.',
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
//             alt="User Profile Image Preview"
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
//               <h2 className="text-center mb-4">Add User Profile</h2>
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
//                       placeholder="Enter First Name"
//                       name="firstName"
//                       value={firstName}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Last Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Last Name"
//                     name="lastName"
//                     value={lastName}
//                     onChange={(e) => onInputChange(e)}
//                   />
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
//                   <label className="form-label">Username</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Username"
//                     name="userName"
//                     value={userName}
//                     onChange={(e) => onInputChange(e)}
//                   />
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
//                       placeholder="Enter Email"
//                       name="email"
//                       value={email}
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
//                       <FontAwesomeIcon icon={faAddressCard} />
//                     </span>
//                     <textarea
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
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter State of Origin"
//                     name="stateOfOrigin"
//                     value={stateOfOrigin}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Guardian Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Guardian Name"
//                     name="guardianName"
//                     value={guardianName}
//                     onChange={(e) => onInputChange(e)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Sex</label>
//                   <div className="input-group">
//                     <select
//                       className="form-select"
//                       name="sex"
//                       value={sex}
//                       onChange={(e) => onInputChange(e)}
//                     >
//                       <option value="">Select Sex</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Level</label>
//                   <div className="input-group">
//                     <select
//                       className="form-select"
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
//                       <FontAwesomeIcon icon={faCalendar} />
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
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faImages} />
//                     </span>
//                     <input
//                       type="file"
//                       className="form-control"
//                       name="image"
//                       accept="image/*"
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
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
// };

// export default AddUserProfile;


// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const AddUserProfile = () => {
//   const [userProfile, setUserProfile] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     userName: '',
//     email: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const image = e.target.files[0];
//     setUserProfile((prevProfile) => ({
//       ...prevProfile,
//       image,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       for (const key in userProfile) {
//         formData.append(key, userProfile[key]);
//       }

//       await axios.post('http://localhost:8080/api/userprofiles/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'User Profile Added',
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       // Handle success, e.g., redirect or show a success message
//     } catch (error) {
//       console.error('Error adding user profile:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!',
//       });

//       // Handle error, e.g., show an error message
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header">Add User Profile</div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="firstName"
//                     name="firstName"
//                     value={userProfile.firstName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="lastName"
//                     name="lastName"
//                     value={userProfile.lastName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phoneNumber">Phone Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     value={userProfile.phoneNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="userName">User Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="userName"
//                     name="userName"
//                     value={userProfile.userName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={userProfile.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="dob">Date of Birth</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="dob"
//                     name="dob"
//                     value={userProfile.dob}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="homeAddress">Home Address</label>
//                   <textarea
//                     className="form-control"
//                     id="homeAddress"
//                     name="homeAddress"
//                     value={userProfile.homeAddress}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="stateOfOrigin">State of Origin</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="stateOfOrigin"
//                     name="stateOfOrigin"
//                     value={userProfile.stateOfOrigin}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="guardianName">Guardian Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="guardianName"
//                     name="guardianName"
//                     value={userProfile.guardianName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="sex">Sex</label>
//                   <select
//                     className="form-control"
//                     id="sex"
//                     name="sex"
//                     value={userProfile.sex}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="level">Level</label>
//                   <select
//                     className="form-control"
//                     id="level"
//                     name="level"
//                     value={userProfile.level}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled>Select Level</option>
//                     <option value="Pre-Nursery">Pre-Nursery</option>
//                     <option value="Nursery">Nursery</option>
//                     <option value="Pre-Primary">Pre-Primary</option>
//                     <option value="Primary">Primary</option>
//                     <option value="Secondary">Secondary</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="image">Profile Image</label>
//                   <input
//                     type="file"
//                     className="form-control-file"
//                     id="image"
//                     name="image"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                   />
//                   {userProfile.image && (
//                     <img
//                       src={URL.createObjectURL(userProfile.image)}
//                       alt="Preview"
//                       className="img-fluid mt-3"
//                     />
//                   )}
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   Add Profile
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddUserProfile;




// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const AddUserProfile = () => {
//   const [userProfile, setUserProfile] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     userName: '',
//     email: '',
//     dob: '',
//     homeAddress: '',
//     stateOfOrigin: '',
//     guardianName: '',
//     sex: '',
//     level: '',
//     entryYear: '',
//     graduationYear: '',
//     registerNumber: '',
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const image = e.target.files[0];
//     setUserProfile((prevProfile) => ({
//       ...prevProfile,
//       image,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       for (const key in userProfile) {
//         formData.append(key, userProfile[key]);
//       }

//       await axios.post('http://localhost:8080/api/userprofiles/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'User Profile Added',
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       // Handle success, e.g., redirect or show a success message
//     } catch (error) {
//       console.error('Error adding user profile:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!',
//       });

//       // Handle error, e.g., show an error message
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header">Add User Profile</div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="firstName"
//                     name="firstName"
//                     value={userProfile.firstName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="lastName"
//                     name="lastName"
//                     value={userProfile.lastName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phoneNumber">Phone Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     value={userProfile.phoneNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="userName">User Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="userName"
//                     name="userName"
//                     value={userProfile.userName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={userProfile.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="dob">Date of Birth</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="dob"
//                     name="dob"
//                     value={userProfile.dob}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="homeAddress">Home Address</label>
//                   <textarea
//                     className="form-control"
//                     id="homeAddress"
//                     name="homeAddress"
//                     value={userProfile.homeAddress}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="stateOfOrigin">State of Origin</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="stateOfOrigin"
//                     name="stateOfOrigin"
//                     value={userProfile.stateOfOrigin}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="guardianName">Guardian Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="guardianName"
//                     name="guardianName"
//                     value={userProfile.guardianName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="sex">Sex</label>
//                   <select
//                     className="form-control"
//                     id="sex"
//                     name="sex"
//                     value={userProfile.sex}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="level">Level</label>
//                   <select
//                     className="form-control"
//                     id="level"
//                     name="level"
//                     value={userProfile.level}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled>Select Level</option>
//                     <option value="Pre-Nursery">Pre-Nursery</option>
//                     <option value="Nursery">Nursery</option>
//                     <option value="Pre-Primary">Pre-Primary</option>
//                     <option value="Primary">Primary</option>
//                     <option value="Secondary">Secondary</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="entryYear">Entry Year</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="entryYear"
//                     name="entryYear"
//                     value={userProfile.entryYear}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="graduationYear">Graduation Year</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="graduationYear"
//                     name="graduationYear"
//                     value={userProfile.graduationYear}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="image">Profile Image</label>
//                   <input
//                     type="file"
//                     className="form-control-file"
//                     id="image"
//                     name="image"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                   />
//                   {userProfile.image && (
//                     <img
//                       src={URL.createObjectURL(userProfile.image)}
//                       alt="Preview"
//                       className="img-fluid mt-3"
//                     />
//                   )}
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   Add Profile
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddUserProfile;


