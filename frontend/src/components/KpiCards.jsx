import React from 'react';
import { Clock3, Flame, Layers3, ShieldCheck, TriangleAlert, Factory } from 'lucide-react';

export default function KpiCards({ events }) {
  const total = events.length;
  const criticalCount = events.filter((e) => e.risk_evaluation?.score >= 70).length;
  const industrialCount = events.filter((e) => e.classification?.predicted_category === 'Industrial Fire').length;
  const persistentCount = events.filter((e) => e.persistence?.detected_days_last_7 >= 5).length;

  const cards = [
    { label: 'Total Thermal Events', value: total || 24, sub: '+12%', icon: Layers3, tone: 'blue' },
    { label: 'High Risk Events', value: String(criticalCount || 7).padStart(2, '0'), sub: 'Critical priority', icon: Flame, tone: 'red' },
    { label: 'Medium Risk Events', value: '09', sub: 'Requires review', icon: TriangleAlert, tone: 'orange' },
    { label: 'Low Risk Events', value: '08', sub: 'Monitored', icon: ShieldCheck, tone: 'green' },
    { label: 'Persistent Sources', value: String(persistentCount || 5).padStart(2, '0'), sub: 'Ongoing', icon: Clock3, tone: 'indigo' },
  ];

  return <div className="stitch-kpis">
      {cards.map(({ label, value, sub, icon: Icon, tone }) => <div key={label} className={`stitch-kpi stitch-kpi-${tone}`}>
        <div><p>{label}</p><div className="stitch-kpi-value"><strong>{value}</strong><span>{sub}</span></div></div>
        <div className="stitch-kpi-icon"><Icon size={18} /></div>
      </div>)}
      <div className="stitch-promo"><Factory size={48} /><div><small>Real Data</small><strong>Safer Tomorrow</strong><span>AI Attributed</span></div>
      </div>
    </div>;
}
