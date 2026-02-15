import { useState, useEffect } from 'react';

interface ForecastHour {
  hour: number;
  temp: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'storm';
  precipitation: number;
}

const generateForecast = (): ForecastHour[] => {
  const conditions: Array<'clear' | 'cloudy' | 'rain' | 'storm'> = ['clear', 'cloudy', 'rain', 'storm'];
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    temp: Math.floor(Math.random() * 15) + 15 + Math.sin(i / 4) * 5,
    condition: conditions[Math.floor(Math.random() * 3)],
    precipitation: Math.floor(Math.random() * 60),
  }));
};

export function ForecastTimeline() {
  const [forecast, setForecast] = useState<ForecastHour[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    setForecast(generateForecast());
  }, [selectedDay]);

  const days = ['TODAY', 'TOMORROW', '+2 DAYS'];

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'clear':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        );
      case 'cloudy':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        );
      case 'rain':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2">
            <path d="M16 13v8M8 13v8M12 15v8M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
          </svg>
        );
      case 'storm':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
            <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
            <polyline points="13 11 9 17 15 17 11 23" />
          </svg>
        );
      default:
        return null;
    }
  };

  const maxTemp = Math.max(...forecast.map(f => f.temp));
  const minTemp = Math.min(...forecast.map(f => f.temp));
  const tempRange = maxTemp - minTemp || 1;

  return (
    <div className="forecast-panel panel panel-glow">
      {/* Day selector */}
      <div className="day-selector">
        {days.map((day, i) => (
          <button
            key={day}
            className={`day-button ${selectedDay === i ? 'active' : ''}`}
            onClick={() => setSelectedDay(i)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        <div className="timeline-scroll">
          {forecast.map((hour, i) => (
            <div key={i} className="hour-column" style={{ animationDelay: `${i * 0.03}s` }}>
              <div className="hour-time">
                {hour.hour.toString().padStart(2, '0')}:00
              </div>
              <div className="hour-icon">
                {getConditionIcon(hour.condition)}
              </div>
              <div className="hour-temp">
                {Math.round(hour.temp)}°
              </div>
              <div className="temp-bar-container">
                <div
                  className="temp-bar"
                  style={{
                    height: `${((hour.temp - minTemp) / tempRange) * 100}%`,
                  }}
                />
              </div>
              <div className="hour-precip">
                <span className="precip-icon">💧</span>
                <span>{hour.precipitation}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="forecast-summary">
        <div className="summary-stat">
          <span className="stat-label">HIGH</span>
          <span className="stat-value high">{Math.round(maxTemp)}°C</span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">LOW</span>
          <span className="stat-value low">{Math.round(minTemp)}°C</span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">AVG PRECIP</span>
          <span className="stat-value precip">
            {Math.round(forecast.reduce((a, b) => a + b.precipitation, 0) / (forecast.length || 1))}%
          </span>
        </div>
      </div>

      <style>{`
        .forecast-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .day-selector {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .day-button {
          background: transparent;
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: var(--text-secondary);
          font-family: 'Oxanium', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .day-button:hover {
          border-color: var(--amber);
          color: var(--amber);
        }

        .day-button.active {
          background: var(--amber);
          border-color: var(--amber);
          color: var(--navy-deep);
        }

        .timeline-container {
          overflow-x: auto;
          margin: 0 -1rem;
          padding: 0 1rem;
          scrollbar-width: thin;
          scrollbar-color: var(--amber) var(--navy-light);
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 768px) {
          .timeline-container {
            margin: 0 -1.5rem;
            padding: 0 1.5rem;
          }
        }

        .timeline-container::-webkit-scrollbar {
          height: 6px;
        }

        .timeline-container::-webkit-scrollbar-track {
          background: var(--navy-light);
        }

        .timeline-container::-webkit-scrollbar-thumb {
          background: var(--amber);
        }

        .timeline-scroll {
          display: flex;
          gap: 0.25rem;
          padding-bottom: 0.5rem;
          min-width: max-content;
        }

        @media (min-width: 768px) {
          .timeline-scroll {
            gap: 0.5rem;
          }
        }

        .hour-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.4rem;
          background: rgba(10, 15, 28, 0.5);
          border: 1px solid rgba(245, 158, 11, 0.1);
          min-width: 45px;
          animation: fadeInUp 0.5s ease-out both;
        }

        @media (min-width: 768px) {
          .hour-column {
            gap: 0.5rem;
            padding: 0.75rem 0.5rem;
            min-width: 55px;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hour-time {
          font-size: 0.55rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }

        @media (min-width: 768px) {
          .hour-time {
            font-size: 0.6rem;
          }
        }

        .hour-icon {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hour-temp {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        @media (min-width: 768px) {
          .hour-temp {
            font-size: 1rem;
          }
        }

        .temp-bar-container {
          width: 100%;
          height: 40px;
          background: var(--navy-light);
          position: relative;
          display: flex;
          align-items: flex-end;
        }

        @media (min-width: 768px) {
          .temp-bar-container {
            height: 50px;
          }
        }

        .temp-bar {
          width: 100%;
          background: linear-gradient(to top, var(--amber-dim), var(--amber));
          transition: height 0.3s ease;
          min-height: 4px;
        }

        .hour-precip {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          font-size: 0.5rem;
          color: var(--cyan);
        }

        @media (min-width: 768px) {
          .hour-precip {
            gap: 0.25rem;
            font-size: 0.55rem;
          }
        }

        .precip-icon {
          font-size: 0.5rem;
        }

        .forecast-summary {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(245, 158, 11, 0.15);
          flex-wrap: wrap;
        }

        @media (min-width: 768px) {
          .forecast-summary {
            gap: 2rem;
          }
        }

        .summary-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .stat-label {
          font-size: 0.55rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        @media (min-width: 768px) {
          .stat-label {
            font-size: 0.6rem;
          }
        }

        .stat-value {
          font-size: 1.1rem;
          font-weight: 700;
        }

        @media (min-width: 768px) {
          .stat-value {
            font-size: 1.25rem;
          }
        }

        .stat-value.high { color: var(--orange); }
        .stat-value.low { color: var(--cyan); }
        .stat-value.precip { color: var(--cyan); }
      `}</style>
    </div>
  );
}
