export const STITCH_PRODUCT = {
  productId: '8842511298660608966',
  title: 'Thermal Intelligence Dashboard',
  source: 'Google Stitch MCP',
  status: 'retrieved',
  theme: {
    background: '#f7f9fb',
    panel: '#ffffff',
    panelAlt: '#f5f7fb',
    border: '#e2e8f0',
    primary: '#2563eb',
    accent: '#f59e0b',
    danger: '#ef4444',
    success: '#22c55e',
    text: '#0f172a',
    textMuted: '#475569'
  },
  layout: {
    mapFirst: true,
    kpiStrip: true,
    eventQueue: true,
    inspectorPanel: true,
    geospatialContext: true,
    explainability: true,
    reportAction: true
  },
  defaultEvent: {
    id: 'TH-001',
    latitude: 30.5892,
    longitude: 76.8421,
    riskScore: 87,
    riskLevel: 'HIGH',
    classification: 'Industrial Fire',
    classificationConfidence: 91,
    persistence: '5 / 7 observations',
    nearbyFactory: '180 m',
    pipeline: '420 m',
    industrialZone: '250 m',
    investigationPriority: 'HIGH'
  }
};
