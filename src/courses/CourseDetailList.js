import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap';

function CourseDetailList() {
  const [courseDetails, setCourseDetails] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [updatedCourseTitle, setUpdatedCourseTitle] = useState('');
  const [filteredCourseTitle, setFilteredCourseTitle] = useState('');

  const baseUrl = 'http://localhost:8080/api/course-details';

  useEffect(() => {
    fetchCourseDetails();
  }, [filteredCourseTitle]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(baseUrl + '/viewAllCourseDetails');
      setCourseDetails(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while fetching course details.',
      });
    }
  };

  const createCourse = async () => {
    try {
      const response = await axios.post(baseUrl + '/create', {
        courseTitle: newCourseTitle,
      });

      if (response.status === 201) {
        const newCourse = response.data;
        setCourseDetails((prevCourses) => [...prevCourses, newCourse]);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Course created successfully!',
        });

        handleCloseCreateModal();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unexpected response status ' + response.status,
        });
      }
    } catch (error) {
      console.error('Error creating course:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the course.',
      });
    }
  };

  const updateCourse = async () => {
    if (!selectedCourse) {
      return;
    }

    try {
      const response = await axios.put(baseUrl + '/update/' + selectedCourse.id, {
        courseTitle: updatedCourseTitle,
      });

      if (response.status === 200) {
        const updatedCourse = response.data;
        setCourseDetails((prevCourses) =>
          prevCourses.map((course) =>
            course.id === updatedCourse.id ? updatedCourse : course
          )
        );

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Course updated successfully!',
        });

        handleCloseUpdateModal();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unexpected response status ' + response.status,
        });
      }
    } catch (error) {
      console.error('Error updating course:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the course.',
      });
    }
  };


const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/course-details/delete/${id}`);
      setCourseDetails((prevDetails) =>
        prevDetails.filter((detail) => detail.id !== id)
      );
      Swal.fire({
        icon: 'success',
        title: 'Course Deleted!',
        text: 'Course detail has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting course detail:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the course detail.',
      });
    }
  };


  const handleShowUpdateModal = (course) => {
    setSelectedCourse(course);
    setUpdatedCourseTitle(course.courseTitle);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedCourse(null);
    setUpdatedCourseTitle('');
    setShowUpdateModal(false);
  };

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewCourseTitle('');
  };

  const handleNewCourseTitleChange = (e) => {
    setNewCourseTitle(e.target.value);
  };

  const handleUpdatedCourseTitleChange = (e) => {
    setUpdatedCourseTitle(e.target.value);
  };

  const handleFilterCourseTitleChange = (e) => {
    setFilteredCourseTitle(e.target.value);
  };

  return (
    <div className="container-fluid col-sm-12">
      <div className="card shadow mb-4 col-sm-12">
        <div className="card-header py-3 d-flex justify-content-between col-sm-12">
          <div className="mx-5 py-3 col-sm-3">
            <h6 className="m-0 font-weight-bold text-primary">Course Details List Table</h6>
          </div>
          <div className="mx-2 py-2 col-sm-4">
            <Button variant="success" onClick={handleShowCreateModal}>
              Create Course
            </Button>
          </div>
          <div className="mx-2 py-2 col-sm-4">
            <Form.Group controlId="formCourseTitleFilter">
              <Form.Control
                type="text"
                className="custom custom-form-control"
                placeholder="Filter by Course Title"
                value={filteredCourseTitle}
                onChange={handleFilterCourseTitleChange}
              />
            </Form.Group>
          </div>
        </div>

        <div className="card-body col-sm-12">
          <div className="table-responsive col-sm-12">
            <table className="table table-bordered col-sm-12" width="100%" cellSpacing={0}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Course Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courseDetails
                  .filter((course) =>
                    course.courseTitle.toLowerCase().includes(filteredCourseTitle.toLowerCase())
                  )
                  .map((course) => (
                    <tr key={course.id}>
                      <td>{course.id}</td>
                      <td>{course.courseTitle}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleShowUpdateModal(course)}
                          className="btn-sm"
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deleteCourse(course.id)}
                          className="btn-sm mx-2"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Course Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewCourseTitle">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course title"
                value={newCourseTitle}
                onChange={handleNewCourseTitleChange}
              />
            </Form.Group>
            <Button variant="success" onClick={createCourse}>
              Create Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Update Course Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUpdatedCourseTitle" style={{margin:25,}}>
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter updated course title"
                value={updatedCourseTitle}
                onChange={handleUpdatedCourseTitleChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={updateCourse} style={{marginTop:25,}}>
              Update Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CourseDetailList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// function CourseDetailList() {
//   const [courseDetails, setCourseDetails] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [newCourseTitle, setNewCourseTitle] = useState('');
//   const [updatedCourseTitle, setUpdatedCourseTitle] = useState('');

//   const baseUrl = 'http://localhost:8080/api/course-details';

//   useEffect(() => {
//     fetchCourseDetails();
//   }, []);

//   const fetchCourseDetails = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllCourseDetails');
//       setCourseDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching course details:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching course details.',
//       });
//     }
//   };

//   const createCourse = async () => {
//     try {
//       const response = await axios.post(baseUrl + '/create', {
//         courseTitle: newCourseTitle,
//       });

//       if (response.status === 201) {
//         const newCourse = response.data;
//         setCourseDetails((prevCourses) => [...prevCourses, newCourse]);

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Course created successfully!',
//         });

//         handleCloseCreateModal();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Unexpected response status ' + response.status,
//         });
//       }
//     } catch (error) {
//       console.error('Error creating course:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while creating the course.',
//       });
//     }
//   };

// //   const updateCourse = async () => {
// //     if (!selectedCourse) {
// //       return;
// //     }

// //     try {
// //       const response = await axios.put(baseUrl + '/update/' + selectedCourse.id, {
// //         courseTitle: updatedCourseTitle,
// //       });

// //       if (response.status === 200) {
// //         const updatedCourse = response.data;
// //         setCourseDetails((prevCourses) =>
// //           prevCourses.map((course) =>
// //             course.id === updatedCourse.id ? updatedCourse : course
// //           )
// //         );

// //         Swal.fire({
// //           icon: 'success',
// //           title: 'Success',
// //           text: 'Course updated successfully!',
// //         });

// //         handleCloseUpdateModal();
// //       } else {
// //         Swal.fire({
// //           icon: 'error',
// //           title: 'Error',
// //           text: 'Unexpected response status ' + response.status,
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error updating course:', error);

// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'An error occurred while updating the course.',
// //       });
// //     }
// //   };


// const updateCourse = async () => {
//     if (!selectedCourse) {
//       return;
//     }
  
//     try {
//       const response = await axios.put(baseUrl + '/update/' + selectedCourse.id, {
//         id: selectedCourse.id,
//         courseTitle: updatedCourseTitle,
//       });
  
//       if (response.status === 200) {
//         const updatedCourse = response.data;
//         setCourseDetails((prevCourses) =>
//           prevCourses.map((course) =>
//             course.id === updatedCourse.id ? updatedCourse : course
//           )
//         );
  
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Course updated successfully!',
//         });
  
//         handleCloseUpdateModal();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Unexpected response status ' + response.status,
//         });
//       }
//     } catch (error) {
//       console.error('Error updating course:', error);
  
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the course.',
//       });
//     }
//   };
  
// //   const deleteCourse = async (id) => {
// //     try {
// //       await axios.delete(baseUrl + '/delete/' + id);
// //       setCourseDetails((prevCourses) => prevCourses.filter((course) => course.id !== id));

// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Success',
// //         text: 'Course deleted successfully!',
// //       });
// //     } catch (error) {
// //       console.error('Error deleting course:', error);

// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'An error occurred while deleting the course.',
// //       });
// //     }
// //   };

// const deleteCourse = async (id) => {
//     try {
//       const confirmation = await Swal.fire({
//         icon: 'warning',
//         title: 'Are you sure?',
//         text: 'You won\'t be able to revert this!',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         cancelButtonColor: '#3085d6',
//         confirmButtonText: 'Yes, delete it!',
//       });
  
//       if (confirmation.isConfirmed) {
//         await axios.delete(baseUrl + '/delete/' + id);
//         setCourseDetails((prevCourses) => prevCourses.filter((course) => course.id !== id));
  
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Course deleted successfully!',
//         });
//       }
//     } catch (error) {
//       console.error('Error deleting course:', error);
  
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the course.',
//       });
//     }
//   };
  
//   const handleShowUpdateModal = (course) => {
//     setSelectedCourse(course);
//     setUpdatedCourseTitle(course.courseTitle);
//     setShowUpdateModal(true);
//   };

//   const handleCloseUpdateModal = () => {
//     setSelectedCourse(null);
//     setUpdatedCourseTitle('');
//     setShowUpdateModal(false);
//   };

//   const handleShowCreateModal = () => {
//     setShowCreateModal(true);
//   };

//   const handleCloseCreateModal = () => {
//     setShowCreateModal(false);
//     setNewCourseTitle('');
//   };

//   const handleNewCourseTitleChange = (e) => {
//     setNewCourseTitle(e.target.value);
//   };

//   const handleUpdatedCourseTitleChange = (e) => {
//     setUpdatedCourseTitle(e.target.value);
//   };

//   return (
//     <div className="container-fluid col-sm-12">
//       <div className="card shadow mb-4 col-sm-12">
//         <div className="card-header py-3 d-flex justify-content-between col-sm-12">
//           <div className="mx-5 py-3 col-sm-3">
//             <h6 className="m-0 font-weight-bold text-primary">Course Details List Table</h6>
//           </div>
//           <div className="mx-2 py-2 col-sm-4">
//             <Button variant="success" onClick={handleShowCreateModal}>
//               Create Course
//             </Button>
//           </div>
//         </div>

//         <div className="card-body col-sm-12">
//           <div className="table-responsive col-sm-12">
//             <table className="table table-bordered col-sm-12" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Course Title</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courseDetails.map((course) => (
//                   <tr key={course.id}>
//                     <td>{course.id}</td>
//                     <td>{course.courseTitle}</td>
//                     <td>
//                       <Button
//                         variant="primary"
//                         onClick={() => handleShowUpdateModal(course)}
//                         className="btn-sm"
//                       >
//                         Update
//                       </Button>
//                       <Button
//                         variant="danger"
//                         onClick={() => deleteCourse(course.id)}
//                         className="btn-sm mx-2"
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create Course Modal */}
//       <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Course</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formNewCourseTitle">
//               <Form.Label>Course Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter course title"
//                 value={newCourseTitle}
//                 onChange={handleNewCourseTitleChange}
//               />
//             </Form.Group>
//             <Button variant="success" onClick={createCourse}>
//               Create Course
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Update Course Modal */}
//       <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Course</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formUpdatedCourseTitle">
//               <Form.Label>Course Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter updated course title"
//                 value={updatedCourseTitle}
//                 onChange={handleUpdatedCourseTitleChange}
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={updateCourse}>
//               Update Course
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default CourseDetailList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// function CourseDetailList() {
//   const [courseDetails, setCourseDetails] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [filteredCourseCode, setFilteredCourseCode] = useState('');

//   const baseUrl = 'http://localhost:8080/api/course-details';

//   useEffect(() => {
//     fetchCourseDetails();
//   }, []);

//   const fetchCourseDetails = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllCourseDetails');
//       setCourseDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching course details:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching course details.',
//       });
//     }
//   };

//   const addCourse = async () => {
//     try {
//       const response = await axios.post(baseUrl + '/create', updatedData);
//       const savedCourse = response.data;

//       setCourseDetails((prevDetails) => [...prevDetails, savedCourse]);

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Course created successfully!',
//       });

//       handleCloseCreateModal();
//     } catch (error) {
//       console.error('Error creating course:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while creating the course.',
//       });
//     }
//   };

//   const createCourse = async () => {
//     try {
//       const response = await axios.post(baseUrl + '/create', {
//         courseTitle: "Mathematics",
//       });
  
//       if (response.status === 201) {
//         const newCourse = response.data;
//         setCourseDetails((prevCourses) => [...prevCourses, newCourse]);
  
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Course created successfully!',
//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Unexpected response status ' + response.status,
//         });
//       }
//     } catch (error) {
//       console.error('Error creating course:', error);
  
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while creating the course.',
//       });
//     }
//   };

//   const updateCourse = async () => {
//     try {
//       const response = await axios.put(baseUrl + `/update/${selectedRecord.id}`, updatedData);
//       const updatedCourse = response.data;

//       setCourseDetails((prevDetails) =>
//         prevDetails.map((course) => (course.id === selectedRecord.id ? updatedCourse : course))
//       );

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Course updated successfully!',
//       });

//       handleCloseUpdateModal();
//     } catch (error) {
//       console.error('Error updating course:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the course.',
//       });
//     }
//   };

//   const deleteCourse = async (id) => {
//     try {
//       await axios.delete(baseUrl + `/delete/${id}`);
//       setCourseDetails((prevDetails) => prevDetails.filter((course) => course.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Course deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting course:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the course.',
//       });
//     }
//   };

//   const handleShowCreateModal = () => {
//     setUpdatedData({});
//     setShowCreateModal(true);
//   };

//   const handleCloseCreateModal = () => {
//     setShowCreateModal(false);
//   };

//   const handleShowUpdateModal = (record) => {
//     setSelectedRecord(record);
//     setUpdatedData({
//       courseCode: record.courseCode,
//       courseTitle: record.courseTitle,
//     });
//     setShowUpdateModal(true);
//   };

//   const handleCloseUpdateModal = () => {
//     setSelectedRecord(null);
//     setUpdatedData({});
//     setShowUpdateModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   return (
//     <div className="container-fluid col-sm-12">
//       <div className="card shadow mb-4 col-sm-12">
//         <div className="card-header py-3 d-flex justify-content-between col-sm-12">
//           <div className="mx-5 py-3 col-sm-3">
//             <h6 className="m-0 font-weight-bold text-primary ">Course Details List Table</h6>
//           </div>
//           <div className="mx-2 py-2 col-sm-4">
//             <Form.Group controlId="formCourseCodeFilter">
//               <Form.Control
//                 as="select"
//                 className="custom-select custom-select-lg"
//                 value={filteredCourseCode}
//                 onChange={(e) => setFilteredCourseCode(e.target.value)}
//               >
//                 <option value="">Filter by Course Code</option>
//                 {[...new Set(courseDetails.map((record) => record.courseCode))].map((courseCode) => (
//                   <option key={courseCode} value={courseCode}>
//                     {courseCode}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </div>
//           <div className="mx-2 py-2 col-sm-4">
//           <Button variant="success" onClick={createCourse}>
//               Create Course
//            </Button>
//           </div>
//         </div>
//         {/* ... (rest of the code) */}
//         <div className="card-body col-sm-12">
//           <div className="table-responsive col-sm-12">
//             <table className="table table-bordered col-sm-12" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Course Code</th>
//                   <th>Course Title</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courseDetails.map((record) => (
//                   <tr key={record.id}>
//                     <td>{record.id}</td>
//                     <td>{record.courseCode}</td>
//                     <td>{record.courseTitle}</td>
//                     <td>
//                       <button
//                         onClick={() => deleteCourse(record.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowUpdateModal(record)}
//                         className="btn btn-primary btn-sm mx-1"
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

    

//         {/* Create Course Modal */}
//         <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Create Course</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="formCourseCode">
//                 <Form.Label>Course Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter course code"
//                   name="courseCode"
//                   value={updatedData.courseCode || ''}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formCourseTitle">
//                 <Form.Label>Course Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter course title"
//                   name="courseTitle"
//                   value={updatedData.courseTitle || ''}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Button variant="primary" onClick={addCourse}>
//                 Create Course
//               </Button>
//             </Form>
//           </Modal.Body>
//         </Modal>

//         {/* Update Course Modal */}
//         <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Update Course</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="formCourseCode">
//                 <Form.Label>Course Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter course code"
//                   name="courseCode"
//                   value={updatedData.courseCode || ''}
//                   onChange={handleInputChange}
//                   disabled
//                 />
//               </Form.Group>

//               <Form.Group controlId="formCourseTitle">
//                 <Form.Label>Course Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter course title"
//                   name="courseTitle"
//                   value={updatedData.courseTitle || ''}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Button variant="primary" onClick={updateCourse}>
//                 Update Course
//               </Button>
//             </Form>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default CourseDetailList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// function CourseDetailList() {
//   const [courseDetails, setCourseDetails] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [updatedData, setUpdatedData] = useState({
//     courseCode: '',
//     courseTitle: '',
//   });
//   const [filteredCourseCode, setFilteredCourseCode] = useState('');

//   const baseUrl = 'http://localhost:8080/api/course-details';

//   useEffect(() => {
//     fetchCourseDetails();
//   }, [filteredCourseCode]);

//   const fetchCourseDetails = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllCourseDetails');
//       const sortedCourseDetails = response.data.sort((a, b) => a.courseTitle.localeCompare(b.courseTitle));
//       setCourseDetails(sortedCourseDetails);
//     } catch (error) {
//       console.error('Error fetching course details:', error);
//     }
//   };

//   const addCourse = async () => {
//     try {
//       const response = await axios.post(baseUrl + '/create', updatedData);
//       fetchCourseDetails(); // Refresh the course list
//       handleCloseCreateModal();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Course created successfully!',
//       });
//     } catch (error) {
//       console.error('Error creating course:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while creating the course.',
//       });
//     }
//   };

//   const updateCourse = async () => {
//     try {
//       const response = await axios.put(baseUrl + '/update/' + selectedCourse.id, updatedData);
//       fetchCourseDetails(); // Refresh the course list
//       handleCloseUpdateModal();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Course updated successfully!',
//       });
//     } catch (error) {
//       console.error('Error updating course:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the course.',
//       });
//     }
//   };

//   const deleteCourse = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/delete/' + id);
//       fetchCourseDetails(); // Refresh the course list

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Course deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting course:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the course.',
//       });
//     }
//   };

//   const handleShowCreateModal = () => {
//     setUpdatedData({
//       courseCode: '',
//       courseTitle: '',
//     });
//     setShowCreateModal(true);
//   };

//   const handleCloseCreateModal = () => {
//     setShowCreateModal(false);
//   };

//   const handleShowUpdateModal = (course) => {
//     setSelectedCourse(course);
//     setUpdatedData({
//       courseCode: course.courseCode,
//       courseTitle: course.courseTitle,
//     });
//     setShowUpdateModal(true);
//   };

//   const handleCloseUpdateModal = () => {
//     setSelectedCourse(null);
//     setShowUpdateModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };


// const handleFilterCourseCodeChange = (e) => {
//     setFilteredCourseCode(e.target.value);
//   };
  


//  return (
//     <div className="container-fluid col-sm-12">
//       <div className="card shadow mb-4 col-sm-12">
//         <div className="card-header py-3 d-flex justify-content-between col-sm-12">
//           <div className="mx-5 py-3 col-sm-3">
//             <h6 className="m-0 font-weight-bold text-primary">Course Details List Table</h6>
//           </div>
//           <div className="d-flex align-items-center">
//             <Button variant="success" onClick={handleShowCreateModal}>
//               Create Course
//             </Button>
//           </div>
//           <div className="mx-2 py-2 col-sm-4">
//             <Form.Group controlId="formCourseCodeFilter">
//               <Form.Control
//                 as="select"
//                 className="custom-select custom-select-lg"
//                 value={filteredCourseCode}
//                 onChange={(e) => setFilteredCourseCode(e.target.value)}
//               >
//                 <option value="">Filter by Course Code</option>
//                 {[...new Set(courseDetails.map((course) => course.courseCode))].map((courseCode) => (
//                   <option key={courseCode} value={courseCode}>
//                     {courseCode}
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
//                   <th>Course Code</th>
//                   <th>Course Title</th>
//                   <th colSpan={3}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courseDetails.map((course) => (
//                   <tr key={course.id}>
//                     <td>{course.id}</td>
//                     <td>{course.courseCode}</td>
//                     <td>{course.courseTitle}</td>
//                     <td>
//                       <button
//                         onClick={() => deleteCourse(course.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => handleShowUpdateModal(course)}
//                         className="btn btn-primary btn-sm mx-1"
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

//       {/* Create Course Modal */}
//       <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Course</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formCourseCode">
//               <Form.Label>Course Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter course code"
//                 name="courseCode"
//                 value={updatedData.courseCode}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formCourseTitle">
//               <Form.Label>Course Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter course title"
//                 name="courseTitle"
//                 value={updatedData.courseTitle}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={addCourse}>
//               Create Course
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Update Course Modal */}
//       <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Course</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formCourseCode">
//               <Form.Label>Course Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter course code"
//                 name="courseCode"
//                 value={updatedData.courseCode}
//                 onChange={handleInputChange}
//                 disabled
//               />
//             </Form.Group>

//             <Form.Group controlId="formCourseTitle">
//               <Form.Label>Course Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter course title"
//                 name="courseTitle"
//                 value={updatedData.courseTitle}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={updateCourse}>
//               Update Course
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default CourseDetailList;

  

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Modal, Button, Form } from 'react-bootstrap';

// function CourseDetailList() {
//   const [courseDetails, setCourseDetails] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [filteredCourseCode, setFilteredCourseCode] = useState('');

//   const baseUrl = 'http://localhost:8080/api/course-details';

//   useEffect(() => {
//     fetchCourseDetails();
//   }, [filteredCourseCode]);

//   const fetchCourseDetails = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllCourseDetails');
//       const sortedCourseDetails = response.data.sort((a, b) => a.courseTitle.localeCompare(b.courseTitle));
//       setCourseDetails(sortedCourseDetails);
//     } catch (error) {
//       console.error('Error fetching course details:', error);
//     }
//   };

//   const addOrUpdateCourse = async () => {
//     try {
//       if (selectedCourse) {
//         // Update existing course
//         const response = await axios.put(baseUrl + '/update/' + selectedCourse.id, updatedData);
//         // Handle the response, e.g., show success notification
//       } else {
//         // Add new course
//         const response = await axios.post(baseUrl + '/create', updatedData);
//         // Handle the response, e.g., show success notification
//       }

//       fetchCourseDetails(); // Refresh the course list
//       handleCloseModal(); // Close the modal

//     } catch (error) {
//       console.error('Error adding/updating course:', error);
//     }
//   };

//   const deleteCourse = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/delete/' + id);
//       fetchCourseDetails(); // Refresh the course list
//       // Handle the response, e.g., show success notification
//     } catch (error) {
//       console.error('Error deleting course:', error);
//     }
//   };

//   const handleShowModal = (course) => {
//     setSelectedCourse(course);
//     setUpdatedData({
//       courseCode: course.courseCode,
//       courseTitle: course.courseTitle,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedCourse(null);
//     setUpdatedData({});
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   return (
//     <div className="container-fluid col-sm-12">
//       <div className="card shadow mb-4 col-sm-12">
//         <div className="card-header py-3 d-flex justify-content-between col-sm-12">
//           <div className="mx-5 py-3 col-sm-3">
//             <h6 className="m-0 font-weight-bold text-primary">Course Details List Table</h6>
//           </div>
//           <div className="d-flex align-items-center">
//             <Button variant="success" onClick={() => handleShowModal(null)}>
//               Create Course
//             </Button>
//           </div>
//           <div className="mx-2 py-2 col-sm-4">
//             <Form.Group controlId="formCourseCodeFilter">
//               <Form.Control
//                 type="text"
//                 className="custom custom-form-control"
//                 placeholder="Filter by Course Code"
//                 value={filteredCourseCode}
//                 onChange={(e) => setFilteredCourseCode(e.target.value)}
//               />
//             </Form.Group>
//           </div>
//         </div>
//         <div className="card-body col-sm-12">
//           <div className="table-responsive col-sm-12">
//             <table className="table table-bordered col-sm-12" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Course Code</th>
//                   <th>Course Title</th>
//                   <th colSpan={2}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courseDetails.map((course) => (
//                   <tr key={course.id}>
//                     <td>{course.id}</td>
//                     <td>{course.courseCode}</td>
//                     <td>{course.courseTitle}</td>
//                     <td colSpan={2}>
//                       <button
//                         onClick={() => deleteCourse(course.id)}
//                         className="btn btn-danger btn-sm mx-1 btn-xl"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowModal(course)}
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
//           <Modal.Title>{selectedCourse ? 'Update Course' : 'Add Course'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formCourseCode">
//               <Form.Label>Course Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter course code"
//                 name="courseCode"
//                 value={updatedData.courseCode}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formCourseTitle">
//               <Form.Label>Course Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter course title"
//                 name="courseTitle"
//                 value={updatedData.courseTitle}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={addOrUpdateCourse}>
//               {selectedCourse ? 'Update Course' : 'Add Course'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default CourseDetailList;
