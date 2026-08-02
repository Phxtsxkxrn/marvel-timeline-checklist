type ProfileScreenProps = {
  watched: number;
  total: number;
};

export default function ProfileScreen({ watched, total }: { watched: number; total: number }) {
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