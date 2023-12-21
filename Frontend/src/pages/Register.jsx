import React, { useState, useCallback } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const triggerAPI = useCallback(async () => {
    try {
      const res = await axios.post("http://localhost:5555/register", { username, password });
      console.log(res.data); // Assuming the response data is what you want to log
      window.location.href = 'http://localhost:5173/login'
    } catch (error) {
      console.error("Error during API call:", error);
    }
  }, [username, password]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await triggerAPI();
  }, [triggerAPI]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    if (name === "userName") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }, []);

  const headSize = {
    fontSize: "300%",
  };

  return (
    <>
      <NavBar />
      <br />
      <br />
      <div className="text-center d-flex justify-content-center mt-5" id="headText">
        <h1 className="fs-1 fw-bold" style={headSize}>Register</h1>
      </div>
      <hr />
      <div  className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit} style={{width:'50%'}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} name="userName" onChange={handleChange} />
            <Form.Text className="text-muted">
                We'll never share your username with anyone else.
            </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} name="password" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Register;