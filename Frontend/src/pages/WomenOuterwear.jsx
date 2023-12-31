import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import WomenTemplate from '../components/WomenTemplate';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link } from 'react-router-dom'

const WomenOuterwear = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(true);
  const [checked4, setChecked4] = useState(false);

  const margin = {
    margin: "1%",
  }

  const navigateToAll = () => {
    navigate('/women');
  }

  const navigateToTops = () => {
    navigate('/women/tops');
  };

  const navigateToBottoms = () => {
    navigate('/women/bottoms');
  };

  const navigateToOuterwear = () => {
    navigate('/women/outerwear');
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/clothing')
      .then((response) => {
        
        setItems(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, []);
  return (
    <>

      <NavBar />
      <WomenTemplate />

      <div className="d-flex justify-content-center mt-3">
        <ToggleButton
          className="mb-2"
          id="toggle-check1"
          type="checkbox"
          variant="outline-dark"
          checked={checked1}
          value="1"
          style={margin}
          onClick={navigateToAll}
        >
          All
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check2"
          type="checkbox"
          variant="outline-dark"
          checked={checked2}
          value="2"
          style={margin}
          onClick={navigateToTops}
        >
          Tops
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check3"
          type="checkbox"
          variant="outline-dark"
          checked={checked3}
          value="3"
          style={margin}
          onClick={navigateToOuterwear}
        >
          Outerwear
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check4"
          type="checkbox"
          variant="outline-dark"
          checked={checked4}
          value="4"
          style={margin}
          onClick={navigateToBottoms}
        >
          Bottoms
        </ToggleButton>
      </div>
      <hr />

      <div className="">
        <Container fluid>
          <Row>
          {items
              .filter((book) => book.sex === 'female' && book.clothingType === 'jacket')
              .map((book, index) => (
                <Col xs={6} sm={4} md={4} lg={3} key={index}>
                  <Link to={`/female/${book._id}`} className='text-decoration-none'>
                  <div className='text-decoration-none'>
                  <img
                    src={`/female/${book.image}`}
                    alt={`${book.title} by ${book.brand}`}
                    className="img-fluid"
                  />
                  <p style={{ padding: '10px', color:'black'}} className="book-title">{book.title}</p>
                  </div>
                  </Link>
                </Col>
              ))}
          </Row>
        </Container>
        

      </div>


      
      <Footer />

    </>
  );
};

export default WomenOuterwear