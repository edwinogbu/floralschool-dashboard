// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

// const PrivateRoute = ({ element, ...rest }) => {
//   const { isAuthenticated } = useContext(AuthContext);

//   return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/authenticate" replace />
//   );
// };

// export default PrivateRoute;


import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, useAuth } from './AuthContext';

const PrivateRoute = ({ element }) => {
//   const isAuthenticated  = useContext(AuthContext);
  const { isAuthenticated, user, logout } = useAuth();

    console.log("auth state:", isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

// const PrivateRoute = ({ element, ...rest }) => {
//   const { isAuthenticated } = useContext(AuthContext);

//   return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;


// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom'; // Change Redirect to Navigate
// import { AuthContext } from './AuthContext';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const { isAuthenticated } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />}
//     />
//   );
// };

// export default PrivateRoute;


// // PrivateRoute.js

// import React, { useContext } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { AuthContext, useAuth } from './AuthContext';

// const PrivateRoute = ({ component: Component, ...rest }) => {
// //   const { isAuthenticated } = useAuth();
//   const {  isAuthenticated,  } = useContext(AuthContext);


//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// };

// export default PrivateRoute;
