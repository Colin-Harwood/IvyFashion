import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsHeart } from "react-icons/bs";

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"></link>

function NavBar() {
  const [loading, setLoading] = useState(false);
  const [checkedd, setCheckedd] = useState(false);
  const [linkTo, setLinkTo] = useState(['/login']);
  const loginText = checkedd ? 'Logout' : 'Login';
  let userName = ''

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/users')
      .then((response) => {
        console.log(response.data); // Log the response data
        setLoading(false)
        userName = response.data.userInfo.user
        
        if (userName.length > 2) {
          setCheckedd(true),
          setLinkTo(['/logout'])
        }
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, []);





  return (
    <>
    <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
    />
    <Navbar expand="lg" className="bg-body-tertiary fixed-top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
      <Container>
        <Navbar.Brand href="/">Ivy Fashion</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex">
            <Nav.Link href="/wishlist"><BsHeart /></Nav.Link>
            <Nav.Link href={linkTo[0]}>{loginText}</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default NavBar;