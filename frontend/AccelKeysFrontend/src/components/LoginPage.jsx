import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const LoginPage = () => {
  

  const navigate = useNavigate();

    const [form, setForm] = useState({ 
        email: '',
        password: '',
    });
    const [error, setError] =  useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value 
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
  
        try {
            const token = await AuthService.login(form.email, form.password);
            localStorage.setItem('token', token);
            setTimeout(() => {navigate('/dashboardpage', {replace: true})}, 1500);
        }
        catch(err){
          console.log(err);
            setError(err.response?.data?.message || "Login failed, Please try with proper credentials");
        };
    }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Login to AccelKeys</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
        <p className="text-center mt-3">
          Don't have an account?{' '}
          <button type="button" className="btn btn-link p-0" onClick={() => navigate("/registerpage")}>
            Register here
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;