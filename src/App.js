import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authenticate from './Authenticate';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

// Importing other components
import Home from './Home';
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
import PinsList from './pin/PinsList';
import AddPin from './pin/AddPin';
import AddBatchPins from './pin/AddBatchPins';
import UpdatePin from './pin/UpdatePin';
import ViewPin from './pin/ViewPin';
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
import AddExamRecord from './exams/AddExamRecord ';
import UserProfile from './user/UserProfile';

// ... (Previous imports)

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Authenticate />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard/*"
            element={<PrivateRoute element={<Dashboard />} />}
          />

          {/* Blog Routes */}
          <Route path="/dashboard/posts" element={<PrivateRoute element={<PostList />} />} />
          <Route path="/dashboard/add-post" element={<PrivateRoute element={<AddPost />} />} />
          <Route path="/dashboard/view-post/:id" element={<PrivateRoute element={<ViewPost />} />} />
          <Route path="/dashboard/update-post/:id" element={<PrivateRoute element={<UpdatePost />} />} />

          {/* User Routes */}
          <Route path="/dashboard/users" element={<PrivateRoute element={<UserList />} />} />
          <Route path="/users" element={<UserList />} />

          <Route path="/dashboard/add-user" element={<PrivateRoute element={<AddUser />} />} />
          <Route path="/dashboard/update-user/:id" element={<PrivateRoute element={<UpdateUser />} />} />
          <Route path="/dashboard/view-user/:id" element={<PrivateRoute element={<ViewUser />} />} />

          {/* Fees Routes */}
          <Route path="/dashboard/fees" element={<PrivateRoute element={<FeesList />} />} />
          <Route path="/dashboard/add-fees" element={<PrivateRoute element={<AddFees />} />} />
          <Route path="/dashboard/update-fees/:id" element={<PrivateRoute element={<UpdateFees />} />} />
          <Route path="/view-fees/:id" element={<PrivateRoute element={<ViewFees />} />} />

          {/* Payments Routes */}
          <Route path="/dashboard/payments" element={<PrivateRoute element={<PaymentList />} />} />
          <Route path="/dashboard/add-payment" element={<PrivateRoute element={<AddPayment />} />} />
          <Route path="/dashboard/update-payment/:id" element={<PrivateRoute element={<UpdatePayment />} />} />
          <Route path="/dashboard/view-payment/:id" element={<PrivateRoute element={<ViewPayment />} />} />

          {/* Pin Routes */}
          <Route path="/dashboard/pins" element={<PrivateRoute element={<PinsList />} />} />
          <Route path="/dashboard/add-pin" element={<PrivateRoute element={<AddPin />} />} />
          <Route path="/dashboard/add-batch-pins" element={<PrivateRoute element={<AddBatchPins />} />} />
          <Route path="/dashboard/update-pin/:id" element={<PrivateRoute element={<UpdatePin />} />} />
          <Route path="/dashboard/view-pin/:id" element={<PrivateRoute element={<ViewPin />} />} />

          {/* Exams Routes */}
          <Route path="/dashboard/add-exam-record" element={<PrivateRoute element={<AddExamRecord />} />} />
          <Route path="/dashboard/exam-records" element={<PrivateRoute element={<ExamRecordList />} />} />
          <Route path="/dashboard/view-exam-record/:id" element={<PrivateRoute element={<ViewExamRecord />} />} />

          {/* Students Routes */}
          <Route path="/dashboard/add-student" element={<PrivateRoute element={<AddStudent />} />} />
          <Route path="/dashboard/students" element={<PrivateRoute element={<StudentList />} />} />
          <Route path="/dashboard/view-student/:id" element={<PrivateRoute element={<ViewStudent />} />} />

          {/* Courses Routes */}
          <Route path="/dashboard/course-details" element={<PrivateRoute element={<CourseDetailList />} />} />

          {/* User Profile Routes */}
          <Route path="/dashboard/add-user-profile" element={<PrivateRoute element={<AddUserProfile />} />} />
          <Route path="/dashboard/users-profiles" element={<PrivateRoute element={<UsersProfileList />} />} />
          <Route path="/dashboard/user-profile" element={<PrivateRoute element={<UserProfile />} />} />

          {/* Result Checker Routes */}
          <Route path="/dashboard/result-sheet" element={<PrivateRoute element={<ResultSheet />} />} />
          <Route path="/dashboard/result-checker-screen" element={<PrivateRoute element={<ResultCheckerScreen />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route
//             path="/dashboard"
//             element={<PrivateRoute element={<Dashboard />} />}
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* Use the PrivateRoute directly within the Routes */}
//           <PrivateRoute path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* Use the PrivateRoute directly within the Routes */}
//           <PrivateRoute path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthContext, AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* Use the PrivateRoute logic directly inside the Route */}
//           <Route
//             path="/dashboard"
//             element={<PrivateRoute element={<Dashboard />} />}
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthContext, AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   const isAuthenticated  = useContext(AuthContext);

//   const Redirector = ({ to }) => {
//     const navigate = useNavigate();
//     navigate(to, { replace: true });
//     return null;
//   };

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />

//           {/* Public routes */}
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Private route */}
//           <PrivateRoute path="/dashboard" element={<Dashboard />} />

//           {/* Default route based on authentication status */}
//           <Route
//             path="*"
//             element={
//               isAuthenticated ? (
//                 <Redirector to="/dashboard" />
//               ) : (
//                 <Redirector to="/login" />
//               )
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;



// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthContext, AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   const isAuthenticated = useContext(AuthContext);
//     // const { isAuth, getAuthToken, getRole, user, logout } = useContext(AuthContext);


//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />

//           {/* Public routes */}
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Private route */}
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 {/* <> */}
//                   <Dashboard />
//                 {/* </> */}
//               </PrivateRoute>
//             }
//           />

//           {/* Default route based on authentication status */}
//           <Route
//             path="*"
//             element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthContext, AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   const isAuthenticated = useContext(AuthContext);

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />

//           {/* Use PrivateRoute for protected routes */}
//           <PrivateRoute path="/dashboard" element={<Dashboard />} />

//           {/* Public routes */}
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Default route based on authentication status */}
//           <Route
//             path="*"
//             element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthContext, AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   // const { isAuthenticated } = useContext(AuthContext);
//   const  isAuthenticated  = useContext(AuthContext);

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />
//           <PrivateRoute path="/dashboard" element={<Dashboard />} />
//           <Route
//             path="/"
//             element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthContext, AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   const  isAuthenticated  = useContext(AuthContext);

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />
//           <PrivateRoute path="/dashboard" element={<Dashboard />} />
//           <Route
//             path="/"
//             element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
//           />

//           {isAuthenticated ? (
//             <Route path="/dashboard" element={<Dashboard />} />
//           ) : (
           
//             <Route path="/login" element={<Authenticate />} />
//           )}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;



// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthContext, AuthProvider, useAuth } from './AuthContext';

// const App = () => {
//   // const user = useAuth();
// const isAuthenticated = useContext(AuthContext);
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />

//           {isAuthenticated ? (
//             <Route path="/dashboard" element={<Dashboard />} />
//           ) : (
//             // Redirect to login page if not authenticated
//             <Route path="/login" element={<Authenticate />} />
//           )}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthProvider, AuthContext, useAuth } from './AuthContext';

// const App = () => {
//   // const user = useContext(AuthContext);
//   // const user = useAuth();
//   const  user  = useAuth();
//   console.log(user);
//   // const  getAuthToken  = useAuth();
//   const  getAuthToken  = useAuth();

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Authenticate />} />
//           <Route path="/signup" element={<Signup />} />

//           {user ? (
//             <Route path="/dashboard" element={<Dashboard />} />
//           ) : (
//             // Redirect to login page if not authenticated
//             <Route path="/dashboard" element={<Authenticate />} />
//           )}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthProvider, AuthContext } from './AuthContext';

// const App = () => {
//   const user = useContext(AuthContext);

//   return (
//     <AuthProvider>
//         {user ? (
//           <Dashboard /> 
//         ) : (
//           <>
//           <Router>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Authenticate />} />
//               <Route path="/signup" element={<Signup />} />
//             </Routes>
//         </Router>
//           </>
//         )}
//       </AuthProvider>
//   );
// };

// export default App;


// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthProvider, AuthContext } from './AuthContext';

// const App = () => {
//   const user = useContext(AuthContext);

//   return (
//     <Router>
//       <AuthProvider>
//         {user ? (
//           <Routes>
//             <Route path="/dashboard/*" element={<Dashboard />} />
//           </Routes>
//         ) : (
//           <>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Authenticate />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//             </Routes>
//           </>
//         )}
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;


// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthProvider, AuthContext } from './AuthContext';

// const App = () => {
//   const user = useContext(AuthContext);

//   return (
//     <Router>
//       <AuthProvider>
//         {user ? (
//           // If the user is logged in, show the Dashboard component
//           <Dashboard />
//         ) : (
//           // If the user is not logged in, show the SignIn and SignUp components
//           <>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Authenticate />} />
//               <Route path="/signup" element={<Signup />} />
//             </Routes>
//           </>
//         )}
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;



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



// function App() {

  
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
                                      
//                       <Routes>
                        
//                       <Route path="/signin" element={<Authenticate />} />
//                       <Route path="/signup" element={<Signup />} />

//                         <Route path="/dashboard/*" element={<PostList />} />
//                         <Route path="/dashboard/add-post" element={<AddPost />} />
//                         <Route path="/dashboard/edit-post/:id" element={<UpdatePost />} />
//                         <Route path="/dashboard/view-post/:id" element={<ViewPost />} />

//                         <Route path="/dashboard/add-profile" element={<AddUserProfile />} />
//                         <Route path="/dashboard/users-profile-list" element={<UsersProfileList />} />
//                         <Route path="/dashboard/dashboard" element={<userProfile />} />
//                         <Route path="/dashboard/users" element={<UserList />} />
//                         <Route path="/dashboard/add-user" element={<AddUser />} />
//                         <Route path="/dashboard/edit-user/:id" element={<UpdateUser />} />
//                         <Route path="/dashboard/view-user/:id" element={<ViewUser />} />

//                         <Route path="/dashboard/fees" element={<FeesList />} />
//                         <Route path="/dashboard/add-fee" element={<AddFees />} />
//                         <Route path="/dashboard/edit-fee/:id" element={<UpdateFees />} />
//                         <Route path="/dashboard/view-fee/:id" element={<ViewFees />} />

//                         <Route path="/dashboard/payment" element={<PaymentList />} />
//                         <Route path="/dashboard/add-payment" element={<AddPayment />} />
//                         <Route path="/dashboard/edit-payment/:id" element={<UpdatePayment />} />
//                         <Route path="/dashboard/view-payment/:id" element={<ViewPayment />} />

//                         <Route path="/dashboard/pins-list" element={<PinsList />} />
//                         <Route path="/dashboard/create-pin" element={<AddPin />} />
//                         <Route path="/dashboard/create-batch-pin" element={<AddBatchPins />} />
//                         <Route path="/dashboard/edit-pin/:id" element={<UpdatePin />} />
//                         <Route path="/dashboard/view-pin/:id" element={<ViewPin />} />

//                         <Route path='/dashboard/add-student' element={<AddStudent />} />
//                         <Route path='/dashboard/view-students' element={<StudentList />} />
//                         <Route path='/dashboard/student-detail/:id' element={<ViewStudent />} />
                        
//                         <Route path='/dashboard/add-exam-record' element={<AddExamRecord />} />
//                         <Route path='/dashboard/exam-records' element={<ExamRecordList />} />
//                         <Route path='/dashboard/result-checker' element={<ResultCheckerScreen />} />
//                         <Route path='/dashboard/result-sheet' element={<ResultSheet />} />
//                         <Route path='/dashboard/view-exam-record/:id' element={<ViewExamRecord />} />
                        
                        
//                         <Route path='/manage-course' element={<CourseDetailList />} />
//                         <Route path='/nursery' element={<PreschoolResultTable />} />
//                       </Routes>
//                     {/* </Router> */}
   
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

// export default App;





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
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// function ExamRecordList() {
//   const [examRecords, setExamRecords] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [filteredCourseTitle, setFilteredCourseTitle] = useState('');
//   const [filteredName, setFilteredName] = useState('');
//   const [terms, setTerms] = useState([]); 

//   const baseUrl = 'http://localhost:8080/api/exam-records';

//   useEffect(() => {
//     fetchExamRecords();
//     setTerms([...new Set(filteredRecords.map((record) => record.terms))]);
//   }, [filteredCourseTitle, filteredName]);



//   const fetchExamRecords = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllExam');
//       const sortedRecords = response.data.sort((a, b) => a.name.localeCompare(b.name));
//       setExamRecords(sortedRecords);
//     } catch (error) {
//       console.error('Error fetching exam records:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching exam records.',
//       });
//     }
//   };

//   const deleteExamRecord = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/deleteExam/' + id);
//       setExamRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Exam record deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the exam record.',
//       });
//     }
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

//   const updateExamRecord = async () => {
//     try {
//       const updatedGrade = calculateGrade(updatedData.score);
//       const updatedRemark = calculateRemark(updatedGrade);

//       const updatedDataWithGradeRemark = {
//         ...updatedData,
//         grade: updatedGrade,
//         remark: updatedRemark,
//       };

//       const response = await axios.put(
//         baseUrl + '/updateExam/' + selectedRecord.id,
//         updatedDataWithGradeRemark
//       );

//       if (response.status === 200) {
//         const updatedRecord = response.data;
//         setExamRecords((prevRecords) =>
//           prevRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))
//         );

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Exam record updated successfully!',
//         });

//         handleCloseModal();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Unexpected response status ' + response.status,
//         });
//       }
//     } catch (error) {
//       console.error('Error updating exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the exam record.',
//       });
//     }
//   };

//   const handleShowModal = (record) => {
//     setSelectedRecord(record);
//     setUpdatedData({
//       name: record.name,
//       courseTitle: record.courseTitle,
//       score: record.score,
//       grade: record.grade,
//       remark: record.remark,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedRecord(null);
//     setUpdatedData({});
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFilterCourseTitleChange = (e) => {
//     setFilteredCourseTitle(e.target.value);
//     setFilteredName('');
//   };

//   const handleFilterNameChange = (e) => {
//     setFilteredName(e.target.value);
//     setFilteredCourseTitle('');
//   };


// function calculateStudentAverages(data) {
//     const studentAverages = {};
  
//     data.forEach((record) => {
//       const { name, score } = record;
  
//       if (!studentAverages[name]) {
//         studentAverages[name] = {
//           totalScore: 0,
//           count: 0,
//         };
//       }
  
//       if (!isNaN(parseFloat(score))) {
//         studentAverages[name].totalScore += parseFloat(score);
//         studentAverages[name].count += 1;
//       }
//     });
  
//     const averages = {};
//     for (const studentName in studentAverages) {
//       const { totalScore, count } = studentAverages[studentName];
//       const average = count > 0 ? totalScore / count : 0;
//       averages[studentName] = average.toFixed(2);
//     }
  
//     return averages;
//   }
  
//   const studentAverages = calculateStudentAverages(examRecords);
//   console.log(studentAverages);

//   const filteredRecords = examRecords.filter(
//     (record) =>
//       (!filteredCourseTitle || record.courseTitle === filteredCourseTitle) &&
//       (!filteredName || record.name.toLowerCase().includes(filteredName.toLowerCase()))
//   );

// //   const terms = [...new Set(filteredRecords.map((record) => record.terms))];

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Exam Records List Table</h6>
//           </div>
//           <div className="mx-5 py-3 col-sm-4">
//             <Form.Group controlId="formCourseTitleFilter">
//               <Form.Control
//                 as="select"
//                 className="custom-select custom-select-lg"
//                 value={filteredCourseTitle}
//                 onChange={handleFilterCourseTitleChange}
//               >
//                 <option value="">Filter by Course Title</option>
//                 {[...new Set(filteredRecords.map((record) => record.courseTitle))].map(
//                   (courseTitle) => (
//                     <option key={courseTitle} value={courseTitle}>
//                       {courseTitle}
//                     </option>
//                   )
//                 )}
//               </Form.Control>
//             </Form.Group>
//           </div>
//           <div className="mx-5 py-3 col-sm-4">
//             <Form.Group controlId="formNameFilter">
//               <Form.Control
//                 type="text"
//                 className="custom-form-control"
//                 placeholder="Filter by Name"
//                 value={filteredName}
//                 onChange={handleFilterNameChange}
//               />
//             </Form.Group>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Course Title</th>
//                   <th>Score</th>
//                   <th>Grade</th>
//                   <th>Terms</th>
//                   <th>Remark</th>
//                   <th>Action</th>
//                   <th>Average Score</th>
//                 </tr>
//               </thead>
//               {/* <tbody>
//                   <tr>First term</tr>
//                 {filteredRecords.map((record, index) => (
//                     <tr key={record.id}>
//                     <td>{record.id}</td>
//                     {index === 0 || record.name !== filteredRecords[index - 1].name ? (
//                       <td rowSpan={filteredRecords.filter((r) => r.name === record.name).length}>
//                         {record.name}
//                       </td>
//                     ) : null}
//                     <td>{record.courseTitle}</td>
//                     <td>{record.score}</td>
//                     <td>{record.grade}</td>
//                     <td>{record.terms}</td>
//                     <td>{record.remark}</td>
//                     <td>
//                       <button
//                         onClick={() => deleteExamRecord(record.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowModal(record)}
//                         className="btn btn-primary btn-sm mx-1"
//                       >
//                         Update
//                       </button>
//                     </td>
//                     {index === 0 || record.name !== filteredRecords[index - 1].name ? (
//                       <td rowSpan={filteredRecords.filter((r) => r.name === record.name).length}>
//                         {studentAverages[record.name]}
//                       </td>
//                     ) : null}
//                   </tr>
//                 ))}
//               </tbody> */}
//               <tbody>
//                 {terms.map((term, termIndex) => (
//                   <React.Fragment key={term}>
//                     <tr aria-colspan={4} className="text-center font-weight-bold ">
//                         <th  className="text-center font-weight-bold ">

//                         {termIndex =termIndex + 1}
//                         </th>
//                         <th className="text-center font-weight-bold ">

//                          <h1 className="text-center font-weight-bold ">

//                          {term.toUpperCase()} TERM'S 

//                          </h1>
//                         </th>
//                         <th colSpan={8} className="text-center font-weight-bold ">
//                             <h1 className="text-center font-weight-bold ">
//                             RESULTS
//                             </h1>
//                         </th>
//                     </tr>
//                     {filteredRecords.map((record, index) => (
//                     <tr key={record.id}>
//                     <td>{index + 1}</td>
//                     {/* {index === 0 || record.name !== filteredRecords[index - 1].name ? (
//                       <td rowSpan={filteredRecords.filter((r) => r.name === record.name).length} className='font-weight-bold'>
//                         {record.name[index]}
                       
//                       </td>
//                     ) : null} */}
//                     {index === 0 || record.name !== filteredRecords[index - 1].name ? (
//                       <td rowSpan={filteredRecords.filter((r) => r.name === record.name).length}>
//                         {record.name}
//                       </td>
//                     ) : null}
//                     <td>{record.courseTitle}</td>
//                     <td>{record.score}</td>
//                     <td>{record.grade}</td>
//                     <td>{record.terms}</td>
//                     <td>{record.remark}</td>
//                     <td>
//                       <button
//                         onClick={() => deleteExamRecord(record.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handleShowModal(record)}
//                         className="btn btn-primary btn-sm mx-1"
//                       >
//                         Update
//                       </button>
//                     </td>
//                     {index === 0 || record.name !== filteredRecords[index - 1].name ? (
//                       <td rowSpan={filteredRecords.filter((r) => r.name === record.name).length}>
//                         {studentAverages[record.name]}
//                       </td>
//                     ) : null}
//                   </tr>
//                 ))}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Exam Record</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 value={updatedData.name}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formCourseTitle">
//               <Form.Label>Course Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter course title"
//                 name="courseTitle"
//                 value={updatedData.courseTitle}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formScore">
//               <Form.Label>Score</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter score"
//                 name="score"
//                 value={updatedData.score}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formGrade">
//               <Form.Label>Grade</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter grade"
//                 name="grade"
//                 value={updatedData.grade}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formRemark">
//               <Form.Label>Remark</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter remark"
//                 name="remark"
//                 value={updatedData.remark}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={updateExamRecord}>
//               Update Record
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default ExamRecordList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Modal, Button, Form } from 'react-bootstrap';

// function ExamRecordList() {
//   const [examRecords, setExamRecords] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [filteredCourseTitle, setFilteredCourseTitle] = useState('');
//   const [filteredName, setFilteredName] = useState('');

//   const baseUrl = 'http://localhost:8080/api/exam-records';

//   useEffect(() => {
//     fetchExamRecords();
//   }, [filteredCourseTitle, filteredName]);

//   const fetchExamRecords = async () => {
//     try {
//       const response = await axios.get(baseUrl + '/viewAllExam');
//       const sortedRecords = response.data.sort((a, b) => a.name.localeCompare(b.name));
//       setExamRecords(sortedRecords);
//     } catch (error) {
//       console.error('Error fetching exam records:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching exam records.',
//       });
//     }
//   };

//   const deleteExamRecord = async (id) => {
//     try {
//       await axios.delete(baseUrl + '/deleteExam/' + id);
//       setExamRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Exam record deleted successfully!',
//       });
//     } catch (error) {
//       console.error('Error deleting exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while deleting the exam record.',
//       });
//     }
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

//   const updateExamRecord = async () => {
//     try {
//       const updatedGrade = calculateGrade(updatedData.score);
//       const updatedRemark = calculateRemark(updatedGrade);

//       const updatedDataWithGradeRemark = {
//         ...updatedData,
//         grade: updatedGrade,
//         remark: updatedRemark,
//       };

//       const response = await axios.put(
//         baseUrl + '/updateExam/' + selectedRecord.id,
//         updatedDataWithGradeRemark
//       );

//       if (response.status === 200) {
//         const updatedRecord = response.data;
//         setExamRecords((prevRecords) =>
//           prevRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))
//         );

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Exam record updated successfully!',
//         });

//         handleCloseModal();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Unexpected response status ' + response.status,
//         });
//       }
//     } catch (error) {
//       console.error('Error updating exam record:', error);

//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while updating the exam record.',
//       });
//     }
//   };

//   const handleShowModal = (record) => {
//     setSelectedRecord(record);
//     setUpdatedData({
//       name: record.name,
//       courseTitle: record.courseTitle,
//       score: record.score,
//       grade: record.grade,
//       remark: record.remark,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedRecord(null);
//     setUpdatedData({});
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFilterCourseTitleChange = (e) => {
//     setFilteredCourseTitle(e.target.value);
//     setFilteredName('');
//   };

//   const handleFilterNameChange = (e) => {
//     setFilteredName(e.target.value);
//     setFilteredCourseTitle('');
//   };

//   const calculateStudentAverages = () => {
//     const studentAverages = {};
//     examRecords.forEach((record) => {
//       if (!studentAverages[record.name]) {
//         studentAverages[record.name] = {
//           totalScore: 0,
//           count: 0,
//         };
//       }
//       studentAverages[record.name].totalScore += record.score;
//       studentAverages[record.name].count += 1;
//     });

//     const averages = {};
//     for (const studentName in studentAverages) {
//       const average =
//         studentAverages[studentName].totalScore / studentAverages[studentName].count;
//       averages[studentName] = isNaN(average) ? 'N/A' : average.toFixed(2);
//     }

//     return averages;
//   };

//   const studentAverages = calculateStudentAverages();

//   return (
//     <div className="container-fluid">
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between">
//           <div className="mx-5 py-3">
//             <h6 className="m-0 font-weight-bold text-primary">Exam Records List Table</h6>
//           </div>
//           <div className="mx-5 py-3 col-sm-4">
//             <Form.Group controlId="formCourseTitleFilter">
//               <Form.Control
//                 as="select"
//                 className="custom-select custom-select-lg"
//                 value={filteredCourseTitle}
//                 onChange={handleFilterCourseTitleChange}
//               >
//                 <option value="">Filter by Course Title</option>
//                 {[...new Set(examRecords.map((record) => record.courseTitle))].map((courseTitle) => (
//                   <option key={courseTitle} value={courseTitle}>
//                     {courseTitle}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </div>
//           <div className="mx-5 py-3 col-sm-4">
//             <Form.Group controlId="formNameFilter">
//               <Form.Control
//                 type="text"
//                 className="custom-form-control"
//                 placeholder="Filter by Name"
//                 value={filteredName}
//                 onChange={handleFilterNameChange}
//               />
//             </Form.Group>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered" width="100%" cellSpacing={0}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Course Title</th>
//                   <th>Score</th>
//                   <th>Grade</th>
//                   <th>Remark</th>
//                   <th>Action</th>
//                   <th>Average Score</th>
//                 </tr>
//               </thead>

//                 <tbody>
//                 {examRecords.map((record, index) => (
//                     <tr key={record.id}>
//                     <td>{record.id}</td>
//                     {index === 0 || record.name !== examRecords[index - 1].name ? (
//                         <td rowSpan={examRecords.filter(r => r.name === record.name).length}>
//                         {record.name}
//                         </td>
//                     ) : null}
//                     <td>{record.courseTitle}</td>
//                     <td>{record.score}</td>
//                     <td>{record.grade}</td>
//                     <td>{record.remark}</td>
//                     <td>
//                         <button
//                         onClick={() => deleteExamRecord(record.id)}
//                         className="btn btn-danger btn-sm mx-1"
//                         >
//                         Delete
//                         </button>
//                         <button
//                         onClick={() => handleShowModal(record)}
//                         className="btn btn-primary btn-sm mx-1"
//                         >
//                         Update
//                         </button>
//                     </td>
//                     {index === 0 || record.name !== examRecords[index - 1].name ? (
//                         <td rowSpan={examRecords.filter(r => r.name === record.name).length}>
//                         {studentAverages[record.name]}
//                         </td>
//                     ) : null}
//                     </tr>
//                 ))}
//                 </tbody>

//             </table>
//           </div>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Exam Record</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 value={updatedData.name}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formCourseTitle">
//               <Form.Label>Course Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter course title"
//                 name="courseTitle"
//                 value={updatedData.courseTitle}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formScore">
//               <Form.Label>Score</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter score"
//                 name="score"
//                 value={updatedData.score}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formGrade">
//               <Form.Label>Grade</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter grade"
//                 name="grade"
//                 value={updatedData.grade}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formRemark">
//               <Form.Label>Remark</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter remark"
//                 name="remark"
//                 value={updatedData.remark}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={updateExamRecord}>
//               Update Record
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default ExamRecordList;



// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './Dashboard';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         {/* <Route path="/signup" element={<Signup />} /> */}
//         {/* <Route path="/login" element={<Authenticate />} /> */}
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
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

// import PinsList from './pin/PinsList';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';


// import UserProfile from './user/UserProfile';
// import Home from './Home';
// import ExamRecordList from './exams/ExamRecordList';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';

// import PinGenerator from './pin/AddPin';
// import AddExamRecord from './exams/AddExamRecord ';

// function App() {
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
//       <body id="page-top">
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
//                       <Routes>
//                         {/* <Route path="/" element={<UserProfile />} /> */}
//                         <Route path="/" element={<PostList />} />
//                         <Route path="/add-post" element={<AddPost />} />
//                         <Route path="/edit-post/:id" element={<UpdatePost />} />
//                         <Route path="/view-post/:id" element={<ViewPost />} />
//                       </Routes>

//                       <Routes>
//                         <Route path="/users" element={<UserList />} />
//                         <Route path="/add-user" element={<AddUser />} />
//                         <Route path="/edit-user/:id" element={<UpdateUser />} />
//                         <Route path="/view-user/:id" element={<ViewUser />} />
//                       </Routes>

//                       <Routes>
//                         <Route path="/Fees" element={<FeesList />} />
//                         <Route path="/add-Fee" element={<AddFees />} />
//                         <Route path="/edit-Fee/:id" element={<UpdateFees />} />
//                         <Route path="/view-Fee/:id" element={<ViewFees />} />
//                       </Routes>

//                       <Routes>
//                         <Route path="/payment" element={<PaymentList />} />
//                         <Route path="/add-payment" element={<AddPayment />} />
//                         <Route path="/edit-payment/:id" element={<UpdatePayment />} />
//                         <Route path="/view-payment/:id" element={<ViewPayment />} />
//                       </Routes>

//                       <Routes>
//                         <Route path="/pins-list" element={<PinsList />} />
//                         <Route path="/pin-generator" element={<PinGenerator />} />
//                         <Route path="/create-batch-pin" element={<AddBatchPins />} />
//                         <Route path="/edit-pin/:id" element={<UpdatePin />} />
//                         <Route path="/view-pin/:id" element={<ViewPin />} />
//                       </Routes>

//                       <Routes>
//                         <Route path='/add-exam-record' element={<AddExamRecord />} />
//                         <Route path='/exam-records' element={<ExamRecordList />} />
//                         <Route path='/result-checker' element={<ResultCheckerScreen />} />
//                       </Routes>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Footer />
//           </div>
//         </div>

//         <a className="scroll-to-top rounded" href="#page-top">
//           <i className="fas fa-angle-up"></i>
//         </a>

//         {/* Logout Modal */}
//         <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//           {/* ... (logout modal code) */}
//         </div>
//       </body>
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import Signup from './Signup';
// import Authenticate from './Authenticate';
// import Dashboard from './Dashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Authenticate />} />
//         <Route path="/dashboard/*" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Link, Navigate} from 'react-router-dom';
// import './Dashboard.css';
// import Sidebar from './component/Sidebar';
// import Footer from './component/Footer';
// import Topbar from './component/Topbar';
// import ProtectedRoute from './ProtectedRoute';

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
// import Signup from './Signup';
// import Authenticate from './Authenticate';
// import PinsList from './pin/PinsList';
// import AddPin from './pin/AddPin';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';
// import AddExamRecord from './exams/AddExamRecord ';
// import PrivateRoute from './PrivateRoute';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';
// import ExamRecordList from './exams/ExamRecordList';
// // import PrivateRoute from './PrivateRoute';
// // import { AuthProvider, useAuth  } from './AuthContext';


// function App() {
  
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
//                              <Router>
                                          
//                                     <Routes>
                                
//                                         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
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

//                                     </Router>

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

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// // import Dashboard from './Dashboard';
// import Home from './Home';

// // Import the components you want to protect
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

// import PinsList from './pin/PinsList';
// import AddPin from './pin/AddPin';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';
// import Dashboard from './Dashboard';
// import AddExamRecord from './exams/AddExamRecord ';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';
// import ExamRecordList from './exams/ExamRecordList';



// const App = () => {
//   return (


    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/login" element={<Authenticate />} />

    //     <Route
    //       path="/dashboard/*"
    //       element={
    //         <Dashboard>
    //           {/* Your protected content here */}
    //           <Route path="posts" element={<PostList />} />
    //           <Route path="add-post" element={<AddPost />} />
    //           <Route path="view-post/:id" element={<ViewPost />} />
    //           <Route path="update-post/:id" element={<UpdatePost />} />


    //           <Route path="user-profile" element={<UserProfile />} />
    //           <Route path="user-list" element={<UserList />} />
    //           <Route path="add-user" element={<AddUser />} />
    //           <Route path="update-user/:id" element={<UpdateUser />} />
    //           <Route path="view-user/:id" element={<ViewUser />} />

    //           <Route path="fees-list" element={<FeesList />} />
    //           <Route path="add-fees" element={<AddFees />} />
    //           <Route path="update-fees/:id" element={<UpdateFees />} />
    //           <Route path="view-fees/:id" element={<ViewFees />} />

    //           <Route path="payment-list" element={<PaymentList />} />
    //           <Route path="add-payment" element={<AddPayment />} />
    //           <Route path="update-payment/:id" element={<UpdatePayment />} />
    //           <Route path="view-payment/:id" element={<ViewPayment />} />

    //           <Route path="pins-list" element={<PinsList />} />
    //           <Route path="add-pin" element={<AddPin />} />
    //           <Route path="add-batch-pins" element={<AddBatchPins />} />
    //           <Route path="update-pin/:id" element={<UpdatePin />} />
    //           <Route path="view-pin/:id" element={<ViewPin />} />

    //       <Route path="add-exam-record" element={<AddExamRecord />} />
    //       <Route path="result-checker" element={<ResultCheckerScreen />} />
    //       <Route path="exam-records" element={<ExamRecordList />} />
    //         </Dashboard>
    //       }
    //     />


    //   </Routes>
    // </Router>


    // <Router>
      // <Routes>
      //   <Route path="/" element={<Home />} />
      //   <Route path="/signup" element={<Signup />} />
      //   <Route path="/login" element={<Authenticate />} />
      //   <ProtectedRoute path="/dashboard/*">
      //     {/* Your protected content here */}
      //     <Route path="posts" element={<PostList />} />
      //     <Route path="add-post" element={<AddPost />} />
      //     <Route path="view-post/:id" element={<ViewPost />} />
      //     <Route path="update-post/:id" element={<UpdatePost />} />

      //     <Route path="user-profile" element={<UserProfile />} />
      //     <Route path="user-list" element={<UserList />} />
      //     <Route path="add-user" element={<AddUser />} />
      //     <Route path="update-user/:id" element={<UpdateUser />} />
      //     <Route path="view-user/:id" element={<ViewUser />} />

      //     <Route path="fees-list" element={<FeesList />} />
      //     <Route path="add-fees" element={<AddFees />} />
      //     <Route path="update-fees/:id" element={<UpdateFees />} />
      //     <Route path="view-fees/:id" element={<ViewFees />} />

      //     <Route path="payment-list" element={<PaymentList />} />
      //     <Route path="add-payment" element={<AddPayment />} />
      //     <Route path="update-payment/:id" element={<UpdatePayment />} />
      //     <Route path="view-payment/:id" element={<ViewPayment />} />

      //     <Route path="pins-list" element={<PinsList />} />
      //     <Route path="add-pin" element={<AddPin />} />
      //     <Route path="add-batch-pins" element={<AddBatchPins />} />
      //     <Route path="update-pin/:id" element={<UpdatePin />} />
      //     <Route path="view-pin/:id" element={<ViewPin />} />

      //     <Route path="add-exam-record" element={<AddExamRecord />} />
      //     <Route path="result-checker" element={<ResultCheckerScreen />} />
      //     <Route path="exam-records" element={<ExamRecordList />} />

      //   </ProtectedRoute>
       
      // </Routes>
   
//   );
// };

// export default App;


// App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Authenticate />} />
//         <ProtectedRoute path="/dashboard/*">{/* Your protected content here */}</ProtectedRoute>
        
        
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import React, {useContext} from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import ProtectedRoute from './ProtectedRoute';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// // import { useAuth } from './AuthContext';
// import {  AuthContext, AuthProvider } from './AuthContext';

// const App = () => {
//   const  user  = useContext(AuthContext);
//   // const  user  = useAuth();
//   return (
//     <AuthProvider>
//     {user ? (
//       // If the user is logged in, show the App component
//       <Dashboard />
//     ) : (
//       // If the user is not logged in, show the SignIn and SignUp components
//       <>
//          {/* <Authenticate /> */}
//         {/* <Signup />  */}
        
//     <Router>
//       <Routes>

//            <Route path="/home" element={<Home />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Authenticate />} />
//           {/* <Route path="/dasboard" element={<Dashboard />} /> */}
//           <Route path="/dasboard" element={<Dashboard />} />

//         {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
       
//       </Routes>
//     </Router>
//       </>
//     )}
//   </AuthProvider>

// // App.js
// import React, {useContext} from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import ProtectedRoute from './ProtectedRoute';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// // import { useAuth } from './AuthContext';
// import { useAuth, AuthContext, AuthProvider } from './AuthContext';

// const App = () => {
//   const  user  = useContext(AuthContext);
//   // const  user  = useAuth();
//   return (
//     <AuthProvider>
//     {user ? (
//       // If the user is logged in, show the App component
//       <Dashboard />
//     ) : (
//       // If the user is not logged in, show the SignIn and SignUp components
//       <>
//         <Authenticate />
//         <Signup />
//       </>
//     )}
//   </AuthProvider>
    // <>
    // <Dashboard />
  
    
    // <Router>
    //   <Routes>

    //        <Route path="/home" element={<Home />} />
    //       <Route path="/signup" element={<Signup />} />
    //       <Route path="/login" element={<Authenticate />} />
    //       {/* <Route path="/dasboard" element={<Dashboard />} /> */}
    //       <Route path="/dasboard" element={<Dashboard />} />

    //     {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
       
    //   </Routes>
    // </Router>
    // </>
    
//   );
// };

// export default App;



// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authenticate from './Authenticate';
// import Signup from './Signup';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import { AuthProvider, AuthContext } from './AuthContext';

// const App = () => {
//   const user = useContext(AuthContext);

//   return (
//     <Router>
//       <AuthProvider>
//         {user ? (
//           // If the user is logged in, show the Dashboard component
//           <Dashboard />
//         ) : (
//           // If the user is not logged in, show the SignIn and SignUp components
//           <>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Authenticate />} />
//               <Route path="/signup" element={<Signup />} />
//             </Routes>
//           </>
//         )}
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;


// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './AuthContext';
// import Home from './Home';
// // import Signup from './Signup';
// // import Authenticate from './Authenticate';
// import Dashboard from './Dashboard';
// // import UserProfile from './user/UserProfile';



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
// import Signup from './Signup';
// import Authenticate from './Authenticate';
// import PinsList from './pin/PinsList';
// import AddPin from './pin/AddPin';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';
// import AddExamRecord from './exams/AddExamRecord ';
// import PrivateRoute from './PrivateRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Authenticate />} />

//           {/* Private route - Dashboard */}
//           <Route path="/dashboard/*" element={<Dashboard />} />


//                                 {/* <Route path="/" element={<PrivateRoute />}>
//                                         <Route path="/*" element={<Dashboard />} />
//                                         <Route path="/" element={<UserProfile />} />
//                                         <Route path="/posts" element={<PostList />} />
//                                         <Route path="/add-post" element={<AddPost />} />
//                                         <Route path="/edit-post/:id" element={<UpdatePost />} />
//                                         <Route path="/view-post/:id" element={<ViewPost />} />

//                                         <Route path="/users" element={<UserList />} />
//                                         <Route path="/add-user" element={<AddUser />} />
//                                         <Route path="/edit-user/:id" element={<UpdateUser />} />
//                                         <Route path="/view-user/:id" element={<ViewUser />} />

//                                         <Route path="/Fees" element={<FeesList />} />
//                                         <Route path="/add-Fee" element={<AddFees />} />
//                                         <Route path="/edit-Fee/:id" element={<UpdateFees />} />
//                                         <Route path="/view-Fee/:id" element={<ViewFees />} />


//                                         <Route path="/payment" element={<PaymentList />} />
//                                         <Route path="/add-payment" element={<AddPayment />} />
//                                         <Route path="/edit-payment/:id" element={<UpdatePayment />} />
//                                         <Route path="/view-payment/:id" element={<ViewPayment />} />


//                                         <Route path="/pins-list" element={<PinsList />} />
//                                         <Route path="/create-pin" element={<AddPin />} />
//                                         <Route path="/create-batch-pin" element={<AddBatchPins />} />
//                                         <Route path="/edit-pin/:id" element={<UpdatePin />} />
//                                         <Route path="/view-pin/:id" element={<ViewPin />} />

//                                         <Route path='add-exam-record' element={<AddExamRecord />} />

//                                     </Route>
//            */}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
// import { AuthProvider } from './AuthContext';
// import Home from './Home';
// import Signup from './Signup';
// import Authenticate from './Authenticate';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public routes */}
          // <Route path="/" element={<Home />} />
          // <Route path="/signup" element={<Signup />} />
          // <Route path="/login" element={<Authenticate />} />

//           {/* Private route - Dashboard */}
//           <Route path="/dashboard" element={<PrivateRoute />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import Signup from './Signup';
// import Home from './Home';
// import Authenticate from './Authenticate';
// import { AuthProvider, useAuth } from './AuthContext';



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

// const App = () => {
//   return (
//       <Router>
       
    

//           <Routes>
//                 <Route path="/" element={<Home />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/login" element={<Authenticate />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
                                    
//       </Router> 

//   );
// };

// // const PrivateRoute = () => {
// //   const { authState } = useAuth();

// //   return authState.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />;
// // };

// export default App;

// // App.js

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import Signup from './Signup';
// import Authenticate from './Authenticate';
// import { AuthProvider, useAuth } from './AuthContext';


// const App = () => {
//   const { authState, signup, setAuthStatus } = useAuth();
//   const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'

//   // const { authState, signup } = useAuth();

//   // const { isAuthenticated } = authState;
//   // const { authState, signup, setAuthStatus } = useAuth();

//   // const [isAuthenticated, setIsAuthenticated, ] = useState(false);

//   // const setAuthStatus = (status) => {
//   //   setIsAuthenticated(status);
//   // };


 
//     // State to manage form data
//     const [signupData, setSignupData] = useState({
//       username: '', 
//       lastName: '',
//       email: '',
//       phone: '',
//       password: '',
//       roles: '', 
//     });
  
//     // Handler for form input changes
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setSignupData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     };
  
//     // Handler for form submission
//     // const handleSignup = async (e) => {
//     //   e.preventDefault();
//     //   try {
//     //     // Call your signup function passing signupData
//     //   await signup(signupData);

//     //   // Optionally, you can redirect or perform other actions after successful signup
//     //   setAuthStatus(true);

       
//     //   } catch (error) {
//     //     // Handle signup error
//     //     console.error(error);
//     //   }
//     // };
    

    
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await signup(signupData);
//       setAuthStatus(true);
      
//       // Redirect to the dashboard after successful signup
//       navigate('/dashboard');
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <AuthProvider>
//       <body data-spy="scroll" data-target="#pb-navbar" data-offset="200">
//         <Router>
//       {/* <div className="container"> */}
//       <Routes>
//           {/* Public routes */}
//           <Route
//             path="/signup"
//             element={<Signup setAuthStatus={setAuthStatus} />}
//           />
//           <Route
//             path="/login"
//             element={<Authenticate setAuthStatus={setAuthStatus} />}
//           />

//           {/* Private route - Dashboard */}
//           <Route
//             path="/dashboard"
//             element={authState.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
//           />
//         </Routes>
        
//         {/* Bootstrap Navigation Bar */}
//         <nav className="navbar navbar-expand-lg navbar-light bg-primary pb_navbar pb_scrolled-light">


//       <div className="container">
//         {/* <div className="navbar-brand"> */}
//         <Link to="/" className="navbar-brand">
//         <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:20,}}/>
//         </Link>
//         {/* </div> */}
//         <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#probootstrap-navbar" aria-controls="probootstrap-navbar" aria-expanded="false" aria-label="Toggle navigation">
//           <span><i className="ion-navicon"></i></span>
//         </button>
//         <div className="collapse navbar-collapse" id="probootstrap-navbar">
//           <ul className="navbar-nav ml-auto">
             
//              <li className="nav-item cta-btn"> 
//               <Link to="/login" className="nav-link ">              
//                 <span className="pb_rounded-4 px-4">Login</span>
//               </Link>
//             </li>
            
//             <li className="nav-item cta-btn "> 
//               <Link to="/signup" className="nav-link">              
//                 <span className="pb_rounded-4 px-4">SignUp</span>
//               </Link>
//             </li>
//             <li className="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0"> 
//             {authState.isAuthenticated && (
//                 <li className="nav-item">
//                   <Link to="/dashboard" className="nav-link">
//                   <span className="pb_rounded-4 px-4">Dashboard</span>
//                   </Link>
//                 </li>
//               )}
              
//             </li>
           

//           </ul>
          
//         </div>
//       </div>
//     </nav>


//     <section className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb_slant-light" id="section-home" style={{marginBottom:23}}>
//         {/* Placeholder content for the home section */}
//         <div className="container">
//           <div className="row align-items-center justify-content-center">
//             <div className="col-md-6">
//               <h2 className="heading mb-3">Welcome to Floral School</h2>
//               <div className="sub-heading">
//                 <p className="mb-4">Where Your Knowledge Blossoms Like Beautiful Flowers. Join Us Today!</p>
//                 <p className="mb-5"><Link to="/signup" className="btn btn-success btn-lg pb_btn-pill smoothscroll"><span className="pb_font-14 text-uppercase pb_letter-spacing-1">Get Started</span></Link></p>
//               </div>
//             </div>
//             <div className="col-md-1">
//           </div>
//             <div className="col-md-5 relative align-self-center mb-5">
//             <form onSubmit={handleSignup} className="bg-white rounded pb_form_v1 mb-5 mb-4 mt-0">
//               <h2 className="mb-4 mt-0 text-center"></h2>
//               <div className="form-group mb-4 mt-0">
//                 <input type="text"
//                  name="username"
//                  value={signupData.username}
//                  onChange={handleChange}
//                  className="form-control pb_height-50 reverse "
//                   placeholder="First name/ user name" />
//               </div>
//               <div className="form-group">
//                 <input type="text"
//                  name="lastName"
//                  value={signupData.lastName}
//                  onChange={handleChange}
//                  className="form-control pb_height-50 reverse"
//                   placeholder="Last name" />
//               </div>
//               <div className="form-group">
//                 <input type="text" 
//                  name="email"
//                  value={signupData.email}
//                  onChange={handleChange}
//                 className="form-control pb_height-50 reverse" 
//                 placeholder="Email" />
//               </div>
//               <div className="form-group">
//                 <input type="text" 
//                   name="phone"
//                   value={signupData.phone}
//                   onChange={handleChange}
//                 className="form-control pb_height-50 reverse" 
//                 placeholder="Phone" />
//               </div>
//               <div className="form-group">
//                 <div className="pb_select-wrap">
//                   <select
//                     name="roles"
//                     value={signupData.roles}
//                     onChange={handleChange}
//                     className="form-control pb_height-50 reverse"
//                     required
//                   >
//               <option value="" disabled>
//                 Select Role
//               </option>
//               <option value="ROLE_ADMIN">Admin</option>
//               <option value="ROLE_USER">User</option>
//               <option value="ROLE_STAFF">Staff</option>
//             </select>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <input type="submit" className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue" value="Register" />
//               </div>
//             </form>
           
//           </div>
//           </div>
//         </div>
//       </section>
//     {/* <> */}
//       {/* Section 1 */}
//       <section className="pb_section bg-light pb_slant-white pb_pb-250" id="section-features">
//         <div className="container">
//           <div className="row justify-content-center mb-5">
//             <div className="col-md-6 text-center mb-5">
//               <h5 className="text-uppercase pb_font-15 mb-2 pb_color-dark-opacity-3 pb_letter-spacing-2"><strong>Features</strong></h5>
//               <h2>App Features</h2>
//             </div>
//           </div>
//           <div className="row">
//             {/* Feature 1 */}
//             <div className="col-lg-4 col-md col-sm-6">
//               <div className="media d-block pb_feature-v1 text-left">
//                 <div className="pb_icon"><i className="ion-ios-bookmarks-outline pb_icon-gradient"></i></div>
//                 <div className="media-body">
//                   <h5 className="mt-0 mb-3 heading">Minimal Design</h5>
//                   <p className="text-sans-serif">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
//                 </div>
//               </div>
//             </div>

//             {/* Feature 2 */}
//             <div className="col-lg-4 col-md col-sm-6">
//               <div className="media d-block pb_feature-v1 text-left">
//                 <div className="pb_icon"><i className="ion-ios-speedometer-outline pb_icon-gradient"></i></div>
//                 <div className="media-body">
//                   <h5 className="mt-0 mb-3 heading">Fast Loading</h5>
//                   <p className="text-sans-serif">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
//                 </div>
//               </div>
//             </div>

//             {/* Feature 3 */}
//             <div className="col-lg-4 col-md col-sm-6">
//               <div className="media d-block pb_feature-v1 text-left">
//                 <div className="pb_icon"><i className="ion-ios-infinite-outline pb_icon-gradient"></i></div>
//                 <div className="media-body">
//                   <h5 className="mt-0 mb-3 heading">Unlimited Possibilities</h5>
//                   <p className="text-sans-serif">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
//                 </div>
//               </div>
//             </div>

//             {/* Feature 4 */}
//             <div className="col-lg-4 col-md col-sm-6">
//               <div className="media d-block pb_feature-v1 text-left">
//                 <div className="pb_icon"><i className="ion-ios-color-filter-outline pb_icon-gradient"></i></div>
//                 <div className="media-body">
//                   <h5 className="mt-0 mb-3 heading">Component Based Design</h5>
//                   <p className="text-sans-serif">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
//                 </div>
//               </div>
//             </div>

//             {/* Feature 5 */}
//             <div className="col-lg-4 col-md col-sm-6">
//               <div className="media d-block pb_feature-v1 text-left">
//                 <div className="pb_icon"><i className="ion-ios-wineglass-outline pb_icon-gradient"></i></div>
//                 <div className="media-body">
//                   <h5 className="mt-0 mb-3 heading">Clean Code</h5>
//                   <p className="text-sans-serif">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
//                 </div>
//               </div>
//             </div>

//             {/* Feature 6 */}
//             <div className="col-lg-4 col-md col-sm-6">
//               <div className="media d-block pb_feature-v1 text-left">
//                 <div className="pb_icon"><i className="ion-ios-paperplane-outline pb_icon-gradient"></i></div>
//                 <div className="media-body">
//                   <h5 className="mt-0 mb-3 heading">Lightweight</h5>
//                   <p className="text-sans-serif">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* END section 1 */}

//       {/* Section 2 */}
//       <section className="pb_section pb_slant-light">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-4 mb-5">
//               <img src="assets/images/phone_3.png" alt="Image placeholder" className="img-fluid" />
//             </div>
//             <div className="col-lg-8 pl-md-5 pl-sm-0">
//               <div className="row">
//                 <div className="col">
//                   <h2>Application Features</h2>
//                   <p className="pb_font-20">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-lg">
//                   {/* Feature 1 */}
//                   <div className="media pb_feature-v2 text-left mb-1 mt-5">
//                     <div className="pb_icon d-flex mr-3 align-self-start pb_w-15"><i className="ion-ios-bookmarks-outline pb_icon-gradient"></i></div>
//                     <div className="media-body">
//                       <h3 className="mt-2 mb-2 heading">Minimal Design</h3>
//                       <p className="text-sans-serif pb_font-16">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
//                     </div>
//                   </div>

//                   {/* Feature 2 */}
//                   <div className="media pb_feature-v2 text-left mb-1 mt-5">
//                     <div className="pb_icon d-flex mr-3 align-self-start pb_w-15"><i className="ion-ios-infinite-outline pb_icon-gradient"></i></div>
//                     <div className="media-body">
//                       <h3 className="mt-2 mb-2 heading">Unlimited Posibilities</h3>
//                       <p className="text-sans-serif pb_font-16">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg">
//                   {/* Feature 3 */}
//                   <div className="media pb_feature-v2 text-left mb-1 mt-5">
//                     <div className="pb_icon d-flex mr-3 align-self-start pb_w-15"><i className="ion-ios-speedometer-outline pb_icon-gradient"></i></div>
//                     <div className="media-body">
//                       <h3 className="mt-2 mb-2 heading">Fast Loading</h3>
//                       <p className="text-sans-serif pb_font-16">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
//                     </div>
//                   </div>

//                   {/* Feature 4 */}
//                   <div className="media pb_feature-v2 text-left mb-1 mt-5">
//                     <div className="pb_icon d-flex mr-3 align-self-start pb_w-15"><i className="ion-ios-color-filter-outline  pb_icon-gradient"></i></div>
//                     <div className="media-body">
//                       <h3 className="mt-2 mb-2 heading">Component Based Design</h3>
//                       <p className="text-sans-serif pb_font-16">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* END section 2 */}

//       <footer className="pb_footer bg-primary" role="contentinfo">
//         <div className="container">
//           <div className="row text-center">
//             <div className="col">
//               <ul className="list-inline">
//                 <li className="list-inline-item"><Link to="#" className="p-2"><i className="fa fa-facebook"></i></Link></li>
//                 <li className="list-inline-item"><Link to="#" className="p-2"><i className="fa fa-twitter"></i></Link></li>
//                 <li className="list-inline-item"><Link to="#" className="p-2"><i className="fa fa-linkedin"></i></Link></li>
//               </ul>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col text-center">
//               {/* Placeholder content for the footer */}
//               <p className="pb_font-14">© 2023. Floral School. All Rights Reserved. <br />  <Link to="https://floralschool.com/">Visit our Floral School Website</Link></p>
//               <p className="pb_font-14">Floral School Socials: <Link to="/" target="_blank" rel="nofollow" className='text-light'>Floral School.</Link></p>
//             </div>
//           </div>
//         </div>
//       </footer>

    
    
//     {/* </> */}

     
//       {/* </div> */}
//       </Router>
//       </body>
//     </AuthProvider>
//   );
// };

// export default App;


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

// import UserProfile from './user/UserProfile';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import ExamRecordList from './exams/ExamRecordList';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';

// // import PrivateRoute from './PrivateRoute';
// import { AuthProvider,useAuth    } from './AuthContext';
// import PinGenerator from './pin/AddPin';
// // import { AuthProvider } from './AuthContext';
// import authReducer from './authReducer';

// function App() {
//      const { user } = useAuth();

  
//     const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//     const toggleTopbar = () => {
//       if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
//         setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
//       } else {
//         setStyle("navbar-nav bg-gradient-primary sidebar sidebarDark accordion")
//       }
//     };
  
//     const [isSidebarToggled, setSidebarToggled] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
//     // const [isSidebarToggled2, setSidebarToggled2] = useState(false);

//     const toggleSidebar = () => {
//         setSidebarToggled(!isSidebarToggled);
//     };
    
//     const sidebarClass = isSidebarToggled
//         ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//         : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";

//         // if (loading) {
//         //     // You can add a loading indicator here if needed
//         //     return <div>Loading...</div>;
//         //   }
//     return (

//             <div>
//             <body id="page-top">
//                 <div id="wrapper">
//                     <Sidebar style={sidebarClass} toggleSidebar={toggleSidebar} />

//                     <div id="content-wrapper" className="d-flex flex-column">
//                         <div id="content">
                            
//                             <Topbar toggleTopbar={toggleTopbar} />

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
                                        
//                                         <Routes>
//                                           <Route path="/" element={<Home />} />
//                                           <Route path="/signup" element={<Signup />} />
//                                           <Route path="/login" element={<Authenticate />} />
//                                       </Routes>   
                                                                      
//                                     <Routes>
//                                         <Route path="/dashboard" element={<UserProfile />} />
//                                         <Route path="/posts" element={<PostList />} />
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
//                                         <Route path="/pin-generator" element={<PinGenerator />} />
//                                         <Route path="/create-batch-pin" element={<AddBatchPins />} />
//                                         <Route path="/edit-pin/:id" element={<UpdatePin />} />
//                                         <Route path="/view-pin/:id" element={<ViewPin />} />
//                                     </Routes>

//                                     <Routes>
//                                         <Route path='/add-exam-record' element={<AddExamRecord />} />
//                                         <Route path='/exam-records' element={<ExamRecordList />} />
//                                         <Route path='/result-checker' element={<ResultCheckerScreen />} />
//                                     </Routes>

//             <div>

//             </div>

                                    



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
//             </div>

//     );
// }

// export default App;


// App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';
// import Home from './Home';
// // import Signup from './Signup';
// // import Authenticate from './Authenticate';
// // import UserProfile from './UserProfile';
// import ProtectedRoute from './ProtectedRoute';

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
// import Signup from './Signup';
// import Authenticate from './Authenticate';
// import PinsList from './pin/PinsList';
// import AddPin from './pin/AddPin';
// import AddBatchPins from './pin/AddBatchPins';
// import UpdatePin from './pin/UpdatePin';
// import ViewPin from './pin/ViewPin';
// import AddExamRecord from './exams/AddExamRecord ';
// // import PrivateRoute from './PrivateRoute';
// import ResultCheckerScreen from './result-checker/ResultCheckerScreen';
// import ExamRecordList from './exams/ExamRecordList';
// import PinGenerator from './pin/AddPin';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// const App = () => {
//     return (

    //     <Provider store={store}>
    //     <AuthProvider>
    //       <Router>
    //         <Routes>
    //           <Route path="/login" element={<Authenticate />} />
    //           <Route path="/signup" element={<SignUp />} />

    //           <PrivateRoute path="/dashboard" element={<UserProfile />} />
    //         <PrivateRoute path="/posts" element={<PostList />} />
    //         {/* Add other protected routes as needed */}
    //       </Routes>
    //     </Router>
    //   </AuthProvider>
    // </Provider>
  
  //     <Provider store={store}>
  //       <Router>
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/signup" element={<Signup />} />
  //           <Route path="/login" element={<Authenticate />} />
  //           <ProtectedRoute path="/dashboard" element={<UserProfile />} />
  //           <ProtectedRoute path="/posts" element={<PostList />} />
  //           <ProtectedRoute path="/add-post" element={<AddPost />} />
  //           <ProtectedRoute path="/edit-post/:id" element={<UpdatePost />} />
  //           <ProtectedRoute path="/view-post/:id" element={<ViewPost />} />
  //           <ProtectedRoute path="/users" element={<UserList />} />
  //           <ProtectedRoute path="/add-user" element={<AddUser />} />
  //           <ProtectedRoute path="/edit-user/:id" element={<UpdateUser />} />
  //           <ProtectedRoute path="/view-user/:id" element={<ViewUser />} />
  //           <ProtectedRoute path="/fees" element={<FeesList />} />
  //           <ProtectedRoute path="/add-fee" element={<AddFees />} />
  //           <ProtectedRoute path="/edit-fee/:id" element={<UpdateFees />} />
  //           <ProtectedRoute path="/view-fee/:id" element={<ViewFees />} />
  //           <ProtectedRoute path="/payment" element={<PaymentList />} />
  //           <ProtectedRoute path="/add-payment" element={<AddPayment />} />
  //           <ProtectedRoute path="/edit-payment/:id" element={<UpdatePayment />} />
  //           <ProtectedRoute path="/view-payment/:id" element={<ViewPayment />} />
  //           <ProtectedRoute path="/pins-list" element={<PinsList />} />
  //           <ProtectedRoute path="/pin-generator" element={<PinGenerator />} />
  //           <ProtectedRoute path="/create-batch-pin" element={<AddBatchPins />} />
  //           <ProtectedRoute path="/edit-pin/:id" element={<UpdatePin />} />
  //           <ProtectedRoute path="/view-pin/:id" element={<ViewPin />} />
  //           <ProtectedRoute path='/add-exam-record' element={<AddExamRecord />} />
  //           <ProtectedRoute path='/exam-records' element={<ExamRecordList />} />
  //           <ProtectedRoute path='/result-checker' element={<ResultCheckerScreen />} />
  //         </Routes>
  //       </Router>
  //     </Provider>
  //   );
  // };
  
  // export default App;