import { useState } from 'react';

interface LocationSearchProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

export function LocationSearch({ onSearch, isLoading }: LocationSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-wrapper">
        <div className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter location coordinates..."
          className="search-input"
          disabled={isLoading}
        />
        <button type="submit" className="search-button" disabled={isLoading || !query.trim()}>
          {isLoading ? (
            <span className="search-loading">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
            </span>
          ) : (
            'SCAN'
          )}
        </button>
      </div>
      <style>{`
        .search-form {
          width: 100%;
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          background: rgba(10, 15, 28, 0.8);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 0.25rem;
          gap: 0.5rem;
        }

        .search-icon {
          color: var(--text-muted);
          padding-left: 0.75rem;
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: 'Oxanium', sans-serif;
          font-size: 0.85rem;
          padding: 0.5rem;
          min-width: 0;
        }

        .search-input::placeholder {
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .search-input:disabled {
          opacity: 0.5;
        }

        .search-button {
          background: var(--amber);
          border: none;
          color: var(--navy-deep);
          font-family: 'Oxanium', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 70px;
          flex-shrink: 0;
        }

        .search-button:hover:not(:disabled) {
          background: var(--orange);
        }

        .search-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .search-loading {
          display: flex;
          gap: 3px;
          justify-content: center;
        }

        .loading-dot {
          width: 4px;
          height: 4px;
          background: var(--navy-deep);
          border-radius: 50%;
          animation: loadingBounce 0.6s ease-in-out infinite;
        }

        .loading-dot:nth-child(2) { animation-delay: 0.1s; }
        .loading-dot:nth-child(3) { animation-delay: 0.2s; }

        @keyframes loadingBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </form>
  );
}
