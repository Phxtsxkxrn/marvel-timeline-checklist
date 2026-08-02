import type { MCUTitle } from "../types/movie";

export default function FavoritesScreen({ titles }: { titles: MCUTitle[] }) {
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