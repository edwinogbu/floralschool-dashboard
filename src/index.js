import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
      <App />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import React, { useContext } from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Authenticate from './Authenticate'; // Import your SignIn component
// import Signup from './Signup'; // Import your SignUp component
// import reportWebVitals from './reportWebVitals';
// import {  AuthContext, AuthProvider } from './AuthContext';

// const Root = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <React.StrictMode>
      // <AuthProvider>
      //   {user ? (
      //     // If the user is logged in, show the App component
      //     <App />
      //   ) : (
      //     // If the user is not logged in, show the SignIn and SignUp components
      //     <>
      //       <Authenticate />
      //       <Signup />
      //     </>
      //   )}
      // </AuthProvider>
//     </React.StrictMode>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Root />);

// reportWebVitals();

