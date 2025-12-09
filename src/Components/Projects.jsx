import React, { useState } from 'react'
import '../styles/project.css'

function Projects() {
  const projectsData = [
    {
      title: "Tech Club Website",
      desc: "A full-stack e-commerce application built with React, Node.js, Express, and MongoDB. Features user authentication, product management, shopping cart, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      liveDemo: "https://div-github-io.vercel.app",
      github: "https://github.com/swarnavdas15/div.github.io"
    },
   
  ];

  const [showAll, setShowAll] = useState(false);
  
  // Only show "View All Projects" button if there are more than 3 projects
  const shouldShowViewAllButton = projectsData.length > 3;
  
  return (
    <div className="projects-section">
      <h2>Featured Projects</h2>
      <div className="grid">
        {projectsData.slice(0, showAll ? undefined : 3).map((project, index) => (
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
      {shouldShowViewAllButton && (
        <div className="projects-cta">
          <button
            className="btn-view-all"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View Less' : 'View All Projects'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Projects
