import React from 'react'
import '../styles/testimonals.css'
function Testimonals() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">Testimonials</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <blockquote>"Amazing work on web development and security testing!"</blockquote>
            <cite>- Jane Doe, CTO</cite>
          </div>
          <div className="testimonial-card">
            <blockquote>"Professional consultancy and network solutions."</blockquote>
            <cite>- Mike Johnson, IT Dir</cite>
          </div>
          <div className="testimonial-card">
            <blockquote>"Top-notch penetration testing services."</blockquote>
            <cite>- Sarah Lee, Founder</cite>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonals
