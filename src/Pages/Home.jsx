import React from 'react'
import '../styles/home.css'
import Hero from '../Components/Hero.jsx'
import About from '../Components/About.jsx'
import Skills from '../Components/Skills.jsx'

function Home() {
  return (
    <div className='home'>
      <Hero />
      <About/>
      <Skills />
    </div>
  )
}

export default Home
