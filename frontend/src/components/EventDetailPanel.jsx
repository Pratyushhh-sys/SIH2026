import React from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, FileText, MapPin } from 'lucide-react';

export default function EventDetailPanel({ event, events = [], onSelectEvent, onOpenDossier, onOpenReport }) {
  if (!event) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center text-slate-500">
        <p>Select a thermal event from the map or feed to view detailed investigation metrics.</p>
      </div>
    );
  }

  const { firms_metadata, osm_context, persistence, risk_evaluation } = event;

  return (
    <aside className="stitch-inspector">
      <div className="stitch-inspector-head"><div><small>SELECTED EVENT</small><h2>{event.id} <b>{event.riskLevel || (risk_evaluation?.tier?.includes('HIGH') ? 'HIGH' : risk_evaluation?.tier)}</b></h2><p>{event.latitude.toFixed(3)}° N, {event.longitude.toFixed(3)}° E</p><p>{event.location || event.name}</p></div><div className="stitch-inspector-nav"><button title="Previous event" onClick={() => { const index = events.findIndex((item) => item.id === event.id); onSelectEvent?.(events[(index - 1 + events.length) % events.length]); }}><ChevronLeft size={14} /></button><button title="Next event" onClick={() => { const index = events.findIndex((item) => item.id === event.id); onSelectEvent?.(events[(index + 1) % events.length]); }}><ChevronRight size={14} /></button></div></div>
      <div className="stitch-date-row"><span><CalendarDays size={14} /> Detection Timestamp<br /><b>{event.detectionTime}</b></span><button onClick={onOpenReport}><FileText size={12} /> Focus Event</button></div>
      <div className="stitch-inspector-stats"><div><strong>{event.thermalIntensity || firms_metadata?.frp_mw}</strong><span>Thermal Intensity</span></div><div><strong>{event.confidence || firms_metadata?.confidence_pct}%</strong><span>Confidence</span></div><div><strong>{event.source || 'Satellite'}</strong><span>Data Source</span></div></div>
      <div className="stitch-classification"><div className="stitch-card-heading"><span>◉ &nbsp;Source Classification</span><small>Rule-Based Demo Intelligence</small></div>{Object.entries(event.classification_probabilities || {}).map(([label, value], index) => <div className="stitch-class-row" key={label}><span>{label}</span><div><i className={`bar-${['red', 'orange', 'yellow', 'green'][index % 4]}`} style={{ width: `${value}%` }} /></div><b>{value}%</b></div>)}</div>
      <div className="stitch-risk-score"><div><strong>{Math.round(risk_evaluation?.score || 0)}</strong><span>/ 100</span><small>{risk_evaluation?.tier || 'HIGH RISK'}</small></div><div className="stitch-score-ring"><span>{Math.round(risk_evaluation?.score || 0)}</span></div></div>
      <button className="stitch-inspector-report" onClick={onOpenReport}><FileText size={14} /> Generate Investigation Report</button>
    </aside>
  );
}
