import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const Gallery = () => {
  const items = [
    {
      title: 'அன்தூரியம்',
      description: 'பொதுவான பாம்பலகை செடி, சிவப்பு அல்லது வெள்ளை பூவுடன்',
      imgSrc: '../2.jpg'
    },
    {
      title: 'அன்தூரியம்',
      description: 'ஆழமான பச்சை இதய வடிவ இலைகள் வெள்ளை...',
      imgSrc: '../2.jpg'
    },
    {
      title: 'அன்தூரியம்',
      description: 'ஆழமான பச்சை இலைகள் மற்றும் திடமான வெள்ளை...',
      imgSrc: '../2.jpg'
    },
    {
      title: 'அன்தூரியம்',
      description: 'ஆழமான பச்சை இலைகள் மற்றும் திடமான வெள்ளை...',
      imgSrc: '../2.jpg'
    }
  ];

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>கேலரி</h1>
        </Col>
        <Col className="text-right">
          <Button variant="primary">கேலரிக்கு சேர்க்க</Button>
        </Col>
      </Row>
      <Row>
        {items.map((item, index) => (
          <Col key={index} xs={12} className="mb-4 gallery-img">
            <Card>
              <Card.Img variant="top" src={item.imgSrc} className="img-fluid" />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
