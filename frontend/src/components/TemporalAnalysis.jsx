import React from 'react';
import { Clock, Calendar, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TemporalAnalysis({ event }) {
  const values = event?.thermal_history || [0, 0, 0, 0, 0, 0, 0];
  const trendData = values.map((value, index) => ({ day: `Day ${index + 1}`, thermal: value }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            7-Day Temporal Trend Analysis
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          7-Day Rolling FIRMS Satellite Ingestion
        </span>
      </div>

      <div className="h-44 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
            />
            <Line type="monotone" dataKey="thermal" stroke="#ef4444" strokeWidth={2} name={event?.id || 'Thermal'} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
