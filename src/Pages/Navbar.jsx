import React, { useState, useEffect } from 'react'
import '../styles/navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'Project', 'contact']
      const scrollPosition = window.scrollY + 100

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i])
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveLink(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='navbar'>
      <div className="nav-cont">
        <h1 className="nav-logo">MyPortfolio</h1>
        <div className="hamburger" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
          <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
          <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
        </div>
        <ul className={isMenuOpen ? "nav-items active" : "nav-items"}>
            <li className="nav-item"><a href='#home' className={activeLink === 'home' ? 'active' : ''} onClick={closeMenu}>Home</a> </li>
            <li className="nav-item"><a href="#about" className={activeLink === 'about' ? 'active' : ''} onClick={closeMenu}>About</a></li>
            <li className="nav-item"><a href="#Project" className={activeLink === 'Project' ? 'active' : ''} onClick={closeMenu}>Showcase</a></li>
            <li className="nav-item"><a href="#contact" className={activeLink === 'contact' ? 'active' : ''} onClick={closeMenu}>Contact</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
