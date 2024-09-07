import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const navigate = useNavigate();

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="dropdown-wrapper">
      {/* Dropdown Menu */}
      <ul className="dropdown-menu">
        <li className="dropdown-item" onClick={() => handleNavigation('/profile')}>
          Your Profile
        </li>
        <li className="dropdown-item" onClick={() => handleNavigation('/recipebox')}>
          Your Recipes
        </li>
        <li className="dropdown-item" onClick={() => handleNavigation('/favoriterecipe')}>
          Favorite Recipes
        </li>
        <li className="dropdown-item" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
