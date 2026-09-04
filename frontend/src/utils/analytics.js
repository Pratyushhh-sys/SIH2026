// Client-Side Analytical Redundancy Engine for Offline Demonstration

export function classifyEvent(eventData) {
  const osm = eventData.osm_context || {};
  const firms = eventData.firms_metadata || {};
  const persistence = eventData.persistence || {};

  const infra_type = (osm.infrastructure_type || '').toLowerCase();
  const dist_m = osm.distance_meters || 9999;
  const frp = firms.frp_mw || 0;
  const persistence_ratio = persistence.persistence_ratio || 0;

  if (['factory', 'chemical', 'power', 'refinery', 'petrochemical', 'gas flare', 'plant', 'fuel'].some(k => infra_type.includes(k))) {
    if (dist_m <= 500) {
      return {
        predicted_category: 'Industrial Fire',
        confidence: Math.min(0.98, 0.70 + (persistence_ratio * 0.25)),
        primary_rule_applied: 'Rule-IND-01: Proximity to Critical Industrial Facility',
        reasoning: `Close proximity (${dist_m}m) to key industrial asset '${osm.nearest_infrastructure}' with ${persistence.detected_days_last_7}/7 day persistence.`
      };
    }
  }

  if (['mine', 'mining', 'coal', 'pit', 'quarry'].some(k => infra_type.includes(k)) || (eventData.name || '').toLowerCase().includes('coal')) {
    return {
      predicted_category: 'Mining Activity',
      confidence: Math.min(0.96, 0.75 + (persistence_ratio * 0.20)),
      primary_rule_applied: 'Rule-MINE-02: Designated Extraction Zone Heat',
      reasoning: `Located in designated mining zone (${osm.nearest_infrastructure}) with sustained heat signature.`
    };
  }

  if (['agriculture', 'farmland', 'crop', 'stubble', 'field'].some(k => infra_type.includes(k))) {
    if (persistence_ratio <= 0.30 && frp < 60) {
      return {
        predicted_category: 'Agricultural Burning',
        confidence: 0.88,
        primary_rule_applied: 'Rule-AGRI-03: Transient Agricultural Parcel Burn',
        reasoning: 'Single-day low-to-moderate FRP signature located in open agricultural land.'
      };
    }
  }

  if (['forest', 'reserve', 'sanctuary', 'shola', 'woodland'].some(k => infra_type.includes(k))) {
    return {
      predicted_category: 'Forest Fire',
      confidence: 0.85,
      primary_rule_applied: 'Rule-FOR-04: Protected Canopy Spatial Match',
      reasoning: `Thermal anomaly detected within protected canopy area (${osm.nearest_infrastructure}).`
    };
  }

  return {
    predicted_category: 'Other / Unclassified',
    confidence: 0.65,
    primary_rule_applied: 'Rule-GEN-05: General Heuristic Fallback',
    reasoning: `Unclassified thermal signature near ${osm.nearest_infrastructure}.`
  };
}

export function calculateRisk(eventData, classification) {
  const firms = eventData.firms_metadata || {};
  const osm = eventData.osm_context || {};
  const persistence = eventData.persistence || {};

  const frp = firms.frp_mw || 0;
  const dist_m = osm.distance_meters || 9999;
  const persist_ratio = persistence.persistence_ratio || 0;
  const ai_conf = classification?.confidence || 0.5;
  const category = classification?.predicted_category || '';

  const thermal_score = Math.min(100.0, (frp / 150.0) * 100.0);
  const persistence_score = Math.min(100.0, persist_ratio * 100.0);

  let osm_score = 15.0;
  if (dist_m <= 100) osm_score = 100.0;
  else if (dist_m <= 500) osm_score = 85.0;
  else if (dist_m <= 1000) osm_score = 60.0;
  else if (dist_m <= 2000) osm_score = 35.0;

  if (['Industrial Fire', 'Mining Activity'].includes(category) && dist_m <= 300) {
    osm_score = Math.min(100.0, osm_score + 15.0);
  }

  const confidence_score = ai_conf * 100.0;

  let final_score = (
    (0.30 * thermal_score) +
    (0.30 * persistence_score) +
    (0.20 * osm_score) +
    (0.20 * confidence_score)
  );

  final_score = Math.round(final_score * 10) / 10;

  let tier = 'LOW';
  let action_recommended = 'Routine Log: Scheduled Regional Agricultural Review';

  if (final_score >= 70.0) {
    tier = 'CRITICAL / HIGH';
    action_recommended = 'Immediate Dispatch: Alert District Collector & Industrial Safety Inspector';
  } else if (final_score >= 45.0) {
    tier = 'MEDIUM';
    action_recommended = 'Monitor Telemetry: Request Next Satellite Pass (Sentinel-2 SWIR)';
  }

  const reasoning_bullets = [];
  if (persist_ratio >= 0.70) {
    reasoning_bullets.append ? reasoning_bullets.append() : reasoning_bullets.push(`High persistence (${persistence.detected_days_last_7} of 7 days active)`);
  }
  if (dist_m <= 500) {
    reasoning_bullets.push(`Proximity risk: Only ${dist_m}m from ${osm.nearest_infrastructure}`);
  }
  if (frp >= 80) {
    reasoning_bullets.push(`Severe thermal output: Radiative power measured at ${frp} MW`);
  }
  if (category === 'Industrial Fire') {
    reasoning_bullets.push('Critical category match: Confirmed Industrial Infrastructure Proximity');
  }
  if (reasoning_bullets.length === 0) {
    reasoning_bullets.push('Low threat level across thermal and proximity indicators');
  }

  return {
    score: final_score,
    tier,
    action_recommended,
    breakdown: {
      thermal_score: Math.round(thermal_score * 10) / 10,
      persistence_score: Math.round(persistence_score * 10) / 10,
      osm_proximity_score: Math.round(osm_score * 10) / 10,
      ai_confidence_score: Math.round(confidence_score * 10) / 10
    },
    explainable_reasoning: reasoning_bullets
  };
}
