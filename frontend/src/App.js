import './App.css';
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './Dashbord';
import Navbar from './components/Navbar';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (username) => {
    setAuthenticated(true);
    setUsername(username); // Set the username after successful login
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUsername(''); // Clear the username on logout
  };

  return (
    <div className="App">
      {authenticated ? (
        <>
          <Navbar username={username} onLogout={handleLogout} />
          <Dashboard onLogout={handleLogout} />
        </>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
