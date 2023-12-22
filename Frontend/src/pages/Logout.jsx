import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = 'logout'
        
        const res = await axios.post("http://localhost:5555/login", {username });
        
        // Redirect to home after processing the response
        navigate('/');
        
      } catch (error) {
        console.error(error);
        // Handle errors if needed
      }
    };

    fetchData();
  }, [navigate]);

  return null; // or render any loading or content if necessary
};

export default Logout;
