import React from 'react'
import '../styles/home.css'
import Hero from '../Components/Hero.jsx'
import About from '../Components/About.jsx'


function Home() {
  return (
    <div className='home'>
      <Hero />
      <About />
    </div>
  )
}

export default Home
