// src/BottomNav.js
import React from 'react';
import { FaHome, FaImage, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <Link to="/"><FaHome /><span>வீடு</span></Link>
      <Link to="/gallery"><FaImage /><span>கேலரி</span></Link>

    </nav>
  );
};

export default BottomNav;
