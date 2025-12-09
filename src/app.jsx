import React from 'react';
import Navbar from './Pages/Navbar.jsx';
import Home  from './Pages/Home.jsx';
import Showcase from './Pages/Showcase.jsx';
import Contact  from './Pages/Contact.jsx';
import Footer from './Pages/Footer.jsx'
import TsParticlesBg from "./Components/TsParticlesBg.jsx";
import Skills from './Components/Skills.jsx';
import './style.css'

function App() {
  return (
    <div className="app-root">
     <TsParticlesBg />
      <div className="content">
      <Navbar />
      <div id="home"><Home /></div>
      <div id="skills"><Skills /></div>
      <div id="Project"><Showcase /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </div>
    </div>
  );
}

export default App;