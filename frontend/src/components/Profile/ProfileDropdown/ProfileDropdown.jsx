import React from 'react';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  return (
    <div className="dropdown-wrapper">
      {/* Dropdown Menu */}
      <ul className="dropdown-menu">
        <li className="dropdown-item">Your Profile</li>
        <li className="dropdown-item">Your Recipes</li>
        <li className="dropdown-item">Favorite Recipes</li>
        <li className="dropdown-item">Logout</li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
