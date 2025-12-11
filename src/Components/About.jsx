import React from 'react';
import '../styles/about.css';

function About() {
  // Function to handle CV download
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Swarnav_Das_CV.pdf';
    link.download = 'Swarnav_Das_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const profile = {
    name: 'Swarnav Das',
    role: ['Full Stack Developer ',' Ethical Hacker'],
    location: 'India',
    bio: 'Passionate developer and security enthusiast crafting modern web applications with a focus on performance, security, and user experience. I bridge the gap between frontend innovation and backend reliability while maintaining a security-first mindset.',
    experience: '1+ years in web development & cybersecurity',
    image: 'https://raw.githubusercontent.com/swarnavdas15/my-resources/refs/heads/main/profile.png',
    certifications: ['ECITK-Ethical Hacking', 'React Developer'],
    skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Security', 'DevOps'],
    links: [
      { label: 'GitHub', href: 'https://github.com', icon: '/icons/github.svg' },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: '/icons/linkedin.svg' }
    ]
  };

  return (
    <div className='about' id="about">
      <div className='about-cont'>
        {/* Left Section - Full-height Photo with Subtle Overlay Effects */}
        <div className='about-left'>
          <div className='photo-container'>
            <img
              src={profile.image}
              alt={`Photo of ${profile.name}`}
              className='profile-photo'
              loading='eager'
            />
            <div className='photo-overlay'></div>
            <div className='photo-glow'></div>
          </div>
        </div>

        {/* Right Section - Structured Content */}
        <div className='about-right'>
          <div className='content-wrapper'>
            {/* Name */}
            <div className='info-section'>
              <h3 className='info-label'>Name</h3>
              <h2 className='info-value'>{profile.name}</h2>
            </div>

            {/* Bio */}
            <div className='info-section'>
              <h3 className='info-label'>Bio</h3>
              <p className='info-text'>{profile.bio}</p>
            </div>

            {/* Role */}
            <div className='info-section'>
              <h3 className='info-label'>Role</h3>
              <div className="certifications-grid">
               {profile.role.map((role, index) => (
                  <span key={index} className='certification-item'>{role}</span>
                ))}
            </div>
            </div>

            {/* Location */}
            <div className='info-section'>
              <h3 className='info-label'>Location</h3>
              <span className='location-chip'>📍 {profile.location}</span>
            </div>

            {/* Certifications */}
            <div className='info-section'>
              <h3 className='info-label'>Certifications</h3>
              <div className='certifications-grid'>
                {profile.certifications.map((cert, index) => (
                  <span key={index} className='certification-item'>{cert}</span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className='info-section'>
              <h3 className='info-label'>Experience</h3>
              <p className='experience-value'>{profile.experience}</p>
            </div>

            {/* Download CV Button */}
            <div className='cta-section'>
              <button className='download-cv-btn' onClick={handleDownloadCV}>
                📄 Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
