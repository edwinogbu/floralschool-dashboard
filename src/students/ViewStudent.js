import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Col, Row, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CustomGroupSubtitlePicker from './CustomGroupSubtitlePicker ';

const baseUrl = 'http://localhost:8080/api/students';

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
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

  const options = [
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
  ];

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/students/view/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleLevelChange = (selectedLevel) => {
    setStudent({ ...student, level: selectedLevel });
  };

  const handleShowEditModal = () => {
    setEditedStudent({
      studentName: student.studentName,
      level: student.level,
      phoneNumber: student.phoneNumber,
      dob: student.dob,
      homeAddress: student.homeAddress,
      stateOfOrigin: student.stateOfOrigin,
      guardianName: student.guardianName,
      sex: student.sex,
      entryYear: student.entryYear,
      graduationYear: student.graduationYear,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;

    // Handle level separately to match the expected format
    if (name === 'level') {
      const selectedLevel = options.find((option) => option.value === value);
      setEditedStudent((prev) => ({
        ...prev,
        level: selectedLevel || '', // Set an empty string if not found
      }));
    } else {
      // Handle other fields
      setEditedStudent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`${baseUrl}/update/${id}`, editedStudent);

      if (response.status === 200) {
        setStudent(response.data);
        setShowEditModal(false);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };


  return (
    <div className="container mt-4">
      <Link to="/students" className="btn btn-secondary mb-3">
        Back to Students
      </Link>

      <Card>
        <Card.Header as="h5" className="text-center bg-primary text-white">
          Student Details
        </Card.Header>
        <Card.Body>
      
           <Row>
            <Col md={4} className="text-center">
               <img
                  src={student.imagePath || 'https://via.placeholder.com/150'}
                  alt="Student"
                  className="img-fluid mb-3"
                  // className="img-fluid rounded-circle mb-3"
                  style={{height:300, width:400, borderRadius:25,}}
                />
              </Col>
              <Col md={8}>
                <h2 className='text-center text-lg-center text-bold'>{student.studentName}</h2>
                <p className="lead text-primary text-bold">Student Class : {student.level}</p>
                <p className="lead text-primary text-bold">Student Register Number : <b>{student.registerNumber}</b></p>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Phone Number:</strong> {student.phoneNumber}
                  </li>
                  <li className="list-group-item">
                    <strong>Date of Birth:</strong> {student.dob}
                  </li>
                  <li className="list-group-item">
                    <strong>Home Address:</strong> 
                    <p>
                    {student.homeAddress}

                    </p>
                  </li>
                  <li className="list-group-item">
                    <strong>State of Origin:</strong> {student.stateOfOrigin}
                  </li>
                  <li className="list-group-item">
                    <strong>Guardian Name:</strong> {student.guardianName}
                  </li>
                  <li className="list-group-item">
                    <strong>Sex:</strong> {student.sex}
                  </li>
                  <li className="list-group-item">
                    <strong>Entry Year:</strong> {student.entryYear}
                  </li>
                  <li className="list-group-item">
                    <strong>Graduation Year:</strong> {student.graduationYear}
                  </li>
                </ul>
              </Col>
            </Row> 

          <div className="mt-3">
            <Button variant="primary" onClick={handleShowEditModal}>
              Edit Student
            </Button>
            <Button variant="danger">Delete Student</Button>
          </div>
        </Card.Body>
      </Card>

<Modal show={showEditModal} onHide={handleCloseEditModal}>
  <Modal.Header closeButton>
       <button type="button" className="btn-close text-danger btn-sm btn-outline-light" aria-label="Close" onClick={handleCloseEditModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
  </Modal.Header>


  <Modal.Body>
    <Form>
      <Form.Group controlId="formEditStudentName">
        <Form.Label>Student Name</Form.Label>
        <Form.Control
          type="text"
          name="studentName"
          value={editedStudent.studentName}
          onChange={handleEditInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formEditLevel">
        <Form.Label>Level</Form.Label>
        <Form.Control
          type="text"
          name="level"
          value={editedStudent.level}
          onChange={handleEditInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEditLevel">
              <Form.Label>Level</Form.Label>
              <select
                className="form-control form-select"
                name="level"
                value={editedStudent.level}
                onChange={handleEditInputChange}
              >
                <option value="" disabled>
                  Select Level
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Form.Group>


      <Form.Group controlId="formSex">
          <Form.Label>Sex</Form.Label>
          <Form.Control
            as="select"
            name="sex"
            value={editedStudent.sex}
            onChange={handleEditInputChange}
          >
            <option value="" disabled>Select sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Control>
      </Form.Group>

      <Form.Group controlId="formEditPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={editedStudent.phoneNumber}
          onChange={handleEditInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formEditDob">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dob"
          value={editedStudent.dob}
          onChange={handleEditInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEditDob">
        <Form.Label>Home Address</Form.Label>
        <Form.Control
          type="text"
          name="homeAddress"
          value={editedStudent.homeAddress}
          onChange={handleEditInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEditEntryYear">
        <Form.Label>Entry Year</Form.Label>
        <Form.Control
          type="date"
          name="entryYear"
          value={editedStudent.entryYear}
          onChange={handleEditInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEditGraduationYear">
        <Form.Label>Graduation Year</Form.Label>
         <Form.Control
          type="date"
          name="graduationYear"
          value={editedStudent.graduationYear}
          onChange={handleEditInputChange}
        />
      </Form.Group>

      {/* Add similar Form.Group components for other fields */}

      <Button variant="primary" onClick={handleEditSubmit}>
        Save Changes
      </Button>
    </Form>
  </Modal.Body>
</Modal>

    </div>
  );
};

export default ViewStudent;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { Card, Button, Col, Row, Modal, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// const baseUrl = 'http://localhost:8080/api/students';

// const ViewStudent = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState({});
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editedStudent, setEditedStudent] = useState({
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

//   // useEffect(() => {
//   //   const fetchStudent = async () => {
//   //     try {
//   //       const response = await axios.get(`${baseUrl}/view/${id}`);
//   //       setStudent(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching student:', error);
//   //     }
//   //   };

//   //   fetchStudent();
//   // }, [id]);


//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/students/view/${id}`);
//         setStudent(response.data);
//       } catch (error) {
//         console.error('Error fetching student:', error);
//       }
//     };

//     fetchStudent();
//   }, [id]);


//   const handleShowEditModal = () => {
//     setEditedStudent({
//       studentName: student.studentName,
//       level: student.level,
//       phoneNumber: student.phoneNumber,
//       dob: student.dob,
//       homeAddress: student.homeAddress,
//       stateOfOrigin: student.stateOfOrigin,
//       guardianName: student.guardianName,
//       sex: student.sex,
//       entryYear: student.entryYear,
//       graduationYear: student.graduationYear,
//     });
//     setShowEditModal(true);
//   };

//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedStudent((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEditSubmit = async () => {
//     try {
//       const response = await axios.put(`${baseUrl}/update/${id}`, editedStudent);

//       if (response.status === 200) {
//         setStudent(response.data);
//         setShowEditModal(false);
//       } else {
//         console.error('Unexpected response status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error updating student:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <Link to="/students" className="btn btn-secondary mb-3">
//         Back to Students
//       </Link>

//       <Card>
//         <Card.Header as="h5" className="text-center bg-primary text-white">
//           Student Details
//         </Card.Header>
//         <Card.Body>
      
//            <Row>
//             <Col md={4} className="text-center">
//                <img
//                   src={student.imagePath || 'https://via.placeholder.com/150'}
//                   alt="Student"
//                   className="img-fluid mb-3"
//                   // className="img-fluid rounded-circle mb-3"
//                   style={{height:300, width:400, borderRadius:25,}}
//                 />
//               </Col>
//               <Col md={8}>
//                 <h2 className='text-center text-lg-center text-bold'>{student.studentName}</h2>
//                 <p className="lead text-primary text-bold">Student Class : {student.level}</p>
//                 <p className="lead text-primary text-bold">Student Register Number : <b>{student.registerNumber}</b></p>
//                 <ul className="list-group">
//                   <li className="list-group-item">
//                     <strong>Phone Number:</strong> {student.phoneNumber}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Date of Birth:</strong> {student.dob}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Home Address:</strong> 
//                     <p>
//                     {student.homeAddress}

//                     </p>
//                   </li>
//                   <li className="list-group-item">
//                     <strong>State of Origin:</strong> {student.stateOfOrigin}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Guardian Name:</strong> {student.guardianName}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Sex:</strong> {student.sex}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Entry Year:</strong> {student.entryYear}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Graduation Year:</strong> {student.graduationYear}
//                   </li>
//                 </ul>
//               </Col>
//             </Row> 

//           <div className="mt-3">
//             <Button variant="primary" onClick={handleShowEditModal}>
//               Edit Student
//             </Button>
//             <Button variant="danger">Delete Student</Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Edit Student Modal */}
//       {/* <Modal show={showEditModal} onHide={handleCloseEditModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Student</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formEditStudentName">
//               <Form.Label>Student Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="studentName"
//                 value={editedStudent.studentName}
//                 onChange={handleEditInputChange}
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleEditSubmit}>
//               Save Changes
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal> */}
//       {/* Edit Student Modal */}
// <Modal show={showEditModal} onHide={handleCloseEditModal}>
//   <Modal.Header closeButton>
//        <button type="button" className="btn-close text-danger btn-sm btn-outline-light" aria-label="Close" onClick={handleCloseEditModal}>
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//   </Modal.Header>
  
//   {/* <Modal.Header closeButton>
//         <Modal.Title>Edit Student</Modal.Title>
//         <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseEditModal}>
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//       </Modal.Header> */}

//   <Modal.Body>
//     <Form>
//       <Form.Group controlId="formEditStudentName">
//         <Form.Label>Student Name</Form.Label>
//         <Form.Control
//           type="text"
//           name="studentName"
//           value={editedStudent.studentName}
//           onChange={handleEditInputChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="formEditLevel">
//         <Form.Label>Level</Form.Label>
//         <Form.Control
//           type="text"
//           name="level"
//           value={editedStudent.level}
//           onChange={handleEditInputChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="formSex">
//           <Form.Label>Sex</Form.Label>
//           <Form.Control
//             as="select"
//             name="sex"
//             value={editedStudent.sex}
//             onChange={handleEditInputChange}
//           >
//             <option value="" disabled>Select sex</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </Form.Control>
//       </Form.Group>

//       <Form.Group controlId="formEditPhoneNumber">
//         <Form.Label>Phone Number</Form.Label>
//         <Form.Control
//           type="text"
//           name="phoneNumber"
//           value={editedStudent.phoneNumber}
//           onChange={handleEditInputChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="formEditDob">
//         <Form.Label>Date of Birth</Form.Label>
//         <Form.Control
//           type="date"
//           name="dob"
//           value={editedStudent.dob}
//           onChange={handleEditInputChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formEditDob">
//         <Form.Label>Home Address</Form.Label>
//         <Form.Control
//           type="text"
//           name="homeAddress"
//           value={editedStudent.homeAddress}
//           onChange={handleEditInputChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formEditEntryYear">
//         <Form.Label>Entry Year</Form.Label>
//         <Form.Control
//           type="date"
//           name="entryYear"
//           value={editedStudent.entryYear}
//           onChange={handleEditInputChange}
          
//         />
//       </Form.Group>
//       <Form.Group controlId="formEditGraduationYear">
//         <Form.Label>Graduation Year</Form.Label>
//         <Form.Control
//           type="date"
//           name="graduationYear"
//           value={editedStudent.graduationYear}
//           onChange={handleEditInputChange}
//         />
//       </Form.Group>

//       {/* Add similar Form.Group components for other fields */}

//       <Button variant="primary" onClick={handleEditSubmit}>
//         Save Changes
//       </Button>
//     </Form>
//   </Modal.Body>
// </Modal>

//     </div>
//   );
// };

// export default ViewStudent;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { Card, Button, Col, Row } from 'react-bootstrap';
// const baseUrl = 'http://localhost:8080/api/students';


// const ViewStudent = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState({});

  // useEffect(() => {
  //   const fetchStudent = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/students/view/${id}`);
  //       setStudent(response.data);
  //     } catch (error) {
  //       console.error('Error fetching student:', error);
  //     }
  //   };

  //   fetchStudent();
  // }, [id]);

//   return (
//     <div className="container mt-4">
//       <Link to="/students" className="btn btn-secondary mb-3">
//         Back to Students
//       </Link>

//       <Card>
//         <Card.Header as="h5" className="text-center bg-primary text-white">
//           Student Details
//         </Card.Header>
//         <Card.Body>
//           <Row>
//             <Col md={4} className="text-center">
//               <img
//                 src={student.imagePath || 'https://via.placeholder.com/150'}
//                 alt="Student"
//                 className="img-fluid mb-3"
//                 // className="img-fluid rounded-circle mb-3"
//                 style={{height:300, width:400, borderRadius:25,}}
//               />
//             </Col>
//             <Col md={8}>
//               <h2 className='text-center text-lg-center text-bold'>{student.studentName}</h2>
//               <p className="lead text-primary text-bold">Student Class : {student.level}</p>
//               <p className="lead text-primary text-bold">Student Register Number : <b>{student.registerNumber}</b></p>
//               <ul className="list-group">
//                 <li className="list-group-item">
//                   <strong>Phone Number:</strong> {student.phoneNumber}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Date of Birth:</strong> {student.dob}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Home Address:</strong> 
//                   <p>
//                   {student.homeAddress}

//                   </p>
//                 </li>
//                 <li className="list-group-item">
//                   <strong>State of Origin:</strong> {student.stateOfOrigin}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Guardian Name:</strong> {student.guardianName}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Sex:</strong> {student.sex}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Entry Year:</strong> {student.entryYear}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Graduation Year:</strong> {student.graduationYear}
//                 </li>
//               </ul>
//             </Col>
//           </Row> 
//           <div className="mt-3">
//             <Link to={`/edit-student/${id}`} className="btn btn-primary mr-2">
//               Edit Student
//             </Link>
//             <Button variant="danger">Delete Student</Button>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default ViewStudent;
