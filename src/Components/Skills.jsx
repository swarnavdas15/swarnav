import React from "react";

import "../styles/skills.css";

function Skills() {
  return (
    <div className="skills">
      <div className="skills-wrapper">
        <section className="category web-dev" aria-labelledby="web-heading">
          <h2 id="web-heading">Web Development Skills</h2>
          <div className="skills-grid">
            <div className="skill-node web">
              <div className="skill-label">
                <span className="skill-prefix">&gt;</span>
                <span className="skill-name">React, Meteor</span>
              </div>
              <div className="skill-desc">UI Library</div>
            </div>
            <div className="skill-node web">
              <div className="skill-label">
                <span className="skill-prefix">&gt;</span>
                <span className="skill-name">Cascade Styling</span>
              </div>
              <div className="skill-desc">Utility Styling</div>
            </div>
            <div className="skill-node web">
              <div className="skill-label">
                <span className="skill-prefix">&gt;</span>
                <span className="skill-name">Node.js, Express JS</span>
              </div>
              <div className="skill-desc">Backend</div>
            </div>
              <div className="skill-node web">
              <div className="skill-label">
                <span className="skill-prefix">&gt;</span>
                <span className="skill-name">MongoDB, MySQL</span>
              </div>
              <div className="skill-desc">Database</div>
            </div>
          </div>
        </section>
        <div className="separator"></div>
        <section className="category ethical-hacking" aria-labelledby="hack-heading">
          <h2 id="hack-heading">Ethical Hacking Skills</h2>
          <div className="skills-list">
            <div className="skill-node hacking">
              <div className="skill-label">
                <span className="skill-prefix">$</span>
                <span className="skill-name">Nmap</span>
              </div>
              <div className="skill-desc">Network Scanner</div>
            </div>
            <div className="skill-node hacking">
              <div className="skill-label">
                <span className="skill-prefix">$</span>
                <span className="skill-name">Wireshark</span>
              </div>
              <div className="skill-desc">Packet Analyzer</div>
            </div>
            <div className="skill-node hacking">
              <div className="skill-label">
                <span className="skill-prefix">$</span>
                <span className="skill-name">Metasploit</span>
              </div>
              <div className="skill-desc">Exploitation</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Skills;
