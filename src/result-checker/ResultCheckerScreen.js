// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
// import PreschoolResultTable from './../constant/PreschoolResultTable';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const CustomPicker = ({ options, selectedValue, onValueChange, placeholder }) => (
//   <Form.Group controlId="formCourseTitleFilter">
//     <Form.Control
//       as="select"
//       className="custom-select custom-select-lg"
//       value={selectedValue}
//       onChange={(e) => onValueChange(e.target.value)}
//     >
//       <option value="">{placeholder}</option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </Form.Control>
//   </Form.Group>
// );

// const ResultCheckerScreen = () => {
//   const [registrationNumber, setRegistrationNumber] = useState('');
//   const [terms, setTerms] = useState('');
//   const [matricNumber, setMatricNumber] = useState('');
//   const [year, setYear] = useState('');
//   const [showTable, setShowTable] = useState(false);
//   const [showAlert, setShowAlert] = useState(true);
//   const [department, setDepartment] = useState('');
//   const [level, setLevel] = useState('');
//   const [pin, setPin] = useState('');
//   const [pinModalVisible, setPinModalVisible] = useState(true);
//   const [levels, setLevels] = useState([]);
//   const [selectedComponent, setSelectedComponent] = useState(null);
//   const [studentResults, setStudentResults] = useState([]);
//   const [baseUrl, setBaseUrl] = useState('http://localhost:8080/api/exam-records');
//   const [termOptions, setTermOptions] = useState([]);
//   const [yearOptions, setYearOptions] = useState([]);
//   const [levelOptions, setLevelOptions] = useState([]);

//   // Fetch student results from the API
//   const fetchStudentResults = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllExam'); // Update with your API endpoint
//       if (response.status === 200) {
//         setStudentResults(response.data);
//         setTermOptions(Array.from(new Set(response.data.map((result) => result.terms))));
//         setYearOptions(Array.from(new Set(response.data.map((result) => result.year))));
//         setLevelOptions(Array.from(new Set(response.data.map((result) => result.level))));
//       } else {
//         console.error('Failed to fetch student results:', response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching student results:', error.message, error.response);
//     }
//   };

//   // Call the API when the component mounts
//   useEffect(() => {
//     fetchStudentResults();
//   }, []); // Empty dependency array ensures it only runs once

//   const handleLevelChange = (value) => {
//     setLevel(value);
//     switch (value) {
//       case 'Preschool':
//         setSelectedComponent(<PreschoolResultTable />);
//         break;
//       default:
//         setSelectedComponent(null);
//         break;
//     }
//   };
//   // const [registrationNumber, setRegistrationNumber] = useState('');
//   // const [terms, setTerms] = useState('');
//   // const [matricNumber, setMatricNumber] = useState('');
//   // const [year, setYear] = useState('');
//   // const [showTable, setShowTable] = useState(false);
//   // const [showAlert, setShowAlert] = useState(true);
//   // const [department, setDepartment] = useState('');
//   // const [level, setLevel] = useState('');
//   // const [pin, setPin] = useState('');
//   // const [pinModalVisible, setPinModalVisible] = useState(true);
//   // const [levels, setLevels] = useState(['Preschool', 'Nursery', 'Primary', 'Secondary']);
//   // const [selectedComponent, setSelectedComponent] = useState(null);
//   // const [studentResults, setStudentResults] = useState([]); // State for student results
//   // const baseUrl = 'http://localhost:8080/api/exam-records';


  

//   // Fetch student results from the API
//   // const fetchStudentResults = async () => {
//   //   try {
//   //     const response = await axios.get(baseUrl + '/viewAllExam'); // Update with your API endpoint
//   //     if (response.status === 200) {
//   //       setStudentResults(response.data); // Update the state with fetched data
//   //     } else {
//   //       console.error('Failed to fetch student results:', response.status, response.statusText);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching student results:', error.message, error.response);
//   //   }
//   // };

//   // // Call the API when the component mounts
//   // useEffect(() => {
//   //   fetchStudentResults();
//   // }, []); // Empty dependency array ensures it only runs once

//   // const handleLevelChange = (value) => {
//   //   setLevel(value);
//   //   // Update the component based on the selected level
//   //   switch (value) {
//   //     case 'Preschool':
//   //       setSelectedComponent(<PreschoolResultTable />);
//   //       break;
//   //     default:
//   //       setSelectedComponent(null);
//   //       break;
//   //   }
//   // };

//   const handlePinChange = (value) => {
//     setPin(value);
//   };

//   const handlePinSubmit = async () => {
//     try {
//       // Check if the pin exists in local storage
//       const storedPins = JSON.parse(localStorage.getItem('pins')) || [];
//       const foundPin = storedPins.find((storedPin) => storedPin.pinNumber === pin);

//       if (foundPin) {
//         // Display SweetAlert with success message and expiry date
//         Swal.fire({
//           icon: 'success',
//           title: 'PIN Found!',
//           text: `Expiry Date: ${foundPin.expiryDate}`,
//         });

//         // Hide the PIN modal
//         setPinModalVisible(false);
//       } else {
//         // Display SweetAlert with error message
//         Swal.fire({
//           icon: 'error',
//           title: 'Invalid PIN',
//           text: 'Please enter a valid PIN.',
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting PIN:', error.message, error.response);
//       // Display SweetAlert with error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An unexpected error occurred while submitting the PIN.',
//       });
//     }
//   };

//   const handleRegistrationNumberChange = (value) => {
//     setRegistrationNumber(value);
//     setMatricNumber(value);
//   };

//   const handleTermsChange = (value) => {
//     setTerms(value);
//   };

//   const handleYearChange = (value) => {
//     setYear(value);
//   };

//   const handleViewResult = () => {
//     if (!terms || !year || !registrationNumber) {
//       alert('Please fill in all the required fields.');
//       return;
//     }

//     const filteredResults = studentResults.filter(
//       (result) =>
//         result.registrationNumber.toLowerCase() === registrationNumber.toLowerCase() ||
//         result.matricNumber.toLowerCase() === matricNumber.toLowerCase()
//     );

//     if (filteredResults.length === 0) {
//       alert('No results found. Please review your entries.');
//     } else {
//       const { department, level } = filteredResults[0];
//       setDepartment(department);
//       setLevel(level);
//       setShowTable(true);
//     }
//   };

//   const handleCloseAlert = () => {
//     setShowAlert(false);
//   };

//   const filteredRegistrationResults = studentResults.filter(
//     (result) =>
//       (!registrationNumber || result.registrationNumber === registrationNumber || result.matricNumber.toLowerCase() === matricNumber.toLowerCase()) &&
//       (!terms || result.terms.toLowerCase() === terms.toLowerCase()) &&
//       (!year || result.year === year)
//   );



//   const tableHead = ['Subject Code', 'Subject Title', 'Term', 'Grade', 'Remark'];
//   const tableData = filteredRegistrationResults.flatMap((result) =>
//   result.courses
//     ? result.courses.map((course) => [
//         course.courseCode,
//         course.courseTitle,
//         result.level,
//         course.grade,
//         course.status,
//       ])
//     : []
// );

//   // const tableData = filteredRegistrationResults.flatMap((result) =>
//   //   result.courses.map((course) => [
//   //     course.courseCode,
//   //     course.courseTitle,
//   //     result.level,
//   //     course.grade,
//   //     course.status,
//   //   ])
//   // );

//   return (
//     <Container fluid>
//       {/* PIN Modal */}
//       {showAlert && pinModalVisible && (
//         <Card className="alert-container">
//           <Card.Body>
//             <Card.Text>
//               Simply Enter Exam Pin Number, To Proceed To Result Checker Robot. Contact The Admin If You Have No Pin.
//             </Card.Text>
//             <Button variant="primary" onClick={handleCloseAlert}>
//               Close
//             </Button>
//           </Card.Body>
//         </Card>
//       )}

//       {/* PIN Card */}
//       {pinModalVisible && (
//         <Card className="mb-3">
//           <Card.Body>
//             <Card.Title>Enter PIN</Card.Title>
//             <Form.Control
//               className='custom-form-control p-4'
//               type="text"
//               placeholder="Enter PIN"
//               value={pin}
//               onChange={(e) => handlePinChange(e.target.value)}
//             />
//             <Form.Group controlId="formNameFilter" className='custom-form-control pt-5 text-center'>
//               <Button variant="primary" onClick={handlePinSubmit} className='custom-form-control btn-lg btn-12'>
//                 Submit
//               </Button>
//             </Form.Group>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Main Content */}
//       {!pinModalVisible && (
//         <Row className="mb-3 col-sm-12 mx-2">
//           {showAlert && (
//             <Card className="alert-container col-12 m-3 mx-2 bg-secondary">
//               <Card.Body>
//                 <Card.Text>
//                   Simply Select year and Term. Enter Your Registration Number To View Result.
//                 </Card.Text>
//                 <Button variant="primary" onClick={handleCloseAlert}>
//                   Close
//                 </Button>
//               </Card.Body>
//             </Card>
//           )}

//           <Card className="mb-3 col-sm-12 mx-2 pt-4">
//             <Card.Body>
//               <Row className="mb-3">
//                 {/* <Col>
//                   <Form.Group controlId="formterms">
//                     <Form.Label>Term:</Form.Label>
//                     <CustomPicker
//                       options={Array.from(new Set(studentResults.map((result) => result.terms)))}
//                       selectedValue={terms}
//                       onValueChange={handleTermsChange}
//                       placeholder="Select Terms"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group controlId="formyear">
//                     <Form.Label>Exam Year:</Form.Label>
//                     <CustomPicker
//                       options={Array.from(new Set(studentResults.map((result) => result.year)))}
//                       selectedValue={year}
//                       onValueChange={handleYearChange}
//                       placeholder="Select Year"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group controlId="formLevel">
//                     <Form.Label>Level:</Form.Label>
//                     <CustomPicker
//                       options={levels}
//                       selectedValue={level}
//                       onValueChange={handleLevelChange}
//                       placeholder="Select Level"
//                     />
//                   </Form.Group>
//                 </Col> */}
              
//                 <Col>
//                   <Form.Group controlId="formterms">
//                     <Form.Label>Term:</Form.Label>
//                     <CustomPicker
//                       options={termOptions}
//                       selectedValue={terms}
//                       onValueChange={(value) => setTerms(value)}
//                       placeholder="Select Terms"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group controlId="formyear">
//                     <Form.Label>Exam Year:</Form.Label>
//                     <CustomPicker
//                       options={yearOptions}
//                       selectedValue={year}
//                       onValueChange={(value) => setYear(value)}
//                       placeholder="Select Year"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group controlId="formLevel">
//                     <Form.Label>Level:</Form.Label>
//                     <CustomPicker
//                       options={levelOptions}
//                       selectedValue={level}
//                       onValueChange={handleLevelChange}
//                       placeholder="Select Level"
//                     />
//                   </Form.Group>
//                 </Col>
             
//               </Row>
//               <Row className="mb-3">
//                 <Col>
//                   <Form.Group controlId="formRegistrationNumber">
//                     <Form.Label>Student Registration Number:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter registration number"
//                       value={registrationNumber}
//                       onChange={(e) => handleRegistrationNumberChange(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Button variant="primary" onClick={handleViewResult}>
//                 View Result
//               </Button>
//             </Card.Body>
//           </Card>
//           {selectedComponent ? (
//             selectedComponent
//           ) : (
//             showTable && (
//               <Card className='col-sm-12'>
//                 <Card.Body>
//                   <Card.Title>Year: {department}</Card.Title>
//                   <Card.Title>Class: {level}</Card.Title>
//                   <Table striped bordered responsive className='col-sm-12'>
//                     <thead>
//                       <tr>
//                         {tableHead.map((header, index) => (
//                           <th key={index}>{header}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {tableData.map((rowData, index) => (
//                         <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
//                           {rowData.map((cell, cellIndex) => (
//                             <td key={cellIndex}>{cell}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             )
//           )}

//           {selectedComponent ? (
//             selectedComponent
//           ) : (
//             showTable && (
//               <Card>
//                 <div
//                   type="text"
//                   className='custom-form-control bg-light'
//                   style={{ margin: 30, marginBottom: 30 }}
//                 >
//                   <p>Remark:</p>
//                   <p></p>
//                 </div>
//               </Card>
//             )
//           )}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default ResultCheckerScreen;

// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
// import studentResults from './../constant/studentResults';
// import PreschoolResultTable from './../constant/PreschoolResultTable';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const CustomPicker = ({ options, selectedValue, onValueChange, placeholder }) => (
//   <Form.Group controlId="formCourseTitleFilter">
//     <Form.Control
//       as="select"
//       className="custom-select custom-select-lg"
//       value={selectedValue}
//       onChange={(e) => onValueChange(e.target.value)}
//     >
//       <option value="">{placeholder}</option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </Form.Control>
//   </Form.Group>
// );

// const ResultCheckerScreen = () => {
//   const [registerNumber, setRegisterNumber] = useState('');
//   const [terms, setTerms] = useState('');
//   const [showTable, setShowTable] = useState(false);
//   const [showAlert, setShowAlert] = useState(true);
//   const [department, setDepartment] = useState('');
//   const [level, setLevel] = useState('');
//   const [pin, setPin] = useState('');
//   const [pinModalVisible, setPinModalVisible] = useState(true);
//   const [levels, setLevels] = useState(['Preschool', 'Nursery', 'Primary', 'Secondary']);
//   const [selectedComponent, setSelectedComponent] = useState(null);

//   const handleLevelChange = (value) => {
//     setLevel(value);
//     switch (value) {
//       case 'Preschool':
//         setSelectedComponent(<PreschoolResultTable />);
//         break;
//       default:
//         setSelectedComponent(null);
//         break;
//     }
//   };

//   const handlePinChange = (value) => {
//     setPin(value);
//   };

//   const handlePinSubmit = async () => {
//     try {
//       // Check if the pin exists in local storage
//       const storedPins = JSON.parse(localStorage.getItem('pins')) || [];
//       const foundPin = storedPins.find((storedPin) => storedPin.pinNumber === pin);

//       if (foundPin) {
//         // Display SweetAlert with success message and expiry date
//         Swal.fire({
//           icon: 'success',
//           title: 'PIN Found!',
//           text: `Expiry Date: ${foundPin.expiryDate}`,
//         });

//         // Hide the PIN modal
//         setPinModalVisible(false);
//       } else {
//         // Display SweetAlert with error message
//         Swal.fire({
//           icon: 'error',
//           title: 'Invalid PIN',
//           text: 'Please enter a valid PIN.',
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting PIN:', error.message, error.response);
//       // Display SweetAlert with error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An unexpected error occurred while submitting the PIN.',
//       });
//     }
//   };

//   const handleRegisterNumberChange = (value) => {
//     setRegisterNumber(value);
//   };

//   const handleTermsChange = (value) => {
//     setTerms(value);
//   };

//   const handleViewResult = () => {
//     if (!terms || !registerNumber) {
//       alert('Please fill in all the required fields.');
//       return;
//     }

//     const filteredResults = studentResults.filter(
//       (result) =>
//         result.registerNumber.toLowerCase() === registerNumber.toLowerCase() &&
//         result.terms.toLowerCase() === terms.toLowerCase()
//     );

//     if (filteredResults.length === 0) {
//       alert('No results found. Please review your entries.');
//     } else {
//       const { department, level } = filteredResults[0];
//       setDepartment(department);
//       setLevel(level);
//       setShowTable(true);
//     }
//   };

//   const handleCloseAlert = () => {
//     setShowAlert(false);
//   };

//   const filteredRegistrationResults = studentResults.filter(
//     (result) =>
//       (!registerNumber || result.registerNumber === registerNumber) &&
//       (!terms || result.terms.toLowerCase() === terms.toLowerCase())
//   );

//   const tableHead = ['Subject Code', 'Subject Title', 'Term', 'Grade', 'Remark'];
//   const tableData = filteredRegistrationResults.flatMap((result) =>
//     result.courses.map((course) => [
//       course.courseCode,
//       course.courseTitle,
//       result.terms,
//       course.grade,
//       course.status,
//     ])
//   );

//   return (
//     <Container fluid>
//       {/* PIN Modal */}
//       {showAlert && pinModalVisible && (
//         <Card className="alert-container">
//           <Card.Body>
//             <Card.Text>
//               Simply Enter Exam Pin Number, To Proceed To Result Checker Robot. Contact The Admin If You Have No Pin.
//             </Card.Text>
//             <Button variant="primary" onClick={handleCloseAlert}>
//               Close
//             </Button>
//           </Card.Body>
//         </Card>
//       )}

//       {/* PIN Card */}
//       {pinModalVisible && (
//         <Card className="mb-3">
//           <Card.Body>
//             <Card.Title>Enter PIN</Card.Title>
//             <Form.Control
//               className='custom-form-control p-4'
//               type="text"
//               placeholder="Enter PIN"
//               value={pin}
//               onChange={(e) => handlePinChange(e.target.value)}
//             />
//             <Form.Group controlId="formNameFilter" className='custom-form-control pt-5 text-center'>
//               <Button variant="primary" onClick={handlePinSubmit} className='custom-form-control btn-lg btn-12'>
//                 Submit
//               </Button>
//             </Form.Group>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Main Content */}
//       {!pinModalVisible && (
//         <Row className="mb-3 col-sm-12 mx-2">
//           {showAlert && (
//             <Card className="alert-container col-12 m-3 mx-2 bg-secondary">
//               <Card.Body>
//                 <Card.Text>
//                   Simply Select Session and Term. Enter Your Registration Number To View Result.
//                 </Card.Text>
//                 <Button variant="primary" onClick={handleCloseAlert}>
//                   Close
//                 </Button>
//               </Card.Body>
//             </Card>
//           )}

//           <Card className="mb-3 col-sm-12 mx-2 pt-4">
//             <Card.Body>
//               <Row className="mb-3">
//                 <Col>
//                   <Form.Group controlId="formTerms">
//                     <Form.Label>Terms:</Form.Label>
//                     <CustomPicker
//                       options={Array.from(new Set(studentResults.map((result) => result.terms)))}
//                       selectedValue={terms}
//                       onValueChange={handleTermsChange}
//                       placeholder="Select Terms"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group controlId="formLevel">
//                     <Form.Label>Level:</Form.Label>
//                     <CustomPicker
//                       options={levels}
//                       selectedValue={level}
//                       onValueChange={handleLevelChange}
//                       placeholder="Select Level"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="mb-3">
//                 <Col>
//                   <Form.Group controlId="formRegisterNumber">
//                     <Form.Label>Student Register Number:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter register number"
//                       value={registerNumber}
//                       onChange={(e) => handleRegisterNumberChange(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Button variant="primary" onClick={handleViewResult}>
//                 View Result
//               </Button>
//             </Card.Body>
//           </Card>

//           {selectedComponent ? (
//             selectedComponent
//           ) : (
//             showTable && (
//               <Card className='col-sm-12'>
//                 <Card.Body>
//                   <Card.Title>Session: {department}</Card.Title>
//                   <Card.Title>Class: {level}</Card.Title>
//                   <Table striped bordered responsive className='col-sm-12'>
//                     <thead>
//                       <tr>
//                         {tableHead.map((header, index) => (
//                           <th key={index}>{header}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {tableData.map((rowData, index) => (
//                         <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
//                           {rowData.map((cell, cellIndex) => (
//                             <td key={cellIndex}>{cell}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             )
//           )}
//         </Row>
//       )}

//       {selectedComponent ? (
//         selectedComponent
//       ) : (
//         showTable && (
//           <Card>
//             <div
//               type="text"
//               className='custom-form-control bg-light'
//               style={{ margin: 30, marginBottom: 30 }}
//             >
//               <p>Remark:</p>
//               <p></p>
//             </div>
//           </Card>
//         )
//       )}
//     </Container>
//   );
// };

// export default ResultCheckerScreen;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import PreschoolResultTable from './PreschoolResultTable';



const CustomPicker = ({ options, selectedValue, onValueChange, placeholder }) => (
  <Form.Group controlId="formCourseTitleFilter">
    <Form.Control
      as="select"
      className="custom-select custom-select-lg"
      value={selectedValue}
      onChange={(e) => onValueChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
);

const ResultCheckerScreen = () => {
  const [registerNumber, setRegisterNumber] = useState('');
  const [terms, setTerms] = useState('');
  const [level, setLevel] = useState('');
  const [ca, setCA] = useState('');
  const [exam, setExam] = useState('');
  const [score, setScore] = useState('');
  const [name, setName] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [pin, setPin] = useState('');
  const [pinModalVisible, setPinModalVisible] = useState(true);
  const [levels, setLevels] = useState(['Preschool', 'Nursery', 'Primary', 'Secondary']);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [examRecords, setExamRecords] = useState([]);

  useEffect(() => {
    // Fetch exam records on component mount
    axios.get('http://localhost:8080/api/exam-records/viewAllExam')
      .then(response => {
        setExamRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching exam records:', error);
      });
  }, []); // Empty dependency array ensures this effect runs once on component mount

  // const handleLevelChange = (value) => {
  //   setLevel(value);
  //   switch (value) {
  //     // Handle other level cases if needed
  //     default:
  //       setSelectedComponent(null);
  //       break;
  //   }
  // };

  const handleLevelChange = (value) => {
    setLevel(value);
    switch (value) {
      case 'Preschool':
        setSelectedComponent(<PreschoolResultTable />);
        break;
      default:
        setSelectedComponent(null);
        break;
    }
  };

  const handlePinChange = (value) => {
    setPin(value);
  };

  // const handlePinSubmit = async () => {
  //   // Implement PIN submission logic if needed
  // };

  const handlePinSubmit = async () => {
    try {
      // Check if the pin exists in local storage
      const storedPins = JSON.parse(localStorage.getItem('pins')) || [];
      const foundPin = storedPins.find((storedPin) => storedPin.pinNumber === pin);
  
      if (foundPin) {
        // Display SweetAlert with success message and expiry date
        Swal.fire({
          icon: 'success',
          title: 'PIN Found!',
          text: `Expiry Date: ${foundPin.expiryDate}`,
        });
  
        // Hide the PIN modal
        setPinModalVisible(false);
      } else {
        // Display SweetAlert with error message
        Swal.fire({
          icon: 'error',
          title: 'Invalid PIN',
          text: 'Please enter a valid PIN.',
        });
      }
    } catch (error) {
      console.error('Error submitting PIN:', error.message, error.response);
      // Display SweetAlert with error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred while submitting the PIN.',
      });
    }
  };
  

  const handleRegisterNumberChange = (value) => {
    setRegisterNumber(value);

    // Find the exam record for the given register number
    const matchingRecord = examRecords.find(record => record.registerNumber === value);

    if (matchingRecord) {
      setTerms(matchingRecord.terms);
      setLevel(matchingRecord.level);
      setCA(matchingRecord.ca);
      setExam(matchingRecord.exam);
      setScore(matchingRecord.score);
      setName(matchingRecord.name);
    } else {
      // Reset other fields if no matching record is found
      setTerms('');
      setLevel('');
      setCA('');
      setExam('');
      setScore('');
      setName('');
    }
  };

  const handleViewResult = () => {
    // Check if required fields are filled
    if (!registerNumber || !terms || !level) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    // Fetch the specific exam record based on entered details
    const matchingRecord = examRecords.find(
      (record) =>
        record.registerNumber.toLowerCase() === registerNumber.toLowerCase() &&
        record.terms.toLowerCase() === terms.toLowerCase() &&
        record.level.toLowerCase() === level.toLowerCase()
    );
  
    if (matchingRecord) {
      // Display the result or perform any necessary action
      const { ca, exam, score, name } = matchingRecord;
      setCA(ca);
      setExam(exam);
      setScore(score);
      setName(name);
      setShowTable(true);
    } else {
      // No matching record found
      alert('No results found. Please review your entries.');
    }
  };
  

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Container fluid>
      {/* PIN Modal */}
      {showAlert && pinModalVisible && (
        <Card className="alert-container">
          <Card.Body>
            <Card.Text>
              Simply Enter Exam Pin Number, To Proceed To Result Checker Robot. Contact The Admin If You Have No Pin.
            </Card.Text>
            <Button variant="primary" onClick={handleCloseAlert}>
              Close
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* PIN Card */}
      {pinModalVisible && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Enter PIN</Card.Title>
            <Form.Control
              className='custom-form-control p-4'
              type="text"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
            />
            <Form.Group controlId="formNameFilter" className='custom-form-control pt-5 text-center'>
              <Button variant="primary" onClick={handlePinSubmit} className='custom-form-control btn-lg btn-12'>
                Submit
              </Button>
            </Form.Group>
          </Card.Body>
        </Card>
      )}

      {/* Main Content */}
      {!pinModalVisible && (
        <Row className="mb-3 col-sm-12 mx-2">
          {showAlert && (
            <Card className="alert-container col-12 m-3 mx-2 bg-secondary">
              <Card.Body>
                <Card.Text>
                  Simply Select Session and Term. Enter Your Registration Number To View Result.
                </Card.Text>
                <Button variant="primary" onClick={handleCloseAlert}>
                  Close
                </Button>
              </Card.Body>
            </Card>
          )}

          <Card className="mb-3 col-sm-12 mx-2 pt-4">
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formTerms">
                    <Form.Label>Terms:</Form.Label>
                    <CustomPicker
                      options={Array.from(new Set(examRecords.map((record) => record.terms)))}
                      selectedValue={terms}
                      onValueChange={(value) => setTerms(value)}
                      placeholder="Select Terms"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formLevel">
                    <Form.Label>Level:</Form.Label>
                    <CustomPicker
                      options={levels}
                      selectedValue={level}
                      onValueChange={handleLevelChange}
                      placeholder="Select Level"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formRegisterNumber">
                    <Form.Label>Student Register Number:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter register number"
                      value={registerNumber}
                      onChange={(e) => handleRegisterNumberChange(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" onClick={handleViewResult}>
                View Result
              </Button>
            </Card.Body>
          </Card>

          {selectedComponent ? (
            selectedComponent
          ) : (
            showTable && (
              <Card className='col-sm-12'>
                <Card.Body>
                  <Card.Title>Session: {level}</Card.Title>
                  <Card.Title>Class: {name}</Card.Title>
                  <Table striped bordered responsive className='col-sm-12'>
                    {/* Add table content based on your requirements */}
                  </Table>
                </Card.Body>
              </Card>
            )
          )}
        </Row>
      )}

      {selectedComponent ? (
        selectedComponent
      ) : (
        showTable && (
          <Card>
            <div
              type="text"
              className='custom-form-control bg-light'
              style={{ margin: 30, marginBottom: 30 }}
            >
              <p>Remark:</p>
              <p></p>
            </div>
          </Card>
        )
      )}
    </Container>
  );
};

export default ResultCheckerScreen;



// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table, Modal,  } from 'react-bootstrap';
// import studentResults from './../constant/studentResults';
// import PreschoolResultTable from './../constant/PreschoolResultTable';
// import axios from 'axios';
// import Swal from 'sweetalert2';


// const CustomPicker = ({ options, selectedValue, onValueChange, placeholder }) => (
//     <Form.Group controlId="formCourseTitleFilter">
//     <Form.Control
   
//     as="select"
//     className="custom-select custom-select-lg"
//       value={selectedValue}
//       onChange={(e) => onValueChange(e.target.value)}
//     >
//       <option value="">{placeholder}</option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </Form.Control>
//     </Form.Group>
//   );
  
// const ResultCheckerScreen = () => {
//   const [registrationNumber, setRegistrationNumber] = useState('');
//   const [semester, setSemester] = useState('');
//   const [matricNumber, setMatricNumber] = useState('');
//   const [session, setSession] = useState('');
//   const [showTable, setShowTable] = useState(false);
//   const [showAlert, setShowAlert] = useState(true);
//   const [department, setDepartment] = useState('');
//   const [level, setLevel] = useState('');
//   const [pin, setPin] = useState('');
//   const [pinModalVisible, setPinModalVisible] = useState(true);
//   const [levels, setLevels] = useState(['Preschool', 'Nursery', 'Primary', 'Secondary']);
  // const [selectedComponent, setSelectedComponent] = useState(null);

  // const handleLevelChange = (value) => {
  //   setLevel(value);
  //   switch (value) {
  //     case 'Preschool':
  //       setSelectedComponent(<PreschoolResultTable />);
  //       break;
  //     default:
  //       setSelectedComponent(null);
  //       break;
  //   }
  // };

//   const handlePinChange = (value) => {
//     setPin(value);
//   };





// const handlePinSubmit = async () => {
//   try {
//     // Check if the pin exists in local storage
//     const storedPins = JSON.parse(localStorage.getItem('pins')) || [];
//     const foundPin = storedPins.find((storedPin) => storedPin.pinNumber === pin);

//     if (foundPin) {
//       // Display SweetAlert with success message and expiry date
//       Swal.fire({
//         icon: 'success',
//         title: 'PIN Found!',
//         text: `Expiry Date: ${foundPin.expiryDate}`,
//       });

//       // Hide the PIN modal
//       setPinModalVisible(false);
//     } else {
//       // Display SweetAlert with error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid PIN',
//         text: 'Please enter a valid PIN.',
//       });
//     }
//   } catch (error) {
//     console.error('Error submitting PIN:', error.message, error.response);
//     // Display SweetAlert with error message
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'An unexpected error occurred while submitting the PIN.',
//     });
//   }
// };


//   const handleRegistrationNumberChange = (value) => {
//     setRegistrationNumber(value);
//     setMatricNumber(value);
//   };

//   const handleSemesterChange = (value) => {
//     setSemester(value);
//   };

//   const handleSessionChange = (value) => {
//     setSession(value);
//   };

//   const handleViewResult = () => {
//     if (!semester || !session || !registrationNumber) {
//       alert('Please fill in all the required fields.');
//       return;
//     }

//     const filteredResults = filteredRegistrationResults.filter(
//       (result) =>
//         result.registrationNumber.toLowerCase() === registrationNumber.toLowerCase() ||
//         result.matricNumber.toLowerCase() === matricNumber.toLowerCase()
//     );

//     if (filteredResults.length === 0) {
//       alert('No results found. Please review your entries.');
//     } else {
//       const { department, level } = filteredResults[0];
//       setDepartment(department);
//       setLevel(level);
//       setShowTable(true);
//     }
//   };

//   const handleCloseAlert = () => {
//     setShowAlert(false);
//   };

//   const filteredRegistrationResults = studentResults.filter(
//     (result) =>
//       (!registrationNumber || result.registrationNumber === registrationNumber || result.matricNumber.toLowerCase() === matricNumber.toLowerCase()) &&
//       (!semester || result.semester.toLowerCase() === semester.toLowerCase()) &&
//       (!session || result.session === session)
//   );

//   const tableHead = ['Subject Code','Subject Title', 'Term', 'Grade', 'Remark'];
//   const tableData = filteredRegistrationResults.flatMap((result) =>
//     result.courses.map((course) => [
//       course.courseCode,
//       course.courseTitle,
//       result.semester,
//       course.grade,
//       course.status,
//     ])
//   );

//   return (
//     <Container fluid>
//       {/* PIN Modal */}
//       {showAlert && pinModalVisible && (
//         <Card className="alert-container">
//           <Card.Body>
//             <Card.Text>
//               Simply Enter Exam Pin Number, To Proceed To Result Checker Robot. Contact The Admin If You Have No Pin.
//             </Card.Text>
//             <Button variant="primary" onClick={handleCloseAlert}>
//               Close
//             </Button>
//           </Card.Body>
//         </Card>
//       )}

//       {/* PIN Card */}
//       {pinModalVisible && (
//         <Card className="mb-3">
//           <Card.Body>
//             <Card.Title>Enter PIN</Card.Title>
//             <Form.Control
//              className='custom-form-control p-4'
//               type="text"
//               placeholder="Enter PIN"
//               value={pin}
//               onChange={(e) => handlePinChange(e.target.value)}
//             />
//             <Form.Group controlId="formNameFilter" className='custom-form-control pt-5 text-center'>
//             <Button variant="primary" onClick={handlePinSubmit} className='custom-form-control btn-lg btn-12'>
//               Submit
//             </Button>

//             </Form.Group>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Main Content */}
//       {!pinModalVisible && (
//         <Row className="mb-3 col-sm-12 mx-2">
//         {showAlert && (
//           <Card className="alert-container col-12 m-3 mx-2 bg-secondary">
//             <Card.Body>
//               <Card.Text>
//                 Simply Select Session and Term. Enter Your Registration Number To View Result.
//               </Card.Text>
//               <Button variant="primary" onClick={handleCloseAlert}>
//                 Close
//               </Button>
//             </Card.Body>
//           </Card>
//         )}

//         <Card className="mb-3 col-sm-12 mx-2 pt-4">
//           <Card.Body>
//             <Row className="mb-3">
//               <Col>
//                 <Form.Group controlId="formSemester">
//                   <Form.Label>Term:</Form.Label>
//                   <CustomPicker
//                     options={Array.from(new Set(studentResults.map((result) => result.semester)))}
//                     selectedValue={semester}
//                     onValueChange={handleSemesterChange}
//                     placeholder="Select Semester"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group controlId="formSession">
//                   <Form.Label>Exam Year:</Form.Label>
//                   <CustomPicker
//                     options={Array.from(new Set(studentResults.map((result) => result.session)))}
//                     selectedValue={session}
//                     onValueChange={handleSessionChange}
//                     placeholder="Select Session"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group controlId="formLevel">
//                   <Form.Label>Level:</Form.Label>
//                   <CustomPicker
//                     options={levels}
//                     selectedValue={level}
//                     onValueChange={handleLevelChange}
//                     placeholder="Select Level"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Row className="mb-3">
//               <Col>
//                 <Form.Group controlId="formRegistrationNumber">
//                   <Form.Label>Student Registration Number:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter registration number"
//                     value={registrationNumber}
//                     onChange={(e) => handleRegistrationNumberChange(e.target.value)}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Button variant="primary" onClick={handleViewResult}>
//               View Result
//             </Button>
//           </Card.Body>
//         </Card>
//           {selectedComponent ? (
//             selectedComponent
//           ) : (
//             showTable && (
//               <Card className='col-sm-12'>
//                 <Card.Body>
//                   <Card.Title>Session: {department}</Card.Title>
//                   <Card.Title>Class: {level}</Card.Title>
//                   <Table striped bordered responsive className='col-sm-12'>
//                     <thead>
//                       <tr>
//                         {tableHead.map((header, index) => (
//                           <th key={index}>{header}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {tableData.map((rowData, index) => (
//                         <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
//                           {rowData.map((cell, cellIndex) => (
//                             <td key={cellIndex}>{cell}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             )
//           )}
          
//         </Row>
//       )}

// {selectedComponent ? (
//             selectedComponent
//           ) : (
//             showTable && (
//         <Card>
//         <div 
//             type="text"
//             className='custom-form-control bg-light'
//         style={{ margin: 30, marginBottom: 30 }}>
//             <p>Remark:</p>
//             <p></p>
//             </div>
//         </Card>

//             ))}
//     </Container>
//   );
// };

// export default ResultCheckerScreen;
