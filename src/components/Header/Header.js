
import React, { useContext } from 'react';
import './Header.css';
import { ThemeContext } from '../../ThemeContext';
import MaterialUISwitch from '../MaterialUISwitch';

const Header = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <div className="logo">
        <img src="/favicon.ico" alt="Logo" />
        <h1>Let's Chat</h1>
      </div>
      <MaterialUISwitch
        onChange={toggleTheme}
        checked={mode === 'dark'}
        sx={{ m: 1 }}
      />
    </header>
  );
};

export default Header;
