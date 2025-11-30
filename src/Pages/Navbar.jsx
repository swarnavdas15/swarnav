import React from 'react'
import '../styles/navbar.css'


function Navbar() {
  return (
    <div className='navbar'>
      <div className="nav-cont">
        <h1 className="nav-logo">MyPortfolio</h1>
        <ul className="nav-items">
            <li className="nav-item"><a href='#' >Home</a> </li>
            <li className="nav-item"><a href="#about">About</a></li>
            <li className="nav-item"><a href="#skills">Skills</a></li>
            <li className="nav-item"><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
