// src/Slider.js
import React from 'react';
import Slider from 'react-slick';
import './Slider.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="../3.jpg" alt="Serenity at the Beach" />
        <h3>Serenity at the Beach</h3>
      </div>
      <div>
        <img src="../4.jpg" alt="Calm Waters" />
        <h3>Calm Waters</h3>
      </div>
    </Slider>
  );
}

export default SliderComponent;
