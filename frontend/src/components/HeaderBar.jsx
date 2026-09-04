import React from 'react';
import { Flame, ShieldAlert, Cpu, Radio, Wifi, WifiOff } from 'lucide-react';

export default function HeaderBar({ events, isLiveApiConnected }) {
  const highRiskCount = events.filter(e => e.risk_evaluation?.score >= 70).length;
  const industrialCount = events.filter(e => e.classification?.predicted_category === 'Industrial Fire').length;

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0 shadow-md">
      {/* Brand & System Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Flame className="w-5 h-5 text-slate-950 fill-slate-950" />
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-black text-slate-100 tracking-wide font-sans">
              INDUSTRIAL THERMAL INTELLIGENCE SYSTEM
            </h1>
            <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
              SIH PS 26162
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            NASA FIRMS Satellite Telemetry & OpenStreetMap Spatial Risk Engine
          </p>
        </div>
      </div>

      {/* Quick Summary KPIs */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <div className="text-xs">
            <span className="text-slate-400 block text-[10px]">High Priority Hotspots</span>
            <span className="font-mono font-bold text-red-400">{highRiskCount} / {events.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <Cpu className="w-4 h-4 text-sky-400" />
          <div className="text-xs">
            <span className="text-slate-400 block text-[10px]">Industrial Confirmed</span>
            <span className="font-mono font-bold text-sky-400">{industrialCount} Events</span>
          </div>
        </div>

        {/* Backend API Connection Status Pill */}
        <div className="flex items-center gap-2">
          {isLiveApiConnected ? (
            <div className="flex items-center gap-1.5 text-xs font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              FastAPI Live
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-mono bg-amber-950/80 text-amber-400 border border-amber-800/80 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Demonstration Mode (Client Analytics)
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
