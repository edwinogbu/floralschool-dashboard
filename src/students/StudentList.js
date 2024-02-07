
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function StudentList() {
      const [students, setStudents] = useState([]);
      const [showModal, setShowModal] = useState(false);
      const [selectedStudent, setSelectedStudent] = useState(null);
      const [updatedData, setUpdatedData] = useState({});
      const [filteredState, setFilteredState] = useState('');
      const [filteredName, setFilteredName] = useState('');
      const [filteredLevel, setFilteredLevel] = useState('');
      const [selectedImage, setSelectedImage] = useState(null); // Track selected image
     // Inside your component
const [newImage, setNewImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);



const handleImageChange = (e) => {
  const file = e.target.files[0];
  setNewImage(file);

  // Generate a preview of the new image
  const reader = new FileReader();
  reader.onloadend = () => {
    setImagePreview(reader.result);
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};

      const baseUrl = 'http://localhost:8080/api/students';
    
      useEffect(() => {
        fetchStudents();
      }, [filteredState, filteredName, filteredLevel]);
    
    //   const fetchStudents = async () => {
    //     try {
    //       // Try to retrieve data from local storage
    //       const storedStudents = localStorage.getItem('students');
    
    //       if (storedStudents) {
    //         // If data exists in local storage, set it to the state
    //         setStudents(JSON.parse(storedStudents));
    //       } else {
    //         // If no data in local storage, make API call
    //         const response = await axios.get(baseUrl + '/viewAllStudents');
    //         const sortedStudents = response.data.sort((a, b) => a.studentName.localeCompare(b.studentName));
    
    //         // Set the state and save it to local storage
    //         setStudents(sortedStudents);
    //         localStorage.setItem('students', JSON.stringify(sortedStudents));
    //       }
    //     } catch (error) {
    //       console.error('Error fetching students:', error);
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'An error occurred while fetching students.',
    //       });
    //     }
    //   };

      const fetchStudents = async () => {
        try {
          // Try to retrieve data from local storage
          const storedStudents = localStorage.getItem('students');
      
          if (storedStudents) {
            // If data exists in local storage, set it to the state
            setStudents(JSON.parse(storedStudents));
          }
      
          // Make API call to get the latest data
          const response = await axios.get(baseUrl + '/viewAll');
          const latestStudents = response.data.sort((a, b) => a.studentName.localeCompare(b.studentName));
      
          // Check if the API data is different from the stored data
          const isDataChanged = JSON.stringify(latestStudents) !== JSON.stringify(JSON.parse(storedStudents));
      
          if (isDataChanged) {
            // If data has changed, update the state and save it to local storage
            setStudents(latestStudents);
            localStorage.setItem('students', JSON.stringify(latestStudents));
          }
        } catch (error) {
          console.error('Error fetching students:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while fetching students.',
          });
        }
      };
      

//   const [students, setStudents] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [filteredState, setFilteredState] = useState('');
//   const [filteredName, setFilteredName] = useState('');
//   const [filteredLevel, setFilteredLevel] = useState('');

//   const baseUrl = 'http://localhost:8080/api/students';

//   useEffect(() => {
//     fetchStudents();
//   }, [filteredState, filteredName, filteredLevel]);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllStudents');
//       const sortedStudents = response.data.sort((a, b) => a.studentName.localeCompare(b.studentName));
//       setStudents(sortedStudents);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching students.',
//       });
//     }
//   };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(baseUrl + '/delete/' + id);
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Student deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting student:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the student.',
      });
    }
  };

  // const updateStudent = async () => {
  //   try {
  //     const response = await axios.put(baseUrl + '/update/' + selectedStudent.id, updatedData);

  //     if (response.status === 200) {
  //       const updatedStudent = response.data;
  //       setStudents((prevStudents) =>
  //         prevStudents.map((student) => (student.id === selectedStudent.id ? updatedStudent : student))
  //       );

  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Success',
  //         text: 'Student updated successfully!',
  //       });

  //       handleCloseModal();
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Unexpected response status ' + response.status,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error updating student:', error);

  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'An error occurred while updating the student.',
  //     });
  //   }
  //   if (newImage) {
  //     const formData = new FormData();
  //     formData.append('image', newImage);

  //     // Use the student's ID in the API endpoint (adjust the endpoint accordingly)
  //     const imageUploadResponse = await axios.post(
  //       `${baseUrl}/uploadImage/${selectedStudent.id}`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     // Handle the image upload response as needed
  //     console.log('Image Upload Response:', imageUploadResponse);
  //   }
  // };


  // const updateStudent = async () => {
  //   try {
  //     const response = await axios.put(baseUrl + '/update/' + selectedStudent.id, updatedData);
  
  //     if (response.status === 200) {
  //       const updatedStudent = response.data;
  //       setStudents((prevStudents) =>
  //         prevStudents.map((student) => (student.id === selectedStudent.id ? updatedStudent : student))
  //       );
  
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Success',
  //         text: 'Student updated successfully!',
  //       });
  
  //       handleCloseModal();
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Unexpected response status ' + response.status,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error updating student:', error);
  
  //     // Add this line to log the error details
  //     console.error(error.response);
  
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'An error occurred while updating the student.',
  //     });
  //   }
  
  //   // If newImage is defined, upload the new image
  //   if (newImage) {
  //     try {
  //       const formData = new FormData();
  //       formData.append('image', newImage);
  
  //       // Use the student's ID in the API endpoint (adjust the endpoint accordingly)
  //       const imageUploadResponse = await axios.post(
  //         `${baseUrl}/uploadImage/${selectedStudent.id}`,
  //         formData,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         }
  //       );
  
  //       // Handle the image upload response as needed
  //       console.log('Image Upload Response:', imageUploadResponse);
  //     } catch (imageUploadError) {
  //       console.error('Error uploading new image:', imageUploadError);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'An error occurred while uploading the new image.',
  //       });
  //     }
  //   }
  // };
  

  // const updateStudent = async () => {
  //   try {
  //     const response = await axios.put(`${baseUrl}/update/${selectedStudent.id}`, updatedData);
  
  //     if (response.status === 200) {
  //       const updatedStudent = response.data;
  //       setStudents((prevStudents) =>
  //         prevStudents.map((student) => (student.id === selectedStudent.id ? updatedStudent : student))
  //       );
  
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Success',
  //         text: 'Student updated successfully!',
  //       });
  
  //       handleCloseModal();
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Unexpected response status ' + response.status,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error updating student:', error);
  
  //     // Log the error details
  //     console.error(error.response);
  
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'An error occurred while updating the student.',
  //     });
  //   }
  
  //   // Upload the new image if available
  //   if (newImage) {
  //     const formData = new FormData();
  //     formData.append('image', newImage);
  
  //     try {
  //       await axios.put(`${baseUrl}/update/${selectedStudent.id}`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  
  //       console.log('Image uploaded successfully');
  //     } catch (imageUploadError) {
  //       console.error('Error uploading new image:', imageUploadError);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'An error occurred while uploading the new image.',
  //       });
  //     }
  //   }
  // };
  

  const updateStudent = async () => {
    try {
      // Create a copy of the original student data
      const originalStudent = { ...selectedStudent };
  
      // If a new image is selected, update the image path
      if (newImage) {
        originalStudent.imagePath = null; // Reset the image path to force an update
      }
  
      // Update only the changed parameters
      const updatedStudentData = {
        ...originalStudent,
        ...updatedData,
      };
  
      // Make a request to update the student information
      const response = await axios.put(`${baseUrl}/update/${selectedStudent.id}`, updatedStudentData);
  
      if (response.status === 200) {
        const updatedStudent = response.data;
  
        // Update the students list with the new data
        setStudents((prevStudents) =>
          prevStudents.map((student) => (student.id === selectedStudent.id ? updatedStudent : student))
        );
  
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Student updated successfully!',
        });
  
        handleCloseModal();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unexpected response status ' + response.status,
        });
      }
    } catch (error) {
      console.error('Error updating student:', error);
  
      // Log the error details
      console.error(error.response);
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the student.',
      });
    }
  
    // Upload the new image if available
    if (newImage) {
      const formData = new FormData();
      formData.append('image', newImage);
  
      try {
        // Make a separate request to update the image
        await axios.put(`${baseUrl}/update/${selectedStudent.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Image uploaded successfully');
      } catch (imageUploadError) {
        console.error('Error uploading new image:', imageUploadError);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while uploading the new image.',
        });
      }
    }
  };
  

  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setUpdatedData({
      studentName: student.studentName,
      phoneNumber: student.phoneNumber,
      dob: student.dob,
      homeAddress: student.homeAddress,
      stateOfOrigin: student.stateOfOrigin,
      guardianName: student.guardianName,
      sex: student.sex,
      level: student.level,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setUpdatedData({});
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFilterStateChange = (e) => {
    setFilteredState(e.target.value);
  };

  const handleFilterNameChange = (e) => {
    setFilteredName(e.target.value);
  };

  const handleFilterLevelChange = (e) => {
    setFilteredLevel(e.target.value);
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setNewImage(file);
  // };
  

  const uniqueStates = [...new Set(students.map((student) => student.stateOfOrigin))];
  const uniqueLevels = [...new Set(students.map((student) => student.level))];

  const filteredStudents = students.filter(
    (student) =>
      (!filteredState || student.stateOfOrigin.toLowerCase() === filteredState.toLowerCase()) &&
      (!filteredName || student.studentName.toLowerCase().includes(filteredName.toLowerCase())) &&
      (!filteredLevel || student.level.toLowerCase() === filteredLevel.toLowerCase())
  );

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set selected image when clicked
  };

  const handleImageClose = () => {
    setSelectedImage(null); // Clear selected image when closed
  };

  return (
    <div className="container-fluid col-sm-12">
      <div className="card shadow mb-4 col-sm-12">
          <div className="mx-5 py-3 col-sm-2">
            <h6 className="m-0 font-weight-bold text-primary ">Student List Table</h6>
          </div>
        <div className="card-header py-3 d-flex justify-content-between col-sm-12">
        <div className='flex d-flex '>
        <Link to="/add-student" className="btn btn-outline-primary btn-xl mx-5">
         Add Student
        </Link>
        </div>
          <div className="mx-2 py-2 col-sm-9">
            <div className="row">
              <div className="col-sm-4">
                <Form.Group controlId="formStateFilter">
                  <Form.Control
                    as="select"
                    className="custom-select custom-select-lg"
                    value={filteredState}
                    onChange={handleFilterStateChange}
                  >
                    <option value="">Filter by State</option>
                    {uniqueStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group controlId="formNameFilter">
                  <Form.Control
                    type="text"
                    className="custom custom-form-control"
                    placeholder="Filter by Name"
                    value={filteredName}
                    onChange={handleFilterNameChange}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4">
                <Form.Group controlId="formLevelFilter">
                  <Form.Control
                    as="select"
                    className="custom-select custom-select-lg"
                    placeholder="Filter by Level"
                    value={filteredLevel}
                    onChange={handleFilterLevelChange}
                  >
                    <option value="">Filter by Level</option>
                    {uniqueLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body col-sm-12">
          <div className="table-responsive col-sm-12">
            <table className="table table-bordered col-sm-12" width="100%" cellSpacing={0}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>register Number</th>
                  <th>Phone Number</th>
                  {/* <th>Home Address</th> */}
                  {/* <th>State of Origin</th> */}
                  {/* <th>Guardian Name</th> */}
                  <th>Sex</th>
                  <th>Level</th>
                  <th>Image</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>
                    <Link to={`/student-detail/${student.id}`} className='font-weight-bold'>
                        {student.studentName}
                        
                    </Link>
                    </td>
                    <td>
                    <Link to={`/student-detail/${student.id}`} className='font-weight-bold'>

                      {student.registerNumber}
                      </Link>
                      </td>
                    <td>{student.phoneNumber}</td>
                    {/* <td>{student.homeAddress}</td> */}
                    {/* <td>{student.stateOfOrigin}</td> */}
                    {/* <td>{student.guardianName}</td> */}
                    <td>{student.sex}</td>
                    <td>{student.level}</td>
                    <td>
                        {student.imagePath && (
                          <div
                            onClick={() => handleImageClick(student.imageUrl)} // Handle click event
                            className="img-thumbnail"
                            style={{
                              cursor: 'pointer',
                              backgroundImage: `url(${student.imageUrl})`, // Display image as background
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              width: '100px',
                              height: '100px',
                            }}
                          ></div>
                        )}
                      </td>
                    <td colSpan={2}>
                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="btn btn-danger btn-sm mx-1 btn-xl"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleShowModal(student)}
                        className="btn btn-primary btn-sm mx-1 btn-xl"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

        {/* Conditional rendering for full-size image */}
        {selectedImage && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Full Image</h5>
                <button type="button" className="close" onClick={handleImageClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={selectedImage} alt="Full Post" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStudentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student name"
                name="studentName"
                value={updatedData.studentName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={updatedData.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={updatedData.dob}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formHomeAddress">
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter home address"
                name="homeAddress"
                value={updatedData.homeAddress}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formStateOfOrigin">
              <Form.Label>State of Origin</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state of origin"
                name="stateOfOrigin"
                value={updatedData.stateOfOrigin}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formGuardianName">
              <Form.Label>Guardian Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter guardian name"
                name="guardianName"
                value={updatedData.guardianName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formSex">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                as="select"
                className="custom-select custom-select-lg"
                name="sex"
                value={updatedData.sex}
                onChange={handleInputChange}
              >
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formLevel">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter level"
                name="level"
                value={updatedData.level}
                onChange={handleInputChange}
              />
            </Form.Group>

              {/* Display the previous image */}
    {selectedStudent && selectedStudent.imageUrl && (
      <div className="mb-3">
        <label>Previous Image:</label>
        <img
          src={selectedStudent.imageUrl}
          alt="Previous"
          className="img-thumbnail"
          style={{
            width: '100px',
            height: '100px',
          }}
        />
      </div>
    )}

    {/* Display the preview of the new image */}
    {imagePreview && (
      <div className="mb-3">
        <label>New Image Preview:</label>
        <img
          src={imagePreview}
          alt="Preview"
          className="img-thumbnail"
          style={{
            width: '100px',
            height: '100px',
          }}
        />
      </div>
    )}

    {/* Input field for selecting a new image */}
    <Form.Group controlId="formImage">
      <Form.Label>New Student Image</Form.Label>
      <Form.Control
        type="file"
        accept="image/*"
        name="image"
        onChange={(e) => handleImageChange(e)}
      />
    </Form.Group>


            <Button variant="primary" onClick={updateStudent}>
              Update Student
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default StudentList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// function StudentList() {
//   const [students, setStudents] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [filteredState, setFilteredState] = useState('');

//   const baseUrl = 'http://localhost:8080/api/students';

//   useEffect(() => {
//     fetchStudents();
//   }, [filteredState]);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllStudents');
//       const sortedStudents = response.data.sort((a, b) => a.studentName.localeCompare(b.studentName));
//       setStudents(sortedStudents);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching students.',
//       });
//     }
//   };

//   const deleteStudent = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/deleteStudent/' + id);
//       setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting student:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the student.',
//       });
//     }
//   };

//   const updateStudent = async () => {
//     try {
//       const response = await axios.put(baseUrl + '/updateStudent/' + selectedStudent.id, updatedData);

//       if (response.status === 200) {
//         const updatedStudent = response.data;
//         setStudents((prevStudents) =>
//           prevStudents.map((student) => (student.id === selectedStudent.id ? updatedStudent : student))
//         );

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Student updated successfully!',
//         });

//         handleCloseModal();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Unexpected response status ' + response.status,
//         });
//       }
//     } catch (error) {
//       console.error('Error updating student:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the student.',
//       });
//     }
//   };

//   const handleShowModal = (student) => {
//     setSelectedStudent(student);
//     setUpdatedData({
//       studentName: student.studentName,
//       phoneNumber: student.phoneNumber,
//       dob: student.dob,
//       homeAddress: student.homeAddress,
//       stateOfOrigin: student.stateOfOrigin,
//       guardianName: student.guardianName,
//       sex: student.sex,
//       level: student.level,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedStudent(null);
//     setUpdatedData({});
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFilterStateChange = (e) => {
//     setFilteredState(e.target.value);
//   };

//   return (
//     <div className="container-fluid col-sm-12">
//       <div className="card shadow mb-4 col-sm-12">
//         <div className="card-header py-3 d-flex justify-content-between col-sm-12">
//           <div className="mx-5 py-3 col-sm-3">
//             <h6 className="m-0 font-weight-bold text-primary ">Student List Table</h6>
//           </div>
//           <div className="mx-2 py-2 col-sm-4">
//             <Form.Group controlId="formStateFilter">
//               <Form.Control
//                 as="select"
//                 className="custom-select custom-select-lg"
//                 value={filteredState}
//                 onChange={handleFilterStateChange}
//               >
//                 <option value="">Filter by State</option>
//                 {[...new Set(students.map((student) => student.stateOfOrigin))].map((state) => (
//                   <option key={state} value={state}>
//                     {state}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </div>
//         </div>
//         <div className="card-body col-sm-12">
//           <div className="table-responsive col-sm-12">
//             <table className="table table-bordered col-sm-12" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Student Name</th>
//                   <th>Phone Number</th>
//                   <th>Date of Birth</th>
//                   <th>Home Address</th>
//                   <th>State of Origin</th>
//                   <th>Guardian Name</th>
//                   <th>Sex</th>
//                   <th>Level</th>
//                   <th colSpan={2}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student) => (
//                   <tr key={student.id}>
//                     <td>{student.id}</td>
//                     <td>{student.studentName}</td>
//                     <td>{student.phoneNumber}</td>
//                     <td>{student.dob}</td>
//                     <td>{student.homeAddress}</td>
//                     <td>{student.stateOfOrigin}</td>
//                     <td>{student.guardianName}</td>
//                     <td>{student.sex}</td>
//                     <td>{student.level}</td>
//                     <td colSpan={2}>
//                       <button
//                         onClick={() => deleteStudent(student.id)}
//                         className="btn btn-danger btn-sm mx-1 btn-xl"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowModal(student)}
//                         className="btn btn-primary btn-sm mx-1 btn-xl"
//                       >
//                         Update
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Student</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formStudentName">
//               <Form.Label>Student Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter student name"
//                 name="studentName"
//                 value={updatedData.studentName}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formPhoneNumber">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="tel"
//                 placeholder="Enter phone number"
//                 name="phoneNumber"
//                 value={updatedData.phoneNumber}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formDob">
//               <Form.Label>Date of Birth</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="dob"
//                 value={updatedData.dob}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formHomeAddress">
//               <Form.Label>Home Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter home address"
//                 name="homeAddress"
//                 value={updatedData.homeAddress}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formStateOfOrigin">
//               <Form.Label>State of Origin</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter state of origin"
//                 name="stateOfOrigin"
//                 value={updatedData.stateOfOrigin}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formGuardianName">
//               <Form.Label>Guardian Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter guardian name"
//                 name="guardianName"
//                 value={updatedData.guardianName}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formSex">
//               <Form.Label>Sex</Form.Label>
//               <Form.Control
//                 as="select"
//                 className="custom-select custom-select-lg"
//                 name="sex"
//                 value={updatedData.sex}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select sex</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </Form.Control>
//             </Form.Group>

//             <Form.Group controlId="formLevel">
//               <Form.Label>Level</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter level"
//                 name="level"
//                 value={updatedData.level}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={updateStudent}>
//               Update Student
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default StudentList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPhone, faCalendar, faHome, faAddressCard, faUserGraduate, faVenusMars } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const baseUrl = 'http://localhost:8080/api/students';

//   useEffect(() => {
//     // Fetch students data from the API
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get(baseUrl + '/getAll');
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Student List</h2>
//       <div className="table-responsive">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Student Name</th>
//               <th>Phone Number</th>
//               <th>Date of Birth</th>
//               <th>Home Address</th>
//               <th>State of Origin</th>
//               <th>Guardian Name</th>
//               <th>Sex</th>
//               <th>Level</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.id}>
//                 <td>{student.studentName}</td>
//                 <td>{student.phoneNumber}</td>
//                 <td>{student.dob}</td>
//                 <td>{student.homeAddress}</td>
//                 <td>{student.stateOfOrigin}</td>
//                 <td>{student.guardianName}</td>
//                 <td>{student.sex}</td>
//                 <td>{student.level}</td>
//                 <td>
//                   <Link to={`/edit-student/${student.id}`} className="btn btn-warning btn-sm mr-2">
//                     Edit
//                   </Link>
//                   <button className="btn btn-danger btn-sm">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentList;
