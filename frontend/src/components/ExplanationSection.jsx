import React from 'react';
import { HelpCircle, ShieldAlert, Cpu, BarChart2, Layers, MapPin } from 'lucide-react';

export default function ExplanationSection({ event }) {
  if (!event || !event.risk_evaluation) return null;

  const { breakdown, explainable_reasoning } = event.risk_evaluation;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <HelpCircle className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Explainable 4-Factor Risk Breakdown
        </h3>
      </div>

      <p className="text-xs text-slate-400">
        Transparent weight distribution: Thermal Output (30%) + 7-Day Persistence (30%) + Proximity (20%) + AI Confidence (20%).
      </p>

      {/* Component Scores */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Thermal FRP Component</span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono font-bold text-amber-400">{breakdown?.thermal_score} / 100</span>
            <span className="text-[10px] text-slate-500 font-mono">Weight: 30%</span>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Persistence Component</span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono font-bold text-sky-400">{breakdown?.persistence_score} / 100</span>
            <span className="text-[10px] text-slate-500 font-mono">Weight: 30%</span>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] block">OSM Asset Proximity</span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono font-bold text-rose-400">{breakdown?.osm_proximity_score} / 100</span>
            <span className="text-[10px] text-slate-500 font-mono">Weight: 20%</span>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] block">AI Rule Confidence</span>
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono font-bold text-emerald-400">{breakdown?.ai_confidence_score} / 100</span>
            <span className="text-[10px] text-slate-500 font-mono">Weight: 20%</span>
          </div>
        </div>
      </div>

      {/* Reasoning Bullets */}
      <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Key Drivers Behind Risk Tier
        </span>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {explainable_reasoning?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
