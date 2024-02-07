
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ExamRecordList() {
  const [examRecords, setExamRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [filteredCourseTitle, setFilteredCourseTitle] = useState('');
  const [filteredClassLevel, setFilteredClassLevel] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [terms, setTerms] = useState([]); 

  const baseUrl = 'http://localhost:8080/api/exam-records';
  // const studentNameUrl = 'http://localhost:8080/api/students';
  


  useEffect(() => {
    fetchExamRecords();
  }, [filteredCourseTitle, filteredName, filteredClassLevel]);

  const fetchExamRecords = async () => {
    try {
      const response = await axios.get(baseUrl + '/viewAllExam');
      const sortedRecords = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setExamRecords(sortedRecords);
      setTerms([...new Set(sortedRecords.map((record) => record.terms))]);
    } catch (error) {
      console.error('Error fetching exam records:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while fetching exam records.',
      });
    }
  };

  // ... (other functions remain the same)

  const handleFilterCourseTitleChange = (e) => {
    setFilteredCourseTitle(e.target.value);
    setFilteredName('');
  };

  const handleFilteredClassLevelChange = (e) => {
     setFilteredClassLevel(e.target.value);
     setFilteredCourseTitle('');
     setFilteredName('');
  };

  const handleFilterNameChange = (e) => {
    setFilteredName(e.target.value);
    setFilteredCourseTitle('');
  };

  const filteredRecords = examRecords.filter(
    (record) =>
      (!filteredCourseTitle || record.courseTitle === filteredCourseTitle) &&
      (!filteredClassLevel || record.level === filteredClassLevel) &&
      (!filteredName || record.name.toLowerCase().includes(filteredName.toLowerCase()))
  );

  const groupedRecords = terms.map((term) => ({
    term,
    records: filteredRecords.filter((record) => record.terms === term),
  }));


  const deleteExamRecord = async (id) => {
    try {
      await axios.delete(baseUrl + '/deleteExam/' + id);
      setExamRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Exam record deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting exam record:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the exam record.',
      });
    }
  };

  const calculateGrade = (score) => {
    if (score >= 75) {
      return 'A';
    } else if (score >= 60) {
      return 'B';
    } else if (score >= 50) {
      return 'C';
    } else if (score >= 40) {
      return 'D';
    } else {
      return 'F';
    }
  };

  const calculateRemark = (grade) => {
    switch (grade) {
      case 'A':
        return 'Excellent';
      case 'B':
        return 'Very Good';
      case 'C':
        return 'Good';
      case 'D':
        return 'Pass';
      case 'F':
        return 'Fail';
      default:
        return '';
    }
  };

  const updateExamRecord = async () => {
    try {
      const updatedGrade = calculateGrade(updatedData.score);
      const updatedRemark = calculateRemark(updatedGrade);

      const updatedDataWithGradeRemark = {
        ...updatedData,
        grade: updatedGrade,
        remark: updatedRemark,
      };

      const response = await axios.put(
        baseUrl + '/updateExam/' + selectedRecord.id,
        updatedDataWithGradeRemark
      );

      if (response.status === 200) {
        const updatedRecord = response.data;
        setExamRecords((prevRecords) =>
          prevRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))
        );

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Exam record updated successfully!',
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
      console.error('Error updating exam record:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the exam record.',
      });
    }
  };

  const handleShowModal = (record) => {
    setSelectedRecord(record);
    setUpdatedData({
      name: record.name,
      level: record.level,
      courseTitle: record.courseTitle,
      score: record.score,
      grade: record.grade,
      remark: record.remark,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRecord(null);
    setUpdatedData({});
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };



function calculateStudentAverages(data) {
    const studentAverages = {};
  
    data.forEach((record) => {
      const { name, score } = record;
  
      if (!studentAverages[name]) {
        studentAverages[name] = {
          totalScore: 0,
          count: 0,
        };
      }
  
      if (!isNaN(parseFloat(score))) {
        studentAverages[name].totalScore += parseFloat(score);
        studentAverages[name].count += 1;
      }
    });
  
    const averages = {};
    for (const studentName in studentAverages) {
      const { totalScore, count } = studentAverages[studentName];
      const average = count > 0 ? totalScore / count : 0;
      averages[studentName] = average.toFixed(2);
    }
  
    return averages;
  }
  
  const studentAverages = calculateStudentAverages(examRecords);
  console.log(studentAverages);



  return (
    <div className="container-fluid col-sm-12">
      <div className="card shadow mb-4 col-sm-12">
            <h2 className="m-0 font-weight-bold text-primary text-center">Exam Records List Table</h2>
          <div className="mx-5 py-3 col-sm-3">
          <Link to="/add-exam-record" className="btn btn-outline-danger bg-primary text-white btn-lg">Add Exam Record</Link>
          </div>
        <div className="card-header py-3 d-flex justify-content-between col-sm-12">
          <div className="mx-2 py-2 col-sm-3">
            <Form.Group controlId="formCourseTitleFilter">
              <Form.Control
                as="select"
                className="custom-select custom-select-lg"
                value={filteredCourseTitle}
                onChange={handleFilterCourseTitleChange}
              >
                <option value="">Filter by Course Title</option>
                {[...new Set(filteredRecords.map((record) => record.courseTitle))].map(
                  (courseTitle) => (
                    <option key={courseTitle} value={courseTitle}>
                      {courseTitle}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="mx-2 py-2 col-sm-3">
          
            <Form.Group controlId="formCourseTitleFilter">
              <Form.Control
                as="select"
                className="custom-select custom-select-lg"
                value={filteredClassLevel}
                onChange={handleFilteredClassLevelChange}
              >
                <option value="">Filter by Class Level</option>
                {[...new Set(filteredRecords.map((record) => record.level))].map(
                  (level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="mx-2 py-2 col-sm-4">
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
        </div>

<div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing={0}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Class Level</th>
                  <th>Course Title</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Terms</th>
                  <th>Remark</th>
                  <th>Action</th>
                  <th>Average Score</th>
                </tr>
              </thead>
              <tbody>
                {groupedRecords.map((group, termIndex) => (
                  <React.Fragment key={group.term}>
                    <tr className="text-center font-weight-bold">
                      <th colSpan={9}>
                        <h2>{group.term.toUpperCase()} TERM'S RESULTS</h2>
                      </th>
                    </tr>
                    {group.records.map((record) => (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>
                          {/* {record.name} */}
                          <Link to={`/view-exam-record/${record.id}`}>{record.name}</Link>

                          </td>
                        <td>{record.level}</td>
                        <td>{record.courseTitle}</td>
                        <td>{record.score}</td>
                        <td>{record.grade}</td>
                        <td>{record.terms}</td>
                        <td>{record.remark}</td>
                        <td>
                          <button
                            onClick={() => deleteExamRecord(record.id)}
                            className="btn btn-danger btn-sm mx-1"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleShowModal(record)}
                            className="btn btn-primary btn-sm mx-1"
                          >
                            Update
                          </button>
                        </td>
                        <td>{studentAverages[record.name]}</td>
                        {/* {recordIndex === 0 && (
                        <td rowSpan={group.records.length}>{studentAverages[record.name]}</td>
                      )} */}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Exam Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={updatedData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter class level"
                name="level"
                value={updatedData.level}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCourseTitle">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course title"
                name="courseTitle"
                value={updatedData.courseTitle}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formScore">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter score"
                name="score"
                value={updatedData.score}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter grade"
                name="grade"
                value={updatedData.grade}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formRemark">
              <Form.Label>Remark</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter remark"
                name="remark"
                value={updatedData.remark}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={updateExamRecord}>
              Update Record
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ExamRecordList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// function ExamRecordList() {
//   const [examRecords, setExamRecords] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [filteredCourseTitle, setFilteredCourseTitle] = useState('');
//   const [filteredName, setFilteredName] = useState('');

//   const baseUrl = 'http://localhost:8080/api/exam-records';

//   useEffect(() => {
//     fetchExamRecords();
//   }, [filteredCourseTitle, filteredName]);

//   const fetchExamRecords = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllExam');
//       const sortedRecords = response.data.sort((a, b) => a.name.localeCompare(b.name));
//       setExamRecords(sortedRecords);
//     } catch (error) {
//       console.error('Error fetching exam records:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching exam records.',
//       });
//     }
//   };

//   const deleteExamRecord = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/deleteExam/' + id);
//       setExamRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Exam record deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the exam record.',
//       });
//     }
//   };

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

//   const updateExamRecord = async () => {
//     try {
//       const updatedGrade = calculateGrade(updatedData.score);
//       const updatedRemark = calculateRemark(updatedGrade);

//       const updatedDataWithGradeRemark = {
//         ...updatedData,
//         grade: updatedGrade,
//         remark: updatedRemark,
//       };

//       const response = await axios.put(
//         baseUrl + '/updateExam/' + selectedRecord.id,
//         updatedDataWithGradeRemark
//       );

//       if (response.status === 200) {
//         const updatedRecord = response.data;
//         setExamRecords((prevRecords) =>
//           prevRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))
//         );

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Exam record updated successfully!',
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
//       console.error('Error updating exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the exam record.',
//       });
//     }
//   };

//   const handleShowModal = (record) => {
//     setSelectedRecord(record);
//     setUpdatedData({
//       name: record.name,
//       courseTitle: record.courseTitle,
//       score: record.score,
//       grade: record.grade,
//       remark: record.remark,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedRecord(null);
//     setUpdatedData({});
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFilterCourseTitleChange = (e) => {
//     setFilteredCourseTitle(e.target.value);
//     setFilteredName('');
//   };

//   const handleFilterNameChange = (e) => {
//     setFilteredName(e.target.value);
//     setFilteredCourseTitle('');
//   };


// const calculateStudentAverages = () => {

// };




//   const studentAverages = calculateStudentAverages();

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Exam Records List Table</h6>
//           </div>
//           <div className="mx-5 py-3 col-sm-4">
//             <Form.Group controlId="formCourseTitleFilter">
//               <Form.Control
//                 as="select"
//                 className="custom-select custom-select-lg"
//                 value={filteredCourseTitle}
//                 onChange={handleFilterCourseTitleChange}
//               >
//                 <option value="">Filter by Course Title</option>
//                 {[...new Set(examRecords.map((record) => record.courseTitle))].map((courseTitle) => (
//                   <option key={courseTitle} value={courseTitle}>
//                     {courseTitle}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </div>
//           <div className="mx-5 py-3 col-sm-4">
//             <Form.Group controlId="formNameFilter">
//               <Form.Control
//                 type="text"
//                 className="custom-form-control"
//                 placeholder="Filter by Name"
//                 value={filteredName}
//                 onChange={handleFilterNameChange}
//               />
//             </Form.Group>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Course Title</th>
//                   <th>Score</th>
//                   <th>Grade</th>
//                   <th>Remark</th>
//                   <th>Action</th>
//                   <th>Average Score</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {examRecords.map((record) => (
//                   <tr key={record.id}>
//                     <td>{record.id}</td>
//                     <td>{record.name}</td>
//                     <td>{record.courseTitle}</td>
//                     <td>{record.score}</td>
//                     <td>{record.grade}</td>
//                     <td>{record.remark}</td>
//                     <td>
//                       <button
//                         onClick={() => deleteExamRecord(record.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowModal(record)}
//                         className="btn btn-primary btn-sm mx-1"
//                       >
//                         Update
//                       </button>
//                     </td>
//                     <td>{studentAverages[record.name]}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Exam Record</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 value={updatedData.name}
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

//             <Form.Group controlId="formScore">
//               <Form.Label>Score</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter score"
//                 name="score"
//                 value={updatedData.score}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formGrade">
//               <Form.Label>Grade</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter grade"
//                 name="grade"
//                 value={updatedData.grade}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formRemark">
//               <Form.Label>Remark</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter remark"
//                 name="remark"
//                 value={updatedData.remark}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={updateExamRecord}>
//               Update Record
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default ExamRecordList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// // ... (other imports)

// function ExamRecordList() {
//   const [examRecords, setExamRecords] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [filteredCourseTitle, setFilteredCourseTitle] = useState(''); // State for filtering by courseTitle
//   const [filteredName, setFilteredName] = useState(''); // State for filtering by name

//   const baseUrl = 'http://localhost:8080/api/exam-records';

//   useEffect(() => {
//     fetchExamRecords();
//   }, [filteredCourseTitle, filteredName]);

//   const fetchExamRecords = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllExam');
//       const sortedRecords = response.data.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
//       setExamRecords(sortedRecords);
//     } catch (error) {
//       console.error('Error fetching exam records:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching exam records.',
//       });
//     }
//   };

//   const deleteExamRecord = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/deleteExam/' + id);
//       setExamRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Exam record deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the exam record.',
//       });
//     }
//   };

//     // Function to calculate grade based on score
//     const calculateGrade = (score) => {
//       // Implement your grade calculation logic here
//       // Example logic (modify as needed):
//       if (score >= 75) {
//         return 'A';
//       } else if (score >= 60) {
//         return 'B';
//       } else if (score >= 50) {
//         return 'C';
//       } else if (score >= 40) {
//         return 'D';
//       } else {
//         return 'F';
//       }
//     };
  
//     // Function to calculate remark based on grade
//     const calculateRemark = (grade) => {
//       // Implement your remark calculation logic here
//       // Example logic (modify as needed):
//       switch (grade) {
//         case 'A':
//           return 'Excellent';
//         case 'B':
//           return 'Very Good';
//         case 'C':
//           return 'Good';
//         case 'D':
//           return 'Pass';
//         case 'F':
//           return 'Fail';
//         default:
//           return '';
//       }
//     };

//   const updateExamRecord = async () => {
//     try {
//       const updatedGrade = calculateGrade(updatedData.score);
//       const updatedRemark = calculateRemark(updatedGrade);

//       const updatedDataWithGradeRemark = {
//         ...updatedData,
//         grade: updatedGrade,
//         remark: updatedRemark,
//       };

//       const response = await axios.put(
//         baseUrl + '/updateExam/' + selectedRecord.id,
//         updatedDataWithGradeRemark
//       );

//       if (response.status === 200) {
//         const updatedRecord = response.data;
//         setExamRecords((prevRecords) =>
//           prevRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))
//         );

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Exam record updated successfully!',
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
//       console.error('Error updating exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the exam record.',
//       });
//     }
//   };

//   const handleShowModal = (record) => {
//     setSelectedRecord(record);
//     setUpdatedData({
//       name: record.name,
//       courseTitle: record.courseTitle,
//       score: record.score,
//       grade: record.grade,
//       remark: record.remark,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedRecord(null);
//     setUpdatedData({});
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFilterCourseTitleChange = (e) => {
//     setFilteredCourseTitle(e.target.value);
//     setFilteredName(''); // Clear the name filter when changing courseTitle filter
//   };

//   const handleFilterNameChange = (e) => {
//     setFilteredName(e.target.value);
//     setFilteredCourseTitle(''); // Clear the courseTitle filter when changing name filter
//   };

//   const filteredExamRecords = examRecords
//     .filter(
//       (record) =>
//         record.courseTitle.toLowerCase().includes(filteredCourseTitle.toLowerCase()) ||
//         filteredCourseTitle === ''
//     )
//     .filter(
//       (record) =>
//         record.name.toLowerCase().includes(filteredName.toLowerCase()) ||
//         filteredName === ''
//     );

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Exam Records List Table</h6>
//           </div>
//           <div className="mx-5 py-3 col-sm-4">
//             <Form.Group controlId="formCourseTitleFilter">
//               <Form.Control
//                 as="select"
//                 className="custom-select custom-select-lg"
//                 value={filteredCourseTitle}
//                 onChange={handleFilterCourseTitleChange}
//               >
//                 <option value="">Filter by Course Title</option>
//                 {[...new Set(examRecords.map((record) => record.courseTitle))].map((courseTitle) => (
//                   <option key={courseTitle} value={courseTitle}>
//                     {courseTitle}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </div>
//           <div className="mx-5 py-3 col-sm-4">
//             <Form.Group controlId="formNameFilter">
//               <Form.Control
//                 type="text"
//                 className='custom-form-control'
//                 placeholder="Filter by Name"
//                 value={filteredName}
//                 onChange={handleFilterNameChange}
//               />
//             </Form.Group>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             {/* <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}> */}
//             <table className="table table-bordered" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Course Title</th>
//                   <th>Score</th>
//                   <th>Grade</th>
//                   <th>Remark</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredExamRecords.map((record) => (
//                   <tr key={record.id}>
//                     <td>{record.id}</td>
//                     <td>{record.name}</td>
//                     <td>{record.courseTitle}</td>
//                     <td>{record.score}</td>
//                     <td>{record.grade}</td>
//                     <td>{record.remark}</td>
//                     <td>
//                       <button
//                         onClick={() => deleteExamRecord(record.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowModal(record)}
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

//       {/* Modal for updating records */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Exam Record</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 value={updatedData.name}
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

//             <Form.Group controlId="formScore">
//               <Form.Label>Score</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter score"
//                 name="score"
//                 value={updatedData.score}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formGrade">
//               <Form.Label>Grade</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter grade"
//                 name="grade"
//                 value={updatedData.grade}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formRemark">
//               <Form.Label>Remark</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter remark"
//                 name="remark"
//                 value={updatedData.remark}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={updateExamRecord}>
//               Update Record
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default ExamRecordList;


// function ExamRecordList() {
//   const [examRecords, setExamRecords] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
  
//   const [filteredCourseTitle, setFilteredCourseTitle] = useState(''); // State for filtering by courseTitle
//   const [filteredName, setFilteredName] = useState(''); // State for filtering by courseTitle

//   const baseUrl = 'http://localhost:8080/api/exam-records';

//   useEffect(() => {
//     fetchExamRecords();
//   }, []);

//   const fetchExamRecords = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllExam');
//       const sortedRecords = response.data.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
//       setExamRecords(sortedRecords);
//     } catch (error) {
//       console.error('Error fetching exam records:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching exam records.',
//       });
//     }
//   };

//   const deleteExamRecord = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/deleteExam/' + id);
//       setExamRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Exam record deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the exam record.',
//       });
//     }
//   };


  
  // // Function to calculate grade based on score
  // const calculateGrade = (score) => {
  //   // Implement your grade calculation logic here
  //   // Example logic (modify as needed):
  //   if (score >= 75) {
  //     return 'A';
  //   } else if (score >= 60) {
  //     return 'B';
  //   } else if (score >= 50) {
  //     return 'C';
  //   } else if (score >= 40) {
  //     return 'D';
  //   } else {
  //     return 'F';
  //   }
  // };

  // // Function to calculate remark based on grade
  // const calculateRemark = (grade) => {
  //   // Implement your remark calculation logic here
  //   // Example logic (modify as needed):
  //   switch (grade) {
  //     case 'A':
  //       return 'Excellent';
  //     case 'B':
  //       return 'Very Good';
  //     case 'C':
  //       return 'Good';
  //     case 'D':
  //       return 'Pass';
  //     case 'F':
  //       return 'Fail';
  //     default:
  //       return '';
  //   }
  // };

//   const updateExamRecord = async () => {
//     try {
//       const updatedGrade = calculateGrade(updatedData.score);
//       const updatedRemark = calculateRemark(updatedGrade);

//       const updatedDataWithGradeRemark = {
//         ...updatedData,
//         grade: updatedGrade,
//         remark: updatedRemark,
//       };

//       const response = await axios.put(
//         baseUrl + '/updateExam/' + selectedRecord.id,
//         updatedDataWithGradeRemark
//       );

//       if (response.status === 200) {
//         const updatedRecord = response.data;
//         setExamRecords((prevRecords) =>
//           prevRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))
//         );

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Exam record updated successfully!',
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
//       console.error('Error updating exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the exam record.',
//       });
//     }
//   };

//   const handleShowModal = (record) => {
//     setSelectedRecord(record);
//     setUpdatedData({
//       name: record.name,
//       courseTitle: record.courseTitle,
//       score: record.score,
//       grade: record.grade,
//       remark: record.remark,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedRecord(null);
//     setUpdatedData({});
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFilterChange = (e) => {
//     setFilteredCourseTitle(e.target.value);
//   };

//   const filteredExamRecords = examRecords.filter(
//     (record) =>
//       record.courseTitle.toLowerCase().includes(filteredCourseTitle.toLowerCase()) ||
//       filteredCourseTitle === ''
//   );

//   const filteredByName = examRecords.filter(
//     (record) =>
//       record.name.toLowerCase().includes(filteredName.toLowerCase()) ||
//       filteredName === ''
//   );

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Exam Records List Table</h6>
//           </div>
//           <div className="mx-5 py-3">
//             <Form.Group controlId="formCourseTitleFilter">
//               <Form.Control
//                 as="select"
//                 value={filteredCourseTitle}
//                 onChange={handleFilterChange}
//               >
//                 <option value="">Filter by Course Title</option>
//                 {/* Add options dynamically based on unique courseTitles in examRecords */}
//                 {[...new Set(examRecords.map((record) => record.courseTitle))].map((courseTitle) => (
//                   <option key={courseTitle} value={courseTitle}>
//                     {courseTitle}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Course Title</th>
//                   <th>Score</th>
//                   <th>Grade</th>
//                   <th>Remark</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredExamRecords.map((record) => (
//                   <tr key={record.id}>
//                     <td>{record.id}</td>
//                     <td>{record.name}</td>
//                     <td>{record.courseTitle}</td>
//                     <td>{record.score}</td>
//                     <td>{record.grade}</td>
//                     <td>{record.remark}</td>
//                     <td>
//                       <button
//                         onClick={() => deleteExamRecord(record.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowModal(record)}
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

//       {/* Modal for updating records */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Exam Record</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 value={updatedData.name}
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

//             <Form.Group controlId="formScore">
//               <Form.Label>Score</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter score"
//                 name="score"
//                 value={updatedData.score}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formGrade">
//               <Form.Label>Grade</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter grade"
//                 name="grade"
//                 value={updatedData.grade}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formRemark">
//               <Form.Label>Remark</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter remark"
//                 name="remark"
//                 value={updatedData.remark}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={updateExamRecord}>
//               Update Record
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default ExamRecordList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function ExamRecordList() {
//   const [examRecords, setExamRecords] = useState([]);
//   const baseUrl = 'http://localhost:8080/api/exam-records'; // Update with the correct API endpoint

//   useEffect(() => {
//     fetchExamRecords();
//   }, []);

//   const fetchExamRecords = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllExam');
//       setExamRecords(response.data);
//     } catch (error) {
//       console.error('Error fetching exam records:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching exam records.',
//       });
//     }
//   };

//   const deleteExamRecord = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/deleteExam/' + id);
//       setExamRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Exam record deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the exam record.',
//       });
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Exam Records List Table</h6>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Course Title</th>
//                   <th>Score</th>
//                   <th>Grade</th>
//                   <th>Remark</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {examRecords.map((record) => (
//                   <tr key={record.id}>
//                     <td>{record.id}</td>
//                     <td>{record.name}</td>
//                     <td>{record.courseTitle}</td>
//                     <td>{record.score}</td>
//                     <td>{record.grade}</td>
//                     <td>{record.remark}</td>
//                     <td>
//                       <button onClick={() => deleteExamRecord(record.id)} className="btn btn-danger btn-sm mx-1">
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExamRecordList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// function ExamRecordList() {
//   const [examRecords, setExamRecords] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [updatedData, setUpdatedData] = useState({}); // State to hold updated data

//   const baseUrl = 'http://localhost:8080/api/exam-records'; // Update with the correct API endpoint

//   useEffect(() => {
//     fetchExamRecords();
//   }, []);

//   const fetchExamRecords = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllExam');
//       setExamRecords(response.data);
//     } catch (error) {
//       console.error('Error fetching exam records:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching exam records.',
//       });
//     }
//   };

//   const deleteExamRecord = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/deleteExam/' + id);
//       setExamRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Exam record deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the exam record.',
//       });
//     }
//   };

//   const updateExamRecord = async () => {
//     try {
//       // Calculate grade and remark based on the updated score
//       const updatedGrade = calculateGrade(updatedData.score);
//       const updatedRemark = calculateRemark(updatedGrade);

//       // Update the grade and remark in the updatedData
//       const updatedDataWithGradeRemark = {
//         ...updatedData,
//         grade: updatedGrade,
//         remark: updatedRemark,
//       };

//       const response = await axios.put(
//         baseUrl + '/updateExam/' + selectedRecord.id,
//         updatedDataWithGradeRemark
//       );

//       if (response.status === 200) {
//         // Assuming the response contains the updated exam record
//         const updatedRecord = response.data;

//         setExamRecords((prevRecords) =>
//           prevRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))
//         );

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Exam record updated successfully!',
//         });

//         // Close the modal after updating
//         handleCloseModal();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Unexpected response status ' + response.status,
//         });
//       }
//     } catch (error) {
//       console.error('Error updating exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the exam record.',
//       });
//     }
//   };

//   // Other functions (handleShowModal, handleCloseModal, handleInputChange) remain the same

//   // Function to calculate grade based on score
//   const calculateGrade = (score) => {
//     // Implement your grade calculation logic here
//     // Example logic (modify as needed):
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
//     // Implement your remark calculation logic here
//     // Example logic (modify as needed):
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


// //   const updateExamRecord = async () => {
// //     try {
// //       const response = await axios.put(baseUrl + '/updateExam/' + selectedRecord.id, updatedData);

// //       if (response.status === 200) {
// //         // Assuming the response contains the updated exam record
// //         const updatedRecord = response.data;

// //         setExamRecords((prevRecords) =>
// //           prevRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))
// //         );

// //         Swal.fire({
// //           icon: 'success',
// //           title: 'Success',
// //           text: 'Exam record updated successfully!',
// //         });

// //         // Close the modal after updating
// //         handleCloseModal();
// //       } else {
// //         Swal.fire({
// //           icon: 'error',
// //           title: 'Error',
// //           text: 'Unexpected response status ' + response.status,
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error updating exam record:', error);

// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'An error occurred while updating the exam record.',
// //       });
// //     }
// //   };

//   const handleShowModal = (record) => {
//     setSelectedRecord(record);
//     setUpdatedData({
//       // Initialize updatedData with the current data of the selected record
//       name: record.name,
//       courseTitle: record.courseTitle,
//       score: record.score,
//       grade: record.grade,
//       remark: record.remark,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedRecord(null);
//     setUpdatedData({}); // Clear updatedData when closing the modal
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Exam Records List Table</h6>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Course Title</th>
//                   <th>Score</th>
//                   <th>Grade</th>
//                   <th>Remark</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {examRecords.map((record) => (
//                   <tr key={record.id}>
//                     <td>{record.id}</td>
//                     <td>{record.name}</td>
//                     <td>{record.courseTitle}</td>
//                     <td>{record.score}</td>
//                     <td>{record.grade}</td>
//                     <td>{record.remark}</td>
//                     <td>
//                       <button
//                         onClick={() => deleteExamRecord(record.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowModal(record)}
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

//       {/* Modal for updating records */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Exam Record</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 value={updatedData.name}
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

//             <Form.Group controlId="formScore">
//               <Form.Label>Score</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter score"
//                 name="score"
//                 value={updatedData.score}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formGrade">
//               <Form.Label>Grade</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter grade"
//                 name="grade"
//                 value={updatedData.grade}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formRemark">
//               <Form.Label>Remark</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter remark"
//                 name="remark"
//                 value={updatedData.remark}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={updateExamRecord}>
//               Update Record
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default ExamRecordList;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// function ExamRecordList() {
//   const [examRecords, setExamRecords] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [courseFilter, setCourseFilter] = useState(''); // State for courseTitle filter

//   const baseUrl = 'http://localhost:8080/api/exam-records';

//   useEffect(() => {
//     fetchExamRecords();
//   }, [courseFilter]);

//   const fetchExamRecords = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllExam');
//       const filteredRecords = courseFilter
//         ? response.data.filter((record) => record.courseTitle === courseFilter)
//         : response.data;
//       setExamRecords(filteredRecords);
//     } catch (error) {
//       console.error('Error fetching exam records:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching exam records.',
//       });
//     }
//   };

//   const deleteExamRecord = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/deleteExam/' + id);
//       setExamRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Exam record deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting exam record:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the exam record.',
//       });
//     }
//   };

    
//   // Function to calculate grade based on score
//   const calculateGrade = (score) => {
//     // Implement your grade calculation logic here
//     // Example logic (modify as needed):
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
//     // Implement your remark calculation logic here
//     // Example logic (modify as needed):
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


//   const updateExamRecord = async () => {
//     try {
//       // Calculate grade and remark based on the updated score
//       const updatedGrade = calculateGrade(updatedData.score);
//       const updatedRemark = calculateRemark(updatedGrade);

//       // Update the grade and remark in the updatedData
//       const updatedDataWithGradeRemark = {
//         ...updatedData,
//         grade: updatedGrade,
//         remark: updatedRemark,
//       };

//       const response = await axios.put(
//         baseUrl + '/updateExam/' + selectedRecord.id,
//         updatedDataWithGradeRemark
//       );

//       if (response.status === 200) {
//         const updatedRecord = response.data;

//         setExamRecords((prevRecords) =>
//           prevRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))
//         );

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Exam record updated successfully!',
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
//       console.error('Error updating exam record:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the exam record.',
//       });
//     }
//   };

//   const handleShowModal = (record) => {
//     setSelectedRecord(record);
//     setUpdatedData({
//       name: record.name,
//       courseTitle: record.courseTitle,
//       score: record.score,
//       grade: record.grade,
//       remark: record.remark,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedRecord(null);
//     setUpdatedData({});
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFilterChange = (e) => {
//     setCourseFilter(e.target.value);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Exam Records List Table</h6>
//           </div>
//           <div className="mx-5 py-3">
//             <Form.Group controlId="formCourseFilter">
//               <Form.Control
//                 as="select"
//                 value={courseFilter}
//                 onChange={handleFilterChange}
//                 placeholder="Filter by Course Title"
//               >
//                 <option value="">All Courses</option>
//                 {/* Add options dynamically from the data */}
//                 {examRecords.map((record) => (
//                   <option key={record.courseTitle} value={record.courseTitle}>
//                     {record.courseTitle}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Course Title</th>
//                   <th>Score</th>
//                   <th>Grade</th>
//                   <th>Remark</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {examRecords.map((record) => (
//                   <tr key={record.id}>
//                     <td>{record.id}</td>
//                     <td>{record.name}</td>
//                     <td>{record.courseTitle}</td>
//                     <td>{record.score}</td>
//                     <td>{record.grade}</td>
//                     <td>{record.remark}</td>
//                     <td>
//                       <button
//                         onClick={() => deleteExamRecord(record.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowModal(record)}
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

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Exam Record</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             {/* ... (rest of the form) */}
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default ExamRecordList;
