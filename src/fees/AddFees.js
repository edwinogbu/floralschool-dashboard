import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faFile, faCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function AddFees() {
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8080/api/fees'; // Update with the correct API endpoint

  const [fee, setFee] = useState({
    name: '',
    amount: 0,
    checked: false,
  });

  const { name, amount, checked } = fee;

  const onInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFee({ ...fee, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(baseUrl + '/create', fee);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Fee added successfully!',
      }).then(() => {
        navigate('/fees');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the fee.',
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Add Fee</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Fee Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faFile} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Fee Name"
                      name="name"
                      value={name}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faDollarSign} />
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Amount"
                      name="amount"
                      value={amount}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Checked</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="checked"
                        checked={checked}
                        onChange={(e) => onInputChange(e)}
                        style={{
                                marginLeft: '1px',
                                transform: 'scale(2.5)', // Increase the size of the checkbox
                                border: '2px solid green', // Add a green border
                            }}
                      />
                      <label className="form-check-label" style={{ marginLeft: '40px' }}>Toggle Checked</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-outline-primary btn-lg mx-5">
                    Save
                  </button>
                  <Link to="/fees-list" className="btn btn-outline-danger btn-lg mx-5">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDollarSign, faFile, faCheck } from '@fortawesome/free-solid-svg-icons';
// import Swal from 'sweetalert2';

// export default function AddFees() {
//   const navigate = useNavigate();
//   const baseUrl = 'http://localhost:8080/api/fees'; // Update with the correct API endpoint

//   const [fee, setFee] = useState({
//     name: '',
//     amount: 0,
//     checked: false,
//   });

//   const { name, amount, checked } = fee;

//   const onInputChange = (e) => {
//     setFee({ ...fee, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(baseUrl + '/create', fee);

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Fee added successfully!',
//       }).then(() => {
//         navigate('/fees'); // Corrected the route name to '/fees'
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding the fee.',
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">Add Fee</h2>
//               <form onSubmit={(e) => onSubmit(e)}>
//                 <div className="mb-3">
//                   <label className="form-label">Fee Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faFile} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Fee Name"
//                       name="name"
//                       value={name}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Amount</label>
//                   <div className="input-group">
//                     <span className="input-group-text">
//                       <FontAwesomeIcon icon={faDollarSign} />
//                     </span>
//                     <input
//                       type="number"
//                       className="form-control"
//                       placeholder="Enter Amount"
//                       name="amount"
//                       value={amount}
//                       onChange={(e) => onInputChange(e)}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Checked</label>
//                     <div className="input-group">
//                         <span className="input-group-text">
//                         <FontAwesomeIcon icon={faCheck} />
//                         </span>
//                         <div className="form-check">
//                         <input
//                             type="checkbox"
//                             className="form-check-input"
//                             name="checked"
//                             checked={checked}
//                             onChange={(e) => onInputChange(e)}
//                             style={{
//                             marginLeft: '1px',
//                             transform: 'scale(1.5)', // Increase the size of the checkbox
//                             border: '2px solid green', // Add a green border
//                             }}
//                         />
//                         <label className="form-check-label" style={{ marginLeft: '20px' }}>Checked</label>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-outline-primary btn-lg mx-5">Save</button>
//                   <Link to="/fees-list" className="btn btn-outline-danger btn-lg mx-5">Cancel</Link> {/* Corrected the route name to '/fees-list' */}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
