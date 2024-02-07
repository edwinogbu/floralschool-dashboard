import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

function Topbar({ toggleSidebar }) {


    const { isAuthenticated, user, logout, getRole } = useAuth();
    const userRole = getRole();
  
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Topbar content */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={toggleSidebar}>
        <i className="fa fa-bars"></i>
      </button>

                               
        {/*  <!-- Topbar Search --> */}
        <form
            className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                    aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
        </form>

        {/*  <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">

            {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
            <li className="nav-item dropdown no-arrow d-sm-none">
                <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-search fa-fw"></i>
                </a>
                {/*   <!-- Dropdown - Messages --> */}
                <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown">
                    <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small"
                                placeholder="Search for..." aria-label="Search"
                                aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>

            {/*  <!-- Nav Item - Alerts --> */}
            <li className="nav-item dropdown no-arrow mx-1">
                {/* <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge badge-danger badge-counter">3+</span>
                </a>
               */}
            </li>

            {/*  <!-- Nav Item - Messages --> */}
            <li className="nav-item dropdown no-arrow mx-1">
                <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className="sidebar-card-illustration mb-2" src="./../img/logo.jpg" alt="..." style={{width:60,}}/>

                            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button">

                        {
                        isAuthenticated ? (
                            <button className='btn btn-outline-danger p-1 m-5' onClick={logout}>Sign Out</button>

                            ) : (
                                <p className="text-danger">Please log in to view the dashboard.</p>
                            )}
                        </a>
                </a>
                {/*   <!-- Dropdown - Messages --> */}
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="messagesDropdown">
                        
                    <h6 className="dropdown-header">
                        
                        {isAuthenticated ? (
                                        <>
                                    
                                            <p className="card-text">
                                                <strong>Username:
                                                    
                                                    </strong> {user.username} {user.lastName}
                                            </p>
                                            </>
                         ):(
                                 <p className="card-text">
                                                <strong>Kindly Login to dashboard</strong> 
                                            </p>
                         )}
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="./../img/undraw_profile_1.svg"
                                alt="..." />
                            <div className="status-indicator bg-success"></div>
                        </div>
                        <div className="font-weight-bold">
                           <button className='btn btn-l btn-close btn-danger' onClick={logout}>Sign Out</button>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="./../img/undraw_profile_2.svg"
                                alt="..." />
                            <div className="status-indicator"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Latest Posts</div>
                            {/* <div className="small text-gray-500">675</div> */}
                            <Link to="/dasboard/posts" className="small text-gray-500" />
                        </div>
                    </a>
                    {/* <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="./../img/undraw_profile_3.svg"
                                alt="..." />
                            <div className="status-indicator bg-warning"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Last month's report looks great, I am very happy with
                                the progress so far, keep up the good work!</div>
                            <div className="small text-gray-500">Admin · 2d</div>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                alt="..." />
                            <div className="status-indicator bg-success"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                told me that people say this to all dogs, even if they aren't good...</div>
                            <div className="small text-gray-500">Chicken the Dog · 2w</div>
                        </div>
                    </a> */}
                        <div className=" shadow animated--grow-in"
                            aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">
                               
                                {isAuthenticated ? (
                                        <>
                                    
                                            <p className="card-text text-lg">
                                                <strong>
                                                    {user.username} {user.lastName}
                                                </strong> 
                                            </p>
                                            </>
                         ):(
                                 <p className="card-text">
                                                <strong>Username:</strong> {user.username} {user.lastName}
                                            </p>
                         )}
                            
                            <Link to="/dashboard/user-profile" className="dropdown-item text-center small text-gray-500 dropdown-header "  >My Profile</Link>
                            
                            </h6>
                       </div>
                </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

           

        </ul>

    </nav>

  );
}

export default Topbar;
