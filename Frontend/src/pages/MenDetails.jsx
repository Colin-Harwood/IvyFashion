import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import { BsBagHeartFill, BsBagHeart } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { wishList } from '../../../Backend/models/wishList'
import Alert from 'react-bootstrap/Alert';


const MenDetails = () => {
  const [inWishlist, setInWishlist] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [loggedInn, setLoggedInn] = useState(false);
  const { id } = useParams();
  const [checked, setChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const wishIcon = checked ? <BsBagHeartFill /> : <BsBagHeart />;
  const wishText = checked ? 'NOW IN LIKED ITEMS' : 'ADD TO LIKED ITEMS';
  const navigate = useNavigate();
  let userName = ''
  const notLogged = userName ? 'Please log in to add items' : '';

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/users')
      .then((response) => {
        console.log(response.data); // Log the response data
        setLoading(false)
        userName = response.data.userInfo.user
        // setLoggedInn(true);

        if (userName.length > 2) {
          setLoggedInn(true);
        }
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/clothing/${id}`)
      .then((response) => {
        console.log('Response:', response.data.item);
        setItem(response.data.item);
        setLoading(false);

        
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Check if item.title exists before making the second API call
    if (item.title) {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5555/wishlist');
          console.log(response.data.itemsList);
          console.log(item.title);

          // Check if any item in the wishlist has a title that matches, ignoring case and whitespaces
          const isInWishlist = response.data.itemsList.some((wishlistItem) =>
            wishlistItem.item.trim().toLowerCase() === item.title.trim().toLowerCase()
          );

          if (isInWishlist) {
            setInWishlist(true);
            setChecked(true);
          } else {
            setInWishlist(false);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchData();
    }
  }, [item.title]);

  


  const navigateToItemWeb = () => {
    window.location.href = `${item.itemLink}`
  }
  
  

  return (
    <>
      <NavBar />
      <br />
      <br />
      <br />
      {showAlert && (
          <Alert key='light' variant='light' onClose={() => setShowAlert(false)} dismissible className="d-flex justify-content-center align-items-center" style={{ width: '80%', position: 'fixed',
          top: '11%',
          left: '50%',
          transform: 'translate(-50%, -50%)', }}>
            Please log in
          </Alert>
        )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        
        <Container fluid className="px-30" style={{ paddingLeft: '15%' }}>
          <Row className="">
            <Col xs={12} md={4} lg={4} className="mb-0">
              <img
                src={`/male/${item.image}`}
                alt="Italian Trulli"
                className="img-fluid"
              />
            </Col>
            <Col xs={12} md={8} lg={8} className="d-flex flex-column justify-content-between">
              <div className="align-items-start">
                <h1 style={{ fontSize: '300%', paddingRight: '10%' }}>{item.title}</h1>
                <br />
                <h3 className="text-body-tertiary">By {item.brand}</h3>
              </div>
              <div className="d-flex align-items-center text-center mb-5">
              {window.innerWidth < 768 && (
                <>
                <Button
                variant="outline-dark"
                className="mr-2 mb-5"
                style={{ width: '150px', marginRight:'10%', marginLeft:'0%' }}
                onClick={navigateToItemWeb}
              >
                SHOP NOW
              </Button>
              </>
              )}
              {window.innerWidth > 767 && (
                <>
                <Button
                  variant="outline-dark"
                  className="mr-2 mb-5"
                  style={{ width: '150px', marginRight:'10%', marginLeft:'20%' }}
                  onClick={navigateToItemWeb}
                >
                  SHOP NOW
                </Button>
                </>
              )}
                
                <ToggleButton
                  className="d-flex align-items-center text-center mb-5"
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-dark"
                  checked={checked}
                  value="1"
                  onChange={(e) => {
                    if (!loggedInn) {
                      setShowAlert(true); // Set showAlert to true to display the Alert
                      return;
                    }
                    { if (inWishlist === false && checked === false && loggedInn) (
                      setChecked(true),
                      axios.put("http://localhost:5555/wishlist", { "itemsList": {"item": item.title } }) 
                    )} 
                    
                  }}
                  style={{textAlign: 'center', paddingLeft: '3%', paddingRight:'3%'}}
                >
                  {wishIcon}   {wishText}
                </ToggleButton>
                
              </div>
            </Col>
          </Row>
        </Container>
      )}
      
      <Footer />
    </>
  );
};

export default MenDetails;
