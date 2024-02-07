// AuthReducer.js

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};


// // authReducer.js
// import { actionTypes } from './AuthContext';

// // Define reducer function
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.SIGNUP_SUCCESS:
//     case actionTypes.LOGIN_SUCCESS:
//       return {
//         ...state,
//         user: action.payload.user,
//         token: action.payload.token,
//         error: null,
//       };
//     case actionTypes.LOGOUT:
//       return {
//         ...state,
//         user: null,
//         token: null,
//         error: null,
//       };
//     case actionTypes.SET_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;


// authReducer.js
// export const authReducer = (state, action) => {
//     switch (action.type) {
//       case 'LOGIN':
//         return {
//           ...state,
//           isAuthenticated: true,
//           user: { token: action.payload.token }, // Include the token in the user object
//         }; 

//       case 'SIGNUP':
//         return {
//           ...state,
//           isAuthenticated: true,
//           token: action.payload.token,
//         };
//         case 'LOGOUT':
//           return {
//             ...state,
//             isAuthenticated: false,
//             user: null, 
//             token: null,
//           };
//       default:
//         return state;
//     }
//   };
  