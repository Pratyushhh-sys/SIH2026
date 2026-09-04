import React from 'react';
import { Activity, ShieldAlert, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import TemporalAnalysis from './TemporalAnalysis';

export default function ThreatMatrixTab({ events, onSelectEvent }) {
  const criticalEvents = events.filter(e => e.risk_evaluation?.score >= 70);
  const mediumEvents = events.filter(e => e.risk_evaluation?.score >= 45 && e.risk_evaluation?.score < 70);
  const lowEvents = events.filter(e => e.risk_evaluation?.score < 45);

  return (
    <div className="h-full w-full p-6 bg-slate-950 overflow-y-auto space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-400" />
          Threat Matrix & Risk Analytics (SIH PS 26162)
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Geospatial Risk Distribution across Active Telemetry Points
        </p>
      </div>

      {/* Top 3 Tier Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-red-800/80 rounded-xl p-4 shadow-xl">
          <span className="text-xs font-mono font-bold text-red-400 uppercase">Critical Priority Tier (≥70)</span>
          <p className="text-3xl font-black text-red-400 font-mono mt-1">{criticalEvents.length}</p>
          <p className="text-xs text-slate-400 mt-1">Immediate Field Dispatch Recommended</p>
        </div>

        <div className="bg-slate-900 border border-amber-800/80 rounded-xl p-4 shadow-xl">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase">Medium Priority Tier (45-69)</span>
          <p className="text-3xl font-black text-amber-400 font-mono mt-1">{mediumEvents.length}</p>
          <p className="text-xs text-slate-400 mt-1">Sentinel-2 SWIR Satellite Monitoring</p>
        </div>

        <div className="bg-slate-900 border border-emerald-800/80 rounded-xl p-4 shadow-xl">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Low Priority Tier (&lt;45)</span>
          <p className="text-3xl font-black text-emerald-400 font-mono mt-1">{lowEvents.length}</p>
          <p className="text-xs text-slate-400 mt-1">Routine Logged / Seasonal Agricultural</p>
        </div>
      </div>

      {/* 7-Day Trend Chart */}
      <TemporalAnalysis events={events} />

      {/* Priority Action Ranking Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Ranked High-Risk Investigation Queue
        </h3>

        <div className="space-y-2">
          {events.sort((a,b) => (b.risk_evaluation?.score || 0) - (a.risk_evaluation?.score || 0)).slice(0, 5).map((ev, idx) => (
            <div key={ev.id} className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded bg-red-950 text-red-400 font-bold flex items-center justify-center text-[10px]">
                  #{idx + 1}
                </span>
                <div>
                  <span className="font-bold text-slate-200 font-sans">{ev.name}</span>
                  <span className="text-slate-500 block text-[10px]">{ev.osm_context?.nearest_infrastructure}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-amber-400">{ev.classification?.predicted_category}</span>
                <span className="font-bold text-red-400 text-sm">{ev.risk_evaluation?.score}</span>
                <button
                  onClick={() => onSelectEvent(ev)}
                  className="bg-amber-500 text-slate-950 font-bold px-2 py-1 rounded text-[10px]"
                >
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
