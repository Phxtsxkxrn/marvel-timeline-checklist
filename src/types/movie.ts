export type TitleType = "movie" | "series" | "special";

export type TabFilter =
  | "all"
  | "movies"
  | "series"
  | "specials";

export type NavTab =
  | "timeline"
  | "progress"
  | "favorites"
  | "profile";

export interface MCUTitle {
  id: number;

  title: string;

  year: number;

  type: TitleType;

  gradient: [string, string];

  watched: boolean;

  favorite?: boolean;

  phase: number;

  poster?: string
}