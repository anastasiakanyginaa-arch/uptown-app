'use client';

import { useState } from 'react';

const ACCENT = '#C3E788';
const ACCENT_DARK = '#3A5A10';

type Screen = 'home' | 'events' | 'venue' | 'map' | 'profile' | 'results' | 'dinners' | 'dinner-detail' | 'questionnaire' | 'collections' | 'collection-detail' | 'nearby-all';
type Tab = 'home' | 'events' | 'dinners' | 'map' | 'profile';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? '#FFB800' : 'none'}
        stroke={filled ? '#FFB800' : '#CCCCCC'}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Stars({ count = 5, filled = 0 }: { count?: number; filled?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => <StarIcon key={i} filled={i < filled} />)}
    </div>
  );
}

function TabIcon({ id, active, size = 22 }: { id: Tab; active: boolean; size?: number }) {
  const c = active ? '#1A1A1A' : '#AAAAAA';
  const a = active ? ACCENT_DARK : '#AAAAAA';
  if (id === 'home') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 4L21 12V20C21 20.55 20.55 21 20 21H15V16H9V21H4C3.45 21 3 20.55 3 20V12Z"
        fill={active ? ACCENT_DARK : '#CCCCCC'} />
    </svg>
  );
  if (id === 'events') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="3" stroke={a} strokeWidth="2" fill={active ? ACCENT + '44' : 'none'} />
      <line x1="3" y1="9" x2="21" y2="9" stroke={a} strokeWidth="2" />
      <line x1="8" y1="2" x2="8" y2="6" stroke={a} strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="2" x2="16" y2="6" stroke={a} strokeWidth="2" strokeLinecap="round" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" fill={a} />
      <rect x="14" y="13" width="3" height="3" rx="0.5" fill={active ? '#AAAAAA' : '#AAAAAA'} />
    </svg>
  );
  if (id === 'map') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M9 3L3 6V21L9 18L15 21L21 18V3L15 6L9 3Z" stroke={c} strokeWidth="2" strokeLinejoin="round" />
      <line x1="9" y1="3" x2="9" y2="18" stroke={c} strokeWidth="2" />
      <line x1="15" y1="6" x2="15" y2="21" stroke={c} strokeWidth="2" />
    </svg>
  );
  if (id === 'dinners') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M18 2v6c0 2.21-1.79 4-4 4h-4C7.79 12 6 10.21 6 8V2" stroke={active ? ACCENT : '#AAAAAA'} strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="12" y2="22" stroke={active ? ACCENT : '#AAAAAA'} strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="22" x2="16" y2="22" stroke={active ? ACCENT : '#AAAAAA'} strokeWidth="2" strokeLinecap="round"/>
      <line x1="6" y1="6" x2="18" y2="6" stroke={active ? ACCENT : '#AAAAAA'} strokeWidth="1.5"/>
    </svg>
  );
  if (id === 'profile') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="2" />
      <path d="M4 20C4 16.7 7.6 14 12 14s8 2.7 8 6" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  return null;
}

const MicIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="9" y="2" width="6" height="11" rx="3" stroke={color} strokeWidth="1.8" />
    <path d="M5 10c0 3.87 3.13 7 7 7s7-3.13 7-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="8" y1="21" x2="16" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const FoodIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11 2L11 22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 2C8 2 6 5 6 8C6 11 8 12 8 12V22" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2V8C14 10.5 16 12 16 12V22" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8H18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PartyIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8" />
    <circle cx="12" cy="4" r="1.5" fill={color} />
    <circle cx="12" cy="20" r="1.5" fill={color} />
    <circle cx="4" cy="12" r="1.5" fill={color} />
    <circle cx="20" cy="12" r="1.5" fill={color} />
  </svg>
);

const ExhibitIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="9" y="2" width="6" height="8" rx="1" stroke={color} strokeWidth="1.8" />
    <rect x="3" y="14" width="6" height="8" rx="1" stroke={color} strokeWidth="1.8" />
    <rect x="15" y="14" width="6" height="8" rx="1" stroke={color} strokeWidth="1.8" />
    <path d="M12 10V13M6 13H18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PaletteIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 2.76 1.58 5 4 6.32V20h12v-1.68C20.42 17 22 14.76 22 12c0-5.52-4.48-10-10-10z" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="8" cy="11" r="1.5" fill={color} />
    <circle cx="12" cy="8" r="1.5" fill={color} />
    <circle cx="16" cy="11" r="1.5" fill={color} />
    <circle cx="15" cy="15" r="1.5" fill={color} />
    <circle cx="9" cy="15" r="1.5" fill={color} />
  </svg>
);

const FilmIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.8" />
    <path d="M8 4L6 8M14 4L12 8M20 4L18 8M2 8H22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 13l5-3-5-3v6z" fill={color} />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="#555" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="18" cy="5" r="3" stroke="#555" strokeWidth="1.8" />
    <circle cx="6" cy="12" r="3" stroke="#555" strokeWidth="1.8" />
    <circle cx="18" cy="19" r="3" stroke="#555" strokeWidth="1.8" />
  </svg>
);

const WebIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#555" strokeWidth="1.8" />
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#555" strokeWidth="1.8" />
    <line x1="3" y1="9" x2="21" y2="9" stroke="#555" strokeWidth="1.8" />
    <line x1="3" y1="15" x2="21" y2="15" stroke="#555" strokeWidth="1.8" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M5 4h4l2 5-2.5 1.5c1 2 3 4 5 5L15 13l5 2v4c0 1.1-.9 2-2 2C7.61 21 3 16.39 3 6c0-1.1.9-2 2-2z" stroke="#555" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z" stroke="#555" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const RouteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="6" r="2.5" stroke="#555" strokeWidth="1.8" />
    <circle cx="19" cy="18" r="2.5" stroke="#555" strokeWidth="1.8" />
    <path d="M5 8.5C5 12 10 12 10 15.5S15 19 19 15.5" stroke="#555" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div style={{
      height: 44,
      paddingLeft: 24,
      paddingRight: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>10:56</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="16" height="12" viewBox="0 0 17 12">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="#1A1A1A" />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" fill="#1A1A1A" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill="#1A1A1A" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#E0E0E0" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#1A1A1A" />
          <path d="M3.5 6.5C5 5 6.4 4.2 8 4.2s3 .8 4.5 2.3" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M1 3.5C3.3 1.3 5.5 0 8 0s4.7 1.3 7 3.5" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="#1A1A1A" strokeWidth="1" />
          <rect x="2" y="2" width="17" height="9" rx="1.5" fill="#1A1A1A" />
          <path d="M23.5 4.5v4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────

function BottomTabBar({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'events', label: 'Events' },
    { id: 'dinners', label: 'Ужины' },
    { id: 'home', label: 'Home' },
    { id: 'map', label: 'Map' },
    { id: 'profile', label: 'Profile' },
  ];
  return (
    <div style={{
      height: 83,
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #F0F0F0',
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 10,
      flexShrink: 0,
      position: 'relative',
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isHome = tab.id === 'home';

        return (
          <button key={tab.id} onClick={() => onTabChange(tab.id)} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px 0 0',
          }}>
            <TabIcon id={tab.id} active={isActive} size={isHome ? 26 : 22} />
            <span style={{
              fontSize: 10,
              color: isActive ? (isHome ? ACCENT_DARK : '#1A1A1A') : '#AAAAAA',
              fontWeight: isActive ? 600 : 400,
            }}>
              {tab.label}
            </span>
            {/* Active dot indicator */}
            <div style={{
              width: isActive ? (isHome ? 5 : 4) : 0,
              height: isActive ? (isHome ? 5 : 4) : 0,
              borderRadius: '50%',
              backgroundColor: isHome ? ACCENT_DARK : '#1A1A1A',
              marginTop: -2,
              transition: 'all 0.15s ease',
            }} />
          </button>
        );
      })}
    </div>
  );
}

// ─── Events Screen ────────────────────────────────────────────────────────────

function EventsScreen({
  selectedCategories,
  setSelectedCategories,
  onViewResults,
}: {
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  onViewResults: () => void;
}) {
  const categories = [
    { id: 'concerts', label: 'Concerts', Icon: MicIcon },
    { id: 'food', label: 'Food events', Icon: FoodIcon },
    { id: 'parties', label: 'Parties', Icon: PartyIcon },
    { id: 'exhibitions', label: 'Exhibitions', Icon: ExhibitIcon },
    { id: 'masterclasses', label: 'Master classes', Icon: PaletteIcon },
    { id: 'screenings', label: 'Screenings', Icon: FilmIcon },
  ];

  const toggle = (id: string) =>
    setSelectedCategories(
      selectedCategories.includes(id)
        ? selectedCategories.filter((c) => c !== id)
        : [...selectedCategories, id]
    );

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Event hero banner */}
      <div style={{
        height: 270,
        background: 'linear-gradient(180deg, #111 0%, #1E1E1E 50%, #2A2A2A 100%)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* City selector */}
        <div style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 20,
          padding: '5px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          whiteSpace: 'nowrap',
        }}>
          <span style={{ color: '#FFF', fontSize: 14, fontWeight: 500 }}>Moscow</span>
          <svg width="10" height="6" viewBox="0 0 10 6">
            <path d="M1 1L5 5L9 1" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Abstract silhouette */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            {/* Bunny ears */}
            <ellipse cx="90" cy="60" rx="22" ry="55" fill="#0A0A0A" />
            <ellipse cx="170" cy="60" rx="22" ry="55" fill="#0A0A0A" />
            <ellipse cx="90" cy="65" rx="10" ry="35" fill="#1A1A1A" />
            <ellipse cx="170" cy="65" rx="10" ry="35" fill="#1A1A1A" />
            {/* Head */}
            <ellipse cx="130" cy="130" rx="65" ry="60" fill="#111" />
            {/* Eyes */}
            <ellipse cx="108" cy="118" rx="10" ry="12" fill="#E8E8E8" />
            <ellipse cx="152" cy="118" rx="10" ry="12" fill="#E8E8E8" />
            <circle cx="111" cy="120" r="6" fill="#1A1A1A" />
            <circle cx="155" cy="120" r="6" fill="#1A1A1A" />
            {/* Bow tie */}
            <path d="M110 165L130 155L150 165L130 175Z" fill="#2A2A2A" />
            <circle cx="130" cy="165" r="4" fill="#3A3A3A" />
            {/* Event text */}
            <text x="130" y="100" textAnchor="middle" fill="#C3263A" fontSize="11" fontWeight="bold" letterSpacing="2">XTREME ×</text>
            <text x="130" y="114" textAnchor="middle" fill="#C3263A" fontSize="11" fontWeight="bold" letterSpacing="2">DAILY SLIME</text>
          </svg>
        </div>

        {/* Event info card */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(25,25,25,0.88)',
          padding: '10px 16px 12px',
        }}>
          <p style={{ color: '#FFF', fontSize: 14, fontWeight: 700, margin: 0, lineHeight: 1.35 }}>
            XTREME × DAILY SLIME × DISCO CLUB at DK Kristall
          </p>
          <p style={{ color: '#AAAAAA', fontSize: 12, margin: '4px 0 2px' }}>From 10.04.26 to 11.04.26</p>
          <p style={{ color: '#AAAAAA', fontSize: 12, margin: 0 }}>from 2000₽</p>
        </div>
      </div>

      {/* Venue label separator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        gap: 8,
        borderBottom: '1px solid #F0F0F0',
      }}>
        <div style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0' }} />
        <span style={{ fontSize: 10, color: '#AAAAAA', letterSpacing: 2, textTransform: 'uppercase' }}>
          Двор Кристалл
        </span>
        <div style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0' }} />
      </div>

      {/* Filter section */}
      <div style={{ padding: '14px 16px 0' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>Where do you want to go?</span>
          <div style={{ border: `1.5px solid ${ACCENT}`, borderRadius: 8, padding: '5px 10px' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#1A1A1A' }}>10.04.2026</span>
          </div>
        </div>

        {/* Category grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
          {categories.map(({ id, label, Icon }) => {
            const sel = selectedCategories.includes(id);
            return (
              <button key={id} onClick={() => toggle(id)} style={{
                backgroundColor: sel ? ACCENT + '33' : '#F5F5F5',
                border: `1.5px solid ${sel ? ACCENT : 'transparent'}`,
                borderRadius: 12,
                padding: '13px 6px 11px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 7,
                cursor: 'pointer',
              }}>
                <Icon color={sel ? ACCENT_DARK : '#888'} />
                <span style={{ fontSize: 11, color: sel ? ACCENT_DARK : '#555', textAlign: 'center', lineHeight: 1.2 }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA buttons */}
      <div style={{ padding: '10px 16px 16px', display: 'flex', gap: 10 }}>
        <button onClick={() => setSelectedCategories([])} style={{
          flex: 1,
          height: 52,
          backgroundColor: '#EFEFEF',
          border: 'none',
          borderRadius: 14,
          fontSize: 15,
          fontWeight: 600,
          color: '#1A1A1A',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          Reset
        </button>
        <button onClick={onViewResults} style={{
          flex: 2,
          height: 52,
          backgroundColor: ACCENT,
          border: 'none',
          borderRadius: 14,
          fontSize: 15,
          fontWeight: 700,
          color: ACCENT_DARK,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          40 options
        </button>
      </div>
    </div>
  );
}

// ─── Venue Detail Screen ──────────────────────────────────────────────────────

function VenueScreen({ onBack, placeIdx, likedSlot }: {
  onBack: () => void;
  placeIdx: number;
  likedSlot?: { isLiked: boolean; toggle: () => void };
}) {
  const place = PLACES[placeIdx];
  const imgs = place.imgs ?? [place.img];
  const [slideIdx, setSlideIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [userRating, setUserRating] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setSlideIdx(i => Math.min(i + 1, imgs.length - 1));
      else setSlideIdx(i => Math.max(i - 1, 0));
    }
    setTouchStartX(null);
  };

  const MOCK_REVIEWS = [
    { name: 'Анастасия К.', date: 'Сб, 15 апр', stars: 5, text: 'Невероятный SPA — горячие камни просто улёт! Буду возвращаться снова и снова, очень душевная атмосфера.' },
    { name: 'Михаил Р.', date: 'Пт, 07 апр', stars: 5, text: 'Первый визит — и сразу влюбился. Флоатинг снял весь стресс за 90 минут.' },
    { name: 'Ольга С.', date: 'Вс, 02 апр', stars: 4, text: 'Очень приятный персонал, чистота на уровне. Массаж лица — рекомендую.' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#FFF', position: 'relative', display: 'flex', flexDirection: 'column' }}>

      {/* ── Photo slider ── */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden', flexShrink: 0 }}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div style={{
          display: 'flex', height: '100%',
          width: `${imgs.length * 100}%`,
          transform: `translateX(-${slideIdx * (100 / imgs.length)}%)`,
          transition: 'transform 0.3s ease',
        }}>
          {imgs.map((src, i) => (
            <div key={i} style={{ width: `${100 / imgs.length}%`, flexShrink: 0, height: '100%' }}>
              <img src={src} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
        {/* Back */}
        <button onClick={onBack} style={{
          position: 'absolute', top: 14, left: 14,
          width: 36, height: 36, borderRadius: 18,
          backgroundColor: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(6px)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Like / Heart */}
        <button onClick={() => likedSlot?.toggle()} style={{
          position: 'absolute', top: 14, right: 14,
          width: 36, height: 36, borderRadius: 18,
          backgroundColor: likedSlot?.isLiked ? 'rgba(255,80,80,0.85)' : 'rgba(0,0,0,0.38)',
          backdropFilter: 'blur(6px)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background-color 0.2s',
        }}>
          <svg width="18" height="17" viewBox="0 0 24 22" fill="none">
            <path d="M12 21C12 21 2 14 2 7a5 5 0 0110 0 5 5 0 0110 0c0 7-10 14-10 14z"
              fill={likedSlot?.isLiked ? '#FFF' : 'none'}
              stroke="#FFF" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* CTA badge — bottom-left of photo */}
        {place.partner && place.cta && (
          <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
            <PartnerBadge size="md" label={place.cta} />
          </div>
        )}
        {/* Dots — bottom right */}
        {imgs.length > 1 && (
          <div style={{ position: 'absolute', bottom: 16, right: 14, display: 'flex', gap: 5, pointerEvents: 'none' }}>
            {imgs.map((_, i) => (
              <div key={i} style={{
                height: 5, borderRadius: 3,
                width: i === slideIdx ? 18 : 5,
                backgroundColor: i === slideIdx ? '#FFF' : 'rgba(255,255,255,0.5)',
                transition: 'width 0.2s ease',
              }} />
            ))}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '16px 16px 100px', flex: 1 }}>

        {/* Category tags */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 16 }}>
          {place.sub.split(' · ').map(tag => (
            <span key={tag} style={{
              flexShrink: 0, backgroundColor: '#F2F2F2', color: '#555',
              fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20,
            }}>{tag}</span>
          ))}
        </div>

        {/* Title + sub */}
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1A1A1A', margin: '0 0 4px', lineHeight: 1.1 }}>{place.name}</h1>
        <p style={{ fontSize: 14, color: '#999', margin: '0 0 14px' }}>{place.sub} · {place.km}</p>

        {/* App stars rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Stars count={5} filled={Math.round(parseFloat(place.yrating))} />
          <span style={{ fontSize: 13, color: '#999' }}>{place.yrating} ({place.reviews})</span>
        </div>

        {/* Yandex rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: '#FC3F1D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#FFF', fontSize: 13, fontWeight: 900, fontFamily: 'serif' }}>Я</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{place.yrating}</span>
          <span style={{ fontSize: 13, color: '#999' }}>({place.reviews})</span>
        </div>

        <div style={{ height: 1, backgroundColor: '#F0F0F0', marginBottom: 18 }} />

        {/* ── Partner CTA block ── */}
        {place.partner && (
          <div style={{ backgroundColor: ACCENT + '33', borderRadius: 16, padding: '14px 16px', marginBottom: 20 }}>
            {place.offer && (
              <p style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: ACCENT_DARK, lineHeight: 1.45 }}>✦ {place.offer}</p>
            )}
            <button style={{
              padding: '9px 22px',
              backgroundColor: ACCENT_DARK, color: '#FFF',
              border: 'none', borderRadius: 20, cursor: 'pointer',
              fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
            }}>Записаться →</button>
          </div>
        )}

        {/* Description */}
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#333', margin: '0 0 20px' }}>
          {place.desc}
        </p>

        <div style={{ height: 1, backgroundColor: '#F0F0F0', marginBottom: 18 }} />

        {/* Address */}
        <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A', margin: '0 0 4px' }}>Адрес</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ fontSize: 13, color: '#555', margin: 0 }}>ул. Тверская, 12с1</p>
          <span style={{ fontSize: 12, color: '#999' }}>🚶 {place.km}</span>
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', height: 180, marginBottom: 20 }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=37.59,55.75,37.63,55.77&layer=mapnik&marker=55.760,37.610"
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="map"
          />
        </div>

        <div style={{ height: 1, backgroundColor: '#F0F0F0', marginBottom: 18 }} />

        {/* Working hours */}
        <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A', margin: '0 0 10px' }}>Часы работы</h3>
        {[['Пн–Пт', '10:00–22:00'], ['Сб–Вс', '09:00–23:00']].map(([days, hours]) => (
          <div key={days} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 14, color: '#555' }}>{days}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{hours}</span>
          </div>
        ))}

        <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '18px 0' }} />

        {/* Ratings & Reviews */}
        <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A', margin: '0 0 16px' }}>Оценки и отзывы</h3>

        {/* Overall rating */}
        <div style={{ backgroundColor: '#F7F7F7', borderRadius: 16, padding: '16px', marginBottom: 16, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#FC3F1D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#FFF', fontSize: 11, fontWeight: 900, fontFamily: 'serif' }}>Я</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800 }}>{place.yrating}</span>
            <span style={{ fontSize: 13, color: '#999' }}>({place.reviews})</span>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: '#999' }}>Оцените место</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setUserRating(n)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={n <= userRating ? '#FC3F1D' : 'none'} stroke={n <= userRating ? '#FC3F1D' : '#CCCCCC'} strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {MOCK_REVIEWS.map((r, i) => (
          <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < MOCK_REVIEWS.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 14, color: '#999' }}>👤</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{r.name}</p>
                  <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                    {[1,2,3,4,5].map(n => (
                      <svg key={n} width="11" height="11" viewBox="0 0 24 24" fill={n <= r.stars ? '#FC3F1D' : '#DDD'} stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 11, color: '#AAAAAA' }}>{r.date}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#444' }}>{r.text}</p>
          </div>
        ))}

      </div>

      {/* ── Floating action bar ── */}
      <div style={{
        position: 'sticky', bottom: 14,
        marginLeft: 40, marginRight: 40,
        borderRadius: 28,
        backgroundColor: 'rgba(235,235,235,0.96)', backdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '8px 4px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        flexShrink: 0,
      }}>
        {[ShareIcon, WebIcon, PhoneIcon, BookmarkIcon, RouteIcon].map((Icon, i) => (
          <button key={i} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px 8px', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

const STORIES = [
  { label: 'The Body', img: 'https://picsum.photos/seed/story-spa/80/80' },
  { label: 'Monoroom', img: 'https://picsum.photos/seed/story-bar/80/80' },
  { label: 'Verde', img: 'https://picsum.photos/seed/story-rest/80/80' },
  { label: 'Sound Lab', img: 'https://picsum.photos/seed/story-club/80/80' },
  { label: 'Cellar', img: 'https://picsum.photos/seed/story-wine/80/80' },
  { label: 'Art Loft', img: 'https://picsum.photos/seed/story-art/80/80' },
];

const REELS = [
  {
    img: 'https://picsum.photos/seed/reel-spa-01/375/500',
    place: 'The Body SPA',
    caption: 'Горячие камни и полный релакс — наш тест',
    tag: 'SPA',
    views: '12.4K',
    km: '1.2 km',
  },
  {
    img: 'https://picsum.photos/seed/reel-bar-02/375/500',
    place: 'Monoroom',
    caption: 'Лучший джаз-вечер в городе — обзор',
    tag: 'Bar',
    views: '8.1K',
    km: '0.8 km',
  },
  {
    img: 'https://picsum.photos/seed/reel-food-03/375/500',
    place: 'Verde Garden',
    caption: 'Бранч с видом на парк — стоит ли идти?',
    tag: 'Food',
    views: '19.2K',
    km: '2.1 km',
  },
  {
    img: 'https://picsum.photos/seed/reel-club-04/375/500',
    place: 'Sound Lab',
    caption: 'Техно-пятница: атмосфера и звук',
    tag: 'Club',
    views: '31.7K',
    km: '3.0 km',
  },
];

const COLLECTIONS = [
  { title: 'SPA-уикенд',      count: 8,  desc: 'Лучшие SPA и массаж',        img: 'https://picsum.photos/seed/col-spa/600/400',    category: 'spa',   sponsored: true  },
  { title: 'Вечер пятницы',   count: 14, desc: 'Бары, клубы и живая музыка',  img: 'https://picsum.photos/seed/col-friday/600/400', category: 'bars',  sponsored: false },
  { title: 'Бранч в Москве',  count: 11, desc: 'Завтраки и воскресные бранчи',img: 'https://picsum.photos/seed/col-brunch/600/400', category: 'food',  sponsored: true  },
  { title: 'Арт и культура',  count: 7,  desc: 'Галереи, студии и выставки',  img: 'https://picsum.photos/seed/col-art/600/400',    category: 'art',   sponsored: false },
  { title: 'Дата-найт',       count: 9,  desc: 'Романтические вечера',        img: 'https://picsum.photos/seed/col-date/600/400',   category: null,    sponsored: false },
  { title: 'Активный отдых',  count: 6,  desc: 'Спорт, йога и фитнес',        img: 'https://picsum.photos/seed/col-sport/600/400',  category: 'sport', sponsored: false },
];

const PLACES = [
  { name: 'The Body',      sub: 'SPA · Массаж',          category: 'spa',   yrating: '5.0', reviews: 220, km: '1.2 km', img: 'https://picsum.photos/seed/pl-spa/375/160',     partner: true,  cta: 'Новое меню',          offer: 'Попробуйте горячие камни — хит сезона', imgs: ['https://picsum.photos/seed/pl-spa/375/300',     'https://picsum.photos/seed/pl-spa-b/375/300',     'https://picsum.photos/seed/pl-spa-c/375/300'],     desc: 'Авторские SPA-программы с горячими камнями и ароматерапией. Для быстрой перезагрузки — массаж лица 30 минут. Используем натуральные масла ручного отжима.' },
  { name: 'Atelier SPA',  sub: 'Флоатинг · Релакс',      category: 'spa',   yrating: '5.0', reviews: 312, km: '0.9 km', img: 'https://picsum.photos/seed/pl-atelier/375/160', partner: true,  cta: 'Открылась веранда',   offer: 'Рекомендуем флоатинг 90 мин',          imgs: ['https://picsum.photos/seed/pl-atelier/375/300', 'https://picsum.photos/seed/pl-atelier-b/375/300', 'https://picsum.photos/seed/pl-atelier-c/375/300'], desc: 'Флоатинг-камеры с эпсомской солью и LED-светотерапией. Полное отключение от внешнего мира за 60–90 минут. Новая летняя веранда для релакс-процедур на воздухе.' },
  { name: 'Float House',  sub: 'Флоатинг · Массаж',      category: 'spa',   yrating: '4.7', reviews: 88,  km: '3.2 km', img: 'https://picsum.photos/seed/pl-float/375/160',   partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-float/375/300',   'https://picsum.photos/seed/pl-float-b/375/300',   'https://picsum.photos/seed/pl-float-c/375/300'],   desc: 'Студия флоатинга с двумя камерами и зоной массажа. Тихое место для восстановления после тренировок или насыщенной рабочей недели.' },
  { name: 'Monoroom',     sub: 'Bar · Jazz',              category: 'bars',  yrating: '4.8', reviews: 450, km: '0.8 km', img: 'https://picsum.photos/seed/pl-bar/375/160',     partner: true,  cta: 'Живая музыка пт–сб',  offer: 'Счастливые часы 18–20, коктейли −30%', imgs: ['https://picsum.photos/seed/pl-bar/375/300',     'https://picsum.photos/seed/pl-bar-b/375/300',     'https://picsum.photos/seed/pl-bar-c/375/300'],     desc: 'Джазовый бар с живой музыкой по пятницам и субботам. Авторские коктейли, виниловые пластинки и атмосфера, куда хочется возвращаться снова.' },
  { name: 'Ritual Bar',   sub: 'Коктейли · Музыка',       category: 'bars',  yrating: '4.7', reviews: 180, km: '1.8 km', img: 'https://picsum.photos/seed/pl-ritual/375/160',  partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-ritual/375/300',  'https://picsum.photos/seed/pl-ritual-b/375/300',  'https://picsum.photos/seed/pl-ritual-c/375/300'],  desc: 'Концептуальный бар с авторскими низкоалкогольными коктейлями. Каждый дринк — как ритуал: сезонные ингредиенты, необычные сочетания вкусов.' },
  { name: 'Cellar',       sub: 'Wine Bar',                category: 'bars',  yrating: '4.9', reviews: 95,  km: '2.5 km', img: 'https://picsum.photos/seed/pl-cellar/375/160',  partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-cellar/375/300',  'https://picsum.photos/seed/pl-cellar-b/375/300',  'https://picsum.photos/seed/pl-cellar-c/375/300'],  desc: 'Винный бар в историческом подвале с картой из 200+ позиций. Уютные столики, сырная тарелка и сомелье, который подберёт вино под ваше настроение.' },
  { name: 'Verde Garden', sub: 'Ресторан',                category: 'food',  yrating: '4.6', reviews: 310, km: '2.1 km', img: 'https://picsum.photos/seed/pl-rest/375/160',    partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-rest/375/300',    'https://picsum.photos/seed/pl-rest-b/375/300',    'https://picsum.photos/seed/pl-rest-c/375/300'],    desc: 'Ресторан с открытым садом и сезонным меню. Шеф-повар работает напрямую с фермерами Подмосковья, меняя меню каждые две недели.' },
  { name: 'Nori',         sub: 'Японский ресторан',       category: 'food',  yrating: '4.8', reviews: 220, km: '1.1 km', img: 'https://picsum.photos/seed/pl-nori/375/160',    partner: true,  cta: 'Сезонное меню',       offer: 'Берите сет Омакасе — 8 блюд от шефа',  imgs: ['https://picsum.photos/seed/pl-nori/375/300',    'https://picsum.photos/seed/pl-nori-b/375/300',    'https://picsum.photos/seed/pl-nori-c/375/300'],    desc: 'Японский ресторан с омакасе-сетами от шефа, который учился в Токио. Только свежая рыба и морепродукты, доставка три раза в неделю.' },
  { name: 'Grøn',         sub: 'Веганское кафе',          category: 'food',  yrating: '4.7', reviews: 140, km: '2.3 km', img: 'https://picsum.photos/seed/pl-gron/375/160',    partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-gron/375/300',    'https://picsum.photos/seed/pl-gron-b/375/300',    'https://picsum.photos/seed/pl-gron-c/375/300'],    desc: 'Уютное скандинавское веганское кафе. Боулы, авокадо-тосты, смузи и specialty-кофе. Всё готовится без глютена и молочных продуктов.' },
  { name: 'Sound Lab',    sub: 'Клуб · Техно',            category: 'clubs', yrating: '4.9', reviews: 560, km: '3.0 km', img: 'https://picsum.photos/seed/pl-club/375/160',    partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-club/375/300',    'https://picsum.photos/seed/pl-club-b/375/300',    'https://picsum.photos/seed/pl-club-c/375/300'],    desc: 'Техно-клуб с профессиональным звуком Funktion-One. Резиденты — ведущие диджеи Берлина и Москвы. Открыт по пятницам и субботам до 6 утра.' },
  { name: 'FABRIC',       sub: 'Клуб · Музыка',           category: 'clubs', yrating: '4.6', reviews: 280, km: '4.1 km', img: 'https://picsum.photos/seed/pl-fabric/375/160',  partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-fabric/375/300',  'https://picsum.photos/seed/pl-fabric-b/375/300',  'https://picsum.photos/seed/pl-fabric-c/375/300'],  desc: 'Многозальный клуб для любителей электронной музыки. Три этажа, пять резидентских программ в неделю и roof с видом на ночную Москву.' },
  { name: 'Art Loft',     sub: 'Галерея · Кофе',          category: 'art',   yrating: '4.8', reviews: 112, km: '1.5 km', img: 'https://picsum.photos/seed/pl-art/375/160',     partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-art/375/300',     'https://picsum.photos/seed/pl-art-b/375/300',     'https://picsum.photos/seed/pl-art-c/375/300'],     desc: 'Галерея современного искусства с кофейней. Постоянная смена выставок, арт-резиденции и воскресные открытые лекции для всех желающих.' },
  { name: 'Bloom Studio', sub: 'Флористика · Кафе',       category: 'art',   yrating: '4.9', reviews: 88,  km: '0.6 km', img: 'https://picsum.photos/seed/pl-bloom/375/160',   partner: true,  cta: 'Мастер-класс в сб',   offer: 'Матча-латте с миндальным молоком',      imgs: ['https://picsum.photos/seed/pl-bloom/375/300',   'https://picsum.photos/seed/pl-bloom-b/375/300',   'https://picsum.photos/seed/pl-bloom-c/375/300'],   desc: 'Цветочная студия-кафе с авторскими букетами и мастер-классами по флористике каждую субботу. Попробуйте фирменный матча-латте с миндальным молоком.' },
  { name: 'Move Studio',  sub: 'Фитнес · Пилатес',        category: 'sport', yrating: '4.8', reviews: 165, km: '1.4 km', img: 'https://picsum.photos/seed/pl-move/375/160',    partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-move/375/300',    'https://picsum.photos/seed/pl-move-b/375/300',    'https://picsum.photos/seed/pl-move-c/375/300'],    desc: 'Бутик-студия пилатеса и функционального тренинга. Небольшие группы, персональный подход и тренеры с международными сертификатами.' },
  { name: 'Kazan Ring',   sub: 'Бокс · Фитнес',           category: 'sport', yrating: '4.6', reviews: 90,  km: '2.8 km', img: 'https://picsum.photos/seed/pl-kazan/375/160',   partner: false, cta: undefined,             offer: null,                                   imgs: ['https://picsum.photos/seed/pl-kazan/375/300',   'https://picsum.photos/seed/pl-kazan-b/375/300',   'https://picsum.photos/seed/pl-kazan-c/375/300'],   desc: 'Боксёрский зал с профессиональным рингом. Тренировки для новичков и опытных спортсменов, групповые классы и персональные сессии с тренером.' },
];

// Tier 3 — Spotlight (premium placement)
const SPOTLIGHT = {
  name: 'Atelier SPA',
  sub: 'SPA · Массаж · Флоатинг',
  img: 'https://picsum.photos/seed/spotlight-spa/375/480',
  yrating: '5.0',
  reviews: 312,
  km: '0.9 km',
  offer: 'Рекомендуем флоатинг в паре — незабываемо',
  desc: 'Флоатинг, горячие камни и авторские массажи. Попробуйте флоатинг в паре — особый опыт расслабления.',
};

// Tier 2 — Рекомендованные партнёры (featured section)
const FEATURED_PARTNERS = [
  { name: 'Bloom Studio', sub: 'Флористика · Кафе', img: 'https://picsum.photos/seed/feat-bloom/200/240', tag: 'Новое', km: '0.6 km', offer: 'Матча-латте с миндальным молоком', cta: 'Мастер-класс в сб' },
  { name: 'Ritual Bar', sub: 'Коктейли · Музыка', img: 'https://picsum.photos/seed/feat-ritual/200/240', tag: 'Топ', km: '1.8 km', offer: '2 коктейля по цене 1 до 21:00', cta: 'Живая музыка пт–сб' },
  { name: 'Grøn', sub: 'Веганское кафе', img: 'https://picsum.photos/seed/feat-gron/200/240', tag: 'Тренд', km: '2.3 km', offer: 'Попробуйте боул с авокадо и нутом', cta: 'Новинки в меню' },
];

function PlayButton() {
  return (
    <div style={{
      width: 52, height: 52, borderRadius: 26,
      backgroundColor: 'rgba(255,255,255,0.22)',
      backdropFilter: 'blur(6px)',
      border: '1.5px solid rgba(255,255,255,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path d="M1 1.5L17 10L1 18.5V1.5Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ReelCard({ reel, onClick }: { reel: typeof REELS[0]; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', border: 'none', padding: 0, cursor: 'pointer',
      position: 'relative', display: 'block', backgroundColor: 'transparent',
    }}>
      <div style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden' }}>
        <img
          src={reel.img}
          alt={reel.place}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)',
        }} />
        {/* Play button center */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <PlayButton />
        </div>
        {/* Views top-right */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          display: 'flex', alignItems: 'center', gap: 4,
          backgroundColor: 'rgba(0,0,0,0.35)',
          borderRadius: 20, padding: '4px 10px',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="white" />
          </svg>
          <span style={{ color: '#FFF', fontSize: 11, fontWeight: 600 }}>{reel.views}</span>
        </div>
        {/* Bottom info */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{
              backgroundColor: ACCENT, color: ACCENT_DARK,
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12,
            }}>{reel.tag}</span>
            <span style={{
              backgroundColor: 'rgba(255,255,255,0.18)', color: '#FFF',
              fontSize: 11, padding: '3px 9px', borderRadius: 12,
            }}>{reel.km}</span>
          </div>
          <p style={{ color: '#FFF', fontSize: 15, fontWeight: 700, margin: '0 0 3px', lineHeight: 1.3 }}>
            {reel.place}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: 0, lineHeight: 1.4 }}>
            {reel.caption}
          </p>
        </div>
      </div>
    </button>
  );
}

const CATEGORIES = [
  { id: 'all', label: 'Всё' },
  { id: 'events', label: 'События' },
  { id: 'spa', label: 'SPA' },
  { id: 'bars', label: 'Бары' },
  { id: 'food', label: 'Еда' },
  { id: 'clubs', label: 'Клубы' },
  { id: 'art', label: 'Арт' },
  { id: 'sport', label: 'Спорт' },
];

const NEW_PLACES = [
  { name: 'Bloom Studio', sub: 'Флористика · Кафе', km: '0.6 km', img: 'https://picsum.photos/seed/new-bloom/200/200', isNew: true },
  { name: 'Nori', sub: 'Японский ресторан', km: '1.1 km', img: 'https://picsum.photos/seed/new-nori/200/200', isNew: true },
  { name: 'Ritual Bar', sub: 'Бар · Коктейли', km: '1.8 km', img: 'https://picsum.photos/seed/new-ritual/200/200', isNew: true },
  { name: 'Grøn', sub: 'Веганское кафе', km: '2.3 km', img: 'https://picsum.photos/seed/new-gron/200/200', isNew: true },
];

const COMING_SOON = [
  { name: 'Atelier SPA', date: '20 апр', img: 'https://picsum.photos/seed/soon-spa/375/180', category: 'SPA' },
  { name: 'Smoke & Vinyl', date: '1 мая', img: 'https://picsum.photos/seed/soon-bar/375/180', category: 'Bar' },
];

const TOP_WEEK = [
  { rank: 1, name: 'The Body', sub: 'SPA', yrating: '5.0', img: 'https://picsum.photos/seed/top-spa/80/80', badge: ACCENT },
  { rank: 2, name: 'Sound Lab', sub: 'Club', yrating: '4.9', img: 'https://picsum.photos/seed/top-club/80/80', badge: '#E8E8E8' },
  { rank: 3, name: 'Verde Garden', sub: 'Restaurant', yrating: '4.6', img: 'https://picsum.photos/seed/top-rest/80/80', badge: '#E8E8E8' },
];

// ─── Partner Badge ────────────────────────────────────────────────────────────

function PartnerBadge({ size = 'md', label }: { size?: 'sm' | 'md'; label?: string }) {
  const sm = size === 'sm';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: sm ? 3 : 4,
      backgroundColor: ACCENT,
      padding: sm ? '2px 6px' : '3px 8px',
      borderRadius: 20,
      maxWidth: sm ? 120 : 140,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}>
      <svg style={{ flexShrink: 0 }} width={sm ? 7 : 8} height={sm ? 7 : 8} viewBox="0 0 10 10" fill="none">
        <path d="M5 0.5L6.2 3.7H9.8L6.95 5.8L8.09 9.1L5 7.05L1.91 9.1L3.05 5.8L0.2 3.7H3.8Z" fill={ACCENT_DARK}/>
      </svg>
      <span style={{ fontSize: sm ? 9 : 10, fontWeight: 700, color: ACCENT_DARK, letterSpacing: 0.1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{label ?? 'Партнёр'}</span>
    </div>
  );
}

// ─── Weekly Places Section ────────────────────────────────────────────────────

function WeeklySection({ onVenueClick, onAllClick }: { onVenueClick: (idx: number) => void; onAllClick: () => void }) {
  const hero = PLACES[1]; // Atelier SPA
  const rest = [PLACES[0], PLACES[3], PLACES[7], PLACES[12], PLACES[13]];
  return (
    <div style={{ backgroundColor: '#FFF', marginTop: 8, padding: '20px 0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 14 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A' }}>Места недели</span>
        <button onClick={onAllClick} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: ACCENT_DARK, fontWeight: 600, fontFamily: 'inherit', padding: 0 }}>Все →</button>
      </div>

      {/* Hero card */}
      <div style={{ padding: '0 20px', marginBottom: 14 }}>
        <button onClick={() => onVenueClick(PLACES.indexOf(hero))} style={{ width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
          <div style={{ width: '100%', height: 210, borderRadius: 22, overflow: 'hidden', position: 'relative' }}>
            <img src={hero.img} alt={hero.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.0) 55%)' }} />
            {/* Tag top-left */}
            <div style={{ position: 'absolute', top: 14, left: 14 }}>
              <span style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: '#FFF', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 20 }}>Место недели</span>
            </div>
            {/* Rating top-right */}
            <div style={{ position: 'absolute', top: 14, right: 14 }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: '#1A1A1A', fontSize: 12, fontWeight: 700, padding: '5px 10px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#FFB800' }}>★</span> {hero.yrating}
              </span>
            </div>
            {/* Bottom info */}
            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
              <p style={{ margin: '0 0 4px', color: '#FFF', fontSize: 19, fontWeight: 800, lineHeight: 1.2 }}>{hero.name}</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)', fontSize: 12 }}>{hero.sub} · {hero.km}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Horizontal scroll — small cards */}
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', paddingLeft: 20, paddingRight: 20 }}>
        {rest.map((p, i) => (
          <button key={i} onClick={() => onVenueClick(PLACES.indexOf(p))} style={{
            flexShrink: 0, width: 132,
            background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{ width: 132, height: 132, borderRadius: 18, overflow: 'hidden', position: 'relative', marginBottom: 8 }}>
              <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {/* Rating pill */}
              <div style={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', borderRadius: 10, padding: '3px 7px', display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ color: '#FFB800', fontSize: 9 }}>★</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#1A1A1A' }}>{p.yrating}</span>
              </div>
              {p.partner && (
                <div style={{ position: 'absolute', top: 7, left: 7 }}><PartnerBadge size="sm" label={p.cta} /></div>
              )}
            </div>
            <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 700, color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</p>
            <p style={{ margin: 0, fontSize: 10, color: '#AAAAAA' }}>{p.km}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Featured Partners Section (Home) ─────────────────────────────────────────

function FeaturedSection({ onVenueClick, onAllClick }: { onVenueClick: (idx: number) => void; onAllClick: () => void }) {
  const partners = PLACES.filter(p => p.partner);

  // interleave: place, event, place, event…
  type FeaturedItem =
    | { kind: 'place'; data: typeof PLACES[0] }
    | { kind: 'event'; data: typeof DINNERS_DATA[0] };

  const items: FeaturedItem[] = [];
  const maxLen = Math.max(partners.length, DINNERS_DATA.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < partners.length) items.push({ kind: 'place', data: partners[i] });
    if (i < DINNERS_DATA.length) items.push({ kind: 'event', data: DINNERS_DATA[i] });
  }

  return (
    <div style={{ backgroundColor: '#FFF', marginTop: 8, padding: '20px 0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 14 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A' }}>Рекомендуем</span>
        <button onClick={onAllClick} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: ACCENT_DARK, fontWeight: 600, fontFamily: 'inherit', padding: 0 }}>Все →</button>
      </div>

      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', paddingLeft: 20, paddingRight: 20 }}>
        {items.map((item, i) => {
          if (item.kind === 'place') {
            const p = item.data;
            return (
              <button key={`p-${i}`} onClick={() => onVenueClick(PLACES.indexOf(p))} style={{
                flexShrink: 0, width: 158,
                backgroundColor: '#FFF',
                borderRadius: 20, overflow: 'hidden',
                border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left',
                boxShadow: '0 2px 16px rgba(0,0,0,0.09)',
              }}>
                <div style={{ position: 'relative', height: 140 }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: 10, left: 10 }}><PartnerBadge size="sm" label={p.cta} /></div>
                </div>
                <div style={{ padding: '11px 13px 13px' }}>
                  <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{p.name}</p>
                  {p.offer && (
                    <p style={{ margin: '0 0 3px', fontSize: 10, color: ACCENT_DARK, fontWeight: 600 }}>✦ {p.offer}</p>
                  )}
                  <p style={{ margin: 0, fontSize: 11, color: '#AAAAAA' }}>{p.sub}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 7 }}>
                    <span style={{ color: '#FFB800', fontSize: 11 }}>★</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#1A1A1A' }}>{p.yrating}</span>
                    <span style={{ fontSize: 10, color: '#C0C0C0' }}>· {p.km}</span>
                  </div>
                </div>
              </button>
            );
          } else {
            const e = item.data;
            return (
              <div key={`e-${i}`} style={{
                flexShrink: 0, width: 158,
                backgroundColor: '#FFF',
                borderRadius: 20, overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.09)',
                textAlign: 'left',
              }}>
                <div style={{ position: 'relative', height: 140 }}>
                  <img src={e.img} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {/* "Событие" badge — top-left */}
                  <div style={{
                    position: 'absolute', top: 10, left: 10,
                    backgroundColor: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(6px)',
                    borderRadius: 10, padding: '4px 8px',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="3" stroke="white" strokeWidth="2.2"/>
                      <path d="M16 2v4M8 2v4M3 10h18" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#FFF', letterSpacing: 0.3 }}>Событие</span>
                  </div>
                </div>
                <div style={{ padding: '11px 13px 13px' }}>
                  <p style={{ margin: '0 0 3px', fontSize: 12, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}>{e.title}</p>
                  <p style={{ margin: '0 0 6px', fontSize: 10, color: '#999' }}>{e.venue} · {e.category}</p>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: ACCENT_DARK }}>{e.price}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

// ─── Place Card (list item) ────────────────────────────────────────────────────

type PlaceType = typeof PLACES[0];

function PlaceCard({ place: v, onClick, savedSlot }: {
  place: PlaceType;
  onClick: () => void;
  savedSlot?: { isSaved: boolean; toggle: () => void };
}) {
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={onClick} style={{
        backgroundColor: '#FFF',
        borderRadius: 16, overflow: 'hidden',
        border: v.partner ? `1.5px solid ${ACCENT}99` : '1px solid #F0F0F0',
        cursor: 'pointer', textAlign: 'left', width: '100%', display: 'flex',
        boxShadow: v.partner ? `0 2px 12px ${ACCENT}33` : '0 1px 6px rgba(0,0,0,0.06)',
      }}>
        {/* Photo */}
        <div style={{ width: 88, flexShrink: 0, position: 'relative', alignSelf: 'stretch' }}>
          <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        {/* Info */}
        <div style={{ padding: '11px 40px 11px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</p>
          {v.partner && v.cta && (
            <span style={{ alignSelf: 'flex-start', fontSize: 9, fontWeight: 700, color: ACCENT_DARK, backgroundColor: ACCENT, padding: '2px 7px', borderRadius: 20, whiteSpace: 'nowrap' }}>{v.cta}</span>
          )}
          {v.offer && (
            <p style={{ margin: 0, fontSize: 10, color: ACCENT_DARK, fontWeight: 600 }}>✦ {v.offer}</p>
          )}
          <p style={{ fontSize: 11, color: '#999', margin: 0 }}>{v.sub} · {v.km}</p>
          {/* Rating + category row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#FC3F1D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#FFF', fontSize: 7, fontWeight: 900, fontFamily: 'serif' }}>Я</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>{v.yrating}</span>
            <span style={{ fontSize: 11, color: '#AAAAAA' }}>({v.reviews})</span>
            {v.category && (
              <span style={{ marginLeft: 2, backgroundColor: '#F2F2F2', color: '#666', fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 8 }}>
                {v.category === 'spa' ? 'SPA' : v.category === 'bars' ? 'Бар' : v.category === 'food' ? 'Еда' : v.category === 'clubs' ? 'Клуб' : v.category === 'art' ? 'Арт' : 'Спорт'}
              </span>
            )}
          </div>
        </div>
      </button>
      {/* Bookmark */}
      {savedSlot && (
        <button onClick={savedSlot.toggle} style={{
          position: 'absolute', top: 10, right: 10,
          width: 28, height: 28, borderRadius: 14,
          backgroundColor: savedSlot.isSaved ? ACCENT : 'rgba(255,255,255,0.9)',
          border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        }}>
          <svg width="13" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"
              fill={savedSlot.isSaved ? ACCENT_DARK : 'none'}
              stroke={savedSlot.isSaved ? ACCENT_DARK : '#888'}
              strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

function SectionHeader({ title, link }: { title: string; link: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{title}</span>
      <span style={{ fontSize: 12, color: ACCENT_DARK, fontWeight: 600 }}>{link} →</span>
    </div>
  );
}

// ── Personalized recommendations ─────────────────────────────────────────────
function getPersonalizedRecs(likedNames: Set<string>): typeof PLACES {
  const liked = PLACES.filter(p => likedNames.has(p.name));
  const likedCats = new Set(liked.map(p => p.category));
  const recs = PLACES.filter(p => !likedNames.has(p.name) && likedCats.has(p.category));
  if (recs.length < 3) {
    const extra = PLACES
      .filter(p => !likedNames.has(p.name) && !recs.find(r => r.name === p.name))
      .sort((a, b) => parseFloat(b.yrating) - parseFloat(a.yrating));
    return [...recs, ...extra].slice(0, 6);
  }
  return recs.slice(0, 6);
}

// ── Mock AI search ────────────────────────────────────────────────────────────
const SEARCH_RULES: { keywords: string[]; label: string; placeNames: string[] }[] = [
  { keywords: ['дети', 'семья', 'семейн', 'ребёнок', 'ребенок', 'детей'],
    label: 'места для семей с детьми',
    placeNames: ['Bloom Studio', 'Verde Garden', 'Art Loft', 'Grøn'] },
  { keywords: ['романтик', 'свидан', 'дата', 'вечер двоих', 'пара'],
    label: 'романтические места',
    placeNames: ['Monoroom', 'Nori', 'Cellar', 'Atelier SPA'] },
  { keywords: ['spa', 'спа', 'релакс', 'массаж', 'расслаб', 'флоатинг'],
    label: 'spa и релакс',
    placeNames: ['The Body', 'Atelier SPA', 'Float House'] },
  { keywords: ['бар', 'выпить', 'коктейл', 'вино', 'пиво'],
    label: 'бары и коктейли',
    placeNames: ['Monoroom', 'Ritual Bar', 'Cellar'] },
  { keywords: ['поесть', 'ресторан', 'еда', 'покушать', 'обед', 'ужин', 'кафе'],
    label: 'рестораны и кафе',
    placeNames: ['Verde Garden', 'Nori', 'Grøn'] },
  { keywords: ['клуб', 'танц', 'потусить', 'вечеринк', 'диджей', 'техно', 'музыка'],
    label: 'клубы и вечеринки',
    placeNames: ['Sound Lab', 'FABRIC', 'Monoroom'] },
  { keywords: ['спорт', 'фитнес', 'пилатес', 'бокс', 'трениров'],
    label: 'спорт и фитнес',
    placeNames: ['Move Studio', 'Kazan Ring'] },
  { keywords: ['арт', 'галере', 'выставк', 'искусств', 'культур'],
    label: 'арт и культура',
    placeNames: ['Art Loft', 'Bloom Studio'] },
  { keywords: ['японск', 'суши', 'нори', 'азиатск'],
    label: 'японская кухня',
    placeNames: ['Nori'] },
  { keywords: ['веган', 'здоров', 'правильн', 'растит'],
    label: 'здоровое питание',
    placeNames: ['Grøn', 'Verde Garden'] },
  { keywords: ['завтрак', 'позавтрак', 'утро', 'бранч'],
    label: 'завтраки и бранчи',
    placeNames: ['Verde Garden', 'Grøn', 'Bloom Studio'] },
  { keywords: ['кофе', 'кофейн', 'латте', 'капучино'],
    label: 'кофе и кафе',
    placeNames: ['Bloom Studio', 'Art Loft', 'Grøn'] },
  { keywords: ['поработ', 'ноутбук', 'работ', 'коворкинг', 'тихое место'],
    label: 'места для работы',
    placeNames: ['Art Loft', 'Grøn', 'Bloom Studio'] },
  { keywords: ['свидан', 'пойти на свидан', 'дата', 'вдвоём', 'вдвоем'],
    label: 'для свидания',
    placeNames: ['Monoroom', 'Nori', 'Cellar', 'Atelier SPA'] },
  { keywords: ['коктейл', 'выпить коктейл'],
    label: 'коктейли и бары',
    placeNames: ['Ritual Bar', 'Monoroom', 'Cellar'] },
  { keywords: ['культур', 'программ', 'выставк', 'галере', 'искусств'],
    label: 'культурная программа',
    placeNames: ['Art Loft', 'Bloom Studio'] },
];

function mockAiSearch(query: string): { label: string; places: typeof PLACES } {
  const q = query.toLowerCase();
  for (const rule of SEARCH_RULES) {
    if (rule.keywords.some(kw => q.includes(kw))) {
      const places = rule.placeNames.map(n => PLACES.find(p => p.name === n)).filter(Boolean) as typeof PLACES;
      return { label: rule.label, places };
    }
  }
  // Fallback: fuzzy match by name/sub/desc
  const fallback = PLACES.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.sub.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q)
  );
  return { label: `«${query}»`, places: fallback };
}

function HomeScreen({ onVenueClick, onAllCollections, onCollectionClick, onAllNearby, onAllWeekly, onAllFeatured,
  searchDraft, setSearchDraft, searchQuery, setSearchQuery, searchLoading, setSearchLoading, searchResult, setSearchResult,
  likedSet, toggleLike,
}: {
  onVenueClick: (idx: number) => void;
  onAllCollections: () => void;
  onCollectionClick: (idx: number) => void;
  onAllNearby: () => void;
  onAllWeekly: () => void;
  onAllFeatured: () => void;
  searchDraft: string; setSearchDraft: (v: string) => void;
  searchQuery: string; setSearchQuery: (v: string) => void;
  searchLoading: boolean; setSearchLoading: (v: boolean) => void;
  searchResult: { label: string; places: typeof PLACES } | null;
  setSearchResult: (v: { label: string; places: typeof PLACES } | null) => void;
  likedSet: Set<string>;
  toggleLike: (name: string) => void;
}) {
  const [activeCat, setActiveCat] = useState('all');
  const [searchCat, setSearchCat] = useState('all');

  const handleSearch = () => {
    if (!searchDraft.trim()) return;
    setSearchLoading(true);
    setSearchQuery(searchDraft.trim());
    setSearchCat('all');
    setTimeout(() => {
      setSearchResult(mockAiSearch(searchDraft.trim()));
      setSearchLoading(false);
    }, 900);
  };

  const clearSearch = () => {
    setSearchDraft('');
    setSearchQuery('');
    setSearchResult(null);
    setSearchLoading(false);
    setSearchCat('all');
  };

  const nearbyPlaces = activeCat === 'all' ? PLACES : PLACES.filter(p => p.category === activeCat);

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F2F2F2' }}>

      {/* ── Header ── */}
      <div style={{ backgroundColor: '#FFF', padding: '16px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* City selector */}
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          {/* Dot pin */}
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: ACCENT, display: 'inline-block', flexShrink: 0, boxShadow: `0 0 0 2px ${ACCENT}55` }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A', letterSpacing: 0.1 }}>Москва</span>
          <svg width="7" height="4" viewBox="0 0 7 4" fill="none">
            <path d="M1 1L3.5 3.5L6 1" stroke="#BBBBBB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── Smart Search ── */}
      <div style={{ backgroundColor: '#FFF', padding: '12px 16px 14px', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10,
          backgroundColor: '#F2F2F2', borderRadius: 16, padding: '10px 14px',
          border: searchQuery ? `1.5px solid ${ACCENT}` : '1.5px solid transparent',
          transition: 'border-color 0.2s',
        }}>
          {/* AI sparkle icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill={ACCENT_DARK} opacity="0.85"/>
            <path d="M19 2L19.7 5.3L23 6L19.7 6.7L19 10L18.3 6.7L15 6L18.3 5.3L19 2Z" fill={ACCENT_DARK} opacity="0.5"/>
          </svg>
          <input
            value={searchDraft}
            onChange={e => setSearchDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Найди место под настроение..."
            style={{
              flex: 1, border: 'none', background: 'none', outline: 'none',
              fontSize: 14, color: '#1A1A1A', fontFamily: 'inherit',
            }}
          />
          {searchDraft ? (
            <button onClick={clearSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" fill="#CCCCCC"/>
                <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          ) : null}
        </div>

        {/* Hints when empty */}
        {!searchQuery && !searchLoading && (
          <div style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {['Позавтракать', 'Выпить кофе', 'Поработать с ноутбуком', 'Пойти на свидание', 'Выпить коктейли', 'Культурная программа'].map(hint => (
              <button key={hint} onClick={() => { setSearchDraft(hint); setTimeout(() => { setSearchLoading(true); setSearchQuery(hint); setTimeout(() => { setSearchResult(mockAiSearch(hint)); setSearchLoading(false); }, 900); }, 0); }} style={{
                flexShrink: 0, background: '#F2F2F2', border: 'none', borderRadius: 20,
                padding: '5px 12px', fontSize: 12, color: '#555', fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{hint}</button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {searchLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '0 2px' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: 3,
                  backgroundColor: ACCENT_DARK,
                  opacity: 0.4,
                  animation: `pulse 1s ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
            <span style={{ fontSize: 13, color: '#999' }}>Подбираем места...</span>
          </div>
        )}

        {/* Results */}
        {searchResult && !searchLoading && (
          <div style={{ marginTop: 12 }}>
            {/* Beta notice */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              backgroundColor: '#FFF9EC', border: '1px solid #FFE4A0',
              borderRadius: 12, padding: '9px 12px', marginBottom: 14,
            }}>
              <span style={{ fontSize: 14 }}>👀</span>
              <p style={{ margin: 0, fontSize: 11, color: '#A07000', lineHeight: 1.4 }}>
                Наш поиск пока набирается опыта. Если рекомендации слегка off — спасибо за терпение, мы все пофиксим.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: ACCENT_DARK, fontWeight: 700,
                backgroundColor: ACCENT + '33', padding: '3px 10px', borderRadius: 20 }}>
                ✦ {searchResult.label}
              </span>
              <span style={{ fontSize: 11, color: '#AAAAAA' }}>
                {(searchCat === 'all' ? searchResult.places : searchResult.places.filter(p => p.category === searchCat)).length} мест
              </span>
            </div>

            {/* Category chips */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -16px', paddingLeft: 16, paddingRight: 16, marginBottom: 14 }}>
              {CATEGORIES.filter(c => c.id !== 'events').map(c => {
                const active = searchCat === c.id;
                return (
                  <button key={c.id} onClick={() => setSearchCat(c.id)} style={{
                    flexShrink: 0, padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    backgroundColor: active ? ACCENT : '#F2F2F2',
                    color: active ? ACCENT_DARK : '#555',
                    fontSize: 13, fontWeight: active ? 700 : 500, fontFamily: 'inherit',
                  }}>{c.label}</button>
                );
              })}
            </div>

            {(() => {
              const filtered = searchCat === 'all' ? searchResult.places : searchResult.places.filter(p => p.category === searchCat);
              return filtered.length === 0 ? (
                <p style={{ fontSize: 13, color: '#999', margin: 0 }}>Нет мест в этой категории</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {filtered.map((p, i) => (
                    <LargeVerticalCard key={i} place={p} onClick={() => onVenueClick(PLACES.indexOf(p))} />
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* ── Подборки ── */}
      {!searchResult && !searchLoading && <div style={{ backgroundColor: '#FFF', marginTop: 8, padding: '18px 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A' }}>Подборки</span>
          <button onClick={onAllCollections} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: ACCENT_DARK, fontWeight: 600, fontFamily: 'inherit', padding: 0 }}>Все →</button>
        </div>
        {(() => {
          const C = COLLECTIONS;
          const card = (c: typeof C[0], style: React.CSSProperties, idx: number) => (
            <button onClick={() => onCollectionClick(idx)} style={{
              border: 'none', padding: 0, cursor: 'pointer', borderRadius: 16,
              overflow: 'hidden', display: 'block', position: 'relative', flexShrink: 0, ...style,
            }}>
              <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.0) 55%, transparent 100%)' }} />
              <div style={{ position: 'absolute', top: 10, left: 11 }}>
                <span style={{ backgroundColor: c.sponsored ? ACCENT : 'rgba(0,0,0,0.32)', backdropFilter: 'blur(4px)', color: c.sponsored ? ACCENT_DARK : 'rgba(255,255,255,0.9)', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  {c.sponsored && <svg width="7" height="7" viewBox="0 0 10 10"><path d="M5 0.5L6.2 3.7H9.8L6.95 5.8L8.09 9.1L5 7.05L1.91 9.1L3.05 5.8L0.2 3.7H3.8Z" fill={ACCENT_DARK}/></svg>}
                  {c.count} мест
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: 11, left: 12, right: 10 }}>
                <p style={{ margin: '0 0 3px', color: '#FFF', fontSize: 14, fontWeight: 800, lineHeight: 1.2, textAlign: 'left' }}>{c.title}</p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: 10, textAlign: 'left' }}>{c.desc}</p>
              </div>
            </button>
          );
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {card(C[0], { width: '100%', height: 190 }, 0)}
              <div style={{ display: 'flex', gap: 8, height: 248 }}>
                {card(C[1], { flex: '1.15', height: '100%' }, 1)}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {card(C[2], { width: '100%', flex: 1 }, 2)}
                  {card(C[3], { width: '100%', flex: 1 }, 3)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {card(C[4], { flex: 1, height: 160 }, 4)}
                {card(C[5], { flex: 1, height: 160 }, 5)}
              </div>
            </div>
          );
        })()}
      </div>}

      {/* ── Sections hidden during search ── */}
      {!searchResult && !searchLoading && <>

      {/* ── Подобрали для вас ── */}
      {likedSet.size > 0 && (() => {
        const recs = getPersonalizedRecs(likedSet);
        return (
          <div style={{ backgroundColor: '#FFF', marginTop: 8, padding: '18px 16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill={ACCENT_DARK}/>
                    <path d="M19 2L19.7 5.3L23 6L19.7 6.7L19 10L18.3 6.7L15 6L18.3 5.3L19 2Z" fill={ACCENT_DARK} opacity="0.5"/>
                  </svg>
                  <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1A1A' }}>Подобрали для вас</span>
                </div>
                <span style={{ fontSize: 11, color: '#AAAAAA', fontWeight: 400 }}>на основе ваших лайков</span>
              </div>
              <button onClick={onAllNearby} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: ACCENT_DARK, fontWeight: 600, fontFamily: 'inherit', padding: 0, marginTop: 2 }}>Все →</button>
            </div>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
              {recs.map((p) => {
                const isLiked = likedSet.has(p.name);
                return (
                  <button key={p.name} onClick={() => onVenueClick(PLACES.indexOf(p))} style={{
                    flexShrink: 0, width: 140, border: 'none', padding: 0, background: 'none',
                    cursor: 'pointer', textAlign: 'left', borderRadius: 16, overflow: 'hidden',
                  }}>
                    <div style={{ position: 'relative', height: 110, borderRadius: 14, overflow: 'hidden' }}>
                      <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)', pointerEvents: 'none' }} />
                    </div>
                    <div style={{ padding: '7px 2px 0' }}>
                      <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 700, color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</p>
                      <p style={{ margin: 0, fontSize: 10, color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.sub}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
                        <span style={{ fontSize: 10, color: '#FFB800', fontWeight: 700 }}>★ {p.yrating}</span>
                        <span style={{ fontSize: 10, color: '#CCC' }}>·</span>
                        <span style={{ fontSize: 10, color: '#AAAAAA' }}>{p.km}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ── Места недели ── */}
      <WeeklySection onVenueClick={onVenueClick} onAllClick={onAllWeekly} />

      {/* ── Рекомендуем ── */}
      <FeaturedSection onVenueClick={onVenueClick} onAllClick={onAllFeatured} />

      {/* ── Рядом с вами ── */}
      <div style={{ backgroundColor: '#FFF', marginTop: 8, padding: '18px 16px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>📍 Рядом с вами</span>
          <button onClick={onAllNearby} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: ACCENT_DARK, fontWeight: 600, fontFamily: 'inherit', padding: 0 }}>Все →</button>
        </div>

        {/* ── Category chips ── */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 14, marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
          {CATEGORIES.map((c) => {
            const active = activeCat === c.id;
            return (
              <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
                flexShrink: 0,
                padding: '7px 16px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: active ? ACCENT : '#F2F2F2',
                color: active ? ACCENT_DARK : '#555',
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                fontFamily: 'inherit',
              }}>
                {c.label}
              </button>
            );
          })}
        </div>
        {nearbyPlaces.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0 24px', color: '#AAAAAA', fontSize: 13 }}>
            Нет мест в этой категории
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 10 }}>
            {nearbyPlaces.slice(0, 5).map((v, i) => (
              <PlaceCard key={i} place={v} onClick={() => onVenueClick(PLACES.indexOf(v))} />
            ))}
          </div>
        )}
      </div>

      <div style={{ height: 16 }} />
      </>}

    </div>
  );
}

// ─── Results Screen ───────────────────────────────────────────────────────────

function ResultsScreen({ onVenueClick }: { onVenueClick: (idx: number) => void }) {
  const events = [
    { title: 'XTREME × DAILY SLIME × DISCO CLUB', venue: 'DK Kristall', date: '10 Apr', price: 'from 2000₽', img: 'https://picsum.photos/seed/disco-club/90/90' },
    { title: 'Jazz Night: New Impressions', venue: 'Monoroom Bar', date: '11 Apr', price: 'from 800₽', img: 'https://picsum.photos/seed/jazz-night/90/90' },
    { title: 'Spring Food Festival', venue: 'Verde Garden', date: '12 Apr', price: 'Free', img: 'https://picsum.photos/seed/food-fest/90/90' },
    { title: 'Techno Evening — Back to Roots', venue: 'Sound Lab', date: '13 Apr', price: 'from 1500₽', img: 'https://picsum.photos/seed/techno/90/90' },
    { title: 'Photography Exhibition', venue: 'Gallery ON', date: '14 Apr', price: 'from 300₽', img: 'https://picsum.photos/seed/photo-exhibit/90/90' },
    { title: 'Wine Masterclass', venue: 'Cellar Club', date: '15 Apr', price: 'from 2500₽', img: 'https://picsum.photos/seed/wine-master/90/90' },
    { title: 'Stand-Up Night', venue: 'Comedy Spot', date: '16 Apr', price: 'from 700₽', img: 'https://picsum.photos/seed/standup/90/90' },
    { title: 'Art Workshop: Portraits', venue: 'Art Loft', date: '17 Apr', price: 'from 1800₽', img: 'https://picsum.photos/seed/art-loft/90/90' },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F8F8F8' }}>
      <div style={{ backgroundColor: '#FFF', padding: '12px 16px 14px', borderBottom: '1px solid #F0F0F0' }}>
        <p style={{ margin: 0, fontSize: 12, color: '#999' }}>Results</p>
        <p style={{ margin: '3px 0 0', fontSize: 20, fontWeight: 800, color: '#1A1A1A' }}>40 options found</p>
      </div>
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {events.map((e, i) => (
          <button key={i} onClick={() => onVenueClick(0)} style={{
            backgroundColor: '#FFF',
            borderRadius: 16,
            overflow: 'hidden',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            width: '100%',
            display: 'flex',
          }}>
            <div style={{ width: 80, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
              <img src={e.img} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, textAlign: 'center', lineHeight: 1.3, fontWeight: 600 }}>{e.date}</span>
              </div>
            </div>
            <div style={{ padding: '11px 12px' }}>
              <p style={{ fontSize: 13, fontWeight: 700, margin: '0 0 3px', lineHeight: 1.3, color: '#1A1A1A' }}>{e.title}</p>
              <p style={{ fontSize: 11, color: '#999', margin: '0 0 6px' }}>{e.venue}</p>
              <span style={{
                backgroundColor: ACCENT + '44', color: ACCENT_DARK,
                fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 8,
              }}>{e.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Dinners ──────────────────────────────────────────────────────────────────

const DINNERS_DATA = [
  {
    id: 1, type: 'regular', category: 'Ужин', title: 'Ужин с незнакомцами #28',
    date: '18 апр', time: '19:00', venue: 'Verde Garden', address: 'ул. Пятницкая, 12',
    spots: 3, total: 8, price: '2 500 ₽',
    img: 'https://picsum.photos/seed/dinner-01/375/420',
    desc: 'Вечер за большим столом с незнакомыми людьми — разные профессии, истории, взгляды. Без телефонов, без неловкого молчания. Просто живой разговор и хорошая еда.',
    participants: [
      'https://picsum.photos/seed/p1/60/60', 'https://picsum.photos/seed/p2/60/60',
      'https://picsum.photos/seed/p3/60/60', 'https://picsum.photos/seed/p4/60/60',
      'https://picsum.photos/seed/p5/60/60',
    ],
  },
  {
    id: 2, type: 'themed', category: 'Культура', title: 'Итальянский вечер',
    date: '22 апр', time: '20:00', venue: 'Nori', address: 'Кузнецкий мост, 7',
    spots: 2, total: 6, price: '3 200 ₽',
    img: 'https://picsum.photos/seed/dinner-02/375/420',
    desc: 'Тематический ужин, посвящённый итальянской культуре. Паста, вино, разговоры об Италии — и незнакомцы, которые станут приятелями.',
    participants: [
      'https://picsum.photos/seed/p6/60/60', 'https://picsum.photos/seed/p7/60/60',
      'https://picsum.photos/seed/p8/60/60', 'https://picsum.photos/seed/p9/60/60',
    ],
  },
  {
    id: 3, type: 'regular', category: 'Ужин', title: 'Ужин с незнакомцами #29',
    date: '25 апр', time: '19:30', venue: 'Monoroom', address: 'Покровка, 3',
    spots: 5, total: 8, price: '2 500 ₽',
    img: 'https://picsum.photos/seed/dinner-03/375/420',
    desc: 'Уютный вечер в баре Monoroom. 8 мест, живая музыка фоном, сет-меню от шефа.',
    participants: [
      'https://picsum.photos/seed/p10/60/60', 'https://picsum.photos/seed/p11/60/60',
      'https://picsum.photos/seed/p12/60/60',
    ],
  },
  {
    id: 4, type: 'themed', category: 'Кино', title: 'Ужин «Кино и еда»',
    date: '2 мая', time: '19:00', venue: 'Art Loft', address: 'Солянка, 1/2',
    spots: 1, total: 6, price: '3 500 ₽',
    img: 'https://picsum.photos/seed/dinner-04/375/420',
    desc: 'Смотрим короткометражки, обсуждаем кино за едой. Каждый приносит одну рекомендацию.',
    participants: [
      'https://picsum.photos/seed/p13/60/60', 'https://picsum.photos/seed/p14/60/60',
      'https://picsum.photos/seed/p15/60/60', 'https://picsum.photos/seed/p16/60/60',
      'https://picsum.photos/seed/p17/60/60',
    ],
  },
];

const INTERESTS = ['Путешествия', 'Музыка', 'Кино', 'Книги', 'Спорт', 'Арт', 'Еда', 'Технологии', 'Бизнес', 'Природа', 'Наука', 'Мода'];

function DinnersScreen({ onDinnerClick }: { onDinnerClick: (id: number) => void }) {
  const [filter, setFilter] = useState<'all' | 'regular' | 'themed'>('all');
  const filtered = filter === 'all' ? DINNERS_DATA : DINNERS_DATA.filter(d => d.type === filter);

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F8F8F8' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFF', padding: '12px 16px 0', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, color: '#999' }}>Москва</p>
            <h1 style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>Ужины</h1>
          </div>
          <div style={{
            backgroundColor: ACCENT + '33', borderRadius: 12, padding: '8px 14px',
            border: `1.5px solid ${ACCENT}`,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT_DARK }}>Как это работает?</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 0 }}>
          {[
            { id: 'all', label: 'Все' },
            { id: 'regular', label: 'Обычные' },
            { id: 'themed', label: 'Тематические' },
          ].map(f => {
            const active = filter === f.id;
            return (
              <button key={f.id} onClick={() => setFilter(f.id as typeof filter)} style={{
                flex: 1, padding: '10px 0', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: active ? 700 : 500,
                color: active ? '#1A1A1A' : '#999',
                borderBottom: active ? `2.5px solid ${ACCENT}` : '2.5px solid transparent',
                fontFamily: 'inherit',
              }}>
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Intro banner */}
      <div style={{
        margin: '12px 16px',
        borderRadius: 16,
        background: `linear-gradient(135deg, #1A1A1A 0%, #2D3A1A 100%)`,
        padding: '18px 18px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -10, right: -10, width: 100, height: 100, borderRadius: 50, backgroundColor: ACCENT, opacity: 0.15 }} />
        <div style={{ position: 'absolute', bottom: -20, right: 30, width: 70, height: 70, borderRadius: 35, backgroundColor: ACCENT, opacity: 0.1 }} />
        <p style={{ margin: '0 0 6px', color: ACCENT, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Следующий ужин</p>
        <p style={{ margin: '0 0 4px', color: '#FFF', fontSize: 18, fontWeight: 800, lineHeight: 1.2 }}>18 апреля · 19:00</p>
        <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Verde Garden · 3 места</p>
        <button onClick={() => onDinnerClick(1)} style={{
          backgroundColor: ACCENT, border: 'none', borderRadius: 10,
          padding: '9px 18px', fontSize: 13, fontWeight: 700,
          color: ACCENT_DARK, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Записаться →
        </button>
      </div>

      {/* Dinner cards */}
      <div style={{ padding: '4px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(d => (
          <button key={d.id} onClick={() => onDinnerClick(d.id)} style={{
            backgroundColor: '#FFF', borderRadius: 16, overflow: 'hidden',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 2px 10px rgba(0,0,0,0.07)', width: '100%', padding: 0,
          }}>
            {/* Image */}
            <div style={{ height: 150, position: 'relative' }}>
              <img src={d.img} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
              {/* Type badge */}
              <div style={{ position: 'absolute', top: 10, left: 12 }}>
                <span style={{
                  backgroundColor: d.type === 'themed' ? '#1A1A1A' : ACCENT,
                  color: d.type === 'themed' ? ACCENT : ACCENT_DARK,
                  fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 10,
                  border: d.type === 'themed' ? `1px solid ${ACCENT}` : 'none',
                }}>
                  {d.type === 'themed' ? '✦ Тематический' : 'Обычный'}
                </span>
              </div>
              {/* Spots badge */}
              <div style={{ position: 'absolute', top: 10, right: 12 }}>
                <span style={{
                  backgroundColor: d.spots <= 2 ? '#FF6B6B33' : 'rgba(255,255,255,0.2)',
                  color: d.spots <= 2 ? '#FF6B6B' : '#FFF',
                  fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 10,
                  border: d.spots <= 2 ? '1px solid #FF6B6B' : '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(4px)',
                }}>
                  {d.spots <= 2 ? `⚡ ${d.spots} места` : `${d.spots} мест`}
                </span>
              </div>
              {/* Bottom info */}
              <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ margin: 0, color: '#FFF', fontSize: 15, fontWeight: 800 }}>{d.title}</p>
                  <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>{d.venue}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: ACCENT, fontSize: 13, fontWeight: 700 }}>{d.price}</p>
                </div>
              </div>
            </div>
            {/* Date row */}
            <div style={{ padding: '10px 14px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ textAlign: 'center', backgroundColor: '#F5F5F5', borderRadius: 8, padding: '5px 10px' }}>
                  <p style={{ margin: 0, fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {d.date.split(' ')[1]}
                  </p>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1 }}>
                    {d.date.split(' ')[0]}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{d.time} · {d.venue}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#999' }}>{d.address}</p>
                </div>
              </div>
              {/* Participant avatars */}
              <div style={{ display: 'flex' }}>
                {d.participants.slice(0, 3).map((p, i) => (
                  <div key={i} style={{
                    width: 26, height: 26, borderRadius: 13,
                    overflow: 'hidden', border: '2px solid #FFF',
                    marginLeft: i > 0 ? -8 : 0,
                  }}>
                    <img src={p} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
                {d.participants.length > 3 && (
                  <div style={{
                    width: 26, height: 26, borderRadius: 13,
                    backgroundColor: '#F0F0F0', border: '2px solid #FFF',
                    marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#777' }}>+{d.participants.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DinnerDetailScreen({
  dinnerId,
  onBack,
  onSignUp,
}: { dinnerId: number; onBack: () => void; onSignUp: () => void }) {
  const d = DINNERS_DATA.find(x => x.id === dinnerId) ?? DINNERS_DATA[0];
  const filledSpots = d.total - d.spots;

  return (
    <div style={{ flex: 1, overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Hero */}
      <div style={{ height: 260, position: 'relative', flexShrink: 0 }}>
        <img src={d.img} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
        <button onClick={onBack} style={{
          position: 'absolute', top: 14, left: 14,
          width: 36, height: 36, borderRadius: 18,
          backgroundColor: 'rgba(0,0,0,0.4)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <span style={{
            backgroundColor: d.type === 'themed' ? '#1A1A1A' : ACCENT,
            color: d.type === 'themed' ? ACCENT : ACCENT_DARK,
            fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 10,
            border: d.type === 'themed' ? `1px solid ${ACCENT}` : 'none',
          }}>
            {d.type === 'themed' ? '✦ Тематический ужин' : 'Ужин с незнакомцами'}
          </span>
          <h2 style={{ margin: '8px 0 4px', color: '#FFF', fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>{d.title}</h2>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>{d.date} · {d.time} · {d.venue}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 16px 100px', backgroundColor: '#FFF', flex: 1 }}>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {[
            { label: 'Дата', value: d.date },
            { label: 'Время', value: d.time },
            { label: 'Цена', value: d.price },
            { label: 'Мест', value: `${d.spots}/${d.total}` },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: '#F8F8F8', borderRadius: 10, padding: '8px 6px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 10, color: '#999', marginBottom: 3 }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: '#999' }}>Заполнено мест</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>{filledSpots} из {d.total}</span>
          </div>
          <div style={{ height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(filledSpots / d.total) * 100}%`, backgroundColor: ACCENT, borderRadius: 3 }} />
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: '#F0F0F0', marginBottom: 16 }} />

        {/* Description */}
        <p style={{ fontSize: 14, lineHeight: 1.65, color: '#333', margin: '0 0 20px' }}>{d.desc}</p>

        <div style={{ height: 1, backgroundColor: '#F0F0F0', marginBottom: 16 }} />

        {/* Participants */}
        <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', margin: '0 0 12px' }}>
          Уже идут ({filledSpots})
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {d.participants.map((p, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, overflow: 'hidden', border: `2px solid ${ACCENT}` }}>
                <img src={p} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
          {/* Empty spots */}
          {Array.from({ length: d.spots }).map((_, i) => (
            <div key={`empty-${i}`} style={{
              width: 44, height: 44, borderRadius: 22,
              border: '2px dashed #E0E0E0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 18, color: '#CCC' }}>+</span>
            </div>
          ))}
        </div>

        {/* Venue */}
        <div style={{ backgroundColor: '#F8F8F8', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: ACCENT + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="18" viewBox="0 0 14 18" fill="none">
              <path d="M7 0C4.24 0 2 2.24 2 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 115 5a1.5 1.5 0 012 1.5z" fill={ACCENT_DARK} />
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{d.venue}</p>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: '#999' }}>{d.address}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: 'sticky', bottom: 0, padding: '12px 16px 16px',
        backgroundColor: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)',
        borderTop: '1px solid #F0F0F0', flexShrink: 0,
      }}>
        <button onClick={onSignUp} style={{
          width: '100%', height: 52, backgroundColor: ACCENT,
          border: 'none', borderRadius: 14,
          fontSize: 16, fontWeight: 700, color: ACCENT_DARK,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Записаться на ужин →
        </button>
      </div>
    </div>
  );
}

function QuestionnaireScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const toggleInterest = (i: string) =>
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : prev.length < 4 ? [...prev, i] : prev);

  const availableDates = [
    { id: 1, label: '18 апр', sub: 'Обычный · Пт', spots: 3 },
    { id: 2, label: '22 апр', sub: 'Тематический · Вт', spots: 2 },
    { id: 3, label: '25 апр', sub: 'Обычный · Пт', spots: 5 },
    { id: 4, label: '2 мая', sub: 'Тематический · Сб', spots: 1 },
    { id: 5, label: '9 мая', sub: 'Обычный · Пт', spots: 8 },
    { id: 6, label: '16 мая', sub: 'Тематический · Пт', spots: 6 },
  ];

  if (done) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', backgroundColor: '#FFF', gap: 16 }}>
      <div style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M5 12l5 5L20 7" stroke={ACCENT_DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, textAlign: 'center' }}>Вы записаны!</h2>
      <p style={{ margin: 0, fontSize: 14, color: '#777', textAlign: 'center', lineHeight: 1.6 }}>
        Мы пришлём подтверждение и напомним за день до ужина. До встречи за столом!
      </p>
      <div style={{ backgroundColor: '#F8F8F8', borderRadius: 14, padding: '14px 18px', width: '100%' }}>
        <p style={{ margin: '0 0 6px', fontSize: 12, color: '#999' }}>Детали бронирования</p>
        <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700 }}>
          {availableDates.find(d => d.id === selectedDate)?.label ?? '—'} · Ужин с незнакомцами
        </p>
        <p style={{ margin: 0, fontSize: 12, color: '#999' }}>Имя: {name || 'Гость'}</p>
      </div>
      <button onClick={onDone} style={{
        width: '100%', height: 52, backgroundColor: ACCENT,
        border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700,
        color: ACCENT_DARK, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8,
      }}>
        На главную
      </button>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#FFF', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 0' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              flex: 1, height: 4, borderRadius: 2,
              backgroundColor: s <= step ? ACCENT : '#F0F0F0',
              transition: 'background-color 0.2s',
            }} />
          ))}
        </div>
        <p style={{ margin: '0 0 4px', fontSize: 12, color: '#999' }}>Шаг {step} из 3</p>
        <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 800, color: '#1A1A1A' }}>
          {step === 1 && 'Расскажи о себе'}
          {step === 2 && 'Выбери дату'}
          {step === 3 && 'Почти готово!'}
        </h2>
      </div>

      {/* Step 1: About */}
      {step === 1 && (
        <div style={{ padding: '0 16px', flex: 1 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#999', fontWeight: 600, display: 'block', marginBottom: 6 }}>Имя</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Как тебя зовут?"
              style={{
                width: '100%', height: 48, borderRadius: 12,
                border: `1.5px solid ${name ? ACCENT : '#E8E8E8'}`,
                padding: '0 14px', fontSize: 14, color: '#1A1A1A',
                outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit', backgroundColor: '#FAFAFA',
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: '#999', fontWeight: 600, display: 'block', marginBottom: 6 }}>Чем занимаешься?</label>
            <input
              value={profession}
              onChange={e => setProfession(e.target.value)}
              placeholder="Профессия или сфера"
              style={{
                width: '100%', height: 48, borderRadius: 12,
                border: `1.5px solid ${profession ? ACCENT : '#E8E8E8'}`,
                padding: '0 14px', fontSize: 14, color: '#1A1A1A',
                outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit', backgroundColor: '#FAFAFA',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#999', fontWeight: 600, display: 'block', marginBottom: 8 }}>
              Интересы <span style={{ color: '#BBB' }}>(выбери до 4)</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {INTERESTS.map(i => {
                const sel = interests.includes(i);
                return (
                  <button key={i} onClick={() => toggleInterest(i)} style={{
                    padding: '8px 14px', borderRadius: 20,
                    border: `1.5px solid ${sel ? ACCENT : '#E8E8E8'}`,
                    backgroundColor: sel ? ACCENT + '33' : '#FAFAFA',
                    color: sel ? ACCENT_DARK : '#555',
                    fontSize: 13, fontWeight: sel ? 600 : 400,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    {i}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Date */}
      {step === 2 && (
        <div style={{ padding: '0 16px', flex: 1 }}>
          <p style={{ fontSize: 13, color: '#777', margin: '0 0 16px', lineHeight: 1.5 }}>
            Выбери удобную дату. Тебя добавят в группу и пришлют детали за день до ужина.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {availableDates.map(d => {
              const sel = selectedDate === d.id;
              return (
                <button key={d.id} onClick={() => setSelectedDate(d.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 14px', borderRadius: 14,
                  border: `1.5px solid ${sel ? ACCENT : '#EEEEEE'}`,
                  backgroundColor: sel ? ACCENT + '22' : '#FAFAFA',
                  cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', width: '100%',
                }}>
                  {/* Date bubble */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    backgroundColor: sel ? ACCENT : '#F0F0F0',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: sel ? ACCENT_DARK : '#1A1A1A', lineHeight: 1 }}>
                      {d.label.split(' ')[0]}
                    </span>
                    <span style={{ fontSize: 9, color: sel ? ACCENT_DARK + 'AA' : '#999', textTransform: 'uppercase' }}>
                      {d.label.split(' ')[1]}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{d.sub}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 11, color: '#999' }}>{d.spots} свободных мест</p>
                  </div>
                  {d.spots <= 2 && (
                    <span style={{ fontSize: 10, color: '#FF6B6B', fontWeight: 700, backgroundColor: '#FF6B6B22', padding: '3px 8px', borderRadius: 8 }}>
                      Мало мест
                    </span>
                  )}
                  {sel && (
                    <div style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L20 7" stroke={ACCENT_DARK} strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div style={{ padding: '0 16px', flex: 1 }}>
          <p style={{ fontSize: 13, color: '#777', margin: '0 0 18px', lineHeight: 1.5 }}>
            Проверь данные перед подтверждением
          </p>
          <div style={{ backgroundColor: '#F8F8F8', borderRadius: 14, padding: '16px', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Имя', value: name || 'Не указано' },
              { label: 'Профессия', value: profession || 'Не указана' },
              { label: 'Интересы', value: interests.length ? interests.join(', ') : 'Не выбраны' },
              { label: 'Дата', value: availableDates.find(d => d.id === selectedDate)?.label ?? 'Не выбрана' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 12, color: '#999', flexShrink: 0 }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', textAlign: 'right' }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: ACCENT + '22', borderRadius: 12, padding: '12px 14px', border: `1px solid ${ACCENT}55` }}>
            <p style={{ margin: 0, fontSize: 12, color: ACCENT_DARK, lineHeight: 1.55 }}>
              После подтверждения мы пришлём детали на почту и напомним за сутки до ужина.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ padding: '16px 16px 20px', display: 'flex', gap: 10, flexShrink: 0 }}>
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)} style={{
            flex: 1, height: 52, backgroundColor: '#F0F0F0',
            border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 600,
            color: '#1A1A1A', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            ← Назад
          </button>
        )}
        <button
          onClick={() => {
            if (step < 3) setStep(s => s + 1);
            else setDone(true);
          }}
          style={{
            flex: 2, height: 52, backgroundColor: ACCENT,
            border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700,
            color: ACCENT_DARK, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          {step === 3 ? 'Подтвердить запись ✓' : 'Далее →'}
        </button>
      </div>
    </div>
  );
}

// ─── Map Screen ───────────────────────────────────────────────────────────────

const MAP_CATEGORIES = [
  { id: 'food',   label: 'Еда',           icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 11h18M12 3v8M7 3v4M17 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M5 11v8a1 1 0 001 1h12a1 1 0 001-1v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )},
  { id: 'clubs',  label: 'Развлечения',   icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { id: 'bars',   label: 'Бары',          icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M8 22V13L3 4h18l-5 9v9M8 22h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { id: 'work',   label: 'Работа',        icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M2 13h20" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )},
  { id: 'coffee', label: 'Кофе',          icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M17 8h1a3 3 0 010 6h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M6 2v2M10 2v2M14 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )},
  { id: 'art',    label: 'Культура',      icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 3C12 3 8 8 8 12s4 9 4 9" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )},
  { id: 'spa',    label: 'Уход',          icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C12 22 3 16 3 10a9 9 0 0118 0c0 6-9 12-9 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 10a3 3 0 000-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )},
  { id: 'sport',  label: 'Спорт',         icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h3M17 12h3M7 12V8a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )},
  { id: 'hotels', label: 'Отели',         icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 22V8l9-5 9 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 22v-5h6v5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )},
];

function MapScreen({ onBack, onVenueClick }: {
  onBack?: () => void;
  onVenueClick?: (idx: number) => void;
}) {

  const [searchDraft, setSearchDraft] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{ label: string; places: typeof PLACES } | null>(null);
  const [mapActiveCat, setMapActiveCat] = useState('all');
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchLoading(true);
    setTimeout(() => {
      setSearchResult(mockAiSearch(query.trim()));
      setSearchLoading(false);
    }, 900);
  };

  const clearSearch = () => {
    setSearchDraft('');
    setSearchResult(null);
    setSearchLoading(false);
    setMapActiveCat('all');
  };



  const SHEET_HEIGHT = searchResult ? 460 : 370;

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#E8EAE3' }}>

      {/* Map */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=37.47%2C55.68%2C37.77%2C55.83&layer=mapnik"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
      />

      {/* Top controls */}
      <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
        {onBack ? (
          <button onClick={onBack} style={{
            pointerEvents: 'auto', width: 40, height: 40, borderRadius: 20,
            backgroundColor: '#FFF', boxShadow: '0 2px 14px rgba(0,0,0,0.18)',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="9" height="16" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : <div style={{ width: 40 }} />}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', borderRadius: 20, padding: '8px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>Москва</span>
        </div>
        <button style={{
          pointerEvents: 'auto', width: 40, height: 40, borderRadius: 20,
          backgroundColor: '#FFF', boxShadow: '0 2px 14px rgba(0,0,0,0.18)',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#1A1A1A" strokeWidth="2"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Bottom sheet ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: SHEET_HEIGHT,
        backgroundColor: '#FFF',
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 8, flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0' }} />
        </div>

        {/* AI Search bar */}
        <div style={{ padding: '0 16px 10px', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            backgroundColor: '#F2F2F2', borderRadius: 16, padding: '11px 14px',
            border: searchFocused ? `1.5px solid ${ACCENT_DARK}` : `1.5px solid ${ACCENT}`,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill={ACCENT_DARK} opacity="0.85"/>
              <path d="M19 2L19.7 5.3L23 6L19.7 6.7L19 10L18.3 6.7L15 6L18.3 5.3L19 2Z" fill={ACCENT_DARK} opacity="0.5"/>
            </svg>
            <input
              value={searchDraft}
              onChange={e => setSearchDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(searchDraft)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Найди место на карте..."
              style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 14, color: '#1A1A1A', fontFamily: 'inherit' }}
            />
            {searchDraft ? (
              <button onClick={clearSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" fill="#CCCCCC"/>
                  <path d="M9 9l6 6M15 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            ) : null}
          </div>

          {/* Hints */}
          {!searchResult && !searchLoading && (
            <div style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {['Позавтракать', 'Выпить кофе', 'Свидание', 'Коктейли', 'Культура'].map(hint => (
                <button key={hint} onClick={() => { setSearchDraft(hint); handleSearch(hint); }} style={{
                  flexShrink: 0, background: '#F2F2F2', border: 'none', borderRadius: 20,
                  padding: '5px 12px', fontSize: 12, color: '#555', fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>{hint}</button>
              ))}
            </div>
          )}

          {/* Loading */}
          {searchLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ACCENT_DARK, opacity: 0.4 }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: '#999' }}>Ищем на карте...</span>
            </div>
          )}

          {/* Result label */}
          {searchResult && !searchLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
              <span style={{ fontSize: 11, color: ACCENT_DARK, fontWeight: 700, backgroundColor: ACCENT + '33', padding: '3px 10px', borderRadius: 20 }}>
                ✦ {searchDraft}
              </span>
              <span style={{ fontSize: 11, color: '#AAAAAA' }}>{searchResult.places.length} мест</span>
            </div>
          )}
        </div>

        {/* Category chips — shown when search active */}
        {searchResult && !searchLoading && (
          <div style={{ flexShrink: 0, borderBottom: '1px solid #F0F0F0' }}>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', padding: '0 16px 12px' }}>
              {CATEGORIES.filter(c => c.id !== 'events').map(c => {
                const active = mapActiveCat === c.id;
                return (
                  <button key={c.id} onClick={() => setMapActiveCat(c.id)} style={{
                    flexShrink: 0, padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    backgroundColor: active ? ACCENT : '#F2F2F2',
                    color: active ? ACCENT_DARK : '#555',
                    fontSize: 13, fontWeight: active ? 700 : 500, fontFamily: 'inherit',
                  }}>{c.label}</button>
                );
              })}
            </div>
          </div>
        )}

        {/* Category grid — shown when no search active */}
        {!searchResult && !searchLoading && (
          <div style={{ padding: '4px 16px 0', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {MAP_CATEGORIES.map(c => (
                <button key={c.id} onClick={() => { setSearchDraft(c.label); handleSearch(c.label); }} style={{
                  backgroundColor: '#F5F5F5', border: 'none', borderRadius: 16,
                  padding: '14px 8px', cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                }}>
                  <span style={{ color: '#555' }}>{c.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#333' }}>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search results — PlaceCards */}
        {searchResult && !searchLoading && (() => {
          const filtered = mapActiveCat === 'all'
            ? searchResult.places
            : searchResult.places.filter(p => p.category === mapActiveCat);
          return (
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filtered.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#AAAAAA', fontSize: 13, marginTop: 20 }}>Ничего не найдено в этой категории</p>
              ) : filtered.map((p) => (
                <PlaceCard key={p.name} place={p} onClick={() => onVenueClick && onVenueClick(PLACES.indexOf(p))} />
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ─── Collections Screen ───────────────────────────────────────────────────────

// ─── Large Vertical Card with photo slider ────────────────────────────────────

function EventLargeCard({ event: e }: { event: typeof DINNERS_DATA[0] }) {
  return (
    <div style={{
      borderRadius: 20, overflow: 'hidden', backgroundColor: '#FFF',
      border: '1px solid #EFEFEF',
      boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    }}>
      {/* Photo */}
      <div style={{ height: 185, position: 'relative', overflow: 'hidden' }}>
        <img src={e.img} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {/* Событие badge — top-left */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          backgroundColor: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(6px)',
          borderRadius: 10, padding: '4px 9px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="3" stroke="white" strokeWidth="2.2"/>
            <path d="M16 2v4M8 2v4M3 10h18" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#FFF', letterSpacing: 0.2 }}>Событие</span>
        </div>
      </div>
      {/* Info block */}
      <div style={{ padding: '13px 14px 14px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.2 }}>{e.title}</p>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#999' }}>{e.venue} · {e.category}</p>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: ACCENT_DARK }}>{e.price}</p>
      </div>
    </div>
  );
}

function LargeVerticalCard({ place: v, onClick, savedSlot }: {
  place: typeof PLACES[0];
  onClick: () => void;
  savedSlot?: { isSaved: boolean; toggle: () => void };
}) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const imgs = v.imgs && v.imgs.length > 0 ? v.imgs : [v.img];

  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setSlideIdx(i => Math.min(i + 1, imgs.length - 1));
      else setSlideIdx(i => Math.max(i - 1, 0));
    }
    setTouchStartX(null);
  };

  return (
    <div style={{
      position: 'relative', borderRadius: 20, overflow: 'hidden', backgroundColor: '#FFF',
      border: v.partner ? `1.5px solid ${ACCENT}88` : '1px solid #EFEFEF',
      boxShadow: v.partner ? `0 3px 14px ${ACCENT}33` : '0 2px 10px rgba(0,0,0,0.06)',
    }}>
      <button onClick={onClick} style={{ border: 'none', padding: 0, cursor: 'pointer', display: 'block', width: '100%', textAlign: 'left', background: 'none' }}>
        {/* Photo slider */}
        <div style={{ height: 185, position: 'relative', overflow: 'hidden' }}
          onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* Sliding track */}
          <div style={{
            display: 'flex', height: '100%',
            width: `${imgs.length * 100}%`,
            transform: `translateX(-${slideIdx * (100 / imgs.length)}%)`,
            transition: 'transform 0.3s ease',
          }}>
            {imgs.map((src, i) => (
              <div key={i} style={{ width: `${100 / imgs.length}%`, flexShrink: 0, height: '100%' }}>
                <img src={src} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
          {/* Gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 35%)', pointerEvents: 'none' }} />
          {/* CTA badge top-left */}
          {v.partner && v.cta && (
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <PartnerBadge size="sm" label={v.cta} />
            </div>
          )}
          {/* Dot indicators */}
          {imgs.length > 1 && (
            <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5, pointerEvents: 'none' }}>
              {imgs.map((_, i) => (
                <div key={i} style={{
                  height: 5, borderRadius: 3,
                  width: i === slideIdx ? 18 : 5,
                  backgroundColor: i === slideIdx ? '#FFF' : 'rgba(255,255,255,0.5)',
                  transition: 'width 0.2s ease',
                }} />
              ))}
            </div>
          )}
        </div>
        {/* Info block */}
        <div style={{ padding: '13px 14px 13px' }}>
          <p style={{ margin: '0 0 3px', fontSize: 16, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.2 }}>{v.name}</p>
          {v.partner && v.offer && (
            <p style={{ margin: '0 0 5px', fontSize: 11, color: ACCENT_DARK, fontWeight: 600 }}>✦ {v.offer}</p>
          )}
          <p style={{ margin: '0 0 8px', fontSize: 12, color: '#999' }}>{v.sub}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#FC3F1D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#FFF', fontSize: 8, fontWeight: 900, fontFamily: 'serif' }}>Я</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{v.yrating}</span>
              <span style={{ fontSize: 12, color: '#AAAAAA' }}>({v.reviews})</span>
            </div>
            <span style={{ fontSize: 12, color: '#AAAAAA' }}>·</span>
            <span style={{ fontSize: 12, color: '#AAAAAA' }}>{v.km}</span>
          </div>
        </div>
      </button>
      {/* Bookmark */}
      {savedSlot && (
        <button onClick={savedSlot.toggle} style={{
          position: 'absolute', top: 10, right: 10,
          width: 32, height: 32, borderRadius: 16,
          backgroundColor: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(6px)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="16" viewBox="0 0 24 26" fill="none">
            <path d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"
              fill={savedSlot.isSaved ? ACCENT : 'none'}
              stroke={savedSlot.isSaved ? ACCENT_DARK : '#FFF'}
              strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Collections Screen ───────────────────────────────────────────────────────

function CollectionsScreen({ onBack, onCollectionClick, onVenueClick }: {
  onBack: () => void;
  onCollectionClick: (idx: number) => void;
  onVenueClick: (idx: number) => void;
}) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#FFF' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#FFF', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>Все подборки</span>
      </div>

      {/* Collection sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {COLLECTIONS.map((c, i) => {
          const places = c.category ? PLACES.filter(p => p.category === c.category) : PLACES.slice(0, 6);
          return (
            <div key={i} style={{ padding: '22px 0 4px', borderBottom: '1px solid #F2F2F2' }}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '0 16px', marginBottom: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A' }}>{c.title}</span>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: 13, color: '#999' }}>{c.desc}</p>
                </div>
                <button onClick={() => onCollectionClick(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0 0', fontSize: 13, fontWeight: 600, color: ACCENT_DARK, fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                  Все →
                </button>
              </div>

              {/* Horizontal scroll of place cards */}
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', padding: '12px 16px 18px' }}>
                {places.map((p, j) => (
                  <button key={j} onClick={() => onVenueClick(PLACES.indexOf(p))} style={{
                    flexShrink: 0, width: 155,
                    padding: 0, cursor: 'pointer',
                    borderRadius: 18, overflow: 'hidden', display: 'block', textAlign: 'left',
                    backgroundColor: '#FFF',
                    boxShadow: p.partner ? `0 2px 10px ${ACCENT}33` : '0 1px 6px rgba(0,0,0,0.07)',
                    border: p.partner ? `1.5px solid ${ACCENT}66` : '1px solid #EFEFEF',
                  }}>
                    {/* Photo */}
                    <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                      <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      {/* CTA badge top-left (partner only) */}
                      {p.partner && p.cta && (
                        <div style={{ position: 'absolute', top: 8, left: 8 }}>
                          <PartnerBadge size="sm" label={p.cta} />
                        </div>
                      )}
                    </div>
                    {/* Info below photo */}
                    <div style={{ padding: '10px 10px 12px' }}>
                      <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.2 }}>{p.name}</p>
                      {p.partner && p.offer && (
                        <p style={{ margin: '0 0 5px', fontSize: 10, color: ACCENT_DARK, fontWeight: 600 }}>✦ {p.offer}</p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ color: '#FFB800', fontSize: 9 }}>★</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#1A1A1A' }}>{p.yrating}</span>
                        <span style={{ fontSize: 9, color: '#AAAAAA' }}>· {p.km}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ─── Collection Detail Screen ─────────────────────────────────────────────────

function CollectionDetailScreen({ collectionIdx, onBack, onVenueClick, onMapClick }: {
  collectionIdx: number;
  onBack: () => void;
  onVenueClick: (idx: number) => void;
  onMapClick: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState<Set<string>>(new Set());
  const col = COLLECTIONS[collectionIdx];
  const places = col.category ? PLACES.filter(p => p.category === col.category) : PLACES.slice(0, 6);

  const togglePlace = (name: string) => {
    setSavedPlaces(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const catLabel = (cat: string) =>
    cat === 'spa' ? 'SPA' : cat === 'bars' ? 'Бар' : cat === 'food' ? 'Еда' : cat === 'clubs' ? 'Клуб' : cat === 'art' ? 'Арт' : 'Спорт';

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#FFF', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>{col.title}</span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* Map icon */}
          <button onClick={onMapClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 3L3 6V21L9 18L15 21L21 18V3L15 6L9 3Z" stroke="#555" strokeWidth="1.8" strokeLinejoin="round"/>
              <line x1="9" y1="3" x2="9" y2="18" stroke="#555" strokeWidth="1.8"/>
              <line x1="15" y1="6" x2="15" y2="21" stroke="#555" strokeWidth="1.8"/>
            </svg>
          </button>
          {/* Save collection bookmark */}
          <button onClick={() => setSaved(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"
                fill={saved ? ACCENT : 'none'}
                stroke={saved ? ACCENT_DARK : '#555'}
                strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Count subheader */}
      <div style={{ position: 'sticky', top: 49, zIndex: 9, backgroundColor: '#FFF', padding: '10px 16px 12px', borderBottom: '1px solid #F0F0F0' }}>
        <span style={{ fontSize: 13, color: '#999' }}>{places.length} мест · {col.desc}</span>
      </div>

      {/* Places list — large vertical cards with photo slider */}
      <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {places.map((v, i) => {
          const isSaved = savedPlaces.has(v.name);
          return (
            <LargeVerticalCard key={i} place={v} onClick={() => onVenueClick(PLACES.indexOf(v))}
              savedSlot={{ isSaved, toggle: () => togglePlace(v.name) }} />
          );
        })}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

// ─── Nearby All Screen ────────────────────────────────────────────────────────

function NearbyAllScreen({ onBack, onVenueClick, onMapClick, title = 'Рядом с вами' }: {
  onBack: () => void;
  onVenueClick: (idx: number) => void;
  onMapClick: () => void;
  title?: string;
}) {
  const [activeCat, setActiveCat] = useState('all');
  const showEvents = activeCat === 'events';
  const places = activeCat === 'all' ? PLACES : showEvents ? [] : PLACES.filter(p => p.category === activeCat);
  const events = activeCat === 'all' ? [] : showEvents ? DINNERS_DATA : [];

  const catLabel = (cat: string) =>
    cat === 'spa' ? 'SPA' : cat === 'bars' ? 'Бар' : cat === 'food' ? 'Еда' : cat === 'clubs' ? 'Клуб' : cat === 'art' ? 'Арт' : 'Спорт';

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#FFF', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>{title}</span>
        {/* Map button */}
        <button onClick={onMapClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 3L3 6V21L9 18L15 21L21 18V3L15 6L9 3Z" stroke="#555" strokeWidth="1.8" strokeLinejoin="round"/>
            <line x1="9" y1="3" x2="9" y2="18" stroke="#555" strokeWidth="1.8"/>
            <line x1="15" y1="6" x2="15" y2="21" stroke="#555" strokeWidth="1.8"/>
          </svg>
        </button>
      </div>
      {/* Category chips */}
      <div style={{ position: 'sticky', top: 49, zIndex: 9, backgroundColor: '#FFF', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', padding: '16px 16px 14px' }}>
          {CATEGORIES.map(c => {
            const active = activeCat === c.id;
            return (
              <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
                flexShrink: 0, padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                backgroundColor: active ? ACCENT : '#F2F2F2',
                color: active ? ACCENT_DARK : '#555',
                fontSize: 13, fontWeight: active ? 700 : 500, fontFamily: 'inherit',
              }}>{c.label}</button>
            );
          })}
        </div>
      </div>
      {/* Count */}
      <div style={{ padding: '14px 16px 6px' }}>
        <span style={{ fontSize: 12, color: '#999' }}>
          {showEvents ? `${events.length} событий` : `${places.length} мест`}
        </span>
      </div>
      {/* List */}
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {showEvents
          ? events.map((e, i) => <EventLargeCard key={i} event={e} />)
          : places.map((v, i) => <LargeVerticalCard key={i} place={v} onClick={() => onVenueClick(PLACES.indexOf(v))} />)
        }
      </div>
    </div>
  );
}

// ─── Profile Placeholder ──────────────────────────────────────────────────────

function ProfileScreen() {
  const [name, setName] = useState('Анастасия');
  const [editingName, setEditingName] = useState(false);
  const [draft, setDraft] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const chevron = (
    <svg width="7" height="13" viewBox="0 0 8 14" fill="none">
      <path d="M1 1L7 7L1 13" stroke="#CCCCCC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const row = (label: string, right?: React.ReactNode, danger?: boolean, onClick?: () => void) => (
    <button onClick={onClick} style={{
      width: '100%', backgroundColor: '#FFF', border: 'none', padding: '15px 16px',
      borderBottom: '1px solid #F5F5F5', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', cursor: onClick ? 'pointer' : 'default', fontFamily: 'inherit',
    }}>
      <span style={{ fontSize: 15, color: danger ? '#FF4444' : '#1A1A1A', fontWeight: danger ? 500 : 400 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{right}{!danger && chevron}</div>
    </button>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F5' }}>

      {/* ── Avatar + name ── */}
      <div style={{ backgroundColor: '#FFF', padding: '28px 16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>

        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 88, height: 88, borderRadius: 44, overflow: 'hidden',
            background: photo ? 'transparent' : `linear-gradient(135deg, ${ACCENT} 0%, #8BBF40 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {photo
              ? <img src={photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke={ACCENT_DARK} strokeWidth="2" />
                  <path d="M4 20C4 16.7 7.6 14 12 14s8 2.7 8 6" stroke={ACCENT_DARK} strokeWidth="2" strokeLinecap="round" />
                </svg>
            }
          </div>
          {/* Edit badge */}
          <button
            onClick={() => setPhoto(`https://picsum.photos/seed/avatar-${Date.now()}/160/160`)}
            style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 26, height: 26, borderRadius: 13,
              backgroundColor: '#1A1A1A', border: '2px solid #FFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', padding: 0,
            }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Name */}
        {editingName ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              autoFocus
              value={draft}
              onChange={e => setDraft(e.target.value)}
              style={{
                fontSize: 18, fontWeight: 700, color: '#1A1A1A',
                border: 'none', borderBottom: `2px solid ${ACCENT}`,
                outline: 'none', textAlign: 'center', background: 'transparent',
                fontFamily: 'inherit', width: 160, padding: '2px 4px',
              }}
            />
            <button onClick={() => { if (draft.trim()) setName(draft.trim()); setEditingName(false); }} style={{
              backgroundColor: ACCENT, border: 'none', borderRadius: 8,
              padding: '5px 12px', fontSize: 12, fontWeight: 700,
              color: ACCENT_DARK, cursor: 'pointer', fontFamily: 'inherit',
            }}>Сохранить</button>
          </div>
        ) : (
          <button onClick={() => { setDraft(name); setEditingName(true); }} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}

        <p style={{ margin: 0, fontSize: 13, color: '#AAAAAA' }}>Москва, Россия</p>
      </div>

      {/* ── Saved places ── */}
      <div style={{ marginTop: 12, backgroundColor: '#FFF', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
        {row('Сохранённые места',
          <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT_DARK, backgroundColor: ACCENT + '44', padding: '2px 10px', borderRadius: 10 }}>12</span>
        )}
      </div>

      {/* ── Support + delete ── */}
      <div style={{ marginTop: 12, backgroundColor: '#FFF', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
        {row('Написать в поддержку', undefined, false, () => {})}
        {row('Удалить аккаунт', undefined, true, () => setShowDeleteConfirm(true))}
      </div>

      {/* ── Delete confirm sheet ── */}
      {showDeleteConfirm && (
        <div style={{
          position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'flex-end', zIndex: 100,
        }}>
          <div style={{ width: '100%', backgroundColor: '#FFF', borderRadius: '20px 20px 0 0', padding: '24px 20px 32px' }}>
            <p style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 800, color: '#1A1A1A' }}>Удалить аккаунт?</p>
            <p style={{ margin: '0 0 20px', fontSize: 13, color: '#888', lineHeight: 1.5 }}>Все данные будут удалены безвозвратно. Это действие нельзя отменить.</p>
            <button onClick={() => setShowDeleteConfirm(false)} style={{
              width: '100%', padding: '14px', borderRadius: 14, border: 'none',
              backgroundColor: '#FF4444', color: '#FFF', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', marginBottom: 10,
            }}>Удалить</button>
            <button onClick={() => setShowDeleteConfirm(false)} style={{
              width: '100%', padding: '14px', borderRadius: 14, border: 'none',
              backgroundColor: '#F2F2F2', color: '#1A1A1A', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

const ONBOARDING_CATS = [
  { id: 'spa',    label: 'SPA',    emoji: '🧘' },
  { id: 'bars',   label: 'Бары',   emoji: '🍸' },
  { id: 'food',   label: 'Еда',    emoji: '🍽️' },
  { id: 'clubs',  label: 'Клубы',  emoji: '🎉' },
  { id: 'art',    label: 'Арт',    emoji: '🎨' },
  { id: 'sport',  label: 'Спорт',  emoji: '🏃' },
];

function OnboardingFlow({ onDone }: { onDone: (liked: Set<string>) => void }) {
  const [step, setStep] = useState(0);
  const [selCats, setSelCats] = useState<string[]>([]);
  const [selPlaces, setSelPlaces] = useState<Set<string>>(new Set());
  const [venueIdx, setVenueIdx] = useState<number | null>(null);

  const toggleCat = (id: string) => {
    setSelCats(prev =>
      prev.includes(id) ? prev.filter(x => x !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const togglePlace = (name: string) => {
    setSelPlaces(prev => {
      const n = new Set(prev);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  };

  const placesForCat = (catId: string) =>
    catId === 'events'
      ? []
      : PLACES.filter(p => p.category === catId).slice(0, 4);

  const ProgressDots = () => (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 28 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: i === step ? 20 : 7, height: 7, borderRadius: 4,
          backgroundColor: i <= step ? ACCENT_DARK : '#E0E0E0',
          transition: 'all 0.3s ease',
        }} />
      ))}
    </div>
  );

  // ── Screen 1: category pick ────────────────────────────────────────────────
  if (step === 0) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 20px 24px', backgroundColor: '#FAFAFA' }}>
      <ProgressDots />
      <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.2 }}>
        Что вам интересно?
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#999', lineHeight: 1.5 }}>
        Выберите до 3 категорий — подберём лучшие места
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
        {ONBOARDING_CATS.map(c => {
          const active = selCats.includes(c.id);
          const disabled = !active && selCats.length >= 3;
          return (
            <button key={c.id} onClick={() => toggleCat(c.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 8, padding: '20px 12px',
              backgroundColor: active ? ACCENT : '#FFF',
              border: active ? `2px solid ${ACCENT_DARK}` : '2px solid #EFEFEF',
              borderRadius: 20, cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.4 : 1,
              transition: 'all 0.15s ease',
              fontFamily: 'inherit',
            }}>
              <span style={{ fontSize: 28 }}>{c.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: active ? ACCENT_DARK : '#1A1A1A' }}>{c.label}</span>
              {active && (
                <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: ACCENT_DARK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="8" viewBox="0 0 12 9" fill="none">
                    <path d="M1 4L4.5 7.5L11 1" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <button onClick={() => setStep(1)} disabled={selCats.length === 0} style={{
        marginTop: 20, padding: '15px', borderRadius: 20, border: 'none', cursor: selCats.length ? 'pointer' : 'default',
        backgroundColor: selCats.length ? ACCENT_DARK : '#E0E0E0',
        color: selCats.length ? '#FFF' : '#AAA',
        fontSize: 15, fontWeight: 700, fontFamily: 'inherit', transition: 'all 0.2s',
      }}>
        Далее →
      </button>
    </div>
  );

  // ── Venue detail opened from onboarding ───────────────────────────────────
  if (step === 1 && venueIdx !== null) {
    const placeName = PLACES[venueIdx]?.name ?? '';
    return (
      <VenueScreen
        onBack={() => setVenueIdx(null)}
        placeIdx={venueIdx}
        likedSlot={{ isLiked: selPlaces.has(placeName), toggle: () => togglePlace(placeName) }}
      />
    );
  }

  // ── Screen 2: place pick ───────────────────────────────────────────────────
  if (step === 1) {
    const groups = selCats
      .filter(c => c !== 'events')
      .map(c => ({ cat: ONBOARDING_CATS.find(x => x.id === c)!, places: placesForCat(c) }))
      .filter(g => g.places.length > 0);

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F2F2F2', overflow: 'hidden' }}>
        <div style={{ padding: '32px 16px 0', flexShrink: 0, backgroundColor: '#F2F2F2' }}>
          <ProgressDots />
          <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>
            Отметьте, что цепляет
          </h2>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: '#999' }}>
            Листайте фото, заходите внутрь
          </p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
          {groups.map(({ cat, places }) => (
            <div key={cat.id} style={{ marginBottom: 24 }}>
              <p style={{ margin: '12px 0 10px', fontSize: 11, fontWeight: 700, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                {cat.emoji} {cat.label}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {places.map(p => {
                  const sel = selPlaces.has(p.name);
                  const idx = PLACES.indexOf(p);
                  return (
                    <div key={p.name} style={{ position: 'relative' }}>
                      <LargeVerticalCard
                        place={p}
                        onClick={() => setVenueIdx(idx)}
                      />
                      {/* Selection toggle overlay */}
                      <button
                        onClick={e => { e.stopPropagation(); togglePlace(p.name); }}
                        style={{
                          position: 'absolute', top: 12, right: 12,
                          width: 32, height: 32, borderRadius: 16,
                          backgroundColor: sel ? ACCENT_DARK : 'rgba(255,255,255,0.88)',
                          border: sel ? 'none' : '2px solid rgba(255,255,255,0.7)',
                          boxShadow: '0 1px 6px rgba(0,0,0,0.18)',
                          cursor: 'pointer', padding: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s',
                        }}
                      >
                        {sel ? (
                          <svg width="12" height="10" viewBox="0 0 12 9" fill="none">
                            <path d="M1 4L4.5 7.5L11 1" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 16px 24px', flexShrink: 0, backgroundColor: '#F2F2F2' }}>
          <button onClick={() => setStep(2)} style={{
            width: '100%', padding: '15px', borderRadius: 20, border: 'none', cursor: 'pointer',
            backgroundColor: ACCENT_DARK, color: '#FFF',
            fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
          }}>
            {selPlaces.size > 0 ? `Готово (${selPlaces.size}) →` : 'Пропустить →'}
          </button>
        </div>
      </div>
    );
  }

  // ── Screen 3: tip ─────────────────────────────────────────────────────────
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px 40px', backgroundColor: '#FAFAFA' }}>
      <ProgressDots />
      <div style={{
        width: 80, height: 80, borderRadius: 40, backgroundColor: ACCENT,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
      }}>
        <svg width="36" height="34" viewBox="0 0 24 22" fill="none">
          <path d="M12 21C12 21 2 14 2 7a5 5 0 0110 0 5 5 0 0110 0c0 7-10 14-10 14z"
            fill={ACCENT_DARK} stroke={ACCENT_DARK} strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: '#1A1A1A', textAlign: 'center', lineHeight: 1.25 }}>
        Рекомендации станут точнее
      </h2>
      <p style={{ margin: '0 0 40px', fontSize: 14, color: '#777', textAlign: 'center', lineHeight: 1.6 }}>
        Сохраняйте места в избранное — мы учтём всё, что вам нравится, и подберём ещё лучше
      </p>
      <button onClick={() => onDone(selPlaces)} style={{
        width: '100%', padding: '15px', borderRadius: 20, border: 'none', cursor: 'pointer',
        backgroundColor: ACCENT_DARK, color: '#FFF',
        fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
      }}>
        Начать →
      </button>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function UptownApp() {
  const [screen, setScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDinnerId, setSelectedDinnerId] = useState<number>(1);
  const [selectedCollectionIdx, setSelectedCollectionIdx] = useState<number>(0);
  const [selectedVenueIdx, setSelectedVenueIdx] = useState<number>(0);
  const [nearbyTitle, setNearbyTitle] = useState('Рядом с вами');
  const [searchDraft, setSearchDraft] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{ label: string; places: typeof PLACES } | null>(null);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set());
  const toggleLike = (name: string) => setLikedSet(prev => {
    const next = new Set(prev);
    next.has(name) ? next.delete(name) : next.add(name);
    return next;
  });

  const openVenue = (idx: number) => { setSelectedVenueIdx(idx); navigate('venue'); };
  const [navStack, setNavStack] = useState<Screen[]>(['home']);

  // Navigate forward — pushes to stack
  const navigate = (to: Screen) => {
    setNavStack(prev => [...prev, to]);
    setScreen(to);
  };

  // Go back — pops from stack
  const goBack = () => {
    setNavStack(prev => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      const target = next[next.length - 1];
      setScreen(target);
      // Sync tab if going back to a tab root
      const tabRoots: Screen[] = ['home', 'events', 'dinners', 'map', 'profile'];
      if (tabRoots.includes(target)) setActiveTab(target as Tab);
      return next;
    });
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setNavStack([tab as Screen]);
    setScreen(tab as Screen);
  };

  const handleDinnerClick = (id: number) => {
    setSelectedDinnerId(id);
    navigate('dinner-detail');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        html, body { overflow-x: hidden; max-width: 100vw; }
        .uptown-root * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }
        .uptown-phone::-webkit-scrollbar { display: none; }
        .uptown-hscroll { overflow-x: auto; scrollbar-width: none; }
        .uptown-hscroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="uptown-root" style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#D8D8D8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        background: 'linear-gradient(135deg, #C8C8C8 0%, #E0E0E0 100%)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>
        <div className="uptown-phone" style={{
          width: 375,
          height: 812,
          backgroundColor: '#FFFFFF',
          borderRadius: 46,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Status bar */}
          <StatusBar />

          {/* Onboarding */}
          {!onboardingDone && (
            <OnboardingFlow onDone={(liked) => { setLikedSet(liked); setOnboardingDone(true); }} />
          )}

          {/* Screen content */}
          <div style={{ flex: 1, overflow: 'hidden', flexDirection: 'column', display: onboardingDone ? 'flex' : 'none' }}>
            {screen === 'events' && (
              <EventsScreen
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                onViewResults={() => navigate('results')}
              />
            )}
            {screen === 'results' && (
              <ResultsScreen onVenueClick={openVenue} />
            )}
            {screen === 'venue' && (
              <VenueScreen
                onBack={goBack}
                placeIdx={selectedVenueIdx}
                likedSlot={{ isLiked: likedSet.has(PLACES[selectedVenueIdx]?.name), toggle: () => toggleLike(PLACES[selectedVenueIdx]?.name) }}
              />
            )}
            {screen === 'home' && (
              <HomeScreen
                onVenueClick={openVenue}
                onAllCollections={() => navigate('collections')}
                onCollectionClick={(idx) => { setSelectedCollectionIdx(idx); navigate('collection-detail'); }}
                onAllNearby={() => { setNearbyTitle('Рядом с вами'); navigate('nearby-all'); }}
                onAllWeekly={() => { setNearbyTitle('Места недели'); navigate('nearby-all'); }}
                onAllFeatured={() => { setNearbyTitle('Рекомендуем'); navigate('nearby-all'); }}
                searchDraft={searchDraft} setSearchDraft={setSearchDraft}
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                searchLoading={searchLoading} setSearchLoading={setSearchLoading}
                searchResult={searchResult} setSearchResult={setSearchResult}
                likedSet={likedSet} toggleLike={toggleLike}
              />
            )}
            {screen === 'map' && (
              <MapScreen
                onBack={navStack.length > 1 ? goBack : undefined}
                onVenueClick={openVenue}
              />
            )}
            {screen === 'collections' && (
              <CollectionsScreen
                onBack={goBack}
                onCollectionClick={(idx) => { setSelectedCollectionIdx(idx); navigate('collection-detail'); }}
                onVenueClick={openVenue}
              />
            )}
            {screen === 'collection-detail' && (
              <CollectionDetailScreen
                collectionIdx={selectedCollectionIdx}
                onBack={goBack}
                onVenueClick={openVenue}
                onMapClick={() => navigate('map')}
              />
            )}
            {screen === 'nearby-all' && (
              <NearbyAllScreen
                onBack={goBack}
                onVenueClick={openVenue}
                onMapClick={() => navigate('map')}
                title={nearbyTitle}
              />
            )}
            {screen === 'profile' && <ProfileScreen />}
            {screen === 'dinners' && <DinnersScreen onDinnerClick={handleDinnerClick} />}
            {screen === 'dinner-detail' && (
              <DinnerDetailScreen
                dinnerId={selectedDinnerId}
                onBack={goBack}
                onSignUp={() => navigate('questionnaire')}
              />
            )}
            {screen === 'questionnaire' && (
              <QuestionnaireScreen onDone={() => { handleTabChange('dinners'); }} />
            )}
          </div>

          {/* Bottom tab bar */}
          {onboardingDone && <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />}
        </div>
      </div>
    </>
  );
}
