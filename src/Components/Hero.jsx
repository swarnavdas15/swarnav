import React from 'react'
import '../styles/hero.css'

function Hero() {
  return (
    <div className='hero'>
      <div className="intro">
        <h1 className="hero-name">Welcome to DEV-HUB !</h1>
        <p className="hero-description">Ideas. Crafted. Experienced </p>
      </div>
       <div className="arrow-container">
          <div className="arrow">
            <span className="arrow-line">
              <a href="#about" aria-label="Scroll to Skills section">↓</a>
            </span>
          </div>
        </div>
    </div>
  )
}

export default Hero
