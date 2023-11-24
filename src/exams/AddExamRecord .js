// import React, { useState } from 'react';

// const AddExamRecord = () => {
//   const [studentData, setStudentData] = useState({
//     studentId: '',
//     registerNumber: '',
//     schoolLevel: '',
//     schoolSession: '',
//     year: '',
//     courses: [],
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({ ...studentData, [name]: value });
//   };

//   const handleCourseChange = (index, field, value) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses[index][field] = value;
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const addCourse = () => {
//     setStudentData({
//       ...studentData,
//       courses: [...studentData.courses, { courseCode: '', courseTitle: '', status: '', grade: '', score: 0 }],
//     });
//   };

//   const removeCourse = (index) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses.splice(index, 1);
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const handleSubmit = () => {
//     // Add your logic to submit the data to the server
//     console.log('Student Data:', studentData);
//   };
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const AddExamRecord = () => {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    studentId: '',
    registerNumber: '',
    schoolLevel: '',
    schoolSession: '',
    year: '',
    courses: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...studentData.courses];
    updatedCourses[index][field] = value;
    setStudentData({ ...studentData, courses: updatedCourses });
  };

  const addCourse = () => {
    setStudentData({
      ...studentData,
      courses: [...studentData.courses, { courseCode: '', courseTitle: '', status: '', grade: '', score: 0 }],
    });
  };

  const removeCourse = (index) => {
    const updatedCourses = [...studentData.courses];
    updatedCourses.splice(index, 1);
    setStudentData({ ...studentData, courses: updatedCourses });
  };

  // const handleSubmit = async () => {
  //   try {
  //     // Send POST request to the Spring Boot API
  //     const response = await axios.post('http://localhost:8080/api/student-exam-records/create', studentData);
      
  //     // Show success message using Swal
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Success',
  //       text: 'Student Exam Record added successfully!',
  //     }).then(() => {
  //       // Redirect to the fees page after success
  //       navigate('/fees');
  //     });
  //   } catch (error) {
  //     console.error('API Error:', error);

  //     // Show error message using Swal
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'An error occurred while adding the student exam record.',
  //     });
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZGR5IiwiaWF0IjoxNzAwODQ3MzcwLCJleHAiOjE3MDA4NDkxNzB9.DyFYh8TGM-TrMR6KeMIZO7btSJE2IA3De_Nwd7OUxr4',
        'Access-Control-Allow-Origin': '*', // Change this to your actual frontend domain in production
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      };
  
      const response = await axios.post('http://localhost:8080/api/student-exam-records/create', studentData, { headers });
      console.log(response);
      // Show success message using Swal
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Student Exam Record added successfully!',
      }).then(() => {
        // Redirect to the fees page after success
        navigate('/fees');
      });
    } catch (error) {
      console.error('API Error:', error);
  
      // Show error message using Swal
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the student exam record.',
      });
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Relax!! Add Student Exam Record.... With A Smile </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Student ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="studentId"
                  value={studentData.studentId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Register Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="registerNumber"
                  value={studentData.registerNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">School Level:</label>
                <select
                  className="custom-select custom-select-lg mb-3"
                  name="schoolLevel"
                  value={studentData.schoolLevel}
                  onChange={handleInputChange}
                >
                  <option selected>Open and select school Level</option>
                  <option value="nursery">Nursery</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">School Session:</label>
                <select
                  className="custom-select custom-select-lg mb-3"
                  name="schoolSession"
                  value={studentData.schoolSession}
                  onChange={handleInputChange}
                >
                  <option selected>Open and select school Session</option>
                  <option value="first">First Term</option>
                  <option value="second">Second Term</option>
                  <option value="third">Third Term</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Year:</label>
                <input
                  type="text"
                  className="form-control"
                  name="year"
                  value={studentData.year}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <h3>Courses:</h3>
              <div className="row">
                {studentData.courses.map((course, index) => (
                  <div key={index} className="col-md-3 mb-3">
                    <label className="form-label">Subject Code:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={course.courseCode}
                      onChange={(e) => handleCourseChange(index, 'courseCode', e.target.value)}
                    />
                    <label className="form-label">Subject Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={course.courseTitle}
                      onChange={(e) => handleCourseChange(index, 'courseTitle', e.target.value)}
                    />
                    <label className="form-label">Subject Remark:  (ie good, excellent, etc)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={course.status}
                      onChange={(e) => handleCourseChange(index, 'status', e.target.value)}
                    />
                    <label className="form-label">Grade:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={course.grade}
                      onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                    />
                    <label className="form-label">Score:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={course.score}
                      onChange={(e) => handleCourseChange(index, 'score', parseInt(e.target.value))}
                    />
                    <button
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={() => removeCourse(index)}
                    >
                      Remove Course
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-success mt-3" onClick={addCourse}>
                Add Course
              </button>
            </div>

            {/* <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Teachers remark:</span>
                </div>
                <textarea class="form-control" aria-label="With textarea"></textarea>
                </div> */}
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExamRecord;


// import React, { useState } from 'react';

// const AddExamRecord = () => {
//   const [studentData, setStudentData] = useState({
//     studentId: '',
//     registerNumber: '',
//     schoolLevel: 'primary',
//     schoolSession: 'first',
//     year: '',
//     courses: [],
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({ ...studentData, [name]: value });
//   };

//   const handleCourseChange = (index, field, value) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses[index][field] = value;
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const addCourse = () => {
//     setStudentData({
//       ...studentData,
//       courses: [...studentData.courses, { courseCode: '', courseTitle: '', status: '', grade: '', score: 0 }],
//     });
//   };

//   const removeCourse = (index) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses.splice(index, 1);
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const handleSubmit = () => {
//     // Add your logic to submit the data to the server
//     console.log('Student Data:', studentData);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Add Exam Record</h2>
//         </div>
//         <div className="card-body">
//           <form>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label className="form-label">Student ID:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="studentId"
//                   value={studentData.studentId}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Register Number:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="registerNumber"
//                   value={studentData.registerNumber}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label className="form-label">School Level:</label>
//                 <select
//                   className="form-select"
//                   name="schoolLevel"
//                   value={studentData.schoolLevel}
//                   onChange={handleInputChange}
//                 >
//                   <option value="nursery">Nursery</option>
//                   <option value="primary">Primary</option>
//                   <option value="secondary">Secondary</option>
//                 </select>
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">School Session:</label>
//                 <select
//                   className="form-select"
//                   name="schoolSession"
//                   value={studentData.schoolSession}
//                   onChange={handleInputChange}
//                 >
//                   <option value="first">First Term</option>
//                   <option value="second">Second Term</option>
//                   <option value="third">Third Term</option>
//                 </select>
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label className="form-label">Year:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="year"
//                   value={studentData.year}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="mb-3">
//               <h3>Courses:</h3>
//               {studentData.courses.map((course, index) => (
//                 <div key={index} className="mb-3">
//                   <label className="form-label">Course Code:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={course.courseCode}
//                     onChange={(e) => handleCourseChange(index, 'courseCode', e.target.value)}
//                   />
//                   <label className="form-label">Course Title:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={course.courseTitle}
//                     onChange={(e) => handleCourseChange(index, 'courseTitle', e.target.value)}
//                   />
//                   <label className="form-label">Status:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={course.status}
//                     onChange={(e) => handleCourseChange(index, 'status', e.target.value)}
//                   />
//                   <label className="form-label">Grade:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={course.grade}
//                     onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
//                   />
//                   <label className="form-label">Score:</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={course.score}
//                     onChange={(e) => handleCourseChange(index, 'score', parseInt(e.target.value))}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-danger mt-2"
//                     onClick={() => removeCourse(index)}
//                   >
//                     Remove Course
//                   </button>
//                 </div>
//               ))}
//               <button type="button" className="btn btn-primary" onClick={addCourse}>
//                 Add Course
//               </button>
//             </div>
//             <button type="button" className="btn btn-success" onClick={handleSubmit}>
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExamRecord;

// import React, { useState } from 'react';

// const AddExamRecord = () => {
//   const [studentData, setStudentData] = useState({
//     studentId: '',
//     registerNumber: '',
//     schoolLevel: 'primary',
//     schoolSession: 'first',
//     year: '',
//     courses: [],
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({ ...studentData, [name]: value });
//   };

//   const handleCourseChange = (index, field, value) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses[index][field] = value;
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const addCourse = () => {
//     setStudentData({
//       ...studentData,
//       courses: [...studentData.courses, { courseCode: '', courseTitle: '', status: '', grade: '', score: 0 }],
//     });
//   };

//   const removeCourse = (index) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses.splice(index, 1);
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const handleSubmit = () => {
//     // Add your logic to submit the data to the server
//     console.log('Student Data:', studentData);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Add Exam Record</h2>
//         </div>
//         <div className="card-body">
//           <form>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label className="form-label">Student ID:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="studentId"
//                   value={studentData.studentId}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Register Number:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="registerNumber"
//                   value={studentData.registerNumber}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label className="form-label">School Level:</label>
//                 <select
//                   className="form-select"
//                   name="schoolLevel"
//                   value={studentData.schoolLevel}
//                   onChange={handleInputChange}
//                 >
//                   <option value="nursery">Nursery</option>
//                   <option value="primary">Primary</option>
//                   <option value="secondary">Secondary</option>
//                 </select>
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">School Session:</label>
//                 <select
//                   className="form-select"
//                   name="schoolSession"
//                   value={studentData.schoolSession}
//                   onChange={handleInputChange}
//                 >
//                   <option value="first">First Term</option>
//                   <option value="second">Second Term</option>
//                   <option value="third">Third Term</option>
//                 </select>
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label className="form-label">Year:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="year"
//                   value={studentData.year}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="mb-3">
//               <h3>Courses:</h3>
//               {studentData.courses.map((course, index) => (
//                 <div key={index} className="mb-3">
//                   <label className="form-label">Course Code:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={course.courseCode}
//                     onChange={(e) => handleCourseChange(index, 'courseCode', e.target.value)}
//                   />
//                   <label className="form-label">Course Title:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={course.courseTitle}
//                     onChange={(e) => handleCourseChange(index, 'courseTitle', e.target.value)}
//                   />
//                   <label className="form-label">Status:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={course.status}
//                     onChange={(e) => handleCourseChange(index, 'status', e.target.value)}
//                   />
//                   <label className="form-label">Grade:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={course.grade}
//                     onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
//                   />
//                   <label className="form-label">Score:</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={course.score}
//                     onChange={(e) => handleCourseChange(index, 'score', parseInt(e.target.value))}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-danger mt-2"
//                     onClick={() => removeCourse(index)}
//                   >
//                     Remove Course
//                   </button>
//                 </div>
//               ))}
//               <button type="button" className="btn btn-primary" onClick={addCourse}>
//                 Add Course
//               </button>
//             </div>
//             <button type="button" className="btn btn-success" onClick={handleSubmit}>
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExamRecord;


// import React, { useState } from 'react';

// const AddExamRecord = () => {
//   const [studentData, setStudentData] = useState({
//     studentId: '',
//     registerNumber: '',
//     schoolLevel: 'primary',
//     schoolSession: 'first',
//     year: '',
//     courses: [],
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({ ...studentData, [name]: value });
//   };

//   const handleCourseChange = (index, field, value) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses[index][field] = value;
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const addCourse = () => {
//     setStudentData({
//       ...studentData,
//       courses: [...studentData.courses, { courseCode: '', courseTitle: '', status: '', grade: '', score: 0 }],
//     });
//   };

//   const removeCourse = (index) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses.splice(index, 1);
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const handleSubmit = () => {
//     // Add your logic to submit the data to the server
//     console.log('Student Data:', studentData);
//   };

//   return (
//     <div className="container">
//     <div className="row justify-content-center mt-5">
//       <h2 className="mb-4">Add Exam Record</h2>
//       <form>
//         <div className="mb-3">
//           <label className="form-label">Student ID:</label>
//           <input type="text" className="form-control" name="studentId" value={studentData.studentId} onChange={handleInputChange} />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Register Number:</label>
//           <input type="text" className="form-control" name="registerNumber" value={studentData.registerNumber} onChange={handleInputChange} />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">School Level:</label>
//           <select className="form-select" name="schoolLevel" value={studentData.schoolLevel} onChange={handleInputChange}>
//             <option value="nursery">Nursery</option>
//             <option value="primary">Primary</option>
//             <option value="secondary">Secondary</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">School Session:</label>
//           <select className="form-select" name="schoolSession" value={studentData.schoolSession} onChange={handleInputChange}>
//             <option value="first">First Term</option>
//             <option value="second">Second Term</option>
//             <option value="third">Third Term</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Year:</label>
//           <input type="text" className="form-control" name="year" value={studentData.year} onChange={handleInputChange} />
//         </div>
//         <div className="mb-3">
//           <h3>Courses:</h3>
//           {studentData.courses.map((course, index) => (
//             <div key={index}>
//               <label className="form-label">Course Code:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={course.courseCode}
//                 onChange={(e) => handleCourseChange(index, 'courseCode', e.target.value)}
//               />
//               <label className="form-label">Course Title:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={course.courseTitle}
//                 onChange={(e) => handleCourseChange(index, 'courseTitle', e.target.value)}
//               />
//               <label className="form-label">Status:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={course.status}
//                 onChange={(e) => handleCourseChange(index, 'status', e.target.value)}
//               />
//               <label className="form-label">Grade:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={course.grade}
//                 onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
//               />
//               <label className="form-label">Score:</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={course.score}
//                 onChange={(e) => handleCourseChange(index, 'score', parseInt(e.target.value))}
//               />
//               <button type="button" className="btn btn-danger" onClick={() => removeCourse(index)}>
//                 Remove Course
//               </button>
//             </div>
//           ))}
//           <button type="button" className="btn btn-primary" onClick={addCourse}>
//             Add Course
//           </button>
//         </div>
//         <button type="button" className="btn btn-success" onClick={handleSubmit}>
//           Submit
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default AddExamRecord;


// import React, { useState } from 'react';

// const AddExamRecord = () => {
//   const [studentData, setStudentData] = useState({
//     studentId: '',
//     registerNumber: '',
//     schoolLevel: 'primary',
//     schoolSession: 'first',
//     year: '',
//     courses: [],
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({ ...studentData, [name]: value });
//   };

//   const handleCourseChange = (index, field, value) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses[index][field] = value;
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const addCourse = () => {
//     setStudentData({
//       ...studentData,
//       courses: [...studentData.courses, { courseCode: '', courseTitle: '', status: '', grade: '', score: 0 }],
//     });
//   };

//   const removeCourse = (index) => {
//     const updatedCourses = [...studentData.courses];
//     updatedCourses.splice(index, 1);
//     setStudentData({ ...studentData, courses: updatedCourses });
//   };

//   const handleSubmit = () => {
//     // Add your logic to submit the data to the server
//     console.log('Student Data:', studentData);
//   };

//   return (
//     <div>
//       <h2>Add Exam Record</h2>
//       <form>
//         <div>
//           <label>Student ID:</label>
//           <input type="text" name="studentId" value={studentData.studentId} onChange={handleInputChange} />
//         </div>
//         <div>
//           <label>Register Number:</label>
//           <input type="text" name="registerNumber" value={studentData.registerNumber} onChange={handleInputChange} />
//         </div>
//         <div>
//           <label>School Level:</label>
//           <select name="schoolLevel" value={studentData.schoolLevel} onChange={handleInputChange}>
//             <option value="nursery">Nursery</option>
//             <option value="primary">Primary</option>
//             <option value="secondary">Secondary</option>
//           </select>
//         </div>
//         <div>
//           <label>School Session:</label>
//           <select name="schoolSession" value={studentData.schoolSession} onChange={handleInputChange}>
//             <option value="first">First Term</option>
//             <option value="second">Second Term</option>
//             <option value="third">Third Term</option>
//           </select>
//         </div>
//         <div>
//           <label>Year:</label>
//           <input type="text" name="year" value={studentData.year} onChange={handleInputChange} />
//         </div>
//         <div>
//           <h3>Courses:</h3>
//           {studentData.courses.map((course, index) => (
//             <div key={index}>
//               <label>Course Code:</label>
//               <input
//                 type="text"
//                 value={course.courseCode}
//                 onChange={(e) => handleCourseChange(index, 'courseCode', e.target.value)}
//               />
//               <label>Course Title:</label>
//               <input
//                 type="text"
//                 value={course.courseTitle}
//                 onChange={(e) => handleCourseChange(index, 'courseTitle', e.target.value)}
//               />
//               <label>Status:</label>
//               <input
//                 type="text"
//                 value={course.status}
//                 onChange={(e) => handleCourseChange(index, 'status', e.target.value)}
//               />
//               <label>Grade:</label>
//               <input
//                 type="text"
//                 value={course.grade}
//                 onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
//               />
//               <label>Score:</label>
//               <input
//                 type="number"
//                 value={course.score}
//                 onChange={(e) => handleCourseChange(index, 'score', parseInt(e.target.value))}
//               />
//               <button type="button" onClick={() => removeCourse(index)}>
//                 Remove Course
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={addCourse}>
//             Add Course
//           </button>
//         </div>
//         <button type="button" onClick={handleSubmit}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddExamRecord;
