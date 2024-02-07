import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddPin() {
  const [batchSize, setBatchSize] = useState(1);
  const navigate = useNavigate();

  // const handleGenerateBatchPins = async () => {
  //   try {
  //     const response = await fetch(``, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       const generatedPins = await response.json();

  //       // Display success message with generated pins
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Pins Generated Successfully!',
  //         html: `<p>${generatedPins.join('<br>')}</p>`,
  //       });

  //       // Redirect to the PinsList component (or any other desired location)
  //       navigate('/pins-list');
  //     } else {
  //       console.error('Error generating pins:', response.statusText);

  //       // Display error message
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'An error occurred while generating the pins.',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error generating pins:', error);

  //     // Display error message
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'An error occurred while generating the pins.',
  //     });
  //   }
  // };


//   const handleGenerateBatchPins = async () => {
//   try {
//     const response = await fetch('http://localhost:8080/api/pins/generate-batch/' + batchSize, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       const generatedPins = await response.json();

//       // Display success message with generated pins
//       Swal.fire({
//         icon: 'success',
//         title: 'Pins Generated Successfully!',
//         html: `<p>${generatedPins.join('<br>')}</p>`,
//       });

//       // Redirect to the PinsList component (or any other desired location)
//       navigate('/pins-list');
//     } else {
//       console.error('Error generating pins:', response.statusText);

//       // Display error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while generating the pins.',
//       });
//     }
//   } catch (error) {
//     console.error('Error generating pins:', error);

//     // Display error message
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'An error occurred while generating the pins.',
//     });
//   }
// };


const handleGenerateBatchPins = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/pins/generate-batch/' + batchSize, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const generatedPins = await response.json();

      // Display success message with generated pins
      Swal.fire({
        icon: 'success',
        title: 'Pins Generated Successfully!',
        html: generateBatchPinsHTML(generatedPins),
      });

      // Redirect to the PinsList component (or any other desired location)
      navigate('/pins-list');
    } else {
      console.error('Error generating pins:', response.statusText);

      // Display error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while generating the pins.',
      });
    }
  } catch (error) {
    console.error('Error generating pins:', error);

    // Display error message
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while generating the pins.',
    });
  }
};
const formatExpiryDate = (expiryDate) => {
  // Customize the date formatting as needed
  const formattedDate = new Date(expiryDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
};


const generateBatchPinsHTML = (batchPins) => {
  // Customize the display format as needed
  return `
    <p>Generated Pins:</p>
    <ul>
      ${batchPins.map(pin => `<li>${pin.pinNumber} - Expiry Date: ${formatExpiryDate(pin.expiryDate)}</li>`).join('')}
    </ul>
  `;
};

  const handleCreatePin = async () => {
    // Create a single pin through the API (adjust the endpoint accordingly)
    try {
      const response = await fetch('http://localhost:8080/api/pins/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* Your pin data */ }),
      });

      if (response.ok) {
        const createdPin = await response.json();

        // Display success message with the created pin's details
        Swal.fire({
          icon: 'success',
          title: 'Pin Created Successfully!',
          html: `<p>Generated Pin: ${createdPin.pinNumber}</p><p>Expiry Date: ${createdPin.expiryDate}</p>`,
        });

        // Redirect to the PinsList component (or any other desired location)
        navigate('/pins-list');
      } else {
        console.error('Error creating pin:', response.statusText);

        // Display error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while creating the pin.',
        });
      }
    } catch (error) {
      console.error('Error creating pin:', error);

      // Display error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the pin.',
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Generate Pins</h6>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="batchSize">Batch Size:</label>
            <input
              type="number"
              className="form-control"
              id="batchSize"
              value={batchSize}
              onChange={(e) => setBatchSize(parseInt(e.target.value, 10))}
              min="1"
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleGenerateBatchPins}>
            Create Pins
          </button>
          <button type="button" className="btn btn-primary ml-2" onClick={handleCreatePin}>
            Create Single Pin
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPin;



// import React, { useContext, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom';
// import './../Dashboard.css';
// import Sidebar from './../component/Sidebar';
// import Footer from './../component/Footer';
// import Topbar from './../component/Topbar';

// import { useAuth } from './../AuthContext';

// // import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function AddPin() {
//   const [batchSize, setBatchSize] = useState(1);
//   const navigate = useNavigate();



// const handleGenerateBatchPins = async () => {
//   try {
//     const response = await fetch('http://localhost:8080/api/pins/generate-batch/' + batchSize, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       const generatedPins = await response.json();

//       // Display success message with generated pins
//       Swal.fire({
//         icon: 'success',
//         title: 'Pins Generated Successfully!',
//         html: generateBatchPinsHTML(generatedPins),
//       });

//       // Redirect to the PinsList component (or any other desired location)
//       navigate('/pins-list');
//     } else {
//       console.error('Error generating pins:', response.statusText);

//       // Display error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while generating the pins.',
//       });
//     }
//   } catch (error) {
//     console.error('Error generating pins:', error);

//     // Display error message
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'An error occurred while generating the pins.',
//     });
//   }
// };
// const formatExpiryDate = (expiryDate) => {
//   // Customize the date formatting as needed
//   const formattedDate = new Date(expiryDate).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });

//   return formattedDate;
// };


// const generateBatchPinsHTML = (batchPins) => {
//   // Customize the display format as needed
//   return `
//     <p>Generated Pins:</p>
//     <ul>
//       ${batchPins.map(pin => `<li>${pin.pinNumber} - Expiry Date: ${formatExpiryDate(pin.expiryDate)}</li>`).join('')}
//     </ul>
//   `;
// };

//   const handleCreatePin = async () => {
//     // Create a single pin through the API (adjust the endpoint accordingly)
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ /* Your pin data */ }),
//       });

//       if (response.ok) {
//         const createdPin = await response.json();

//         // Display success message with the created pin's details
//         Swal.fire({
//           icon: 'success',
//           title: 'Pin Created Successfully!',
//           html: `<p>Generated Pin: ${createdPin.pinNumber}</p><p>Expiry Date: ${createdPin.expiryDate}</p>`,
//         });

//         // Redirect to the PinsList component (or any other desired location)
//         navigate('/pins-list');
//       } else {
//         console.error('Error creating pin:', response.statusText);

//         // Display error message
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'An error occurred while creating the pin.',
//         });
//       }
//     } catch (error) {
//       console.error('Error creating pin:', error);

//       // Display error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while creating the pin.',
//       });
//     }
//   };


//   const { isAuthenticated, user, logout, getRole } = useAuth();
//   const userRole = getRole();

//     const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
//     const [isSidebarToggled, setSidebarToggled] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  
//     const toggleTopbar = () => {
//       setStyle(style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
//         ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//         : "navbar-nav bg-gradient-primary sidebar sidebarDark accordion"
//       );
//     };
  
//     const toggleSidebar = () => {
//       setSidebarToggled(!isSidebarToggled);
//     };
  
//     const sidebarClass = isSidebarToggled
//       ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//       : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";
  
//     return (

//         <div>
//             <body id="page-top">
//                 <div id="wrapper">
//                     {/* <Sidebar style={sidebarClass} toggleSidebar={toggleSidebar} /> */}

//                     <div id="content-wrapper" className="d-flex flex-column">
//                         <div id="content">
                           
//                            {/* <Topbar toggleTopbar={toggleTopbar} /> */}

//                             <div className="container-fluid">
//                                 <div className="d-sm-flex align-items-center justify-content-between mb-4">
//                                     <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">Floral school App Administration </h1>
//                                     {/* <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">The Floral International College</h1> */}
//                                     <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
//                                         <i className="fas fa-download fa-sm text-white-50"></i> 
//                                     </a>
//                                 </div>

//                                 <div className="row">
//                                     <div className="col-xl-11 col-lg-10 mx-5">
//                                         <div className="mb-4">
                                        

//                                            {/* AddUser */}
//                                            <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3">
//           <h6 className="m-0 font-weight-bold text-primary">Generate Pins</h6>
//         </div>
//         <div className="card-body">
//           <div className="form-group">
//             <label htmlFor="batchSize">Batch Size:</label>
//             <input
//               type="number"
//               className="form-control"
//               id="batchSize"
//               value={batchSize}
//               onChange={(e) => setBatchSize(parseInt(e.target.value, 10))}
//               min="1"
//             />
//           </div>
//           <button type="button" className="btn btn-primary" onClick={handleGenerateBatchPins}>
//             Create Pins
//           </button>
//           <button type="button" className="btn btn-primary ml-2" onClick={handleCreatePin}>
//             Create Single Pin
//           </button>
//         </div>
//       </div>
//     </div>
                                              
   
//                                         <div>
                                        
//                                       </div>
      
                                  



//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
                     
//                     <Footer /> 
//                     </div>
//                 </div>

//                 <a className="scroll-to-top rounded" href="#page-top">
//                     <i className="fas fa-angle-up"></i>
//                 </a>

//                 {/* Logout Modal */}
//                 <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
//                     aria-hidden="true">
//                     {/* ... (logout modal code) */}
//                 </div>
//             </body>
//         </div>
    
//     );
// }

// export default AddPin;





















// import React, { useState, useEffect } from 'react';
// import { Button, Card, Form } from 'react-bootstrap';

// const PinGenerator = () => {
//   const [generatedPin, setGeneratedPin] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);

//   useEffect(() => {
//     // Check if the user is authenticated and fetch the token from your authentication system
//     const authToken = window.localStorage.getItem('token');

//     console.log(authToken);

//     if (!authToken) {
//       // Redirect to login or handle unauthenticated state
//     }
//   }, []);

//   const handleGeneratePin = async () => {
//     try {
//       setIsGenerating(true);

//       // Fetch the token from local storage
//       const authToken = localStorage.getItem('authToken');

//       // Make a request to the PIN generation API with the authorization header
//       const response = await fetch('http://localhost:8080/pins/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate PIN');
//       }

//       const pinData = await response.json();
//       setGeneratedPin(pinData.pinNumber);
//     } catch (error) {
//       console.error('Error generating PIN:', error);
//       // Handle error, e.g., show an error message to the user
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <Card>
//       <Card.Body>
//         <Card.Title>Generate PIN</Card.Title>

//         <Form>
//           <Form.Group controlId="formGeneratedPin">
//             <Form.Label>Generated PIN:</Form.Label>
//             <Form.Control
//               type="text"
//               value={generatedPin}
//               readOnly
//               onClick={(e) => e.target.select()}
//             />
//           </Form.Group>

//           <Button
//             variant="primary"
//             onClick={handleGeneratePin}
//             disabled={isGenerating}
//           >
//             {isGenerating ? 'Generating...' : 'Generate PIN'}
//           </Button>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default PinGenerator;


// import React, { useState } from 'react';
// import { Button, Card, Form } from 'react-bootstrap';

// const PinGenerator = () => {
//   const [generatedPin, setGeneratedPin] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleGeneratePin = async () => {
//     try {
//       setIsGenerating(true);

//       // Make a request to the PIN generation API
//       const response = await fetch('http://localhost:8080/pins/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate PIN');
//       }

//       const pinData = await response.json();
//       setGeneratedPin(pinData.pinNumber);
//     } catch (error) {
//       console.error('Error generating PIN:', error);
//       // Handle error, e.g., show an error message to the user
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <Card>
//       <Card.Body>
//         <Card.Title>Generate PIN</Card.Title>

//         <Form>
//           <Form.Group controlId="formGeneratedPin">
//             <Form.Label>Generated PIN:</Form.Label>
//             <Form.Control type="text" readOnly value={generatedPin} />
//           </Form.Group>

//           <Button
//             variant="primary"
//             onClick={handleGeneratePin}
//             disabled={isGenerating}
//           >
//             {isGenerating ? 'Generating...' : 'Generate PIN'}
//           </Button>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default PinGenerator;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faKey, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';

// export default function AddPin() {
//   const navigate = useNavigate();
//   const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

//   const [pin, setPin] = useState({
//     pinNumber: '',
//     expiryDate: '',
//   });

//   const { pinNumber, expiryDate } = pin;

//   const onInputChange = (e) => {
//     setPin({ ...pin, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(baseUrl + '/create', pin);

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'PIN added successfully!',
//       }).then(() => {
//         navigate('/pins');
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the PIN.',
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add PIN</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 <div className="mb-3">
//                   <label className="form-label">PIN Number</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faKey} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter PIN Number"
//                       name="pinNumber"
//                       value={pinNumber}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Expiry Date</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faCalendarPlus} />
//                     </span>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="expiryDate"
//                       value={expiryDate}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
//                     Save
//                   </button>
//                   <Link to="/pins-list" className="btn btn-outline-danger btn-lg mx-5">
//                     Cancel
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
