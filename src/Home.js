// src/Home.js
import React from 'react';
import Header from './Headers';
import Slider from './Slider';
import Card from './Card';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="content">
        <h2>சிறந்த வகைகள்</h2>
        <Slider />
        <h2>பிரபலமான தாவரங்கள்</h2>
        <div className="card-container">
          <Card title="தாவரம் 1" image="../2.jpg" />
          <Card title="தாவரம் 2" image="../3.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
