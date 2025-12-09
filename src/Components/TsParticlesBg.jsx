// src/components/TsParticlesBg.jsx
import React, { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const TsParticlesBg = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Guard for environments that render on server
  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
    
    // Detect mobile devices
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768 || window.innerHeight <= 500;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      return isMobileDevice || isSmallScreen || isTouchDevice;
    };
    
    setIsMobile(checkIsMobile());
    
    // Listen for resize events to update mobile state
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    try {
      await loadFull(engine);
    } catch (err) {
      console.error('[TsParticlesBg] loadFull error:', err);
    }
  }, []);

  // Mobile-optimized particle options
  const [particleOptions, setParticleOptions] = useState(() => {
    const baseOptions = {
      fpsLimit: 60,
      particles: {
        number: {
          value: 60, // Default for desktop
          density: {
            enable: true,
            area: 800 // Default for desktop
          }
        },
        color: { value: '#ed3103ff' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.8, // Default for desktop
          random: false
        },
        size: {
          value: { min: 1, max: 6 },
          random: true
        },
        links: {
          enable: true,
          distance: 200, // Default for desktop
          color: '#d30303ff',
          opacity: 0.9, // Default for desktop
          width: 2
        },
        move: {
          enable: true,
          speed: 0.3, // Default for desktop
          outModes: { default: 'out' },
          random: false // Default for desktop
        }
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: {
            enable: true, // Default for desktop
            mode: 'grab'
          },
          onClick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 200, // Default for desktop
            links: { opacity: 1 }
          },
          push: {
            quantity: 1 // Default for desktop
          }
        }
      },
      detectRetina: true,
      fullScreen: { enable: true, zIndex: 0 } // Default for desktop
    };
    return baseOptions;
  });

  // Update particle options when mobile state changes
  useEffect(() => {
    const baseOptions = {
      fpsLimit: 60,
      particles: {
        number: {
          value: isMobile ? 30 : 60, // Reduce particle count on mobile
          density: {
            enable: true,
            area: isMobile ? 1200 : 800 // Increase area on mobile for better performance
          }
        },
        color: { value: '#ed3103ff' },
        shape: { type: 'circle' },
        opacity: {
          value: isMobile ? 0.6 : 0.8, // Slightly reduce opacity on mobile
          random: false
        },
        size: {
          value: { min: isMobile ? 1 : 1, max: isMobile ? 4 : 6 },
          random: true
        },
        links: {
          enable: true,
          distance: isMobile ? 150 : 200, // Reduce link distance on mobile
          color: '#d30303ff',
          opacity: isMobile ? 0.7 : 0.9, // Reduce link opacity on mobile
          width: isMobile ? 1 : 2
        },
        move: {
          enable: true,
          speed: isMobile ? 0.2 : 0.3, // Slightly slower movement on mobile
          outModes: { default: 'out' },
          random: isMobile ? true : false // Add randomness on mobile for better performance
        }
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: {
            enable: !isMobile, // Disable hover effects on mobile for performance
            mode: 'grab'
          },
          onClick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: isMobile ? 150 : 200,
            links: { opacity: isMobile ? 0.8 : 1 }
          },
          push: {
            quantity: isMobile ? 0 : 1
          }
        }
      },
      detectRetina: true
    };

    // For mobile devices, use container-based positioning instead of fullScreen
    if (isMobile) {
      setParticleOptions({
        ...baseOptions,
        fullScreen: { enable: false }, // Disable fullScreen on mobile
        detectRetina: true
      });
    } else {
      // For desktop, use fullScreen
      setParticleOptions({
        ...baseOptions,
        fullScreen: { enable: true, zIndex: 0 }
      });
    }
  }, [isMobile]);

  // avoid SSR hydration issues
  if (!isClient) return null;

  return (
    <div className="particles-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          top: 0, 
          left: 0, 
          zIndex: 0,
          // Additional mobile-specific styles
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          // Ensure proper rendering on mobile
          WebkitTransform: 'translate3d(0, 0, 0)',
          MozTransform: 'translate3d(0, 0, 0)',
          msTransform: 'translate3d(0, 0, 0)',
          OTransform: 'translate3d(0, 0, 0)'
        }}
      />
    </div>
  );
};

export default TsParticlesBg;
