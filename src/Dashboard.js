// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './Dashboard.css';
// import Sidebar from './layout/Sidebar';
// import Footer from './layout/Footer';
// import Topbar from './layout/Topbar';

// /**!SECTION
//  * Dashboard
//  * 
//  */

// import ProductList from './product/ProductList';
// import AddProduct from './product/AddProduct';
// import ViewProduct from './product/ViewProduct';
// import UpdateProduct from './product/UpdateProduct';


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
//     // const [isSidebarToggled2, setSidebarToggled2] = useState(false);

//     const toggleSidebar = () => {
//         setSidebarToggled(!isSidebarToggled);
//     };
    
//     const sidebarClass = isSidebarToggled
//         ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
//         : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";


//     return (
//         <Router>
//         <div>
//             <body id="page-top">
//                 <div id="wrapper">
//                     <Sidebar style={sidebarClass} toggleSidebar={toggleSidebar} />

//                     <div id="content-wrapper" className="d-flex flex-column">
//                         <div id="content">
//                            {/* nav here */}
//                            <Topbar toggleTopbar={toggleTopbar} />

//                             <div className="container-fluid">
//                                 <div className="d-sm-flex align-items-center justify-content-between mb-4">
//                                     <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">J Rexapp </h1>
//                                     {/* <h1 className="h2 mb-2 text-primary-800 m-0 font-weight-bold text-primary">The Floral International College</h1> */}
//                                     <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
//                                         <i className="fas fa-download fa-sm text-white-50"></i> 
//                                     </a>
//                                 </div>

//                                 <div className="row">
//                                     <div className="col-xl-11 col-lg-10 mx-5">
//                                         <div className="mb-4">
                                           
                                           
//                                     <Routes>
//                                         <Route path="/" element={<ProductList />} />
//                                         <Route path="/add-post" element={<AddProduct />} />
//                                         <Route path="/edit-post/:id" element={<UpdateProduct />} />
//                                         <Route path="/view-post/:id" element={<ViewProduct />} />

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
//         </div>
//         </Router>
//     );
// }

// export default App;



