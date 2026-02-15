interface ConditionData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  condition: string;
  uvIndex: number;
  visibility: number;
}

interface CurrentConditionsProps {
  data: ConditionData;
  isLoading: boolean;
}

export function CurrentConditions({ data, isLoading }: CurrentConditionsProps) {
  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { label: 'LOW', color: 'var(--green)' };
    if (uv <= 5) return { label: 'MODERATE', color: 'var(--amber)' };
    if (uv <= 7) return { label: 'HIGH', color: 'var(--orange)' };
    return { label: 'EXTREME', color: 'var(--red)' };
  };

  const uvLevel = getUVLevel(data.uvIndex);

  return (
    <div className={`conditions-panel panel panel-glow ${isLoading ? 'loading-shimmer' : ''}`}>
      {/* Main temperature display */}
      <div className="temp-display">
        <div className="temp-value">
          <span className="temp-number">{data.temperature}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="temp-condition">{data.condition}</div>
      </div>

      {/* Metrics grid */}
      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-icon humidity-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
          <div className="metric-data">
            <span className="metric-value">{data.humidity}%</span>
            <span className="metric-label">HUMIDITY</span>
          </div>
        </div>

        <div className="metric">
          <div className="metric-icon wind-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
          </div>
          <div className="metric-data">
            <span className="metric-value">{data.windSpeed} km/h</span>
            <span className="metric-label">WIND</span>
          </div>
        </div>

        <div className="metric">
          <div className="metric-icon pressure-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className="metric-data">
            <span className="metric-value">{data.pressure} hPa</span>
            <span className="metric-label">PRESSURE</span>
          </div>
        </div>

        <div className="metric">
          <div className="metric-icon visibility-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div className="metric-data">
            <span className="metric-value">{data.visibility} km</span>
            <span className="metric-label">VISIBILITY</span>
          </div>
        </div>
      </div>

      {/* UV Index bar */}
      <div className="uv-section">
        <div className="uv-header">
          <span className="uv-label">UV INDEX</span>
          <span className="uv-level" style={{ color: uvLevel.color }}>{uvLevel.label}</span>
        </div>
        <div className="uv-bar">
          <div
            className="uv-fill"
            style={{
              width: `${(data.uvIndex / 11) * 100}%`,
              background: uvLevel.color
            }}
          />
        </div>
        <div className="uv-value">{data.uvIndex}/11</div>
      </div>

      <style>{`
        .conditions-panel {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .temp-display {
          text-align: center;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(245, 158, 11, 0.15);
        }

        .temp-value {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          line-height: 1;
        }

        .temp-number {
          font-size: clamp(3rem, 12vw, 4.5rem);
          font-weight: 700;
          color: var(--amber);
          text-shadow: var(--glow-amber);
        }

        .temp-unit {
          font-size: 1.5rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .temp-condition {
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        @media (min-width: 768px) {
          .metrics-grid {
            gap: 1rem;
          }
        }

        .metric {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem;
          background: rgba(10, 15, 28, 0.5);
          border: 1px solid rgba(245, 158, 11, 0.1);
        }

        @media (min-width: 768px) {
          .metric {
            gap: 0.75rem;
            padding: 0.75rem;
          }
        }

        .metric-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .metric-icon {
            width: 36px;
            height: 36px;
          }
        }

        .humidity-icon { color: var(--cyan); }
        .wind-icon { color: var(--text-secondary); }
        .pressure-icon { color: var(--amber); }
        .visibility-icon { color: var(--green); }

        .metric-data {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .metric-value {
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          font-weight: 600;
          color: var(--text-primary);
        }

        .metric-label {
          font-size: 0.55rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        @media (min-width: 768px) {
          .metric-label {
            font-size: 0.6rem;
          }
        }

        .uv-section {
          padding-top: 0.75rem;
          border-top: 1px solid rgba(245, 158, 11, 0.15);
        }

        .uv-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .uv-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .uv-level {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .uv-bar {
          height: 6px;
          background: var(--navy-light);
          position: relative;
          overflow: hidden;
        }

        .uv-fill {
          height: 100%;
          transition: width 0.5s ease;
          box-shadow: 0 0 10px currentColor;
        }

        .uv-value {
          margin-top: 0.35rem;
          font-size: 0.7rem;
          color: var(--text-secondary);
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  );
}
