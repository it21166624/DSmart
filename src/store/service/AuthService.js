import axios from 'axios';

// For Login Service-------------------------------------------
const login = async (username, password) => {
  const response = await axios.post(`Login/UserLogin?username=${username}&password=${password}`);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// For Logout Serivce
const logout = async() => {
  localStorage.removeItem('user');
  localStorage.removeItem('logedinkey');
  return;
}

const AuthService = {
  login,
  logout,
};

export default AuthService;
