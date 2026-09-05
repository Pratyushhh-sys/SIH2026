import React, { useRef, useState } from 'react';
import { Bell, Flame, MapPin, Search } from 'lucide-react';

export default function HeaderBar({ events, isLiveApiConnected, searchQuery, setSearchQuery, onSelectEvent }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const matches = searchQuery.trim().length < 2 ? [] : events.filter((event) => {
    const haystack = [event.id, event.name, event.location, event.state, event.classification?.predicted_category, event.riskLevel, `${event.riskLevel} Risk`].join(' ').toLowerCase();
    return haystack.includes(searchQuery.toLowerCase());
  }).slice(0, 6);

  const focusSearch = () => {
    setSearchOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <header className="stitch-header">
      <div className="stitch-brand">
        <div className="stitch-brand-mark"><Flame size={19} fill="currentColor" /></div>
        <div>
          <div className="stitch-brand-title">
            <h1>THERMAL INTELLIGENCE</h1>
            <span>LIVE FEED</span>
          </div>
          <p>Satellite-Based Industrial Fire &amp; Thermal Source Attribution</p>
        </div>
      </div>
      <div className="stitch-tagline">We don't just detect heat. <strong>We understand what it means.</strong></div>
      <div className="stitch-header-actions">
        <div className="stitch-location"><MapPin size={13} /><div><b>India</b><small>National Monitoring</small></div></div>
        <div className="stitch-status"><span /> <div><b>{isLiveApiConnected ? 'SYSTEM ONLINE' : 'DEMO MODE'}</b><small>Last Updated: 03 Sep 2026, 14:32</small></div></div>
        <div className={`stitch-search ${searchOpen ? 'is-open' : ''}`}>
          {searchOpen && <input ref={inputRef} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} onKeyDown={(event) => event.key === 'Escape' && setSearchOpen(false)} placeholder="Search sites, regions, risk..." aria-label="Search thermal sites" />}
          <button className="stitch-icon-button" title="Search" onClick={focusSearch}><Search size={15} /></button>
          {searchOpen && matches.length > 0 && <div className="stitch-search-results">{matches.map((event) => <button key={event.id} onClick={() => { onSelectEvent(event); setSearchQuery(event.id); setSearchOpen(false); }}><b>{event.id}</b><span>{event.location}<small>{event.riskLevel} · {event.classification?.predicted_category}</small></span></button>)}</div>}
        </div>
        <button className="stitch-icon-button stitch-notifications" title="Notifications"><Bell size={15} /><i>3</i></button>
        <div className="stitch-profile"><strong>AD</strong><div><b>Admin</b><small>Investigator</small></div></div>
      </div>
      <div className="stitch-mobile-status">
        <span className="stitch-live-dot" /> {events.length} telemetry events
      </div>
    </header>
  );
}
