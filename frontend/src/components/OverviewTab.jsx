import React from 'react';
import GISMap from './GISMap';
import EventDetailPanel from './EventDetailPanel';
import GeospatialContext from './GeospatialContext';
import ExplanationSection from './ExplanationSection';
import KpiCards from './KpiCards';
import InvestigationAlert from './InvestigationAlert';

export default function OverviewTab({ 
  events, 
  selectedEvent, 
  setSelectedEvent, 
  onOpenDossier,
  onOpenReport
}) {
  const criticalEvent = events.find(e => e.risk_evaluation?.score >= 90) || events[0];

  return (
    <div className="h-full w-full flex flex-col p-4 space-y-4 overflow-y-auto">
      
      {/* Critical Highlight Alert Banner */}
      <InvestigationAlert 
        event={criticalEvent}
        onSelectEvent={setSelectedEvent}
      />

      {/* KPI Stats Bar */}
      <KpiCards events={events} />

      {/* Central Interactive Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-[550px]">
        
        {/* Left Column: Interactive GIS Map */}
        <div className="col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
          <div className="bg-slate-950/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between z-10 shrink-0">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Live CartoDB Dark GIS Map — Hotspot Buffers & SWIR Overlays
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              {events.length} Telemetry Points Rendered
            </span>
          </div>

          <div className="flex-1 relative">
            <GISMap 
              events={events}
              selectedEvent={selectedEvent}
              onSelectEvent={setSelectedEvent}
            />
          </div>
        </div>

        {/* Right Column: Selected Hotspot Deep Dive */}
        <div className="col-span-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-slate-950/90 px-4 py-2.5 border-b border-slate-800 shrink-0">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Hotspot Investigation Inspector
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto">
            <EventDetailPanel 
              event={selectedEvent}
              onOpenDossier={onOpenDossier}
              onOpenReport={onOpenReport}
            />
          </div>
        </div>

      </div>

      {/* Bottom Row: Context & Explainability Sections */}
      {selectedEvent && (
        <div className="grid grid-cols-2 gap-4">
          <GeospatialContext event={selectedEvent} />
          <ExplanationSection event={selectedEvent} />
        </div>
      )}
    </div>
  );
}
