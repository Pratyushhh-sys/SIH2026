import React from 'react';
import { X, Printer, Download, ShieldAlert, Cpu, MapPin, Satellite, FileText } from 'lucide-react';

export default function DossierModal({ event, onClose }) {
  if (!event) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header (Hidden on print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-slate-200">
              Official Investigation Dossier — {event.id}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-lg shadow-amber-500/20"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF Dossier
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-850 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-8 overflow-y-auto text-slate-100 font-sans print:p-0 print:text-black print:bg-white print:overflow-visible space-y-6">
          
          {/* Dossier Document Header */}
          <div className="border-b-2 border-slate-700 print:border-black pb-4 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded uppercase font-mono print:border print:border-black">
                  CONFIDENTIAL
                </span>
                <span className="text-xs text-slate-400 print:text-gray-600 font-mono">
                  SIH PS 26162 — GEOSPATIAL DOSSIER
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-100 print:text-black mt-2">
                THERMAL ANOMALY INVESTIGATION DOSSIER
              </h1>
              <p className="text-xs text-slate-400 print:text-gray-600 font-mono mt-1">
                Event Reference: <strong className="text-amber-400 print:text-black">{event.id}</strong> | Generated: {new Date().toISOString().split('T')[0]}
              </p>
            </div>

            <div className="text-right border-l border-slate-800 print:border-gray-300 pl-4">
              <p className="text-xs text-slate-400 print:text-gray-600 uppercase tracking-wider">Risk Evaluation</p>
              <p className="text-3xl font-black text-red-400 print:text-black font-mono">
                {event.risk_evaluation?.score ?? 'N/A'}<span className="text-sm text-slate-500 print:text-gray-500">/100</span>
              </p>
              <p className="text-xs font-bold text-red-400 print:text-black uppercase">
                {event.risk_evaluation?.tier ?? 'EVALUATING'}
              </p>
            </div>
          </div>

          {/* Incident Overview Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-950/60 print:bg-gray-100 p-4 rounded-xl border border-slate-800 print:border-gray-300">
            <div>
              <h3 className="text-xs font-bold text-slate-400 print:text-gray-700 uppercase tracking-wider mb-2">
                Incident Location & Details
              </h3>
              <ul className="space-y-1 text-sm font-mono">
                <li><strong className="text-slate-300 print:text-black">Target Name:</strong> {event.name}</li>
                <li><strong className="text-slate-300 print:text-black">Coordinates:</strong> {event.latitude}, {event.longitude}</li>
                <li><strong className="text-slate-300 print:text-black">Nearest Asset:</strong> {event.osm_context?.nearest_infrastructure}</li>
                <li><strong className="text-slate-300 print:text-black">Proximity:</strong> {event.osm_context?.distance_meters} meters</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 print:text-gray-700 uppercase tracking-wider mb-2">
                FIRMS Satellite Telemetry
              </h3>
              <ul className="space-y-1 text-sm font-mono">
                <li><strong className="text-slate-300 print:text-black">Satellite:</strong> {event.firms_metadata?.satellite}</li>
                <li><strong className="text-slate-300 print:text-black">Brightness Temp:</strong> {event.firms_metadata?.brightness} K</li>
                <li><strong className="text-slate-300 print:text-black">Radiative Power (FRP):</strong> {event.firms_metadata?.frp_mw} MW</li>
                <li><strong className="text-slate-300 print:text-black">Scan Time:</strong> {event.firms_metadata?.scan_date} ({event.firms_metadata?.scan_time})</li>
              </ul>
            </div>
          </div>

          {/* AI Classification & Proximity Analysis */}
          <div className="border border-slate-800 print:border-gray-300 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 print:text-gray-700 uppercase tracking-wider">
              AI Zero-Training Classification & Spatial Context
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/80 print:bg-white p-3 rounded-lg border border-slate-800 print:border-gray-300">
                <p className="text-xs text-slate-400 print:text-gray-600">Predicted Category</p>
                <p className="text-lg font-bold text-amber-400 print:text-black font-mono">
                  {event.classification?.predicted_category}
                </p>
                <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                  Confidence: <span className="font-mono text-sky-400 print:text-black font-bold">{Math.round((event.classification?.confidence || 0) * 100)}%</span>
                </p>
              </div>

              <div className="bg-slate-950/80 print:bg-white p-3 rounded-lg border border-slate-800 print:border-gray-300">
                <p className="text-xs text-slate-400 print:text-gray-600">7-Day Persistence Ratio</p>
                <p className="text-lg font-bold text-sky-400 print:text-black font-mono">
                  {event.persistence?.detected_days_last_7} / 7 Days Active
                </p>
                <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                  Pattern: {event.persistence?.historical_pattern}
                </p>
              </div>
            </div>
            
            <div className="bg-slate-950/40 print:bg-gray-50 p-3 rounded-lg border border-slate-800 print:border-gray-300 text-xs">
              <span className="font-bold text-slate-300 print:text-black">Primary Rule Applied: </span>
              <span className="font-mono text-amber-400 print:text-black">{event.classification?.primary_rule_applied}</span>
              <p className="text-slate-400 print:text-gray-700 mt-1">{event.classification?.reasoning}</p>
            </div>
          </div>

          {/* Risk Factors Breakdown */}
          <div className="border border-slate-800 print:border-gray-300 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 print:text-gray-700 uppercase tracking-wider">
              Explainable Risk Reasoning & Recommended Actions
            </h3>
            
            <div className="space-y-2">
              {event.risk_evaluation?.explainable_reasoning?.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-300 print:text-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 print:bg-black"></span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="bg-red-950/40 print:bg-gray-200 border border-red-800/60 print:border-black p-3 rounded-lg text-xs mt-3">
              <span className="font-bold text-red-400 print:text-black uppercase">Action Recommended for Field Team: </span>
              <p className="text-slate-200 print:text-black font-mono font-semibold mt-0.5">
                {event.risk_evaluation?.action_recommended}
              </p>
            </div>
          </div>

          {/* Field Sign-off block */}
          <div className="pt-6 border-t border-slate-800 print:border-black grid grid-cols-2 gap-8 text-xs font-mono">
            <div>
              <p className="text-slate-500 print:text-gray-600">Dispatched Investigator Signature:</p>
              <div className="h-10 border-b border-slate-700 print:border-black mt-2"></div>
            </div>
            <div>
              <p className="text-slate-500 print:text-gray-600">District Oversight Authority:</p>
              <div className="h-10 border-b border-slate-700 print:border-black mt-2"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
