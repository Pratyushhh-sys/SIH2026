import React from 'react';
import { Activity, BarChart3, ChevronRight, CircleDot, LayoutDashboard, Server, ShieldAlert } from 'lucide-react';

const navigation = [
  { id: 'overview', label: 'Tactical overview', icon: LayoutDashboard },
  { id: 'telemetry', label: 'Telemetry feeds', icon: Activity },
  { id: 'matrix', label: 'Threat matrix', icon: BarChart3 },
  { id: 'nodes', label: 'System nodes', icon: Server },
];

export function MobileNav({ activeTab, setActiveTab, totalEvents }) {
  return (
    <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-outline-variant bg-surface-container-lowest px-3 py-2 lg:hidden" aria-label="Mobile navigation">
      {navigation.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => setActiveTab(id)}
          className={`flex shrink-0 items-center gap-2 border px-3 py-2 text-[11px] font-semibold ${
            activeTab === id ? 'border-tertiary/50 bg-tertiary-container text-tertiary' : 'border-outline-variant text-on-surface-variant'
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
          {id === 'telemetry' && <span className="font-code text-[10px]">{totalEvents}</span>}
        </button>
      ))}
    </nav>
  );
}

export default function Sidebar({ activeTab, setActiveTab, totalEvents }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-outline-variant bg-surface-container-lowest px-3 py-4 lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-3 pb-7">
        <div className="flex h-9 w-9 items-center justify-center border border-tertiary/50 bg-tertiary-container text-tertiary">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-label text-[10px] tracking-[0.14em] text-tertiary">TACTICAL OS</p>
          <p className="truncate text-sm font-semibold text-on-surface">Thermal Intel</p>
        </div>
      </div>

      <div className="mb-3 px-3 font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">Workspace</div>
      <nav className="space-y-1" aria-label="Primary navigation">
        {navigation.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`group flex w-full items-center gap-3 border-l-2 px-3 py-3 text-left text-sm transition-colors ${
                active
                  ? 'border-tertiary bg-surface-container-high text-tertiary'
                  : 'border-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {id === 'telemetry' && <span className="font-code text-[10px] text-on-surface-variant">{totalEvents}</span>}
              {active && <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-outline-variant px-3 pt-4">
        <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
          <CircleDot className="h-3.5 w-3.5 text-tertiary" />
          <span>Signal network online</span>
        </div>
        <p className="mt-2 font-code text-[10px] text-on-surface-variant/70">PS 26162 / BUILD 1.0.0</p>
      </div>
    </aside>
  );
}
