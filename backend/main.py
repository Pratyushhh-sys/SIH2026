import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from services.risk_engine import RiskEngine
from services.classifier import HeuristicClassifier
from services.satellite_service import SatelliteService

app = FastAPI(
    title="Industrial Thermal Intelligence System API",
    description="Geospatial Investigation-Support Platform API for SIH PS 26162",
    version="1.0.0"
)

# Enable CORS for Vite frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "thermal_events.json")

def load_events():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)

risk_engine = RiskEngine()
classifier = HeuristicClassifier()
satellite_service = SatelliteService()

@app.get("/")
def read_root():
    return {
        "status": "online",
        "system": "Industrial Thermal Intelligence & Anomaly Analysis System",
        "problem_statement": "SIH PS 26162",
        "endpoints": ["/api/events", "/api/events/{event_id}", "/api/satellite/{event_id}"]
    }

@app.get("/api/events")
def get_all_events():
    """Retrieve all thermal telemetry events enriched with risk score and classification."""
    events = load_events()
    enriched_events = []
    
    for event in events:
        classification = classifier.classify(event)
        risk_evaluation = risk_engine.calculate_risk(event, classification)
        
        event_copy = dict(event)
        event_copy["classification"] = classification
        event_copy["risk_evaluation"] = risk_evaluation
        enriched_events.append(event_copy)
        
    return {
        "total_events": len(enriched_events),
        "events": enriched_events
    }

@app.get("/api/events/{event_id}")
def get_event_detail(event_id: str):
    """Retrieve detailed telemetry, classification, and risk evaluation for a single event."""
    events = load_events()
    event = next((e for e in events if e["id"] == event_id), None)
    
    if not event:
        raise HTTPException(status_code=404, detail="Thermal event not found")
        
    classification = classifier.classify(event)
    risk_evaluation = risk_engine.calculate_risk(event, classification)
    satellite_data = satellite_service.get_satellite_imagery(event_id)
    
    event_copy = dict(event)
    event_copy["classification"] = classification
    event_copy["risk_evaluation"] = risk_evaluation
    event_copy["satellite_context"] = satellite_data
    
    return event_copy

@app.get("/api/satellite/{event_id}")
def get_satellite_data(event_id: str):
    """Retrieve Sentinel-2 and Landsat-9 satellite metadata and SWIR imagery links."""
    events = load_events()
    event = next((e for e in events if e["id"] == event_id), None)
    if not event:
        raise HTTPException(status_code=404, detail="Thermal event not found")
        
    return satellite_service.get_satellite_imagery(event_id)

@app.get("/api/summary")
def get_system_summary():
    """Summary KPI statistics across all active telemetry events."""
    events = load_events()
    high_risk_count = 0
    industrial_count = 0
    total_events = len(events)
    
    for event in events:
        classification = classifier.classify(event)
        risk = risk_engine.calculate_risk(event, classification)
        if risk["score"] >= 70:
            high_risk_count += 1
        if classification["predicted_category"] == "Industrial Fire":
            industrial_count += 1
            
    return {
        "total_active_hotspots": total_events,
        "high_priority_investigations": high_risk_count,
        "industrial_confirmed_count": industrial_count,
        "satellite_passes_today": 4,
        "system_status": "Operational (Demonstration Mode)"
    }
