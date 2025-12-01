// src/components/TsParticlesBg.jsx
import React, { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const TsParticlesBg = () => {
  const [isClient, setIsClient] = useState(false);

  // Guard for environments that render on server
  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  const particlesInit = useCallback(async (engine) => {
    console.log('[TsParticlesBg] init called, engine:', !!engine);
    try {
      await loadFull(engine);
      console.log('[TsParticlesBg] loadFull completed');
    } catch (err) {
      console.error('[TsParticlesBg] loadFull error:', err);
    }
  }, []);

  const options = {
    fullScreen: { enable: true, zIndex: 0 },
    fpsLimit: 60,
    particles: {
      number: { value: 60, density: { enable: true, area: 800 } },
      color: { value: '#ed3103ff' },
      shape: { type: 'circle' },
      opacity: { value: 0.8 },
      size: { value: { min: 1, max: 6 }, random: true },
      links: { enable: true, distance: 200, color: '#d30303ff', opacity: 0.9, width: 2 },
      move: { enable: true, speed: 0.3, outModes: { default: 'out' } }
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 200, links: { opacity: 1 } },
        push: { quantity: 2 }
      }
    },
    detectRetina: true
  };

  // avoid SSR hydration issues
  if (!isClient) return null;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      // inline style here only for safety; fullScreen:true will position the canvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', top: 0, left: 0, zIndex: 0 }}
    />
  );
};

export default TsParticlesBg;
