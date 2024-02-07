
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Outlet, useLocation} from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './component/Sidebar';
import Footer from './component/Footer';
import Topbar from './component/Topbar';

import PostList from './blog/PostList';
import AddPost from './blog/AddPost';
import ViewPost from './blog/ViewPost';
import UpdatePost from './blog/UpdatePost';

import UserList from './user/UserList';
import AddUser from './user/AddUser';
import UpdateUser from './user/UpdateUser';
import ViewUser from './user/ViewUser';

import FeesList from './fees/FeesList';
import AddFees from './fees/AddFees';
import UpdateFees from './fees/UpdateFees';
import ViewFees from './fees/ViewFees';
import PaymentList from './payments/PaymentList';
import AddPayment from './payments/AddPayment';
import UpdatePayment from './payments/UpdatePayment';
import ViewPayment from './payments/ViewPayment';
import Signup from './Signup';
import Authenticate from './Authenticate';
import PinsList from './pin/PinsList';
import AddPin from './pin/AddPin';
import AddBatchPins from './pin/AddBatchPins';
import UpdatePin from './pin/UpdatePin';
import ViewPin from './pin/ViewPin';
import AddExamRecord from './exams/AddExamRecord ';
import ExamRecordList from './exams/ExamRecordList';
import ResultCheckerScreen from './result-checker/ResultCheckerScreen';
import AddStudent from './students/AddStudent';
import StudentList from './students/StudentList';
import ViewStudent from './students/ViewStudent';
import CourseDetailList from './courses/CourseDetailList';
import AddUserProfile from './user/AddUserProfile';
import UsersProfileList from './user/UsersProfileList';
import ResultSheet from './result-checker/ResultSheet';
import ViewExamRecord from './exams/ViewExamRecord';
import { useAuth } from './AuthContext';
import PreschoolResultTable from './result-checker/PreschoolResultTable';
// import PrivateRoute from './PrivateRoute';
// import { AuthProvider, useAuth  } from './AuthContext';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute';
import UserProfile from './user/UserProfile';



function Dashboard() {
  const { isAuthenticated, user, logout, getRole } = useAuth();
  const userRole = getRole();
  const location = useLocation();
  const [isContentVisible, setContentVisibility] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleViewUserInfo = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const [isSidebarToggled, setSidebarToggled] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  
    const toggleTopbar = () => {
      setStyle(style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        : "navbar-nav bg-gradient-primary sidebar sidebarDark accordion"
      );
    };
  
    const toggleSidebar = () => {
      setSidebarToggled(!isSidebarToggled);
    };
  
    const sidebarClass = isSidebarToggled
      ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";
  
    return (

        <div>
            <body id="page-top">
                <div id="wrapper">
                    <Sidebar style={sidebarClass} toggleSidebar={toggleSidebar} />

                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                           
                           <Topbar toggleTopbar={toggleTopbar} />

                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">Floral school App Administration </h1>
                                    {/* <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">The Floral International College</h1> */}
                                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                        <i className="fas fa-download fa-sm text-white-50"></i> 
                                    </a>
                                </div>

                                <div className="row">
                                    <div className="col-xl-11 col-lg-10 mx-5">
                                    <button className="btn btn-primary" onClick={handleViewUserInfo}>
                                      View User Info
                                    </button>
                                        <div className="mb-4">
                                        {/* {isContentVisible && (
                                           <div className="container mt-5">
                                           {isAuthenticated ? (
                                             <>
                                            <h2 className="mb-4">User Profile</h2>
                                               <div className="card">
                                                 <div className="card-body">
                                                   <h5 className="card-title">User Information</h5>
                                                   <p className="card-text">
                                                     <strong>Username:</strong> {user.username} {user.lastName}
                                                   </p>
                                                   <p className="card-text">
                                                     <strong>Email:</strong> {user.email}
                                                   </p>
                                                   <p className="card-text">
                                                     <strong>Phone:</strong> {user.phone}
                                                   </p>
                                                   <p className="card-text">
                                                     <strong>Token:</strong> {user.token}
                                                   </p>
                                                   <p className="card-text">
                                                     <strong>Role:</strong>{userRole}
                                                     {userRole === 'ROLE_ADMIN' && <p>You have admin privileges.</p>}
                                                     {userRole === 'ROLE_USER' && <p>You have user privileges.</p>} 
                                                   </p>
                                                   <p className="card-text">
                                                     <strong>Roles:</strong> {user.roles} 
                                                   </p>
                                                   <button className="btn btn-danger" onClick={logout}>
                                                     Logout
                                                   </button>
                                                 </div>
                                               </div>
                                             </>
                                           ) : (
                                             <p className="text-danger">Please log in to view the dashboard.</p>
                                           )}
                                         </div>
                                        )} */}
                                      

                                        <Routes>
                    <Route path="/*" element={<Outlet />} />
                    <Route path="/dashboard/*" element={<UserProfile />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/add-user" element={<AddUser />} />

                    <Route path="/add-profile" element={<AddUserProfile />} />
                    <Route path="/users-profile-list" element={<UsersProfileList />} />
                    <Route path="/dashboard/user-profile" element={<UserProfile />} />
                 
                    <Route path="/edit-user/:id" element={<UpdateUser />} />
                    <Route path="/view-user/:id" element={<ViewUser />} />

                    <Route path="/posts" element={<PostList />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/edit-post/:id" element={<UpdatePost />} />
                    <Route path="/view-post/:id" element={<ViewPost />} />

                    <Route path="/fees" element={<FeesList />} />
                    <Route path="/add-fee" element={<AddFees />} />
                    <Route path="/edit-fee/:id" element={<UpdateFees />} />
                    <Route path="/view-fee/:id" element={<ViewFees />} />

                    <Route path="/payment" element={<PaymentList />} />
                    <Route path="/add-payment" element={<AddPayment />} />
                    <Route path="/edit-payment/:id" element={<UpdatePayment />} />
                    <Route path="/view-payment/:id" element={<ViewPayment />} />

                    <Route path="/pins-list" element={<PinsList />} />
                    <Route path="/create-pin" element={<AddPin />} />
                    <Route path="/create-batch-pin" element={<AddBatchPins />} />
                    <Route path="/edit-pin/:id" element={<UpdatePin />} />
                    <Route path="/view-pin/:id" element={<ViewPin />} />

                    <Route path='/add-student' element={<AddStudent />} />
                    <Route path='/view-students' element={<StudentList />} />
                    <Route path='/student-detail/:id' element={<ViewStudent />} />
                    
                    <Route path='/add-exam-record' element={<AddExamRecord />} />
                    <Route path='/exam-records' element={<ExamRecordList />} />
                    <Route path='/result-checker' element={<ResultCheckerScreen />} />
                    <Route path='/result-sheet' element={<ResultSheet />} />
                    <Route path='/view-exam-record/:id' element={<ViewExamRecord />} />
                    
                    
                    <Route path='/manage-course' element={<CourseDetailList />} />
                    <Route path='/nursery' element={<PreschoolResultTable />} />
                  </Routes>
                {/* </Router> */}

                            {/* <PrivateRoute
                            element={
                              <>
                              <Route index element={<PostList />} />
                              <Route path="add-post" element={<AddPost />} />
                              <Route path="edit-post/:id" element={<UpdatePost />} />
                              <Route path="view-post/:id" element={<ViewPost />} />

                              <Route path="add-profile" element={<AddUserProfile />} />
                              <Route path="users-profile-list" element={<UsersProfileList />} />
                              <Route path="dashboard" element={<userProfile />} />
                              <Route path="users" element={<UserList />} />
                              <Route path="add-user" element={<AddUser />} />
                              <Route path="edit-user/:id" element={<UpdateUser />} />
                              <Route path="view-user/:id" element={<ViewUser />} />

                              <Route path="fees" element={<FeesList />} />
                              <Route path="add-fee" element={<AddFees />} />
                              <Route path="edit-fee/:id" element={<UpdateFees />} />
                              <Route path="view-fee/:id" element={<ViewFees />} />

                              <Route path="payment" element={<PaymentList />} />
                              <Route path="add-payment" element={<AddPayment />} />
                              <Route path="edit-payment/:id" element={<UpdatePayment />} />
                              <Route path="view-payment/:id" element={<ViewPayment />} />

                              <Route path="pins-list" element={<PinsList />} />
                              <Route path="create-pin" element={<AddPin />} />
                              <Route path="create-batch-pin" element={<AddBatchPins />} />
                              <Route path="edit-pin/:id" element={<UpdatePin />} />
                              <Route path="view-pin/:id" element={<ViewPin />} />

                              <Route path="add-student" element={<AddStudent />} />
                              <Route path="view-students" element={<StudentList />} />
                              <Route path="student-detail/:id" element={<ViewStudent />} />

                              <Route path="add-exam-record" element={<AddExamRecord />} />
                              <Route path="exam-records" element={<ExamRecordList />} />
                              <Route path="result-checker" element={<ResultCheckerScreen />} />
                              <Route path="result-sheet" element={<ResultSheet />} />
                              <Route path="view-exam-record/:id" element={<ViewExamRecord />} />

                              <Route path="manage-course" element={<CourseDetailList />} />
                              <Route path="nursery" element={<PreschoolResultTable />} />
                           
                              </>
                        
                      }
                      />    */}
                                        {/* {/* <Routes>
                          <Route path="signin" element={<Authenticate />} />
                          <Route path="signup" element={<Signup />} />
                          <Route path="dashboard/*" element={<PrivateRoute />}>
                            <Route index element={<PostList />} />
                            <Route path="add-post" element={<AddPost />} />
                            <Route path="edit-post/:id" element={<UpdatePost />} />
                            <Route path="view-post/:id" element={<ViewPost />} />

                            <Route path="add-profile" element={<AddUserProfile />} />
                            <Route path="users-profile-list" element={<UsersProfileList />} />
                            <Route path="dashboard" element={<userProfile />} />
                            <Route path="users" element={<UserList />} />
                            <Route path="add-user" element={<AddUser />} />
                            <Route path="edit-user/:id" element={<UpdateUser />} />
                            <Route path="view-user/:id" element={<ViewUser />} />

                            <Route path="fees" element={<FeesList />} />
                            <Route path="add-fee" element={<AddFees />} />
                            <Route path="edit-fee/:id" element={<UpdateFees />} />
                            <Route path="view-fee/:id" element={<ViewFees />} />

                            <Route path="payment" element={<PaymentList />} />
                            <Route path="add-payment" element={<AddPayment />} />
                            <Route path="edit-payment/:id" element={<UpdatePayment />} />
                            <Route path="view-payment/:id" element={<ViewPayment />} />

                            <Route path="pins-list" element={<PinsList />} />
                            <Route path="create-pin" element={<AddPin />} />
                            <Route path="create-batch-pin" element={<AddBatchPins />} />
                            <Route path="edit-pin/:id" element={<UpdatePin />} />
                            <Route path="view-pin/:id" element={<ViewPin />} />

                            <Route path="add-student" element={<AddStudent />} />
                            <Route path="view-students" element={<StudentList />} />
                            <Route path="student-detail/:id" element={<ViewStudent />} />

                            <Route path="add-exam-record" element={<AddExamRecord />} />
                            <Route path="exam-records" element={<ExamRecordList />} />
                            <Route path="result-checker" element={<ResultCheckerScreen />} />
                            <Route path="result-sheet" element={<ResultSheet />} />
                            <Route path="view-exam-record/:id" element={<ViewExamRecord />} />

                            <Route path="manage-course" element={<CourseDetailList />} />
                            <Route path="nursery" element={<PreschoolResultTable />} />
                          </Route>
                        </Routes> */}

                                      
                                      
                          {/* <Routes>
                          <PrivateRoute path="/dashboard/*" element={<PostList />} />
                          <Route path="/dashboard/add-post" element={<AddPost />} />
                          <Route path="/dashboard/edit-post/:id" element={<UpdatePost />} />
                          <Route path="/dashboard/view-post/:id" element={<ViewPost />} />

                          
                          <Route path="/dashboard/add-profile" element={<AddUserProfile />} />
                          <Route path="/dashboard/users-profile-list" element={<UsersProfileList />} />
                          <Route path="/dashboard/dashboard" element={<userProfile />} />
                          <Route path="/dashboard/users" element={<UserList />} />
                          <Route path="/dashboard/add-user" element={<AddUser />} />
                          <Route path="/dashboard/edit-user/:id" element={<UpdateUser />} />
                          <Route path="/dashboard/view-user/:id" element={<ViewUser />} />

                          <Route path="/dashboard/fees" element={<FeesList />} />
                          <Route path="/dashboard/add-fee" element={<AddFees />} />
                          <Route path="/dashboard/edit-fee/:id" element={<UpdateFees />} />
                          <Route path="/dashboard/view-fee/:id" element={<ViewFees />} />

                          <Route path="/dashboard/payment" element={<PaymentList />} />
                          <Route path="/dashboard/add-payment" element={<AddPayment />} />
                          <Route path="/dashboard/edit-payment/:id" element={<UpdatePayment />} />
                          <Route path="/dashboard/view-payment/:id" element={<ViewPayment />} />

                          <Route path="/dashboard/pins-list" element={<PinsList />} />
                          <Route path="/dashboard/create-pin" element={<AddPin />} />
                          <Route path="/dashboard/create-batch-pin" element={<AddBatchPins />} />
                          <Route path="/dashboard/edit-pin/:id" element={<UpdatePin />} />
                          <Route path="/dashboard/view-pin/:id" element={<ViewPin />} />

                          <Route path='/dashboard/add-student' element={<AddStudent />} />
                          <Route path='/dashboard/view-students' element={<StudentList />} />
                          <Route path='/dashboard/student-detail/:id' element={<ViewStudent />} />

                          <Route path='/dashboard/add-exam-record' element={<AddExamRecord />} />
                          <Route path='/dashboard/exam-records' element={<ExamRecordList />} />
                          <Route path='/dashboard/result-checker' element={<ResultCheckerScreen />} />
                          <Route path='/dashboard/result-sheet' element={<ResultSheet />} />
                          <Route path='/dashboard/view-exam-record/:id' element={<ViewExamRecord />} />

                          <Route path='/manage-course' element={<CourseDetailList />} />
                          <Route path='/nursery' element={<PreschoolResultTable />} />
                        </Routes>  */}


{/* <Routes>
                        
                        <Route path="/*" element={<Outlet />} />
  
                          <Route path="/dashboard/*" element={<PostList />} />
                          <Route path="/dashboard/add-post" element={<AddPost />} />
                          <Route path="/dashboard/edit-post/:id" element={<UpdatePost />} />
                          <Route path="/dashboard/view-post/:id" element={<ViewPost />} />
  
                          <Route path="/dashboard/add-profile" element={<AddUserProfile />} />
                          <Route path="/dashboard/users-profile-list" element={<UsersProfileList />} />
                          <Route path="/dashboard/dashboard" element={<userProfile />} />
                          <Route path="/dashboard/users" element={<UserList />} />
                          <Route path="/dashboard/add-user" element={<AddUser />} />
                          <Route path="/dashboard/edit-user/:id" element={<UpdateUser />} />
                          <Route path="/dashboard/view-user/:id" element={<ViewUser />} />
  
                          <Route path="/dashboard/fees" element={<FeesList />} />
                          <Route path="/dashboard/add-fee" element={<AddFees />} />
                          <Route path="/dashboard/edit-fee/:id" element={<UpdateFees />} />
                          <Route path="/dashboard/view-fee/:id" element={<ViewFees />} />
  
                          <Route path="/dashboard/payment" element={<PaymentList />} />
                          <Route path="/dashboard/add-payment" element={<AddPayment />} />
                          <Route path="/dashboard/edit-payment/:id" element={<UpdatePayment />} />
                          <Route path="/dashboard/view-payment/:id" element={<ViewPayment />} />
  
                          <Route path="/dashboard/pins-list" element={<PinsList />} />
                          <Route path="/dashboard/create-pin" element={<AddPin />} />
                          <Route path="/dashboard/create-batch-pin" element={<AddBatchPins />} />
                          <Route path="/dashboard/edit-pin/:id" element={<UpdatePin />} />
                          <Route path="/dashboard/view-pin/:id" element={<ViewPin />} />
  
                          <Route path='/dashboard/add-student' element={<AddStudent />} />
                          <Route path='/dashboard/view-students' element={<StudentList />} />
                          <Route path='/dashboard/student-detail/:id' element={<ViewStudent />} />
                          
                          <Route path='/dashboard/add-exam-record' element={<AddExamRecord />} />
                          <Route path='/dashboard/exam-records' element={<ExamRecordList />} />
                          <Route path='/dashboard/result-checker' element={<ResultCheckerScreen />} />
                          <Route path='/dashboard/result-sheet' element={<ResultSheet />} />
                          <Route path='/dashboard/view-exam-record/:id' element={<ViewExamRecord />} />
                          
                          
                          <Route path='/manage-course' element={<CourseDetailList />} />
                          <Route path='/nursery' element={<PreschoolResultTable />} />
                        </Routes> */}
                      {/* </Router> */}

   
        <div>
         
        </div>
      
                                  



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     
                    <Footer /> 
                    </div>
                </div>

                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
                   


                    {/* Modal for displaying user information */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Username:</strong> {user.username} {user.lastName}
          <br />
          <strong>Email:</strong> {user.email}
          <br />
          <strong>Phone:</strong> {user.phone}
          <br />
          <strong>Token:</strong> {user.token}
          <br />
          {/* Add other user information as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
                {/* Logout Modal */}
                <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    {/* ... (logout modal code) */}

                </div>
            </body>
        </div>
    
    );
}

export default Dashboard;


// import React from 'react';
// import { useAuth } from './AuthContext';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

// const Dashboard = () => {
//   const { isAuthenticated, user, logout, getRole } = useAuth();
//   const userRole = getRole();


//   return (
    // <div className="container mt-5">
    //   {isAuthenticated ? (
    //     <>
    //       <h2 className="mb-4">Dashboard</h2>
    //       <div className="card">
    //         <div className="card-body">
    //           <h5 className="card-title">User Information</h5>
    //           <p className="card-text">
    //             <strong>Username:</strong> {user.username} {user.lastName}
    //           </p>
    //           <p className="card-text">
    //             <strong>Email:</strong> {user.email}
    //           </p>
    //           <p className="card-text">
    //             <strong>Token:</strong> {user.token}
    //           </p>
    //           <p className="card-text">
    //             <strong>Role:</strong>{userRole}
    //             {userRole === 'ROLE_ADMIN' && <p>You have admin privileges.</p>}
    //             {userRole === 'ROLE_USER' && <p>You have user privileges.</p>} 
    //           </p>
    //           <p className="card-text">
    //             <strong>Roles:</strong> {user.roles} 
    //           </p>
    //           <button className="btn btn-danger" onClick={logout}>
    //             Logout
    //           </button>
    //         </div>
    //       </div>
    //     </>
    //   ) : (
    //     <p className="text-danger">Please log in to view the dashboard.</p>
    //   )}
    // </div>
//   );
// };

// export default Dashboard;

// import React, { useContext } from 'react';
// import { AuthContext, useAuth } from './AuthContext';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

// const Dashboard = () => {
//   // const { isAuthenticated, user, logout } = useContext(AuthContext);
//   const { user, logout } = useAuth();

//   return (
    // <div className="container mt-5">
    //   {isAuthenticated ? (
    //     <>
    //       <h2 className="mb-4">Dashboard</h2>
    //       <div className="card">
    //         <div className="card-body">
    //           <h5 className="card-title">User Information</h5>
    //           <p className="card-text">
    //             <strong>Username:</strong> 
    //             {/* {user.username} */}
    //              Eddy
    //           </p>
    //           <p className="card-text">
    //             <strong>Email:</strong> 
    //             {/* {user.email}  */}

    //             eddy@gmail.com
    //           </p>
    //           <p className="card-text">
    //             <strong>Role:</strong>
    //              {/* {user.role} */}
    //           </p>
    //           <button className="btn btn-danger" onClick={logout}>
    //             Logout
    //           </button>
    //         </div>
    //       </div>
    //     </>
    //   ) : (
    //     <p className="text-danger">Please log in to view the dashboard.</p>
    //   )}
    // </div>
//   );
// };

// export default Dashboard;

// import React, { useContext } from 'react';
// import { AuthContext } from './AuthContext';

// const Dashboard = () => {
//   // Access the authentication context
//   const { isAuthenticated, getAuthToken, getRole, user, logout } = useContext(AuthContext);

//   // Example: Display different content based on authentication status
//   const renderDashboardContent = () => {
//     if (!isAuthenticated) {
//       return <p className="text-danger">Please log in to view the dashboard.</p>;
//     }

//     const userRole = getRole();
//     const authToken = getAuthToken();

//     return (
//       <div>
//         <h3 className="mb-4">Welcome to the Dashboard, {userRole}!</h3>
//         <div className="card">
//           <div className="card-body">
//             <h5 className="card-title">User Information</h5>
//             <p className="card-text">
//               <strong>Username:</strong> {user.username}
//             </p>
//             <p className="card-text">
//               <strong>Email:</strong> {user.email}
//             </p>
//             <p className="card-text">
//               <strong>Role:</strong> {userRole}
//             </p>
//             <p className="card-text">
//               <strong>Token:</strong> {authToken}
//             </p>
//             <button className="btn btn-danger" onClick={logout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Dashboard</h2>
//       {renderDashboardContent()}
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useContext } from 'react';
// import { AuthContext } from './AuthContext';

// const Dashboard = () => {
//   // Access the authentication context
//   const { isAuth, getAuthToken, getRole, user, logout } = useContext(AuthContext);

//   // Example: Display different content based on authentication status
//   const renderDashboardContent = () => {
//     if (!isAuth) {
//       return <p className="text-danger">Please log in to view the dashboard.</p>;
//     }

//     const userRole = getRole();
//     const authToken = getAuthToken();

//     return (
      // <div>
      //   <h3 className="mb-4">Welcome to the Dashboard, {userRole}!</h3>
      //   <div className="card">
      //     <div className="card-body">
      //       <h5 className="card-title">User Information</h5>
      //       <p className="card-text">
      //         <strong>Username:</strong> {user.username}
      //       </p>
      //       <p className="card-text">
      //         <strong>Email:</strong> {user.email}
      //       </p>
      //       <p className="card-text">
      //         <strong>Role:</strong> {userRole}
      //       </p>
      //       <p className="card-text">
      //         <strong>Token:</strong> {authToken}
      //       </p>
      //       <button className="btn btn-danger" onClick={logout}>
      //         Logout
      //       </button>
      //     </div>
      //   </div>
      // </div>
//     );
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Dashboard</h2>
//       {renderDashboardContent()}
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useContext } from 'react';
// import { AuthContext, useAuth } from './AuthContext';

// const Dashboard = () => {
//   // const { user, isAuthenticated, logout } = useAuth();
//   const { login, isAuth, user, isAuthenticated, logout } = useContext(AuthContext);

//   // Redirect to login if not authenticated (optional)
//   if (!isAuthenticated) {
//     // You can add a redirect here or handle it in your route configuration
//     return <p className="container mt-5">Please log in to view the dashboard.</p>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-body">
//           <h2 className="card-title mb-4">Welcome, {user.username}!</h2>
//           <p className="card-text">Email: {user.email}</p>
//           <p className="card-text">Phone: {user.phone}</p>
//           {/* Display other user details as needed */}

//           <button type="button" className="btn btn-danger" onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext, useAuth } from './AuthContext';
// // import { AuthContext, useAuth } from './AuthContext';

// const Dashboard = () => {
//   // const {  logout, getAuthToken } = useContext(AuthContext);
//   const { user, logout, getAuthToken } = useContext(AuthContext);

//   // const user = useAuth();
//   // const logout = useAuth();
//   // const getAuthToken = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   {user ? (
//                     <>
//                       <h3>{user.username}</h3>
//                       <p>Last Name: {user.lastName}</p>
//                       <p>Email: {user.email}</p>
//                       <p>Roles: {user.roles}</p>
//                       <p>Token: {getAuthToken()}</p>
//                       <button className="btn btn-danger" onClick={handleLogout}>
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <p className="text-danger">Please log in to access the dashboard.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect, useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Outlet} from 'react-router-dom';
// import './Dashboard.css';
// import Sidebar from './component/Sidebar';
// import Footer from './component/Footer';
// import Topbar from './component/Topbar';
// import { AuthContext, useAuth } from './AuthContext';

// const Dashboard = () => {
//   const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
//   const [isSidebarToggled, setSidebarToggled] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//   const toggleTopbar = () => {
//     setStyle(style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
//       ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//       : "navbar-nav bg-gradient-primary sidebar sidebarDark accordion"
//     );
//   };

//   const toggleSidebar = () => {
//     setSidebarToggled(!isSidebarToggled);
//   };

//   const sidebarClass = isSidebarToggled
//     ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//     : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";

//   // const { user, logout, getAuthToken } = useContext(AuthContext);
//   const user = useAuth();
//   const getAuthToken = useAuth();


//   return (
//     <div>
//     <body id="page-top">
//         <div id="wrapper">
//             <Sidebar style={sidebarClass} toggleSidebar={toggleSidebar} />

//             <div id="content-wrapper" className="d-flex flex-column">
//                 <div id="content">
                   
//                    <Topbar toggleTopbar={toggleTopbar} />

//                     <div className="container-fluid">
//                         <div className="d-sm-flex align-items-center justify-content-between mb-4">
//                             <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">Floral school App Administration </h1>
//                             {/* <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">The Floral International College</h1> */}
//                             <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
//                                 <i className="fas fa-download fa-sm text-white-50"></i> 
//                             </a>
//                         </div>

//                         <div className="row">
//                             <div className="col-xl-11 col-lg-10 mx-5">
//                                 <div className="mb-4">
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4>User Profile</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src="https://via.placeholder.com/150"
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   {console.log(user)}
//                   {user ? (
//                     <>
//                       <h3>{user.username}  {console.log(user.username)}</h3>
//                       <p>Last Name: {user.lastName} {console.log(user.lastName)}</p>
//                       <p>Phone: {user.phone}</p>
//                       <p>Email: {user.email}</p>
//                       <p>Roles: {user.roles}</p>
//                       <p>Token: {getAuthToken()}</p>
//                     </>
//                   ) : (
//                     <p>User not authenticated.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div>
         
//          </div>
       
                                   
 
 
 
//                                          </div>
//                                      </div>
//                                  </div>
//                              </div>
//                          </div>
                      
//                      <Footer /> 
//                      </div>
//                  </div>
 
//                  <a className="scroll-to-top rounded" href="#page-top">
//                      <i className="fas fa-angle-up"></i>
//                  </a>
 
//                  {/* Logout Modal */}
//                  <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
//                      aria-hidden="true">
//                      {/* ... (logout modal code) */}
//                  </div>
//              </body>
//          </div>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Outlet} from 'react-router-dom';
// import './Dashboard.css';
// import Sidebar from './component/Sidebar';
// import Footer from './component/Footer';
// import Topbar from './component/Topbar';

// import PostList from './blog/PostList';
// import AddPost from './blog/AddPost';
// import ViewPost from './blog/ViewPost';
// import UpdatePost from './blog/UpdatePost';

// import UserList from './user/UserList';
// import AddUser from './user/AddUser';
// import UpdateUser from './user/UpdateUser';
// import ViewUser from './user/ViewUser';

// import FeesList from './fees/FeesList';
// import AddFees from './fees/AddFees';
// import UpdateFees from './fees/UpdateFees';
// import ViewFees from './fees/ViewFees';
// import PaymentList from './payments/PaymentList';
// import AddPayment from './payments/AddPayment';
// import UpdatePayment from './payments/UpdatePayment';
// import ViewPayment from './payments/ViewPayment';
// import Signup from './Signup';
// import Authenticate from './Authenticate';
// import PinsList from './pin/PinsList';
// import AddPin from './pin/AddPin';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';
// import AddExamRecord from './exams/AddExamRecord ';
// import ExamRecordList from './exams/ExamRecordList';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';
// import AddStudent from './students/AddStudent';
// import StudentList from './students/StudentList';
// import ViewStudent from './students/ViewStudent';
// import CourseDetailList from './courses/CourseDetailList';
// import AddUserProfile from './user/AddUserProfile';
// import UsersProfileList from './user/UsersProfileList';
// import ResultSheet from './result-checker/ResultSheet';
// import ViewExamRecord from './exams/ViewExamRecord';
// import { useAuth } from './AuthContext';
// import PreschoolResultTable from './result-checker/PreschoolResultTable';
// // import PrivateRoute from './PrivateRoute';
// // import { AuthProvider, useAuth  } from './AuthContext';
// import { Modal, Button, Form, Card } from 'react-bootstrap';



// function Dashboard() {

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
     
//     <Router>
//       {/* <AuthProvider> */}
//         <div>
//             <body id="page-top">
//                 <div id="wrapper">
//                     <Sidebar style={sidebarClass} toggleSidebar={toggleSidebar} />

//                     <div id="content-wrapper" className="d-flex flex-column">
//                         <div id="content">
                           
//                            <Topbar toggleTopbar={toggleTopbar} />

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
                                      
                    //   <Routes>
                        
                    //   <Route path="/*" element={<Outlet />} />

                    //     <Route path="/dashboard/*" element={<PostList />} />
                    //     <Route path="/dashboard/add-post" element={<AddPost />} />
                    //     <Route path="/dashboard/edit-post/:id" element={<UpdatePost />} />
                    //     <Route path="/dashboard/view-post/:id" element={<ViewPost />} />

                    //     <Route path="/dashboard/add-profile" element={<AddUserProfile />} />
                    //     <Route path="/dashboard/users-profile-list" element={<UsersProfileList />} />
                    //     <Route path="/dashboard/dashboard" element={<userProfile />} />
                    //     <Route path="/dashboard/users" element={<UserList />} />
                    //     <Route path="/dashboard/add-user" element={<AddUser />} />
                    //     <Route path="/dashboard/edit-user/:id" element={<UpdateUser />} />
                    //     <Route path="/dashboard/view-user/:id" element={<ViewUser />} />

                    //     <Route path="/dashboard/fees" element={<FeesList />} />
                    //     <Route path="/dashboard/add-fee" element={<AddFees />} />
                    //     <Route path="/dashboard/edit-fee/:id" element={<UpdateFees />} />
                    //     <Route path="/dashboard/view-fee/:id" element={<ViewFees />} />

                    //     <Route path="/dashboard/payment" element={<PaymentList />} />
                    //     <Route path="/dashboard/add-payment" element={<AddPayment />} />
                    //     <Route path="/dashboard/edit-payment/:id" element={<UpdatePayment />} />
                    //     <Route path="/dashboard/view-payment/:id" element={<ViewPayment />} />

                    //     <Route path="/dashboard/pins-list" element={<PinsList />} />
                    //     <Route path="/dashboard/create-pin" element={<AddPin />} />
                    //     <Route path="/dashboard/create-batch-pin" element={<AddBatchPins />} />
                    //     <Route path="/dashboard/edit-pin/:id" element={<UpdatePin />} />
                    //     <Route path="/dashboard/view-pin/:id" element={<ViewPin />} />

                    //     <Route path='/dashboard/add-student' element={<AddStudent />} />
                    //     <Route path='/dashboard/view-students' element={<StudentList />} />
                    //     <Route path='/dashboard/student-detail/:id' element={<ViewStudent />} />
                        
                    //     <Route path='/dashboard/add-exam-record' element={<AddExamRecord />} />
                    //     <Route path='/dashboard/exam-records' element={<ExamRecordList />} />
                    //     <Route path='/dashboard/result-checker' element={<ResultCheckerScreen />} />
                    //     <Route path='/dashboard/result-sheet' element={<ResultSheet />} />
                    //     <Route path='/dashboard/view-exam-record/:id' element={<ViewExamRecord />} />
                        
                        
                    //     <Route path='/manage-course' element={<CourseDetailList />} />
                    //     <Route path='/nursery' element={<PreschoolResultTable />} />
                    //   </Routes>
                    // {/* </Router> */}
   
//         <div>
         
//         </div>
      
                                  



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
       
//         {/* </AuthProvider> */}
//     </Router>
//     );
// }

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom';
// import './Dashboard.css';
// import Sidebar from './component/Sidebar';
// import Footer from './component/Footer';
// import Topbar from './component/Topbar';

// import PostList from './blog/PostList';
// import AddPost from './blog/AddPost';
// import ViewPost from './blog/ViewPost';
// import UpdatePost from './blog/UpdatePost';

// import UserList from './user/UserList';
// import AddUser from './user/AddUser';
// import UpdateUser from './user/UpdateUser';
// import ViewUser from './user/ViewUser';

// import FeesList from './fees/FeesList';
// import AddFees from './fees/AddFees';
// import UpdateFees from './fees/UpdateFees';
// import ViewFees from './fees/ViewFees';
// import PaymentList from './payments/PaymentList';
// import AddPayment from './payments/AddPayment';
// import UpdatePayment from './payments/UpdatePayment';
// import ViewPayment from './payments/ViewPayment';
// import Signup from './Signup';
// import Authenticate from './Authenticate';
// import PinsList from './pin/PinsList';
// import AddPin from './pin/AddPin';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';
// import AddExamRecord from './exams/AddExamRecord ';
// import ExamRecordList from './exams/ExamRecordList';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';
// import AddStudent from './students/AddStudent';
// import StudentList from './students/StudentList';
// import ViewStudent from './students/ViewStudent';
// import CourseDetailList from './courses/CourseDetailList';
// import AddUserProfile from './user/AddUserProfile';
// import UsersProfileList from './user/UsersProfileList';
// import ResultSheet from './result-checker/ResultSheet';
// import ViewExamRecord from './exams/ViewExamRecord';
// import { useAuth } from './AuthContext';
// import PreschoolResultTable from './result-checker/PreschoolResultTable';
// // import PrivateRoute from './PrivateRoute';
// // import { AuthProvider, useAuth  } from './AuthContext';
// import { Modal, Button, Form, Card } from 'react-bootstrap';
// import UserProfile from './user/UserProfile';



// function Dashboard() {

//   const routes = [
//     { path: '/dashboard', element: <UserProfile /> }, // Default route
//     { path: '/dashboard/users', element: <UserList /> },
//     { path: '/dashboard/users/add', element: <AddUser /> },
//     { path: '/dashboard/users/:id', element: <ViewUser /> },
//     { path: '/dashboard/users/:id/edit', element: <UpdateUser /> },
    
//     { path: '/dashboard/posts', element: <PostList /> },
//     { path: '/dashboard/posts/add', element: <AddPost /> },
//     { path: '/dashboard/posts/:id', element: <ViewPost /> },
//     { path: '/dashboard/posts/:id/edit', element: <UpdatePost /> },
    
//     { path: '/dashboard/fees', element: <FeesList /> },
//     { path: '/dashboard/fees/add', element: <AddFees /> },
//     { path: '/dashboard/fees/:id', element: <ViewFees /> },
//     { path: '/dashboard/fees/:id/edit', element: <UpdateFees /> },
    
//     { path: '/dashboard/payments', element: <PaymentList /> },
//     { path: '/dashboard/payments/add', element: <AddPayment /> },
//     { path: '/dashboard/payments/:id', element: <ViewPayment /> },
//     { path: '/dashboard/payments/:id/edit', element: <UpdatePayment /> },
    
//     { path: '/dashboard/pins', element: <PinsList /> },
//     { path: '/dashboard/pins/add', element: <AddPin /> },
//     { path: '/dashboard/pins/batch-add', element: <AddBatchPins /> },
//     { path: '/dashboard/pins/:id', element: <ViewPin /> },
//     { path: '/dashboard/pins/:id/edit', element: <UpdatePin /> },
    
//     { path: '/dashboard/students', element: <StudentList /> },
//     { path: '/dashboard/students/add', element: <AddStudent /> },
//     { path: '/dashboard/students/:id', element: <ViewStudent /> },
//     // { path: '/dashboard/students/:id/edit', element: <UpdateStudent /> },
    
//     { path: '/dashboard/exams', element: <ExamRecordList /> },
//     { path: '/dashboard/exams/add', element: <AddExamRecord /> },
//     { path: '/dashboard/exams/:id', element: <ViewExamRecord /> },
//     // { path: '/dashboard/exams/:id/edit', element: <UpdateExamRecord /> },
    
//     { path: '/dashboard/courses', element: <CourseDetailList /> },
//     // { path: '/dashboard/courses/add', element: <AddCourseDetail /> },
//     // { path: '/dashboard/courses/:id', element: <ViewCourseDetail /> },
//     // { path: '/dashboard/courses/:id/edit', element: <UpdateCourseDetail /> },
    
//     // Add more routes as needed...
//   ];
  



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
  
//           <Router>
//             <div>
//               <Sidebar />
      
//               <div id="content-wrapper" className="d-flex flex-column">
//                 <div id="content">
//                   <Topbar />
      
//                   <div className="container-fluid">
//                     <div className="d-sm-flex align-items-center justify-content-between mb-4">
//                       <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">Floral school App Administration</h1>
//                       <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
//                         <i className="fas fa-download fa-sm text-white-50"></i>
//                       </a>
//                     </div>
      
//                     <div className="row">
//                       <div className="col-xl-11 col-lg-10 mx-5">
//                         <div className="mb-4">
//                           <Routes>
//                             {routes.map((route, index) => (
//                               <Route key={index} path={route.path} element={route.element} />
//                             ))}
//                           </Routes>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
      
//                 <Footer />
//               </div>
//             </div>
//           </Router>
      
//     );
// }

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom';
// import './Dashboard.css';
// import Sidebar from './component/Sidebar';
// import Footer from './component/Footer';
// import Topbar from './component/Topbar';

// import PostList from './blog/PostList';
// import AddPost from './blog/AddPost';
// import ViewPost from './blog/ViewPost';
// import UpdatePost from './blog/UpdatePost';

// import UserList from './user/UserList';
// import AddUser from './user/AddUser';
// import UpdateUser from './user/UpdateUser';
// import ViewUser from './user/ViewUser';

// import FeesList from './fees/FeesList';
// import AddFees from './fees/AddFees';
// import UpdateFees from './fees/UpdateFees';
// import ViewFees from './fees/ViewFees';
// import PaymentList from './payments/PaymentList';
// import AddPayment from './payments/AddPayment';
// import UpdatePayment from './payments/UpdatePayment';
// import ViewPayment from './payments/ViewPayment';
// import Signup from './Signup';
// import Authenticate from './Authenticate';
// import PinsList from './pin/PinsList';
// import AddPin from './pin/AddPin';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';
// import AddExamRecord from './exams/AddExamRecord ';
// import ExamRecordList from './exams/ExamRecordList';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';
// import AddStudent from './students/AddStudent';
// import StudentList from './students/StudentList';
// import ViewStudent from './students/ViewStudent';
// import CourseDetailList from './courses/CourseDetailList';
// import AddUserProfile from './user/AddUserProfile';
// import UsersProfileList from './user/UsersProfileList';
// import ResultSheet from './result-checker/ResultSheet';
// import ViewExamRecord from './exams/ViewExamRecord';
// import { useAuth } from './AuthContext';
// import PreschoolResultTable from './result-checker/PreschoolResultTable';
// // import PrivateRoute from './PrivateRoute';
// // import { AuthProvider, useAuth  } from './AuthContext';
// import { Modal, Button, Form, Card } from 'react-bootstrap';



// function Dashboard() {

  
// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');

// const handleUsernameChange = (value) => {
//   setUsername(value);
// };

// const handlePasswordChange = (value) => {
//   setPassword(value);
// };

// const handleLoginSubmit = () => {
//   // Implement your login logic here
//   console.log('Logging in with:', { username, password });
//   // Add your authentication logic, e.g., making an API request
// };


// const Login= () =>{
//   return (
//     <Card className="mb-3">
//       <Card.Body>
//         <Card.Title>Login</Card.Title>
//         <Form.Group controlId="formUsername" className="custom-form-control">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter username"
//             value={username}
//             onChange={(e) => handleUsernameChange(e.target.value)}
//           />
//         </Form.Group>
  
//         <Form.Group controlId="formPassword" className="custom-form-control">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => handlePasswordChange(e.target.value)}
//           />
//         </Form.Group>
  
//         <Form.Group controlId="formLogin" className="custom-form-control text-center">
//           <Button variant="primary" onClick={handleLoginSubmit} className="custom-form-control btn-lg btn-12">
//             Login
//           </Button>
//         </Form.Group>
//       </Card.Body>
//     </Card>
//   );
//   }
  

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
     
//     <Router>
//       {/* <AuthProvider> */}
//         <div>
//             <body id="page-top">
//                 <div id="wrapper">
//                     <Sidebar style={sidebarClass} toggleSidebar={toggleSidebar} />

//                     <div id="content-wrapper" className="d-flex flex-column">
//                         <div id="content">
                           
//                            <Topbar toggleTopbar={toggleTopbar} />

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
                                      
                    //   <Routes>
                    
                      
                    //     <Route path="/dashboard" element={<userProfile />} />
                    //     <Route path="/users" element={<UserList />} />
                    //     <Route path="/add-user" element={<AddUser />} />

                    //     <Route path="/add-profile" element={<AddUserProfile />} />
                    //     <Route path="/users-profile-list" element={<UsersProfileList />} />
                     
                    //     <Route path="/edit-user/:id" element={<UpdateUser />} />
                    //     <Route path="/view-user/:id" element={<ViewUser />} />

                    //     <Route path="/posts" element={<PostList />} />
                    //     <Route path="/add-post" element={<AddPost />} />
                    //     <Route path="/edit-post/:id" element={<UpdatePost />} />
                    //     <Route path="/view-post/:id" element={<ViewPost />} />

                    //     <Route path="/fees" element={<FeesList />} />
                    //     <Route path="/add-fee" element={<AddFees />} />
                    //     <Route path="/edit-fee/:id" element={<UpdateFees />} />
                    //     <Route path="/view-fee/:id" element={<ViewFees />} />

                    //     <Route path="/payment" element={<PaymentList />} />
                    //     <Route path="/add-payment" element={<AddPayment />} />
                    //     <Route path="/edit-payment/:id" element={<UpdatePayment />} />
                    //     <Route path="/view-payment/:id" element={<ViewPayment />} />

                    //     <Route path="/pins-list" element={<PinsList />} />
                    //     <Route path="/create-pin" element={<AddPin />} />
                    //     <Route path="/create-batch-pin" element={<AddBatchPins />} />
                    //     <Route path="/edit-pin/:id" element={<UpdatePin />} />
                    //     <Route path="/view-pin/:id" element={<ViewPin />} />

                    //     <Route path='/add-student' element={<AddStudent />} />
                    //     <Route path='/view-students' element={<StudentList />} />
                    //     <Route path='/student-detail/:id' element={<ViewStudent />} />
                        
                    //     <Route path='/add-exam-record' element={<AddExamRecord />} />
                    //     <Route path='/exam-records' element={<ExamRecordList />} />
                    //     <Route path='/result-checker' element={<ResultCheckerScreen />} />
                    //     <Route path='/result-sheet' element={<ResultSheet />} />
                    //     <Route path='/view-exam-record/:id' element={<ViewExamRecord />} />
                        
                        
                    //     <Route path='/manage-course' element={<CourseDetailList />} />
                    //     <Route path='/nursery' element={<PreschoolResultTable />} />
                    //   </Routes>
                    // {/* </Router> */}
   
//         <div>
         
//         </div>
      
                                  



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
       
//         {/* </AuthProvider> */}
//     </Router>
//     );
// }

// export default Dashboard;



// import React, { useState } from 'react';
// import { Routes, Route, Router } from 'react-router-dom';
// import './Dashboard.css';
// import Sidebar from './component/Sidebar';
// import Footer from './component/Footer';
// import Topbar from './component/Topbar';

// import PostList from './blog/PostList';
// import AddPost from './blog/AddPost';
// import ViewPost from './blog/ViewPost';
// import UpdatePost from './blog/UpdatePost';

// // import UserProfile from './user/UserProfile';
// import UserList from './user/UserList';
// import AddUser from './user/AddUser';
// import UpdateUser from './user/UpdateUser';
// import ViewUser from './user/ViewUser';

// import FeesList from './fees/FeesList';
// import AddFees from './fees/AddFees';
// import UpdateFees from './fees/UpdateFees';
// import ViewFees from './fees/ViewFees';

// import PaymentList from './payments/PaymentList';
// import AddPayment from './payments/AddPayment';
// import UpdatePayment from './payments/UpdatePayment';
// import ViewPayment from './payments/ViewPayment';

// import PinsList from './pin/PinsList';
// import AddPin from './pin/AddPin';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';

// // import AddExamRecord from './exams/AddExamRecord';
// import ExamRecordList from './exams/ExamRecordList';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';

// function Dashboard() {
//   const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
//   const [isSidebarToggled, setSidebarToggled] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//   const toggleTopbar = () => {
//     setStyle(style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
//       ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//       : "navbar-nav bg-gradient-primary sidebar sidebarDark accordion"
//     );
//   };

//   const toggleSidebar = () => {
//     setSidebarToggled(!isSidebarToggled);
//   };

//   const sidebarClass = isSidebarToggled
//     ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//     : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";

//   return (
//     <div>
//       <>

    
//         <div id="wrapper">
//           <Sidebar style={sidebarClass} toggleSidebar={toggleSidebar} />

//           <div id="content-wrapper" className="d-flex flex-column">
//             <div id="content">
//               <Topbar toggleTopbar={toggleTopbar} />

//               <div className="container-fluid">
//                 <div className="d-sm-flex align-items-center justify-content-between mb-4">
//                   <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">Floral school App Administration </h1>
//                   <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
//                     <i className="fas fa-download fa-sm text-white-50"></i>
//                   </a>
//                 </div>

//                 <div className="row">
//                   <div className="col-xl-11 col-lg-10 mx-5">
//                     <div className="mb-4">
//                     <Router>
//                       <Routes>
//                         <Route path="/" element={<PostList />} />
//                         <Route path="/add-post" element={<AddPost />} />
//                         <Route path="/edit-post/:id" element={<UpdatePost />} />
//                         <Route path="/view-post/:id" element={<ViewPost />} />

//                         <Route path="/users" element={<UserList />} />
//                         <Route path="/add-user" element={<AddUser />} />
//                         <Route path="/edit-user/:id" element={<UpdateUser />} />
//                         <Route path="/view-user/:id" element={<ViewUser />} />

//                         <Route path="/fees" element={<FeesList />} />
//                         <Route path="/add-fee" element={<AddFees />} />
//                         <Route path="/edit-fee/:id" element={<UpdateFees />} />
//                         <Route path="/view-fee/:id" element={<ViewFees />} />

//                         <Route path="/payment" element={<PaymentList />} />
//                         <Route path="/add-payment" element={<AddPayment />} />
//                         <Route path="/edit-payment/:id" element={<UpdatePayment />} />
//                         <Route path="/view-payment/:id" element={<ViewPayment />} />

//                         <Route path="/pins-list" element={<PinsList />} />
//                         <Route path="/create-pin" element={<AddPin />} />
//                         <Route path="/create-batch-pin" element={<AddBatchPins />} />
//                         <Route path="/edit-pin/:id" element={<UpdatePin />} />
//                         <Route path="/view-pin/:id" element={<ViewPin />} />

//                         {/* <Route path='/add-exam-record' element={<AddExamRecord />} /> */}
//                         <Route path='/exam-records' element={<ExamRecordList />} />
//                         <Route path='/result-checker' element={<ResultCheckerScreen />} />
//                       </Routes>
//                     </Router>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Footer />
//           </div>
//         </div>
//       </>
//     </div>
//   );
// }

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Navigate} from 'react-router-dom';
// import './Dashboard.css';
// import Sidebar from './component/Sidebar';
// import Footer from './component/Footer';
// import Topbar from './component/Topbar';
// // import ProtectedRoute from './ProtectedRoute';

// import PostList from './blog/PostList';
// import AddPost from './blog/AddPost';
// import ViewPost from './blog/ViewPost';
// import UpdatePost from './blog/UpdatePost';

// import UserProfile from './user/UserProfile';
// import UserList from './user/UserList';
// import AddUser from './user/AddUser';
// import UpdateUser from './user/UpdateUser';
// import ViewUser from './user/ViewUser';

// import FeesList from './fees/FeesList';
// import AddFees from './fees/AddFees';
// import UpdateFees from './fees/UpdateFees';
// import ViewFees from './fees/ViewFees';
// import PaymentList from './payments/PaymentList';
// import AddPayment from './payments/AddPayment';
// import UpdatePayment from './payments/UpdatePayment';
// import ViewPayment from './payments/ViewPayment';
// // import Signup from './Signup';
// // import Authenticate from './Authenticate';
// import PinsList from './pin/PinsList';
// import AddPin from './pin/AddPin';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';
// import AddExamRecord from './exams/AddExamRecord ';
// // import PrivateRoute from './PrivateRoute';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';
// import ExamRecordList from './exams/ExamRecordList';
// // import PrivateRoute from './PrivateRoute';
// // import { AuthProvider, useAuth  } from './AuthContext';


// function Dashboard() {
  
//     const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//     const toggleTopbar = () => {
//       if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
//         setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
//       } else {
//         setStyle("navbar-nav bg-gradient-primary sidebar sidebarDark accordion")
//       }
//     };
  
//     const [isSidebarToggled, setSidebarToggled] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//     const toggleSidebar = () => {
//         setSidebarToggled(!isSidebarToggled);
//     };
    
//     const sidebarClass = isSidebarToggled
//         ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//         : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";

      
//     return (
    

//         <div>
//           <>
//             <body id="page-top">
//                 <div id="wrapper">
//                     <Sidebar style={sidebarClass} toggleSidebar={toggleSidebar} />

//                     <div id="content-wrapper" className="d-flex flex-column">
//                         <div id="content">
                           
//                            <Topbar toggleTopbar={toggleTopbar} />

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

//                                   {/* <ProtectedRoute ></ProtectedRoute> */}
                                          
//                                     <Routes>
                                
//                                         {/* <Route path="/" element={<Dashboard />} /> */}
//                                         {/* <Route path="/" element={<UserProfile />} /> */}
//                                         <Route path="/" element={<PostList />} />
//                                         <Route path="/add-post" element={<AddPost />} />
//                                         <Route path="/edit-post/:id" element={<UpdatePost />} />
//                                         <Route path="/view-post/:id" element={<ViewPost />} />
//                                     </Routes>
                                    
//                                     <Routes>
//                                         <Route path="/users" element={<UserList />} />
//                                         <Route path="/add-user" element={<AddUser />} />
//                                         <Route path="/edit-user/:id" element={<UpdateUser />} />
//                                         <Route path="/view-user/:id" element={<ViewUser />} />

//                                     </Routes>

                                             
//                                     <Routes>
//                                         <Route path="/Fees" element={<FeesList />} />
//                                         <Route path="/add-Fee" element={<AddFees />} />
//                                         <Route path="/edit-Fee/:id" element={<UpdateFees />} />
//                                         <Route path="/view-Fee/:id" element={<ViewFees />} />

//                                     </Routes>

//                                     <Routes>
//                                         <Route path="/payment" element={<PaymentList />} />
//                                         <Route path="/add-payment" element={<AddPayment />} />
//                                         <Route path="/edit-payment/:id" element={<UpdatePayment />} />
//                                         <Route path="/view-payment/:id" element={<ViewPayment />} />
//                                     </Routes>
//                                     <Routes>
//                                         <Route path="/pins-list" element={<PinsList />} />
//                                         <Route path="/create-pin" element={<AddPin />} />
//                                         <Route path="/create-batch-pin" element={<AddBatchPins />} />
//                                         <Route path="/edit-pin/:id" element={<UpdatePin />} />
//                                         <Route path="/view-pin/:id" element={<ViewPin />} />
//                                     </Routes>

//                                     <Routes>
//                                        <Route path='/add-exam-record' element={<AddExamRecord />} />
//                                        <Route path='/exam-records' element={<ExamRecordList />} />
//                                        <Route path='/result-checker' element={<ResultCheckerScreen />} />
//                                     </Routes>



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
//         </>
//         </div>

//     );
// }

// export default Dashboard;



