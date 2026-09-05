import React from 'react';
import { ShieldAlert, MapPin, Activity, Flame, Building2, Layers, CheckCircle2 } from 'lucide-react';
import RiskGauge from './RiskGauge';
import ClassificationCard from './ClassificationCard';
import SatellitePanel from './SatellitePanel';

export default function EventDetailPanel({ event, onOpenDossier, onOpenReport }) {
  if (!event) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center text-slate-500">
        <p>Select a thermal event from the map or feed to view detailed investigation metrics.</p>
      </div>
    );
  }

  const { firms_metadata, osm_context, persistence, risk_evaluation } = event;

  return (
    <div className="h-full flex flex-col overflow-y-auto p-4 space-y-4 bg-slate-950/80">
      
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded uppercase font-semibold">
              Event Ref: {event.id}
            </span>
            <h2 className="text-base font-bold text-slate-100 mt-1 leading-tight">
              {event.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{event.latitude.toFixed(4)}°N, {event.longitude.toFixed(4)}°E</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onOpenReport}
              className="bg-sky-600 hover:bg-sky-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors shadow-lg shadow-sky-600/20"
            >
              Generate Report
            </button>

          </div>
        </div>
      </div>

      {/* 4-Factor Risk Engine Gauge */}
      <RiskGauge risk={risk_evaluation} />

      {/* Zero-Training AI Classification Card */}
      <ClassificationCard event={event} />

      {/* FIRMS Satellite Telemetry Specs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            NASA FIRMS Satellite Telemetry
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Brightness Temp</span>
            <span className="text-slate-200 font-mono font-bold">{firms_metadata?.brightness} K</span>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Radiative Power (FRP)</span>
            <span className="text-amber-400 font-mono font-bold">{firms_metadata?.frp_mw} MW</span>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Detection Confidence</span>
            <span className="text-emerald-400 font-mono font-bold">{firms_metadata?.confidence_pct}%</span>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Satellite Source</span>
            <span className="text-sky-300 font-mono font-semibold">{firms_metadata?.satellite}</span>
          </div>
        </div>
      </div>

      {/* Satellite Imagery Panel */}
      <SatellitePanel event={event} />

    </div>
  );
}
