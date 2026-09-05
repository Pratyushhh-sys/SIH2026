import React, { useState } from 'react';
import GISMap from './GISMap';
import EventDetailPanel from './EventDetailPanel';
import KpiCards from './KpiCards';
import SatellitePanel from './SatellitePanel';
import TemporalAnalysis from './TemporalAnalysis';
import GeospatialContext from './GeospatialContext';
import ExplanationSection from './ExplanationSection';
import InvestigationAlert from './InvestigationAlert';
import { ChevronDown, FileText } from 'lucide-react';

export default function OverviewTab({ events, selectedEvent, setSelectedEvent, onOpenDossier, onOpenReport, searchQuery }) {
  const [visibleLayers, setVisibleLayers] = useState({ thermal: true, industrial: true, pipelines: true, mines: true, forest: true, agriculture: true, population: false });
  const [baseMap, setBaseMap] = useState('map');
  const [riskFilters, setRiskFilters] = useState({ HIGH: true, MEDIUM: true, LOW: true });

  const toggleLayer = (key) => setVisibleLayers((current) => ({ ...current, [key]: !current[key] }));
  const filteredEvents = events.filter((event) => {
    const category = event.classification?.predicted_category;
    const categoryVisible = (category === 'Industrial Fire' ? visibleLayers.industrial : true)
      && (category === 'Mining Activity' ? visibleLayers.mines : true)
      && (category === 'Forest Fire' ? visibleLayers.forest : true)
      && (category === 'Agricultural Burning' ? visibleLayers.agriculture : true);
    return visibleLayers.thermal && categoryVisible && riskFilters[event.riskLevel] !== false
      && (!searchQuery || [event.id, event.location, event.state, event.classification?.predicted_category, event.riskLevel, `${event.riskLevel} Risk`].join(' ').toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="stitch-dashboard">
      <KpiCards events={events} />

      <div className="stitch-workspace">
        <section className="stitch-map-card">
          <div className="stitch-map-title"><span><span className="stitch-map-dot" /> THERMAL INTELLIGENCE</span><small>{events.length} active telemetry points</small></div>
          <div className="stitch-map-canvas"><GISMap events={filteredEvents} selectedEvent={selectedEvent} onSelectEvent={setSelectedEvent} onOpenReport={onOpenReport} showThermalEvents={visibleLayers.thermal} baseMap={baseMap} />
            <div className="stitch-layer-menu">
              <div className="stitch-layer-heading"><span>◈ &nbsp;Map Layers</span><ChevronDown size={13} /></div>
              {[['Thermal Events', 'thermal'], ['Industrial Facilities', 'industrial'], ['Pipelines', 'pipelines'], ['Mines', 'mines'], ['Forest Areas', 'forest'], ['Agriculture', 'agriculture'], ['Population Zones', 'population']].map(([layer, key], index) => <label key={layer}><input type="checkbox" checked={visibleLayers[key]} onChange={() => toggleLayer(key)} /><span className={`stitch-layer-dot layer-${index}`} />{layer}</label>)}
              <div className="stitch-filter-heading">Risk Filters</div>
              {Object.keys(riskFilters).map((level) => <label key={level}><input type="checkbox" checked={riskFilters[level]} onChange={() => setRiskFilters((current) => ({ ...current, [level]: !current[level] }))} /><span className={`stitch-layer-dot risk-${level.toLowerCase()}`} />{level} Risk</label>)}
              <div className="stitch-base-heading">▣ &nbsp; Base Map</div>
              {[['Map View', 'map'], ['Satellite View', 'satellite'], ['Terrain View', 'terrain']].map(([view, value]) => <label key={view}><input type="radio" name="basemap" checked={baseMap === value} onChange={() => setBaseMap(value)} />{view}</label>)}
            </div>
          </div>
        </section>
        <EventDetailPanel event={selectedEvent} events={events} onSelectEvent={setSelectedEvent} onOpenDossier={onOpenDossier} onOpenReport={onOpenReport} />
      </div>

      <div className="stitch-analysis-grid">
        <section className="stitch-analysis-card stitch-satellite-card"><div className="stitch-card-heading"><span>▣ &nbsp;Satellite Evidence</span><small>Sentinel-2 &nbsp; Landsat &nbsp; INSAT</small></div><SatellitePanel event={selectedEvent} /></section>
        <section className="stitch-analysis-card"><TemporalAnalysis event={selectedEvent} events={events} /></section>
        <section className="stitch-analysis-card"><div className="stitch-card-heading"><span>◈ &nbsp;Geospatial Context</span><small>HIGH</small></div><GeospatialContext event={selectedEvent} /></section>
        <section className="stitch-analysis-card"><div className="stitch-card-heading"><span>✓ &nbsp;Why This Risk Level?</span></div><ExplanationSection event={selectedEvent} /></section>
        <section className="stitch-analysis-card stitch-alerts-card"><div className="stitch-card-heading"><span>⚠ &nbsp;Priority Alerts</span><small>View All</small></div>{[...events].sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0)).slice(0, 5).map((event) => <button key={event.id} className="stitch-alert-row" onClick={() => setSelectedEvent(event)}><b>{event.id}</b><span>{event.classification?.predicted_category || 'Thermal Source'}<small>Risk: {Math.round(event.riskScore || event.risk_evaluation?.score || 0)} · {event.location}</small></span></button>)}<button className="stitch-report-button" onClick={onOpenReport}><FileText size={14} /> Generate Investigation Report</button></section>
      </div>

      <InvestigationAlert event={selectedEvent} onSelectEvent={setSelectedEvent} />
      <footer className="stitch-footer"><strong>Smart India Hackathon 2026</strong><span>AI-Based Industrial Fire &amp; Thermal Source Attribution</span><small>PS 26162 | Geospatial Intelligence Engine v3.4</small></footer>
    </div>
  );
}
