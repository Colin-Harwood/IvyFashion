import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Routes, Route, useNavigate } from 'react-router-dom';



const Home = () => {
  
  const navigate = useNavigate();
  
  const navigateToMen = () => {
    navigate('/men');
  };

  const navigateToWoMen = () => {
    navigate('/women');
  };

  return (
    <>
      <NavBar />
      <br></br>
      <br></br>
      <div className="position-relative">
        <img
          src="../1017A-isla-hennes-preview-3x2-1-1920x1280.jpg"
          alt="Italian Trulli"
          className="img-fluid"
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 style={{fontSize: '500%'}}>Ivy Fashion</h1>
          <h5>Find your next statement</h5>
        </div>
      </div>
      <br />
      <Container fluid className="px-30">
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={6} lg={6} className="d-flex align-items-end justify-content-center mb-0 position-relative">
            <img
              src="../How-to-dress-for-your-body-type.jpg"
              alt="Italian Trulli"
              className="img-fluid"
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center">
              <h1 className="font-weight-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>MEN</h1>
            </div>
            <Button variant="light" onClick={navigateToMen} className="rounded-1 position-absolute mb-5 font-weight-bold pl-4 pr-4" size="lg">
              VIEW NOW
            </Button>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} className="d-flex align-items-end justify-content-center mt-3 position-relative">
            <img
              src="../hailey-bieber-is-seen-in-brookly.jpg"
              alt="Italian Trulli"
              className="img-fluid"
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center">
              <h1 className="font-weight-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>WOMEN</h1>
            </div>
            <Button variant="light" onClick={navigateToWoMen} className="rounded-1 position-absolute mb-5 font-weight-bold pl-4 pr-4" size="lg">
              VIEW NOW
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
