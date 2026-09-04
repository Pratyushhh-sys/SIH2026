import React from 'react';
import { Tag, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export default function ClassificationCard({ event }) {
  if (!event || !event.classification) return null;

  const { classification } = event;
  const confidencePct = Math.round((classification.confidence || 0) * 100);

  const getCategoryBadgeStyle = (category) => {
    switch (category) {
      case 'Industrial Fire':
        return 'bg-red-950/80 text-red-400 border-red-700/60 shadow-red-950/50';
      case 'Mining Activity':
        return 'bg-amber-950/80 text-amber-400 border-amber-700/60 shadow-amber-950/50';
      case 'Forest Fire':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60 shadow-emerald-950/50';
      case 'Agricultural Burning':
        return 'bg-yellow-950/80 text-yellow-400 border-yellow-700/60 shadow-yellow-950/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            AI Classification — Demonstration Mode
          </h3>
        </div>
        <span className="text-[10px] font-mono bg-sky-950/80 text-sky-400 border border-sky-800/60 px-2 py-0.5 rounded-full">
          Zero-Training Rule Engine
        </span>
      </div>

      {/* Main Category Result */}
      <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-lg border border-slate-800 mb-3">
        <div>
          <p className="text-xs text-slate-400 mb-1">Predicted Anomaly Source</p>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold rounded-lg border shadow-sm ${getCategoryBadgeStyle(classification.predicted_category)}`}>
            <Tag className="w-3.5 h-3.5" />
            {classification.predicted_category}
          </span>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400 mb-1">Confidence Score</p>
          <div className="flex items-center gap-2 justify-end">
            <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-sky-400 rounded-full"
                style={{ width: `${confidencePct}%` }}
              ></div>
            </div>
            <span className="text-sm font-mono font-bold text-sky-400">{confidencePct}%</span>
          </div>
        </div>
      </div>

      {/* Applied Rule & Reason */}
      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2 bg-slate-850/60 p-2.5 rounded-md border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300">Rule Triggered: </span>
            <span className="font-mono text-sky-300">{classification.primary_rule_applied}</span>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-slate-850/60 p-2.5 rounded-md border border-slate-800">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300">Classification Context: </span>
            <span className="text-slate-400">{classification.reasoning}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
