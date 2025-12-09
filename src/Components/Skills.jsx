import React from "react";

import "../styles/skills.css";

function Skills() {
  return (
    <div id="skills" className="skills">
      <div className="skills-wrapper">
        <section className="category web-dev" aria-labelledby="web-heading">
          <h2 id="web-heading">Web Development Skills</h2>
          <div className="skills-grid">
            <div className="skill-node web">
              <div className="skill-label">
                <span className="skill-prefix">&gt;</span>
                <span className="skill-name">Framework</span>
              </div>
              <div className="skill-desc">React, Angular, Meteor</div>
            </div>
            <div className="skill-node web">
              <div className="skill-label">
                <span className="skill-prefix">&gt;</span>
                <span className="skill-name">Backend</span>
              </div>
              <div className="skill-desc">Node, Django</div>
            </div>
            <div className="skill-node web">
              <div className="skill-label">
                <span className="skill-prefix">&gt;</span>
                <span className="skill-name">API Testing</span>
              </div>
              <div className="skill-desc">Postman</div>
            </div>
              <div className="skill-node web">
              <div className="skill-label">
                <span className="skill-prefix">&gt;</span>
                <span className="skill-name">Database</span>
              </div>
              <div className="skill-desc">MongoDB, MySQL </div>
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
                <span className="skill-name">Reconnaissance</span>
              </div>
              <div className="skill-desc">OSINT, Recong-Ng, Maltego, ... </div>
            </div>
            <div className="skill-node hacking">
              <div className="skill-label">
                <span className="skill-prefix">$</span>
                <span className="skill-name">Scanning</span>
              </div>
              <div className="skill-desc">Nmap, Nessus, AngryIP ,... </div>
            </div>
            <div className="skill-node hacking">
              <div className="skill-label">
                <span className="skill-prefix">$</span>
                <span className="skill-name">Exploitation</span>
              </div>
              <div className="skill-desc">Metaslpoit, Burp Suit, OWSAP ZAP,... </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Skills;
