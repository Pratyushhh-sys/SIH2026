import React from 'react';
import { Map, ListFilter, Activity, Server } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, totalEvents }) {
  const tabs = [
    { id: 'overview', label: 'GIS Dashboard & Investigation', icon: Map },
    { id: 'telemetry', label: 'NASA FIRMS Telemetry Feed', icon: ListFilter, count: totalEvents },
    { id: 'matrix', label: 'Threat Matrix & Analytics', icon: Activity },
    { id: 'nodes', label: 'System Architecture & Services', icon: Server },
  ];

  return (
    <nav className="h-11 bg-slate-950 border-b border-slate-800 px-6 flex items-center gap-2 shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isActive
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
