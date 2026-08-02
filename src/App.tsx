import { useState, useRef, useEffect } from 'react'
import type {
  MCUTitle,
  NavTab,
  TabFilter,
  TitleType,
} from "./types/movie";

const MCU_DATA: MCUTitle[] = [
  { id: 1, title: 'Captain America: The First Avenger', year: 2011, type: 'movie', gradient: ['#1a3a5c', '#0c1e36'], watched: true, phase: 1 },
  { id: 2, title: 'Agent Carter', year: 2015, type: 'series', gradient: ['#8b1a1a', '#3d0b0b'], watched: true, phase: 1 },
  { id: 3, title: 'Captain Marvel', year: 2019, type: 'movie', gradient: ['#1e3a6e', '#6b21a8'], watched: true, phase: 1 },
  { id: 4, title: 'Iron Man', year: 2008, type: 'movie', gradient: ['#7c1d1d', '#c2410c'], watched: true, phase: 1 },
  { id: 5, title: 'Iron Man 2', year: 2010, type: 'movie', gradient: ['#9a2010', '#c0391b'], watched: true, phase: 1 },
  { id: 6, title: 'The Incredible Hulk', year: 2008, type: 'movie', gradient: ['#14532d', '#15803d'], watched: true, phase: 1 },
  { id: 7, title: 'Thor', year: 2011, type: 'movie', gradient: ['#1e3a8a', '#eab308'], watched: true, phase: 1 },
  { id: 8, title: 'The Avengers', year: 2012, type: 'movie', gradient: ['#1a1a2e', '#16213e'], watched: true, phase: 1 },
  { id: 9, title: 'Iron Man 3', year: 2013, type: 'movie', gradient: ['#7f1d1d', '#dc2626'], watched: true, phase: 2 },
  { id: 10, title: 'Thor: The Dark World', year: 2013, type: 'movie', gradient: ['#1e1b4b', '#312e81'], watched: true, phase: 2 },
  { id: 11, title: 'All Hail the King', year: 2014, type: 'special', gradient: ['#292524', '#57534e'], watched: false, phase: 2 },
  { id: 12, title: 'Captain America: The Winter Soldier', year: 2014, type: 'movie', gradient: ['#0f172a', '#1e3a5f'], watched: true, phase: 2 },
  { id: 13, title: 'Guardians of the Galaxy', year: 2014, type: 'movie', gradient: ['#1a0533', '#7e22ce'], watched: true, phase: 2 },
  { id: 14, title: 'Guardians of the Galaxy Vol. 2', year: 2014, type: 'movie', gradient: ['#2d1654', '#9333ea'], watched: true, phase: 3 },
  { id: 15, title: 'Avengers: Age of Ultron', year: 2015, type: 'movie', gradient: ['#1c1c1c', '#7f1d1d'], watched: true, phase: 2 },
  { id: 16, title: 'Ant-Man', year: 2015, type: 'movie', gradient: ['#1a3a1a', '#365314'], watched: true, phase: 2 },
  { id: 17, title: 'Captain America: Civil War', year: 2016, type: 'movie', gradient: ['#0f172a', '#1e1e2e'], watched: true, phase: 3 },
  { id: 18, title: 'Black Panther', year: 2018, type: 'movie', gradient: ['#150050', '#3F0071'], watched: true, phase: 3 },
  { id: 19, title: 'Spider-Man: Homecoming', year: 2017, type: 'movie', gradient: ['#7f1d1d', '#1d3a7f'], watched: true, phase: 3 },
  { id: 20, title: 'Doctor Strange', year: 2016, type: 'movie', gradient: ['#2d1b00', '#7c4d00'], watched: true, phase: 3 },
  { id: 21, title: 'Thor: Ragnarok', year: 2017, type: 'movie', gradient: ['#1a0a00', '#c2410c'], watched: true, phase: 3 },
  { id: 22, title: 'Avengers: Infinity War', year: 2018, type: 'movie', gradient: ['#1a0533', '#4a044e'], watched: true, phase: 3 },
  { id: 23, title: 'Ant-Man and the Wasp', year: 2018, type: 'movie', gradient: ['#0f3460', '#e94560'], watched: true, phase: 3 },
  { id: 24, title: 'Avengers: Endgame', year: 2019, type: 'movie', gradient: ['#0d0d0d', '#1a0533'], watched: true, phase: 3 },
  { id: 25, title: 'Spider-Man: Far From Home', year: 2019, type: 'movie', gradient: ['#7f1d1d', '#1e3a5f'], watched: true, phase: 3 },
  { id: 26, title: 'WandaVision', year: 2021, type: 'series', gradient: ['#4a044e', '#881337'], watched: true, phase: 4 },
  { id: 27, title: 'The Falcon and the Winter Soldier', year: 2021, type: 'series', gradient: ['#0f172a', '#7f1d1d'], watched: true, phase: 4 },
  { id: 28, title: 'Loki', year: 2021, type: 'series', gradient: ['#14532d', '#1e1b4b'], watched: true, phase: 4 },
  { id: 29, title: 'Black Widow', year: 2021, type: 'movie', gradient: ['#1c1c1c', '#450a0a'], watched: true, phase: 4 },
  { id: 30, title: 'What If...?', year: 2021, type: 'series', gradient: ['#1a1a2e', '#16213e'], watched: true, phase: 4 },
  { id: 31, title: 'Shang-Chi', year: 2021, type: 'movie', gradient: ['#450a0a', '#7f1d1d'], watched: true, phase: 4 },
  { id: 32, title: 'Eternals', year: 2021, type: 'movie', gradient: ['#1e1b4b', '#f59e0b'], watched: true, phase: 4 },
  { id: 33, title: 'Hawkeye', year: 2021, type: 'series', gradient: ['#7f1d1d', '#0f172a'], watched: true, phase: 4 },
  { id: 34, title: 'Spider-Man: No Way Home', year: 2021, type: 'movie', gradient: ['#7f1d1d', '#1e3a5f'], watched: true, favorite: true, phase: 4 },
  { id: 35, title: 'Moon Knight', year: 2022, type: 'series', gradient: ['#1e1b4b', '#6b7280'], watched: true, phase: 4 },
  { id: 36, title: 'Doctor Strange in the Multiverse of Madness', year: 2022, type: 'movie', gradient: ['#2d1b00', '#4a044e'], watched: true, phase: 4 },
  { id: 37, title: 'Ms. Marvel', year: 2022, type: 'series', gradient: ['#1d4ed8', '#7c3aed'], watched: true, phase: 4 },
  { id: 38, title: 'Thor: Love and Thunder', year: 2022, type: 'movie', gradient: ['#1a0533', '#c2410c'], watched: true, phase: 4 },
  { id: 39, title: 'She-Hulk: Attorney at Law', year: 2022, type: 'series', gradient: ['#14532d', '#4ade80'], watched: false, phase: 4 },
  { id: 40, title: 'Black Panther: Wakanda Forever', year: 2022, type: 'movie', gradient: ['#1a1a1a', '#7e22ce'], watched: true, favorite: true, phase: 4 },
  { id: 41, title: 'Werewolf by Night', year: 2022, type: 'special', gradient: ['#1c1c1c', '#292524'], watched: true, phase: 4 },
  { id: 42, title: 'The Guardians of the Galaxy Holiday Special', year: 2022, type: 'special', gradient: ['#1a1a2e', '#7e22ce'], watched: true, phase: 4 },
  { id: 43, title: 'Ant-Man and the Wasp: Quantumania', year: 2023, type: 'movie', gradient: ['#0c4a6e', '#1e1b4b'], watched: true, phase: 5 },
  { id: 44, title: 'Guardians of the Galaxy Vol. 3', year: 2023, type: 'movie', gradient: ['#450a0a', '#7e22ce'], watched: true, phase: 5 },
  { id: 45, title: 'Secret Invasion', year: 2023, type: 'series', gradient: ['#0f172a', '#14532d'], watched: false, phase: 5 },
  { id: 46, title: 'The Marvels', year: 2023, type: 'movie', gradient: ['#1e3a8a', '#7c3aed'], watched: false, phase: 5 },
  { id: 47, title: 'Loki Season 2', year: 2023, type: 'series', gradient: ['#14532d', '#1e1b4b'], watched: true, phase: 5 },
  { id: 48, title: 'Echo', year: 2024, type: 'series', gradient: ['#292524', '#7c1d1d'], watched: false, phase: 5 },
  { id: 49, title: 'Deadpool & Wolverine', year: 2024, type: 'movie', gradient: ['#7f1d1d', '#1f2937'], watched: true, favorite: true, phase: 5 },
  { id: 50, title: 'Agatha All Along', year: 2024, type: 'series', gradient: ['#4a044e', '#1e1b4b'], watched: false, phase: 5 },
  { id: 51, title: 'Your Friendly Neighborhood Spider-Man', year: 2025, type: 'series', gradient: ['#7f1d1d', '#1d3a7f'], watched: false, phase: 5 },
  { id: 52, title: 'Captain America: Brave New World', year: 2025, type: 'movie', gradient: ['#0f172a', '#7f1d1d'], watched: false, phase: 5 },
  { id: 53, title: 'Daredevil: Born Again', year: 2025, type: 'series', gradient: ['#7f1d1d', '#0f172a'], watched: false, phase: 5 },
  { id: 54, title: 'Thunderbolts*', year: 2025, type: 'movie', gradient: ['#1c1c1c', '#374151'], watched: false, phase: 5 },
  { id: 55, title: 'The Fantastic Four: First Steps', year: 2025, type: 'movie', gradient: ['#1e3a5f', '#c2410c'], watched: false, phase: 6 },
  { id: 56, title: 'Ironheart', year: 2025, type: 'series', gradient: ['#7c2d12', '#c2410c'], watched: false, phase: 6 },
  { id: 57, title: 'Avengers: Doomsday', year: 2026, type: 'movie', gradient: ['#1a0533', '#450a0a'], watched: false, phase: 6 },
  { id: 58, title: 'Avengers: Secret Wars', year: 2027, type: 'movie', gradient: ['#0d0d0d', '#2d1b00'], watched: false, phase: 6 },
]

const TOTAL = MCU_DATA.length
const WATCHED_COUNT = MCU_DATA.filter(t => t.watched).length

function CircularProgress({ percent, watched, total }: { percent: number; watched: number; total: number }) {
  const size = 128
  const strokeWidth = 7
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#ED1D24"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1
      }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: '#f0f0f0',
          lineHeight: 1,
        }}>{percent}%</span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 500,
          color: '#9a9a9a',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>Watched</span>
      </div>
    </div>
  )
}

function BadgePill({ type }: { type: TitleType }) {
  const colors: Record<TitleType, { bg: string; text: string; label: string }> = {
    movie: { bg: 'rgba(237,29,36,0.2)', text: '#ED1D24', label: 'Movie' },
    series: { bg: 'rgba(59,130,246,0.2)', text: '#60a5fa', label: 'Series' },
    special: { bg: 'rgba(245,158,11,0.2)', text: '#fbbf24', label: 'Special' },
  }
  const c = colors[type]
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 7px',
      borderRadius: 20,
      background: c.bg,
      color: c.text,
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      backdropFilter: 'blur(4px)',
    }}>{c.label}</span>
  )
}

function PosterCard({
  title,
  onToggle,
}: {
  title: MCUTitle
  onToggle: (id: number) => void
}) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => { setHovered(false); setPressed(false) }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        background: `linear-gradient(160deg, ${title.gradient[0]}, ${title.gradient[1]})`,
        cursor: 'pointer',
        transform: pressed ? 'scale(0.96)' : hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        boxShadow: hovered
          ? `0 12px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)`
          : '0 4px 12px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        aspectRatio: '2 / 3',
        position: 'relative',
        userSelect: 'none',
      }}
      onClick={() => onToggle(title.id)}
    >
      {/* Noise texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        opacity: 0.4,
        pointerEvents: 'none',
        borderRadius: 16,
      }} />

      {/* Status badge top-right */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
      }}>
        {title.watched ? (
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(74,222,128,0.2)',
            border: '2px solid #4ade80',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7l4 4 6-6" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : (
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.3)',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
          }} />
        )}
      </div>

      {/* Bottom info area */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '32px 10px 12px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
        borderRadius: '0 0 16px 16px',
      }}>
        <BadgePill type={title.type} />
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 13.5,
          color: '#f0f0f0',
          marginTop: 4,
          lineHeight: 1.2,
          letterSpacing: '0.01em',
        }}>
          {title.title}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: 'rgba(255,255,255,0.5)',
          marginTop: 2,
        }}>
          {title.year}
        </div>
      </div>

      {/* Phase indicator dot */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
        fontFamily: "'Inter', sans-serif",
        fontSize: 9,
        fontWeight: 700,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        Ph.{title.phase}
      </div>
    </div>
  )
}

function ProgressScreen({ titles }: { titles: MCUTitle[] }) {
  const watched = titles.filter(t => t.watched).length
  const movies = titles.filter(t => t.type === 'movie')
  const series = titles.filter(t => t.type === 'series')
  const specials = titles.filter(t => t.type === 'special')

  const phases = [1, 2, 3, 4, 5, 6]
  const phaseColors: Record<number, string> = {
    1: '#ED1D24', 2: '#c2410c', 3: '#7e22ce', 4: '#1d4ed8', 5: '#0891b2', 6: '#059669'
  }

  return (
    <div style={{ padding: '0 16px 24px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: '#f0f0f0',
          letterSpacing: '0.02em',
          marginBottom: 4,
        }}>Your Progress</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9a9a9a' }}>
          Track your MCU journey
        </div>
      </div>

      {/* Stats row */}
      {[
        { label: 'Movies', total: movies.length, watched: movies.filter(t => t.watched).length, color: '#ED1D24' },
        { label: 'Series', total: series.length, watched: series.filter(t => t.watched).length, color: '#60a5fa' },
        { label: 'Specials', total: specials.length, watched: specials.filter(t => t.watched).length, color: '#fbbf24' },
      ].map(stat => (
        <div key={stat.label} style={{
          background: '#1e1e1e',
          borderRadius: 14,
          padding: '14px 16px',
          marginBottom: 10,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: '#f0f0f0' }}>
              {stat.label}
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9a9a9a' }}>
              {stat.watched} / {stat.total}
            </span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${(stat.watched / stat.total) * 100}%`,
              background: stat.color,
              borderRadius: 99,
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>
      ))}

      {/* Phase breakdown */}
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 18,
        fontWeight: 700,
        color: '#f0f0f0',
        letterSpacing: '0.02em',
        margin: '24px 0 12px',
      }}>Phase Breakdown</div>

      {phases.map(phase => {
        const phaseTitles = titles.filter(t => t.phase === phase)
        if (phaseTitles.length === 0) return null
        const phaseWatched = phaseTitles.filter(t => t.watched).length
        const pct = Math.round((phaseWatched / phaseTitles.length) * 100)
        return (
          <div key={phase} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 12,
            background: '#1e1e1e',
            borderRadius: 14,
            padding: '12px 14px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: phaseColors[phase] + '25',
              border: `1.5px solid ${phaseColors[phase]}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                color: phaseColors[phase],
              }}>{phase}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>
                  Phase {phase}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9a9a9a' }}>
                  {phaseWatched}/{phaseTitles.length} · {pct}%
                </span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 99, height: 5, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: phaseColors[phase],
                  borderRadius: 99,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function FavoritesScreen({ titles }: { titles: MCUTitle[] }) {
  const favs = titles.filter(t => t.favorite)
  return (
    <div style={{ padding: '0 16px 24px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: '#f0f0f0',
          letterSpacing: '0.02em',
          marginBottom: 4,
        }}>Favorites</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9a9a9a' }}>
          {favs.length} title{favs.length !== 1 ? 's' : ''} saved
        </div>
      </div>
      {favs.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666', paddingTop: 60 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>♡</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9a9a9a' }}>No favorites yet</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {favs.map(t => (
            <div key={t.id} style={{
              borderRadius: 14,
              background: `linear-gradient(160deg, ${t.gradient[0]}, ${t.gradient[1]})`,
              aspectRatio: '2/3',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '32px 10px 12px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: '#f0f0f0', lineHeight: 1.2 }}>
                  {t.title}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
                  {t.year}
                </div>
              </div>
              <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ED1D24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ProfileScreen({ watched, total }: { watched: number; total: number }) {
  const pct = Math.round((watched / total) * 100)
  return (
    <div style={{ padding: '0 16px 24px' }}>
      {/* Avatar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, paddingBottom: 32 }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ED1D24, #7e22ce)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
          fontSize: 32,
          fontWeight: 800,
          fontFamily: "'Barlow Condensed', sans-serif",
          color: '#fff',
          letterSpacing: '-1px',
        }}>M</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 700, color: '#f0f0f0' }}>
          Marvel Fan
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9a9a9a', marginTop: 2 }}>
          MCU Completionist
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 28 }}>
        {[
          { label: 'Watched', value: watched },
          { label: 'Remaining', value: total - watched },
          { label: 'Progress', value: `${pct}%` },
        ].map(s => (
          <div key={s.label} style={{
            background: '#1e1e1e',
            borderRadius: 14,
            padding: '14px 10px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, color: '#f0f0f0' }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9a9a9a', marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 18,
        fontWeight: 700,
        color: '#f0f0f0',
        letterSpacing: '0.02em',
        marginBottom: 12,
      }}>Achievements</div>

      {[
        { icon: '🎬', title: 'Phase 1 Complete', desc: 'Watched all Phase 1 films', unlocked: true },
        { icon: '⚡', title: 'Phase 2 Complete', desc: 'Watched all Phase 2 films', unlocked: true },
        { icon: '💎', title: 'Phase 3 Champion', desc: 'Watched all Phase 3 films', unlocked: true },
        { icon: '🔮', title: 'Multiverse Explorer', desc: 'Watch all Phase 4 titles', unlocked: false },
        { icon: '🏆', title: 'True Believer', desc: 'Watch all 58 titles', unlocked: false },
      ].map(a => (
        <div key={a.title} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          background: '#1e1e1e',
          borderRadius: 14,
          padding: '14px',
          marginBottom: 8,
          border: '1px solid rgba(255,255,255,0.06)',
          opacity: a.unlocked ? 1 : 0.45,
        }}>
          <div style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: '#f0f0f0' }}>
              {a.title}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9a9a9a', marginTop: 2 }}>
              {a.desc}
            </div>
          </div>
          {a.unlocked && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#4ade80" style={{ marginLeft: 'auto', flexShrink: 0 }}>
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

// Icon components
function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
function IconFilter() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  )
}
function IconTimeline() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}
function IconProgress() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10" />
      <path d="M12 2a10 10 0 1 0 10 10" strokeOpacity="0.3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconHeart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
function IconProfile() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export default function App() {
  const [titles, setTitles] = useState<MCUTitle[]>(MCU_DATA)
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
