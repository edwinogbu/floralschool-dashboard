// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import axios from 'axios';

// const Section = ({ title, data }) => (
//   <div className="card mb-4">
//     <div className="card-header bg-primary text-white">
      // <div className="d-flex row mb-2">
      //   <div className="col-4 font-weight-bold">{title}</div>
      //   <div className="col-4 font-weight-bold">Grade</div>
      //   <div className="col-4 font-weight-bold">Remark</div>
      // </div>
//     </div>

//     <div className="card-body">
//       {data.map(({ label, score }) => (
//         <div key={label} className="row mb-2">
//           <div className="col-4">{label}</div>
//           <div className="col-4 font-weight-bold">{getGrade(score)}</div>
//           <div className="col-4 font-weight-bold">{getRemark(getGrade(score))}</div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const getGrade = (score) => {
//   // Your logic to determine grade based on score
//   // This is a simple example, you can customize it as needed
//   if (score >= 90) {
//     return 'A+';
//   } else if (score >= 80) {
//     return 'A';
//   } else if (score >= 70) {
//     return 'A-';
//   } else if (score >= 60) {
//     return 'B+';
//   } else if (score >= 50) {
//     return 'B';
//   } else {
//     return 'F';
//   }
// };

// const getRemark = (grade) => {
//   // Your logic to determine remark based on grade
//   // This is a simple example, you can customize it as needed
//   switch (grade) {
//     case 'A+':
//       return 'Excellent';
//     case 'A':
//       return 'Very Good';
//     case 'A-':
//       return 'Good';
//     case 'B+':
//       return 'Satisfactory';
//     case 'B':
//       return 'Average';
//     default:
//       return 'Not Specified';
//   }
// };

// const PreschoolResultTable = ({
//   studentName,
//   registraterNumber,
//   level,
//   terms,
//   academicData,
//   classAverage,
//   totalScore
// }) => {
//   const [apiData, setApiData] = useState([]); // State to hold API-retrieved data

//   useEffect(() => {
//     // Fetch exam records on component mount
//     axios.get('http://localhost:8080/api/exam-records/viewAllExam')
//       .then(response => {
//         setApiData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching exam records:', error);
//       });
//   }, []); // Empty dependency array ensures this effect runs once on component mount

//   // Filter API data based on dummy data labels
//   const filteredApiData = apiData.filter((apiItem) =>
//     // Adjust this condition based on your actual data structure
//     apiItem.registraterNumber === registraterNumber
//   );

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="container p-3">
//       <div className="card card-body">
//         <div className="row">
//           <div className="col">
//             <div className="header">
//               <div className="school-name mb-4 h-100 bg-primary justify-content-center text-light">
//                 <h1 className='mb-5 text-center text-bold'>Preschool Name</h1>
//                 <p className='text-primary text-center text-bold'>Student Name: {studentName}</p>
//                 <p className='text-primary text-center text-bold'>Registration Number: {registraterNumber}</p>
//               </div>
//             </div>
//             <div className="card">
//               <div className="card-header bg-primary text-white text-center">
//                 <h4 className="font-weight-bold">Preschool Result Sheet</h4>
//                 <h5 className="font-weight-bold">Name: {studentName}</h5>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Use filtered API data to display relevant sections */}
//         {filteredApiData.map(({ title, data }) => (
//           <Section key={title} title={title} data={data} />
//         ))}
//       </div>
//       <div className="text-center mt-3">
//         <Button variant="secondary" onClick={handlePrint} className="custom-form-control btn-lg btn-12 d-print-none">
//           Print Result
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PreschoolResultTable;


// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import axios from 'axios';


// const Section = ({ title, grade_title, data }) => (
//   <div className="card mb-4">
//     <div className="card-header bg-primary text-white">
//       <div className="d-flex row mb-2">
//         <div className="col-4 font-weight-bold">{title}</div>
//         <div className="col-4 font-weight-bold">Grade</div>
//         <div className="col-4 font-weight-bold">Remark</div>
//       </div>
//     </div>

//     <div className="card-body">
//       {data.map(({ label, grade }) => (
//         <div key={label} className="row mb-2">
//           <div className="col-4">{label}</div>
//           <div className="col-4 font-weight-bold">{grade}</div>
//           <div className="col-4 font-weight-bold">{getRemark(grade)}</div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const getRemark = (grade) => {
//   switch (grade) {
//     case 'A+':
//       return 'Excellent';
//     case 'A':
//       return 'Very Good';
//     case 'A-':
//       return 'Good';
//     case 'B+':
//       return 'Satisfactory';
//     case 'B':
//       return 'Average';
//     default:
//       return 'Not Specified';
//   }
// };

// const PreschoolResultTable = () => {
  // const [studentDetails, setStudentDetails] = useState({
  //   schoolName: 'THE FLORAL SCHOOL NURSERY & PRIMARY SCHOOL',
  //   schoolAddress: '12 Moses Emeya Close Off Social Club Road New Oko Oba',
  //   schoolMotto: 'Believe-Achieve-Succeed',
  //   schoolEmail: 'info@perfectangelsschool.com.ng',
  //   studentName: 'Isreal Agbo',
  //   sections: [
  //     // Your dummy data sections...
  //   ],
  // });

//   const [apiData, setApiData] = useState([]); // State to hold API-retrieved data

//   // useEffect(() => {
//   //   // Fetch API data and update the state
//   //   // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
//   //   fetch('YOUR_API_ENDPOINT')
//   //     .then((response) => response.json())
//   //     .then((data) => setApiData(data))
//   //     .catch((error) => console.error('Error fetching API data:', error));
//   // }, []); // Empty dependency array ensures this effect runs once on component mount


//   useEffect(() => {
//     // Fetch exam records on component mount
//     axios.get('http://localhost:8080/api/exam-records/viewAllExam')
//       .then(response => {
//         setApiData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching exam records:', error);
//       });
//   }, []); // Empty dependency array ensures this effect runs once on component mount

//   // Filter API data based on dummy data labels
//   const filteredApiData = apiData.filter((apiItem) =>
//   studentDetails.sections.some((dummyItem) =>
//     dummyItem.data.some((dummyDataItem) => dummyDataItem.label === apiItem.courseTitle)
//   )
// );

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
    // <div className="container p-3">
    //   <div className="card card-body">
    //     <div className="row">
    //       <div className="col">
    //         <div className="header">
    //           <div className="logo text-center">
    //             <img
    //               className="sidebar-card-illustration mb-2"
    //               src="img/logo.jpg"
    //               alt="..."
    //               style={{ width: 180, height: 180 }}
    //             />
    //           </div>
    //           <div className="school-name mb-4 h-100 bg-primary justify-content-center text-light">
    //             <h1 className='mb-5 text-center text-bold'>{studentDetails.schoolName}</h1>
    //             <p className='text-white text-center text-bold'>{studentDetails.schoolAddress}</p>
    //             <p className='text-white text-center text-bold'>Motto: {studentDetails.schoolMotto}</p>
    //             <p className='text-primary text-center text-bold'>{studentDetails.schoolEmail}</p>
    //           </div>
    //         </div>
    //         <div className="card">
    //           <div className="card-header bg-primary text-white text-center">
    //             <h4 className="font-weight-bold">Preschool Result Sheet</h4>
    //             <h5 className="font-weight-bold">Name: {studentDetails.studentName}</h5>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
//         {/* Use filtered API data to display relevant sections */}
//         {studentDetails.sections.map(({ title, grade_title, data }) => (
//           <Section key={title} title={title} grade_title={grade_title} data={data} />
//         ))}
//       </div>
//       <div className="text-center mt-3">
//         <Button variant="secondary" onClick={handlePrint} className="custom-form-control btn-lg btn-12 d-print-none">
//           Print Result
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PreschoolResultTable;


// import React from 'react';
// import { Button } from 'react-bootstrap';


// // const Section = ({ title, grade_title, data }) => (
// //   <div className="card mb-4">
// //     <div className="card-header bg-primary text-white">
// //       <div className="d-flex row mb-2">
// //         <div className="col-4 font-weight-bold">{title}</div>
// //         <div className="col-4 font-weight-bold">Grade</div>
// //         <div className="col-4 font-weight-bold">Remark</div>
// //       </div>
// //     </div>

// //     <div className="card-body">
// //       {data.map(({ label, grade }) => (
// //         <div key={label} className="row mb-2">
// //           <div className="col-4">{label}</div>
// //           <div className="col-4 font-weight-bold">{grade}</div>
// //           <div className="col-4 font-weight-bold">Remark</div>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );


// const Section = ({ title, grade_title, data }) => (
//   <div className="card mb-4">
//     <div className="card-header bg-primary text-white">
//       <div className="d-flex row mb-2">
//         <div className="col-4 font-weight-bold">{title}</div>
//         <div className="col-4 font-weight-bold">Grade</div>
//         <div className="col-4 font-weight-bold">Remark</div>
//       </div>
//     </div>

//     <div className="card-body">
//       {data.map(({ label, grade }) => (
//         <div key={label} className="row mb-2">
//           <div className="col-4">{label}</div>
//           <div className="col-4 font-weight-bold">{grade}</div>
//           <div className="col-4 font-weight-bold">{getRemark(grade)}</div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const getRemark = (grade) => {
//   // Add your custom remark logic based on the grade
//   switch (grade) {
//     case 'A+':
//       return 'Excellent';
//     case 'A':
//       return 'Very Good';
//     case 'A-':
//       return 'Good';
//     case 'B+':
//       return 'Satisfactory';
//     case 'B':
//       return 'Average';
//     default:
//       return 'Not Specified';
//   }
// };

// const PreschoolResultTable = () => {
//   const sections = [
//     {
//       title: 'Communication Skills',
//       grade_title: 'Student Grad',

//       data: [
//         { label: 'Speaking', grade: 'A' },
//         { label: 'Responses', grade: 'B' },
//         { label: 'Routine', grade: 'A+' },
//         { label: 'Understanding', grade: 'A-' },
//       ],
//     },
//     {
//       title: 'Emotional Skills',
//       grade_title: 'Student Grad',

//       data: [
//         { label: 'Emotional Assessment', grade: 'B+' },
//         { label: 'Empathy', grade: 'A' },
//         { label: 'Self-Awareness', grade: 'A-' },
//         { label: 'Social Skills', grade: 'B' },
//         { label: 'Cooperation', grade: 'A' },
//       ],
//     },
//     {
//       title: 'Reading',
//       grade_title: 'Student Grad',

//       data: [
//         { label: 'Basic Reading', grade: 'A+' },
//         { label: 'Story Comprehension', grade: 'A' },
//       ],
//     },
//     {
//       title: 'Motor Skills',
//       grade_title: 'Student Grad',
//       data: [
//         { label: 'Can hold and use pencil', grade: 'A' },
//         { label: 'Can hold and use crayon', grade: 'B+' },
//         { label: 'Can bounce a ball', grade: 'A-' },
//         { label: 'Can kick a ball', grade: 'B' },
//         { label: 'Can jump up and down', grade: 'A' },
//         { label: 'Can sing rhymes', grade: 'A+' },
//       ],
//     },
//     {
//       title: 'Numbers',
//       grade_title: 'Student Grad',

//       data: [
//         { label: 'Recognizes numbers one to ten', grade: 'A' },
//         { label: 'Understands empty and full', grade: 'A-' },
//       ],
//     },
//     {
//       title: 'Colors and Shapes',
//       grade_title: 'Student Grad',

//       data: [
//         { label: 'Knows primary colors', grade: 'B+' },
//         { label: 'Knows shapes', grade: 'A' },
//       ],
//     },
//   ];

//   const handlePrint= ()=>{
//     window.print();
//   }

//   return (
//     <div className="container p-3">
//     <div className="card card-body">
      
//       <div className="row">
//         <div className="col">
//         <div className="header">
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
//           <div className="card">
//             <div className="card-header bg-primary text-white text-center">
//               <h4 className="font-weight-bold">Preschool Result Sheet</h4>
//               <h5 className="font-weight-bold">Name: Isreal Agbo</h5>
//             </div>
//           </div>
//         </div>
//       </div>
//       {sections.map(({ title, grade_title, data }) => (
//         <Section key={title} title={title} grade_title={grade_title} data={data} />
//       ))}
//     </div>
//     <>
//        <div className="text-center mt-3">
//                 {/* New: Print Button */}
//                 <Button variant="secondary" onClick={handlePrint} className="custom-form-control btn-lg btn-12 d-print-none">
//                   Print Result
//                 </Button>
//       </div>
//       </>
//     </div>
//   );
// };

// export default PreschoolResultTable;


import React, { useState } from 'react';

const Section = ({ title, data }) => (
  <div className="card">
    <div className="card-header bg-primary text-white">
    <div className="d-flex row mb-2">
        <div className="col-4 font-weight-bold">coursTitle</div>
        <div className="col-4 font-weight-bold">Grade</div>
        <div className="col-4 font-weight-bold">Remark</div>
      </div>
    </div>
    <div className="card-body">
      {data.map(({ coursTitle, grade }) => (
        <div key={coursTitle} className="row mb-1">
          <div className="col-sm-4">{coursTitle}</div>
          <div className="col-sm-4 font-weight-bold">{grade}</div>
          <div className="col-4 font-weight-bold">{getRemark(grade)}</div>
        </div>
      ))}
    </div>
  </div>
);
const getGrade = (score) => {
  // Your logic to determine grade based on score
  // This is a simple example, you can customize it as needed
  if (score >= 90) {
    return 'A+';
  } else if (score >= 80) {
    return 'A';
  } else if (score >= 70) {
    return 'A-';
  } else if (score >= 60) {
    return 'B+';
  } else if (score >= 50) {
    return 'B';
  } else {
    return 'F';
  }
};

const getRemark = (grade) => {
  // Your logic to determine remark based on grade
  // This is a simple example, you can customize it as needed
  switch (grade) {
    case 'A+':
      return 'Excellent';
    case 'A':
      return 'Very Good';
    case 'A-':
      return 'Good';
    case 'B+':
      return 'Satisfactory';
    case 'B':
      return 'Average';
    default:
      return 'Not Specified';
  }
};


const PreschoolResultTable =  ({
  studentName,
  registraterNumber,
  level,
  terms,
  academicData,
  classAverage,
  totalScore,
}) => {

  const [studentDetails, setStudentDetails] = useState({
    schoolName: 'THE FLORAL SCHOOL NURSERY & PRIMARY SCHOOL',
    schoolAddress: '12 Moses Emeya Close Off Social Club Road New Oko Oba',
    schoolMotto: 'Believe-Achieve-Succeed',
    schoolEmail: 'info@perfectangelsschool.com.ng',
    studentName: 'Isreal Agbo',
    sections: [
      // Your dummy data sections...
    ],
  });


  const sections = [
    {
      title: 'Communication Skills',
      data: [
        { label: 'Speaking', grade: 'A' },
        { label: 'Responses', grade: 'B' },
        { label: 'Routine', grade: 'A+' },
        { label: 'Understanding', grade: 'A-' },
      ],
    },
    {
      title: 'Emotional Skills',
      data: [
        { label: 'Emotional Assessment', grade: 'B+' },
        { label: 'Empathy', grade: 'A' },
        { label: 'Self-Awareness', grade: 'A-' },
        { label: 'Social Skills', grade: 'B' },
        { label: 'Cooperation', grade: 'A' },
      ],
    },
    {
      title: 'Reading',
      data: [
        { label: 'Basic Reading', grade: 'A+' },
        { label: 'Story Comprehension', grade: 'A' },
      ],
    },
    {
      title: 'Motor Skills',
      data: [
        { label: 'Can hold and use pencil', grade: 'A' },
        { label: 'Can hold and use crayon', grade: 'B+' },
        { label: 'Can bounce a ball', grade: 'A-' },
        { label: 'Can kick a ball', grade: 'B' },
        { label: 'Can jump up and down', grade: 'A' },
        { label: 'Can sing rhymes', grade: 'A+' },
      ],
    },
    {
      title: 'Numbers',
      data: [
        { label: 'Recognizes numbers one to ten', grade: 'A' },
        { label: 'Understands empty and full', grade: 'A-' },
      ],
    },
    {
      title: 'Colors and Shapes',
      data: [
        { label: 'Knows primary colors', grade: 'B+' },
        { label: 'Knows shapes', grade: 'A' },
      ],
    },
  ];



  return (
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
      {sections.map(({ title, data }) => (
        <Section key={title} title={title} data={data} />
      ))}
    </div>
  );
};

export default PreschoolResultTable;
