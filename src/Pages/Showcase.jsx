import React from 'react'
import '../styles/showcase.css'
import Projects from '../Components/Projects.jsx'
import Testimonals from '../Components/Testimonals.jsx'
import Service from '../Components/Service.jsx'

function Showcase() {
  return (
    <div>
      <Projects/>
      <Testimonals/>
      <Service/>
    </div>
  )
}

export default Showcase
