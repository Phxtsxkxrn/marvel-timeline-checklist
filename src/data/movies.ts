import type { Movie } from "../types/movie";

export const movies: Movie[] = [
  {
    id: 1,
    title: "Captain America: The First Avenger",
    year: 2011,
    type: "movie",
    phase: 1,
    saga: "Infinity Saga",
    timelineOrder: 1,
    poster: "/posters/captain-america-first-avenger.jpg",
    watched: false,
    favorite: false,
  },

  {
    id: 2,
    title: "Captain Marvel",
    year: 2019,
    type: "movie",
    phase: 3,
    saga: "Infinity Saga",
    timelineOrder: 2,
    poster: "/posters/captain-marvel.jpg",
    watched: false,
    favorite: false,
  },

  {
    id: 3,
    title: "Iron Man",
    year: 2008,
    type: "movie",
    phase: 1,
    saga: "Infinity Saga",
    timelineOrder: 3,
    poster: "/posters/iron-man.jpg",
    watched: false,
    favorite: false,
  },

  {
    id: 4,
    title: "Iron Man 2",
    year: 2010,
    type: "movie",
    phase: 1,
    saga: "Infinity Saga",
    timelineOrder: 4,
    poster: "/posters/iron-man-2.jpg",
    watched: false,
    favorite: false,
  },
];