import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UsersProfileList = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [filteredUserProfiles, setFilteredUserProfiles] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    username: '',
    email: '',
    phone: '',
    level: '',
  });
  const [distinctLevels, setDistinctLevels] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/profiles/viewAll');
        const fetchedData = response.data;

        if (fetchedData.length === 0) {
          const storedData = JSON.parse(localStorage.getItem('profiles')) || [];
          setUserProfiles(storedData);
          setFilteredUserProfiles(storedData);
        } else {
          setUserProfiles(fetchedData);
          setFilteredUserProfiles(fetchedData);
          localStorage.setItem('profiles', JSON.stringify(fetchedData));
        }

        // Extract distinct levels from the user profiles
        const uniqueLevels = Array.from(new Set(fetchedData.map((profile) => profile.level)));
        setDistinctLevels(['', ...uniqueLevels]); // Add an option for All Levels
      } catch (error) {
        console.error('Error fetching user profiles:', error);

        const storedData = JSON.parse(localStorage.getItem('profiles')) || [];
        setUserProfiles(storedData);
        setFilteredUserProfiles(storedData);
      }
    };

    fetchUserProfiles();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filtered = userProfiles.filter((profile) => {
      return (
        profile.userName.includes(filterCriteria.username) &&
        profile.email.includes(filterCriteria.email) &&
        profile.phoneNumber.includes(filterCriteria.phone) &&
        (filterCriteria.level === '' || profile.level === filterCriteria.level)
      );
    });
    setFilteredUserProfiles(filtered);
  }, [filterCriteria, userProfiles]);

  const deleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/profiles/delete/${id}`);
      setUserProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting profile:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the profile.',
      });
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <h1 className="h3 mb-4 text-gray-800">User Profiles List</h1>
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-body">
                <div className="row mb-3">
                    <div className="col-sm-4">
                      <label htmlFor="usernameFilter">Username:</label>
                      <input
                        type="text"
                        id="usernameFilter"
                        name="username"
                        value={filterCriteria.username}
                        onChange={handleFilterChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-sm-4">
                      <label htmlFor="emailFilter">Email:</label>
                      <input
                        type="text"
                        id="emailFilter"
                        name="email"
                        value={filterCriteria.email}
                        onChange={handleFilterChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-sm-4">
                      <label htmlFor="phoneFilter">Phone:</label>
                      <input
                        type="text"
                        id="phoneFilter"
                        name="phone"
                        value={filterCriteria.phone}
                        onChange={handleFilterChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="mb-3 col-sm-7 float-end">
                    <label htmlFor="levelFilter">Level:</label>
                    <select
                      id="levelFilter"
                      name="level"
                      value={filterCriteria.level}
                      onChange={handleFilterChange}
                      className="form-control"
                    >
                      {distinctLevels.map((level) => (
                        <option key={level} value={level}>
                          {level || 'All Levels'}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Level</th>
                          <th>Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUserProfiles.map((profile) => (
                          <tr key={profile.id}>
                            <td>
                              <Link to={`/view-profile/${profile.id}`}>
                                {`${profile.firstName} ${profile.lastName}`}
                              </Link>
                            </td>
                            <td>{profile.email}</td>
                            <td>{profile.phoneNumber}</td>
                            <td>{profile.level}</td>

                            <td>
                              {profile.imageUrl && (
                                <img
                                  src={profile.imageUrl}
                                  alt={`Profile of ${profile.firstName} ${profile.lastName}`}
                                  className="img-thumbnail"
                                  style={{
                                    cursor: 'pointer',
                                    backgroundImage: `url(${process.env.PUBLIC_URL}/${profile.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '200px',
                                    height: '80px',
                                  }}
                                  onClick={() => handleImageClick(profile.imageUrl)}
                                />
                              )}
                            </td>

                            <td>
                              <Link to={`/edit-profile/${profile.id}`} className="btn btn-primary btn-sm mx-1">
                                Edit
                              </Link>
                              <button onClick={() => deleteProfile(profile.id)} className="btn btn-danger btn-sm mx-1">
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
          </div>
        </div>
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Image Preview</h5>
                <button type="button" className="close" onClick={handleImageClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={selectedImage} alt="Image Preview" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersProfileList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const UsersProfileList = () => {
//   const [userProfiles, setUserProfiles] = useState([]);
//   const [filteredUserProfiles, setFilteredUserProfiles] = useState([]);
//   const [filterCriteria, setFilterCriteria] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     level: '',
//   });
//   const [distinctLevels, setDistinctLevels] = useState([]);

//   useEffect(() => {
//     const fetchUserProfiles = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/profiles/viewAll');
//         const fetchedData = response.data;

//         if (fetchedData.length === 0) {
//           const storedData = JSON.parse(localStorage.getItem('profiles')) || [];
//           setUserProfiles(storedData);
//           setFilteredUserProfiles(storedData);
//         } else {
//           setUserProfiles(fetchedData);
//           setFilteredUserProfiles(fetchedData);
//           localStorage.setItem('profiles', JSON.stringify(fetchedData));
//         }

//         // Extract distinct levels from the user profiles
//         const uniqueLevels = Array.from(new Set(fetchedData.map((profile) => profile.level)));
//         setDistinctLevels(['', ...uniqueLevels]); // Add an option for All Levels
//       } catch (error) {
//         console.error('Error fetching user profiles:', error);

//         const storedData = JSON.parse(localStorage.getItem('profiles')) || [];
//         setUserProfiles(storedData);
//         setFilteredUserProfiles(storedData);
//       }
//     };

//     fetchUserProfiles();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilterCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     const filtered = userProfiles.filter((profile) => {
//       return (
//         profile.userName.includes(filterCriteria.username) &&
//         profile.email.includes(filterCriteria.email) &&
//         profile.phoneNumber.includes(filterCriteria.phone) &&
//         (filterCriteria.level === '' || profile.level === filterCriteria.level)
//       );
//     });
//     setFilteredUserProfiles(filtered);
//   }, [filterCriteria, userProfiles]);

//   const deleteProfile = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/profiles/delete/${id}`);
//       setUserProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Profile deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting profile:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the profile.',
//       });
//     }
//   };


//   return (
//     <div id="content-wrapper" className="d-flex flex-column">
//       <div id="content">
//         <div className="container-fluid">
//           <h1 className="h3 mb-4 text-gray-800">User Profiles List</h1>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card shadow mb-4">
//                 <div className="card-body">
//                   <div className="row mb-3">
//                     {/* ... (filter criteria input fields) */}
//                   </div>

//                   <div className="mb-3 col-sm-7 float-end">
//                     {/* ... (filter criteria dropdown) */}
//                   </div>

//                   <div className="table-responsive">
//                     <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
//                       <thead>
//                         <tr>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Phone</th>
//                           <th>Level</th>
//                           <th>Image</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredUserProfiles.map((profile) => (
//                           <tr key={profile.id}>
//                             <td>
//                               <Link to={`/view-profile/${profile.id}`}>
//                                 {`${profile.firstName} ${profile.lastName}`}
//                               </Link>
//                             </td>
//                             <td>{profile.email}</td>
//                             <td>{profile.phoneNumber}</td>
//                             <td>{profile.level}</td>

//                             <td>
//                               {profile.imageUrl && (
//                                 <img
//                                   src={profile.imageUrl}
//                                   alt={`Profile of ${profile.firstName} ${profile.lastName}`}
//                                   // style={{ width: '100px', height: '100px' }}
//                                   className="img-thumbnail"
//                                   style={{
//                                     cursor: 'pointer',
//                                     backgroundImage: `url(${process.env.PUBLIC_URL}/${profile.imageUrl})`,
//                                     backgroundSize: 'cover',
//                                     backgroundPosition: 'center',
//                                     width: '200px',
//                                     height: '80px',}}
//                                 />
//                               )}
//                             </td>

//                             <td>
//                               <Link to={`/edit-profile/${profile.id}`} className="btn btn-primary btn-sm mx-1">
//                                 Edit
//                               </Link>
//                               <button onClick={() => deleteProfile(profile.id)} className="btn btn-danger btn-sm mx-1">
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersProfileList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UsersProfileList = () => {
//   const [userProfiles, setUserProfiles] = useState([]);
//   const [filteredUserProfiles, setFilteredUserProfiles] = useState([]);
//   const [filterCriteria, setFilterCriteria] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     level: '',
//   });
//   const [distinctLevels, setDistinctLevels] = useState([]);

//   useEffect(() => {
//     const fetchUserProfiles = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/profiles/viewAll');
//         const fetchedData = response.data;
//            console.log(fetchedData);
//         if (fetchedData.length === 0) {
//           const storedData = JSON.parse(localStorage.getItem('profiles')) || [];
//           setUserProfiles(storedData);
//           setFilteredUserProfiles(storedData);
//         } else {
//           setUserProfiles(fetchedData);
//           setFilteredUserProfiles(fetchedData);
//           localStorage.setItem('profiles', JSON.stringify(fetchedData));
//         }

//         // Extract distinct levels from the user profiles
//         const uniqueLevels = Array.from(new Set(fetchedData.map(profile => profile.level)));
//         setDistinctLevels(['', ...uniqueLevels]); // Add an option for All Levels
//       } catch (error) {
//         console.error('Error fetching user profiles:', error);

//         const storedData = JSON.parse(localStorage.getItem('profiles')) || [];
//         setUserProfiles(storedData);
//         setFilteredUserProfiles(storedData);
//       }
//     };

//     fetchUserProfiles();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilterCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     const filtered = userProfiles.filter((profile) => {
//       return (
//         profile.userName.includes(filterCriteria.username) &&
//         profile.email.includes(filterCriteria.email) &&
//         profile.phoneNumber.includes(filterCriteria.phone) &&
//         (filterCriteria.level === '' || profile.level === filterCriteria.level)
//       );
//     });
//     setFilteredUserProfiles(filtered);
//   }, [filterCriteria, userProfiles]);

//   return (
//     <div id="content-wrapper" className="d-flex flex-column">
//       <div id="content">
//         <div className="container-fluid">
//           <h1 className="h3 mb-4 text-gray-800">User Profiles List</h1>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card shadow mb-4">
//                 <div className="card-body">
//                 <div className="row mb-3">
//                     <div className="col-sm-4">
//                       <label htmlFor="usernameFilter">Username:</label>
//                       <input
//                         type="text"
//                         id="usernameFilter"
//                         name="username"
//                         value={filterCriteria.username}
//                         onChange={handleFilterChange}
//                         className="form-control"
//                       />
//                     </div>

//                     <div className="col-sm-4">
//                       <label htmlFor="emailFilter">Email:</label>
//                       <input
//                         type="text"
//                         id="emailFilter"
//                         name="email"
//                         value={filterCriteria.email}
//                         onChange={handleFilterChange}
//                         className="form-control"
//                       />
//                     </div>

//                     <div className="col-sm-4">
//                       <label htmlFor="phoneFilter">Phone:</label>
//                       <input
//                         type="text"
//                         id="phoneFilter"
//                         name="phone"
//                         value={filterCriteria.phone}
//                         onChange={handleFilterChange}
//                         className="form-control"
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3 col-sm-7 float-end">
//                     <label htmlFor="levelFilter">Level:</label>
//                     <select
//                       id="levelFilter"
//                       name="level"
//                       value={filterCriteria.level}
//                       onChange={handleFilterChange}
//                       className="form-control"
//                     >
//                       {distinctLevels.map((level) => (
//                         <option key={level} value={level}>
//                           {level || 'All Levels'}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="table-responsive">
//                     <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
//                       <thead>
//                         <tr>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Phone</th>
//                           <th>Level</th>
//                           {/* Remove the <th> for Image */}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredUserProfiles.map((profile) => (
//                           <tr key={profile.id}>
//                             <td>{`${profile.firstName} ${profile.lastName}`}</td>
//                             <td>{profile.email}</td>
//                             <td>{profile.phoneNumber}</td>
//                             <td>{profile.level}</td>
//                             {/* Remove the <td> for Image */}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersProfileList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UsersProfileList = () => {
//   const [userProfiles, setUserProfiles] = useState([]);
//   const [filteredUserProfiles, setFilteredUserProfiles] = useState([]);
//   const [filterCriteria, setFilterCriteria] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     level: '',
//   });
//   const [distinctLevels, setDistinctLevels] = useState([]);

//   useEffect(() => {
//     const fetchUserProfiles = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/userprofiles');
//         const fetchedData = response.data;

//         if (fetchedData.length === 0) {
//           const storedData = JSON.parse(localStorage.getItem('userProfiles')) || [];
//           setUserProfiles(storedData);
//           setFilteredUserProfiles(storedData);
//         } else {
//           setUserProfiles(fetchedData);
//           setFilteredUserProfiles(fetchedData);
//           localStorage.setItem('userProfiles', JSON.stringify(fetchedData));
//         }

//         // Extract distinct levels from the user profiles
//         const uniqueLevels = Array.from(new Set(fetchedData.map(profile => profile.level)));
//         setDistinctLevels(['', ...uniqueLevels]); // Add an option for All Levels
//       } catch (error) {
//         console.error('Error fetching user profiles:', error);

//         const storedData = JSON.parse(localStorage.getItem('userProfiles')) || [];
//         setUserProfiles(storedData);
//         setFilteredUserProfiles(storedData);
//       }
//     };

//     fetchUserProfiles();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilterCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     const filtered = userProfiles.filter((profile) => {
//       return (
//         profile.userName.includes(filterCriteria.username) &&
//         profile.email.includes(filterCriteria.email) &&
//         profile.phoneNumber.includes(filterCriteria.phone) &&
//         (filterCriteria.level === '' || profile.level === filterCriteria.level)
//       );
//     });
//     setFilteredUserProfiles(filtered);
//   }, [filterCriteria, userProfiles]);

//   return (
//     <div id="content-wrapper" className="d-flex flex-column">
//       <div id="content">
//         <div className="container-fluid">
//           <h1 className="h3 mb-4 text-gray-800">User Profiles List</h1>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card shadow mb-4">
//                 <div className="card-body">
                //   <div className="row mb-3">
                //     <div className="col-sm-4">
                //       <label htmlFor="usernameFilter">Username:</label>
                //       <input
                //         type="text"
                //         id="usernameFilter"
                //         name="username"
                //         value={filterCriteria.username}
                //         onChange={handleFilterChange}
                //         className="form-control"
                //       />
                //     </div>

                //     <div className="col-sm-4">
                //       <label htmlFor="emailFilter">Email:</label>
                //       <input
                //         type="text"
                //         id="emailFilter"
                //         name="email"
                //         value={filterCriteria.email}
                //         onChange={handleFilterChange}
                //         className="form-control"
                //       />
                //     </div>

                //     <div className="col-sm-4">
                //       <label htmlFor="phoneFilter">Phone:</label>
                //       <input
                //         type="text"
                //         id="phoneFilter"
                //         name="phone"
                //         value={filterCriteria.phone}
                //         onChange={handleFilterChange}
                //         className="form-control"
                //       />
                //     </div>
                //   </div>

//                   {/* <div className="mb-3">
//                     <label htmlFor="levelFilter">Level:</label>
//                     <select
//                       id="levelFilter"
//                       name="level"
//                       value={filterCriteria.level}
//                       onChange={handleFilterChange}
//                       className="form-control"
//                     >
//                       <option value="">All Levels</option>
//                       <option value="Pre-Nursery">Pre-Nursery</option>
//                       <option value="Nursery">Nursery</option>
//                       <option value="Pre-Primary">Pre-Primary</option>
//                       <option value="Primary">Primary</option>
//                       <option value="Secondary">Secondary</option>
//                     </select>
//                   </div> */}
                  
//                   <div className="mb-3 col-sm-7 float-end">
//                     <label htmlFor="levelFilter">Level:</label>
//                     <select
//                       id="levelFilter"
//                       name="level"
//                       value={filterCriteria.level}
//                       onChange={handleFilterChange}
//                       className="form-control"
//                     >
//                       {distinctLevels.map((level) => (
//                         <option key={level} value={level}>
//                           {level || 'All Levels'}
//                         </option>
//                       ))}
//                     </select>
//                   </div>


//                   <div className="table-responsive">
//                     <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
//                       <thead>
//                         <tr>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Phone</th>
//                           <th>Level</th>
//                           <th>Image</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredUserProfiles.map((profile) => (
//                           <tr key={profile.id}>
//                             <td>{`${profile.firstName} ${profile.lastName}`}</td>
//                             <td>{profile.email}</td>
//                             <td>{profile.phoneNumber}</td>
//                             <td>{profile.level}</td>
//                             <td>
//                               {profile.image && (
//                                 <img
//                                   src={URL.createObjectURL(profile.image)}
//                                   alt="Profile"
//                                   className="img-fluid"
//                                   style={{ maxWidth: '50px', maxHeight: '50px' }}
//                                 />
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersProfileList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UsersProfileList = () => {
//   const [userProfiles, setUserProfiles] = useState([]);
//   const [filteredUserProfiles, setFilteredUserProfiles] = useState([]);
//   const [filterCriteria, setFilterCriteria] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     level: '',
//   });

//   useEffect(() => {
//     // Fetch user profiles from the server
//     const fetchUserProfiles = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/userprofiles/viewAllUserProfiles');
//         setUserProfiles(response.data);
//         setFilteredUserProfiles(response.data);
//       } catch (error) {
//         console.error('Error fetching user profiles:', error);
//       }
//     };

//     fetchUserProfiles();
//   }, []); // Run once on component mount

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilterCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     // Apply filtering when filter criteria change
//     const filtered = userProfiles.filter((profile) => {
//       return (
//         profile.userName.includes(filterCriteria.username) &&
//         profile.email.includes(filterCriteria.email) &&
//         profile.phoneNumber.includes(filterCriteria.phone) &&
//         (filterCriteria.level === '' || profile.level === filterCriteria.level)
//       );
//     });
//     setFilteredUserProfiles(filtered);
//   }, [filterCriteria, userProfiles]);

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-10">
//           <div className="card">
//             <div className="card-header">User Profiles List</div>
//             <div className="card-body">
//               <div className="mb-3">
//                 <label htmlFor="usernameFilter">Username:</label>
//                 <input
//                   type="text"
//                   id="usernameFilter"
//                   name="username"
//                   value={filterCriteria.username}
//                   onChange={handleFilterChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="emailFilter">Email:</label>
//                 <input
//                   type="text"
//                   id="emailFilter"
//                   name="email"
//                   value={filterCriteria.email}
//                   onChange={handleFilterChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="phoneFilter">Phone:</label>
//                 <input
//                   type="text"
//                   id="phoneFilter"
//                   name="phone"
//                   value={filterCriteria.phone}
//                   onChange={handleFilterChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="levelFilter">Level:</label>
//                 <select
//                   id="levelFilter"
//                   name="level"
//                   value={filterCriteria.level}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">All Levels</option>
//                   <option value="Pre-Nursery">Pre-Nursery</option>
//                   <option value="Nursery">Nursery</option>
//                   <option value="Pre-Primary">Pre-Primary</option>
//                   <option value="Primary">Primary</option>
//                   <option value="Secondary">Secondary</option>
//                 </select>
//               </div>

//               <table className="table table-responsive">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Level</th>
//                     <th>Image</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUserProfiles.map((profile) => (
//                     <tr key={profile.id}>
//                       <td>{`${profile.firstName} ${profile.lastName}`}</td>
//                       <td>{profile.email}</td>
//                       <td>{profile.phoneNumber}</td>
//                       <td>{profile.level}</td>
//                       <td>
//                         {profile.image && (
//                           <img
//                             src={URL.createObjectURL(profile.image)}
//                             alt="Profile"
//                             className="img-fluid"
//                             style={{ maxWidth: '50px', maxHeight: '50px' }}
//                           />
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersProfileList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UsersProfileList = () => {
//   const [userProfiles, setUserProfiles] = useState([]);
//   const [filteredUserProfiles, setFilteredUserProfiles] = useState([]);
//   const [filterCriteria, setFilterCriteria] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     level: '',
//   });

//   useEffect(() => {
//     const fetchUserProfiles = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/userprofiles');
//         const fetchedData = response.data;

//         // If API returns no records, try fetching from local storage
//         if (fetchedData.length === 0) {
//           const storedData = JSON.parse(localStorage.getItem('userProfiles')) || [];
//           setUserProfiles(storedData);
//           setFilteredUserProfiles(storedData);
//         } else {
//           setUserProfiles(fetchedData);
//           setFilteredUserProfiles(fetchedData);

//           // Save the fetched data to local storage
//           localStorage.setItem('userProfiles', JSON.stringify(fetchedData));
//         }
//       } catch (error) {
//         console.error('Error fetching user profiles:', error);

//         // If API call fails, try fetching from local storage
//         const storedData = JSON.parse(localStorage.getItem('userProfiles')) || [];
//         setUserProfiles(storedData);
//         setFilteredUserProfiles(storedData);
//       }
//     };

//     fetchUserProfiles();
//   }, []); // Run once on component mount

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilterCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     const filtered = userProfiles.filter((profile) => {
//       return (
//         profile.userName.includes(filterCriteria.username) &&
//         profile.email.includes(filterCriteria.email) &&
//         profile.phoneNumber.includes(filterCriteria.phone) &&
//         (filterCriteria.level === '' || profile.level === filterCriteria.level)
//       );
//     });
//     setFilteredUserProfiles(filtered);
//   }, [filterCriteria, userProfiles]);

//   return (
//     <div id="content-wrapper" className="d-flex flex-column">
//       <div id="content">
//         <div className="container-fluid">
//           <h1 className="h3 mb-4 text-gray-800">User Profiles List</h1>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card shadow mb-4">
//                 <div className="card-body">
//                   <div className="mb-3">
//                     <label htmlFor="usernameFilter">Username:</label>
//                     <input
//                       type="text"
//                       id="usernameFilter"
//                       name="username"
//                       value={filterCriteria.username}
//                       onChange={handleFilterChange}
//                       className="form-control"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="emailFilter">Email:</label>
//                     <input
//                       type="text"
//                       id="emailFilter"
//                       name="email"
//                       value={filterCriteria.email}
//                       onChange={handleFilterChange}
//                       className="form-control"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="phoneFilter">Phone:</label>
//                     <input
//                       type="text"
//                       id="phoneFilter"
//                       name="phone"
//                       value={filterCriteria.phone}
//                       onChange={handleFilterChange}
//                       className="form-control"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="levelFilter">Level:</label>
//                     <select
//                       id="levelFilter"
//                       name="level"
//                       value={filterCriteria.level}
//                       onChange={handleFilterChange}
//                       className="form-control"
//                     >
//                       <option value="">All Levels</option>
//                       <option value="Pre-Nursery">Pre-Nursery</option>
//                       <option value="Nursery">Nursery</option>
//                       <option value="Pre-Primary">Pre-Primary</option>
//                       <option value="Primary">Primary</option>
//                       <option value="Secondary">Secondary</option>
//                     </select>
//                   </div>

//                   <div className="table-responsive">
//                     <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
//                       <thead>
//                         <tr>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Phone</th>
//                           <th>Level</th>
//                           <th>Image</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredUserProfiles.map((profile) => (
//                           <tr key={profile.id}>
//                             <td>{`${profile.firstName} ${profile.lastName}`}</td>
//                             <td>{profile.email}</td>
//                             <td>{profile.phoneNumber}</td>
//                             <td>{profile.level}</td>
//                             <td>
//                               {profile.image && (
//                                 <img
//                                   src={URL.createObjectURL(profile.image)}
//                                   alt="Profile"
//                                   className="img-fluid"
//                                   style={{ maxWidth: '50px', maxHeight: '50px' }}
//                                 />
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersProfileList;
