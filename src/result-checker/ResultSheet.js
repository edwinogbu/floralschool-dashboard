import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

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

const ResultSheet = () => {
  const baseUrl = 'http://localhost:8080/api/exam-records';
  const [pin, setPin] = useState('');
  const [pinModalVisible, setPinModalVisible] = useState(true);
  const [filterCardVisible, setFilterCardVisible] = useState(false);
  const [resultTableVisible, setResultTableVisible] = useState(false);
  const [levels, setLevels] = useState(['Preschool', 'Nursery', 'Primary', 'Secondary']);
  const [level, setLevel] = useState('');
  const [academicData, setAcademicData] = useState([]);
  const [studentDetails, setStudentDetails] = useState({});
  const [registraterNumber, setRegistraterNumber] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [terms, setTerms] = useState('');
  const [examRecords, setExamRecords] = useState([]);
  const [processedAcademicData, setProcessedAcademicData] = useState([]);

  
  
  const PreschoolResultTable = ({ studentName, registraterNumber, level, terms, academicData, classAverage, totalScore }) => {
    // Your PreschoolResultTable component logic goes here
    const getRemark = (grade) => {
      // Implement your logic to determine remarks based on the grade
      // This is just a placeholder, customize it based on your criteria
      if (grade === 'A' || grade === 'A+') {
        return 'Excellent';
      } else if (grade === 'B' || grade === 'C') {
        return 'Good';
      } else {
        return 'Needs Improvement';
      }
    };
  
    return (
      <div className="container-fluid bg-light">

      <div className="container p-3">
      <div className="card card-body">
        <div className="row">
          <div className="col">
            <div className="header">
              <div className="logo text-center">
                <img
                  className="sidebar-card-illustration mb-2"
                  src="img/logo.jpg"
                  alt="..."
                  style={{ width: 180, height: 180 }}
                />
              </div>
              <div className="school-name mb-4 h-100 bg-primary justify-content-center text-light">
                <h1 className='mb-5 text-center text-bold'>{studentDetails.schoolName}</h1>
                <p className='text-white text-center text-bold'>{studentDetails.schoolAddress}</p>
                <p className='text-white text-center text-bold'>Motto: {studentDetails.schoolMotto}</p>
                <p className='text-primary text-center text-bold'>{studentDetails.schoolEmail}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header bg-primary text-white text-center">
                <h4 className="font-weight-bold">Preschool Result Sheet</h4>
                <h5 className="font-weight-bold">Name: {studentName}</h5>
              </div>
            </div>
          </div>
        </div>
        </div>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <div className="d-flex row mb-2">
            <div className="col-4 font-weight-bold">Course Title</div>
            <div className="col-4 font-weight-bold">level</div>
            <div className="col-4 font-weight-bold">Grade</div>
            <div className="col-4 font-weight-bold">Remark</div>
          </div>
        </div>
        <div className="card-body">
        {academicData.map((data, index) => (
            <div  key={index} className="row mb-1">
              <div className="col-sm-4">{data.courseTitle}</div>
              <div className="col-sm-4">{data.level}</div>
              <div className="col-sm-4 font-weight-bold">{data.grade}</div>
              <div className="col-4 font-weight-bold">{getRemark(data.grade)}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
    );
  };
  

  const handleLevelChange = (value) => {
    setLevel(value);
    switch (value) {
      case 'Pre-Nursery':
        setSelectedComponent(
          <PreschoolResultTable
            studentName={studentDetails.studentName}
            registraterNumber={registraterNumber}
            level={level}
            terms={terms}
            academicData={processedAcademicData} // Use processedAcademicData instead of academicData
            classAverage={classAverage}
            totalScore={totalScore}
          />
        );
        break;
      default:
        setSelectedComponent(null);
        break;
    }
  };
  

  
  // const handleLevelChange = (value) => {
  //   setLevel(value);
  //   switch (value) {
  //     case 'Pre-Nursery':
  //       setSelectedComponent(
  //         <PreschoolResultTable
  //           studentName={studentDetails.studentName}
  //           registraterNumber={registraterNumber}
  //           level={level}
  //           terms={terms}
  //           academicData={academicData}
  //           classAverage={classAverage}
  //           totalScore={totalScore}
  //         />
  //       );
  //       break;
  //     default:
  //       setSelectedComponent(null);
  //       break;
  //   }
  // };

  const handlePinChange = (value) => {
    setPin(value);
  };

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
        setFilterCardVisible(true);
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
  



  const calculateTotalScore = (data) => {
    return data.reduce((total, subjectData) => {
      const subjectTotal = subjectData.ca + subjectData.exam;
      return total + subjectTotal;
    }, 0);
  };

  const calculateCumulativeTotalScore = (data) => {
    return data.reduce((cumulativeTotal, subjectData) => {
      const subjectTotal = subjectData.ca + subjectData.exam;
      return cumulativeTotal + subjectTotal;
    }, 0);
  };

  const calculatePercentage = (totalScore, maxScore, dataLength) => {
    return (totalScore / (maxScore * 2 * dataLength)) * 100;
  };

  const calculateClassAverage = (data) => {
    const classTotalScore = calculateTotalScore(data);
    return classTotalScore / data.length;
  };

  const findClassExtreme = (data, comparator) => {
    if (data && data.length > 0) {
      let extreme = data[0].ca + data[0].exam;
      let extremeSubject = data[0].subject;

      for (let i = 1; i < data.length; i++) {
        const subjectTotal = data[i].ca + data[i].exam;
        if (comparator(subjectTotal, extreme)) {
          extreme = subjectTotal;
          extremeSubject = data[i].subject;
        }
      }
      return { extreme, subject: extremeSubject };
    } else {
      console.error('Error: data or data.length is undefined or empty');
      return { extreme: 0, subject: 'N/A' };
    }
  };

  const determineRemarks = (percentage) => {
    if (percentage >= 90) return 'OUTSTANDING';
    if (percentage >= 80) return 'EXCELLENT';
    if (percentage >= 70) return 'VERY GOOD';
    if (percentage >= 60) return 'GOOD';
    if (percentage >= 50) return 'AVERAGE';
    if (percentage >= 40) return 'BELOW AVERAGE';
    return 'POOR';
  };

  const determineGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    if (percentage >= 40) return 'E';
    return 'F';
  };

  const totalScore = calculateTotalScore(academicData);
  const cumulativeTotalScore = calculateCumulativeTotalScore(academicData);
  const totalPercentage = calculatePercentage(totalScore, 100, academicData.length);
  const classAverage = calculateClassAverage(academicData);
  const classHighest = findClassExtreme(academicData, Math.max);
  const classLowest = findClassExtreme(academicData, Math.min);


  const handlePrint = () => {
    window.print();
  };


  const handleFilterSubmit = async () => {
    try {
      // Fetch exam records based on the stored registration number
      const storedExamRecords = JSON.parse(localStorage.getItem('examRecords')) || [];
      const foundExamRecords = storedExamRecords.filter(
        (record) => record.registerNumber === registraterNumber && record.level === level && record.terms === terms
      );
  
      if (foundExamRecords.length > 0) {
        // Process exam records to calculate additional data
        const processedData = foundExamRecords.map((data) => ({
          ...data,
          totalScore: data.ca + data.exam,
          cumulativeTotalScore: data.ca + data.exam,
          percentage: (data.ca + data.exam) / (40 + 60) * 100,
          remarks: determineRemarks((data.ca + data.exam) / (40 + 60) * 100),
          grade: determineGrade((data.ca + data.exam) / (40 + 60) * 100),
        }));
  
        // Set the processed data to the state
        setProcessedAcademicData(processedData);
  
        // Fetch student details based on the stored registration number
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const foundStudent = storedStudents.find((student) => student.registerNumber === registraterNumber);
  
        if (foundStudent) {
          setStudentDetails(foundStudent);
          setFilterCardVisible(false);
          setResultTableVisible(true);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Student Not Found',
            text: 'Student details not found in local storage.',
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Matching Records',
          text: 'No exam records found for the specified level, terms, and registration number.',
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while fetching data.',
      });
    }
  };
   

  
  const course_sections = [
    {
      course_group: 'Communication Skills',
      data: [
        { label: 'Speaking'},
        { label: 'Responses'},
        { label: 'Routine'},
        { label: 'Understanding'},
      ],
    },
    {
      course_group: 'Emotional Skills',
      data: [
        { label: 'Emotional Assessment'},
        { label: 'Empathy'},
        { label: 'Self-Awareness'},
        { label: 'Social Skills'},
        { label: 'Cooperation'},
      ],
    },
    {
      course_group: 'Reading',
      data: [
        { label: 'Basic Reading'},
        { label: 'Story Comprehension'},
      ],
    },
    {
      course_group: 'Motor Skills',
      data: [
        { label: 'Can hold and use pencil' },
        { label: 'Can hold and use crayon'},
        { label: 'Can bounce a ball'},
        { label: 'Can kick a ball'},
        { label: 'Can jump up and down'},
        { label: 'Can sing rhymes'},
      ],
    },
    {
      course_group: 'Numbers',
      data: [
        { label: 'Recognizes numbers one to ten' },
        { label: 'Understands empty and full' },
      ],
    },
    {
      course_group: 'Colors and Shapes',
      data: [
        { label: 'Knows primary colors' },
        { label: 'Knows shapes' },
      ],
    },
  ];



  // const studentCourseTitles = studentDetails.courseData.map(course => course.title);

  // // Function to get the course group based on the course title


  // Assuming that studentDetails.courseData contains the course titles for the student
  // const studentCourseTitles = studentDetails.courseData.map(course => course.title);
  const studentCourseTitles = studentDetails.courseData ? studentDetails.courseData.map(course => course.title) : [];
  
  // const getCourseGroup = (courseTitle) => {
  //   for (const group in course_sections) {
  //     if (course_sections[group].includes(courseTitle)) {
  //       return group;
  //     }
  //   }
  //   // Return a default group if the course title doesn't match any data label
  //   return 'Other';
  // };

  // Now use studentCourseTitles in your code
  
  // Function to get the course group based on the course title
  // const getCourseGroup = (courseTitle) => {
  //   for (const group of course_sections) {
  //     for (const course of group.data) {
  //       if (course.label === courseTitle) {
  //         return group.course_group;
  //       }
  //     }
  //   }
  //   // Return a default group if the course title doesn't match any data label
  //   return 'Other';
  // };
  
  const getCourseGroup = (courseTitle) => {
    for (const group of course_sections) {
      if (group.data.some(course => course.label === courseTitle)) {
        return group.course_group;
      }
    }
    // Return a default group if the course title doesn't match any data label
    return 'Other';
  };
  

  const organizeDataByCourseGroups = (academicData) => {
    const groupedData = {};
    
    academicData.forEach((data) => {
      const courseGroup = getCourseGroup(data.courseTitle);
      if (!groupedData[courseGroup]) {
        groupedData[courseGroup] = [];
      }
      groupedData[courseGroup].push(data);
    });
    
    return groupedData;
  };
  
  // Call this function and set the result to state
  const groupedAcademicData = organizeDataByCourseGroups(processedAcademicData);
  

  return (
    <div className="container-fluid bg-light">
      {pinModalVisible && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Enter PIN</Card.Title>
            <Form.Control
              className="custom-form-control p-4"
              type="text"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
            />
            <Form.Group controlId="formNameFilter" className="custom-form-control pt-5 text-center">
              <Button variant="primary" onClick={handlePinSubmit} className="custom-form-control btn-lg btn-12">
                Submit
              </Button>
            </Form.Group>
          </Card.Body>
        </Card>
      )}
      {filterCardVisible && (
       
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
              <Form.Group controlId="formTerms">
                <Form.Label>Level:</Form.Label>
                <CustomPicker
                  options={Array.from(new Set(examRecords.map((record) => record.level)))}
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
                  value={registraterNumber}
                  onChange={(e) => setRegistraterNumber(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" onClick={handleFilterSubmit}>
            View Result
          </Button>
        </Card.Body>
      </Card>
      )}
      {resultTableVisible && (
    
        <div className="container-fluid mb-4 h-100 ">
        <div className="card-header py-3 d-flex justify-content-center">
          <div className="result-sheet">
          {selectedComponent || level === 'Pre-Nursery'  ? (
                // <>{selectedComponent}</>
                <>
                  <div className="container-fluid mb-4 h-100">
                <div className="card card-body">
                  <div className="row">
                    <div className="col">
                               
            <div className="header">
              <div className="logo text-center">
                <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{ width: 180, height: 180 }} />
              </div>
              <div className="school-name mb-4 h-100 bg-primary justify-content-center text-light">
                <h1 className='mb-5 text-center text-bold'>THE FLORAL SCHOOL NURSERY &amp; PRIMARY SCHOOL</h1>
                <p className='text-white text-center text-bold'>12 Moses Emeya Close Off Social Club Road New Oko Oba</p>
                <p className='text-white text-center text-bold'>Motto: Believe-Achieve-Succeed</p>
                <p className='text-primary text-center text-bold'>info@perfectangelsschool.com.ng</p>
              </div>
            </div>
                      <div className="first-term-wrapper mt-4 mx-3 mb-0">
                          <h2 className='text-white bg-primary'>2023-2024 SESSION FIRST TERM REPORT SHEET</h2>
                          <div className="first-term-tables d-flex  justify-content-between">
                            <table className="personal-data mr-2 ml-0 mb-5 bg-light rounded-circle" border={1} >
                              <tbody className='border-primary rounded-circle'>
                                <tr>
                                  <th colSpan={2} className='text-white bg-primary ml-0'>STUDENT'S PERSONAL DATA</th>
                                </tr>
                                <tr>
                                  <td>Name</td>
                                  <td className='px-5'>{studentDetails.studentName}</td>
                                </tr>
                                <tr>
                                  <td>Date Of Birth</td>
                                  <td className='px-5'>{studentDetails.dob}</td>
                                </tr>
                                <tr>
                                  <td>Sex</td>
                                  <td className='px-5'>{studentDetails.sex}</td>
                                </tr>
                                <tr>
                                  <td>Class</td>
                                  <td className='px-5'>{studentDetails.level}</td>
                                </tr>
                                <tr>
                                  <td>Admission No.</td>
                                  <td className='px-5'>{studentDetails.registerNumber}</td>
                                </tr>
                                <tr>
                                  <td>Term.</td>
                                  <td className='px-5'>{studentDetails.terms}</td>
                                </tr>
                              </tbody>
                            </table>
                            <table>
                              <div className="col-sm-12">
                              <img
                                className="sidebar-card-illustration mb-2"
                                src={studentDetails.imagePath || 'img/default-student-image.jpg'}
                                alt="Student"
                                style={{ width: 200, height: 200, borderRadius: 100 }}
                              />
                                {/* <img className="sidebar-card-illustration mb-2" src="img/happy-student.jpg" alt="..." style={{ width: 200, height: 200, borderRadius: 100 }} /> */}
                              </div>
                            </table>
                          </div>
                        </div>
                      <div className="card">
                        <div className="card-header bg-primary text-white text-center">
                          <h4 className="font-weight-bold">Preschool Result Sheet</h4>
                          <h5 className="font-weight-bold">Name: {studentDetails.studentName}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                 



<div className="card col-12 col-sm-12">
 
  <div className="card-body">
    {Object.keys(groupedAcademicData).map((courseGroup) => (
      <div key={courseGroup}>
        <div className="d-flex row font-weight-bold bg-primary card-header bg-primary text-white">
        <div className="col-4 font-weight-bold ">{courseGroup}</div>
        <div className="col-4 font-weight-bold">Grade</div>
      <div className="col-4 font-weight-bold">Remark</div>
      </div>
        {groupedAcademicData[courseGroup].map((data, index) => (
          <div key={index} className="row mb-1">
            <div className="col-sm-4">{data.courseTitle}</div>
            <div className="col-sm-4 font-weight-bold">{data.grade}</div>
            <div className="col-4 font-weight-bold">{data.remarks}</div>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>
</div>

                  </div>

                </>
              ) : (
                <>
                 
            <div className="header">
              <div className="logo text-center">
                <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{ width: 180, height: 180 }} />
              </div>
              <div className="school-name mb-4 h-100 bg-primary justify-content-center text-light">
                <h1 className='mb-5 text-center text-bold'>THE FLORAL SCHOOL NURSERY &amp; PRIMARY SCHOOL</h1>
                <p className='text-white text-center text-bold'>12 Moses Emeya Close Off Social Club Road New Oko Oba</p>
                <p className='text-white text-center text-bold'>Motto: Believe-Achieve-Succeed</p>
                <p className='text-primary text-center text-bold'>info@perfectangelsschool.com.ng</p>
              </div>
            </div>
            <div className="first-term-wrapper mt-4 mx-3 mb-0">
              <h2 className='text-white bg-primary'>2023-2024 SESSION FIRST TERM REPORT SHEET</h2>
              <div className="first-term-tables d-flex  justify-content-between">
                <table className="personal-data mr-2 ml-0 mb-5 bg-light rounded-circle" border={1} >
                  <tbody className='border-primary rounded-circle'>
                    <tr>
                      <th colSpan={2} className='text-white bg-primary ml-0'>STUDENT'S PERSONAL DATA</th>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td className='px-5'>{studentDetails.studentName}</td>
                    </tr>
                    <tr>
                      <td>Date Of Birth</td>
                      <td className='px-5'>{studentDetails.dob}</td>
                    </tr>
                    <tr>
                      <td>Sex</td>
                      <td className='px-5'>{studentDetails.sex}</td>
                    </tr>
                    <tr>
                      <td>Class</td>
                      <td className='px-5'>{studentDetails.level}</td>
                    </tr>
                    <tr>
                      <td>Admission No.</td>
                      <td className='px-5'>{studentDetails.registerNumber}</td>
                    </tr>
                    <tr>
                      <td>Term.</td>
                      <td className='px-5'>{studentDetails.terms}</td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <div className="col-sm-12">
                  <img
                    className="sidebar-card-illustration mb-2"
                    src={studentDetails.imagePath || 'img/default-student-image.jpg'}
                    alt="Student"
                    style={{ width: 200, height: 200, borderRadius: 100 }}
                  />
                    {/* <img className="sidebar-card-illustration mb-2" src="img/happy-student.jpg" alt="..." style={{ width: 200, height: 200, borderRadius: 100 }} /> */}
                  </div>
                </table>
              </div>
            </div>
            <table className="academic-performance-table" border={1}>
              <tbody>
                <tr>
                  <th colSpan={11} className="text-white bg-primary p-5 text-center">
                    ACADEMIC PERFORMANCE
                  </th>
                </tr>
                <tr className="subject">
                  <th rowSpan={2} className="subject-heading">
                    SUBJECT
                  </th>
                  <th>CA</th>
                  <th>EXAM</th>
                  <th>TOTAL SCORE</th>
                  <th>CUM. TOTAL SCORE</th>
                  <th>PERCEN-TAGE</th>
                  <th>CLASS AVERAGE</th>
                  <th>REMARKS</th>
                  <th>GRADE</th>
                  <th>CLASS HIGHEST</th>
                  <th>CLASS LOWEST</th>
                </tr>
                <tr>
                  <th className='p-3 bg-primary text-light'>40</th>
                  <th className='p-3 bg-primary text-light'>60</th>
                  <th className='p-3 bg-primary text-light'>100</th>
                </tr>
                {processedAcademicData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.courseTitle}</td>
                    <td>{data.ca}</td>
                    <td>{data.exam}</td>
                    <td>{data.totalScore}</td>
                    <td>{data.cumulativeTotalScore}</td>
                    <td>{data.percentage.toFixed(2)}%</td>
                    <td>{classAverage.toFixed(2)}</td>
                    <td>{data.remarks}</td>
                    <td>{data.grade}</td>
                    <td>
                      {/* {classHighest.HscoreS} */}
                      
                      </td>
                    <td>
                      {/* {classLowest.HscoreS} */}
                     </td>
                  </tr>
                ))}
              </tbody>
            </table>
                </>
              )}
          </div>
         
        </div>
      </div>
      )}
      <>
       <div className="text-center mt-3">
                {/* New: Print Button */}
                <Button variant="secondary" onClick={handlePrint} className="custom-form-control btn-lg btn-12 d-print-none">
                  Print Result
                </Button>
      </div>
      </>
    </div>
  );
};

export default ResultSheet;





// import React, { useEffect, useState, useCallback } from 'react';
// import { Card, Form, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// const ResultSheet = () => {
//   const [pin, setPin] = useState('');
//   const [pinModalVisible, setPinModalVisible] = useState(true);
//   const [showFilterCard, setShowFilterCard] = useState(false);
//   const [showResultTable, setShowResultTable] = useState(false);
//   const [levels, setLevels] = useState(['Preschool', 'Nursery', 'Primary', 'Secondary']);
//   const [level, setLevel] = useState('');
//   const [selectedYear, setSelectedYear] = useState('');
//   const [academicData, setAcademicData] = useState([]);
//   const [studentDetails, setStudentDetails] = useState({});
//   const [registraterNumber, setRegistraterNumber] = useState('');
//   const [filterResults, setFilterResults] = useState([]);

//   const handleLevelChange = (value) => {
//     setLevel(value);
//   };

//   const handlePinChange = (value) => {
//     setPin(value);
//   };

//   const fetchData = useCallback(async () => {
//     try {
//       // Fetch exam records based on the stored registration number
//       const storedExamRecords = JSON.parse(localStorage.getItem('examRecords')) || [];
//       const foundExamRecords = storedExamRecords.filter((record) => record.registerNumber === registraterNumber);
//       setAcademicData(foundExamRecords);

//       // Fetch student details based on the stored registration number
//       const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
//       const foundStudent = storedStudents.find((student) => student.registerNumber === registraterNumber);

//       if (foundStudent) {
//         setStudentDetails(foundStudent);
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Student Not Found',
//           text: 'Student details not found in local storage.',
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching data.',
//       });
//     }
//   }, [registraterNumber]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handlePinSubmit = async () => {
//     // Retrieve PIN from local storage for verification
//     const storedPin = localStorage.getItem('pin');

//     if (pin === storedPin) {
//       // PIN verified successfully, show the Filter Card
//       setPinModalVisible(false);
//       setShowFilterCard(true);
//     } else {
//       // PIN verification failed, show an error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid PIN',
//         text: 'Please enter a valid PIN.',
//       });
//     }
//   };

//   const handleFilterSubmit = () => {
//     // Perform filtering logic based on selected level, year, and registration number
//     const filteredResults = academicData.filter((data) => {
//       return data.level === level && data.year === selectedYear && data.registerNumber === registraterNumber;
//     });

//     // Update state with filtered results
//     setFilterResults(filteredResults);

//     // Show the Result Table if there are filtered results
//     setShowResultTable(filteredResults.length > 0);
//   };


//   // Calculations
// const calculateTotalScore = (data) => {
//   return data.reduce((total, subjectData) => {
//     const subjectTotal = subjectData.ca + subjectData.exam;
//     return total + subjectTotal;
//   }, 0);
// };

// const calculateCumulativeTotalScore = (data) => {
//   return data.reduce((cumulativeTotal, subjectData) => {
//     const subjectTotal = subjectData.ca + subjectData.exam;
//     return cumulativeTotal + subjectTotal;
//   }, 0);
// };

// const calculatePercentage = (totalScore, maxScore, dataLength) => {
//   return (totalScore / (maxScore * 2 * dataLength)) * 100;
// };

// const calculateClassAverage = (data) => {
//   const classTotalScore = calculateTotalScore(data);
//   return classTotalScore / data.length;
// };

// const findClassExtreme = (data, comparator) => {
//   if (data && data.length > 0) {
//     let extreme = data[0].ca + data[0].exam;
//     let extremeSubject = data[0].subject;

//     for (let i = 1; i < data.length; i++) {
//       const subjectTotal = data[i].ca + data[i].exam;
//       if (comparator(subjectTotal, extreme)) {
//         extreme = subjectTotal;
//         extremeSubject = data[i].subject;
//       }
//     }
//     return { extreme, subject: extremeSubject };
//   } else {
//     console.error('Error: data or data.length is undefined or empty');
//     return { extreme: 0, subject: 'N/A' };
//   }
// };

// // Function to determine remarks based on percentage
// const determineRemarks = (percentage) => {
//   // Adjust the threshold values as needed
//   if (percentage >= 90) return 'OUTSTANDING';
//   if (percentage >= 80) return 'EXCELLENT';
//   if (percentage >= 70) return 'VERY GOOD';
//   if (percentage >= 60) return 'GOOD';
//   if (percentage >= 50) return 'AVERAGE';
//   if (percentage >= 40) return 'BELOW AVERAGE';
//   return 'POOR';
// };

// // Function to determine grade based on percentage
// const determineGrade = (percentage) => {
//   // Adjust the threshold values as needed
//   if (percentage >= 90) return 'A+';
//   if (percentage >= 80) return 'A';
//   if (percentage >= 70) return 'B';
//   if (percentage >= 60) return 'C';
//   if (percentage >= 50) return 'D';
//   if (percentage >= 40) return 'E';
//   return 'F';
// };

// // Calculations
// const totalScore = calculateTotalScore(academicData);
// const cumulativeTotalScore = calculateCumulativeTotalScore(academicData);
// const totalPercentage = calculatePercentage(totalScore, 100, academicData.length);
// const classAverage = calculateClassAverage(academicData);
// const classHighest = findClassExtreme(academicData, Math.max);
// const classLowest = findClassExtreme(academicData, Math.min);

// // Process academic data (add remarks, grades, etc.)
// const processedAcademicData = academicData.map((data) => ({
//   ...data,
//   totalScore: data.ca + data.exam,
//   cumulativeTotalScore: data.ca + data.exam,
//   percentage: (data.ca + data.exam) / (40 + 60) * 100,
//   remarks: determineRemarks((data.ca + data.exam) / (40 + 60) * 100),
//   grade: determineGrade((data.ca + data.exam) / (40 + 60) * 100),
// }));

//   return (
//     <div className="container-fluid bg-light">
//       {pinModalVisible && (
//         <Card className="mb-3">
//           <Card.Body>
//             <Card.Title>Enter PIN</Card.Title>
//             <Form.Control
//               className="custom-form-control p-4"
//               type="text"
//               placeholder="Enter PIN"
//               value={pin}
//               onChange={(e) => handlePinChange(e.target.value)}
//             />
//             <Form.Group controlId="formNameFilter" className="custom-form-control pt-5 text-center">
//               <Button variant="primary" onClick={handlePinSubmit} className="custom-form-control btn-lg btn-12">
//                 Submit
//               </Button>
//             </Form.Group>
//           </Card.Body>
//         </Card>
//       )}

//       {showFilterCard && (
//         <Card className="mb-3">
//           <Card.Body>
//             <Card.Title>Filters</Card.Title>
//             <Form>
//               <Form.Group controlId="formLevelFilter">
//                 <Form.Label>Level</Form.Label>
//                 <Form.Control
//                   as="select"
//                   className="custom-select custom-select-lg"
//                   value={level}
//                   onChange={(e) => handleLevelChange(e.target.value)}
//                 >
//                   <option value="">Select Level</option>
//                   {levels.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </Form.Control>
//               </Form.Group>

//               <Form.Group controlId="formYearFilter">
//                 <Form.Label>Year</Form.Label>
//                 {/* Add your Year selection logic here */}
//                 <Form.Control
//                   as="select"
//                   className="custom-select custom-select-lg"
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                 >
//                   <option value="">Select Year</option>
//                   {/* Add your options for the Year dropdown */}
//                 </Form.Control>
//               </Form.Group>

//               <Form.Group controlId="formFilterSubmit" className="text-center">
//                 <Button
//                   variant="primary"
//                   onClick={handleFilterSubmit}
//                   className="custom-form-control btn-lg btn-12"
//                 >
//                   Apply Filters
//                 </Button>
//               </Form.Group>
//             </Form>
//           </Card.Body>
//         </Card>
//       )}

    
//       {showResultTable && (
//   <div className="card shadow mb-4">
//     <div className="card-header py-3 d-flex justify-content-center">
//       <div className="result-sheet">
//         {/* ... (Header and personal data rendering logic) */}
//         <table className="academic-performance-table" border={1}>
//           <tbody>
//             <tr>
//               <th colSpan={11} className="text-white bg-primary p-5 text-center">
//                 ACADEMIC PERFORMANCE
//               </th>
//             </tr>
//             <tr className="subject">
//               <th rowSpan={2} className="subject-heading">
//                 SUBJECT
//               </th>
//               <th>CA</th>
//               <th>EXAM</th>
//               <th>TOTAL SCORE</th>
//               <th>CUM. TOTAL SCORE</th>
//               <th>PERCENTAGE</th>
//               <th>CLASS AVERAGE</th>
//               <th>REMARKS</th>
//               <th>GRADE</th>
//               <th>CLASS HIGHEST</th>
//               <th>CLASS LOWEST</th>
//             </tr>
//             <tr>
//               <th className="p-3 bg-primary text-light">40</th>
//               <th className="p-3 bg-primary text-light">60</th>
//               <th className="p-3 bg-primary text-light">100</th>
//             </tr>
//             {filterResults.map((data, index) => (
//               <tr key={index}>
//                 <td>{data.courseTitle}</td>
//                 <td>{data.ca}</td>
//                 <td>{data.exam}</td>
//                 <td>{data.totalScore}</td>
//                 <td>{data.cumulativeTotalScore}</td>
//                 <td>{data.percentage.toFixed(2)}%</td>
//                 <td>{classAverage.toFixed(2)}</td>
//                 <td>{data.remarks}</td>
//                 <td>{data.grade}</td>
//                 <td>{/* Render classHighest.HscoreS here */}</td>
//                 <td>{/* Render classLowest.HscoreS here */}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default ResultSheet;


// import axios from 'axios';
// import React, { useEffect, useState, useCallback } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
// import PreschoolResultTable from './../constant/PreschoolResultTable';
// import Swal from 'sweetalert2';


// const CustomPicker = ({ options, selectedValue, onValueChange, placeholder }) => (
//   <Form.Group controlId="formCourseTitleFilter">
//   <Form.Control
 
//   as="select"
//   className="custom-select custom-select-lg"
//     value={selectedValue}
//     onChange={(e) => onValueChange(e.target.value)}
//   >
//     <option value="">{placeholder}</option>
//     {options.map((option) => (
//       <option key={option} value={option}>
//         {option}
//       </option>
//     ))}
//   </Form.Control>
//   </Form.Group>
// );


// const ResultSheet = () => {
//   const baseUrl = 'http://localhost:8080/api/exam-records';
//   // const [pin, setPin] = useState('');
//   // const [pinModalVisible, setPinModalVisible] = useState(true);
//   // const [selectedComponent, setSelectedComponent] = useState(null);
//   // const [showAlert, setShowAlert] = useState(true);
//   // const [levels, setLevels] = useState(['Preschool', 'Nursery', 'Primary', 'Secondary']);
//   // const [level, setLevel] = useState('');
//   const [academicData, setAcademicData] = useState([]);
//   const [studentDetails, setStudentDetails] = useState({});
//   const [registraterNumber, setRegistraterNumber] = useState('');


//   const [session, setSession] = useState('');
//   const [showTable, setShowTable] = useState(false);
//   const [showAlert, setShowAlert] = useState(true);
//   const [department, setDepartment] = useState('');
//   const [level, setLevel] = useState('');
//   const [pin, setPin] = useState('');
//   const [pinModalVisible, setPinModalVisible] = useState(true);
//   const [levels, setLevels] = useState(['Preschool', 'Nursery', 'Primary', 'Secondary']);
//   const [selectedComponent, setSelectedComponent] = useState(null);
//   const [terms, setTerms] =useState('');
//   const [year, setYear] = useState('');




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
  
  
//     const handleRegistrationNumberChange = (value) => {
//       setRegistraterNumber(value);
//       // setMatricNumber(value);
//     };
  
//     const handleTermsChange = (value) => {
//       setTerms(value);
//     };
  
//     const handleYearChange = (value) => {
//       setYear(value);
//     };
    
//     const handleLevelChange = (value) => {
//       setYear(value);
//     };
  
//     const handleViewResult = () => {
//       if (!terms || !year || !registraterNumber) {
//         alert('Please fill in all the required fields.');
//         return;
//       }
  
//       const filteredResults = filteredAcademicData.filter(
//         (result) =>
//           result.registerNumber.toLowerCase() === registraterNumber.toLowerCase()
//           //  ||
//           // result.matricNumber.toLowerCase() === matricNumber.toLowerCase()
//       );
  
//       if (filteredResults.length === 0) {
//         alert('No results found. Please review your entries.');
//       } else {
//         const { department, level } = filteredResults[0];
//         setDepartment(department);
//         setLevel(level);
//         setShowTable(true);
//       }
//     };
  
//     const handleCloseAlert = () => {
//       setShowAlert(false);
//     };
  
//     // const filteredRegistrationResults = studentResults.filter(
//     //   (result) =>
//     //     (!registerNumber || result.registerNumber === registerNumber) &&
//     //     (!terms || result.terms.toLowerCase() === terms.toLowerCase()) &&
//     //     (!year || result.year === year)
//     // );
  
 
  
//   const fetchData = useCallback(async () => {
//     try {
//       // Fetch exam records based on the stored registration number
//       const storedExamRecords = JSON.parse(localStorage.getItem('examRecords')) || [];
//       const foundExamRecords = storedExamRecords.filter(record => record.registerNumber === registraterNumber);
//       setAcademicData(foundExamRecords);

//       // Fetch student details based on the stored registration number
//       const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
//       const foundStudent = storedStudents.find(student => student.registerNumber === registraterNumber);

//       if (foundStudent) {
//         setStudentDetails(foundStudent);
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Student Not Found',
//           text: 'Student details not found in local storage.',
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching data.',
//       });
//     }
//   }, [registraterNumber]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);


//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       // Fetch exam records based on the stored registration number
//   //       const storedExamRecords = JSON.parse(localStorage.getItem('examRecords')) || [];
//   //       const foundExamRecords = storedExamRecords.filter(record => record.registraterNumber === registraterNumber);
//   //       setAcademicData(foundExamRecords);

//   //       // Fetch student details based on the stored registration number
//   //       const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
//   //       const foundStudent = storedStudents.find(student => student.registerNumber === registraterNumber);

//   //       if (foundStudent) {
//   //         setStudentDetails(foundStudent);
//   //       } else {
//   //         Swal.fire({
//   //           icon: 'error',
//   //           title: 'Student Not Found',
//   //           text: 'Student details not found in local storage.',
//   //         });
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //       Swal.fire({
//   //         icon: 'error',
//   //         title: 'Error',
//   //         text: 'An error occurred while fetching data.',
//   //       });
//   //     }
//   //   };

//   //   fetchData();
//   // }, [registraterNumber]);

//   // const baseUrl = 'http://localhost:8080/api/exam-records';

//   // const [academicData, setAcademicData] = useState([]);
//   // const [studentDetails, setStudentDetails] = useState({});

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       // Fetch exam records from the storage
//   //       const storedExamRecords = JSON.parse(localStorage.getItem('examRecords')) || [];
//   //       setAcademicData(storedExamRecords);

//   //       // Fetch student details from the storage
//   //       const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
//   //       const registrationNumber = storedExamRecords.length > 0 ? storedExamRecords[0].registrationNumber : '';
//   //       const foundStudent = storedStudents.find(student => student.registerNumber === registrationNumber);

//   //       if (foundStudent) {
//   //         setStudentDetails(foundStudent);
//   //       } else {
//   //         Swal.fire({
//   //           icon: 'error',
//   //           title: 'Student Not Found',
//   //           text: 'Student details not found in local storage.',
//   //         });
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //       Swal.fire({
//   //         icon: 'error',
//   //         title: 'Error',
//   //         text: 'An error occurred while fetching data.',
//   //       });
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);



// const calculateTotalScore = (data) => {
//   return data.reduce((total, subjectData) => {
//     const subjectTotal = subjectData.ca + subjectData.exam;
//     return total + subjectTotal;
//   }, 0);
// };

// const calculateCumulativeTotalScore = (data) => {
//   return data.reduce((cumulativeTotal, subjectData) => {
//     const subjectTotal = subjectData.ca + subjectData.exam;
//     return cumulativeTotal + subjectTotal;
//   }, 0);
// };

// const calculatePercentage = (totalScore, maxScore, dataLength) => {
//   return (totalScore / (maxScore * 2 * dataLength)) * 100;
// };

// const calculateClassAverage = (data) => {
//   const classTotalScore = calculateTotalScore(data);
//   return classTotalScore / data.length;
// };

// const findClassExtreme = (data, comparator) => {
 
//   if (data && data.ca) {

//     let extreme = data[0].ca + data[0].exam;
//     let extremeSubject = data[0].subject;
  
//     for (let i = 1; i < data.length; i++) {
//       const subjectTotal = data[i].ca + data[i].exam;
//       if (comparator(subjectTotal, extreme)) {
//         extreme = subjectTotal;
//         extremeSubject = data[i].subject;
//       }
//     }
//     return { extreme, subject: extremeSubject };
  
//   } else {
//     console.error('Error: data or data.ca is undefined');

//   }
// };

// // Function to determine remarks based on percentage
// const determineRemarks = (percentage) => {
//   // Adjust the threshold values as needed
//   if (percentage >= 90) return 'OUTSTANDING';
//   if (percentage >= 80) return 'EXCELLENT';
//   if (percentage >= 70) return 'VERY GOOD';
//   if (percentage >= 60) return 'GOOD';
//   if (percentage >= 50) return 'AVERAGE';
//   if (percentage >= 40) return 'BELOW AVERAGE';
//   return 'POOR';
// };

// // Function to determine grade based on percentage
// const determineGrade = (percentage) => {
//   // Adjust the threshold values as needed
//   if (percentage >= 90) return 'A+';
//   if (percentage >= 80) return 'A';
//   if (percentage >= 70) return 'B';
//   if (percentage >= 60) return 'C';
//   if (percentage >= 50) return 'D';
//   if (percentage >= 40) return 'E';
//   return 'F';
// };

// // Calculations
// const totalScore = calculateTotalScore(academicData);
// const cumulativeTotalScore = calculateCumulativeTotalScore(academicData);
// const totalPercentage = calculatePercentage(totalScore, 100, academicData.length);
// const classAverage = calculateClassAverage(academicData);
// const classHighest = findClassExtreme(academicData, Math.max);
// const classLowest = findClassExtreme(academicData, Math.min);

// // Process academic data (add remarks, grades, etc.)
// const processedAcademicData = academicData.map((data) => ({
//   ...data,
//   totalScore: data.ca + data.exam,
//   cumulativeTotalScore: data.ca + data.exam,
//   percentage: (data.ca + data.exam) / (40 + 60) * 100,
//   remarks: determineRemarks((data.ca + data.exam) / (40 + 60) * 100),
//   grade: determineGrade((data.ca + data.exam) / (40 + 60) * 100),
// }));





//   return (

// <Container fluid>
// {/* PIN Modal */}
// {showAlert && pinModalVisible && (
//   <Card className="alert-container">
//     <Card.Body>
//       <Card.Text>
//         Simply Enter Exam Pin Number, To Proceed To Result Checker Robot. Contact The Admin If You Have No Pin.
//       </Card.Text>
//       <Button variant="primary" onClick={handleCloseAlert}>
//         Close
//       </Button>
//     </Card.Body>
//   </Card>
// )}

// {/* PIN Card */}
// {pinModalVisible && (
//   <Card className="mb-3">
//     <Card.Body>
//       <Card.Title>Enter PIN</Card.Title>
//       <Form.Control
//        className='custom-form-control p-4'
//         type="text"
//         placeholder="Enter PIN"
//         value={registraterNumber}
//         onChange={(e) => setRegistraterNumber(e.target.value)}
//       />
//       <Form.Group controlId="formNameFilter" className='custom-form-control pt-5 text-center'>
//       <Button variant="primary" onClick={handlePinSubmit} className='custom-form-control btn-lg btn-12'>
//         Submit
//       </Button>

//       </Form.Group>
//     </Card.Body>
//   </Card>
// )}

// {/* Main Content */}
// {!pinModalVisible && (
//   <Row className="mb-3 col-sm-12 mx-2">
//   {showAlert && (
//     <Card className="alert-container col-12 m-3 mx-2 bg-secondary">
//       <Card.Body>
//         <Card.Text>
//           Simply Select Session and Term. Enter Your Registration Number To View Result.
//         </Card.Text>
//         <Button variant="primary" onClick={handleCloseAlert}>
//           Close
//         </Button>
//       </Card.Body>
//     </Card>
//   )}

//   <Card className="mb-3 col-sm-12 mx-2 pt-4">
//     <Card.Body>
//       <Row className="mb-3">
//         <Col>
//           <Form.Group controlId="formSemester">
//             <Form.Label>Term:</Form.Label>
//             <CustomPicker
//               options={Array.from(new Set(academicData.map((result) => result.terms)))}
//               selectedValue={terms}
//               onValueChange={handleTermsChange}
//               placeholder="Select Semester"
//             />
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group controlId="formSession">
//             <Form.Label>Exam Year:</Form.Label>
//             <CustomPicker
//               options={Array.from(new Set(academicData.map((result) => result.year)))}
//               selectedValue={year}
//               onValueChange={handleYearChange}
//               placeholder="Select Session"
//             />
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group controlId="formLevel">
//             <Form.Label>Class:</Form.Label>
//             <CustomPicker
//               options={levels}
//               selectedValue={level}
//               onValueChange={handleLevelChange}
//               placeholder="Select Level"
//             />
//           </Form.Group>
//         </Col>
//       </Row>
//       <Row className="mb-3">
//         <Col>
//           <Form.Group controlId="formRegistrationNumber">
//             <Form.Label>Student Registration Number:</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter registration number"
//               value={registraterNumber}
//               onChange={(e) => handleRegistrationNumberChange(e.target.value)}
//             />
//           </Form.Group>
//         </Col>
//       </Row>
//       <Button variant="primary" onClick={handleViewResult}>
//         View Result
//       </Button>
//     </Card.Body>
//   </Card>
//     {selectedComponent ? (
//       selectedComponent
//     ) : (
//       showTable && (
//         <Card className='col-sm-12'>
//           <Card.Body>
//             <Card.Title>Session: {department}</Card.Title>
//             <Card.Title>Class: {level}</Card.Title>
//             {/* <Table striped bordered responsive className='col-sm-12'> */}
//             <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-center">
//           <div className="result-sheet">
//             <div className="header">
//               <div className="logo text-center">
//                 <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{ width: 180, height: 180 }} />
//               </div>
//               <div className="school-name mb-4 h-100 bg-primary justify-content-center text-light">
//                 <h1 className='mb-5 text-center text-bold'>THE FLORAL SCHOOL NURSERY &amp; PRIMARY SCHOOL</h1>
//                 <p className='text-white text-center text-bold'>12 Moses Emeya Close Off Social Club Road New Oko Oba</p>
//                 <p className='text-white text-center text-bold'>Motto: Believe-Achieve-Succeed</p>
//                 <p className='text-primary text-center text-bold'>info@perfectangelsschool.com.ng</p>
//               </div>
//             </div>
//             <div className="first-term-wrapper mt-4 mx-3 mb-0">
//               <h2 className='text-white bg-primary'>2023-2024 SESSION FIRST TERM REPORT SHEET</h2>
//               <div className="first-term-tables d-flex  justify-content-between">
//                 <table className="personal-data mr-2 ml-0 mb-5 bg-light rounded-circle" border={1} >
//                   <tbody className='border-primary rounded-circle'>
//                     <tr>
//                       <th colSpan={2} className='text-white bg-primary ml-0'>STUDENT'S PERSONAL DATA</th>
//                     </tr>
//                     <tr>
//                       <td>Name</td>
//                       <td className='px-5'>{studentDetails.studentName}</td>
//                     </tr>
//                     <tr>
//                       <td>Date Of Birth</td>
//                       <td className='px-5'>{studentDetails.dob}</td>
//                     </tr>
//                     <tr>
//                       <td>Sex</td>
//                       <td className='px-5'>{studentDetails.sex}</td>
//                     </tr>
//                     <tr>
//                       <td>Class</td>
//                       <td className='px-5'>{studentDetails.level}</td>
//                     </tr>
//                     <tr>
//                       <td>Admission No.</td>
//                       <td className='px-5'>{studentDetails.registerNumber}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <table>
//                   <div className="col-sm-12">
//                     <img className="sidebar-card-illustration mb-2" src="img/happy-student.jpg" alt="..." style={{ width: 200, height: 200, borderRadius: 100 }} />
//                   </div>
//                 </table>
//               </div>
//             </div>
//             <table className="academic-performance-table" border={1}>
//               <tbody>
//                 <tr>
//                   <th colSpan={11} className="text-white bg-primary p-5 text-center">
//                     ACADEMIC PERFORMANCE
//                   </th>
//                 </tr>
//                 <tr className="subject">
//                   <th rowSpan={2} className="subject-heading">
//                     SUBJECT
//                   </th>
//                   <th>CA</th>
//                   <th>EXAM</th>
//                   <th>TOTAL SCORE</th>
//                   <th>CUM. TOTAL SCORE</th>
//                   <th>PERCEN-TAGE</th>
//                   <th>CLASS AVERAGE</th>
//                   <th>REMARKS</th>
//                   <th>GRADE</th>
//                   <th>CLASS HIGHEST</th>
//                   <th>CLASS LOWEST</th>
//                 </tr>
//                 <tr>
//                   <th className='p-3 bg-primary text-light'>40</th>
//                   <th className='p-3 bg-primary text-light'>60</th>
//                   <th className='p-3 bg-primary text-light'>100</th>
//                 </tr>
//                 {processedAcademicData.map((data, index) => (
//                   <tr key={index}>
//                     <td>{data.courseTitle}</td>
//                     <td>{data.ca}</td>
//                     <td>{data.exam}</td>
//                     <td>{data.totalScore}</td>
//                     <td>{data.cumulativeTotalScore}</td>
//                     <td>{data.percentage.toFixed(2)}%</td>
//                     <td>{classAverage.toFixed(2)}</td>
//                     <td>{data.remarks}</td>
//                     <td>{data.grade}</td>
//                     <td>
//                       {/* {classHighest.HscoreS} */}
                      
//                       </td>
//                     <td>
//                       {/* {classLowest.HscoreS} */}
//                      </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//             {/* </Table> */}
//           </Card.Body>
//         </Card>
//       )
//     )}
    
//   </Row>
// )}

// {selectedComponent ? (
//       selectedComponent
//     ) : (
//       showTable && (
//   <Card>
//   <div 
//       type="text"
//       className='custom-form-control bg-light'
//   style={{ margin: 30, marginBottom: 30 }}>
//       <p>Remark:</p>
//       <p></p>
//       </div>
//   </Card>

//       ))}
// </Container>
//   );
// };

// export default ResultSheet;


// import axios from 'axios';
// import React, { useEffect, useState, useCallback } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
// import PreschoolResultTable from './../constant/PreschoolResultTable';
// import Swal from 'sweetalert2';


// const CustomPicker = ({ options, selectedValue, onValueChange, placeholder }) => (
//   <Form.Group controlId="formCourseTitleFilter">
//   <Form.Control
 
//   as="select"
//   className="custom-select custom-select-lg"
//     value={selectedValue}
//     onChange={(e) => onValueChange(e.target.value)}
//   >
//     <option value="">{placeholder}</option>
//     {options.map((option) => (
//       <option key={option} value={option}>
//         {option}
//       </option>
//     ))}
//   </Form.Control>
//   </Form.Group>
// );


// const ResultSheet = () => {
//   const baseUrl = 'http://localhost:8080/api/exam-records';
//   const [pin, setPin] = useState('');
//   const [pinModalVisible, setPinModalVisible] = useState(true);
//   const [selectedComponent, setSelectedComponent] = useState(null);
//   const [showAlert, setShowAlert] = useState(true);
//   const [levels, setLevels] = useState(['Preschool', 'Nursery', 'Primary', 'Secondary']);
//   const [level, setLevel] = useState('');
//   const [academicData, setAcademicData] = useState([]);
//   const [studentDetails, setStudentDetails] = useState({});
//   const [registraterNumber, setRegistraterNumber] = useState('');

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

  
//   const fetchData = useCallback(async () => {
//     try {
//       // Fetch exam records based on the stored registration number
//       const storedExamRecords = JSON.parse(localStorage.getItem('examRecords')) || [];
//       const foundExamRecords = storedExamRecords.filter(record => record.registerNumber === registraterNumber);
//       setAcademicData(foundExamRecords);

//       // Fetch student details based on the stored registration number
//       const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
//       const foundStudent = storedStudents.find(student => student.registerNumber === registraterNumber);

//       if (foundStudent) {
//         setStudentDetails(foundStudent);
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Student Not Found',
//           text: 'Student details not found in local storage.',
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching data.',
//       });
//     }
//   }, [registraterNumber]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);



// const calculateTotalScore = (data) => {
//   return data.reduce((total, subjectData) => {
//     const subjectTotal = subjectData.ca + subjectData.exam;
//     return total + subjectTotal;
//   }, 0);
// };

// const calculateCumulativeTotalScore = (data) => {
//   return data.reduce((cumulativeTotal, subjectData) => {
//     const subjectTotal = subjectData.ca + subjectData.exam;
//     return cumulativeTotal + subjectTotal;
//   }, 0);
// };

// const calculatePercentage = (totalScore, maxScore, dataLength) => {
//   return (totalScore / (maxScore * 2 * dataLength)) * 100;
// };

// const calculateClassAverage = (data) => {
//   const classTotalScore = calculateTotalScore(data);
//   return classTotalScore / data.length;
// };

// const findClassExtreme = (data, comparator) => {
 
//   if (data && data.ca) {

//     let extreme = data[0].ca + data[0].exam;
//     let extremeSubject = data[0].subject;
  
//     for (let i = 1; i < data.length; i++) {
//       const subjectTotal = data[i].ca + data[i].exam;
//       if (comparator(subjectTotal, extreme)) {
//         extreme = subjectTotal;
//         extremeSubject = data[i].subject;
//       }
//     }
//     return { extreme, subject: extremeSubject };
  
//   } else {
//     console.error('Error: data or data.ca is undefined');

//   }
// };

// // Function to determine remarks based on percentage
// const determineRemarks = (percentage) => {
//   // Adjust the threshold values as needed
//   if (percentage >= 90) return 'OUTSTANDING';
//   if (percentage >= 80) return 'EXCELLENT';
//   if (percentage >= 70) return 'VERY GOOD';
//   if (percentage >= 60) return 'GOOD';
//   if (percentage >= 50) return 'AVERAGE';
//   if (percentage >= 40) return 'BELOW AVERAGE';
//   return 'POOR';
// };

// // Function to determine grade based on percentage
// const determineGrade = (percentage) => {
//   // Adjust the threshold values as needed
//   if (percentage >= 90) return 'A+';
//   if (percentage >= 80) return 'A';
//   if (percentage >= 70) return 'B';
//   if (percentage >= 60) return 'C';
//   if (percentage >= 50) return 'D';
//   if (percentage >= 40) return 'E';
//   return 'F';
// };

// // Calculations
// const totalScore = calculateTotalScore(academicData);
// const cumulativeTotalScore = calculateCumulativeTotalScore(academicData);
// const totalPercentage = calculatePercentage(totalScore, 100, academicData.length);
// const classAverage = calculateClassAverage(academicData);
// const classHighest = findClassExtreme(academicData, Math.max);
// const classLowest = findClassExtreme(academicData, Math.min);

// // Process academic data (add remarks, grades, etc.)
// const processedAcademicData = academicData.map((data) => ({
//   ...data,
//   totalScore: data.ca + data.exam,
//   cumulativeTotalScore: data.ca + data.exam,
//   percentage: (data.ca + data.exam) / (40 + 60) * 100,
//   remarks: determineRemarks((data.ca + data.exam) / (40 + 60) * 100),
//   grade: determineGrade((data.ca + data.exam) / (40 + 60) * 100),
// }));





//   return (
//     <div className="container-fluid bg-light">
//        <Card className="mb-3">
//               <Card.Body>
//                 <Card.Title>Enter PIN</Card.Title>
//                 <Form.Control
//                   className='custom-form-control p-4'
//                   type="text"
//                   placeholder="Enter PIN"
//                   value={registraterNumber}
//                   onChange={(e) => setRegistraterNumber(e.target.value)}
//                 />
//                 <Form.Group controlId="formNameFilter" className='custom-form-control pt-5 text-center'>
//                   <Button variant="primary" onClick={() => fetchData()} className='custom-form-control btn-lg btn-12'>
//                     Submit
//                   </Button>
//                 </Form.Group>
//               </Card.Body>
//             </Card>
      // <div className="card shadow mb-4">
      //   <div className="card-header py-3 d-flex justify-content-center">
      //     <div className="result-sheet">
      //       <div className="header">
      //         <div className="logo text-center">
      //           <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{ width: 180, height: 180 }} />
      //         </div>
      //         <div className="school-name mb-4 h-100 bg-primary justify-content-center text-light">
      //           <h1 className='mb-5 text-center text-bold'>THE FLORAL SCHOOL NURSERY &amp; PRIMARY SCHOOL</h1>
      //           <p className='text-white text-center text-bold'>12 Moses Emeya Close Off Social Club Road New Oko Oba</p>
      //           <p className='text-white text-center text-bold'>Motto: Believe-Achieve-Succeed</p>
      //           <p className='text-primary text-center text-bold'>info@perfectangelsschool.com.ng</p>
      //         </div>
      //       </div>
      //       <div className="first-term-wrapper mt-4 mx-3 mb-0">
      //         <h2 className='text-white bg-primary'>2023-2024 SESSION FIRST TERM REPORT SHEET</h2>
      //         <div className="first-term-tables d-flex  justify-content-between">
      //           <table className="personal-data mr-2 ml-0 mb-5 bg-light rounded-circle" border={1} >
      //             <tbody className='border-primary rounded-circle'>
      //               <tr>
      //                 <th colSpan={2} className='text-white bg-primary ml-0'>STUDENT'S PERSONAL DATA</th>
      //               </tr>
      //               <tr>
      //                 <td>Name</td>
      //                 <td className='px-5'>{studentDetails.studentName}</td>
      //               </tr>
      //               <tr>
      //                 <td>Date Of Birth</td>
      //                 <td className='px-5'>{studentDetails.dob}</td>
      //               </tr>
      //               <tr>
      //                 <td>Sex</td>
      //                 <td className='px-5'>{studentDetails.sex}</td>
      //               </tr>
      //               <tr>
      //                 <td>Class</td>
      //                 <td className='px-5'>{studentDetails.level}</td>
      //               </tr>
      //               <tr>
      //                 <td>Admission No.</td>
      //                 <td className='px-5'>{studentDetails.registerNumber}</td>
      //               </tr>
      //             </tbody>
      //           </table>
      //           <table>
      //             <div className="col-sm-12">
      //               <img className="sidebar-card-illustration mb-2" src="img/happy-student.jpg" alt="..." style={{ width: 200, height: 200, borderRadius: 100 }} />
      //             </div>
      //           </table>
      //         </div>
      //       </div>
      //       <table className="academic-performance-table" border={1}>
      //         <tbody>
      //           <tr>
      //             <th colSpan={11} className="text-white bg-primary p-5 text-center">
      //               ACADEMIC PERFORMANCE
      //             </th>
      //           </tr>
      //           <tr className="subject">
      //             <th rowSpan={2} className="subject-heading">
      //               SUBJECT
      //             </th>
      //             <th>CA</th>
      //             <th>EXAM</th>
      //             <th>TOTAL SCORE</th>
      //             <th>CUM. TOTAL SCORE</th>
      //             <th>PERCEN-TAGE</th>
      //             <th>CLASS AVERAGE</th>
      //             <th>REMARKS</th>
      //             <th>GRADE</th>
      //             <th>CLASS HIGHEST</th>
      //             <th>CLASS LOWEST</th>
      //           </tr>
      //           <tr>
      //             <th className='p-3 bg-primary text-light'>40</th>
      //             <th className='p-3 bg-primary text-light'>60</th>
      //             <th className='p-3 bg-primary text-light'>100</th>
      //           </tr>
      //           {processedAcademicData.map((data, index) => (
      //             <tr key={index}>
      //               <td>{data.courseTitle}</td>
      //               <td>{data.ca}</td>
      //               <td>{data.exam}</td>
      //               <td>{data.totalScore}</td>
      //               <td>{data.cumulativeTotalScore}</td>
      //               <td>{data.percentage.toFixed(2)}%</td>
      //               <td>{classAverage.toFixed(2)}</td>
      //               <td>{data.remarks}</td>
      //               <td>{data.grade}</td>
      //               <td>
      //                 {/* {classHighest.HscoreS} */}
                      
      //                 </td>
      //               <td>
      //                 {/* {classLowest.HscoreS} */}
      //                </td>
      //             </tr>
      //           ))}
      //         </tbody>
      //       </table>
      //     </div>
      //   </div>
      // </div>
//     </div>
//   );
// };

// export default ResultSheet;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Swal from 'react-sweetalert2';

// const ResultSheet = () => {

//   const baseUrl = 'http://localhost:8080/api/exam-records';

//   const [academicData, setAcademicData] = useState([]);
//   const [studentDetails, setStudentDetails] = useState({});

//   useEffect(() => {
//     fetchExamRecords();
//     fetchStudentDetails(); // Fetch student details when the component mounts
//   }, []);

//   const fetchExamRecords = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/viewAllExam`);
//       console.log(response);
//       setAcademicData(response.data);
//     } catch (error) {
//       console.error('Error fetching exam records:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching exam records.',
//       });
//     }
//   };



// const fetchStudentDetails = async () => {
//   try {
//     // Assuming you have a registration number in your academic data
//     const registrationNumber = academicData.length > 0 ? academicData[0].registrationNumber : '';
    
//     // Check if the registration number exists in local storage
//     const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
//     const foundStudent = storedStudents.find(student => student.registerNumber === registrationNumber);

//     if (foundStudent) {
//       // Set the student details
//       setStudentDetails(foundStudent);
//     } else {
//       // Display SweetAlert with error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Student Not Found',
//         text: 'Student details not found in local storage.',
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching student details:', error);
//     // Display SweetAlert with error message
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'An unexpected error occurred while fetching student details.',
//     });
//   }
// };

// // ...

  
  // const calculateTotalScore = (data) => {
  //   return data.reduce((total, subjectData) => {
  //     const subjectTotal = subjectData.ca + subjectData.exam;
  //     return total + subjectTotal;
  //   }, 0);
  // };

  // const calculateCumulativeTotalScore = (data) => {
  //   return data.reduce((cumulativeTotal, subjectData) => {
  //     const subjectTotal = subjectData.ca + subjectData.exam;
  //     return cumulativeTotal + subjectTotal;
  //   }, 0);
  // };

  // const calculatePercentage = (totalScore, maxScore, dataLength) => {
  //   return (totalScore / (maxScore * 2 * dataLength)) * 100;
  // };

  // const calculateClassAverage = (data) => {
  //   const classTotalScore = calculateTotalScore(data);
  //   return classTotalScore / data.length;
  // };

  // const findClassExtreme = (data, comparator) => {
  //   let extreme = data[0].ca + data[0].exam;
  //   let extremeSubject = data[0].subject;

  //   for (let i = 1; i < data.length; i++) {
  //     const subjectTotal = data[i].ca + data[i].exam;
  //     if (comparator(subjectTotal, extreme)) {
  //       extreme = subjectTotal;
  //       extremeSubject = data[i].subject;
  //     }
  //   }
  //   return { score: extreme, subject: extremeSubject };
  // };

  // // Function to determine remarks based on percentage
  // const determineRemarks = (percentage) => {
  //   // Adjust the threshold values as needed
  //   if (percentage >= 90) return 'OUTSTANDING';
  //   if (percentage >= 80) return 'EXCELLENT';
  //   if (percentage >= 70) return 'VERY GOOD';
  //   if (percentage >= 60) return 'GOOD';
  //   if (percentage >= 50) return 'AVERAGE';
  //   if (percentage >= 40) return 'BELOW AVERAGE';
  //   return 'POOR';
  // };

  // // Function to determine grade based on percentage
  // const determineGrade = (percentage) => {
  //   // Adjust the threshold values as needed
  //   if (percentage >= 90) return 'A+';
  //   if (percentage >= 80) return 'A';
  //   if (percentage >= 70) return 'B';
  //   if (percentage >= 60) return 'C';
  //   if (percentage >= 50) return 'D';
  //   if (percentage >= 40) return 'E';
  //   return 'F';
  // };

  // // Calculations
  // const totalScore = calculateTotalScore(academicData);
  // const cumulativeTotalScore = calculateCumulativeTotalScore(academicData);
  // const totalPercentage = calculatePercentage(totalScore, 100, academicData.length);
  // const classAverage = calculateClassAverage(academicData);
  // const classHighest = findClassExtreme(academicData, Math.max);
  // const classLowest = findClassExtreme(academicData, Math.min);

  // // Process academic data (add remarks, grades, etc.)
  // const processedAcademicData = academicData.map((data) => ({
  //   ...data,
  //   totalScore: data.ca + data.exam,
  //   cumulativeTotalScore: data.ca + data.exam,
  //   percentage: (data.ca + data.exam) / (40 + 60) * 100,
  //   remarks: determineRemarks((data.ca + data.exam) / (40 + 60) * 100),
  //   grade: determineGrade((data.ca + data.exam) / (40 + 60) * 100),
  // }));

//   return (

//     <div className="container-fluid bg-light">
//     <div className="card shadow mb-4">
//       <div className="card-header py-3 d-flex justify-content-center">
//     <div className="result-sheet">
//     <div className="header">
//       <div className="logo text-center">
//       <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:180, height:180}}/>

//       </div>
//       <div className="school-name mb-4 h-100 bg-primary justify-content-center text-light">
//         <h1 className='mb-5 text-center'>PERFECT ANGELS NURSERY &amp; PRIMARY SCHOOL</h1>
//         <p className='text-white text-center'>12 Moses Emeya Close Off Social Club Road New Oko Oba</p>
//         <p className='text-white text-center'>Motto: Believe-Achieve-Succeed</p>
//         <p className='text-primary text-center'>info@perfectangelsschool.com.ng</p>
//       </div>
//     </div>
//     <div className="first-term-wrapper mt-4 mx-3 mb-0">
//       <h2 className='text-white bg-primary'>2023-2024 SESSION FIRST TERM REPORT SHEET</h2>
//       <div className="first-term-tables d-flex  justify-content-between">
//         <table className="personal-data mr-2 ml-0 mb-5 bg-light" border={1} >
//           {/* <tbody>
//             <tr>
//               <th colSpan={2} className='text-white bg-primary ml-0'>STUDENT'S PERSONAL DATA</th>
//             </tr>
//             <tr>
//               <td>Name</td>
//               <td>ODOGWU KING-BRYAN KAMSIYOCHUKWU</td>
//             </tr>
//             <tr>
//               <td>Date Of Birth</td>
//               <td>22/05/2019</td>
//             </tr>
//             <tr>
//               <td>Sex</td>
//               <td>MALE</td>
//             </tr>
//             <tr>
//               <td>Class</td>
//               <td>NURSERY 2C</td>
//             </tr>
//             <tr>
//               <td>Admission No.</td>
//               <td>A200</td>
//             </tr>
//           </tbody> */}
//            <table className="personal-data mr-2 ml-0 mb-5 bg-light" border={1}>
//             <tbody>
//               <tr>
//                 <th colSpan={2} className='text-white bg-primary ml-0'>
//                   STUDENT'S PERSONAL DATA
//                 </th>
//               </tr>
//               <tr>
//                 <td>Name</td>
//                 <td>{studentDetails.name}</td>
//               </tr>
//               <tr>
//                 <td>Date Of Birth</td>
//                 <td>{studentDetails.dateOfBirth}</td>
//               </tr>
//               <tr>
//                 <td>Sex</td>
//                 <td>{studentDetails.sex}</td>
//               </tr>
//               <tr>
//                 <td>Class</td>
//                 <td>{studentDetails.class}</td>
//               </tr>
//               <tr>
//                 <td>Admission No.</td>
//                 <td>{studentDetails.admissionNumber}</td>
//               </tr>
//             </tbody>
//           </table>
//         </table>
//        <table>

//         <div className="col-sm-12">
        
//                 <img className="sidebar-card-illustration mb-2" src="img/happy-student.jpg" alt="..." style={{width:200, height:200, borderRadius:100}}/>

//         </div>
//        </table>
       
//       </div>
//     </div>
   
//       <table className="academic-performance-table" border={1}>
//         <tbody>
//           <tr>
//             <th colSpan={11} className="text-white bg-primary p-5 text-center">
//               ACADEMIC PERFORMANCE
//             </th>
//           </tr>
//           <tr className="subject">
//             <th rowSpan={2} className="subject-heading">
//               SUBJECT
//             </th>
//             <th>CA</th>
//             <th>EXAM</th>
//             <th>TOTAL SCORE</th>
//             <th>CUM. TOTAL SCORE</th>
//             <th>PERCEN-TAGE</th>
//             <th>CLASS AVERAGE</th>
//             <th>REMARKS</th>
//             <th>GRADE</th>
//             <th>CLASS HIGHEST</th>
//             <th>CLASS LOWEST</th>
//           </tr>
//           <tr>
//             <th className='p-3 bg-primary text-light'>40</th>
//             <th className='p-3 bg-primary text-light'>60</th>
//             <th className='p-3 bg-primary text-light'>100</th>
//           </tr>
//           {processedAcademicData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.subject}</td>
//               <td>{data.ca}</td>
//               <td>{data.exam}</td>
//               <td>{data.totalScore}</td>
//               <td>{data.cumulativeTotalScore}</td>
//               <td>{data.percentage.toFixed(2)}%</td>
//               <td>{classAverage.toFixed(2)}</td>
//               <td>{data.remarks}</td>
//               <td>{data.grade}</td>
//               <td>{classHighest.score}</td>
//               <td>{classLowest.score} </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default ResultSheet;


// import React from 'react';

// const ResultSheet = () => {
//   // Dummy data and functions
//   const academicData = [
//     { subject: 'NUMERACY', ca: 45, exam: 43 },
//     { subject: 'LITERACY', ca: 42, exam: 40 },
//     { subject: 'SOCIAL HABIT', ca: 38, exam: 36 },
//     { subject: 'SCIENCE', ca: 40, exam: 39 },
//     { subject: 'HISTORY', ca: 36, exam: 34 },
//     { subject: 'PHYSICAL EDUCATION', ca: 48, exam: 46 },
//     { subject: 'ART', ca: 50, exam: 48 },
//     { subject: 'COMPUTER SCIENCE', ca: 44, exam: 42 },
//     { subject: 'LANGUAGE ARTS', ca: 41, exam: 38 },
//   ];

//   const calculateTotalScore = (data) => {
//     return data.reduce((total, subjectData) => {
//       const subjectTotal = subjectData.ca + subjectData.exam;
//       return total + subjectTotal;
//     }, 0);
//   };

//   const calculateCumulativeTotalScore = (data) => {
//     return data.reduce((cumulativeTotal, subjectData) => {
//       const subjectTotal = subjectData.ca + subjectData.exam;
//       return cumulativeTotal + subjectTotal;
//     }, 0);
//   };

//   const calculatePercentage = (totalScore, maxScore, dataLength) => {
//     return (totalScore / (maxScore * 2 * dataLength)) * 100;
//   };

//   const calculateClassAverage = (data) => {
//     const classTotalScore = calculateTotalScore(data);
//     return classTotalScore / data.length;
//   };

//   const findClassExtreme = (data, comparator) => {
//     let extreme = data[0].ca + data[0].exam;
//     for (let i = 1; i < data.length; i++) {
//       const subjectTotal = data[i].ca + data[i].exam;
//       if (comparator(subjectTotal, extreme)) {
//         extreme = subjectTotal;
//       }
//     }
//     return extreme;
//   };

//   // Calculations
//   const totalScore = calculateTotalScore(academicData);
//   const cumulativeTotalScore = calculateCumulativeTotalScore(academicData);
//   const totalPercentage = calculatePercentage(totalScore, 100, academicData.length);
//   const classAverage = calculateClassAverage(academicData);
//   const classHighest = findClassExtreme(academicData, Math.max);
//   const classLowest = findClassExtreme(academicData, Math.min);

//   // Process academic data (add remarks, grades, etc.)
//   const processedAcademicData = academicData.map((data) => ({
//     ...data,
//     totalScore: data.ca + data.exam,
//     cumulativeTotalScore: data.ca + data.exam,
//     percentage: (data.ca + data.exam) / (40 + 60) * 100,
//     remarks: 'Pass',
//     grade: 'A',
//   }));

//   return (
//     <div>
//       <table className="academic-performance-table" border={1}>
//         <tbody>
//           <tr>
//             <th colSpan={11} className="text-white bg-primary">
//               ACADEMIC PERFORMANCE
//             </th>
//           </tr>
//           <tr className="subject">
//             <th rowSpan={2} className="subject-heading">
//               SUBJECT
//             </th>
//             <th>CA</th>
//             <th>EXAM</th>
//             <th>TOTAL SCORE</th>
//             <th>CUM. TOTAL SCORE</th>
//             <th>PERCEN-TAGE</th>
//             <th>CLASS AVERAGE</th>
//             <th>REMARKS</th>
//             <th>GRADE</th>
//             <th>CLASS HIGHEST</th>
//             <th>CLASS LOWEST</th>
//           </tr>
//           <tr>
//             <th>40</th>
//             <th>60</th>
//             <th>100</th>
//           </tr>
//           {processedAcademicData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.subject}</td>
//               <td>{data.ca}</td>
//               <td>{data.exam}</td>
//               <td>{data.totalScore}</td>
//               <td>{data.cumulativeTotalScore}</td>
//               <td>{data.percentage.toFixed(2)}%</td>
//               <td>{classAverage.toFixed(2)}</td>
//               <td>{data.remarks}</td>
//               <td>{data.grade}</td>
//               <td>{classHighest}</td>
//               <td>{classLowest}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ResultSheet;





// import React, { useState, useEffect } from 'react';
// import './ResultSheet.css';

// const ResultSheet = ({id}) => {
//   const baseUrl = 'http://localhost:8080/api/exam-records';
//   const [academicData, setAcademicData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const determineRemarks = (percentage) => {
//     // Adjust the threshold values as needed
//     if (percentage >= 90) return 'OUTSTANDING';
//     if (percentage >= 80) return 'EXCELLENT';
//     if (percentage >= 70) return 'VERY GOOD';
//     if (percentage >= 60) return 'GOOD';
//     if (percentage >= 50) return 'AVERAGE';
//     if (percentage >= 40) return 'BELOW AVERAGE';
//     return 'POOR';
//   };

//   // Function to determine grade based on percentage
//   const determineGrade = (percentage) => {
//     // Adjust the threshold values as needed
//     if (percentage >= 90) return 'A+';
//     if (percentage >= 80) return 'A';
//     if (percentage >= 70) return 'B';
//     if (percentage >= 60) return 'C';
//     if (percentage >= 50) return 'D';
//     if (percentage >= 40) return 'E';
//     return 'F';
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/viewExam/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         console.log('API response data:', data);
//         setAcademicData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [id]); // Include 'id' in the dependency array
  
//   const calculateTotalScore = (data) => {
//     return data.reduce((total, subjectData) => {
//       const subjectTotal = (subjectData.ca || 0) + (subjectData.exam || 0);
//       return total + subjectTotal;
//     }, 0);
//   };

//   const calculateCumulativeTotalScore = (data) => {
//     return data.reduce((cumulativeTotal, subjectData) => {
//       const subjectTotal = (subjectData.ca || 0) + (subjectData.exam || 0);
//       return cumulativeTotal + subjectTotal;
//     }, 0);
//   };

//   const calculatePercentage = (totalScore, maxScore, dataLength) => {
//     return (totalScore / (maxScore * 2 * dataLength)) * 100;
//   };

//   const calculateClassAverage = (data) => {
//     const classTotalScore = calculateTotalScore(data);
//     return data.length > 0 ? classTotalScore / data.length : 0;
//   };

//   const findClassExtreme = (data, comparator) => {
//     if (data.length === 0) {
//       return { score: 0, subject: '' };
//     }

//     let extreme = (data[0].ca || 0) + (data[0].exam || 0);
//     let extremeSubject = data[0].subject;

//     for (let i = 1; i < data.length; i++) {
//       const subjectTotal = (data[i].ca || 0) + (data[i].exam || 0);
//       if (comparator(subjectTotal, extreme)) {
//         extreme = subjectTotal;
//         extremeSubject = data[i].subject;
//       }
//     }

//     return { score: extreme, subject: extremeSubject };
//   };

//   // Calculations
//   const totalScore = academicData ? calculateTotalScore(academicData) : 0;
//   const cumulativeTotalScore = academicData ? calculateCumulativeTotalScore(academicData) : 0;
//   const totalPercentage = academicData ? calculatePercentage(totalScore, 100, academicData.length) : 0;
//   const classAverage = academicData ? calculateClassAverage(academicData) : 0;
//   const classHighest = academicData ? findClassExtreme(academicData, Math.max) : { score: 0, subject: '' };
//   const classLowest = academicData ? findClassExtreme(academicData, Math.min) : { score: 0, subject: '' };

//   // Process academic data (add remarks, grades, etc.)
//   // const processedAcademicData = academicData.map((data, index) => {
//   //   const ca = data.ca || 0;
//   //   const exam = data.exam || 0;
//   //   const totalScore = ca + exam;
//   //   const cumulativeTotalScore = ca + exam;
//   //   const percentage = (totalScore / (40 + 60)) * 100;
//   //   const remarks = determineRemarks(percentage);
//   //   const grade = determineGrade(percentage);

//   //   return {
//   //     ...data,
//   //     totalScore,
//   //     cumulativeTotalScore,
//   //     percentage: percentage.toFixed(2),
//   //     remarks,
//   //     grade,
//   //   };
//   // });


//   // const totalScore = academicData ? calculateTotalScore(academicData) : 0;
//   // const classAverage = academicData ? calculateClassAverage(academicData) : 0;
//   // const classHighest = academicData ? findClassExtreme(academicData, Math.max) : 0;
//   // const classLowest = academicData ? findClassExtreme(academicData, Math.min) : 0;

//   const processedAcademicData = academicData.map((data) => ({
//     ...data,
//     totalScore: data.ca + data.exam,
//     cumulativeTotalScore: data.ca + data.exam,
//     percentage: (data.ca + data.exam) / (40 + 60) * 100,
//     remarks: determineRemarks((data.ca + data.exam) / (40 + 60) * 100),
//     grade: determineGrade((data.ca + data.exam) / (40 + 60) * 100),
//   }));

//   // Function to determine remarks based on percentage
 
//   // Calculations
//   // const totalScore = calculateTotalScore(academicData);
//   // const cumulativeTotalScore = calculateCumulativeTotalScore(academicData);
//   // const totalPercentage = calculatePercentage(totalScore, 100, academicData.length);
//   // const classAverage = calculateClassAverage(academicData);
//   // const classHighest = findClassExtreme(academicData, Math.max);
//   // const classLowest = findClassExtreme(academicData, Math.min);


//   return (

//     <div className="container-fluid">
//     <div className="card shadow mb-4">
//       <div className="card-header py-3 d-flex justify-content-center">
//     <div className="result-sheet">
//     <div className="header">
//       <div className="logo">
//       <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:180, height:180}}/>

//       </div>
//       <div className="school-name mb-4 h-100 bg-primary">
//         <h1 className='mb-5'>PERFECT ANGELS NURSERY &amp; PRIMARY SCHOOL</h1>
//         <p className='text-white'>12 Moses Emeya Close Off Social Club Road New Oko Oba</p>
//         <p className='text-white'>Motto: Believe-Achieve-Succeed</p>
//         <p className='text-primary'>info@perfectangelsschool.com.ng</p>
//       </div>
//     </div>
//     <div className="first-term-wrapper mt-4 mx-3">
//       <h2 className='text-white bg-primary'>2023-2024 SESSION FIRST TERM REPORT SHEET</h2>
//       <div className="first-term-tables">
//         <table className="personal-data mr-2 ml-0" border={1}>
//           <tbody>
//             <tr>
//               <th colSpan={2} className='text-white bg-primary ml-0'>STUDENT'S PERSONAL DATA</th>
//             </tr>
//             <tr>
//               <td>Name</td>
//               <td>ODOGWU KING-BRYAN KAMSIYOCHUKWU</td>
//             </tr>
//             <tr>
//               <td>Date Of Birth</td>
//               <td>22/05/2019</td>
//             </tr>
//             <tr>
//               <td>Sex</td>
//               <td>MALE</td>
//             </tr>
//             <tr>
//               <td>Class</td>
//               <td>NURSERY 2C</td>
//             </tr>
//             <tr>
//               <td>Admission No.</td>
//               <td>A200</td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="passport">
        
//                 <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:80, height:80}}/>

//         </div>
//         <div className="attendance-duration mx-2">
//           <table className="attendance" border={1}>
//             <tbody>
//               <tr>
//                 <th colSpan={3} className='text-white bg-primary'>ATTENDANCE</th>
//               </tr>
//               <tr>
//                 <td>No. of Times School Opened</td>
//                 <td>No. of Times Present</td>
//                 <td>No. of Times Absent</td>
//               </tr>
//               <tr>
//                 <td>68</td>
//                 <td>64</td>
//                 <td>4</td>
//               </tr>
//             </tbody>
//           </table>
//           <table className="duration m-2" border={1}>
//             <tbody>
//               <tr>
//                 <th colSpan={3} className='text-white bg-primary'>TERMINAL DURATION (15 Weeks)</th>
//               </tr>
//               <tr>
//                 <td>Term Begins</td>
//                 <td>Term Ends</td>
//                 <td>Next Term Begins</td>
//               </tr>
//               <tr>
//                 <td>4 September 2023</td>
//                 <td>16 December 2023</td>
//                 <td>8 January 2024</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className="total-position mx-2">
//           <table className="total px-5 mx-2" border={1} style={{width:100}}>
//             <tbody>
//               <tr>
//                 <th >TOTAL SCORE OBTAINABLE</th>
//                 <td colSpan={5}>1100</td>
//               </tr>
//               <tr>
//                 <th>TOTAL SCORE OBTAINED</th>
//                 <td>1024</td>
//               </tr>
//               <tr>
//                 <th>AVERAGE PERCENTAGE</th>
//                 <td>93.1</td>
//               </tr>
//             </tbody>
//           </table>
//           <table className="position" border={1}>
//             <tbody>
//               <tr>
//                 <th>No. in Class</th>
//                 <td>13</td>
//               </tr>
//               <tr>
//                 <th>Position</th>
//                 <td />
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
   
//     <table className="academic-performance-table" border={1}>
//         <tbody>
//           <tr>
//             <th colSpan={11} className="text-white bg-primary">
//               ACADEMIC PERFORMANCE
//             </th>
//           </tr>
//           <tr className="subject">
//             <th rowSpan={2} className="subject-heading">
//               SUBJECT
//             </th>
//             <th>CA</th>
//             <th>EXAM</th>
//             <th>TOTAL SCORE</th>
//             <th>CUM. TOTAL SCORE</th>
//             <th>PERCEN-TAGE</th>
//             <th>CLASS AVERAGE</th>
//             <th>REMARKS</th>
//             <th>GRADE</th>
//             <th>CLASS HIGHEST</th>
//             <th>CLASS LOWEST</th>
//           </tr>
//           <tr>
//             <th>40</th>
//             <th>60</th>
//             <th>100</th>
//           </tr>
//           {processedAcademicData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.subject}</td>
//               <td>{data.ca}</td>
//               <td>{data.exam}</td>
//               <td>{data.totalScore}</td>
//               <td>{data.cumulativeTotalScore}</td>
//               <td>{data.percentage.toFixed(2)}%</td>
//               <td>{classAverage.toFixed(2)}</td>
//               <td>{data.remarks}</td>
//               <td>{data.grade}</td>
//               <td>{classHighest.score} </td>
//               <td>{classLowest.score} </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     <div className="affective-psychomotor-wrapper">
//       <table className="affective-traits-table" border={1}>
//         <tbody>
//           <tr>
//             <th className='text-white bg-primary'>AFFECTIVE TRAITS</th>
//             <th className='text-white bg-primary' style={{padding:10}}>1</th>
//             <th className='text-white bg-primary' style={{padding:10}}>2</th>
//             <th className='text-white bg-primary' style={{padding:10}}>3</th>
//             <th className='text-white bg-primary' style={{padding:10}}>4</th>
//             <th className='text-white bg-primary' style={{padding:10}}>5</th>
//           </tr>
//           <tr>
//             <td>Attentiveness</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Attitude of School work</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Cooperation with others</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Emotion Stability</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Leadership</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Attendance</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Neatness</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Politeness</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Punctuality</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Speaking / Writing</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Organisation Ability</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Relationship with others</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//         </tbody>
//       </table>
//       <div className="psychomotor-skills">
//         <table className="psychomotor-table" border={1}>
//           <tbody>
//             <tr>
//               <th className='text-white bg-primary'>PSYCHOMOTOR SKILLS</th>
//               <th className='text-white bg-primary' style={{padding:10}}>1</th>
//               <th className='text-white bg-primary' style={{padding:10}}>2</th>
//               <th className='text-white bg-primary' style={{padding:10}}>3</th>
//               <th className='text-white bg-primary' style={{padding:10}}>4</th>
//               <th className='text-white bg-primary' style={{padding:10}}>5</th>
//             </tr>
//             <tr>
//               <td>Handling of Tools</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//             <tr>
//               <td>Handwriting</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//             <tr>
//               <td>Verbal Fluency</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//             <tr>
//               <td>Processing Speed</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//             <tr>
//               <td>Retentiveness</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//           </tbody>
//         </table>
//         <table className="psychomotor-rating-keys" border={1}>
//           <tbody>
//             <tr>
//               <th className='text-white bg-primary'>KEYS TO RATING</th>
//             </tr>
//             <tr>
//               <td>1 - Very Poor</td>
//             </tr>
//             <tr>
//               <td>2 - Poor</td>
//             </tr>
//             <tr>
//               <td>3 - Fair</td>
//             </tr>
//             <tr>
//               <td>4 - Good</td>
//             </tr>
//             <tr>
//               <td>5 - Excellent</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     <div className="teacher-headTeacher-comment">
//       <div className="comment-wrapper">
//         <div className="comment">
//           <p>
//             <b>Class Teacher's Comments:</b> King-Bryan is an energetic and
//             intelligent learner. His effort in all academic areas is highly
//             commendable. However, he needs to be calm and develop independence in
//             attempting tasks. We hope to achieve this in the coming term. Keep the
//             flag flying.
//           </p>
//           <div className="signature-date">
//             <span>
//               <b>Sign:</b>
//             </span>
//             <span>
//               <b>Date:</b>
//             </span>
//           </div>
//         </div>
//         <div className="comment">
//           <p>
//             <b>HeadTeacher's Comments:</b> OUTSTANDING RESULT, KEEP EXCELLING,
//             WELL DONE!
//           </p>
//           <div className="signature-date">
//             <span>
//               <b>Sign:</b>
//             </span>
//             <span>
//               <b>Date:</b>
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="stamp">
//         <p>stamp</p>
//       </div>
//     </div>
//   </div>
//   </div>
//   </div>
//   </div>
  
//   )
// }

// export default ResultSheet


// import React from 'react';
// import './ResultSheet.css'

// function ResultSheet() {
//   return (

//     <div className="container-fluid">
//     <div className="card shadow mb-4">
//       <div className="card-header py-3 d-flex justify-content-center">
//     <div className="result-sheet">
//     <div className="header">
//       <div className="logo">
//       <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:180, height:180}}/>

//       </div>
//       <div className="school-name mb-4 h-100 bg-primary">
//         <h1 className='mb-5'>PERFECT ANGELS NURSERY &amp; PRIMARY SCHOOL</h1>
//         <p className='text-white'>12 Moses Emeya Close Off Social Club Road New Oko Oba</p>
//         <p className='text-white'>Motto: Believe-Achieve-Succeed</p>
//         <p className='text-primary'>info@perfectangelsschool.com.ng</p>
//       </div>
//     </div>
//     <div className="first-term-wrapper mt-4 mx-3">
//       <h2 className='text-white bg-primary'>2023-2024 SESSION FIRST TERM REPORT SHEET</h2>
//       <div className="first-term-tables">
//         <table className="personal-data mr-2 ml-0" border={1}>
//           <tbody>
//             <tr>
//               <th colSpan={2} className='text-white bg-primary ml-0'>STUDENT'S PERSONAL DATA</th>
//             </tr>
//             <tr>
//               <td>Name</td>
//               <td>ODOGWU KING-BRYAN KAMSIYOCHUKWU</td>
//             </tr>
//             <tr>
//               <td>Date Of Birth</td>
//               <td>22/05/2019</td>
//             </tr>
//             <tr>
//               <td>Sex</td>
//               <td>MALE</td>
//             </tr>
//             <tr>
//               <td>Class</td>
//               <td>NURSERY 2C</td>
//             </tr>
//             <tr>
//               <td>Admission No.</td>
//               <td>A200</td>
//             </tr>
//           </tbody>
//         </table>
        // <div className="passport">
        //   {/* <img
        //     src="./408753131_6877541245673942_1467528616000457191_n.jpg"
        //     alt="passport"
        //   /> */}
        //         <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:80, height:80}}/>

        // </div>
//         <div className="attendance-duration mx-2">
//           <table className="attendance" border={1}>
//             <tbody>
//               <tr>
//                 <th colSpan={3} className='text-white bg-primary'>ATTENDANCE</th>
//               </tr>
//               <tr>
//                 <td>No. of Times School Opened</td>
//                 <td>No. of Times Present</td>
//                 <td>No. of Times Absent</td>
//               </tr>
//               <tr>
//                 <td>68</td>
//                 <td>64</td>
//                 <td>4</td>
//               </tr>
//             </tbody>
//           </table>
//           <table className="duration m-2" border={1}>
//             <tbody>
//               <tr>
//                 <th colSpan={3} className='text-white bg-primary'>TERMINAL DURATION (15 Weeks)</th>
//               </tr>
//               <tr>
//                 <td>Term Begins</td>
//                 <td>Term Ends</td>
//                 <td>Next Term Begins</td>
//               </tr>
//               <tr>
//                 <td>4 September 2023</td>
//                 <td>16 December 2023</td>
//                 <td>8 January 2024</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className="total-position mx-2">
//           <table className="total px-5 mx-2" border={1} style={{width:100}}>
//             <tbody>
//               <tr>
//                 <th >TOTAL SCORE OBTAINABLE</th>
//                 <td colSpan={5}>1100</td>
//               </tr>
//               <tr>
//                 <th>TOTAL SCORE OBTAINED</th>
//                 <td>1024</td>
//               </tr>
//               <tr>
//                 <th>AVERAGE PERCENTAGE</th>
//                 <td>93.1</td>
//               </tr>
//             </tbody>
//           </table>
//           <table className="position" border={1}>
//             <tbody>
//               <tr>
//                 <th>No. in Class</th>
//                 <td>13</td>
//               </tr>
//               <tr>
//                 <th>Position</th>
//                 <td />
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     <table className="academic-performance-table" border={1}>
//       <tbody>
//         <tr>
//           <th colSpan={11} className='text-white bg-primary'>ACADEMIC PERFORMANCE</th>
//         </tr>
//         <tr className="subject">
//           <th rowSpan={2} className="subject-heading">
//             SUBJECT
//           </th>
//           <th>CA</th>
//           <th>EXAM</th>
//           <th>TOTAL SCORE</th>
//           <th>CUM. TOTAL SCORE</th>
//           <th>PERCEN-TAGE</th>
//           <th>CLASS AVERAGE</th>
//           <th>REMARKS</th>
//           <th>GRADE</th>
//           <th>CLASS HIGHEST</th>
//           <th>CLASS LOWEST</th>
//         </tr>
//         <tr className="subject">
//           <th>45</th>
//           <th>43</th>
//           <th>90</th>
//         </tr>
//         <tr>
//           <td>NUMERACY</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>LITERACY</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>SOCIAL HABIT</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>HEALTH HABIT</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>SCIENCE</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>CHRISTIAN ISLAMIC RELIGIOUS STUDIES</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>SENSORIAL SKILLS</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>PRACTICAL LIFE</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>CULTURAL &amp; CREATIVE ART</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>HANDWRITING</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//         <tr>
//           <td>PHONICS</td>
//           <td>432</td>
//           <td>434</td>
//           <td>33</td>
//           <td>43</td>
//           <td>34</td>
//           <td>565</td>
//           <td>OUTSTANDING</td>
//           <td>A+</td>
//           <td>23</td>
//           <td>75</td>
//         </tr>
//       </tbody>
//     </table>
//     <table className="academic-performance-rating-keys" border={1}>
//       <tbody>
//         <tr>
//           <th colSpan={8} className='text-white bg-primary'>KEYS TO RATING</th>
//         </tr>
//         <tr>
//           <td className='text-white bg-primary' style={{padding:10}}>100-95 (OUTSTANDING)</td>
//           <td className='text-white bg-primary' style={{padding:10}}>94-85 (EXCELLENT)</td>
//           <td className='text-white bg-primary' style={{padding:10}}>84-75 (VERY GOOD)</td>
//           <td className='text-white bg-primary' style={{padding:10}}>74-60 (GOOD)</td>
//           <td className='text-white bg-primary' style={{padding:10}}>59-50 (AVERAGE)</td>
//           <td className='text-white bg-primary' style={{padding:10}}>49-40 (BELOW AVERAGE)</td>
//           <td className='text-white bg-primary' style={{padding:10}}>39-30 (POOR)</td>
//           <td className='text-white bg-primary' style={{padding:10}}>29-0 (UNCLASSIFIED)</td>
//         </tr>
//       </tbody>
//     </table>
//     <div className="affective-psychomotor-wrapper">
//       <table className="affective-traits-table" border={1}>
//         <tbody>
//           <tr>
//             <th className='text-white bg-primary'>AFFECTIVE TRAITS</th>
//             <th className='text-white bg-primary' style={{padding:10}}>1</th>
//             <th className='text-white bg-primary' style={{padding:10}}>2</th>
//             <th className='text-white bg-primary' style={{padding:10}}>3</th>
//             <th className='text-white bg-primary' style={{padding:10}}>4</th>
//             <th className='text-white bg-primary' style={{padding:10}}>5</th>
//           </tr>
//           <tr>
//             <td>Attentiveness</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Attitude of School work</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Cooperation with others</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Emotion Stability</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Leadership</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Attendance</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Neatness</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Politeness</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Punctuality</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Speaking / Writing</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Organisation Ability</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//           <tr>
//             <td>Relationship with others</td>
//             <td />
//             <td />
//             <td />
//             <td />
//             <td />
//           </tr>
//         </tbody>
//       </table>
//       <div className="psychomotor-skills">
//         <table className="psychomotor-table" border={1}>
//           <tbody>
//             <tr>
//               <th className='text-white bg-primary'>PSYCHOMOTOR SKILLS</th>
//               <th className='text-white bg-primary' style={{padding:10}}>1</th>
//               <th className='text-white bg-primary' style={{padding:10}}>2</th>
//               <th className='text-white bg-primary' style={{padding:10}}>3</th>
//               <th className='text-white bg-primary' style={{padding:10}}>4</th>
//               <th className='text-white bg-primary' style={{padding:10}}>5</th>
//             </tr>
//             <tr>
//               <td>Handling of Tools</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//             <tr>
//               <td>Handwriting</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//             <tr>
//               <td>Verbal Fluency</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//             <tr>
//               <td>Processing Speed</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//             <tr>
//               <td>Retentiveness</td>
//               <td />
//               <td />
//               <td />
//               <td />
//               <td />
//             </tr>
//           </tbody>
//         </table>
//         <table className="psychomotor-rating-keys" border={1}>
//           <tbody>
//             <tr>
//               <th className='text-white bg-primary'>KEYS TO RATING</th>
//             </tr>
//             <tr>
//               <td>1 - Very Poor</td>
//             </tr>
//             <tr>
//               <td>2 - Poor</td>
//             </tr>
//             <tr>
//               <td>3 - Fair</td>
//             </tr>
//             <tr>
//               <td>4 - Good</td>
//             </tr>
//             <tr>
//               <td>5 - Excellent</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     <div className="teacher-headTeacher-comment">
//       <div className="comment-wrapper">
//         <div className="comment">
//           <p>
//             <b>Class Teacher's Comments:</b> King-Bryan is an energetic and
//             intelligent learner. His effort in all academic areas is highly
//             commendable. However, he needs to be calm and develop independence in
//             attempting tasks. We hope to achieve this in the coming term. Keep the
//             flag flying.
//           </p>
//           <div className="signature-date">
//             <span>
//               <b>Sign:</b>
//             </span>
//             <span>
//               <b>Date:</b>
//             </span>
//           </div>
//         </div>
//         <div className="comment">
//           <p>
//             <b>HeadTeacher's Comments:</b> OUTSTANDING RESULT, KEEP EXCELLING,
//             WELL DONE!
//           </p>
//           <div className="signature-date">
//             <span>
//               <b>Sign:</b>
//             </span>
//             <span>
//               <b>Date:</b>
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="stamp">
//         <p>stamp</p>
//       </div>
//     </div>
//   </div>
//   </div>
//   </div>
//   </div>
  
//   )
// }

// export default ResultSheet
