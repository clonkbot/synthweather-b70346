import { useState, useEffect } from 'react';
import { WeatherMap } from './components/WeatherMap';
import { AIConsensusPanel } from './components/AIConsensusPanel';
import { ForecastTimeline } from './components/ForecastTimeline';
import { CurrentConditions } from './components/CurrentConditions';
import { LocationSearch } from './components/LocationSearch';
import './styles.css';

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  condition: string;
  uvIndex: number;
  visibility: number;
}

interface AISource {
  name: string;
  confidence: number;
  prediction: string;
  temperature: number;
  status: 'analyzing' | 'complete' | 'syncing';
}

const generateWeatherData = (location: string): WeatherData => {
  const conditions = ['Clear', 'Partly Cloudy', 'Overcast', 'Light Rain', 'Thunderstorm', 'Fog'];
  return {
    location,
    temperature: Math.floor(Math.random() * 30) + 10,
    humidity: Math.floor(Math.random() * 40) + 40,
    windSpeed: Math.floor(Math.random() * 25) + 5,
    pressure: Math.floor(Math.random() * 40) + 1000,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    uvIndex: Math.floor(Math.random() * 10) + 1,
    visibility: Math.floor(Math.random() * 15) + 5,
  };
};

const generateAISources = (): AISource[] => [
  {
    name: 'PERPLEXITY',
    confidence: Math.floor(Math.random() * 15) + 85,
    prediction: 'Clear skies expected with gradual temperature increase',
    temperature: Math.floor(Math.random() * 5) + 22,
    status: 'complete',
  },
  {
    name: 'GROK',
    confidence: Math.floor(Math.random() * 15) + 82,
    prediction: 'High pressure system maintaining stable conditions',
    temperature: Math.floor(Math.random() * 5) + 21,
    status: 'complete',
  },
  {
    name: 'NANOBANANAPRO',
    confidence: Math.floor(Math.random() * 15) + 88,
    prediction: 'Optimal atmospheric conditions, low precipitation probability',
    temperature: Math.floor(Math.random() * 5) + 23,
    status: 'complete',
  },
];

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>(generateWeatherData('San Francisco, CA'));
  const [aiSources, setAISources] = useState<AISource[]>(generateAISources());
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLocationChange = (location: string) => {
    setIsLoading(true);
    setAISources(prev => prev.map(s => ({ ...s, status: 'analyzing' as const })));

    setTimeout(() => {
      setAISources(prev => prev.map(s => ({ ...s, status: 'syncing' as const })));
    }, 800);

    setTimeout(() => {
      setWeatherData(generateWeatherData(location));
      setAISources(generateAISources());
      setIsLoading(false);
    }, 2000);
  };

  const consensusTemp = Math.round(
    aiSources.reduce((acc, src) => acc + src.temperature, 0) / aiSources.length
  );
  const avgConfidence = Math.round(
    aiSources.reduce((acc, src) => acc + src.confidence, 0) / aiSources.length
  );

  return (
    <div className="app-container">
      <div className="scanlines" />
      <div className="noise-overlay" />

      <header className="header">
        <div className="header-left">
          <div className="logo-mark">
            <div className="logo-ring" />
            <div className="logo-core" />
          </div>
          <div className="header-title">
            <h1>SYNTH<span className="text-amber">WEATHER</span></h1>
            <p className="header-subtitle">MULTI-AI CONSENSUS ENGINE</p>
          </div>
        </div>
        <div className="header-center">
          <LocationSearch onSearch={handleLocationChange} isLoading={isLoading} />
        </div>
        <div className="header-right">
          <div className="system-time">
            <span className="time-label">SYSTEM TIME</span>
            <span className="time-value">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
          <div className="status-indicator">
            <span className="status-dot" />
            <span>ONLINE</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="grid-layout">
          <section className="map-section">
            <div className="section-header">
              <span className="section-tag">SECTOR MAP</span>
              <span className="section-coords">{weatherData.location}</span>
            </div>
            <WeatherMap condition={weatherData.condition} isLoading={isLoading} />
          </section>

          <section className="conditions-section">
            <div className="section-header">
              <span className="section-tag">CURRENT CONDITIONS</span>
              <span className="section-status">LIVE</span>
            </div>
            <CurrentConditions data={weatherData} isLoading={isLoading} />
          </section>

          <section className="ai-section">
            <div className="section-header">
              <span className="section-tag">AI CONSENSUS MATRIX</span>
              <span className="consensus-badge">{avgConfidence}% AGREEMENT</span>
            </div>
            <AIConsensusPanel sources={aiSources} consensusTemp={consensusTemp} />
          </section>

          <section className="forecast-section">
            <div className="section-header">
              <span className="section-tag">72-HOUR FORECAST</span>
              <span className="section-tag-small">PREDICTIVE MODEL</span>
            </div>
            <ForecastTimeline />
          </section>
        </div>
      </main>

      <footer className="footer">
        <span>Requested by @stringer_kade · Built by @clonkbot</span>
      </footer>
    </div>
  );
}

export default App;
