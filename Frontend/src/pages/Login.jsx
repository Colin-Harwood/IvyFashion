import React, { useState, useCallback } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorText, setErrorText] = useState("");

  const triggerAPI = useCallback(async () => {
    try {
      const res = await axios.post("http://localhost:5555/login", { username, password });
      console.log(res.data); // Assuming the response data is what you want to log
      window.location.href = 'http://localhost:5173/'
    } catch (error) {
      console.error("Error during API call:", `${error.request.responseText}`.split(':')[1].slice(1, -2));
      setErrorText(`${error.request.responseText}`.split(':')[1].slice(1, -2))
      setShowAlert(true)
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
      {showAlert && (
          <Alert key='light' variant='light' onClose={() => setShowAlert(false)} dismissible className="d-flex justify-content-center align-items-center" style={{ width: '80%', position: 'fixed',
          top: '11%',
          left: '50%',
          transform: 'translate(-50%, -50%)', }}>
            {errorText}
          </Alert>
        )}
      <div className="text-center d-flex justify-content-center mt-5" id="headText">
        <h1 className="fs-1 fw-bold" style={headSize}>Login</h1>
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
            <p>Don't have an account? Register <a href='http://localhost:5173/register'>here.</a></p>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            
        </Form>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Login;
