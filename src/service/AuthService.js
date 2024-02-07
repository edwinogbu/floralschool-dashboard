
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/authenticate`, { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return false;
  }
};

const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.error('Signup failed:', error.response ? error.response.data : error.message);
    return false;
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export { login, signup, logout, getAuthToken };


// // AuthService.js
// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/users';

// const login = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/authenticate`, { username, password });
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     return true;
//   } catch (error) {
//     console.error('Login failed:', error.response ? error.response.data : error.message);
//     return false;
//   }
// };

// const signup = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/signup`, userData);
//     const { token } = response.data;
//     localStorage.setItem('token', token);
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

// export { login, signup, logout, getAuthToken };

