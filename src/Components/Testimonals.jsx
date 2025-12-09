import React from 'react'
import '../styles/testimonals.css'

function Testimonals() {
  const testimonials = [
    {
      id: 1,
      quote: "Amazing work on web development and security testing!",
      author: "Chandrabhan, (President DIV)"
    },
    {
      id: 2,
      quote: "Professional consultancy and network solutions.",
      author: "Deepak Kumar, DBA"
    }
  ]

  return (
    <section className="testimonials-section scroll-animate fade-up" id="testimonials">
      <div className="container">
        <h2 className="section-title scroll-animate fade-up stagger-1">Testimonials</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-card scroll-animate fade-up stagger-2">
              <div className="testimonial-content">
                <blockquote className="testimonial-quote">
                  {testimonial.quote}
                </blockquote>
                <cite className="testimonial-author">
                  {testimonial.author}
                </cite>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonals
