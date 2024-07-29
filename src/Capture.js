// src/Home.js
import React, { useState, useRef, useCallback } from 'react';
import { FaCamera, FaImage } from 'react-icons/fa';
import Webcam from 'react-webcam';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import './Capture.css';
import './DiseaseSolution.css'
import solutions from "./solution"

const Capture = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosisId, setDiagnosisId] = useState(0);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const webcamRef = useRef(null);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);

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

      const name = response.data.predicted_class;
      setResult(response.data.predicted_class);
      if (name == "bacterialBlight") {
        setDiagnosisId(1)
        setShowModal(true);
      } else if (name == "rootRot") {
        setDiagnosisId(2)
        setShowModal(true);
      } else if (name == "rust") {
        setDiagnosisId(3)
        setShowModal(true);
      } else if (name == "anthuriumMosaicVirus") {
        setDiagnosisId(4)
        setShowModal(true);
      } else {
        setResult("Healthy");
      }
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }

  };

  const closeModal = () => {
    setShowModal(false);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImage(imageSrc);
    handleCloseModal();
  }, [webcamRef]);

  const handleShowModal = () => setShowModal1(true);
  const handleCloseModal = () => setShowModal1(false);

  return (
    <div className="home">
      <header className="header-hd">
        <h1>தேடல் பக்கம்</h1>
      </header>
      <div className="content capture-div">
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
        <div className="button-container">
          <Button onClick={handleShowModal}>
            <FaCamera /> காட்சி
          </Button>

        </div>


      </div>

      {selectedImage && (
        <div className="image-preview">
          <img src={selectedImage} alt="Preview" />
          <button className="process-button" onClick={handleProcess}>செயல்முறை</button>
        </div>
      )}
      <Modal show={showModal} centered>
        <Modal.Header >

          <Modal.Title>நோய் தீர்வு</Modal.Title>
          <span className="close-button" onClick={closeModal}>&times;</span>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
          <div>
            {selectedImage && (
              <div className="image-preview">
                <img src={selectedImage} alt="Preview" />
              </div>
            )}
          </div>
          <div>
            {solutions?.map((det) => (
              det.id === diagnosisId && <>
                <h4>{det.disease}</h4>
                <p className='det-title'>{det.title}</p>

                {det.id == diagnosisId && det?.details?.map((d) => (
                  <>
                    <p className='det-title '><strong>{d.topic}</strong></p>
                    <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}> {d.solutions.map((s) => (
                      <li className='det-li'>
                        {s}
                      </li>
                    ))} </ul>
                  </>
                ))}
              </>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showModal1} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>கேமரா</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            மூடு
          </Button>
          <Button variant="primary" onClick={capture}>
            புகைப்படம் எடு
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Capture;
