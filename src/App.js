import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './component/Sidebar';
import Footer from './component/Footer';
import Topbar from './component/Topbar';




/**!SECTION
 * Dashboard
 * 
 */

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
// import PrivateRoute from './PrivateRoute';
// import { AuthProvider, useAuth  } from './AuthContext';


function App() {
   
    // const { isAuthenticated, loading } = useAuth(); 
    // assuming useAuth returns an object with isAuthenticated and loading state
    // const navigate = useNavigate();
 
  
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const toggleTopbar = () => {
      if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
        setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
      } else {
        setStyle("navbar-nav bg-gradient-primary sidebar sidebarDark accordion")
      }
    };
  
    const [isSidebarToggled, setSidebarToggled] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    // const [isSidebarToggled2, setSidebarToggled2] = useState(false);

    const toggleSidebar = () => {
        setSidebarToggled(!isSidebarToggled);
    };
    
    const sidebarClass = isSidebarToggled
        ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";

        // if (loading) {
        //     // You can add a loading indicator here if needed
        //     return <div>Loading...</div>;
        //   }
    return (
     
    <Router>
      {/* <AuthProvider> */}
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
                                        <div className="mb-4">
                                        <Routes>
                                            <Route path="/signup" element={<Signup />} />
                                            <Route path="/login" element={<Authenticate />} />
                                        </Routes>   
                                           
                                    <Routes>
                                        <Route path="/" element={<PostList />} />
                                        <Route path="/add-post" element={<AddPost />} />
                                        <Route path="/edit-post/:id" element={<UpdatePost />} />
                                        <Route path="/view-post/:id" element={<ViewPost />} />
                                    </Routes>
                                    
                                    <Routes>
                                        <Route path="/users" element={<UserList />} />
                                        <Route path="/add-user" element={<AddUser />} />
                                        <Route path="/edit-user/:id" element={<UpdateUser />} />
                                        <Route path="/view-user/:id" element={<ViewUser />} />

                                    </Routes>

                                             
                                    <Routes>
                                        <Route path="/Fees" element={<FeesList />} />
                                        <Route path="/add-Fee" element={<AddFees />} />
                                        <Route path="/edit-Fee/:id" element={<UpdateFees />} />
                                        <Route path="/view-Fee/:id" element={<ViewFees />} />

                                    </Routes>

                                    <Routes>
                                        <Route path="/payment" element={<PaymentList />} />
                                        <Route path="/add-payment" element={<AddPayment />} />
                                        <Route path="/edit-payment/:id" element={<UpdatePayment />} />
                                        <Route path="/view-payment/:id" element={<ViewPayment />} />
                                    </Routes>
                                    <Routes>
                                        <Route path="/pins-list" element={<PinsList />} />
                                        <Route path="/create-pin" element={<AddPin />} />
                                        <Route path="/create-batch-pin" element={<AddBatchPins />} />
                                        <Route path="/edit-pin/:id" element={<UpdatePin />} />
                                        <Route path="/view-pin/:id" element={<ViewPin />} />
                                    </Routes>

                                    <Routes>
                                       <Route path='add-exam-record' element={<AddExamRecord />} />
                                    </Routes>
   
        <div>
          {/* ... (your existing code) */}

          {/* <Routes>
                  <Route
                    path="/signup"
                    element={
                      isAuthenticated ? (
                       <>
                        <button
                        className="btn btn-danger mx-5 btn-back"
                        onClick={() => navigate('/user-list')}
                    ></button>
                       </>
                      ) : (
                        <Signup />
                      )
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      isAuthenticated ? (
                        <>
                        <button
                        className="btn btn-danger mx-5 btn-back"
                        onClick={() => navigate('/user-list')}
                    ></button>
                       </>
                      ) : (
                        <Authenticate />
                      )
                    }
                  />
                </Routes> */}

                {/* Routes for private pages */}
                {/* <Routes>
                  <PrivateRoute path="/" element={<PostList />} />
                  <PrivateRoute path="/add-post" element={<AddPost />} />
                  <PrivateRoute path="/edit-post/:id" element={<UpdatePost />} />
                  <PrivateRoute path="/view-post/:id" element={<ViewPost />} />

                  <PrivateRoute path="/users" element={<UserList />} />
                  <PrivateRoute path="/add-user" element={<AddUser />} />
                  <PrivateRoute path="/edit-user/:id" element={<UpdateUser />} />
                  <PrivateRoute path="/view-user/:id" element={<ViewUser />} />

                  <PrivateRoute path="/fees" element={<FeesList />} />
                  <PrivateRoute path="/add-fee" element={<AddFees />} />
                  <PrivateRoute path="/edit-fee/:id" element={<UpdateFees />} />
                  <PrivateRoute path="/view-fee/:id" element={<ViewFees />} />

                  <PrivateRoute path="/payment" element={<PaymentList />} />
                  <PrivateRoute path="/add-payment" element={<AddPayment />} />
                  <PrivateRoute path="/edit-payment/:id" element={<UpdatePayment />} />
                  <PrivateRoute path="/view-payment/:id" element={<ViewPayment />} />
                </Routes> */}
          {/* ... (rest of your code) */}
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

                {/* Logout Modal */}
                <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    {/* ... (logout modal code) */}
                </div>
            </body>
        </div>
       
        {/* </AuthProvider> */}
    </Router>
    );
}

export default App;



