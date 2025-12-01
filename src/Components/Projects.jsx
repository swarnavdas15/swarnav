import React, { useState } from 'react'
import '../styles/project.css'

function Projects() {
  const projectsData = [
    {
      title: "E-Commerce Platform",
      desc: "A full-stack e-commerce application built with React, Node.js, Express, and MongoDB. Features user authentication, product management, shopping cart, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      liveDemo: "https://ecommerce.example.com",
      github: "https://github.com/username/ecommerce"
    },
    {
      title: "Real-time Chat App",
      desc: "A real-time messaging application using React, Socket.io, and Node.js. Supports private and group chats with typing indicators.",
      tech: ["React", "Socket.io", "Node.js"],
      liveDemo: "https://chat.example.com",
      github: "https://github.com/username/chatapp"
    },
    {
      title: "Task Management Dashboard",
      desc: "A collaborative task management tool built with React, Redux, and Firebase. Includes drag-and-drop boards, real-time updates, and user roles.",
      tech: ["React", "Redux", "Firebase"],
      liveDemo: "https://tasks.example.com",
      github: "https://github.com/username/taskboard"
    },
    {
      title: "Weather Dashboard",
      desc: "A responsive weather application fetching data from multiple APIs. Features forecasts, maps, and location-based searches.",
      tech: ["React", "OpenWeatherMap", "Leaflet"],
      liveDemo: "https://weather.example.com",
      github: "https://github.com/username/weatherapp"
    },
    {
      title: "Movie Search App",
      desc: "Movie discovery app with search and trailers using TMDB API.",
      tech: ["React", "TMDB API"],
      liveDemo: "#",
      github: "#"
    },
    {
      title: "Expense Tracker",
      desc: "Personal finance app with charts and categories.",
      tech: ["React", "Chart.js"],
      liveDemo: "#",
      github: "#"
    },
    {
      title: "Blog Platform",
      desc: "Blog with CMS and SEO features.",
      tech: ["Next.js", "Sanity"],
      liveDemo: "#",
      github: "#"
    },
    {
      title: "Fitness Tracker",
      desc: "Workout logger with progress charts.",
      tech: ["React", "Firebase"],
      liveDemo: "#",
      github: "#"
    }
  ];

  const [showAll, setShowAll] = useState(false);
  return (
    <div className="projects-section">
      <h2>Featured Projects</h2>
      <div className="grid">
        {projectsData.slice(0, showAll ? undefined : 4).map((project, index) => (
          <div key={index} className="card">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div className="tech">
              {project.tech.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
            <div className="links">
              <a href={project.liveDemo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
              <a href={project.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">View Code</a>
            </div>
          </div>
        ))}
      </div>
      <div className="projects-cta">
        <button
          className=" btn-view-all"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'View Less' : 'View All Projects'}
        </button>
      </div>
    </div>
  )
}

export default Projects
