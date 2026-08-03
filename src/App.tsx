import { useEffect, useMemo, useRef, useState } from "react";
import type {
  MCUTitle,
  NavTab,
  TabFilter,
  TitleType,
} from "./types/movie";
import CircularProgress from "./components/CircularProgress";
import PosterCard from "./components/PosterCard";
import BadgePill from "./components/BadgePill";
import ProgressScreen from "./screens/ProgressScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import {
  IconTimeline,
  IconProgress,
  IconHeart,
  IconProfile,
  IconSearch,
  IconFilter,
} from "./components/icons";
import { MCU_DATA } from "./data/mcuData";

const TOTAL = MCU_DATA.length
const WATCHED_COUNT = MCU_DATA.filter(t => t.watched).length

export default function App() {
  const [titles, setTitles] = useState<MCUTitle[]>(() => {
  const saved = localStorage.getItem("mcu-tracker");

  if (saved) {
    return JSON.parse(saved) as MCUTitle[];
  }

  return MCU_DATA;
});
  const [activeFilter, setActiveFilter] = useState<TabFilter>('all')
  const [activeNav, setActiveNav] = useState<NavTab>('timeline')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const watchedCount = titles.filter(t => t.watched).length
  const pct = Math.round((watchedCount / TOTAL) * 100)

  const toggleWatched = (id: number) => {
    setTitles(prev => prev.map(t => t.id === id ? { ...t, watched: !t.watched } : t))
  }

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
  localStorage.setItem(
    "mcu-tracker",
    JSON.stringify(titles)
  );
}, [titles]);

  const filteredTitles = titles.filter(t => {
    const matchesFilter =
      activeFilter === 'all' ? true :
      activeFilter === 'movies' ? t.type === 'movie' :
      activeFilter === 'series' ? t.type === 'series' :
      t.type === 'special'
    const matchesSearch = searchQuery
      ? t.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    return matchesFilter && matchesSearch
  })

  const navItems: { key: NavTab; label: string; icon: () => JSX.Element }[] = [
    { key: 'timeline', label: 'Timeline', icon: IconTimeline },
    { key: 'progress', label: 'Progress', icon: IconProgress },
    { key: 'favorites', label: 'Favorites', icon: IconHeart },
    { key: 'profile', label: 'Profile', icon: IconProfile },
  ]

  return (
    <div style={{
      width: '100%',
      maxWidth: 390,
      minHeight: '100vh',
      background: '#121212',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      margin: '0 auto',
    }}>

      {/* Top App Bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(18,18,18,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 16px',
      }}>
        <div style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {searchOpen ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search titles..."
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '8px 14px',
                  color: '#f0f0f0',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                style={{ background: 'none', border: 'none', color: '#9a9a9a', cursor: 'pointer', padding: 4, fontFamily: "'Inter', sans-serif", fontSize: 14 }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: 20,
                color: '#f0f0f0',
                letterSpacing: '0.01em',
                lineHeight: 1,
              }}>
                <span style={{ color: '#ED1D24' }}>MARVEL</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 6px', fontSize: 16, fontWeight: 400 }}>·</span>
                <span>TIMELINE</span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => setSearchOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9a9a9a',
                    cursor: 'pointer',
                    padding: 7,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onPointerEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)'
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#f0f0f0'
                  }}
                  onPointerLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'none'
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#9a9a9a'
                  }}
                >
                  <IconSearch />
                </button>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9a9a9a',
                    cursor: 'pointer',
                    padding: 7,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconFilter />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>

        {activeNav === 'timeline' && (
          <>
            {/* Progress Section */}
            <div style={{
              margin: '16px 16px 0',
              background: 'linear-gradient(135deg, #1e1e1e 0%, #252525 100%)',
              borderRadius: 20,
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}>
              <CircularProgress percent={pct} watched={watchedCount} total={TOTAL} />
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 38,
                  color: '#f0f0f0',
                  lineHeight: 1,
                  letterSpacing: '-0.5px',
                }}>
                  {watchedCount}
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 600, fontSize: 24 }}>
                    {' '}/ {TOTAL}
                  </span>
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: '#9a9a9a',
                  marginTop: 4,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}>Titles Watched</div>
                <div style={{
                  marginTop: 12,
                  display: 'flex',
                  gap: 6,
                  flexWrap: 'wrap',
                }}>
                  {[
                    { label: 'Movies', color: '#ED1D24', count: titles.filter(t => t.type === 'movie' && t.watched).length },
                    { label: 'Series', color: '#60a5fa', count: titles.filter(t => t.type === 'series' && t.watched).length },
                  ].map(b => (
                    <div key={b.label} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 20,
                      padding: '3px 9px',
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: b.color }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9a9a9a', fontWeight: 500 }}>
                        {b.count} {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Segmented Control */}
            <div style={{ padding: '16px 16px 0' }}>
              <div style={{
                background: '#1e1e1e',
                borderRadius: 12,
                padding: 4,
                display: 'flex',
                gap: 2,
              }}>
                {(['all', 'movies', 'series', 'specials'] as TabFilter[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    style={{
                      flex: 1,
                      padding: '8px 4px',
                      borderRadius: 9,
                      border: 'none',
                      background: activeFilter === tab ? '#ED1D24' : 'transparent',
                      color: activeFilter === tab ? '#fff' : '#9a9a9a',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 12,
                      cursor: 'pointer',
                      transition: 'background 0.18s ease, color 0.18s ease',
                      textTransform: 'capitalize',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Section header */}
            <div style={{
              padding: '20px 16px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: '#f0f0f0',
                letterSpacing: '0.02em',
              }}>Chronological Order</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: '#666',
              }}>{filteredTitles.length} titles</div>
            </div>

            {/* Poster Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              padding: '0 16px',
            }}>
              {filteredTitles.map(title => (
                <PosterCard key={title.id} title={title} onToggle={toggleWatched} />
              ))}
            </div>

            {filteredTitles.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 16px', color: '#9a9a9a' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}>No titles found</div>
              </div>
            )}
          </>
        )}

        {activeNav === 'progress' && <ProgressScreen titles={titles} />}
        {activeNav === 'favorites' && <FavoritesScreen titles={titles} />}
        {activeNav === 'profile' && <ProfileScreen watched={watchedCount} total={TOTAL} />}

      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 390,
        background: 'rgba(18,18,18,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}>
        {navItems.map(({ key, label, icon: Icon }) => {
          const active = activeNav === key
          return (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 0 12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: active ? '#ED1D24' : '#555',
                transition: 'color 0.18s ease',
                gap: 3,
              }}
            >
              <Icon />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: active ? '#ED1D24' : '#555',
              }}>{label}</span>
              {active && (
                <div style={{
                  position: 'absolute',
                  bottom: 'env(safe-area-inset-bottom, 0px)',
                  width: 20,
                  height: 2,
                  background: '#ED1D24',
                  borderRadius: 99,
                  marginBottom: 0,
                }} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
