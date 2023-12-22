import react from "react";
import { BsEnvelope } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { Link } from 'react-router-dom'

const Footer = () => {
    const padding = {
        padding: '2% 5%',
    }
  return (
    <>
    <br></br>
        <div className="bg-light " style={{padding:"2% 5%", color:"rgb(0,0,0)"}}>
            <footer>
            
            <p><BsEnvelope /> ColinHarwood0@gmail.com</p>
            <p><BsTelephone /> +27 63 127 4468</p>
            <p ><BsGithub /> <Link to='https://github.com/Colin-Harwood' className='underline-black' style={{color:"black"}}>My Github Account</Link></p>
            </footer>
        </div>
    </>
  );
};

export default Footer