
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; <span id="year">{new Date().getFullYear()}</span> Chat App by <a href="https://momin-sana.github.io/" target="_blank" rel="noopener noreferrer">Sana Momin</a>
      </p>
    </footer>
  );
};

export default Footer;
