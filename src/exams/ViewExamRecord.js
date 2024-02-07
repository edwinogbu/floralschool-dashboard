import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewExamRecord() {
  const { id } = useParams();
  const [examRecord, setExamRecord] = useState(null);

  useEffect(() => {
    const fetchExamRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/exam-records/viewExam/${id}`);
        setExamRecord(response.data);
      } catch (error) {
        console.error('Error fetching exam record:', error);
        // Handle error (show a message, redirect, etc.)
      }
    };

    fetchExamRecord();
  }, [id]);

  


  if (!examRecord) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4>Exam Record Details</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img
                  src={examRecord.imagePath || 'https://via.placeholder.com/150'}
                  alt="Profile"
                    className="img-fluid rounded-circle"
                  />
                   {/* <img
                  src={student.imagePath || 'https://via.placeholder.com/150'}
                  alt="Student"
                  className="img-fluid mb-3"
                  // className="img-fluid rounded-circle mb-3"
                  style={{height:300, width:400, borderRadius:25,}}
                /> */}
                </div>
                <div className="col-md-8">
                  <h3>Student: {examRecord.name}</h3>
                  <p>Class Level: {examRecord.level}</p>
                  <p>Course Title: {examRecord.courseTitle}</p>
                  <p>Score: {examRecord.score}</p>
                  <p>Grade: {examRecord.grade}</p>
                  <p>Terms: {examRecord.terms}</p>
                  <p>Remark: {examRecord.remark}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewExamRecord;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function ViewExamRecord() {
//   const { id } = useParams();
//   const [examRecord, setExamRecord] = useState(null);

//   useEffect(() => {
//     const fetchExamRecord = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/exam-records/viewExam/${id}`);
//         setExamRecord(response.data);
//       } catch (error) {
//         console.error('Error fetching exam record:', error);
//         // Handle error (show a message, redirect, etc.)
//       }
//     };

//     fetchExamRecord();
//   }, [id]);

//   if (!examRecord) {
//     return <div className="container">Loading...</div>;
//   }

//   return (
//     <div className="container-fluid">
//       <h2 className="my-4">Exam Record Details</h2>
//       <div className="card">
//         <div className="card-body">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Class Level</th>
//                 <th>Course Title</th>
//                 <th>Score</th>
//                 <th>Grade</th>
//                 <th>Terms</th>
//                 <th>Remark</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{examRecord.id}</td>
//                 <td>{examRecord.name}</td>
//                 <td>{examRecord.level}</td>
//                 <td>{examRecord.courseTitle}</td>
//                 <td>{examRecord.score}</td>
//                 <td>{examRecord.grade}</td>
//                 <td>{examRecord.terms}</td>
//                 <td>{examRecord.remark}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewExamRecord;
