import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/about.css';

function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLayoutSwapped, setIsLayoutSwapped] = useState(false);
  const aboutRef = useRef(null);

  const profiles = [
    {
      name: 'Swarnav Das',
      role: 'Full Stack Developer',
      location: 'India',
      bio: 'I`m a full-stack developer passionate about crafting seamless, high-performance web experiences.Skilled in building intuitive frontends and robust backend systems that scale reliably.Dedicated to clean code, thoughtful architecture, and solving real-world problems through technology.Always exploring new tools and approaches to deliver modern, impactful digital solutions.',
      image: 'https://raw.githubusercontent.com/swarnavdas15/my-resources/refs/heads/main/my-web-img.png',
      links: [
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' }
      ]
    },
    {
      name: 'Swarnav Das',
      role: 'Ethical Hacker',
      location: 'India',
      bio: 'I`m a skilled ethical hacker committed to proactively identifying vulnerabilities and reinforcing system security, leveraging strong penetration-testing techniques, network analysis skills, and responsible methodologies to prevent exploitation, while continuously adapting to new cyber threats and evolving attack vectors to ensure resilient and trustworthy digital infrastructure.',
      image: 'https://raw.githubusercontent.com/swarnavdas15/my-resources/refs/heads/main/my-web-img.png',
      links: [
        { label: 'Git Hub', href: 'https://behance.net' },
        { label: 'LinkedIn', href: 'https://dribbble.com' }
      ]
    },
  ];

  const numProfiles = profiles.length;


  const toggleLayout = useCallback(() => {
    setIsLayoutSwapped((prev) => !prev);
    setActiveIndex((prev) => (prev + 1) % numProfiles);
  }, [numProfiles]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === ' ') {
      e.preventDefault();
      toggleLayout();
    }
  }, [toggleLayout]);

  useEffect(() => {
    profiles.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  const currentProfile = profiles[activeIndex];

  return (
    <div className='about' id="about">
      <div
        className={`about-cont ${isLayoutSwapped ? 'layout-swapped' : ''}`}
        ref={aboutRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role='region'
        aria-label='About profiles'
      >
        <div className='cont-left'>
          {profiles.map((profile, index) => (
            <img
              key={index}
              src={profile.image}
              alt={`Photo of ${profile.name}, ${profile.role}`}
              className={`profile-img ${index === activeIndex ? 'active' : ''}`}
              width='400'
              height='500'
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
        <div className='cont-right'>
          <div className='text-container'>
            {profiles.map((profile, index) => (
              <div
                key={index}
                className={`text-content ${index === activeIndex ? 'active' : ''}`}
              >
                <h2>{profile.name}</h2>
                <p className='bio'>{profile.bio}</p>
                <div className='metadata'>
                  <span><strong>{profile.role}</strong></span>
                  <span>{profile.location}</span>
                </div>
                <div className='links'>
                  {profile.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className='sr-only' aria-live='polite' role='status'>
            {currentProfile?.bio}
          </div>
        </div>
        <div className='controls'>
          <button
            type='button'
            onClick={toggleLayout}
            aria-label='Toggle layout direction'
          >
            ↔ {isLayoutSwapped ? 'Click' : 'Click'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
