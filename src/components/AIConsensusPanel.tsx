interface AISource {
  name: string;
  confidence: number;
  prediction: string;
  temperature: number;
  status: 'analyzing' | 'complete' | 'syncing';
}

interface AIConsensusPanelProps {
  sources: AISource[];
  consensusTemp: number;
}

export function AIConsensusPanel({ sources, consensusTemp }: AIConsensusPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzing': return 'var(--amber)';
      case 'syncing': return 'var(--cyan)';
      case 'complete': return 'var(--green)';
      default: return 'var(--text-muted)';
    }
  };

  const getSourceAccent = (name: string) => {
    switch (name) {
      case 'PERPLEXITY': return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
      case 'GROK': return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' };
      case 'NANOBANANAPRO': return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' };
      default: return { color: 'var(--amber)', bg: 'rgba(245, 158, 11, 0.15)' };
    }
  };

  return (
    <div className="ai-panel panel panel-glow">
      {/* Consensus temperature display */}
      <div className="consensus-display">
        <div className="consensus-label">CONSENSUS TEMPERATURE</div>
        <div className="consensus-value">
          <span className="consensus-temp">{consensusTemp}</span>
          <span className="consensus-unit">°C</span>
        </div>
        <div className="consensus-triangulation">
          <svg viewBox="0 0 100 60" className="triangulation-svg">
            {/* Connecting lines */}
            <line x1="50" y1="10" x2="15" y2="50" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" strokeDasharray="4 2" />
            <line x1="50" y1="10" x2="85" y2="50" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" strokeDasharray="4 2" />
            <line x1="15" y1="50" x2="85" y2="50" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" strokeDasharray="4 2" />
            {/* Center point (consensus) */}
            <circle cx="50" cy="36" r="6" fill="var(--amber)" className="pulse-circle">
              <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Source points */}
            <circle cx="50" cy="10" r="4" fill="#8b5cf6" />
            <circle cx="15" cy="50" r="4" fill="#ef4444" />
            <circle cx="85" cy="50" r="4" fill="#fbbf24" />
          </svg>
        </div>
      </div>

      {/* AI Sources */}
      <div className="sources-grid">
        {sources.map((source) => {
          const accent = getSourceAccent(source.name);
          return (
            <div key={source.name} className="source-card" style={{ borderColor: accent.color }}>
              <div className="source-header">
                <div className="source-name" style={{ color: accent.color }}>
                  {source.name}
                </div>
                <div className="source-status" style={{ color: getStatusColor(source.status) }}>
                  <span className="status-dot" style={{ background: getStatusColor(source.status) }} />
                  {source.status.toUpperCase()}
                </div>
              </div>

              <div className="source-temp">
                <span className="source-temp-value">{source.temperature}°C</span>
              </div>

              <div className="confidence-section">
                <div className="confidence-label">CONFIDENCE</div>
                <div className="confidence-bar">
                  <div
                    className="confidence-fill"
                    style={{
                      width: `${source.confidence}%`,
                      background: accent.color
                    }}
                  />
                </div>
                <div className="confidence-value">{source.confidence}%</div>
              </div>

              <div className="source-prediction">
                {source.prediction}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .ai-panel {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        @media (min-width: 1024px) {
          .ai-panel {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        .consensus-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: rgba(10, 15, 28, 0.5);
          border: 1px solid rgba(245, 158, 11, 0.2);
          flex-shrink: 0;
        }

        @media (min-width: 1024px) {
          .consensus-display {
            padding: 1.5rem;
            min-width: 180px;
          }
        }

        .consensus-label {
          font-size: 0.6rem;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          margin-bottom: 0.5rem;
        }

        .consensus-value {
          display: flex;
          align-items: flex-start;
        }

        .consensus-temp {
          font-size: clamp(2.5rem, 8vw, 3.5rem);
          font-weight: 700;
          color: var(--amber);
          line-height: 1;
          text-shadow: var(--glow-amber);
        }

        .consensus-unit {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .consensus-triangulation {
          margin-top: 1rem;
          width: 100%;
          max-width: 120px;
        }

        .triangulation-svg {
          width: 100%;
          height: auto;
        }

        .sources-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        @media (min-width: 480px) {
          .sources-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 640px) {
          .sources-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .sources-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }

        .source-card {
          background: rgba(10, 15, 28, 0.5);
          border: 1px solid;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        @media (min-width: 768px) {
          .source-card {
            padding: 1rem;
            gap: 0.75rem;
          }
        }

        .source-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .source-name {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .source-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.55rem;
          letter-spacing: 0.05em;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: blink 1.5s ease-in-out infinite;
        }

        .source-temp {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        @media (min-width: 768px) {
          .source-temp {
            font-size: 1.75rem;
          }
        }

        .confidence-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .confidence-label {
          font-size: 0.55rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }

        .confidence-bar {
          flex: 1;
          height: 4px;
          background: var(--navy-light);
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          transition: width 0.5s ease;
        }

        .confidence-value {
          font-size: 0.7rem;
          color: var(--text-secondary);
          font-variant-numeric: tabular-nums;
          min-width: 35px;
          text-align: right;
        }

        .source-prediction {
          font-size: 0.65rem;
          color: var(--text-muted);
          line-height: 1.4;
          font-family: 'Crimson Pro', serif;
          font-style: italic;
        }

        @media (min-width: 768px) {
          .source-prediction {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}
