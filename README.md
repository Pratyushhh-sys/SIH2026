# Industrial Thermal Intelligence & Anomaly Analysis System (SIH PS 26162)

> **Geospatial Investigation-Support Support Platform for Industrial Thermal Anomalies**
> Satellite + OpenStreetMap Context + 7-Day Persistence + Zero-Training Rule Classifier + Explainable 4-Factor Risk Engine

---

## 🌟 Executive Summary

This working demonstration prototype is designed specifically for **Smart India Hackathon Problem Statement PS 26162**. It transforms raw NASA FIRMS-style thermal anomaly satellite telemetry into an actionable geospatial investigation workflow.

Rather than acting as a generic fire detector, the system answers the core investigation questions:
- **Where is the thermal anomaly located?**
- **What critical infrastructure exists nearby (Factories, Pipelines, Mines)?**
- **What does satellite evidence (Sentinel-2, Landsat-9 SWIR) indicate?**
- **What is the likely source category?**
- **How persistent is the hotspot over a 7-day period?**
- **How risky is it and WHY is it risky?**
- **Where should field investigators focus their initial response?**

---

## 🚀 Key Prototype Highlights

1. **Zero-Training Heuristic Intelligence ("AI Classification — Demonstration Mode")**:
   - Transparent rule-based classifier evaluating spatial proximity, FIRMS intensity, and persistence ratio.
   - Categorizes events into **Industrial Fire**, **Agricultural Burning**, **Forest Fire**, **Mining Activity**, or **Other**.
2. **Explainable 4-Factor Risk Engine (0 – 100)**:
   - $$\text{Risk Score} = 0.30 \times \text{Thermal} + 0.30 \times \text{Persistence} + 0.20 \times \text{OSM Context} + 0.20 \times \text{AI Confidence}$$
   - Dynamic plain-English reasoning bullets ("WHY THIS EVENT IS HIGH RISK").
3. **Interactive GIS Centralpiece**:
   - Built with React Leaflet featuring custom pulsing radar thermal markers, SWIR heat overlay toggles, and 500m / 1000m infrastructure range buffers.
4. **Resilient Dual-Engine (100% Offline Ready)**:
   - Python FastAPI backend + Vite React frontend with automatic client-side fallback if backend API is offline.
5. **Printable Dossier Report Generator**:
   - Generates an official printable PDF investigation dossier for field teams with Ctrl+P / save PDF formatting.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS, Leaflet / React-Leaflet, Lucide Icons
- **Backend**: Python 3.11, FastAPI, Uvicorn, Pydantic
- **Data**: JSON FIRMS-style datasets with OpenStreetMap infrastructure metadata & Sentinel-2 SWIR satellite metadata

---

## 📦 Startup Instructions

### 1. Prerequisites
- Node.js (v18+)
- Python (3.9+)

### 2. Launch FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```
*Backend runs at: `http://localhost:8000/`*

### 3. Launch Vite Frontend
Open a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at: `http://localhost:5173/`*

---

## 🔬 Demonstration Telemetry Events (Included Datasets)

The system comes pre-loaded with **12 diverse thermal events** across India:
1. `TH-001` — Derabassi Industrial Zone, Punjab (**Industrial Fire — 87.5 High Risk**)
2. `TH-002` — Singrauli Petrochemical Corridor, MP (**Industrial Fire — 95.8 High Risk**)
3. `TH-003` — Ludhiana Stubble Field, Punjab (**Agricultural Burning — 43.1 Medium Risk**)
4. `TH-004` — Karnal Crop Residue, Haryana (**Agricultural Burning — 31.7 Low Risk**)
5. `TH-005` — Similipal Core Tiger Reserve, Odisha (**Forest Fire — 75.8 High Risk**)
6. `TH-006` — Western Ghats Shola Slope, Karnataka (**Forest Fire — 50.3 Medium Risk**)
7. `TH-007` — Jharia Underground Coal Seam Fire, Jharkhand (**Mining Activity — 96.0 High Risk**)
8. `TH-008` — Korba Bauxite Excavation Pit, Chhattisgarh (**Mining Activity — 69.9 Medium Risk**)
9. `TH-009` — Grand Trunk Brick Kiln Cluster, UP (**Other / Kiln — 38.0 Low Risk**)
10. `TH-010` — Hazira Coastal Gas Terminal Flare, Gujarat (**Industrial Flare — 92.5 High Risk**)
11. `TH-011` — Vadodara Refinery Stack, Gujarat (**Industrial Flare — 72.8 High Risk**)
12. `TH-012` — Kolhapur Sugarcane Burn Parcel, Maharashtra (**Agricultural Burning — 33.2 Low Risk**)
