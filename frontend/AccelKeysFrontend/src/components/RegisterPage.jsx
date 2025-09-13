import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const RegisterPage = () => {
  const navigate = useNavigate();

    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try{

          const token = await AuthService.register(form.username, form.email, form.password);
          setMessage('Registration successful! You can now login.');
          setTimeout(() => navigate('/loginpage'), 1500);
        }
        catch (err) {
          if (err.response && err.response.data) {
            console.error("Registration error:", err);
            setError(err.response.data.message || "Register Failed, Please try again");
          } else {
            console.log(err);
            setError("Register Failed, Please try again");
          }
        }
    }

  return (
    <>
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Register for AccelKeys</h2>
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
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

          <button type="submit" className="btn btn-success w-100" >Register</button>

          <p className="text-center mt-3">
            Already have an account?{' '}
            <button type="button" className="btn btn-link p-0" onClick={() => navigate("/loginpage")}>
              Login here
            </button>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;