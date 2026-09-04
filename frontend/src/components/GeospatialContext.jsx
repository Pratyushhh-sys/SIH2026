import React from 'react';
import { Building2, Navigation, Layers, Clock, AlertTriangle } from 'lucide-react';

export default function GeospatialContext({ event }) {
  if (!event) return null;

  const { osm_context, persistence } = event;

  const getDistanceBadge = (meters) => {
    if (meters <= 200) return 'bg-red-950/80 text-red-400 border-red-700/60';
    if (meters <= 800) return 'bg-amber-950/80 text-amber-400 border-amber-700/60';
    return 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-4">
      
      {/* Infrastructure Spatial Proximity */}
      <div>
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3">
          <Building2 className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            OpenStreetMap Spatial Proximity Context
          </h3>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Primary Asset Nearby</span>
              <p className="text-sm font-bold text-slate-200 leading-tight">
                {osm_context?.nearest_infrastructure}
              </p>
            </div>
            
            <span className={`text-xs font-mono font-bold px-2 py-1 rounded border shrink-0 ${getDistanceBadge(osm_context?.distance_meters)}`}>
              {osm_context?.distance_meters}m Away
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1 border-t border-slate-800/80">
            <div>
              <span className="text-slate-500 text-[10px]">Asset Type: </span>
              <span className="text-slate-300">{osm_context?.infrastructure_type}</span>
            </div>
          </div>

          {osm_context?.secondary_infrastructure && (
            <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/50">
              <span className="text-slate-500 text-[10px]">Secondary Asset: </span>
              <span className="text-slate-300 font-mono">{osm_context.secondary_infrastructure}</span>
            </div>
          )}
        </div>
      </div>

      {/* 7-Day Temporal Persistence */}
      <div>
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3">
          <Clock className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            7-Day Temporal Persistence Analysis
          </h3>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium">Detection Frequency (Last 7 Days)</span>
            <span className="text-sm font-mono font-bold text-amber-400">
              {persistence?.detected_days_last_7} / 7 Days Active
            </span>
          </div>

          {/* 7-day visual pill bar */}
          <div className="grid grid-cols-7 gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const isActive = day <= (persistence?.detected_days_last_7 || 0);
              return (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div 
                    className={`w-full h-3 rounded-sm ${
                      isActive ? 'bg-amber-500 shadow-sm shadow-amber-500/50' : 'bg-slate-800'
                    }`}
                  ></div>
                  <span className="text-[9px] font-mono text-slate-500">D{day}</span>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 pt-1 border-t border-slate-800">
            <span className="text-slate-500 text-[10px]">Historical Pattern: </span>
            <span className="text-amber-300 font-mono">{persistence?.historical_pattern}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
