
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
// import {  useAuth } from './AuthContext';


const Home = () => {
  // const { authState,  } = useAuth();

  return (
   
      <body data-spy="scroll" data-target="#pb-navbar" data-offset="200">
      
     
        {/* Bootstrap Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-primary pb_navbar pb_scrolled-light">


      <div className="container">
        {/* <div className="navbar-brand"> */}
        <Link to="/" className="navbar-brand">
        <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:20,}}/>
        </Link>
        {/* </div> */}
        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#probootstrap-navbar" aria-controls="probootstrap-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span><i className="ion-navicon"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="probootstrap-navbar">
          <ul className="navbar-nav ml-auto">
             
             <li className="nav-item cta-btn"> 
              <Link to="/login" className="nav-link ">              
                <span className="pb_rounded-4 px-4">Login</span>
              </Link>
            </li>
            
            <li className="nav-item cta-btn "> 
              <Link to="/signup" className="nav-link">              
                <span className="pb_rounded-4 px-4">SignUp</span>
              </Link>
            </li>
            <li className="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0"> 
            {/* {authState.isAuthenticated && (
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                  <span className="pb_rounded-4 px-4">Dashboard</span>
                  </Link>
                </li>
              )} */}
              
            </li>
           

          </ul>
          
        </div>
      </div>
    </nav>


    <section className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb_slant-light" id="section-home" style={{marginBottom:23}}>
        {/* Placeholder content for the home section */}
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
              <h2 className="heading mb-3">Welcome to Floral School</h2>
              <div className="sub-heading">
                <p className="mb-4">Where Your Knowledge Blossoms Like Beautiful Flowers. Join Us Today!</p>
                <p className="mb-5"><Link to="/signup" className="btn btn-success btn-lg pb_btn-pill smoothscroll"><span className="pb_font-14 text-uppercase pb_letter-spacing-1">Get Started</span></Link></p>
              </div>
            </div>
            <div className="col-md-1">
          </div>
            <div className="col-md-5 relative align-self-center mb-5">
           
              {/* <div className="bg-white rounded pb_form_v1 mb-5 mb-4 mt-0"> */}
              <div className="form-group mb-4 mt-0" style={{marginTop:20}}>
              <img className="sidebar-card-illustration mb-2" src="img/logo.jpg" alt="..." style={{width:400, height:300}}/>

              </div>
              {/* </div> */}
           
          </div>
          </div>
        </div>
      </section>
    {/* <> */}
      {/* Section 1 */}
<section className="pb_section bg-light pb_slant-white pb_pb-250" id="section-features">
  <div className="container">
    <div className="row justify-content-center mb-5">
      <div className="col-md-6 text-center mb-5">
        <h5 className="text-uppercase pb_font-15 mb-2 pb_color-dark-opacity-3 pb_letter-spacing-2">
          <strong>Efficient Features</strong>
        </h5>
        <h2>Discover the Power of Floral School App</h2>
      </div>
    </div>
    {/* Feature Cards */}
    <div className="row">
      {/* Feature 1: Student Records */}
      <div className="col-lg-4 col-md col-sm-6">
        <div className="media d-block pb_feature-v1 text-left">
          <div className="pb_icon">
            <i className="ion-ios-bookmarks-outline pb_icon-gradient"></i>
          </div>
          <div className="media-body">
            <h5 className="mt-0 mb-3 heading">Efficient Student Records</h5>
            <p className="text-sans-serif">
              Seamlessly manage and organize student records with our user-friendly interface. Keep track of academic performance, attendance, and personal details effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 2: Payment System */}
      <div className="col-lg-4 col-md col-sm-6">
        <div className="media d-block pb_feature-v1 text-left">
          <div className="pb_icon">
            <i className="ion-ios-speedometer-outline pb_icon-gradient"></i>
          </div>
          <div className="media-body">
            <h5 className="mt-0 mb-3 heading">Integrated Payment System</h5>
            <p className="text-sans-serif">
              Simplify financial transactions with our secure payment system. Parents can conveniently make payments for tuition, fees, and other expenses directly through the app.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 3: Result Management */}
      <div className="col-lg-4 col-md col-sm-6">
        <div className="media d-block pb_feature-v1 text-left">
          <div className="pb_icon">
            <i className="ion-ios-infinite-outline pb_icon-gradient"></i>
          </div>
          <div className="media-body">
            <h5 className="mt-0 mb-3 heading">Effortless Result Management</h5>
            <p className="text-sans-serif">
              Revolutionize result processing with our automated system. Easily generate, analyze, and share student results, ensuring accuracy and timely communication with stakeholders.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 4: Communication Hub */}
      <div className="col-lg-4 col-md col-sm-6">
        <div className="media d-block pb_feature-v1 text-left">
          <div className="pb_icon">
            <i className="ion-ios-color-filter-outline pb_icon-gradient"></i>
          </div>
          <div className="media-body">
            <h5 className="mt-0 mb-3 heading">Centralized Communication Hub</h5>
            <p className="text-sans-serif">
              Foster effective communication among students, parents, and faculty through our centralized hub. Receive important announcements, notifications, and updates instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 5: User-Friendly Interface */}
      <div className="col-lg-4 col-md col-sm-6">
        <div className="media d-block pb_feature-v1 text-left">
          <div className="pb_icon">
            <i className="ion-ios-wineglass-outline pb_icon-gradient"></i>
          </div>
          <div className="media-body">
            <h5 className="mt-0 mb-3 heading">User-Friendly Interface</h5>
            <p className="text-sans-serif">
              Experience ease of use with our intuitive interface. Navigate through the app effortlessly, enhancing user experience for students, parents, and administrators.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 6: Mobile Accessibility */}
      <div className="col-lg-4 col-md col-sm-6">
        <div className="media d-block pb_feature-v1 text-left">
          <div className="pb_icon">
            <i className="ion-ios-paperplane-outline pb_icon-gradient"></i>
          </div>
          <div className="media-body">
            <h5 className="mt-0 mb-3 heading">Mobile Accessibility</h5>
            <p className="text-sans-serif">
              Stay connected on the go. Access the Floral School app anytime, anywhere, ensuring seamless communication and management from your mobile device.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* END section 1 */}

      {/* Section 2 */}
      <section className="pb_section pb_slant-light">
  <div className="container">
    <div className="row">
      <div className="col-lg-4 mb-5">
        <img src="assets/images/phone_3.png" alt="Image placeholder" className="img-fluid" />
      </div>
      <div className="col-lg-8 pl-md-5 pl-sm-0">
        <div className="row">
          <div className="col">
            <h2>Discover the Power of Floral School App</h2>
            <p className="pb_font-20">
              Experience a transformative education journey with the Floral School mobile app. Our application is designed to provide a seamless and enriching experience for students, parents, and educators.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg">
            {/* Feature 1: Minimal Design */}
            <div className="media pb_feature-v2 text-left mb-1 mt-5">
              <div className="pb_icon d-flex mr-3 align-self-start pb_w-15">
                <i className="ion-ios-bookmarks-outline pb_icon-gradient"></i>
              </div>
              <div className="media-body">
                <h3 className="mt-2 mb-2 heading">Minimal Design</h3>
                <p className="text-sans-serif pb_font-16">
                  Immerse yourself in a clean and intuitive interface that prioritizes simplicity. Our minimal design ensures a focused and distraction-free learning environment.
                </p>
              </div>
            </div>

            {/* Feature 2: Unlimited Possibilities */}
            <div className="media pb_feature-v2 text-left mb-1 mt-5">
              <div className="pb_icon d-flex mr-3 align-self-start pb_w-15">
                <i className="ion-ios-infinite-outline pb_icon-gradient"></i>
              </div>
              <div className="media-body">
                <h3 className="mt-2 mb-2 heading">Unlimited Possibilities</h3>
                <p className="text-sans-serif pb_font-16">
                  Explore a world of educational opportunities with limitless possibilities. The Floral School app opens doors to a wide range of learning resources and interactive features.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg">
            {/* Feature 3: Fast Loading */}
            <div className="media pb_feature-v2 text-left mb-1 mt-5">
              <div className="pb_icon d-flex mr-3 align-self-start pb_w-15">
                <i className="ion-ios-speedometer-outline pb_icon-gradient"></i>
              </div>
              <div className="media-body">
                <h3 className="mt-2 mb-2 heading">Fast Loading</h3>
                <p className="text-sans-serif pb_font-16">
                  Save time and stay productive with our fast-loading application. Access information, courses, and features instantly, ensuring a smooth learning experience.
                </p>
              </div>
            </div>

            {/* Feature 4: Component-Based Design */}
            <div className="media pb_feature-v2 text-left mb-1 mt-5">
              <div className="pb_icon d-flex mr-3 align-self-start pb_w-15">
                <i className="ion-ios-color-filter-outline  pb_icon-gradient"></i>
              </div>
              <div className="media-body">
                <h3 className="mt-2 mb-2 heading">Component-Based Design</h3>
                <p className="text-sans-serif pb_font-16">
                  Benefit from a modular and scalable architecture with our component-based design. This approach ensures flexibility and adaptability as the app evolves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* END section 2 */}

      <footer className="pb_footer bg-primary" role="contentinfo">
        <div className="container">
          <div className="row text-center">
            <div className="col">
              <ul className="list-inline">
                <li className="list-inline-item"><Link to="#" className="p-2"><i className="fa fa-facebook"></i></Link></li>
                <li className="list-inline-item"><Link to="#" className="p-2"><i className="fa fa-twitter"></i></Link></li>
                <li className="list-inline-item"><Link to="#" className="p-2"><i className="fa fa-linkedin"></i></Link></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              {/* Placeholder content for the footer */}
              <p className="pb_font-14">© 2023. Floral School. All Rights Reserved. <br />  <Link to="https://floralschool.com/">Visit our Floral School Website</Link></p>
              <p className="pb_font-14">Floral School Socials: <Link to="/" target="_blank" rel="nofollow" className='text-light'>Floral School.</Link></p>
            </div>
          </div>
        </div>
      </footer>

    
    
    {/* </> */}

     
      {/* </div> */}
    
      </body>
 
  );
};

export default Home;


