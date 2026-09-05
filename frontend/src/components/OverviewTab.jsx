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
    <div className="h-full w-full space-y-4 overflow-y-auto p-4">
      <KpiCards events={events} />

      <InvestigationAlert event={criticalEvent} onSelectEvent={setSelectedEvent} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <section className="flex h-[390px] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl xl:h-[460px]">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-2.5">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                Live CartoDB Dark GIS Map
              </h3>
              <span className="font-mono text-[10px] text-slate-400">{events.length} Telemetry Points</span>
            </div>
            <div className="relative min-h-0 flex-1">
              <GISMap events={events} selectedEvent={selectedEvent} onSelectEvent={setSelectedEvent} />
            </div>
          </section>

          <section className="shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Active Event Queue</h3>
              <span className="font-mono text-[10px] text-slate-400">Select to inspect</span>
            </div>
            <div className="grid gap-2 p-3 sm:grid-cols-2">
              {events.slice(0, 6).map((event) => {
                const isSelected = selectedEvent?.id === event.id;
                const score = event.risk_evaluation?.score ?? 0;
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className={`border-l-2 p-3 text-left transition-colors ${isSelected ? 'border-amber-400 bg-slate-800' : 'border-slate-700 bg-slate-950/60 hover:border-amber-400/70 hover:bg-slate-800/70'}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-amber-400">{event.id}</span>
                      <span className="font-mono text-[10px] text-slate-400">Risk {score}</span>
                    </div>
                    <p className="mt-1 truncate text-xs font-semibold text-slate-200">{event.name}</p>
                    <p className="mt-1 truncate font-mono text-[10px] text-slate-500">{event.persistence?.detected_days_last_7}/7 days active</p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-3">
          <section className="min-h-[520px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="border-b border-slate-800 bg-slate-950/90 px-4 py-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Hotspot Investigation Inspector</h3>
            </div>
            <div className="h-[calc(100%-41px)] overflow-y-auto">
              <EventDetailPanel event={selectedEvent} onOpenDossier={onOpenDossier} onOpenReport={onOpenReport} />
            </div>
          </section>

          {selectedEvent && <GeospatialContext event={selectedEvent} />}
          {selectedEvent && <ExplanationSection event={selectedEvent} />}
        </div>
      </div>
    </div>
  );
}
