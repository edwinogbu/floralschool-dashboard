import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function PaymentList() {
  const [fees, setFees] = useState([]);
  const baseUrl = 'http://localhost:8080/api/payments'; // Update with the correct API endpoint

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const response = await axios.get(baseUrl + '/viewAllPayments');
      setFees(response.data);
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };

  const deleteFee = async (id) => {
    try {
      await axios.delete(baseUrl + '/delete/' + id);
      setFees((prevFees) => prevFees.filter((fee) => fee.id !== id));

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Fee deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting fee:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the fee.',
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <div className="mx-5 py-3">
            <h6 className="m-0 font-weight-bold text-primary">Students Payment List Database</h6>
          </div>
          <div className="mx-5 py-3">
            {/* <Link to="/add-fee" className="btn btn-primary mb-3">
              Add Fee
            </Link> */}
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>TotalAmount</th>
                  <th>paymentStatus</th>
                  <th>Payment Date</th>
                  {/* <th>TermsAndAgreement</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee.id}>
                    <td>{fee.id}</td>
                    <td>{fee.studentName}</td>
                    <td>{fee.totalAmount}</td>
                    <td>{fee.paymentStatus}</td>
                    <td>{fee.createdAt}</td>
                    {/* <td>{fee.agreedToTerms ? 'Agreed' : 'Not Agreed'}</td> */}
                    <td>
                      <Link to={`/edit-fee/${fee.id}`} className="btn btn-primary btn-sm mx-1">
                        Edit
                      </Link>
                      <button onClick={() => deleteFee(fee.id)} className="btn btn-danger btn-sm mx-1">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentList;
