import type { TitleType } from "../types/movie";

type BadgePillProps = {
  type: TitleType;
};

export default function BadgePill({ type }: BadgePillProps) {
  const colors: Record<
    TitleType,
    {
      bg: string;
      text: string;
      label: string;
    }
  > = {
    movie: {
      bg: "rgba(237,29,36,0.2)",
      text: "#ED1D24",
      label: "Movie",
    },
    series: {
      bg: "rgba(59,130,246,0.2)",
      text: "#60a5fa",
      label: "Series",
    },
    special: {
      bg: "rgba(245,158,11,0.2)",
      text: "#fbbf24",
      label: "Special",
    },
  };

  const color = colors[type];

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 7px",
        borderRadius: 20,
        background: color.bg,
        color: color.text,
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        backdropFilter: "blur(4px)",
      }}
    >
      {color.label}
    </span>
  );
}