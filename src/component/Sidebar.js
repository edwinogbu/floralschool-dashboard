import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ style, toggleSidebar }) {
    return (
        <ul className={style} id="accordionSidebar" style={{ backgroundColor: '#000' }}> {/* Apply the background color here */}

            {/* Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div className="sidebar-brand-icon rotate-n-15">
                    {/* <i className="fas fa-laugh-wink"></i> */}
                    <img className="sidebar-card-illustration mb-2" src="./../img/logo.jpg" alt="..." style={{width:20,}}/>
                </div>
                <br />
                <div className="sidebar-brand-text mx-3">Administration</div>
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={toggleSidebar}></button>
            </div>
            </a>
               
            {/* Sidebar Toggler (Sidebar) */}

            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
                <Link to="/dashboard" className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span className='font-weight-bold'>DASHBOARD</span>
                </Link>
            </li>

            {/* Divider */}
            <hr className="sidebar-divider" />

          
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProfile" aria-expanded="true" aria-controls="collapseProfile">
                    <i className="fas fa-fw fa-user"></i>
                    <span className='font-weight-bold'>PROFILE</span>
                </a>
                <div id="collapseProfile" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Floral User:</h6>
                        <Link to="/dashboard/users-profile-list" className="collapse-item" >Manage Profile</Link>
                        <Link to="/dashboard/add-profile" className="collapse-item"  >Add Profile</Link>
                        <Link to="/dashboard/user-profile" className="collapse-item"  >My Profile</Link>
                    </div>
                </div>
            </li>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUser" aria-expanded="true" aria-controls="collapseUser">
                    <i className="fas fa-fw fa-user"></i>
                    <span className='font-weight-bold'>USERS</span>
                </a>
                <div id="collapseUser" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Floral User:</h6>
                        <Link to="/dashboard/users" className="collapse-item" >manage user</Link>
                        <Link to="/dashboard/add-user" className="collapse-item"  >Add user</Link>
                    </div>
                </div>
            </li>
          
           {/* Divider */}
           {/* <hr className="sidebar-divider" />
          
            <hr className="sidebar-divider" /> */}

          
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseFees"
                    aria-expanded="true" aria-controls="collapseFees">
                    <i className="fas fa-fw fa-user"></i>
                    <span className='font-weight-bold'>FEES MANAGEMENTS</span>
                </a>
                <div id="collapseFees" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Floral Fees:</h6>
                        <Link to="/dashboard/fees" className="collapse-item" >manage Fee</Link>
                        <Link to="/dashboard/add-fee" className="collapse-item"  >Add Fee</Link>
                    </div>
                </div>
            </li>
          
           {/* Divider */}
           <hr className="sidebar-divider" />


           
           {/* <hr className="sidebar-divider" /> */}

            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span className='font-weight-bold'>NEWS/EVENTS</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">School News Post:</h6>
                        <Link to="/dashboard/" className="collapse-item" >manage Post</Link>
                        <Link to="/dashboard/add-post" className="collapse-item"  >Add Post</Link>
                    </div>
                </div>
            </li>

            {/* Nav Item - Utilities Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-money"></i>
                    <span className='font-weight-bold'>PAYMENTS</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        {/* <Link to="/manage-payment" className="collapse-header">Manage Payment:</Link> */}
                        <Link to="/dashboard/payment" className="collapse-item" href="utilities-color.html">Manage Payment details</Link>
                        <Link to="/dashboard/add-payment" className="collapse-item" href="utilities-color.html">Add Payment details</Link>
                        <Link to="/dashboard/view-payment" className="collapse-item" href="utilities-border.html">View payment Paid</Link>
                    </div>
                </div>
            </li>
         

            {/* Divider */}
            <hr className="sidebar-divider" />
              {/* Nav Item - Utilities Collapse Menu */}
              <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePin" aria-expanded="true" aria-controls="collapsePin">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span className='font-weight-bold'>PIN GENERATION</span>
                </a>
                <div id="collapsePin" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded"> 
                        {/* <Link to="/manage-payment" className="collapse-header">Manage Payment:</Link> */}
                        <Link to="/dashboard/pins-list " className="collapse-item" href="utilities-color.html">Manage Pin Generation</Link>
                        <Link to="/dashboard/create-pin" className="collapse-item" href="utilities-color.html">Create Pin</Link>
                        <Link to="/dashboard/create-batch-pin" className="collapse-item" href="utilities-color.html">Batch Pin Generation</Link>
                    </div>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseCourseDetailList" aria-expanded="true" aria-controls="collapseCourseDetailList">
                    <i className="fas fa-fw fa-school"></i>
                    <span className='font-weight-bold'>MANAGE COURSE </span>
                </a>
                <div id="collapseCourseDetailList" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded"> 
                        <Link to="/dashboard/manage-course" className="collapse-item">Manage CourseDetail List:</Link>
                       
                    </div>
                </div>
            </li>
         
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseStudent" aria-expanded="true" aria-controls="collapseStudent">
                    <i className="fas fa-fw fa-user"></i>
                    <span className='font-weight-bold'>STUDENTS</span>
                </a>
                <div id="collapseStudent" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded"> 
                        <Link to="/dashboard/view-students" className="collapse-header">Manage Students:</Link>
                        <Link to="/dashboard/add-student" className="collapse-item">Add Student:</Link>
                        <Link to="/dashboard/view-students " className="collapse-item" >Manage Student Records </Link>
                        {/* <Link to="/add-exam-record " className="collapse-item" >Add-Exam-Records </Link> */}
                        {/* <Link to="/result-checker " className="collapse-item" >Result Checker</Link> */}
                        {/* <Link to="/create-pin" className="collapse-item" href="utilities-color.html">Create Pin Generation</Link> */}
                        {/* <Link to="/create-batch-pin" className="collapse-item" href="utilities-color.html">Batch Pin Generation</Link> */}
                    </div>
                </div>
            </li>
         
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseExam" aria-expanded="true" aria-controls="collapseExam">
                      <i className="fas fa-fw fa-chart-area"></i>
                    <span className='font-weight-bold'>EXAMS RECORDS</span>
                </a>
                <div id="collapseExam" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded"> 
                        <Link to="/dashboard/exam-records" className="collapse-header">Manage Exam-Records:</Link>
                        <Link to="/dashboard/exam-records" className="collapse-item">Manage Exam-Records:</Link>
                        <Link to="/dashboard/add-exam-record " className="collapse-item" >Add-Exam-Records </Link>
                        {/* <Link to="/result-checker " className="collapse-item" >Result Checker</Link> */}
                        {/* <Link to="/create-pin" className="collapse-item" href="utilities-color.html">Create Pin Generation</Link> */}
                        {/* <Link to="/create-batch-pin" className="collapse-item" href="utilities-color.html">Batch Pin Generation</Link> */}
                    </div>
                </div>
            </li>
{/*          
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseChecker"
                    aria-expanded="true" aria-controls="collapseChecker">
                      <i className="fas fa-fw fa-chart-area"></i>
                    <span className='font-weight-bold'>RESULT CHECKER</span>
                </a>
                <div id="collapseChecker" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded"> 
                        <Link to="/result-checker " className="collapse-item" >Result Checker</Link>
                    </div>
                </div>
            </li>
          */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseChecker"
                    aria-expanded="true" aria-controls="collapseChecker">
                      <i className="fas fa-fw fa-chart-area"></i>
                    <span className='font-weight-bold'>RESULT CHECKER</span>
                </a>
                <div id="collapseChecker" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded"> 
                        <Link to="/dashboard/result-sheet " className="collapse-item" >Result Sheet</Link>
                    </div>
                </div>
            </li>
         
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseNurseryChecker"
                    aria-expanded="true" aria-controls="collapseNurseryChecker">
                      <i className="fas fa-fw fa-chart-area"></i>
                    <span className='font-weight-bold'>NURSERY RESULT</span>
                </a>
                <div id="collapseNurseryChecker" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded"> 
                        <Link to="/dashboard/nursery " className="collapse-item" >Nursery Result Sheet</Link>
                    </div>
                </div>
            </li>
         

            {/* Heading */}
            <div className="sidebar-heading">
               Floral Schools
            </div>

            {/* Nav Item - Pages Collapse Menu */}
            {/* <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Expenses</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <a className="collapse-item" href="login.html">Add New Expense</a>
                        <a className="collapse-item" href="register.html">View Expenses</a>
                        <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                        <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Other Pages:</h6>
                        <a className="collapse-item" href="404.html">404 Page</a>
                        <a className="collapse-item" href="blank.html">Blank Page</a>
                    </div>
                </div>
            </li> */}

            {/* Nav Item - Charts */}
            {/* <li className="nav-item">
                <a className="nav-link" href="charts.html">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span>
                </a>
            </li> */}

          

            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={toggleSidebar}></button>
            </div>

            {/* Sidebar Message */}
            <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2" src="./../img/logo.jpg" alt="..." />
                <p className="text-center mb-2"><strong>Floral School Admin </strong> !</p>
            </div>

        </ul>
    );
}

export default Sidebar;
