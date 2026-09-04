import React, { useState, useEffect } from 'react';
import HeaderBar from './components/HeaderBar';
import Navbar from './components/Navbar';
import OverviewTab from './components/OverviewTab';
import TelemetryFeedsTab from './components/TelemetryFeedsTab';
import ThreatMatrixTab from './components/ThreatMatrixTab';
import SystemNodesTab from './components/SystemNodesTab';
import DossierModal from './components/DossierModal';
import ReportModal from './components/ReportModal';
import { MOCK_THERMAL_EVENTS } from './data/mockData';
import { calculateRisk, classifyEvent } from './utils/analytics';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLiveApiConnected, setIsLiveApiConnected] = useState(false);

  useEffect(() => {
    async function fetchTelemetryEvents() {
      try {
        const response = await fetch('/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
          if (data.events.length > 0) {
            setSelectedEvent(data.events[0]);
          }
          setIsLiveApiConnected(true);
        } else {
          throw new Error('Backend API returned non-200');
        }
      } catch (err) {
        console.warn('FastAPI backend offline. Using fallback client-side analytics engine.', err);
        const enriched = MOCK_THERMAL_EVENTS.map(ev => {
          const classification = classifyEvent(ev);
          const risk_evaluation = calculateRisk(ev, classification);
          return {
            ...ev,
            classification,
            risk_evaluation
          };
        });
        setEvents(enriched);
        if (enriched.length > 0) {
          setSelectedEvent(enriched[0]);
        }
        setIsLiveApiConnected(false);
      } finally {
        setLoading(false);
      }
    }

    fetchTelemetryEvents();
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Top System Header */}
      <HeaderBar 
        events={events}
        isLiveApiConnected={isLiveApiConnected}
      />

      {/* Main Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        totalEvents={events.length}
      />

      {/* Tab Content Container */}
      <main className="flex-1 overflow-hidden relative">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center bg-slate-950">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 text-sm font-mono tracking-wider">LOADING SATELLITE TELEMETRY...</p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewTab 
                events={events}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                onOpenDossier={() => setIsDossierOpen(true)}
                onOpenReport={() => setIsReportOpen(true)}
              />
            )}

            {activeTab === 'telemetry' && (
              <TelemetryFeedsTab 
                events={events}
                onSelectEvent={(ev) => {
                  setSelectedEvent(ev);
                  setActiveTab('overview');
                }}
              />
            )}

            {activeTab === 'matrix' && (
              <ThreatMatrixTab 
                events={events}
                onSelectEvent={(ev) => {
                  setSelectedEvent(ev);
                  setActiveTab('overview');
                }}
              />
            )}

            {activeTab === 'nodes' && (
              <SystemNodesTab />
            )}
          </>
        )}
      </main>

      {/* Printable Dossier Modal */}
      {isDossierOpen && selectedEvent && (
        <DossierModal 
          event={selectedEvent} 
          onClose={() => setIsDossierOpen(false)} 
        />
      )}

      {/* Report Modal */}
      {isReportOpen && selectedEvent && (
        <ReportModal 
          event={selectedEvent} 
          onClose={() => setIsReportOpen(false)} 
        />
      )}
    </div>
  );
}
