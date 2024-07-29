// src/Home.js
import React, { useState } from 'react';
import { FaCamera, FaFileImage } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
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
      console.log(response, "responseee")
      setShowModal(true);

      const name = response.data.predicted_class;
      setResult(response.data.predicted_class);
      if (name == "bacterialBlight") {
        setDiagnosisId(1)
        // , 'bacterialBlight', 'rootRot',"rust",'anthuriumMosaicVirus'
      } else if (name == "rootRot") {
        setDiagnosisId(2)

      } else if (name == "rust") {
        setDiagnosisId(3)

      } else if (name == "anthuriumMosaicVirus") {
        setDiagnosisId(4)

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

  return (
    <div className="home">
      <header className="header-hd">
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

      </div>

      {/* {showModal && (
        // <div className="modal">
        //   <div className="modal-content" style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        //     <span className="close-button" onClick={closeModal}>&times;</span>
        //     {result && <p className="diagnosis-result">{result}</p>}
        //     <h2>நோய் தீர்வு</h2>
        //     <p>நோய்க்கான தீர்வு இதோ.!</p>
        //     <div>
        //       {selectedImage && (
        //         <div className="image-preview">
        //           <img src={selectedImage} alt="Preview" />
        //         </div>
        //       )}
        //     </div>
        //     <div>
        //       {solutions?.map((det) => (
        //         <>
        //           <h4>{det.disease}</h4>
        //           <p>{det.title}</p>

        //           {det.id == diagnosisId && det?.details?.map((d) => (
        //             <p>{d.topic}</p>

        //           ))}
        //         </>
        //       ))}
        //     </div>
        //   </div>

        // </div>
       

      )} */}
       <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>அன்தூரியம் மோசைக் வைரஸ் நோய்கள்: தீர்வு மற்றும் தடுப்பு முறைகள் (தமிழில்)</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
          </Modal.Body>
        </Modal>
    </div>
  );
};

export default Capture;
