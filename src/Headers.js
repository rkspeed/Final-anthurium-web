// src/Header.js
import React from 'react';
import { FaSearch, FaBell, FaClipboard, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="icon-nav">
        <Link to="/search">
          <FaSearch className="icon" />
          <span>ஆராய்ச்சி</span>
        </Link>
        <Link to="/">
          <FaBell className="icon" />
          <span>நினைவூட்டல்</span>
        </Link>
        <Link to="/">
          <FaClipboard className="icon" />
          <span>நோய்கல்</span>
        </Link>
        <Link to="/">
          <FaBook className="icon" />
          <span>நூல்</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
