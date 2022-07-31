import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/Landing.css";


export default function Landing () {
    return (
      <div className='fondo'>
        <Link to= "./Home"> <button id="buttos-landing">Start!</button></Link>
      </div>
    );
  }


  