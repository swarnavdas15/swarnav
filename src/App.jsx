import React from 'react';
import Navbar from './Pages/Navbar';
import Home  from './Pages/Home';
import Showcase from './Pages/Showcase';
import Contact  from './Pages/Contact';
import Footer from './Pages/Footer'
import TsParticlesBg from "./Components/TsParticlesBg";
import './style.css'

function App() {
  return (
    <div className="app-root">
     {/* <TsParticlesBg /> */}
      <div className="content">
      <Navbar /> 
      <Home />
      <Showcase />
      <Contact />
      <Footer />
    </div>
    </div>
  );
}

export default App;