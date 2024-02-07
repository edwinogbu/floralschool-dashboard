import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddExamRecord = () => {
  const navigate = useNavigate();

  const [schoolLevels, setSchoolLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [courses, setCourses] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTerms, setSelectedTerms] = useState('');
  const [studentsData, setStudentsData] = useState([]);
  
  // Fetch school levels on component mount
  useEffect(() => {
    // Simulated API call to fetch school levels
    const fetchedSchoolLevels = [
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
    // const fetchedSchoolLevels = ['foundation', 'pre-nursery', 'nursery', 'pre-primary', 'primary', 'secondary'];
    setSchoolLevels(fetchedSchoolLevels);
  }, []);

  // Fetch years based on selected level
  useEffect(() => {
    if (selectedLevel) {
      // Simulated API call to fetch years based on selected level
      const fetchedYears = generateYearRange();
      setYears(fetchedYears);
    } else {
      setYears([]);
      setSelectedYear('');
    }
  }, [selectedLevel]);

  // Fetch courses based on selected level and year
  useEffect(() => {
    if (selectedLevel && selectedYear) {
      // Simulated API call to fetch courses based on selected level and year
      const fetchedTerms = ['first', 'second', 'third'];
      setTerms(fetchedTerms);
    } else {
      setTerms([]);
      setSelectedTerms('');
    }
  }, [selectedLevel, selectedYear, selectedCourse]);

  // Fetch student data based on selected level, year, and course
  useEffect(() => {
    if (selectedLevel && selectedYear && selectedCourse && selectedTerms) {
      // Simulated API call to fetch student data based on selected level, year, and course
      const simulatedStudentData = getSimulatedStudentData(selectedCourse);
      setStudentsData(simulatedStudentData);
    } else {
      setStudentsData([]);
    }
  }, [selectedYear, selectedCourse, selectedTerms]);

  const getSimulatedStudentData = (course) => {
    const { courseCode, courseTitle } = getCourseDetails(course);

    // Retrieve student names from local storage
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];

    // Use the retrieved student names to create simulated student data
    const simulatedStudentData = storedStudents.map(student => ({
      name: student.studentName,
      score: '',
      courseCode,
      courseTitle,
      grade: 'Not Graded',
      remark: '',

      // New fields
      registerNumber: student.registerNumber || '',
      entryYear: student.entryYear || '',
      level: student.level || '',
      imageUrl: student.imageUrl || '',
    }));

    return simulatedStudentData;
  };

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       if (selectedLevel && selectedYear) {
  //         const response = await axios.get(`http://localhost:8080/api/course-details/viewAllCourseDetails`);
  //         const fetchedCourses = response.data;
  //         setCourses(fetchedCourses);
  //       } else {
  //         setCourses([]);
  //         setSelectedCourse('');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching courses:', error);
  //       // Handle the error, e.g., show an error message to the user
  //     }
  //   };

  //   fetchCourses();
  // }, [selectedLevel, selectedYear]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       if (selectedLevel && selectedYear) {
  //         const response = await axios.get(`http://localhost:8080/api/course-details/viewAllCourseDetails`);
  //         const fetchedCourses = response.data;
  
  //         if (fetchedCourses.length === 0) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Error',
  //             text: 'No courses found for the selected level and year. Please add courses before proceeding.',
  //           });
  //           setCourses([]); // Reset courses to an empty array
  //           setSelectedCourse('');
  //         } else {
  //           setCourses(fetchedCourses);
  //         }
  //       } else {
  //         setCourses([]);
  //         setSelectedCourse('');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching courses:', error);
  //       // Handle the error, e.g., show an error message to the user
  //     }
  //   };
  
  //   fetchCourses();
  // }, [selectedLevel, selectedYear]);
  
  // Function to display error alerts
const showErrorAlert = (title, message) => {
  Swal.fire({
    icon: 'error',
    title,
    text: message,
  });
};

// Inside the fetchCourses useEffect
useEffect(() => {
  const fetchCourses = async () => {
    try {
      if (selectedLevel && selectedYear) {
        const response = await axios.get(`http://localhost:8080/api/course-details/viewAllCourseDetails`);
        const fetchedCourses = response.data;

        if (fetchedCourses.length === 0) {
          showErrorAlert('Error', 'No courses found for the selected level and year. Please add courses before proceeding.');
          setCourses([]);
          setSelectedCourse('');
        } else {
          setCourses(fetchedCourses);
        }
      } else {
        setCourses([]);
        setSelectedCourse('');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      showErrorAlert('Error', 'An error occurred while fetching courses. Please try again.');
    }
  };

  fetchCourses();
}, [selectedLevel, selectedYear]);


  const getCourseDetails = (selectedCourse) => {
    const course = courses.find((course) => course.courseTitle === selectedCourse);
    if (course) {
      return { courseCode: course.courseCode, courseTitle: course.courseTitle };
    } else {
      return { courseCode: '', courseTitle: '' };
    }
  };

  const handleScoreChange = (index, score, type) => {
    const updatedStudentsData = [...studentsData];
    const numericScore = parseInt(score, 10);

    if (!isNaN(numericScore)) {
      if (type === 'CA') {
        updatedStudentsData[index].CA = numericScore;
      } else if (type === 'Exam') {
        updatedStudentsData[index].exam = numericScore;
      }

      // Calculate total score
      const totalScore = (updatedStudentsData[index].CA || 0) + (updatedStudentsData[index].exam || 0);
      updatedStudentsData[index].score = totalScore;

      // Calculate grade and remark based on total score
      updatedStudentsData[index].grade = calculateGrade(totalScore);
      updatedStudentsData[index].remark = calculateRemark(updatedStudentsData[index].grade);
    } else {
      // Handle the case where the input is not a valid number
      updatedStudentsData[index].CA = '';
      updatedStudentsData[index].exam = '';
      updatedStudentsData[index].score = '';
      updatedStudentsData[index].grade = 'Not Graded';
      updatedStudentsData[index].remark = '';
    }

    setStudentsData(updatedStudentsData);
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

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const pastYearRange = 5; // Number of past years to include

    const years = [];
    for (let i = currentYear - pastYearRange; i <= currentYear; i++) {
      years.push(i.toString());
    }

    return years;
  };
  // Function to check if the selected level exists in the exam records storage
const isLevelInRecords = (level) => {
  const storedExamRecords = JSON.parse(localStorage.getItem('students')) || [];
  
  // const updatedExamRecords = [...storedExamRecords];
  // localStorage.setItem('students', JSON.stringify(updatedExamRecords));
  return storedExamRecords.some((record) => record.level === level);

};

// Handle level change
const handleLevelChange = (selectedLevel) => {
  setSelectedLevel(selectedLevel);

  if (!isLevelInRecords(selectedLevel)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `No exam records found for the selected level (${selectedLevel}).`,
    });
  }
};

// Handle submit
const handleSubmit = async () => {
  try {
    // Validation
    if (
      studentsData.length === 0 ||
      !selectedLevel ||
      !selectedYear ||
      !selectedCourse ||
      !selectedTerms
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Incomplete or invalid data. Please fill in all fields.',
      });
      return;
    }

    // Check if the selected level exists in the exam records storage
    if (!isLevelInRecords(selectedLevel)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `No exam records found for the selected level (${selectedLevel}).`,
      });
      return;
    }

    // Check if the course title is not empty
    if (!selectedCourse.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Course title cannot be empty.',
      });
      return;
    }

    // Modify the payload to include CA scores
    const completeData = studentsData.map((student) => ({
      ...student,
      name: student.name,
      level: selectedLevel,
      year: selectedYear,
      course: selectedCourse,
      terms: selectedTerms,
      ca: student.CA,
      exam: student.exam,
      score: student.score,
      registerNumber: student.registerNumber,
      entryYear: student.entryYear,
      imageUrl: student.imageUrl,
    }));

    // Save the exam records to the server
    const response = await axios.post(
      'http://localhost:8080/api/exam-records/createExam',
      completeData
    );

    if (response.status === 200) {
      // Save the exam records to local storage
      const storedExamRecords =
        JSON.parse(localStorage.getItem('examRecords')) || [];
      const updatedExamRecords = [...storedExamRecords, ...completeData];
      localStorage.setItem('examRecords', JSON.stringify(updatedExamRecords));

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data saved successfully!',
      }).then(() => {
        // Reset the form or perform any other post-submission logic
        setStudentsData([]); // Clear student data after successful submission
        setSelectedLevel('');
        setSelectedYear('');
        setCourses([]);
        setTerms([]);
        setSelectedCourse('');
        setSelectedTerms('');
      });
      // navigate('/view-students');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unexpected response status ' + response.status,
      });
    }
  } catch (error) {
    console.error('Error submitting data:', error);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while saving data. Please try again.',
    });
  }
};

  // const handleSubmit = async () => {
  //   try {
  //     // Validation
  //     if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse || !selectedTerms) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Incomplete or invalid data. Please fill in all fields.',
  //       });
  //       return;
  //     }
  
  //     // Modify the payload to include CA scores
  //     const completeData = studentsData.map(student => ({
  //       ...student,
  //       name: student.name,
  //       level: selectedLevel,
  //       year: selectedYear,
  //       course: selectedCourse,
  //       terms: selectedTerms,
  //       ca: student.CA,
  //       exam: student.exam,
  //       score: student.score,
  //       registerNumber: student.registerNumber,
  //       entryYear: student.entryYear,
  //       imageUrl: student.imageUrl,
  //     }));
  
  //     // Save the exam records to the server
  //     const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);
  
  //     if (response.status === 200) {
  //       // Save the exam records to local storage
  //       const storedExamRecords = JSON.parse(localStorage.getItem('examRecords')) || [];
  //       const updatedExamRecords = [...storedExamRecords, ...completeData];
  //       localStorage.setItem('examRecords', JSON.stringify(updatedExamRecords));
  
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Success',
  //         text: 'Data saved successfully!',
  //       }).then(() => {
  //         // Reset the form or perform any other post-submission logic
  //         setStudentsData([]); // Clear student data after successful submission
  //         setSelectedLevel('');
  //         setSelectedYear('');
  //         setCourses([]);
  //         setTerms([]);
  //         setSelectedCourse('');
  //         setSelectedTerms('');
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Unexpected response status ' + response.status,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'An error occurred while saving data. Please try again.',
  //     });
  //   }
  // };
  


// const handleSubmit = async () => {
//   try {
//     console.log('Submitted Data:', studentsData);
       
//     // Validation
//     if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse || !selectedTerms) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Incomplete or invalid data. Please fill in all fields.',
//       });
//       return;
//     }

//      // Modify the payload to include CA scores
//      const completeData = studentsData.map(student => ({
//       ...student,
//       name: student.name,
//       level: selectedLevel,
//       year: selectedYear,
//       course: selectedCourse,
//       terms: selectedTerms,
//       ca: student.CA,  
//       exam: student.exam,
//       score: student.score,
//       registerNumber: student.registerNumber,
//       entryYear: student.entryYear,
//       imageUrl: student.imageUrl,
      
//     }));


//     const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);

//     if (response.status === 200) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Data saved successfully!',
//       }).then(() => {
//         // Reset the form or perform any other post-submission logic
//         setStudentsData([]); // Clear student data after successful submission
//         setSelectedLevel('');
//         setSelectedYear('');
//         setCourses([]);
//         setTerms([]);
//         setSelectedCourse('');
//         setSelectedTerms('');
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Unexpected response status ' + response.status,
//       });
//     }
//   } catch (error) {
//     console.error('Error submitting data:', error);

//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'An error occurred while saving data. Please try again.',
//     });
//   }
// };


// Fetch student data based on selected level, year, and course
// useEffect(() => {
//   if (selectedLevel && selectedYear && selectedCourse && selectedTerms) {
//     // Simulated API call to fetch student data based on selected level, year, and course
//     const simulatedStudentData = getSimulatedStudentData(selectedCourse);

//     // Filter student data based on the selected level
//     const filteredStudentData = simulatedStudentData.filter(
//       (student) => student.level === selectedLevel
//     );

//     setStudentsData(filteredStudentData);
//   } else {
//     setStudentsData([]);
//   }
// }, [selectedLevel, selectedYear, selectedCourse, selectedTerms]);

// Fetch student data based on selected level, year, course, and terms
useEffect(() => {
  if (selectedLevel && selectedYear && selectedCourse && selectedTerms) {
    // Simulated API call to fetch student data based on selected level, year, course, and terms
    const simulatedStudentData = getSimulatedStudentData(selectedCourse);

    // Filter student data based on the selected level
    const filteredStudentData = simulatedStudentData.filter(
      (student) => student.level === selectedLevel
    );

    setStudentsData(filteredStudentData);
  } else {
    setStudentsData([]);
  }
}, [selectedLevel, selectedYear, selectedCourse, selectedTerms]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Pls Add Courses before Creating students Exam Results Records</h2>
          <Link to="/exam-records" className="btn btn-outline-danger bg-primary text-white btn-lg">
            Exam Record List
          </Link>
        </div>

        <div className="card-body">
          <div className="row mb-3">

            <div className="col-md-3">
              <label className="form-label">Select School Level:</label>
              <select
                className="custom-select custom-select-lg"
                onChange={(e) => handleLevelChange(e.target.value)}
              >
                <option value="">Select Level</option>
                {schoolLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {`${level.group} - ${level.label}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Select Year:</label>
              <select
                className="custom-select custom-select-lg"
                onChange={(e) => setSelectedYear(e.target.value)}
                disabled={!selectedLevel}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Select Course:</label>

              <select
                className="custom-select custom-select-lg"
                onChange={(e) => setSelectedCourse(e.target.value)}
                disabled={!selectedYear}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.courseTitle}>
                    {course.courseTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Select Terms:</label>
              <select
                className="custom-select custom-select-lg"
                onChange={(e) => setSelectedTerms(e.target.value)}
                disabled={!selectedCourse}
              >
                <option value="">Select Course</option>
                {terms.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedLevel && selectedYear && selectedCourse && studentsData.length > 0 && (
            <div>
              <h3>Add Student Scores for {selectedCourse}</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Register Number</th>
                    {/* <th>Entry Year</th> */}
                    <th>Level</th>
                    {/* <th>Image</th> */}
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>CA</th>
                    <th>Exam</th>
                    <th>Total Score</th>
                    <th>Grade</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {studentsData.map((student, index) => ( */}
                  {studentsData.filter(student => student.level === selectedLevel || selectedYear === student.year )
                        .map((student, index) => (
                    <tr key={student.name}>
                      <td>{student.name}</td>
                      <td>{student.registerNumber}</td>
                      {/* <td>{student.entryYear}</td> */}
                      <td>{student.level}</td>
                      {/* <td>
                        {student.imageUrl && (
                          <img
                            src={student.imageUrl}
                            alt={`Profile of ${student.name}`}
                            className="img-fluid rounded-circle"
                            style={{ width: '50px', height: '50px' }}
                          />
                        )}
                      </td> */}
                      <td>{student.courseCode}</td>
                      <td>{student.courseTitle}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control sm-4"
                          placeholder="Enter CA"
                          value={student.CA}
                          onChange={(e) => handleScoreChange(index, e.target.value, 'CA')}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control sm-4"
                          placeholder="Enter Exam"
                          value={student.exam}
                          onChange={(e) => handleScoreChange(index, e.target.value, 'Exam')}
                        />
                      </td>
                      <td>{student.score}</td>
                      <td>{student.grade}</td>
                      <td>{student.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-4 col-sm-12">
                <button
                  type="button"
                  className="btn btn-primary btn-lg p-2 m-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExamRecord;


// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

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

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['Foundation', 'Pre-Nursery', 'Nursery', 'Pre-Primary', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);

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
//       const fetchedTerms = ['first', 'second', 'third'];
//       setTerms(fetchedTerms);
//     } else {
//       setTerms([]);
//       setSelectedTerms('');
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse && selectedTerms) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const simulatedStudentData = getSimulatedStudentData(selectedCourse);
//       setStudentsData(simulatedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedYear, selectedCourse, selectedTerms]);

//   const getSimulatedStudentData = (course) => {
//     const { courseCode, courseTitle } = getCourseDetails(course);

//     // Retrieve student names from local storage
//     const storedStudents = JSON.parse(localStorage.getItem('students')) || [];

//     // Use the retrieved student names to create simulated student data
//     const simulatedStudentData = storedStudents.map(student => ({
//       name: student.studentName,
//       score: '',
//       courseCode,
//       courseTitle,
//       grade: 'Not Graded',
//       remark: '',

//       // New fields
//       registerNumber: student.registerNumber || '',
//       entryYear: student.entryYear || '',
//       level: student.level || '',
//       imageUrl: student.imageUrl || '',
//     }));

//     return simulatedStudentData;
//   };

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         if (selectedLevel && selectedYear) {
//           const response = await axios.get(`http://localhost:8080/api/course-details/viewAllCourseDetails`);
//           const fetchedCourses = response.data;
//           setCourses(fetchedCourses);
//         } else {
//           setCourses([]);
//           setSelectedCourse('');
//         }
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//         // Handle the error, e.g., show an error message to the user
//       }
//     };

//     fetchCourses();
//   }, [selectedLevel, selectedYear]);

//   const getCourseDetails = (selectedCourse) => {
//     const course = courses.find((course) => course.courseTitle === selectedCourse);
//     if (course) {
//       return { courseCode: course.courseCode, courseTitle: course.courseTitle };
//     } else {
//       return { courseCode: '', courseTitle: '' };
//     }
//   };

//   const handleScoreChange = (index, score, type) => {
//     const updatedStudentsData = [...studentsData];
//     const numericScore = parseInt(score, 10);

//     if (!isNaN(numericScore)) {
//       if (type === 'CA') {
//         updatedStudentsData[index].CA = numericScore;
//       } else if (type === 'Exam') {
//         updatedStudentsData[index].exam = numericScore;
//       }

//       // Calculate total score
//       const totalScore = (updatedStudentsData[index].CA || 0) + (updatedStudentsData[index].exam || 0);
//       updatedStudentsData[index].score = totalScore;

//       // Calculate grade and remark based on total score
//       updatedStudentsData[index].grade = calculateGrade(totalScore);
//       updatedStudentsData[index].remark = calculateRemark(updatedStudentsData[index].grade);
//     } else {
//       // Handle the case where the input is not a valid number
//       updatedStudentsData[index].CA = '';
//       updatedStudentsData[index].exam = '';
//       updatedStudentsData[index].score = '';
//       updatedStudentsData[index].grade = 'Not Graded';
//       updatedStudentsData[index].remark = '';
//     }

//     setStudentsData(updatedStudentsData);
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

//   const generateYearRange = () => {
//     const currentYear = new Date().getFullYear();
//     const pastYearRange = 5; // Number of past years to include

//     const years = [];
//     for (let i = currentYear - pastYearRange; i <= currentYear; i++) {
//       years.push(i.toString());
//     }

//     return years;
//   };



// const handleSubmit = async () => {
//   try {
//     console.log('Submitted Data:', studentsData);

//     // Validation
//     if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse || !selectedTerms) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Incomplete or invalid data. Please fill in all fields.',
//       });
//       return;
//     }

//     const completeData = studentsData.map(student => ({
//       ...student,
//       level: selectedLevel,
//       year: selectedYear,
//       course: selectedCourse,
//       terms: selectedTerms,
//       registerNumber: student.registerNumber,
//       entryYear: student.entryYear,
//       imageUrl: student.imageUrl,
//     }));

//     const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);

//     if (response.status === 200) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Data saved successfully!',
//       }).then(() => {
//         // Reset the form or perform any other post-submission logic
//         setStudentsData([]); // Clear student data after successful submission
//         setSelectedLevel('');
//         setSelectedYear('');
//         setCourses([]);
//         setTerms([]);
//         setSelectedCourse('');
//         setSelectedTerms('');
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Unexpected response status ' + response.status,
//       });
//     }
//   } catch (error) {
//     console.error('Error submitting data:', error);

//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'An error occurred while saving data. Please try again.',
//     });
//   }
// };


// // Fetch student data based on selected level, year, and course
// // useEffect(() => {
// //   if (selectedLevel && selectedYear && selectedCourse && selectedTerms) {
// //     // Simulated API call to fetch student data based on selected level, year, and course
// //     const simulatedStudentData = getSimulatedStudentData(selectedCourse);

// //     // Filter student data based on the selected level
// //     const filteredStudentData = simulatedStudentData.filter(
// //       (student) => student.level === selectedLevel
// //     );

// //     setStudentsData(filteredStudentData);
// //   } else {
// //     setStudentsData([]);
// //   }
// // }, [selectedLevel, selectedYear, selectedCourse, selectedTerms]);


//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//           <Link to="/exam-records" className="btn btn-outline-danger bg-primary text-white btn-lg">
//             Exam Record List
//           </Link>
//         </div>

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
//                   <option key={course.id} value={course.courseTitle}>
//                     {course.courseTitle}
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
//                     <th>Register Number</th>
//                     {/* <th>Entry Year</th> */}
//                     <th>Level</th>
//                     {/* <th>Image</th> */}
//                     <th>Course Code</th>
//                     <th>Course Title</th>
//                     <th>CA</th>
//                     <th>Exam</th>
//                     <th>Total Score</th>
//                     <th>Grade</th>
//                     <th>Remark</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {studentsData.map((student, index) => (
//                     <tr key={student.name}>
//                       <td>{student.name}</td>
//                       <td>{student.registerNumber}</td>
//                       {/* <td>{student.entryYear}</td> */}
//                       <td>{student.level}</td>
//                       {/* <td>
//                         {student.imageUrl && (
//                           <img
//                             src={student.imageUrl}
//                             alt={`Profile of ${student.name}`}
//                             className="img-fluid rounded-circle"
//                             style={{ width: '50px', height: '50px' }}
//                           />
//                         )}
//                       </td> */}
//                       <td>{student.courseCode}</td>
//                       <td>{student.courseTitle}</td>
//                       <td>
//                         <input
//                           type="number"
//                           className="form-control sm-4"
//                           placeholder="Enter CA"
//                           value={student.CA}
//                           onChange={(e) => handleScoreChange(index, e.target.value, 'CA')}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="number"
//                           className="form-control sm-4"
//                           placeholder="Enter Exam"
//                           value={student.exam}
//                           onChange={(e) => handleScoreChange(index, e.target.value, 'Exam')}
//                         />
//                       </td>
//                       <td>{student.score}</td>
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


// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

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

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['Foundation', 'Pre-Nursery', 'Nursery', 'Pre-Primary', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);

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
//       const fetchedTerms = ['first', 'second', 'third'];
//       setTerms(fetchedTerms);
//     } else {
//       setTerms([]);
//       setSelectedTerms('');
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse && selectedTerms) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const simulatedStudentData = getSimulatedStudentData(selectedCourse);
//       setStudentsData(simulatedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedYear, selectedCourse, selectedTerms]);

//   const getSimulatedStudentData = (course) => {
//     const { courseCode, courseTitle } = getCourseDetails(course);

//     // Retrieve additional student information from local storage
//     const storedStudents = JSON.parse(localStorage.getItem('students')) || [];

//     // Use the retrieved student information to create simulated student data
//     const simulatedStudentData = storedStudents.students.map((student) => ({
//       name: student.studentName,
//       registerNumber: student.registerNumber,
//       entryYear: student.entryYear,
//       level: student.level,
//       imageUrl: student.imageUrl,
//       score: '',
//       courseCode,
//       courseTitle,
//       grade: 'Not Graded',
//       remark: '',
//     }));

//     return simulatedStudentData;
//   };

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         if (selectedLevel && selectedYear) {
//           const response = await axios.get(`http://localhost:8080/api/course-details/viewAllCourseDetails`);
//           const fetchedCourses = response.data;
//           setCourses(fetchedCourses);
//         } else {
//           setCourses([]);
//           setSelectedCourse('');
//         }
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//         // Handle the error, e.g., show an error message to the user
//       }
//     };

//     fetchCourses();
//   }, [selectedLevel, selectedYear]);

//   // Function to get course details based on selected course
//   const getCourseDetails = (selectedCourse) => {
//     const course = courses.find((course) => course.courseTitle === selectedCourse);
//     if (course) {
//       return { courseCode: course.courseCode, courseTitle: course.courseTitle };
//     } else {
//       return { courseCode: '', courseTitle: '' };
//     }
//   };

//   // Function to handle score input change
//   const handleScoreChange = (index, score, type) => {
//     const updatedStudentsData = [...studentsData];
//     const numericScore = parseInt(score, 10);

//     if (!isNaN(numericScore)) {
//       if (type === 'CA') {
//         updatedStudentsData[index].CA = numericScore;
//       } else if (type === 'Exam') {
//         updatedStudentsData[index].exam = numericScore;
//       }

//       // Calculate total score
//       const totalScore = (updatedStudentsData[index].CA || 0) + (updatedStudentsData[index].exam || 0);
//       updatedStudentsData[index].score = totalScore;

//       // Calculate grade and remark based on total score
//       updatedStudentsData[index].grade = calculateGrade(totalScore);
//       updatedStudentsData[index].remark = calculateRemark(updatedStudentsData[index].grade);
//     } else {
//       // Handle the case where the input is not a valid number
//       updatedStudentsData[index].CA = '';
//       updatedStudentsData[index].exam = '';
//       updatedStudentsData[index].score = '';
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

//   const handleSubmit = async () => {
//     try {
//       console.log('Submitted Data:', studentsData);

//       // Validation
//       if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse || !selectedTerms) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Incomplete or invalid data. Please fill in all fields.',
//         });
//         return;
//       }

//       // Retrieve additional student information from local storage
//       const additionalInfo = JSON.parse(localStorage.getItem('students')) || {};

//       const completeData = studentsData.map((student) => ({
//         ...student,
//         level: selectedLevel,
//         year: selectedYear,
//         course: selectedCourse,
//         terms: selectedTerms,
//         // Include additional student information
//         registerNumber: student.registerNumber || '',
//         entryYear: student.entryYear || '',
//         imageUrl: student.imageUrl || '',
//       }));

//       const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);

//       if (response.status === 200) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Data saved successfully!',
//         }).then(() => {
//           // Reset the form or perform any other post-submission logic
//           setStudentsData([]); // Clear student data after successful submission
//           setSelectedLevel('');
//           setSelectedYear('');
//           setCourses([]);
//           setTerms([]);
//           setSelectedCourse('');
//           setSelectedTerms('');
//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Unexpected response status ' + response.status,
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting data:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while saving data. Please try again.',
//       });
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//           <Link to="/exam-records" className="btn btn-outline-danger bg-primary text-white btn-lg">
//             Exam Record List
//           </Link>
//         </div>

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
//                   <option key={course.id} value={course.courseTitle}>
//                     {course.courseTitle}
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
//                 <option value="">Select Terms</option>
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
//                     <th>Register Number</th>
//                     <th>Entry Year</th>
//                     <th>Level</th>
//                     <th>Image</th>
//                     <th>Course Code</th>
//                     <th>Course Title</th>
//                     <th>CA</th>
//                     <th>Exam</th>
//                     <th>Total Score</th>
//                     <th>Grade</th>
//                     <th>Remark</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {studentsData.map((student, index) => (
//                     <tr key={student.name}>
//                       <td>{student.name}</td>
//                       <td>{student.registerNumber}</td>
//                       <td>{student.entryYear}</td>
//                       <td>{student.level}</td>
//                       <td>
//                         <img src={student.imageUrl} alt={student.name} className="img-fluid rounded-circle" />
//                       </td>
//                       <td>{student.courseCode}</td>
//                       <td>{student.courseTitle}</td>
//                       <td>
//                         <input
//                           type="number"
//                           className="form-control sm-4"
//                           placeholder="Enter CA"
//                           value={student.CA}
//                           onChange={(e) => handleScoreChange(index, e.target.value, 'CA')}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="number"
//                           className="form-control sm-4"
//                           placeholder="Enter Exam"
//                           value={student.exam}
//                           onChange={(e) => handleScoreChange(index, e.target.value, 'Exam')}
//                         />
//                       </td>
//                       <td>{student.score}</td>
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


// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

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

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['Foundation','Pre-Nursery','Nursery', 'Pre-Primary','Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);
  

//   // Fetch years based on selected level

//     // Fetch years based on selected level
//     useEffect(() => {
//       if (selectedLevel) {
//         // Simulated API call to fetch years based on selected level
//         const fetchedYears = generateYearRange();
//         setYears(fetchedYears);
//       } else {
//         setYears([]);
//         setSelectedYear('');
//       }
//     }, [selectedLevel]);



//   // Fetch courses based on selected level and year
//   useEffect(() => {
//     if (selectedLevel && selectedYear) {
//       // Simulated API call to fetch courses based on selected level and year
//       const fetchedTerms = ['first','second', 'third'];
//       setTerms(fetchedTerms);
//     } else {
//       setTerms([]);
//       setSelectedTerms('');
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse && selectedTerms) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const simulatedStudentData = getSimulatedStudentData(selectedCourse);
//       setStudentsData(simulatedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedYear, selectedCourse, selectedTerms]);


//   const getSimulatedStudentData = (course) => {
//     const { courseCode, courseTitle } = getCourseDetails(course);
  
//     // Retrieve student names from local storage
//     const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
  
//     // Use the retrieved student names to create simulated student data
//     const simulatedStudentData = storedStudents.map(student => ({
//       name: student.studentName,
//       score: '',
//       courseCode,
//       courseTitle,
//       grade: 'Not Graded',
//       remark: '',
      
//     }));
  
//     return simulatedStudentData;
//   };


//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         if (selectedLevel && selectedYear) {
//           const response = await axios.get(`http://localhost:8080/api/course-details/viewAllCourseDetails`);
//           const fetchedCourses = response.data;
//           setCourses(fetchedCourses);
//         } else {
//           setCourses([]);
//           setSelectedCourse('');
//         }
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//         // Handle the error, e.g., show an error message to the user
//       }
//     };

//     fetchCourses();
//   }, [selectedLevel, selectedYear]);

  

//   // Function to get course details based on selected course
// const getCourseDetails = (selectedCourse) => {
//   const course = courses.find((course) => course.courseTitle === selectedCourse);
//   if (course) {
//     return { courseCode: course.courseCode, courseTitle: course.courseTitle };
//   } else {
//     return { courseCode: '', courseTitle: '' };
//   }
// };




//   // Function to handle score input change
//   // const handleScoreChange = (index, score) => {
//   //   const updatedStudentsData = [...studentsData];
//   //   updatedStudentsData[index].score = score;
//   //   const numericScore = parseInt(score, 10);
//   //   if (!isNaN(numericScore)) {
//   //     updatedStudentsData[index].grade = calculateGrade(numericScore);
//   //     updatedStudentsData[index].remark = calculateRemark(updatedStudentsData[index].grade);
//   //   } else {
//   //     updatedStudentsData[index].grade = 'Not Graded';
//   //     updatedStudentsData[index].remark = '';
//   //   }
//   //   setStudentsData(updatedStudentsData);
//   // };

//   const handleScoreChange = (index, score, type) => {
//     const updatedStudentsData = [...studentsData];
//     const numericScore = parseInt(score, 10);
  
//     if (!isNaN(numericScore)) {
//       if (type === 'CA') {
//         updatedStudentsData[index].CA = numericScore;
//       } else if (type === 'Exam') {
//         updatedStudentsData[index].exam = numericScore;
//       }
  
//       // Calculate total score
//       const totalScore = (updatedStudentsData[index].CA || 0) + (updatedStudentsData[index].exam || 0);
//       updatedStudentsData[index].score = totalScore;
  
//       // Calculate grade and remark based on total score
//       updatedStudentsData[index].grade = calculateGrade(totalScore);
//       updatedStudentsData[index].remark = calculateRemark(updatedStudentsData[index].grade);
//     } else {
//       // Handle the case where the input is not a valid number
//       updatedStudentsData[index].CA = '';
//       updatedStudentsData[index].exam = '';
//       updatedStudentsData[index].score = '';
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


//     // Function to generate a range of years (past, current, and future)
// const generateYearRange = () => {
//   const currentYear = new Date().getFullYear();
//   const pastYearRange = 5; // Number of past years to include

//   const years = [];
//   for (let i = currentYear - pastYearRange; i <= currentYear; i++) {
//     years.push(i.toString());
//   }

//   return years;
// };


// // const handleSubmit = async () => {
// //   try {
// //     console.log('Submitted Data:', studentsData);

// //     if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'Incomplete or invalid data. Please fill in all fields.',
// //       });
// //       return;
// //     }

// //     const completeData = studentsData.map(student => ({
// //       ...student,
// //       level: selectedLevel,
// //       year: selectedYear,
// //       course: selectedCourse,
// //       terms: selectedTerms,
// //     }));

// //     const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);

// //     // const storedExamRecords = JSON.parse(localStorage.getItem('exam-records')) || [];
    
// //     if (response) {
// //       // If data has changed, update the state and save it to local storage
// //      const storedExamRecords =JSON.stringify(localStorage.setItem('exam-records', ));
// //      console.log(storedExamRecords);
// //     }
// //     if (response.status === 200) {
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Success',
// //         text: 'Data saved successfully!',
// //       }).then(() => {
// //         // Reset the form or perform any other post-submission logic
// //       });
// //     } else {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'Unexpected response status ' + response.status,
// //       });
// //     }
// //   } catch (error) {
// //     // Handle errors here
// //     // ...
// //   }
// // };


// const handleSubmit = async () => {
//   try {
//     console.log('Submitted Data:', studentsData);

//     // Validation
//     if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse || !selectedTerms) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Incomplete or invalid data. Please fill in all fields.',
//       });
//       return;
//     }

//     const completeData = studentsData.map(student => ({
//       ...student,
//       level: selectedLevel,
//       year: selectedYear,
//       course: selectedCourse,
//       terms: selectedTerms,
//     }));

//     const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);

//     if (response.status === 200) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Data saved successfully!',
//       }).then(() => {
//         // Reset the form or perform any other post-submission logic
//         setStudentsData([]); // Clear student data after successful submission
//         setSelectedLevel('');
//         setSelectedYear('');
//         setCourses([]);
//         setTerms([]);
//         setSelectedCourse('');
//         setSelectedTerms('');
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Unexpected response status ' + response.status,
//       });
//     }
//   } catch (error) {
//     console.error('Error submitting data:', error);

//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'An error occurred while saving data. Please try again.',
//     });
//   }
// };

  
//   return (
//     <div className="container mt-5">
//       <div className="card">
//       <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//           <h2 className="mb-0">Exam Results Viewer</h2>

//           <Link to="/exam-records" className="btn btn-outline-danger bg-primary text-white btn-lg">Exam Record List</Link>
//         </div>

         
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
//               className="custom-select custom-select-lg"
//               onChange={(e) => setSelectedCourse(e.target.value)}
//               disabled={!selectedYear}
//             >
//               <option value="">Select Course</option>
//               {courses.map((course) => (
//                 <option key={course.id} value={course.courseTitle}>
//                   {course.courseTitle}
//                 </option>
//               ))}
//             </select>
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
//                     <th> CA</th>
//                     <th>Exam</th>
//                     <th>Total Score</th>
//                     <th>Grade</th>
//                     <th>Remark</th>
//                   </tr>
//                 </thead>
//                 {/* <tbody>
//                   {studentsData.map((student, index) => (
//                     <tr key={student.name}>
//                       <td>{student.name}</td>
//                       <td>{student.courseCode}</td>
//                       <td>{student.courseTitle}</td>
//                       <td>
//                         <input
//                           type="number"
//                           className='form-control sm-4'
//                           placeholder="Enter score"
//                           value={student.score}
//                           onChange={(e) => handleScoreChange(index, e.target.value)}
//                         />
//                       </td>
//                       <td>{student.grade}</td>
//                       <td>{student.remark}</td>
//                     </tr>
//                   ))}
//                 </tbody> */}
//                 <tbody>
//               {studentsData.map((student, index) => (
//                 <tr key={student.name}>
//                   <td>{student.name}</td>
//                   <td>{student.courseCode}</td>
//                   <td>{student.courseTitle}</td>
//                   <td>
//                     <input
//                       type="number"
//                       className='form-control sm-4'
//                       placeholder="Enter CA"
//                       value={student.CA}
//                       onChange={(e) => handleScoreChange(index, e.target.value, 'CA')}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       className='form-control sm-4'
//                       placeholder="Enter Exam"
//                       value={student.exam}
//                       onChange={(e) => handleScoreChange(index, e.target.value, 'Exam')}
//                     />
//                   </td>
//                   <td>{student.score}</td>
//                   <td>{student.grade}</td>
//                   <td>{student.remark}</td>
//                 </tr>
//               ))}
//             </tbody>
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
//   // const studentNameUrl = 'http://localhost:8080/api/students';
//   const baseUrl = 'http://localhost:8080/api/students';

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['pre-school','Nursery', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);

//   // Simulated API call to fetch student names
//   useEffect(() => {
//     const fetchStudentNames = async () => {
//       try {
//         // const response = await axios.get(studentNameUrl+'names');
//         const response = await axios.get(baseUrl + '/viewAllStudents');

//         const studentNames = response.data.map((student) => student.studentName);
//         setStudentsData(studentNames.map((name) => ({ name, score: '', grade: 'Not Graded', remark: '' })));
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
//       if (response) {
//         // If data has changed, update the state and save it to local storage
//        const storedExamRecords =JSON.stringify(localStorage.setItem('exam-records', ));
//        console.log(storedExamRecords);
//       }
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
//       // ...
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//         </div>
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

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['pre-school','Nursery', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);
  

//   // Fetch years based on selected level
//   useEffect(() => {
//     if (selectedLevel) {
//       // Simulated API call to fetch years based on selected level
//       const fetchedYears = ['2021', '2022', '2023'];
//       setYears(fetchedYears);
//     } else {
//       setYears([]);
//       setSelectedYear('');
//     }
//   }, [selectedLevel]);

//     // Fetch years based on selected level
//     useEffect(() => {
//       if (selectedLevel) {
//         // Simulated API call to fetch years based on selected level
//         const fetchedYears = generateYearRange();
//         setYears(fetchedYears);
//       } else {
//         setYears([]);
//         setSelectedYear('');
//       }
//     }, [selectedLevel]);


//   // Fetch courses based on selected level and year
//   // useEffect(() => {
//   //   if (selectedLevel && selectedYear) {
//   //     // Simulated API call to fetch courses based on selected level and year
//   //     const fetchedCourses = ['Mathematics', 'English Language', 'Science'];
//   //     // const fetchedCourses = await axios.get( `http://localhost:8080/api/course-details/viewAllCourseDetails`);
//   //     setCourses(fetchedCourses);
//   //   } else {
//   //     setCourses([]);
//   //     setSelectedCourse('');
//   //   }
//   // }, [selectedLevel, selectedYear]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       if (selectedLevel && selectedYear) {
  //         const response = await axios.get(`http://localhost:8080/api/course-details/viewAllCourseDetails`);
  //         const fetchedCourses = response.data;
  //         setCourses(fetchedCourses);
  //       } else {
  //         setCourses([]);
  //         setSelectedCourse('');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching courses:', error);
  //       // Handle the error, e.g., show an error message to the user
  //     }
  //   };

  //   fetchCourses();
  // }, [selectedLevel, selectedYear]);

  
//   // Fetch courses based on selected level and year
//   useEffect(() => {
//     if (selectedLevel && selectedYear) {
//       // Simulated API call to fetch courses based on selected level and year
//       const fetchedTerms = ['first','second', 'third'];
//       setTerms(fetchedTerms);
//     } else {
//       setTerms([]);
//       setSelectedTerms('');
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse && selectedTerms) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const simulatedStudentData = getSimulatedStudentData(selectedCourse);
//       setStudentsData(simulatedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedYear, selectedCourse, selectedTerms]);

//   // Function to simulate different course titles and course codes based on selected course
//   // const getSimulatedStudentData = (course) => {
//   //   const { courseCode, courseTitle } = getCourseDetails(course);
//   //   return [
//   //     { name: 'Hillary Odogwu', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//   //     { name: 'Okpoto Promise', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//   //     { name: 'Pascal Oguike', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//   //     { name: 'Bryan Odogwu', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//   //     // Add more student data as needed
//   //   ];
//   // };

//   const getSimulatedStudentData = (course) => {
//     const { courseCode, courseTitle } = getCourseDetails(course);
  
//     // Retrieve student names from local storage
//     const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
  
//     // Use the retrieved student names to create simulated student data
//     const simulatedStudentData = storedStudents.map(student => ({
//       name: student.studentName,
//       score: '',
//       courseCode,
//       courseTitle,
//       grade: 'Not Graded',
//       remark: ''
//     }));
  
//     return simulatedStudentData;
//   };
  

//   // Function to get course details based on selected course
//   const getCourseDetails = (course) => {
//     switch (course) {
//       case 'Mathematics':
//         return { courseCode: 'MATH101', courseTitle: 'Mathematics' };
//       case 'English Language':
//         return { courseCode: 'ENG102', courseTitle: 'English Language' };
//       case 'Science':
//         return { courseCode: 'SCI103', courseTitle: 'Science' };
//       default:
//         return { courseCode: '', courseTitle: '' };
//     }
//   };

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


//     // Function to generate a range of years (past, current, and future)
//     const generateYearRange = () => {
//       const currentYear = new Date().getFullYear();
//       const pastYearRange = 5; // Number of past years to include
    
//       const years = [];
//       for (let i = currentYear - pastYearRange; i <= currentYear; i++) {
//         years.push(i.toString());
//       }
    
//       return years;
//     };
    

// const handleSubmit = async () => {
//   try {
//     console.log('Submitted Data:', studentsData);

//     if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Incomplete or invalid data. Please fill in all fields.',
//       });
//       return;
//     }

//     const completeData = studentsData.map(student => ({
//       ...student,
//       level: selectedLevel,
//       year: selectedYear,
//       course: selectedCourse,
//       terms: selectedTerms,
//     }));

//     const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);

//     // const storedExamRecords = JSON.parse(localStorage.getItem('exam-records')) || [];
    
//     if (response) {
//       // If data has changed, update the state and save it to local storage
//      const storedExamRecords =JSON.stringify(localStorage.setItem('exam-records', ));
//      console.log(storedExamRecords);
//     }
//     if (response.status === 200) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Data saved successfully!',
//       }).then(() => {
//         // Reset the form or perform any other post-submission logic
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Unexpected response status ' + response.status,
//       });
//     }
//   } catch (error) {
//     // Handle errors here
//     // ...
//   }
// };

  
//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//         </div>
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
            //   {/* <select
            //     className="custom-select custom-select-lg"
            //     onChange={(e) => setSelectedCourse(e.target.value)}
            //     disabled={!selectedYear}
            //   >
            //     <option value="">Select Course</option>
            //     {courses.map((course) => (
            //       <option key={course} value={course}>
            //         {course}
            //       </option>
            //     ))}
            //   </select> */}
            //   <select
            //   className="custom-select custom-select-lg"
            //   onChange={(e) => setSelectedCourse(e.target.value)}
            //   disabled={!selectedYear}
            // >
            //   <option value="">Select Course</option>
            //   {courses.map((course) => (
            //     <option key={course.id} value={course.courseTitle}>
            //       {course.courseTitle}
            //     </option>
            //   ))}
            // </select>
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
//                           className='form-control sm-4'
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

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['pre-school','Nursery', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);
  

//   // Fetch years based on selected level
//   useEffect(() => {
//     if (selectedLevel) {
//       // Simulated API call to fetch years based on selected level
//       const fetchedYears = ['2021', '2022', '2023'];
//       setYears(fetchedYears);
//     } else {
//       setYears([]);
//       setSelectedYear('');
//     }
//   }, [selectedLevel]);

//     // Fetch years based on selected level
//     useEffect(() => {
//       if (selectedLevel) {
//         // Simulated API call to fetch years based on selected level
//         const fetchedYears = generateYearRange();
//         setYears(fetchedYears);
//       } else {
//         setYears([]);
//         setSelectedYear('');
//       }
//     }, [selectedLevel]);


//   // Fetch courses based on selected level and year
//   // useEffect(() => {
//   //   if (selectedLevel && selectedYear) {
//   //     // Simulated API call to fetch courses based on selected level and year
//   //     const fetchedCourses = ['Mathematics', 'English Language', 'Science'];
//   //     setCourses(fetchedCourses);
//   //   } else {
//   //     setCourses([]);
//   //     setSelectedCourse('');
//   //   }
//   // }, [selectedLevel, selectedYear]);

//   // Fetch courses based on selected level and year
//   useEffect(() => {
//     if (selectedLevel && selectedYear) {
//       // Simulated API call to fetch courses based on selected level and year
//       const fetchedTerms = ['first','second', 'third'];
//       setTerms(fetchedTerms);
//     } else {
//       setTerms([]);
//       setSelectedTerms('');
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse && selectedTerms) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const simulatedStudentData = getSimulatedStudentData(selectedCourse);
//       setStudentsData(simulatedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedYear, selectedCourse, selectedTerms]);

//   // Function to simulate different course titles and course codes based on selected course
//   // const getSimulatedStudentData = (course) => {
//   //   const { courseCode, courseTitle } = getCourseDetails(course);
//   //   return [
//   //     { name: 'Hillary Odogwu', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//   //     { name: 'Okpoto Promise', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//   //     { name: 'Pascal Oguike', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//   //     { name: 'Bryan Odogwu', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//   //     // Add more student data as needed
//   //   ];
//   // };

//   const getSimulatedStudentData = (course) => {
//     const { courseCode, courseTitle } = getCourseDetails(course);
  
//     // Retrieve student names from local storage
//     const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
  
//     // Use the retrieved student names to create simulated student data
//     const simulatedStudentData = storedStudents.map(student => ({
//       name: student.studentName,
//       score: '',
//       courseCode,
//       courseTitle,
//       grade: 'Not Graded',
//       remark: ''
//     }));
  
//     return simulatedStudentData;
//   };


//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         if (selectedLevel && selectedYear) {
//           const response = await axios.get(`http://localhost:8080/api/course-details/viewAllCourseDetails`);
//           const fetchedCourses = response.data;
//           setCourses(fetchedCourses);
//         } else {
//           setCourses([]);
//           setSelectedCourse('');
//         }
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//         // Handle the error, e.g., show an error message to the user
//       }
//     };

//     fetchCourses();
//   }, [selectedLevel, selectedYear]);

  

//   // Function to get course details based on selected course
// const getCourseDetails = (selectedCourse) => {
//   const course = courses.find((course) => course.courseTitle === selectedCourse);
//   if (course) {
//     return { courseCode: course.courseCode, courseTitle: course.courseTitle };
//   } else {
//     return { courseCode: '', courseTitle: '' };
//   }
// };


//   // Function to get course details based on selected course
//   // const getCourseDetails = (course) => {
//   //   switch (course) {
//   //     case 'Mathematics':
//   //       return { courseCode: 'MATH101', courseTitle: 'Mathematics' };
//   //     case 'English Language':
//   //       return { courseCode: 'ENG102', courseTitle: 'English Language' };
//   //     case 'Science':
//   //       return { courseCode: 'SCI103', courseTitle: 'Science' };
//   //     default:
//   //       return { courseCode: '', courseTitle: '' };
//   //   }
//   // };

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


//     // Function to generate a range of years (past, current, and future)
//     const generateYearRange = () => {
//       const currentYear = new Date().getFullYear();
//       const pastYearRange = 5; // Number of past years to include
    
//       const years = [];
//       for (let i = currentYear - pastYearRange; i <= currentYear; i++) {
//         years.push(i.toString());
//       }
    
//       return years;
//     };
    

// const handleSubmit = async () => {
//   try {
//     console.log('Submitted Data:', studentsData);

//     if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Incomplete or invalid data. Please fill in all fields.',
//       });
//       return;
//     }

//     const completeData = studentsData.map(student => ({
//       ...student,
//       level: selectedLevel,
//       year: selectedYear,
//       course: selectedCourse,
//       terms: selectedTerms,
//     }));

//     const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);

//     // const storedExamRecords = JSON.parse(localStorage.getItem('exam-records')) || [];
    
//     if (response) {
//       // If data has changed, update the state and save it to local storage
//      const storedExamRecords =JSON.stringify(localStorage.setItem('exam-records', ));
//      console.log(storedExamRecords);
//     }
//     if (response.status === 200) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Data saved successfully!',
//       }).then(() => {
//         // Reset the form or perform any other post-submission logic
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Unexpected response status ' + response.status,
//       });
//     }
//   } catch (error) {
//     // Handle errors here
//     // ...
//   }
// };

  
//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//         </div>
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
//               {/* <select
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
//               </select> */}
 
//               <select
//               className="custom-select custom-select-lg"
//               onChange={(e) => setSelectedCourse(e.target.value)}
//               disabled={!selectedYear}
//             >
//               <option value="">Select Course</option>
//               {courses.map((course) => (
//                 <option key={course.id} value={course.courseTitle}>
//                   {course.courseTitle}
//                 </option>
//               ))}
//             </select>
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
//                           className='form-control sm-4'
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



// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const AddExamRecord = () => {
//   const [schoolLevels, setSchoolLevels] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState('');
//   const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [studentsData, setStudentsData] = useState([]);

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['pre-school','Nursery', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);

//   // Fetch years based on selected level
//   useEffect(() => {
//     if (selectedLevel) {
//       // Simulated API call to fetch years based on selected level
//       const fetchedYears = ['2021', '2022', '2023'];
//       setYears(fetchedYears);
//     } else {
//       setYears([]);
//       setSelectedYear('');
//     }
//   }, [selectedLevel]);

//     // Fetch years based on selected level
//     useEffect(() => {
//       if (selectedLevel) {
//         // Simulated API call to fetch years based on selected level
//         const fetchedYears = generateYearRange();
//         setYears(fetchedYears);
//       } else {
//         setYears([]);
//         setSelectedYear('');
//       }
//     }, [selectedLevel]);


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

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const simulatedStudentData = getSimulatedStudentData(selectedCourse);
//       setStudentsData(simulatedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   // Function to simulate different course titles and course codes based on selected course
//   const getSimulatedStudentData = (course) => {
//     const { courseCode, courseTitle } = getCourseDetails(course);
//     return [
//       { name: 'Hillary Odogwu', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//       { name: 'Okpoto Promise', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//       { name: 'Pascal Oguike', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//       { name: 'Bryan Odogwu', score: '', courseCode, courseTitle, grade: 'Not Graded', remark: '' },
//       // Add more student data as needed
//     ];
//   };

//   // Function to get course details based on selected course
//   const getCourseDetails = (course) => {
//     switch (course) {
//       case 'Mathematics':
//         return { courseCode: 'MATH101', courseTitle: 'Mathematics' };
//       case 'English Language':
//         return { courseCode: 'ENG102', courseTitle: 'English Language' };
//       case 'Science':
//         return { courseCode: 'SCI103', courseTitle: 'Science' };
//       default:
//         return { courseCode: '', courseTitle: '' };
//     }
//   };

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


//     // Function to generate a range of years (past, current, and future)
//     const generateYearRange = () => {
//       const currentYear = new Date().getFullYear();
//       const pastYearRange = 5; // Number of past years to include
    
//       const years = [];
//       for (let i = currentYear - pastYearRange; i <= currentYear; i++) {
//         years.push(i.toString());
//       }
    
//       return years;
//     };
    

// const handleSubmit = async () => {
//   try {
//     console.log('Submitted Data:', studentsData);

//     if (studentsData.length === 0 || !selectedLevel || !selectedYear || !selectedCourse) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Incomplete or invalid data. Please fill in all fields.',
//       });
//       return;
//     }

//     const completeData = studentsData.map(student => ({
//       ...student,
//       level: selectedLevel,
//       year: selectedYear,
//       course: selectedCourse,
//     }));

//     const response = await axios.post('http://localhost:8080/api/exam-records/createExam', completeData);

//     if (response.status === 200) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Data saved successfully!',
//       }).then(() => {
//         // Reset the form or perform any other post-submission logic
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Unexpected response status ' + response.status,
//       });
//     }
//   } catch (error) {
//     // Handle errors here
//     // ...
//   }
// };

  
//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//         </div>
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-4">
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

//             <div className="col-md-4">
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

//             <div className="col-md-4">
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
//                           className='form-control sm-4'
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


// import React, { useState, useEffect } from 'react';

// const AddExamRecord = () => {
//   const [schoolLevels, setSchoolLevels] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState('');
//   const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [studentsData, setStudentsData] = useState([]);

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['Nursery', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);

//   // Fetch years based on selected level
//   useEffect(() => {
//     if (selectedLevel) {
//       // Simulated API call to fetch years based on selected level
//       const fetchedYears = ['2021', '2022', '2023'];
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

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const simulatedStudentData = getSimulatedStudentData(selectedCourse);
//       setStudentsData(simulatedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   // Function to simulate different course titles and course codes based on selected course
//   const getSimulatedStudentData = (course) => {
//     const { courseCode, courseTitle } = getCourseDetails(course);
//     return [
//       { name: 'John Doe', score: '', courseCode, courseTitle, grade: 'Not Graded' },
//       { name: 'Jane Smith', score: '', courseCode, courseTitle, grade: 'Not Graded' },
//       { name: 'Alice Johnson', score: '', courseCode, courseTitle, grade: 'Not Graded' },
//       // Add more student data as needed
//     ];
//   };

//   // Function to get course details based on selected course
//   const getCourseDetails = (course) => {
//     switch (course) {
//       case 'Mathematics':
//         return { courseCode: 'MATH101', courseTitle: 'Mathematics' };
//       case 'English Language':
//         return { courseCode: 'ENG102', courseTitle: 'English Language' };
//       case 'Science':
//         return { courseCode: 'SCI103', courseTitle: 'Science' };
//       default:
//         return { courseCode: '', courseTitle: '' };
//     }
//   };

//   // Function to handle score input change
//   const handleScoreChange = (index, score) => {
//     const updatedStudentsData = [...studentsData];
//     updatedStudentsData[index].score = score;
//     updatedStudentsData[index].grade = calculateGrade(score);
//     setStudentsData(updatedStudentsData);
//   };

//   // Function to calculate grade based on score
//   const calculateGrade = (score) => {
//     const numericScore = parseInt(score, 10);
//     if (!isNaN(numericScore)) {
//       if (numericScore >= 75) {
//         return 'A';
//       } else if (numericScore >= 60) {
//         return 'B';
//       } else if (numericScore >= 50) {
//         return 'C';
//       } else if (numericScore >= 40) {
//         return 'D';
//       } else {
//         return 'F';
//       }
//     }
//     return 'Not Graded';
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//         </div>
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-4">
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
//             <div className="col-md-4">
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
//             <div className="col-md-4">
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
//           </div>

//           {selectedLevel && selectedYear && selectedCourse && studentsData.length > 0 && (
//             <div>
//               <h3>Student Scores for {selectedCourse}</h3>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Course Code</th>
//                     <th>Course Title</th>
//                     <th>Score</th>
//                     <th>Grade</th>
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
//                         className="form-control col-sm-6"
//                           type="number"
//                           placeholder="Enter score"
//                           value={student.score}
//                           onChange={(e) => handleScoreChange(index, e.target.value)}
//                         />
//                       </td>
//                       <td>{student.grade}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExamRecord;



// import React, { useState, useEffect } from 'react';

// const AddExamRecord = () => {
//   const [schoolLevels, setSchoolLevels] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState('');
//   const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [studentsData, setStudentsData] = useState([]);

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['Nursery', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);

//   // Fetch years based on selected level
//   useEffect(() => {
//     if (selectedLevel) {
//       // Simulated API call to fetch years based on selected level
//       const fetchedYears = ['2021', '2022', '2023'];
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

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const simulatedStudentData = getSimulatedStudentData(selectedCourse);
//       setStudentsData(simulatedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   // Function to simulate different course titles and course codes based on selected course
//   const getSimulatedStudentData = (course) => {
//     const { courseCode, courseTitle } = getCourseDetails(course);
//     return [
//       { name: 'John Doe', score: 85, courseCode, courseTitle, grade: 'A' },
//       { name: 'Jane Smith', score: 92, courseCode, courseTitle, grade: 'A+' },
//       { name: 'Alice Johnson', score: 88, courseCode, courseTitle, grade: 'A-' },
//       // Add more student data as needed
//     ];
//   };

//   // Function to get course details based on selected course
//   const getCourseDetails = (course) => {
//     switch (course) {
//       case 'Mathematics':
//         return { courseCode: 'MATH101', courseTitle: 'Mathematics' };
//       case 'English Language':
//         return { courseCode: 'ENG102', courseTitle: 'English Language' };
//       case 'Science':
//         return { courseCode: 'SCI103', courseTitle: 'Science' };
//       default:
//         return { courseCode: '', courseTitle: '' };
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//         </div>
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-4">
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
//             <div className="col-md-4">
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
//             <div className="col-md-4">
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
//           </div>

//           {selectedLevel && selectedYear && selectedCourse && studentsData.length > 0 && (
//             <div>
//               <h3>Student Scores for {selectedCourse}</h3>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Course Code</th>
//                     <th>Course Title</th>
//                     <th>Score</th>
//                     <th>Grade</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {studentsData.map((student) => (
//                     <tr key={student.name}>
//                       <td>{student.name}</td>
//                       <td>{student.courseCode}</td>
//                       <td>{student.courseTitle}</td>
//                       <td>{student.score}</td>
//                       <td>{student.grade}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExamRecord;


// import React, { useState, useEffect } from 'react';

// const AddExamRecord = () => {
//   const [schoolLevels, setSchoolLevels] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState('');
//   const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [studentsData, setStudentsData] = useState([]);

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['Nursery', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);

//   // Fetch years based on selected level
//   useEffect(() => {
//     if (selectedLevel) {
//       // Simulated API call to fetch years based on selected level
//       const fetchedYears = ['2021', '2022', '2023'];
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

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const fetchedStudentData = [
//         { name: 'John Doe', score: 85, courseCode: 'MATH101', courseTitle: 'Mathematics', grade: 'A' },
//         { name: 'Jane Smith', score: 92, courseCode: 'ENG102', courseTitle: 'English Language', grade: 'A+' },
//         { name: 'Alice Johnson', score: 88, courseCode: 'SCI103', courseTitle: 'Science', grade: 'A-' },
//         // Add more student data as needed
//       ];
//       setStudentsData(fetchedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//         </div>
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-4">
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
//             <div className="col-md-4">
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
//             <div className="col-md-4">
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
//           </div>

//           {selectedLevel && selectedYear && selectedCourse && studentsData.length > 0 && (
//             <div>
//               <h3>Student Scores for {selectedCourse}</h3>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Course Code</th>
//                     <th>Course Title</th>
//                     <th>Score</th>
//                     <th>Grade</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {studentsData.map((student) => (
//                     <tr key={student.name}>
//                       <td>{student.name}</td>
//                       <td>{student.courseCode}</td>
//                       <td>{student.courseTitle}</td>
//                       <td>{student.score}</td>
//                       <td>{student.grade}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExamRecord;

// import React, { useState, useEffect } from 'react';

// const AddExamRecord = () => {
//   const [schoolLevels, setSchoolLevels] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState('');
//   const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [studentsData, setStudentsData] = useState([]);

//   // Fetch school levels on component mount
//   useEffect(() => {
//     // Simulated API call to fetch school levels
//     const fetchedSchoolLevels = ['Nursery', 'Primary', 'Secondary'];
//     setSchoolLevels(fetchedSchoolLevels);
//   }, []);

//   // Fetch years based on selected level
//   useEffect(() => {
//     if (selectedLevel) {
//       // Simulated API call to fetch years based on selected level
//       const fetchedYears = ['2021', '2022', '2023'];
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

//   // Fetch student data based on selected level, year, and course
//   useEffect(() => {
//     if (selectedLevel && selectedYear && selectedCourse) {
//       // Simulated API call to fetch student data based on selected level, year, and course
//       const fetchedStudentData = [
//         { name: 'John Doe', score: 85 },
//         { name: 'Jane Smith', score: 92 },
//         { name: 'Alice Johnson', score: 88 },
//         // Add more student data as needed
//       ];
//       setStudentsData(fetchedStudentData);
//     } else {
//       setStudentsData([]);
//     }
//   }, [selectedLevel, selectedYear, selectedCourse]);

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Exam Results Viewer</h2>
//         </div>
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-4">
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
//             <div className="col-md-4">
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
//             <div className="col-md-4">
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
//           </div>

//           {selectedLevel && selectedYear && selectedCourse && (
//             <div>
//               <h3>Student Scores for {selectedCourse}</h3>
//               <ul>
//                 {studentsData.map((student) => (
//                   <li key={student.name}>
//                     {student.name}: {student.score}
//                   </li>
//                 ))}
//               </ul>
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
// import Swal from 'sweetalert2';
// import { Link, useNavigate } from 'react-router-dom';

// const AddExamRecord = () => {
//   const navigate = useNavigate();

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

//   // const handleSubmit = async () => {
//   //   try {
//   //     // Send POST request to the Spring Boot API
//   //     const response = await axios.post('http://localhost:8080/api/student-exam-records/create', studentData);
      
//   //     // Show success message using Swal
//   //     Swal.fire({
//   //       icon: 'success',
//   //       title: 'Success',
//   //       text: 'Student Exam Record added successfully!',
//   //     }).then(() => {
//   //       // Redirect to the fees page after success
//   //       navigate('/fees');
//   //     });
//   //   } catch (error) {
//   //     console.error('API Error:', error);

//   //     // Show error message using Swal
//   //     Swal.fire({
//   //       icon: 'error',
//   //       title: 'Error',
//   //       text: 'An error occurred while adding the student exam record.',
//   //     });
//   //   }
//   // };

//   const handleSubmit = async () => {
//     try {
//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZGR5IiwiaWF0IjoxNzAwODQ3MzcwLCJleHAiOjE3MDA4NDkxNzB9.DyFYh8TGM-TrMR6KeMIZO7btSJE2IA3De_Nwd7OUxr4',
//         'Access-Control-Allow-Origin': '*', // Change this to your actual frontend domain in production
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       };
  
//       const response = await axios.post('http://localhost:8080/api/student-exam-records/create', studentData, { headers });
//       console.log(response);
//       // Show success message using Swal
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Student Exam Record added successfully!',
//       }).then(() => {
//         // Redirect to the fees page after success
//         navigate('/fees');
//       });
//     } catch (error) {
//       console.error('API Error:', error);
  
//       // Show error message using Swal
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the student exam record.',
//       });
//     }
//   };
  
//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h2 className="mb-0">Relax!! Add Student Exam Record.... With A Smile </h2>
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
//                   className="custom-select custom-select-lg mb-3"
//                   name="schoolLevel"
//                   value={studentData.schoolLevel}
//                   onChange={handleInputChange}
//                 >
//                   <option selected>Open and select school Level</option>
//                   <option value="nursery">Nursery</option>
//                   <option value="primary">Primary</option>
//                   <option value="secondary">Secondary</option>
//                 </select>
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">School Session:</label>
//                 <select
//                   className="custom-select custom-select-lg mb-3"
//                   name="schoolSession"
//                   value={studentData.schoolSession}
//                   onChange={handleInputChange}
//                 >
//                   <option selected>Open and select school Session</option>
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
//               <div className="row">
//                 {studentData.courses.map((course, index) => (
//                   <div key={index} className="col-md-3 mb-3">
//                     <label className="form-label">Subject Code:</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={course.courseCode}
//                       onChange={(e) => handleCourseChange(index, 'courseCode', e.target.value)}
//                     />
//                     <label className="form-label">Subject Name:</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={course.courseTitle}
//                       onChange={(e) => handleCourseChange(index, 'courseTitle', e.target.value)}
//                     />
//                     <label className="form-label">Subject Remark:  (ie good, excellent, etc)</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={course.status}
//                       onChange={(e) => handleCourseChange(index, 'status', e.target.value)}
//                     />
//                     <label className="form-label">Grade:</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={course.grade}
//                       onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
//                     />
//                     <label className="form-label">Score:</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={course.score}
//                       onChange={(e) => handleCourseChange(index, 'score', parseInt(e.target.value))}
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-danger mt-2"
//                       onClick={() => removeCourse(index)}
//                     >
//                       Remove Course
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <button type="button" className="btn btn-success mt-3" onClick={addCourse}>
//                 Add Course
//               </button>
//             </div>

//             {/* <div class="input-group">
//                 <div class="input-group-prepend">
//                     <span class="input-group-text">Teachers remark:</span>
//                 </div>
//                 <textarea class="form-control" aria-label="With textarea"></textarea>
//                 </div> */}
//             <button type="button" className="btn btn-primary" onClick={handleSubmit}>
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExamRecord;
