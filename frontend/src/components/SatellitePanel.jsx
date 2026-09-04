import React from 'react';
import { Satellite, Eye, Cloud, Sparkles, ExternalLink } from 'lucide-react';

export default function SatellitePanel({ event }) {
  if (!event) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Satellite className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Sentinel-2 & Landsat-9 Satellite Context
          </h3>
        </div>
        <span className="text-[10px] font-mono bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">
          20m SWIR Match
        </span>
      </div>

      {/* Satellite Imagery Mock Display */}
      <div className="relative bg-slate-950 rounded-lg overflow-hidden border border-slate-800 h-36 flex items-center justify-center">
        {/* Synthetic SWIR Satellite Heat Map Graphic */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/40 via-red-950/30 to-slate-950 opacity-80"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20"></div>

        <div className="relative z-10 text-center space-y-1">
          <Sparkles className="w-6 h-6 text-amber-400 mx-auto animate-pulse" />
          <p className="text-xs font-mono text-slate-300 font-bold">Sentinel-2B SWIR Heat Band (B12)</p>
          <p className="text-[10px] font-mono text-slate-500">Reflectance Coefficient: 0.842 | Cloud Cover: 4.2%</p>
        </div>

        <div className="absolute bottom-2 right-2 z-10">
          <span className="text-[9px] font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded">
            Tile: T43QGF
          </span>
        </div>
      </div>

      {/* Metadata list */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="text-slate-500 text-[10px] block">Landsat-9 OLI Thermal</span>
          <span className="text-slate-300 font-bold">348.2 K (Band 10)</span>
        </div>
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="text-slate-500 text-[10px] block">Last Satellite Pass</span>
          <span className="text-sky-300 font-bold">Today 10:42 UTC</span>
        </div>
      </div>
    </div>
  );
}
