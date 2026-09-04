import React, { useState } from 'react';
import { Flame, MapPin, ShieldAlert, Cpu, Filter, Eye, ExternalLink } from 'lucide-react';

export default function TelemetryFeedsTab({ events, onSelectEvent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.osm_context?.nearest_infrastructure.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'ALL' || e.classification?.predicted_category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getRiskBadge = (score) => {
    if (score >= 70) return 'bg-red-950 text-red-400 border-red-700/60';
    if (score >= 45) return 'bg-amber-950 text-amber-400 border-amber-700/60';
    return 'bg-emerald-950 text-emerald-400 border-emerald-700/60';
  };

  return (
    <div className="h-full w-full flex flex-col p-6 bg-slate-950 overflow-hidden space-y-4">
      
      {/* Header controls */}
      <div className="flex items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            NASA FIRMS Satellite Telemetry Feed
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Ingested MODIS & VIIRS Thermal Anomaly Data ({filteredEvents.length} Active Records)
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search anomaly ref, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg font-mono focus:outline-none focus:border-amber-500 w-64"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg font-mono focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Categories</option>
            <option value="Industrial Fire">Industrial Fire</option>
            <option value="Mining Activity">Mining Activity</option>
            <option value="Forest Fire">Forest Fire</option>
            <option value="Agricultural Burning">Agricultural Burning</option>
          </select>
        </div>
      </div>

      {/* Telemetry Table */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-950 sticky top-0 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Target / Anomaly Location</th>
                <th className="p-3">AI Classification</th>
                <th className="p-3 text-right">FRP (MW)</th>
                <th className="p-3">OSM Proximity Asset</th>
                <th className="p-3">7-Day Persistence</th>
                <th className="p-3 text-center">Risk Score</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filteredEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-850/80 transition-colors">
                  <td className="p-3 font-bold text-amber-400">{ev.id}</td>
                  <td className="p-3 text-slate-200 font-semibold font-sans">{ev.name}</td>
                  <td className="p-3">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                      {ev.classification?.predicted_category}
                    </span>
                  </td>
                  <td className="p-3 text-right text-amber-400 font-bold">{ev.firms_metadata?.frp_mw}</td>
                  <td className="p-3 text-slate-300">
                    {ev.osm_context?.nearest_infrastructure} ({ev.osm_context?.distance_meters}m)
                  </td>
                  <td className="p-3 text-sky-400">
                    {ev.persistence?.detected_days_last_7} / 7 Days Active
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold border ${getRiskBadge(ev.risk_evaluation?.score)}`}>
                      {ev.risk_evaluation?.score}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onSelectEvent(ev)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded text-[11px] transition-colors"
                    >
                      Focus Map
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
