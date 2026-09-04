class RiskEngine:
    """
    Explainable 4-Factor Risk Engine (0 - 100) for SIH PS 26162.
    Computes weighted risk based on:
    - 30% Thermal Intensity (FRP & Brightness)
    - 30% Persistence Ratio (Days active out of 7)
    - 20% OpenStreetMap Infrastructure Proximity Context
    - 20% Heuristic AI Confidence
    """

    def calculate_risk(self, event_data: dict, classification: dict) -> dict:
        firms = event_data.get("firms_metadata", {})
        osm = event_data.get("osm_context", {})
        persistence = event_data.get("persistence", {})

        frp = firms.get("frp_mw", 0)
        dist_m = osm.get("distance_meters", 9999)
        persist_ratio = persistence.get("persistence_ratio", 0)
        ai_conf = classification.get("confidence", 0.5)
        category = classification.get("predicted_category", "")

        # Component 1: Thermal Score (0 - 100)
        thermal_score = min(100.0, (frp / 150.0) * 100.0)

        # Component 2: Persistence Score (0 - 100)
        persistence_score = min(100.0, persist_ratio * 100.0)

        # Component 3: OSM Infrastructure Proximity Score (0 - 100)
        if dist_m <= 100:
            osm_score = 100.0
        elif dist_m <= 500:
            osm_score = 85.0
        elif dist_m <= 1000:
            osm_score = 60.0
        elif dist_m <= 2000:
            osm_score = 35.0
        else:
            osm_score = 15.0

        # High risk multiplier for Industrial or Mining categories near assets
        if category in ["Industrial Fire", "Mining Activity"] and dist_m <= 300:
            osm_score = min(100.0, osm_score + 15.0)

        # Component 4: AI Confidence Score (0 - 100)
        confidence_score = ai_conf * 100.0

        # Weighted Final Score (0 - 100)
        final_score = (
            (0.30 * thermal_score) +
            (0.30 * persistence_score) +
            (0.20 * osm_score) +
            (0.20 * confidence_score)
        )

        final_score = round(final_score, 1)

        # Risk Tier Assignment
        if final_score >= 70.0:
            risk_tier = "CRITICAL / HIGH"
            action_recommended = "Immediate Dispatch: Alert District Collector & Industrial Safety Inspector"
        elif final_score >= 45.0:
            risk_tier = "MEDIUM"
            action_recommended = "Monitor Telemetry: Request Next Satellite Pass (Sentinel-2 SWIR)"
        else:
            risk_tier = "LOW"
            action_recommended = "Routine Log: Scheduled Regional Agricultural Review"

        # Generate Explainable Reasoning Bullets
        reasoning_bullets = []
        if persist_ratio >= 0.70:
            reasoning_bullets.append(f"High persistence ({persistence.get('detected_days_last_7', 0)} of 7 days active)")
        if dist_m <= 500:
            reasoning_bullets.append(f"Proximity risk: Only {dist_m}m from {osm.get('nearest_infrastructure')}")
        if frp >= 80:
            reasoning_bullets.append(f"Severe thermal output: Radiative power measured at {frp} MW")
        if category == "Industrial Fire":
            reasoning_bullets.append("Critical category match: Confirmed Industrial Infrastructure Proximity")
        if not reasoning_bullets:
            reasoning_bullets.append("Low threat level across thermal and proximity indicators")

        return {
            "score": final_score,
            "tier": risk_tier,
            "action_recommended": action_recommended,
            "breakdown": {
                "thermal_score": round(thermal_score, 1),
                "persistence_score": round(persistence_score, 1),
                "osm_proximity_score": round(osm_score, 1),
                "ai_confidence_score": round(confidence_score, 1)
            },
            "explainable_reasoning": reasoning_bullets
        }
