// ProfileMenu.jsx
import React from 'react';
import LoginPage from './LoginPage';
import { Navigate, Link, replace, useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
const [showDropdown, setShowDropdown] = React.useState(false);
const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token') ? true : false);
const navigate = useNavigate();

const handleToggle = () => setShowDropdown((prev) => !prev);
const handleClose = () => setShowDropdown(false);

// Close dropdown when clicking outside
React.useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            !event.target.closest('.profile-menu-dropdown') &&
            !event.target.closest('.profile-menu-trigger')
        ) {
            setShowDropdown(false);
        }
    };
    if (showDropdown) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [showDropdown]);


const handleLogout = () => {
    //delete token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowDropdown(false); 
}   

const handleLogin = () => {
        setShowDropdown(false);
        navigate('/loginpage', { replace: true });
    };

return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Profile Image (Trigger Button) */}
        <img
            src="/path-to-profile.jpg"
            alt="Profile"
            className="rounded-circle me-2 profile-menu-trigger"
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            onClick={handleToggle}
        />

        {/* Dropdown Menu */}
        {showDropdown && (
            <div
                className="profile-menu-dropdown"
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '110%',
                    minWidth: '160px',
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                }}
            >
                <ul className="list-group" style={{ margin: 0 }}>
                    <li className="list-group-item" onClick={handleClose} style={{ cursor: 'pointer' }}>

                        Profile
                    </li>
                    <li className="list-group-item" onClick={handleClose} style={{ cursor: 'pointer' }}>
                        Settings
                    </li>
                    <li className="list-group-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                       {isLoggedIn ? (
                                <span onClick={handleLogout}>Logout</span>
                            ) : (
                                <span onClick={handleLogin}>Login</span>
                            )}
                        
                    </li>
                </ul>
            </div>
        )}
    </div>
);
};

export default ProfileMenu;
