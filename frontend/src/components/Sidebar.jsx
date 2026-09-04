import React from 'react';
import { Flame, ShieldAlert, Cpu, Filter, MapPin, Search } from 'lucide-react';
import { MOCK_THERMAL_EVENTS } from '../data/mockData';

export default function Sidebar({ 
  events = [], 
  selectedEvent, 
  setSelectedEvent, 
  filterCategory, 
  setFilterCategory 
}) {
  const categories = [
    'ALL',
    'Industrial Fire',
    'Mining Activity',
    'Forest Fire',
    'Agricultural Burning',
  ];

  const filteredEvents = events.filter(e => {
    if (filterCategory === 'ALL') return true;
    return e.classification?.predicted_category === filterCategory;
  });

  const getRiskColor = (score) => {
    if (score >= 70) return 'text-red-400 bg-red-950/60 border-red-800/80';
    if (score >= 45) return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
    return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
  };

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 h-full">
      {/* Search & Filter Header */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            NASA FIRMS Feed
          </span>
          <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
            {filteredEvents.length} Active
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`text-[10px] font-semibold px-2 py-1 rounded-md shrink-0 transition-colors ${
                filterCategory === cat
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Events' : cat.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Telemetry Event List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredEvents.map(event => {
          const isSelected = selectedEvent?.id === event.id;
          const score = event.risk_evaluation?.score || 0;

          return (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-850 border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950/60 border border-amber-800/40 px-1.5 py-0.5 rounded">
                  {event.id}
                </span>

                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${getRiskColor(score)}`}>
                  Risk {score}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-200 mt-1.5 leading-snug line-clamp-1">
                {event.name}
              </h4>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-1">
                <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                <span className="truncate">{event.osm_context?.nearest_infrastructure}</span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-800/80">
                <span>FRP: <strong className="text-amber-400">{event.firms_metadata?.frp_mw} MW</strong></span>
                <span>{event.persistence?.detected_days_last_7}/7 Days Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
