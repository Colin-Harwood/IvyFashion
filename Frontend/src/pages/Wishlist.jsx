import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsTrash3 } from "react-icons/bs";
import { Link } from 'react-router-dom'

const Wishlist = () => {
  const [item, setItem] = useState({});
  const [items, setItems] = useState([]);
  const [menOrWomen, setMenOrWomen] = useState('');
  const [loading, setLoading] = useState(false);
  const headSize = {
      fontSize: "300%",
    }

    const handleDeleteItem = (itemName, itemLinkId) => {
      // Add your logic to delete the item from the wishlist
      axios.delete(`http://localhost:5555/wishlist/${itemLinkId}`, {
        data: { item: itemName },
        })
        .then((response) => {
          console.log(response.data);
          // Filter out the deleted item from the local state
          const updatedItemsList = item.itemsList.filter(
            listItem => listItem.item !== itemName
          );
          setItem(prevItem => ({ ...prevItem, itemsList: updatedItemsList }));
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error as needed
        });
      };

    

    useEffect(() => {
      setLoading(true);
      axios
        .get(`http://localhost:5555/wishlist`)
        .then((response) => {
          
          setItem(response.data);
          setLoading(false);
  
          
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }, []);

    useEffect(() => {
      setLoading(true);
      axios
        .get('http://localhost:5555/clothing')
        .then((response) => {
          setItems(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);

    const renderContent = () => {
      // For example, assuming 'item' has a property named 'itemsList'
      if (item.itemsList && Array.isArray(item.itemsList)) {
      return (
        <ul>
          <Container fluid>
            <Row>
          {item.itemsList.map((listItem, index) => (
            
              items
                .filter((book) => book.title === listItem.item)
                .map((book, index) => (
                  <Col xs={6} sm={4} md={4} lg={3} key={index}>
                      

                      
                        <BsTrash3
                            onClick={() => handleDeleteItem(book.title, item.itemId)}
                            className="position-absolute fs-3 cursor-pointer" style={{paddingLeft:"10px", marginTop:"5px"}}
                        />
                        
                        <Link to={`/${book.sex}/${book._id}`} className='text-decoration-none'>

                        <img
                          src={`/${book.sex}/${book.image}`}
                          alt="Italian Trulli"
                          className="img-fluid"
                        />
                        
                      
                      <p style={{ padding: '10px', color:'black' }}>{book.title}</p>

                      </Link>
                    </Col>
                ))
            
          ))}
          </Row>
          </Container>
        </ul>
      )
      } else {
        return <p>No items in the wishlist.</p>;
      }
      
      
    };
    
    return (
      <>
        <NavBar />
        <br />
        <br />
        <div className="text-center d-flex justify-content-center mt-5" id="headText">
            <h1 className="fs-1 fw-bold" style={headSize}>Liked Items</h1>
        </div>
        <hr />
        {renderContent()}
        <Footer />
      </>
    );
  };
  
  export default Wishlist;