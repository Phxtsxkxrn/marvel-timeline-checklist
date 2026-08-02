type CircularProgressProps = {
  percent: number
  watched: number
  total: number
}

export default function CircularProgress({
  percent,
}: CircularProgressProps) {
  const size = 128
  const strokeWidth = 7

  const radius = (size - strokeWidth) / 2

  const circumference = 2 * Math.PI * radius

  const offset =
    circumference - (percent / 100) * circumference

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        style={{
          transform: "rotate(-90deg)",
        }}
      >
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
          style={{
            transition:
              "stroke-dashoffset 0.6s ease",
          }}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <span
          style={{
            fontFamily:
              "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 26,
            color: "#f0f0f0",
            lineHeight: 1,
          }}
        >
          {percent}%
        </span>

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            color: "#9a9a9a",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Watched
        </span>
      </div>
    </div>
  )
}