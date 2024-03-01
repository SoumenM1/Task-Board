// Navbar.js
import React from 'react';

const Navbar = ({ username,onLogout }) => {
    const handleLogout = () => {
      onLogout();
    };
  
  return (
    <nav>
      <div>Welcome {username}</div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
