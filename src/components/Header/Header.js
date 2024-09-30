
import React, { useContext } from 'react';
import './Header.css';
import { ThemeContext } from '../../ThemeContext';
import MaterialUISwitch from '../MaterialUISwitch';

const Header = ({ user, handleLogout }) => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <div className="logo">
        <img src="https://raw.githubusercontent.com/momin-sana/lets-chat/refs/heads/master/src/assets/img/logo.png" alt="Logo" />
        <h1>Let's Chat</h1>
      </div>
      <div className="header-controls">
        <MaterialUISwitch
          onChange={toggleTheme}
          checked={mode === 'dark'}
          sx={{ m: 1 }}
        />
        {user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
