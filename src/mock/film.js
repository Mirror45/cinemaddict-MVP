import { getRandomInteger, getRandomArray } from "../utils.js";
import { comments } from "./comments-film.js";
import {
  TITLES,
  AGE_RATINGS,
  GENRES,
  COUNTRIES,
  DESCRIPTIONS,
  RELEASE_DATE,
  FILM_INFO,
} from "./mock-const";

export const generateFilm = () => {
  const id = getRandomInteger(0, TITLES.length - 1);
  const title = TITLES[id];
  let info = {};

  Object.entries(FILM_INFO).filter(([key, value]) => {
    if (key === title) {
      info = value;
    }
  });

  return {
    id,
    filmInfo: {
      title,
      alternativeTitle: info.alternativeTitle,
      poster: info.poster,
      raiting: info.raiting,
      ageRating: getRandomArray(AGE_RATINGS),
      director: info.director,
      writers: info.writers,
      actors: info.actors,
      genre: getRandomArray(GENRES),
      releaseDate: getRandomArray(RELEASE_DATE),
      duration: getRandomInteger(60, 150),
      country: getRandomArray(COUNTRIES),
      description: getRandomArray(DESCRIPTIONS),
      isWatchList: Boolean(getRandomInteger(0, 1)),
      isWatched: Boolean(getRandomInteger(0, 1)),
      isFavorite: Boolean(getRandomInteger(0, 1)),
    },
    comments: getRandomArray(comments),
  };
};
