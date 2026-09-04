class HeuristicClassifier:
    """
    Zero-Training Heuristic Intelligence Module for SIH PS 26162.
    Demonstration-mode rule classifier evaluating spatial proximity, FIRMS intensity, and 7-day persistence.
    """

    CATEGORIES = {
        "INDUSTRIAL_FIRE": "Industrial Fire",
        "AGRICULTURAL": "Agricultural Burning",
        "FOREST_FIRE": "Forest Fire",
        "MINING": "Mining Activity",
        "OTHER": "Other / Unclassified"
    }

    def classify(self, event_data: dict) -> dict:
        osm = event_data.get("osm_context", {})
        firms = event_data.get("firms_metadata", {})
        persistence = event_data.get("persistence", {})

        infra_type = osm.get("infrastructure_type", "").lower()
        dist_m = osm.get("distance_meters", 9999)
        frp = firms.get("frp_mw", 0)
        brightness = firms.get("brightness", 0)
        persistence_ratio = persistence.get("persistence_ratio", 0)

        # Rule 1: High persistence + close proximity to Industrial/Chemical/Power/Refinery infrastructure
        if any(keyword in infra_type for keyword in ["factory", "chemical", "power", "refinery", "petrochemical", "gas flare", "plant", "fuel"]):
            if dist_m <= 500:
                predicted = self.CATEGORIES["INDUSTRIAL_FIRE"]
                confidence = min(0.98, 0.70 + (persistence_ratio * 0.25))
                reason = f"Close proximity ({dist_m}m) to key industrial asset '{osm.get('nearest_infrastructure')}' with {persistence.get('detected_days_last_7')}/7 day persistence."
                return {
                    "predicted_category": predicted,
                    "confidence": round(confidence, 3),
                    "primary_rule_applied": "Rule-IND-01: Proximity to Critical Industrial Facility",
                    "reasoning": reason
                }

        # Rule 2: Mining Excavation / Coal Seam
        if any(keyword in infra_type for keyword in ["mine", "mining", "coal", "pit", "quarry"]):
            if dist_m <= 800 or "coal" in event_data.get("name", "").lower():
                predicted = self.CATEGORIES["MINING"]
                confidence = min(0.96, 0.75 + (persistence_ratio * 0.20))
                reason = f"Located in designated mining zone ({osm.get('nearest_infrastructure')}) with sustained heat signature."
                return {
                    "predicted_category": predicted,
                    "confidence": round(confidence, 3),
                    "primary_rule_applied": "Rule-MINE-02: Designated Extraction Zone Heat",
                    "reasoning": reason
                }

        # Rule 3: Agricultural Stubble / Crop Burning
        if any(keyword in infra_type for keyword in ["agriculture", "farmland", "crop", "stubble", "field"]):
            if persistence_ratio <= 0.30 and frp < 60:
                predicted = self.CATEGORIES["AGRICULTURAL"]
                confidence = 0.88
                reason = "Single-day low-to-moderate FRP signature located in open agricultural land."
                return {
                    "predicted_category": predicted,
                    "confidence": round(confidence, 3),
                    "primary_rule_applied": "Rule-AGRI-03: Transient Agricultural Parcel Burn",
                    "reasoning": reason
                }

        # Rule 4: Protected Forest / High Canopy Undergrowth
        if any(keyword in infra_type for keyword in ["forest", "reserve", "sanctuary", "shola", "woodland"]):
            predicted = self.CATEGORIES["FOREST_FIRE"]
            confidence = 0.85
            reason = f"Thermal anomaly detected within protected canopy area ({osm.get('nearest_infrastructure')})."
            return {
                "predicted_category": predicted,
                "confidence": round(confidence, 3),
                "primary_rule_applied": "Rule-FOR-04: Protected Canopy Spatial Match",
                "reasoning": reason
            }

        # Fallback / Default classification
        return {
            "predicted_category": self.CATEGORIES["OTHER"],
            "confidence": 0.65,
            "primary_rule_applied": "Rule-GEN-05: General Heuristic Fallback",
            "reasoning": f"Unclassified thermal signature near {osm.get('nearest_infrastructure')}."
        }
