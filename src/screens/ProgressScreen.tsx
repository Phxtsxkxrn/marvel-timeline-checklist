import type { MCUTitle } from "../types/movie";

export default function ProgressScreen({ titles }: { titles: MCUTitle[] }) {
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