// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const localStorageKey = 'pins';

//   // const fetchAndSyncPins = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:8080/api/pins/all');
//   //     const data = await response.json();
//   //     setPins(addValidityColumn(data));

//   //     localStorage.setItem(localStorageKey, JSON.stringify(data));
//   //   } catch (error) {
//   //     console.error('Error fetching pins:', error);
//   //   }
//   // };

//   const fetchAndSyncPins = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/all');
//       if (!response.ok) {
//         throw new Error(`Failed to fetch pins. Status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log('Fetched pins from API:', data);
  
//       setPins(addValidityColumn(data));
//       localStorage.setItem(localStorageKey, JSON.stringify(data));
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };
  

//   useEffect(() => {
//     const cachedPins = JSON.parse(localStorage.getItem(localStorageKey)) || [];
//     setPins(addValidityColumn(cachedPins));

//     if (cachedPins.length === 0) {
//       fetchAndSyncPins();
//     }

//     // Periodically fetch new data from the API (every 5 minutes in this example)
//     const syncInterval = setInterval(fetchAndSyncPins, 5 * 60 * 1000);

//     return () => {
//       clearInterval(syncInterval); // Cleanup interval on component unmount
//     };
//   }, []); // Empty dependency array means this effect runs only once when the component mounts

//   const addValidityColumn = (pinsData) => {
//     // Add a 'isValid' property based on the expiration date (considered expired after 31 days)
//     const expirationThreshold = new Date();
//     expirationThreshold.setDate(expirationThreshold.getDate() - 31);

//     return pinsData.map((pin) => ({
//       ...pin,
//       isValid: new Date(pin.expiryDate) > expirationThreshold,
//     }));
//   };

//   const deletePin = (id) => {
//     const confirmDelete = Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const updatedPins = pins.filter((pin) => pin.id !== id);
//         setPins(updatedPins);
//         localStorage.setItem(localStorageKey, JSON.stringify(updatedPins));

//         await Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Your pin has been deleted.',
//         });

//         updateAPI(updatedPins);
//       }
//     });
//   };

//   const updateAPI = async (updatedPins) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/update', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ pins: updatedPins }),
//       });

//       if (response.ok) {
//         console.log('Changes synced with API');
//       } else {
//         console.error('Error syncing changes with API:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error syncing changes with API:', error);
//     }
//   };

  // const handleSearch = () => {
  //   // Filter pins based on the search term
  //   const filteredPins = pins.filter(
  //     (pin) =>
  //       pin.pinNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       pin.expiryDate.includes(searchTerm)
  //   );

  //   setPins(addValidityColumn(filteredPins));
  // };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
        // <div className="card-header py-3 d-flex justify-content-between">
        //   <div className="mx-5 py-3">
        //     <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
        //   </div>
        //   <div className="mx-5 py-3 col-sm-6">
        //     <div className="input-group">
        //       <input
        //         type="text"
        //         className="form-control"
        //         placeholder="Search by pin number or expiry date"
        //         value={searchTerm}
        //         onChange={(e) => setSearchTerm(e.target.value)}
        //       />
        //       <div className="input-group-append">
        //         <button className="btn btn-primary" type="button" onClick={handleSearch}>
        //           Search
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="mx-5 py-3">
        //     <Link to="/create-pin" className="btn btn-primary mb-3">
        //       Add Pin
        //     </Link>
        //   </div>
        // </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Validity</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin) => (
//                   <tr key={pin.id}>
//                     <td>{pin.id}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>{pin.isValid ? 'Valid' : 'Not Valid'}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
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

// export default PinsList;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const localStorageKey = 'pins';

//   useEffect(() => {
//     const cachedPins = JSON.parse(localStorage.getItem(localStorageKey)) || [];
//     setPins(addValidityColumn(cachedPins));

//     if (cachedPins.length === 0) {
//       fetchPinsFromAPI();
//     }
//   }, []);

//   const fetchPinsFromAPI = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/all');
//       const data = await response.json();
//       setPins(addValidityColumn(data));

//       localStorage.setItem(localStorageKey, JSON.stringify(data));
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };

  // const addValidityColumn = (pinsData) => {
  //   // Add a 'isValid' property based on the expiration date (considered expired after 31 days)
  //   const expirationThreshold = new Date();
  //   expirationThreshold.setDate(expirationThreshold.getDate() - 31);

  //   return pinsData.map((pin) => ({
  //     ...pin,
  //     isValid: new Date(pin.expiryDate) > expirationThreshold,
  //   }));
  // };

//   const deletePin = (id) => {
//     const confirmDelete = Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const updatedPins = pins.filter((pin) => pin.id !== id);
//         setPins(updatedPins);
//         localStorage.setItem(localStorageKey, JSON.stringify(updatedPins));

//         await Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Your pin has been deleted.',
//         });

//         updateAPI(updatedPins);
//       }
//     });
//   };

//   const updateAPI = async (updatedPins) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/sync', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ pins: updatedPins }),
//       });

//       if (response.ok) {
//         console.log('Changes synced with API');
//       } else {
//         console.error('Error syncing changes with API:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error syncing changes with API:', error);
//     }
//   };

//   const handleSearch = () => {
//     // Filter pins based on the search term
//     const filteredPins = pins.filter(
//       (pin) =>
//         pin.pinNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pin.expiryDate.includes(searchTerm)
//     );

//     setPins(addValidityColumn(filteredPins));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//           </div>
//           <div className="mx-5 py-3 col-sm-6">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by pin number or expiry date"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-primary" type="button" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mx-5 py-3">
//             <Link to="/create-pin" className="btn btn-primary mb-3">
//               Add Pin
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Validity</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin) => (
//                   <tr key={pin.id}>
//                     <td>{pin.id}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>{pin.isValid ? 'Valid' : 'Not Valid'}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
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

// export default PinsList;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const localStorageKey = 'pins';

//   useEffect(() => {
//     const cachedPins = JSON.parse(localStorage.getItem(localStorageKey)) || [];
//     setPins(cachedPins);

//     if (cachedPins.length === 0) {
//       fetchPinsFromAPI();
//     }
//   }, []);

//   const fetchPinsFromAPI = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/all');
//       const data = await response.json();
//       setPins(addValidityColumn(data));

//       localStorage.setItem(localStorageKey, JSON.stringify(data));
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };

//   const addValidityColumn = (pinsData) => {
//     // Add a 'isValid' property based on the expiration date
//     return pinsData.map((pin) => ({
//       ...pin,
//       isValid: new Date(pin.expiryDate) > new Date(),
//     }));
//   };

//   const deletePin = (id) => {
//     const confirmDelete = Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const updatedPins = pins.filter((pin) => pin.id !== id);
//         setPins(updatedPins);
//         localStorage.setItem(localStorageKey, JSON.stringify(updatedPins));

//         await Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Your pin has been deleted.',
//         });

//         updateAPI(updatedPins);
//       }
//     });
//   };

//   const updateAPI = async (updatedPins) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/sync', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ pins: updatedPins }),
//       });

//       if (response.ok) {
//         console.log('Changes synced with API');
//       } else {
//         console.error('Error syncing changes with API:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error syncing changes with API:', error);
//     }
//   };

//   const handleSearch = () => {
//     // Filter pins based on the search term
//     const filteredPins = pins.filter(
//       (pin) =>
//         pin.pinNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pin.expiryDate.includes(searchTerm)
//     );

//     setPins(addValidityColumn(filteredPins));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//           </div>
//           <div className="mx-5 py-3">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by pin number or expiry date"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-primary" type="button" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mx-5 py-3">
//             <Link to="/create-pin" className="btn btn-primary mb-3">
//               Add Pin
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Validity</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin) => (
//                   <tr key={pin.id}>
//                     <td>{pin.id}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>{pin.isValid ? 'Valid' : 'Not Valid'}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
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

// export default PinsList;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const localStorageKey = 'pins';

//   useEffect(() => {
//     const cachedPins = JSON.parse(localStorage.getItem(localStorageKey)) || [];
//     setPins(cachedPins);

//     if (cachedPins.length === 0) {
//       fetchPinsFromAPI();
//     }
//   }, []);

//   const fetchPinsFromAPI = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/all');
//       const data = await response.json();
//       setPins(data);

//       localStorage.setItem(localStorageKey, JSON.stringify(data));
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };

//   const deletePin = (id) => {
//     const confirmDelete = Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const updatedPins = pins.filter((pin) => pin.id !== id);
//         setPins(updatedPins);
//         localStorage.setItem(localStorageKey, JSON.stringify(updatedPins));

//         await Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Your pin has been deleted.',
//         });

//         updateAPI(updatedPins);
//       }
//     });
//   };

//   const updateAPI = async (updatedPins) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/sync', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ pins: updatedPins }),
//       });

//       if (response.ok) {
//         console.log('Changes synced with API');
//       } else {
//         console.error('Error syncing changes with API:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error syncing changes with API:', error);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//           </div>
//           <div className="mx-5 py-3">
//             <Link to="/create-pin" className="btn btn-primary mb-3">
//               Add Pin
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin) => (
//                   <tr key={pin.id}>
//                     <td>{pin.id}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
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

// export default PinsList;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const localStorageKey = 'pins';

//   useEffect(() => {
//     // Load pins from local storage on component mount
//     const cachedPins = JSON.parse(localStorage.getItem(localStorageKey)) || [];
//     setPins(cachedPins);

//     // Fetch pins from the API only if the local storage is empty
//     if (cachedPins.length === 0) {
//       fetchPinsFromAPI();
//     }
//   }, []);

//   const fetchPinsFromAPI = async () => {
//     // Fetch pins from the API
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/all');
//       const data = await response.json();
//       setPins(data);

//       // Update local storage with fetched pins
//       localStorage.setItem(localStorageKey, JSON.stringify(data));
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };

//   const deletePin = (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this pin?');

//     if (confirmDelete) {
//       // Update local storage and state after pin deletion
//       const updatedPins = pins.filter((pin) => pin.id !== id);
//       setPins(updatedPins);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedPins));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Pin deleted successfully!',
//       });

//       // Update the API with the changes (optional)
//       updateAPI(updatedPins);
//     }
//   };

//   const updateAPI = async (updatedPins) => {
//     // Update the API with the changes made in local storage
//     try {
//       const response = await fetch('http://localhost:8080/api/pins/sync', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ pins: updatedPins }),
//       });

//       if (response.ok) {
//         console.log('Changes synced with API');
//       } else {
//         console.error('Error syncing changes with API:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error syncing changes with API:', error);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//           </div>
//           <div className="mx-5 py-3">
//             <Link to="/create-pin" className="btn btn-primary mb-3">
//               Add Pin
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin) => (
//                   <tr key={pin.id}>
//                     <td>{pin.id}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
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

// export default PinsList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

//   useEffect(() => {
//     fetchPins();
//   }, []);

//   const fetchPins = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/all');
//       const fetchedPins = response.data;

//       // Update local storage with the fetched pins
//       localStorage.setItem('pins', JSON.stringify(fetchedPins));

//       setPins(addValidityColumn(fetchedPins));
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };


  
//   const deletePin = async (id) => {
//     // Use SweetAlert2 for confirmation
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         // Update local storage before deletion
//         const updatedPins = pins.filter((pin) => pin.id !== id);
//         localStorage.setItem('pins', JSON.stringify(updatedPins));

//         setPins(addValidityColumn(updatedPins));

//         // Delete pin from the API
//         await axios.delete(baseUrl + '/delete/' + id);

//         await Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Your pin has been deleted.',
//         });

//         // Sync changes with the API (optional)
//         await syncChangesWithAPI(updatedPins);
//       } catch (error) {
//         console.error('Error deleting pin:', error);

//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'An error occurred while deleting the pin.',
//         });
//       }
//     }
//   };

//   const syncChangesWithAPI = async (updatedPins) => {
//     try {
//       // Update the API with the changes made in local storage
//       await axios.put(baseUrl + '/sync', { pins: updatedPins });

//       console.log('Changes synced with API');
//     } catch (error) {
//       console.error('Error syncing changes with API:', error);
//     }
//   };

//   const addValidityColumn = (pinsData) => {
//     // Add a 'isValid' property based on the expiration date (considered expired after 31 days)
//     const expirationThreshold = new Date();
//     expirationThreshold.setDate(expirationThreshold.getDate() - 31);

//     return pinsData.map((pin) => ({
//       ...pin,
//       isValid: new Date(pin.expiryDate) > expirationThreshold,
//     }));
//   };

//   const handleSearch = () => {
//     // Filter pins based on the search term
//     const filteredPins = pins.filter(
//       (pin) =>
//         pin.pinNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pin.expiryDate.includes(searchTerm)
//     );

//     // Update validity column after filtering
//     setPins(addValidityColumn(filteredPins));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//           </div>
//           <div className="mx-5 py-3 col-sm-6">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by pin number or expiry date"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-primary" type="button" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mx-5 py-3">
//             <Link to="/create-pin" className="btn btn-primary mb-3">
//               Add Pin
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Validity</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin) => (
//                   <tr key={pin.id}>
//                     <td>{pin.id}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>{pin.isValid ? 'Valid' : 'Not Valid'}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
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

// export default PinsList;


// import React, { useEffect, useState } from 'react';
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom';
import './../Dashboard.css';
import Sidebar from './../component/Sidebar';
import Footer from './../component/Footer';
import Topbar from './../component/Topbar';

import { useAuth } from './../AuthContext';

import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

function PinsList() {
  const [pins, setPins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

  useEffect(() => {
    fetchPins();
  }, []);

  const fetchPins = async () => {
    try {
      const response = await axios.get(baseUrl + '/all');
      const fetchedPins = response.data;

      // Update local storage with the fetched pins
      localStorage.setItem('pins', JSON.stringify(fetchedPins));

      setPins(addValidityAndDaysLeftColumns(fetchedPins));
    } catch (error) {
      console.error('Error fetching pins:', error);
    }
  };

  const addValidityAndDaysLeftColumns = (pinsData) => {
    // Add a 'isValid' property based on the expiration date (considered expired after 31 days)
    // Add a 'daysLeft' property based on the difference between the current date and the expiry date
    const expirationThreshold = new Date();
    expirationThreshold.setDate(expirationThreshold.getDate() - 31);

    return pinsData.map((pin) => {
      const expiryDate = new Date(pin.expiryDate);
      const isValid = expiryDate > expirationThreshold;
      const daysLeft = isValid ? Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24)) : 0;

      return {
        ...pin,
        isValid,
        daysLeft,
      };
    });
  };

  const deletePin = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        // Delete pin from the API
        await axios.delete(baseUrl + '/delete/' + id);

        // Update local storage after deletion
        const updatedPins = pins.filter((pin) => pin.id !== id);
        localStorage.setItem('pins', JSON.stringify(updatedPins));

        setPins(addValidityAndDaysLeftColumns(updatedPins));

        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your pin has been deleted.',
        });

        // Sync changes with the API (optional)
        await syncChangesWithAPI(updatedPins);
      } catch (error) {
        console.error('Error deleting pin:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the pin.',
        });
      }
    }
  };

  const openModal = (pin) => {
    setModalData(pin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  const updatePin = async (id, updatedExpiryDate) => {
    try {
      // Update pin in the API
      await axios.put(`${baseUrl}/update/${id}`, { expiryDate: updatedExpiryDate });

      // Update local storage after API call
      const updatedPins = pins.map((pin) =>
        pin.id === id ? { ...pin, expiryDate: updatedExpiryDate } : pin
      );

      localStorage.setItem('pins', JSON.stringify(updatedPins));

      setPins(addValidityAndDaysLeftColumns(updatedPins));

      await Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Pin updated successfully.',
      });

      // Sync changes with the API (optional)
      await syncChangesWithAPI(updatedPins);
    } catch (error) {
      console.error('Error updating pin:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the pin.',
      });
    }

    // Close the modal after the update
    closeModal();
  };

  const syncChangesWithAPI = async (updatedPins) => {
    try {
      // Update the API with the changes made in local storage
      await axios.put(baseUrl + '/sync', { pins: updatedPins });

      console.log('Changes synced with API');
    } catch (error) {
      console.error('Error syncing changes with API:', error);
    }
  };

  const handleSearch = () => {
    // Filter pins based on the search term
    const filteredPins = pins.filter(
      (pin) =>
        pin.pinNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pin.expiryDate.includes(searchTerm)
    );

    setPins(addValidityAndDaysLeftColumns(filteredPins));
  };

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <div className="mx-5 py-3">
            <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
          </div>
          <div className="mx-5 py-3 col-sm-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by pin number or expiry date"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="mx-5 py-3">
            <Link to="/dashboard/create-pin" className="btn btn-primary mb-3">
              Add Pin
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pin Number</th>
                  <th>Expiry Date</th>
                  <th>Days Left</th>
                  <th>Validity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pins.map((pin, index) => (
                  <tr key={pin.id}>
                    <td>{index + 1}</td>
                    <td>{pin.pinNumber}</td>
                    <td>{pin.expiryDate}</td>
                    <td>{pin.daysLeft}</td>
                    <td>{pin.isValid ? 'Valid' : 'Not Valid'}</td>
                    <td>
                      <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
                        Edit
                      </Link>
                      <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
                        Delete
                      </button>
                      <button onClick={() => openModal(pin)} className="btn btn-warning btn-sm mx-1">
                        Update Expiry
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Update Pin Modal */}
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Expiry Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="date"
            id="expiryDate"
            className="form-control"
            value={modalData?.expiryDate}
            onChange={(e) => setModalData({ ...modalData, expiryDate: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updatePin(modalData?.id, modalData?.expiryDate)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PinsList;







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
                                           
//                                               <div className="container-fluid">
//                                                 <div className="card shadow mb-4">
//                                                   <div className="card-header py-3 d-flex justify-content-between">
//                                                     <div className="mx-5 py-3">
//                                                       <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//                                                     </div>
//                                                     <div className="mx-5 py-3 col-sm-6">
//                                                       <div className="input-group">
//                                                         <input
//                                                           type="text"
//                                                           className="form-control"
//                                                           placeholder="Search by pin number or expiry date"
//                                                           value={searchTerm}
//                                                           onChange={(e) => setSearchTerm(e.target.value)}
//                                                         />
//                                                         <div className="input-group-append">
//                                                           <button className="btn btn-primary" type="button" onClick={handleSearch}>
//                                                             Search
//                                                           </button>
//                                                         </div>
//                                                       </div>
//                                                     </div>
//                                                     <div className="mx-5 py-3">
//                                                       <Link to="/create-pin" className="btn btn-primary mb-3">
//                                                         Add Pin
//                                                       </Link>
//                                                     </div>
//                                                   </div>
//                                                   <div className="card-body">
//                                                     <div className="table-responsive">
//                                                       <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//                                                         <thead>
//                                                           <tr>
//                                                             <th>ID</th>
//                                                             <th>Pin Number</th>
//                                                             <th>Expiry Date</th>
//                                                             <th>Days Left</th>
//                                                             <th>Validity</th>
//                                                             <th>Action</th>
//                                                           </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                           {pins.map((pin, index) => (
//                                                             <tr key={pin.id}>
//                                                               <td>{index + 1}</td>
//                                                               <td>{pin.pinNumber}</td>
//                                                               <td>{pin.expiryDate}</td>
//                                                               <td>{pin.daysLeft}</td>
//                                                               <td>{pin.isValid ? 'Valid' : 'Not Valid'}</td>
//                                                               <td>
//                                                                 <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                                                                   Edit
//                                                                 </Link>
//                                                                 <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
//                                                                   Delete
//                                                                 </button>
//                                                                 <button onClick={() => openModal(pin)} className="btn btn-warning btn-sm mx-1">
//                                                                   Update Expiry
//                                                                 </button>
//                                                               </td>
//                                                             </tr>
//                                                           ))}
//                                                         </tbody>
//                                                       </table>
//                                                     </div>
//                                                   </div>
//                                                 </div>

//                                                 {/* Update Pin Modal */}
//                                                 <Modal show={isModalOpen} onHide={closeModal}>
//                                                   <Modal.Header closeButton>
//                                                     <Modal.Title>Update Expiry Date</Modal.Title>
//                                                   </Modal.Header>
//                                                   <Modal.Body>
//                                                     <label htmlFor="expiryDate">Expiry Date:</label>
//                                                     <input
//                                                       type="date"
//                                                       id="expiryDate"
//                                                       className="form-control"
//                                                       value={modalData?.expiryDate}
//                                                       onChange={(e) => setModalData({ ...modalData, expiryDate: e.target.value })}
//                                                     />
//                                                   </Modal.Body>
//                                                   <Modal.Footer>
//                                                     <Button variant="secondary" onClick={closeModal}>
//                                                       Close
//                                                     </Button>
//                                                     <Button variant="primary" onClick={() => updatePin(modalData?.id, modalData?.expiryDate)}>
//                                                       Update
//                                                     </Button>
//                                                   </Modal.Footer>
//                                                 </Modal>
//                                               </div>
   
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

// export default PinsList;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [modalData, setModalData] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

//   useEffect(() => {
//     fetchPins();
//   }, []);

//   const fetchPins = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/all');
//       const fetchedPins = response.data;

//       // Update local storage with the fetched pins
//       localStorage.setItem('pins', JSON.stringify(fetchedPins));

//       setPins(addValidityColumn(fetchedPins));
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };

//   const addValidityColumn = (pinsData) => {
//     // Add a 'isValid' property based on the expiration date (considered expired after 31 days)
//     const expirationThreshold = new Date();
//     expirationThreshold.setDate(expirationThreshold.getDate() - 31);

//     return pinsData.map((pin) => ({
//       ...pin,
//       isValid: new Date(pin.expiryDate) > expirationThreshold,
//     }));
//   };

//   const deletePin = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         // Delete pin from the API
//         await axios.delete(baseUrl + '/delete/' + id);

//         // Update local storage after deletion
//         const updatedPins = pins.filter((pin) => pin.id !== id);
//         localStorage.setItem('pins', JSON.stringify(updatedPins));

//         setPins(addValidityColumn(updatedPins));

//         await Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Your pin has been deleted.',
//         });

//         // Sync changes with the API (optional)
//         await syncChangesWithAPI(updatedPins);
//       } catch (error) {
//         console.error('Error deleting pin:', error);

//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'An error occurred while deleting the pin.',
//         });
//       }
//     }
//   };

//   const openModal = (pin) => {
//     setModalData(pin);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalData(null);
//     setIsModalOpen(false);
//   };

//   const updatePin = async (id, updatedExpiryDate) => {
//     try {
//       // Update pin in the API
//       await axios.put(`${baseUrl}/update/${id}`, { expiryDate: updatedExpiryDate });

//       // Update local storage after API call
//       const updatedPins = pins.map((pin) =>
//         pin.id === id ? { ...pin, expiryDate: updatedExpiryDate } : pin
//       );

//       localStorage.setItem('pins', JSON.stringify(updatedPins));

//       setPins(addValidityColumn(updatedPins));

//       await Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Pin updated successfully.',
//       });

//       // Sync changes with the API (optional)
//       await syncChangesWithAPI(updatedPins);
//     } catch (error) {
//       console.error('Error updating pin:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the pin.',
//       });
//     }

//     // Close the modal after the update
//     closeModal();
//   };

//   const syncChangesWithAPI = async (updatedPins) => {
//     try {
//       // Update the API with the changes made in local storage
//       await axios.put(baseUrl + '/sync', { pins: updatedPins });

//       console.log('Changes synced with API');
//     } catch (error) {
//       console.error('Error syncing changes with API:', error);
//     }
//   };

//   const handleSearch = () => {
//     // Filter pins based on the search term
//     const filteredPins = pins.filter(
//       (pin) =>
//         pin.pinNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pin.expiryDate.includes(searchTerm)
//     );

//     setPins(addValidityColumn(filteredPins));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//           </div>
//           <div className="mx-5 py-3 col-sm-6">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by pin number or expiry date"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-primary" type="button" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mx-5 py-3">
//             <Link to="/create-pin" className="btn btn-primary mb-3">
//               Add Pin
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Validity</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin, index) => (
//                   <tr key={pin.id}>
//                     <td>{index + 1}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>{pin.isValid ? 'Valid' : 'Not Valid'}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
//                         Delete
//                       </button>
//                       <button onClick={() => openModal(pin)} className="btn btn-warning btn-sm mx-1">
//                         Update Expiry
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Update Pin Modal */}
//       <Modal show={isModalOpen} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Expiry Date</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <label htmlFor="expiryDate">Expiry Date:</label>
//           <input
//             type="date"
//             id="expiryDate"
//             className="form-control"
//             value={modalData?.expiryDate}
//             onChange={(e) => setModalData({ ...modalData, expiryDate: e.target.value })}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={() => updatePin(modalData?.id, modalData?.expiryDate)}>
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default PinsList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [modalData, setModalData] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

//   useEffect(() => {
//     fetchPins();
//   }, []);

//   const fetchPins = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/all');
//       const fetchedPins = response.data;

//       // Update local storage with the fetched pins
//       localStorage.setItem('pins', JSON.stringify(fetchedPins));

//       setPins(addValidityColumn(fetchedPins));
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };

//   const addValidityColumn = (pinsData) => {
//     // Add a 'isValid' property based on the expiration date (considered expired after 31 days)
//     const expirationThreshold = new Date();
//     expirationThreshold.setDate(expirationThreshold.getDate() - 31);

//     return pinsData.map((pin) => ({
//       ...pin,
//       isValid: new Date(pin.expiryDate) > expirationThreshold,
//     }));
//   };

//   const deletePin = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         // Update local storage before deletion
//         const updatedPins = pins.filter((pin) => pin.id !== id);
//         localStorage.setItem('pins', JSON.stringify(updatedPins));

//         setPins(addValidityColumn(updatedPins));

//         // Delete pin from the API
//         await axios.delete(baseUrl + '/delete/' + id);

//         await Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Your pin has been deleted.',
//         });

//         // Sync changes with the API (optional)
//         await syncChangesWithAPI(updatedPins);
//       } catch (error) {
//         console.error('Error deleting pin:', error);

//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'An error occurred while deleting the pin.',
//         });
//       }
//     }
//   };

//   const openModal = (pin) => {
//     setModalData(pin);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalData(null);
//     setIsModalOpen(false);
//   };

//   const updatePin = async (id, updatedExpiryDate) => {
//     try {
//       // Update local storage before API call
//       const updatedPins = pins.map((pin) =>
//         pin.id === id ? { ...pin, expiryDate: updatedExpiryDate } : pin
//       );

//       localStorage.setItem('pins', JSON.stringify(updatedPins));

//       setPins(addValidityColumn(updatedPins));

//       // Update pin in the API
//       await axios.put(`${baseUrl}/update/${id}`, { expiryDate: updatedExpiryDate });

//       await Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Pin updated successfully.',
//       });

//       // Sync changes with the API (optional)
//       await syncChangesWithAPI(updatedPins);
//     } catch (error) {
//       console.error('Error updating pin:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the pin.',
//       });
//     }

//     // Close the modal after the update
//     closeModal();
//   };

//   const syncChangesWithAPI = async (updatedPins) => {
//     try {
//       // Update the API with the changes made in local storage
//       await axios.put(baseUrl + '/sync', { pins: updatedPins });

//       console.log('Changes synced with API');
//     } catch (error) {
//       console.error('Error syncing changes with API:', error);
//     }
//   };

//   const handleSearch = () => {
//     // Filter pins based on the search term
//     const filteredPins = pins.filter(
//       (pin) =>
//         pin.pinNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pin.expiryDate.includes(searchTerm)
//     );

//     setPins(addValidityColumn(filteredPins));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//           </div>
//           <div className="mx-5 py-3 col-sm-6">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by pin number or expiry date"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-primary" type="button" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mx-5 py-3">
//             <Link to="/create-pin" className="btn btn-primary mb-3">
//               Add Pin
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin, index) => (
//                   <tr key={pin.id}>
//                     <td>{index + 1}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
//                         Delete
//                       </button>
//                       <button onClick={() => openModal(pin)} className="btn btn-warning btn-sm mx-1">
//                         Update Expiry
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Update Pin Modal */}
//       <Modal show={isModalOpen} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Expiry Date</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <label htmlFor="expiryDate">Expiry Date:</label>
//           <input
//             type="date"
//             id="expiryDate"
//             className="form-control"
//             value={modalData?.expiryDate}
//             onChange={(e) => setModalData({ ...modalData, expiryDate: e.target.value })}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={() => updatePin(modalData?.id, modalData?.expiryDate)}>
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default PinsList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

//   useEffect(() => {
//     fetchPins();
//   }, []);

//   const fetchPins = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/all');
//       const fetchedPins = response.data;

//       // Update local storage with the fetched pins
//       localStorage.setItem('pins', JSON.stringify(fetchedPins));

//       setPins(fetchedPins);
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };

//   const deletePin = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this pin?');

//     if (confirmDelete) {
//       try {
//         await axios.delete(baseUrl + '/delete/' + id);

//         // Update local storage after deletion
//         const updatedPins = pins.filter((pin) => pin.id !== id);
//         localStorage.setItem('pins', JSON.stringify(updatedPins));

//         setPins(updatedPins);

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Pin deleted successfully!',
//         });

//         // Sync changes with the API (optional)
//         await syncChangesWithAPI(updatedPins);
//       } catch (error) {
//         console.error('Error deleting pin:', error);

//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'An error occurred while deleting the pin.',
//         });
//       }
//     }
//   };

//   const syncChangesWithAPI = async (updatedPins) => {
//     try {
//       // Update the API with the changes made in local storage
//       await axios.put(baseUrl + '/sync', { pins: updatedPins });

//       console.log('Changes synced with API');
//     } catch (error) {
//       console.error('Error syncing changes with API:', error);
//     }
//   };

//   const addValidityColumn = (pinsData) => {
//     // Add a 'isValid' property based on the expiration date (considered expired after 31 days)
//     const expirationThreshold = new Date();
//     expirationThreshold.setDate(expirationThreshold.getDate() - 31);

//     return pinsData.map((pin) => ({
//       ...pin,
//       isValid: new Date(pin.expiryDate) > expirationThreshold,
//     }));
//   };


//   const handleSearch = () => {
//     // Filter pins based on the search term
//     const filteredPins = pins.filter(
//       (pin) =>
//         pin.pinNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pin.expiryDate.includes(searchTerm)
//     );

//     setPins(addValidityColumn(filteredPins));
//   };


//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//       <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//           </div>
//           <div className="mx-5 py-3 col-sm-6">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by pin number or expiry date"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-primary" type="button" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mx-5 py-3">
//             <Link to="/create-pin" className="btn btn-primary mb-3">
//               Add Pin
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin) => (
//                   <tr key={pin.id}>
//                     <td>{pin.id}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
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

// export default PinsList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function PinsList() {
//   const [pins, setPins] = useState([]);
//   const baseUrl = 'http://localhost:8080/api/pins'; // Update with the correct API endpoint

//   useEffect(() => {
//     fetchPins();
//   }, []);

//   const fetchPins = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/all');
//       setPins(response.data);
//     } catch (error) {
//       console.error('Error fetching pins:', error);
//     }
//   };

//   const deletePin = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this pin?');

//     if (confirmDelete) {
//       try {
//         await axios.delete(baseUrl + '/delete/' + id);
//         setPins((prevPins) => prevPins.filter((pin) => pin.id !== id));

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Pin deleted successfully!',
//         });
//       } catch (error) {
//         console.error('Error deleting pin:', error);

//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'An error occurred while deleting the pin.',
//         });
//       }
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Pins List Table</h6>
//           </div>
//           <div className="mx-5 py-3">
//             <Link to="/create-pin" className="btn btn-primary mb-3">
//               Add Pin
//             </Link>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Pin Number</th>
//                   <th>Expiry Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pins.map((pin) => (
//                   <tr key={pin.id}>
//                     <td>{pin.id}</td>
//                     <td>{pin.pinNumber}</td>
//                     <td>{pin.expiryDate}</td>
//                     <td>
//                       <Link to={`/edit-pin/${pin.id}`} className="btn btn-primary btn-sm mx-1">
//                         Edit
//                       </Link>
//                       <button onClick={() => deletePin(pin.id)} className="btn btn-danger btn-sm mx-1">
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

// export default PinsList;
