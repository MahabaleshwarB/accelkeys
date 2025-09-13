import axiosInstance from '../api/axios';

const login = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {email, password});
    return response.data.token;
}

const register = async (userName, email, password) => {
    const response = await axiosInstance.post('/auth/register', {userName, email, password});
    return response.data.token;
}

const AuthService = {
  login,
  register,
};

export default AuthService;