// src/Home.js
import React, { useState } from 'react';
import { FaCamera, FaFileImage } from 'react-icons/fa';
import axios from 'axios';
import './Capture.css';
import './DiseaseSolution.css'

const Capture = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [showModal, setShowModal] = useState(false);


  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
      setDiagnosis('');
    }
  };


  const handleProcess = async () => {
    // Here, you would send the image to your backend or ML model for diagnosis
    // For demonstration, we'll simulate a diagnosis
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response, "responseee")
      setShowModal(true);
      setResult(response.data.predicted_class);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }

  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="home">
      <header className="header">
        <h1>தேடல் பக்கம்</h1>
      </header>
      <div className="content">
        <div className="button-container">
          <label htmlFor="capture" className="button">
            <FaCamera /> பிடிப்பு
          </label>
          <input
            type="file"
            id="capture"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />

        </div>
        {selectedImage && (
          <div className="image-preview">
            <img src={selectedImage} alt="Preview" />
            <button className="process-button" onClick={handleProcess}>Process</button>
          </div>
        )}
        {result && <p className="diagnosis-result">{result}</p>}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>நோய் தீர்வு</h2>
            <p>நோய்க்கான தீர்வு இதோ.!</p>
            <div>
              {selectedImage && (
                <div className="image-preview">
                  <img src={selectedImage} alt="Preview" />

                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Capture;
