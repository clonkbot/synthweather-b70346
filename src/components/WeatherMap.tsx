import { useEffect, useState } from 'react';

interface WeatherMapProps {
  condition: string;
  isLoading: boolean;
}

export function WeatherMap({ condition, isLoading }: WeatherMapProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  const getConditionColor = () => {
    switch (condition) {
      case 'Clear': return 'rgba(245, 158, 11, 0.6)';
      case 'Partly Cloudy': return 'rgba(148, 163, 184, 0.5)';
      case 'Overcast': return 'rgba(71, 85, 105, 0.6)';
      case 'Light Rain': return 'rgba(6, 182, 212, 0.5)';
      case 'Thunderstorm': return 'rgba(239, 68, 68, 0.5)';
      case 'Fog': return 'rgba(148, 163, 184, 0.3)';
      default: return 'rgba(245, 158, 11, 0.4)';
    }
  };

  return (
    <div className="map-panel panel panel-glow">
      <div className={`map-container ${isLoading ? 'loading-shimmer' : ''}`}>
        {/* Grid overlay */}
        <div className="map-grid" />

        {/* Radar sweep */}
        <div className="radar-sweep" />

        {/* Weather condition overlay */}
        <div
          className="condition-overlay"
          style={{ background: `radial-gradient(circle at 50% 50%, ${getConditionColor()}, transparent 70%)` }}
        />

        {/* Animated particles */}
        <div className="particles-container">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Center marker */}
        <div className="center-marker">
          <div className="marker-ring" />
          <div className="marker-ring marker-ring-2" />
          <div className="marker-core" />
        </div>

        {/* Coordinates display */}
        <div className="coords-display">
          <span>LAT: 37.7749</span>
          <span>LON: -122.4194</span>
        </div>

        {/* Condition badge */}
        <div className="condition-badge">
          {condition.toUpperCase()}
        </div>
      </div>

      <style>{`
        .map-panel {
          height: 100%;
          min-height: 280px;
        }

        @media (min-width: 768px) {
          .map-panel {
            min-height: 320px;
          }
        }

        .map-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 240px;
          background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy-mid) 100%);
          border: 1px solid rgba(245, 158, 11, 0.2);
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .map-container {
            min-height: 280px;
          }
        }

        .map-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .radar-sweep {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          height: 200%;
          transform: translate(-50%, -50%);
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(245, 158, 11, 0.15) 30deg,
            transparent 60deg
          );
          animation: radarSweep 4s linear infinite;
        }

        @keyframes radarSweep {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .condition-overlay {
          position: absolute;
          inset: 0;
          transition: background 0.5s ease;
        }

        .particles-container {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          background: var(--cyan);
          border-radius: 50%;
          opacity: 0.6;
          animation: particleFloat 6s ease-in-out infinite;
        }

        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(10px, -15px) scale(1.2); opacity: 0.3; }
        }

        .center-marker {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
        }

        .marker-ring {
          position: absolute;
          inset: 0;
          border: 2px solid var(--amber);
          border-radius: 50%;
          animation: markerPulse 2s ease-out infinite;
        }

        .marker-ring-2 {
          animation-delay: 1s;
        }

        @keyframes markerPulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        .marker-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: var(--amber);
          border-radius: 50%;
          box-shadow: var(--glow-amber);
        }

        .coords-display {
          position: absolute;
          bottom: 0.75rem;
          left: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.6rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }

        .condition-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(10, 15, 28, 0.8);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 0.35rem 0.6rem;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--amber);
        }
      `}</style>
    </div>
  );
}
