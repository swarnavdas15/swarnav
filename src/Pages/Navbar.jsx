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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar')
      const menu = document.querySelector('.side-menu')
      
      if (isMenuOpen && navbar && !navbar.contains(event.target) && !menu?.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home', selector: '#home' },
        { id: 'skills', selector: '#skills' },
        { id: 'Project', selector: '#Project' },
        { id: 'contact', selector: '#contact' }
      ]
      const scrollPosition = window.scrollY + 100

      // Find the section that's currently in view
      for (let i = 0; i < sections.length; i++) {
        const section = document.querySelector(sections[i].selector)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          const sectionBottom = sectionTop + sectionHeight
          
          // Check if the section is in the viewport with better threshold
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveLink(sections[i].id)
            break
          }
        }
      }
    }

    // Initial check on mount
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Enhanced scroll detection with Intersection Observer for better performance
  useEffect(() => {
    const sections = ['home', 'skills', 'Project', 'contact']
    const observers = []

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveLink(sectionId)
              }
            })
          },
          {
            threshold: 0.3, // Trigger when 30% of section is visible
            rootMargin: '-100px 0px -100px 0px' // Adjust trigger zone
          }
        )
        
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [])

  // Handle hash changes (when clicking nav links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        setActiveLink(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      {/* Overlay for mobile menu */}
      <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
      
      {/* Side menu */}
      <div className={`side-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="side-menu-header">
          <h2 className="side-menu-logo">Swarnav Das</h2>
          <div className="close-btn" onClick={closeMenu}>
            <span className="close-line close-line-1"></span>
            <span className="close-line close-line-2"></span>
          </div>
        </div>
        <ul className="side-menu-items">
          <li className="side-menu-item">
            <a href='#home' className={activeLink === 'about' ? 'active' : ''} onClick={closeMenu}>
              <span className="menu-icon"></span>
              <span className="menu-text">About</span>
            </a>
          </li>
          <li className="side-menu-item">
            <a href="#skills" className={activeLink === 'skills' ? 'active' : ''} onClick={closeMenu}>
              <span className="menu-icon"></span>
              <span className="menu-text">Skills</span>
            </a>
          </li>
          <li className="side-menu-item">
            <a href="#Project" className={activeLink === 'Project' ? 'active' : ''} onClick={closeMenu}>
              <span className="menu-icon"></span>
              <span className="menu-text">Showcase</span>
            </a>
          </li>
          <li className="side-menu-item">
            <a href="#contact" className={activeLink === 'contact' ? 'active' : ''} onClick={closeMenu}>
              <span className="menu-icon"></span>
              <span className="menu-text">Contact</span>
            </a>
          </li>
        </ul>
        <div className="side-menu-footer">
          <p>Connect with me</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/swarnav-das-6929542bb" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/icons/linkedin.svg" alt="LinkedIn" className="social-icon" />
            </a>
            <a href="https://github.com/swarnavdas15" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/icons/github.svg" alt="GitHub" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/m_roni2/" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/icons/instagram.svg" alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Traditional navbar for desktop */}
      <div className='navbar'>
        <div className="nav-cont">
          <div className="nav-logo">
            <img src="/icons/logo.svg" alt="Logo" className="nav-logo-img" />
          </div>
          <div className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
            <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
            <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
          </div>
          <ul className={isMenuOpen ? "nav-items active" : "nav-items"}>
            <li className="nav-item"><a href='#home' className={activeLink === 'home' ? 'active' : ''} onClick={closeMenu}>Home</a> </li>
            <li className="nav-item"><a href="#skills" className={activeLink === 'skills' ? 'active' : ''} onClick={closeMenu}>About</a></li>
            <li className="nav-item"><a href="#Project" className={activeLink === 'Project' ? 'active' : ''} onClick={closeMenu}>Showcase</a></li>
            <li className="nav-item"><a href="#contact" className={activeLink === 'contact' ? 'active' : ''} onClick={closeMenu}>Contact</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar;
