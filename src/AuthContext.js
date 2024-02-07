// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create a context to manage authentication state
// export const AuthContext = createContext();

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Check if the user is already logged in (e.g., using a token stored in localStorage)
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Function to handle user login
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   // Function to handle user logout
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   // Custom hook to provide authentication-related functions
//   const useAuth = () => {
//     return { user, login, logout };
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, useAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// Custom hook to use the AuthContext easily in functional components
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context.useAuth();
// };


// // AuthContext.js
// import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/users/';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);



//   const login = async (username, password) => {
//     try {
//       const response = await axios.post(`${API_URL}/authenticate`, { username, password });
//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('login', token);
//       setUser(response);

//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       return false;
//     }
//   };

  // const signUp = async (userData) => {
  //   try {
  //     const response = await axios.post(`${API_URL}/signup`, userData);
  //     const { token } = response.data;
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('signup', token);

  //     setUser(userData);
  //     return true;
  //   } catch (error) {
  //     console.error('Signup failed:', error.response ? error.response.data : error.message);
  //     return false;
  //   }

  // };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);

//   };

//   const getAuthToken = () => {
//     return localStorage.getItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signUp, logout, getAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth };



// AuthContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { authReducer } from './authReducer'; // Import your authReducer
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: { user: storedUser } });
    }
  }, []);



  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/authenticate', {
        username,
        password,
      });

      console.log('response token:',response.data.token);
      const { token, ...userData } = response.data;
      console.log('response:',response);
      console.log('usr id::',response.data.id);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      console.log('user ID:',userData.id);
  
      // Fetch the details of the logged-in user
      const userDetailsResponse = await axios.get(`http://localhost:8080/api/users/viewUser/${userData.id}`);
      const userDetails = userDetailsResponse.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userDetails));
  
      dispatch({ type: 'LOGIN', payload: { user: userDetails } });
      return true;

      // dispatch({ type: 'LOGIN', payload: { user: userData } });
      // return true;
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      return false;
    }
  };


  const signUp = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', userData);
      const newUser = response.data;
      localStorage.setItem('user', JSON.stringify(newUser));
      dispatch({ type: 'SIGN_UP', payload: { user: newUser } });

      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      console.error('Response data:', error.response ? error.response.data : null);
      console.error('Status code:', error.response ? error.response.status : null);
      // Handle signup error if needed
    }
  };
  



// const signUp = async (userData) => {
//   try {
//     const response = await axios.post('http://localhost:8080/api/users/signup', userData);
//     const newUser = response.data;

//     // Fetch the details of the newly created user
//     const userDetailsResponse = await axios.get(`http://localhost:8080/api/users/viewUser/${newUser.id}`);
//     const userDetails = userDetailsResponse.data;

//     localStorage.setItem('user', JSON.stringify(newUser));

//     dispatch({ type: 'SET_USER', payload: { user: userDetails } });
//     dispatch({ type: 'SIGN_UP', payload: { user: newUser } });
//     return true;
//   } catch (error) {
//     console.error('Signup failed:', error);
//     console.error('Response data:', error.response ? error.response.data : null);
//     console.error('Status code:', error.response ? error.response.status : null);
//     // Handle signup error if needed
//   }
// };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const setUser = (userData) => {
    dispatch({ type: 'SET_USER', payload: { user: userData } });
  };


    const getRole = () => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    return state.user?.roles || (storedUserData ? storedUserData.roles : null);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signUp, logout, setUser, getRole }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };



// import React, { createContext, useReducer, useContext } from 'react';
// import { authReducer } from './authReducer'; // Import your authReducer
// import axios from 'axios';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null,
//     isAuthenticated: false,
//   });

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/authenticate', {
//         username,
//         password,
//       });

//       const { token, ...userData } = response.data;

//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));

//       dispatch({ type: 'LOGIN', payload: { user: userData } });
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       return false;
//     }
//   };


  

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   const setUser = (userData) => {
//     dispatch({ type: 'SET_USER', payload: { user: userData } });
//   };

//   return (
//     <AuthContext.Provider value={{ ...state, login, logout, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export { AuthProvider, useAuth };



// import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const initialState = {
//     user: null,
//     isAuthenticated: false,
//   };

//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   if (storedUser) {
  //     dispatch({ type: 'SET_USER', payload: { user: storedUser } });
  //   }
  // }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/authenticate', {
//         username,
//         password,
//       });

//       const { token, ...userData } = response.data;

//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);

//       dispatch({ type: 'LOGIN', payload: { user: userData } });
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       return false;
//     }
//   };

  // const signUp = async (userData) => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/api/users/signup', userData);

  //     const newUser = response.data;

  //     localStorage.setItem('user', JSON.stringify(newUser));
  //     setUser(newUser);

  //     dispatch({ type: 'SIGN_UP', payload: { user: newUser } });
  //   } catch (error) {
  //     console.error('Signup failed', error);
  //     // Handle signup error if needed
  //   }
  // };

//   const logout = () => {
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   const getAuthToken = () => {
//     return state.user ? state.user.token : null;
//   };

  // const getRole = () => {
  //   const storedUserData = JSON.parse(localStorage.getItem('user'));
  //   return state.user?.role || (storedUserData ? storedUserData.role : null);
  // };

//   const isAuth = state.isAuthenticated;

//   const authContextValue = {
//     login,
//     signUp,
//     logout,
//     getAuthToken,
//     getRole,
//     isAuth,
//     dispatch,
//   };

//   return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
// };



// import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const initialState = {
//     user: null,
//     isAuthenticated: false,
//   };

//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       dispatch({ type: 'SET_USER', payload: { user: storedUser } });
//     }
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/authenticate', {
//         username,
//         password,
//       });

//       const { token, ...userData } = response.data;

//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);

//       dispatch({ type: 'LOGIN', payload: { user: userData } });
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       return false;
//     }
//   };

//   const signUp = async (userData) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/signup', userData);

//       const newUser = response.data;

//       localStorage.setItem('user', JSON.stringify(newUser));
//       setUser(newUser);

//       dispatch({ type: 'SIGN_UP', payload: { user: newUser } });
//     } catch (error) {
//       console.error('Signup failed', error);
//       // Handle signup error if needed
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   const getAuthToken = () => {
//     return state.user ? state.user.token : null;
//   };

//   const getRole = () => {
//     const storedUserData = JSON.parse(localStorage.getItem('user'));
//     return state.user?.role || (storedUserData ? storedUserData.role : null);
//   };

//   const isAuth = state.isAuthenticated;

//   // Expose individual functions directly from the context
//   const authContextValue = {
//     login,
//     signUp,
//     logout,
//     getAuthToken,
//     getRole,
//     isAuth,
//     dispatch,
//   };

//   return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
// };


// import React, { createContext, useContext, useReducer, useState } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   const initialState = {
//     user: storedUser || null,
//     isAuthenticated: Boolean(storedUser),
//   };

//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const [user, setUser] = useState(storedUser || null);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/authenticate', {
//         username,
//         password,
//       });

//       const { token, ...userData } = response.data;

//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);

//       dispatch({ type: 'LOGIN', payload: { user: userData } });
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       return false;
//     }
//   };

//   const signUp = async (userData) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/signup', userData);

//       const newUser = response.data;

//       localStorage.setItem('user', JSON.stringify(newUser));
//       setUser(newUser);

//       dispatch({ type: 'SIGN_UP', payload: { user: newUser } });
//     } catch (error) {
//       console.error('Signup failed', error);
//       // Handle signup error if needed
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   const getAuthToken = () => {
//     return state.user ? state.user.token : null;
//   };

//   const getRole = () => {
//     const storedUserData = JSON.parse(localStorage.getItem('user'));
//     return state.user?.role || (storedUserData ? storedUserData.role : null);
//   };

//   const value = {
//     user: state.user,
//     isAuthenticated: state.isAuthenticated,
//     login,
//     signUp,
//     logout,
//     getAuthToken,
//     getRole,
//     dispatch, // Add dispatch to the context value
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


// import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const initialState = {
//     user: null,
//     isAuthenticated: false,
//   };

//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       dispatch({ type: 'SET_USER', payload: { user: storedUser } });
//     }
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/authenticate', {
//         username,
//         password,
//       });

//       const { token, ...userData } = response.data;

//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);

//       dispatch({ type: 'LOGIN', payload: { user: userData } });
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       return false;
//     }
//   };

//   const signUp = async (userData) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/signup', userData);

//       const newUser = response.data;

//       localStorage.setItem('user', JSON.stringify(newUser));

//       setUser(newUser);
//       dispatch({ type: 'SIGN_UP', payload: { user: newUser } });
//     } catch (error) {
//       console.error('Signup failed', error);
//       // Handle signup error if needed
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   const getAuthToken = () => {
//     return state.user ? state.user.token : null;
//   };

//   const getRole = () => {
//     const storedUserData = JSON.parse(localStorage.getItem('user'));
//     return state.user?.role || (storedUserData ? storedUserData.role : null);
//   };

//   const value = {
//     user: state.user,
//     isAuthenticated: state.isAuthenticated,
//     login,
//     signUp,
//     logout,
//     getAuthToken,
//     getRole,
//     dispatch, // Add dispatch to the context value
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };




// import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const initialState = {
//     user: null,
//     isAuthenticated: false,
//   };

//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const [user, setUser ] = useState(null);
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       dispatch({ type: 'SET_USER', payload: { user: storedUser } });
//     }
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/authenticate', {
//         username,
//         password,
//       });

//       const { token } = response.data;
//       localStorage.setItem('token', token);
//        // Assuming the response contains a token or user data
//        const userData = response.data;

//        console.log(userData);
//        // Save user data to local storage
//        localStorage.setItem('user', JSON.stringify(userData));
 
//        setUser(userData);
//       // console.log(userData);
//       // const users = localStorage.setItem('users', JSON.stringify(userData));
//       // const user = localStorage.setItem('users', userData);;
//       // console.log(users);
//       // console.log(user);
//       dispatch({ type: 'LOGIN', payload: { user: userData } });
//       console.log(userData);
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       return false;
//     }
//   };


//   const signUp = async (userData) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/signup', userData);

//       // Assuming the response contains user data or confirmation
//       const newUser = response.data;

//       // Save user data to local storage
//       localStorage.setItem('user', JSON.stringify(newUser));

//       // Optionally, you can automatically log in the user after signing up
//       setUser(newUser);
//       dispatch({ type: 'SIGN_UP', payload: { user: newUser } });

//     } catch (error) {
//       console.error('Signup failed', error);
//       // Handle signup error if needed
//     }
//   };
//   const logout = () => {
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   const getAuthToken = () => {
//     return state.user ? state.user.token : null;
//   };

//   const getRole = () => {
//     const storedUserData = JSON.parse(localStorage.getItem('user'));
//     return state.user?.role || (storedUserData ? storedUserData.role : null);
//   };

//   const value = {
//     user: state.user,
//     isAuthenticated: state.isAuthenticated,
//     login: login,
//     signUp:signUp,
//     logout: logout,
//     getAuthToken: getAuthToken,
//     getRole: getRole,
//     dispatch: dispatch, // Add dispatch to the context value
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


// import React, { createContext, useContext, useEffect, useReducer } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const initialState = {
//     user: null,
//     isAuthenticated: false,
//   };

//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       dispatch({ type: 'SET_USER', payload: { user: storedUser } });
//     }
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/authenticate', {
//         username,
//         password,
//       });

//       const userData = response.data;
//       localStorage.setItem('user', JSON.stringify(userData));
//       dispatch({ type: 'LOGIN', payload: { user: userData } });
//       console.log(userData);
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   const getAuthToken = () => {
//     return state.user ? state.user.token : null;
//   };

//   const getRole = () => {
//     const storedUserData = JSON.parse(localStorage.getItem('user'));
//     return state.user?.role || (storedUserData ? storedUserData.role : null);
//   };

//   const value = {
//     user: state.user,
//     isAuthenticated: state.isAuthenticated,
//     login,
//     logout,
//     getAuthToken,
//     getRole,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Check local storage for user data during component initialization
//   // This ensures that user data is persisted across page reloads
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   // const login = async (username, password) => {
//   //   try {
//   //     const response = await axios.post('http://localhost:8080/api/users/authenticate', {
//   //       username,
//   //       password
//   //     });

//   //     // Assuming the response contains a token or user data
//   //     const userData = response.data;

//   //     // Save user data to local storage
//   //     localStorage.setItem('user', JSON.stringify(userData));

//   //     setUser(userData);

//   //   } catch (error) {
//   //     console.error('Login failed', error);
//   //     // Handle login error if needed
//   //   }
//   // };


//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/authenticate', { username, password });
      // const { token } = response.data;
      // localStorage.setItem('token', token);
      //  // Assuming the response contains a token or user data
      //  const userData = response.data;

      //  console.log(userData);
      //  // Save user data to local storage
      //  localStorage.setItem('user', JSON.stringify(userData));
 
      //  setUser(userData);
//         console.log(user);
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       return false;
//     }
//   };
  

  // const signUp = async (userData) => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/api/users/signup', userData);

  //     // Assuming the response contains user data or confirmation
  //     const newUser = response.data;

  //     // Save user data to local storage
  //     localStorage.setItem('user', JSON.stringify(newUser));

  //     // Optionally, you can automatically log in the user after signing up
  //     setUser(newUser);

  //   } catch (error) {
  //     console.error('Signup failed', error);
  //     // Handle signup error if needed
  //   }
  // };

//   const logout = () => {
//     // Remove user data from local storage
//     localStorage.removeItem('user');
//     // Implement your logout logic here
//     setUser(null);
//   };

//   const getAuthToken = () => {
//     // Assuming the authentication token is stored in the user data
//     return user ? user.token : null;
//   };

//   const getRole = () => {
//     // Retrieve the user's role from the stored user data or local storage
//     const storedUserData = JSON.parse(localStorage.getItem('user'));
//     return user?.role || (storedUserData ? storedUserData.role : null);
//   };

//   const value = {
//     user,
//     login,
//     signUp,
//     logout,
//     getAuthToken,
//     getRole,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


// // AuthService.js
// import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';

// // const API_URL = 'http://localhost:8080/api/users/';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

// const API_URL = 'http://localhost:8080/api/users';

// const login = async (username, password) => {
//   try {
//     const response = await axios.post('http://localhost:8080/api/users/authenticate', { username, password });
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     return true;
//   } catch (error) {
//     console.error('Login failed:', error.response ? error.response.data : error.message);
//     return false;
//   }
// };


// const signUp = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/signup`, userData);
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     localStorage.setItem('signup', token);

//     setUser(userData);
//     return true;
//   } catch (error) {
//     console.error('Signup failed:', error.response ? error.response.data : error.message);
//     return false;
//   }

// };


// const logout = () => {
//   localStorage.removeItem('token');
// };

// const getAuthToken = () => {
//   return localStorage.getItem('token');
// };


// return (
//   <AuthContext.Provider value={{ user, login, signUp, logout, getAuthToken }}>
//     {children}
//   </AuthContext.Provider>
// );
// };


// export { AuthContext, AuthProvider };



// authService.js
// import axios from 'axios';
// import { login, signup  } from './authSlice';

// const API_BASE_URL = 'http://localhost:8080/api/users';

// // export const signup = async (userData) => {
// //   // Implement signup logic and API call
// // };


// export const signupAsync = async (userData, dispatch) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/signup`, userData);
//     const { token } = response.data;
//     dispatch(signup(token));
//     // Save the token to local storage for persistence
//     localStorage.setItem('token', token);
//     return true;
//   } catch (error) {
//     console.error('Signup failed', error);
//     return false;
//   }
// };

// export const loginAsync = async (credentials, dispatch) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/authenticate`, credentials);
//     const { token } = response.data;
//     dispatch(login(token));
//     // Save the token to local storage for persistence
//     localStorage.setItem('token', token);
//     return true;
//   } catch (error) {
//     console.error('Login failed', error);
//     return false;
//   }
// };

// export const logout = (dispatch) => {
//   // Implement logout logic and remove token from local storage
//   dispatch(logout());
//   localStorage.removeItem('token');
// };


// AuthContext.js
// import { createContext, useContext, useReducer } from 'react';
// import axios from 'axios';
// import { login, signup  } from './authSlice';

// // Define initial state
// const initialState = {
//   user: null,
//   token: null,
//   error: null,
// };

// // Define actions
// export const actionTypes = {
//   SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
//   LOGIN_SUCCESS: 'LOGIN_SUCCESS',
//   LOGOUT: 'LOGOUT',
//   SET_ERROR: 'SET_ERROR',
// };

// // Create AuthContext
// export const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



// const API_BASE_URL = 'http://localhost:8080/api/users';

// // export const signup = async (userData) => {
// //   // Implement signup logic and API call
// // };


// export const signupAsync = async (userData, dispatch) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/signup`, userData);
//     const { token } = response.data;
//     dispatch(signup(token));
//     // Save the token to local storage for persistence
//     localStorage.setItem('token', token);
//     return true;
//   } catch (error) {
//     console.error('Signup failed', error);
//     return false;
//   }
// };

// export const loginAsync = async (credentials, dispatch) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/authenticate`, credentials);
//     const { token } = response.data;
//     dispatch(login(token));
//     // Save the token to local storage for persistence
//     localStorage.setItem('token', token);
//     return true;
//   } catch (error) {
//     console.error('Login failed', error);
//     return false;
//   }
// };

// export const logout = (dispatch) => {
//   // Implement logout logic and remove token from local storage
//   dispatch(logout());
//   localStorage.removeItem('token');
// };

// // AuthProvider component
// export const AuthProvider = ({ children, reducer, initialState }) => (
//   <AuthContext.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </AuthContext.Provider>
// );




// // AuthContext.js
// import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer'; // Update the path accordingly

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const baseUrl = 'http://localhost:8080/api/users';

//   const [authState, dispatch] = useReducer(authReducer, {
//     isAuthenticated: false,
//     user: {
//       username: '',
//       lastName: '',
//       phone: '',
//       email: '',
//       roles: [],
//       token: '',
//     },
//   });

// const [user, setUser] = useState('');
//   const fetchUserData = async (token) => {
//     try {
//       const response = await axios.get(`${baseUrl}/currentUser`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const user = {
//         ...response.data,
//         token, // Include the token in the user object
//       };
//       const result= localStorage.setItem('token', token, "user", user);
//       setUser(result);
//       console.log(user);
//       dispatch({ type: 'LOGIN', payload: { user } });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       // Handle error as needed
//     }
//   };

//   // const fetchUserData = async (token) => {
//   //   try {
//   //     // Fetch user profile data using the token
      // const response = await fetch('http://localhost:8080/api/users/currentUser', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   redirect: 'follow', // Follow redirects
      // });
  
//   //     if (response.ok) {
//   //       const userProfileData = await response.json();
//   //       setUserProfile(userProfileData);
//   //     } else {
//   //       console.error('Error fetching user profile:', response.statusText);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching user profile:', error);
//   //   }
//   // };
  

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const result= localStorage.setItem('token', token);
//     setUser(result);
//     if (token) {
//       // Fetch user details when token is present
//       fetchUserData(token);
//     }
//   }, []);

//   const setAuthStatus = (isAuthenticated, user) => {
//     if (isAuthenticated) {
//       const result= localStorage.setItem('token', user.token);
//       setUser(result);
//       dispatch({ type: 'LOGIN', payload: { user } });
//     } else {
//       localStorage.removeItem('token');
//       dispatch({ type: 'LOGOUT' });
//     }
//   };

//   // const fetchUserData = async (token) => {
//   //   try {
//   //     const response = await axios.get(`${baseUrl}/currentUser`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });

//   //     const user = {
//   //       ...response.data,
//   //       token, // Include the token in the user object
//   //     };

//   //     dispatch({ type: 'LOGIN', payload: { user } });
//   //   } catch (error) {
//   //     console.error('Error fetching user data:', error);
//   //     // Handle error as needed
//   //   }
//   // };

//   const signup = async (userData) => {
//     try {
//       const response = await axios.post(`${baseUrl}/signup`, userData);
//       const token = response.data;
//       fetchUserData(token);
//     } catch (error) {
//       console.error('Signup failed:', error);
//       throw error; // Handle error as needed
//     }
//   };


//   const login = async (userData) => {
//     try {
//       const response = await axios.post(`${baseUrl}/authenticate`, userData);
//       const token = response.data;

//       if (token) {
//         localStorage.setItem('token', token);
//         const result= localStorage.setItem('token', token);
//          setUser(result);
//         console.log(`Storage Token: ${token}`);

//         // Fetch user data after saving the token
//         fetchUserData(token);
//       } else {
//         console.log('Token not received in the response');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error; // Handle error as needed
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post(`${baseUrl}/logout`);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       setAuthStatus(false, null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ authState, setAuthStatus, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = React.useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer'; // Update the path accordingly

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const baseUrl = 'http://localhost:8080/api/users';

//   const [authState, dispatch] = useReducer(authReducer, {
//     isAuthenticated: false,
//     token: null,
//     user: null, // Add the user object to the state
//   });

  
//   const fetchUserData = async (token) => {
//     try {
//       const response = await axios.get(`${baseUrl}/currentUser`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const user = {
//         ...response.data,
//         token, // Include the token in the user object
//       };

//       dispatch({ type: 'LOGIN', payload: { user } });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       // Handle error as needed
//     }
//   };

//   const login = async (userData) => {
//     // const { fetchUserData } = useAuth(); // Access fetchUserData from the context
//     try {
//       const response = await axios.post(`${baseUrl}/authenticate`, userData);
//       const token = response.data;
  
//       if (token) {
//         window.localStorage.setItem('@token', token);
//         console.log(`Storage Token: ${token}`);
  
//         // Fetch user data after saving the token
//         fetchUserData(token);
//       } else {
//         console.log('Token not received in the response');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error; // Handle error as needed
//     }
//   };
  

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // You may want to fetch user details here based on the token
//       // For simplicity, let's assume you have an endpoint to get user details
//       axios.get(`${baseUrl}/currentUser`)
//         .then(response => {
//           const user = response.data;
//           dispatch({ type: 'LOGIN', payload: { token, user } });
//         })
//         .catch(error => {
//           console.error('Error fetching user details:', error);
//         });
//     }
//   }, []);

//   const setAuthStatus = (isAuthenticated, token, user) => {
//     if (isAuthenticated) {
//       localStorage.setItem('token', token);
//       dispatch({ type: 'LOGIN', payload: { token, user } });
//     } else {
//       localStorage.removeItem('token');
//       dispatch({ type: 'LOGOUT' });
//     }
//   };

//   const signup = async (userData) => {
//     try {
//       const response = await axios.post(`${baseUrl}/signup`, userData);
//       const token = response.data;
//       localStorage.setItem('token', token);
//       console.log(`Storage Token: ${token}`);
//       console.log(`Storage state: ${authState}`);
//       console.log(`Storage userData: ${userData}`);

//       // You may want to fetch user details here based on the token


//         setAuthStatus(true, token, response);
//         localStorage.setItem('token', token);
//         console.log(`Storage Token: ${token}`);
//         console.log(`Storage state: ${authState}`);
    
//     } catch (error) {
//       console.error('Signup failed:', error);
//       throw error; // Handle error as needed
//     }
//   };


  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Fetch user details when token is present
//       fetchUserData(token);
//     }
//   }, []);


//   const logout = async () => {
//     try {
//       await axios.post(`${baseUrl}/logout`);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       setAuthStatus(false, null, null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ authState, setAuthStatus, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// // AuthProvider.js
// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer'; // Update the path accordingly

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const baseUrl = 'http://localhost:8080/api/users';

//   const [authState, dispatch] = useReducer(authReducer, {
//     isAuthenticated: false,
//     token: null,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       dispatch({ type: 'LOGIN', payload: { token } });
//     }
//   }, []);

//   const setAuthStatus = (isAuthenticated, token) => {
//     if (isAuthenticated) {
//       localStorage.setItem('token', token);
//       dispatch({ type: 'LOGIN', payload: { token } });
//     } else {
//       localStorage.removeItem('token');
//       dispatch({ type: 'LOGOUT' });
//     }
//   };

//   const signup = async (userData) => {
//     try {
//       const response = await axios.post(`${baseUrl}/signup`, userData);
//       const token = response.data;
//       setAuthStatus(true, token);
//     } catch (error) {
//       console.error('Signup failed:', error);
//       throw error; // Handle error as needed
//     }
//   };

  // const login = async (userData) => {
  //   try {
  //     const response = await axios.post(`${baseUrl}/authenticate`, userData);
  //     const token = response.data;
  //     setAuthStatus(true, token);
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     throw error; // Handle error as needed
  //   }
  // };

//   const logout = async () => {
//     try {
//       await axios.post(`${baseUrl}/logout`);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       setAuthStatus(false, null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ authState, setAuthStatus, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };


// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//  const baseUrl='http://localhost:8080/api/users'


//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     token: null,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setAuthState({
//         isAuthenticated: true,
//         token,
//       });
//     }
//   }, []);

//   const setAuthStatus = (isAuthenticated, token) => {
//     if (isAuthenticated) {
//       localStorage.setItem('token', token);
//     } else {
//       localStorage.removeItem('token');
//     }

//     setAuthState({
//       isAuthenticated,
//       token,
//     });
//   };

//   const signup = async (userData) => {
//     try {
//       const response = await axios.post('/signup', userData);
//       const token = response.data;
//       setAuthStatus(true, token);
//     } catch (error) {
//       console.error('Signup failed:', error);
//       throw error; // Handle error as needed
//     }
//   };

//   const login = async (userData) => {
//     try {
//       const response = await axios.post('/authenticate', userData);
//       const token = response.data;
//       setAuthStatus(true, token);
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error; // Handle error as needed
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post('http://localhost:8080/api/users/logout');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       setAuthStatus(false, null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ authState, setAuthStatus, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // AuthContext.js

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children, baseUrl }) => {
//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     token: null,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setAuthState({
//         isAuthenticated: true,
//         token,
//       });
//     }
//   }, []);

//   const setAuthStatus = (isAuthenticated, token) => {
//     if (isAuthenticated) {
//       localStorage.setItem('token', token);
//     } else {
//       localStorage.removeItem('token');
//     }

//     setAuthState({
//       isAuthenticated,
//       token,
//     });
//   };

//   const makeUrl = (endpoint) => `${baseUrl}${endpoint}`;

//   const signup = async (userData) => {
//     try {
//       const response = await axios.post(makeUrl('/api/users/signup'), userData);
//       const token = response.data;
//       setAuthStatus(true, token);
//     } catch (error) {
//       console.error('Signup failed:', error);
//       throw error; // Handle error as needed
//     }
//   };

//   const login = async (userData) => {
//     try {
//       const response = await axios.post(makeUrl('/api/users/authenticate'), userData);
//       const token = response.data;
//       setAuthStatus(true, token);
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error; // Handle error as needed
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post(makeUrl('/api/users/logout'));
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       setAuthStatus(false, null);
//     }
//   };

//   const contextValue = {
//     authState,
//     setAuthStatus,
//     signup,
//     login,
//     logout,
//     baseUrl, // Include baseUrl in the context
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     token: null,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setAuthState({
//         isAuthenticated: true,
//         token,
//       });
//     }
//   }, []);

//   const setAuthStatus = (isAuthenticated, token) => {
//     if (isAuthenticated) {
//       localStorage.setItem('token', token);
//     } else {
//       localStorage.removeItem('token');
//     }

//     setAuthState({
//       isAuthenticated,
//       token,
//     });
//   };

//   return (
//     <AuthContext.Provider value={{ authState, setAuthStatus }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
