import React from 'react';
import { Flame, ShieldAlert, Cpu, Clock, Layers } from 'lucide-react';

export default function KpiCards({ events }) {
  const total = events.length;
  const criticalCount = events.filter(e => e.risk_evaluation?.score >= 70).length;
  const industrialCount = events.filter(e => e.classification?.predicted_category === 'Industrial Fire').length;
  const persistentCount = events.filter(e => e.persistence?.detected_days_last_7 >= 5).length;

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Total Anomaly Hotspots */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Active Telemetry Events</span>
          <p className="text-2xl font-black text-slate-100 font-mono mt-0.5">{total}</p>
          <span className="text-[10px] text-slate-500">NASA FIRMS Ingestion</span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <Flame className="w-5 h-5 text-amber-400" />
        </div>
      </div>

      {/* Critical High Risk Priorities */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Critical Priority Hotspots</span>
          <p className="text-2xl font-black text-red-400 font-mono mt-0.5">{criticalCount}</p>
          <span className="text-[10px] text-red-400/80">Risk Score ≥ 70 / 100</span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-red-400" />
        </div>
      </div>

      {/* Industrial Confirmed */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Industrial Proximity</span>
          <p className="text-2xl font-black text-sky-400 font-mono mt-0.5">{industrialCount}</p>
          <span className="text-[10px] text-slate-500">Confirmed Asset Buffer</span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
          <Cpu className="w-5 h-5 text-sky-400" />
        </div>
      </div>

      {/* 7-Day Persistent Hotspots */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Persistent Hotspots</span>
          <p className="text-2xl font-black text-purple-400 font-mono mt-0.5">{persistentCount}</p>
          <span className="text-[10px] text-slate-500">≥ 5 / 7 Days Active</span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
          <Clock className="w-5 h-5 text-purple-400" />
        </div>
      </div>
    </div>
  );
}
