import React from 'react';
import '../styles/services.css';

const Service = () => {
  const services = [
    { iconPath: './icons/web-dev.svg', title: 'Web Development', desc: 'Building responsive and modern web applications using latest technologies.' },
    { iconPath: './icons/web-sol.svg', title: 'Web Security', desc: 'Complete security measures for web applications, ensuring protection against threats.' },
    { iconPath: './icons/network.svg', title: 'Network Testing', desc: 'Comprehensive network testing to ensure security and performance.' },
    { iconPath: './icons/pentest.svg', title: 'Penetration Testing', desc: 'Simulated cyber attacks to identify vulnerabilities.' },
    { iconPath: './icons/consult.svg', title: 'Technical Consultancy', desc: 'Expert advice on technology strategies and implementations.' }
  ];

  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-title">What I do!</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <img src={service.iconPath} alt={service.title} className="service-icon" />
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service;
