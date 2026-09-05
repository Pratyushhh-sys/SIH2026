import React from 'react';
import { AlertOctagon, ArrowRight, ShieldAlert } from 'lucide-react';

export default function InvestigationAlert({ event, onSelectEvent }) {
  if (!event) return null;

  return (
    <div className="stitch-investigation-alert flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0">
          <AlertOctagon className="w-6 h-6 text-red-500 animate-pulse" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
              CRITICAL ANOMALY ALERT
            </span>
            <span className="text-xs text-slate-400 font-mono">Ref: {event.id}</span>
          </div>
          
          <h3 className="text-sm font-bold text-slate-100 mt-0.5">
            {event.name}
          </h3>
          
          <p className="text-xs text-slate-300 font-mono mt-0.5">
            High FRP ({event.firms_metadata?.frp_mw} MW) within {event.osm_context?.distance_meters}m of {event.osm_context?.nearest_infrastructure}
          </p>
        </div>
      </div>

      <button
        onClick={() => onSelectEvent(event)}
        className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors shrink-0 shadow-lg shadow-red-600/30"
      >
        <span>Focus Hotspot</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
