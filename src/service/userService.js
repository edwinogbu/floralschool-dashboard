// userService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

export const fetchUserList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/viewAllUsers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user list', error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user', error);
    throw error;
  }
};

export const signupAsync = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    // Handle the response as needed (e.g., show a success message)
    return response.data;
  } catch (error) {
    console.error('Signup failed', error);
    throw error;
  }
};

export const loginAsync = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/authenticate`, credentials);
    // Handle the response as needed (e.g., store authentication token)
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};


// // userService.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api/users';

// export const fetchUserList = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/viewAllUsers`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user list', error);
//     throw error;
//   }
// };

// export const addUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/signup`, userData);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding user', error);
//     throw error;
//   }
// };


// export const signupAsync = async (userData) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/signup`, userData);
//       // Handle the response as needed (e.g., show a success message)
//       return response.data;
//     } catch (error) {
//       console.error('Signup failed', error);
//       throw error;
//     }
//   };

// Similarly, create services for editing, viewing, and other user-related operations
// ...

// postService.js
// Similar structure as userService.js for managing posts

// feeService.js
// Similar structure as userService.js for managing fees

// paymentService.js
// Similar structure as userService.js for managing payments

// pinService.js
// Similar structure as userService.js for managing pins

// examRecordService.js
// Similar structure as userService.js for managing exam records
