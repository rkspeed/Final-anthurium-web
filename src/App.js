// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import BottomNav from './BottomNav';
import './App.css';
import Search from './Capture'; 
import Gallery from './Gallery';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
