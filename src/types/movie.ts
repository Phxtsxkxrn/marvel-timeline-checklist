export type ContentType = "movie" | "series" | "special";

export type Saga =
  | "Infinity Saga"
  | "Multiverse Saga";

export interface Movie {
  id: number;

  title: string;

  year: number;

  type: ContentType;

  phase: number;

  saga: Saga;

  timelineOrder: number;

  poster: string;

  watched: boolean;

  favorite: boolean;
}