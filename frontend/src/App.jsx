import React, { useState, useEffect } from 'react';
import HeaderBar from './components/HeaderBar';
import OverviewTab from './components/OverviewTab';
import DossierModal from './components/DossierModal';
import ReportModal from './components/ReportModal';
import { MOCK_THERMAL_EVENTS } from './data/mockData';
import { enrichEvent } from './utils/analytics';

export default function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLiveApiConnected, setIsLiveApiConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchTelemetryEvents() {
      try {
        const response = await fetch('/api/events');
        if (response.ok) {
          const data = await response.json();
          const enriched = data.events.map(enrichEvent);
          setEvents(enriched);
          const preferredEvent = enriched.find((event) => event.id === 'TH-001') || enriched[0];
          if (preferredEvent) {
            setSelectedEvent(preferredEvent);
          }
          setIsLiveApiConnected(true);
        } else {
          throw new Error('Backend API returned non-200');
        }
      } catch (err) {
        console.warn('FastAPI backend offline. Using fallback client-side analytics engine.', err);
        const enriched = MOCK_THERMAL_EVENTS.map(enrichEvent);
        setEvents(enriched);
        const preferredEvent = enriched.find((event) => event.id === 'TH-001') || enriched[0];
        if (preferredEvent) {
          setSelectedEvent(preferredEvent);
        }
        setIsLiveApiConnected(false);
      } finally {
        setLoading(false);
      }
    }

    fetchTelemetryEvents();
  }, []);

  return (
    <div className="app-shell">
      <HeaderBar events={events} isLiveApiConnected={isLiveApiConnected} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSelectEvent={setSelectedEvent} />

      <main>
        {loading ? (
          <div className="loading-state">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              <p className="text-sm font-mono tracking-[0.2em] text-slate-500">LOADING SATELLITE TELEMETRY...</p>
            </div>
          </div>
        ) : (
          <OverviewTab
            events={events}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            onOpenDossier={() => setIsDossierOpen(true)}
            onOpenReport={() => setIsReportOpen(true)}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {isDossierOpen && selectedEvent && (
        <DossierModal event={selectedEvent} onClose={() => setIsDossierOpen(false)} />
      )}

      {isReportOpen && selectedEvent && (
        <ReportModal event={selectedEvent} onClose={() => setIsReportOpen(false)} />
      )}
    </div>
  );
}
