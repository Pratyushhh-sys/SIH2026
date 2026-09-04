import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, ShieldAlert, Flame, Building2, Eye, Layers3 } from 'lucide-react';

// Custom Leaflet Radar Pulsing Marker Icon Creator
const createRadarIcon = (category, isSelected) => {
  let colorClass = 'bg-amber-500';
  let borderClass = 'border-amber-300';
  
  if (category === 'Industrial Fire') {
    colorClass = 'bg-red-500';
    borderClass = 'border-red-300';
  } else if (category === 'Mining Activity') {
    colorClass = 'bg-amber-500';
    borderClass = 'border-amber-200';
  } else if (category === 'Forest Fire') {
    colorClass = 'bg-emerald-500';
    borderClass = 'border-emerald-200';
  } else if (category === 'Agricultural Burning') {
    colorClass = 'bg-yellow-500';
    borderClass = 'border-yellow-200';
  }

  const selectedRing = isSelected ? 'ring-4 ring-white ring-offset-2 ring-offset-slate-950 scale-125 z-50' : '';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div className="relative flex items-center justify-center w-6 h-6">
        <div className="absolute w-8 h-8 rounded-full ${colorClass} opacity-40 animate-ping"></div>
        <div className="relative w-5 h-5 rounded-full ${colorClass} border-2 ${borderClass} shadow-lg transition-transform duration-200 ${selectedRing}"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export default function GISMap({ events, selectedEvent, onSelectEvent }) {
  const [showBuffers, setShowBuffers] = useState(true);
  const [showSwirOverlay, setShowSwirOverlay] = useState(false);

  const defaultCenter = selectedEvent ? [selectedEvent.latitude, selectedEvent.longitude] : [22.5937, 78.9629];

  return (
    <div className="relative h-full w-full bg-slate-950 overflow-hidden">
      
      {/* Map Control Toolbar */}
      <div className="absolute top-4 right-4 z-[400] flex items-center gap-2 bg-slate-900/90 border border-slate-800 backdrop-blur-md p-1.5 rounded-xl shadow-2xl">
        <button
          onClick={() => setShowBuffers(!showBuffers)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            showBuffers 
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' 
              : 'text-slate-400 hover:text-slate-200 bg-slate-800/50'
          }`}
        >
          <Layers3 className="w-3.5 h-3.5" />
          500m/1000m Buffers
        </button>

        <button
          onClick={() => setShowSwirOverlay(!showSwirOverlay)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            showSwirOverlay 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
              : 'text-slate-400 hover:text-slate-200 bg-slate-800/50'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          SWIR Heat View
        </button>
      </div>

      {/* Map Legend overlay */}
      <div className="absolute bottom-6 left-4 z-[400] bg-slate-900/90 border border-slate-800 backdrop-blur-md p-3 rounded-xl shadow-2xl text-xs space-y-2 pointer-events-auto">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">GIS Map Legend</div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span className="text-slate-300">Industrial Fire</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-300">Mining Activity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300">Forest Canopy Fire</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
          <span className="text-slate-300">Agricultural Burning</span>
        </div>
      </div>

      {/* Main Leaflet Map Container */}
      <MapContainer
        center={defaultCenter}
        zoom={6}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        {/* Dark CartoDB Matter Basemap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Render Thermal Event Markers */}
        {events.map((event) => {
          const isSelected = selectedEvent?.id === event.id;
          const category = event.classification?.predicted_category;

          return (
            <React.Fragment key={event.id}>
              <Marker
                position={[event.latitude, event.longitude]}
                icon={createRadarIcon(category, isSelected)}
                eventHandlers={{
                  click: () => onSelectEvent(event)
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="bg-slate-900 text-slate-100 p-2 rounded-lg space-y-1 text-xs border border-slate-800 min-w-[200px]">
                    <div className="font-bold text-amber-400 border-b border-slate-800 pb-1">
                      {event.id} — {event.name}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      <strong>Category:</strong> {category}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      <strong>Risk Score:</strong> <span className="font-mono text-red-400 font-bold">{event.risk_evaluation?.score}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      <strong>Proximity:</strong> {event.osm_context?.distance_meters}m to {event.osm_context?.nearest_infrastructure}
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* 500m & 1000m Infrastructure Buffer Circles */}
              {showBuffers && isSelected && (
                <>
                  <Circle
                    center={[event.latitude, event.longitude]}
                    radius={500}
                    pathOptions={{
                      color: '#ef4444',
                      fillColor: '#ef4444',
                      fillOpacity: 0.15,
                      weight: 1.5,
                      dashArray: '4, 4'
                    }}
                  />
                  <Circle
                    center={[event.latitude, event.longitude]}
                    radius={1000}
                    pathOptions={{
                      color: '#f59e0b',
                      fillColor: '#f59e0b',
                      fillOpacity: 0.08,
                      weight: 1,
                      dashArray: '6, 6'
                    }}
                  />
                </>
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
