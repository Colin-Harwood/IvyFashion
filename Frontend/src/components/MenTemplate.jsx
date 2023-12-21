import React from 'react';
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import './styles.css';
import {Routes, Route, useNavigate} from 'react-router-dom';

const MenTemplate = () => {

  const headSize = {
    fontSize: "300%",
  }


  return (

    <>
      <br />
      <br />
      <div className="text-center d-flex justify-content-center mt-5" id="headText">
        <h1 className="fs-1 fw-bold" style={headSize}>Men's Clothes</h1>
      </div>

      
    </>
  );
};

export default MenTemplate;
