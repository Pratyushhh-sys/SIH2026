import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function RiskGauge({ risk }) {
  if (!risk) return null;

  const score = risk.score || 0;
  
  const getBadgeStyle = (tier) => {
    if (tier?.includes('HIGH') || tier?.includes('CRITICAL')) {
      return 'bg-red-950/80 text-red-400 border-red-700/60';
    }
    if (tier?.includes('MEDIUM')) {
      return 'bg-amber-950/80 text-amber-400 border-amber-700/60';
    }
    return 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          Explainable 4-Factor Risk Engine
        </h3>

        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getBadgeStyle(risk.tier)}`}>
          {risk.tier} RISK
        </span>
      </div>

      {/* Main Score Bar */}
      <div className="space-y-1">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-slate-400">Composite Risk Score</span>
          <span className="font-mono text-xl font-black text-red-400">{score}<span className="text-xs text-slate-500">/100</span></span>
        </div>

        <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-600 transition-all duration-500"
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {/* Breakdown Submetrics */}
      <div className="grid grid-cols-4 gap-1.5 pt-1 text-[10px] font-mono">
        <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800 text-center">
          <span className="text-slate-500 block">Thermal</span>
          <span className="text-amber-400 font-bold">{risk.breakdown?.thermal_score}</span>
        </div>
        <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800 text-center">
          <span className="text-slate-500 block">Persist.</span>
          <span className="text-sky-400 font-bold">{risk.breakdown?.persistence_score}</span>
        </div>
        <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800 text-center">
          <span className="text-slate-500 block">OSM Dist</span>
          <span className="text-rose-400 font-bold">{risk.breakdown?.osm_proximity_score}</span>
        </div>
        <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800 text-center">
          <span className="text-slate-500 block">AI Conf.</span>
          <span className="text-emerald-400 font-bold">{risk.breakdown?.ai_confidence_score}</span>
        </div>
      </div>

      {/* Recommended Action */}
      <div className="bg-slate-950/90 p-2.5 rounded-lg border border-slate-800 text-xs">
        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Recommended Response</span>
        <p className="text-slate-200 font-mono mt-0.5">{risk.action_recommended}</p>
      </div>
    </div>
  );
}
