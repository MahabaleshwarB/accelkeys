import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const DashBoardPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getCurrentUser()
      .then((data) => {
        if (data) {
          setUserEmail(data.email || `User #${data.id}`);
        } else {
          setUserEmail('Guest');
        }
        setLoading(false);
      })
      .catch(() => {
        setUserEmail('Guest');
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear auth token
    navigate('/loginpage'); // Redirect to login
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar"
        style={{
          background: '#1e3a8a',
          padding: '12px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Brand + Lessons link */}
          <div className="d-flex align-items-center">
            <Link
              className="navbar-brand text-white"
              to="/dashboardpage"
              style={{ fontWeight: '700', fontSize: '1.8rem', letterSpacing: '1px', marginRight: '20px' }}
            >
              AccelKeys
            </Link>
            <Link
              to="/LessonsPage"
              className="nav-link text-white"
              style={{ fontWeight: '500', transition: 'color 0.2s' }}
            >
              Lessons
            </Link>
          </div>

          {/* Hamburger menu */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
              onClick={() => setHamburgerOpen(!hamburgerOpen)}
            >
              <span style={{ width: '25px', height: '3px', background: 'white', borderRadius: '2px' }} />
              <span style={{ width: '25px', height: '3px', background: 'white', borderRadius: '2px' }} />
              <span style={{ width: '25px', height: '3px', background: 'white', borderRadius: '2px' }} />
            </div>

            {/* Dropdown */}
            {hamburgerOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '35px',
                  right: '0',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  minWidth: '120px',
                  zIndex: 1000,
                }}
              >
                <div
                  onClick={handleLogout}
                  style={{
                    padding: '10px 16px',
                    cursor: 'pointer',
                    color: '#1e3a8a',
                    fontWeight: '500',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  {localStorage.getItem('token') ? 'Logout' : 'Login'}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
          color: '#1e3a8a',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', fontWeight: '600' }}>
              Welcome, {userEmail}!
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#333' }}>
              Ready to improve your typing skills?
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '32px', color: '#555', maxWidth: '600px' }}>
              This project was developed to implement and demonstrate JWT authentication on the backend, enabling secure user login functionality.
            </p>
            <Link
              to="/LessonsPage"
              className="btn"
              style={{
                background: '#1e3a8a',
                color: 'white',
                padding: '14px 40px',
                fontSize: '1.2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              Go to Lessons
            </Link>
          </>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: '12px 0',
          textAlign: 'center',
          background: '#1e3a8a',
          color: 'white',
          marginTop: 'auto',
        }}
      >
        © {new Date().getFullYear()} All rights reserved. Made by Mahabaleshwar
      </footer>
    </>
  );
};

export default DashBoardPage;
