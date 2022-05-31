import { IFilm } from '../src/types';

export const MOCK_FILM: IFilm = {
  Poster: 'https://picsum.photos/200',
  Title: 'Mock title',
  Type: 'Mock type',
  Year: '2020',
  imdbID: 'mock imdbID',
  details: {
    Actors: 'Mock actors',
    Awards: 'Mock awards',
    BoxOffice: 'Mock box office',
    Country: 'Mock Country',
    DVD: 'Mock DVD',
    Director: 'Mock Director',
    Genre: 'Mock Genre',
    Language: 'Mock Language',
    Metascore: 'Mock Metascore',
    Plot: 'Mock Plot',
    Poster: 'https://picsum.photos/200',
    Production: 'Mock Production',
    Rated: 'Mock Rated',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '7.5/10',
      },
    ],
    Released: 'Mock Released',
    Response: 'Mock Response',
    Runtime: 'Mock Runtime',
    Title: 'Mock Title',
    Type: 'Mock Type',
    Website: 'Mock Website',
    Writer: 'Mock Writer',
    Year: 'Mock Year',
    imdbID: 'Mock imdbID',
    imdbRating: 'Mock imdbRating',
    imdbVotes: '7.5',
    avgRating: 7.5,
  },
};

export const MOCK_FILMS_LIST: IFilm[] = [
  MOCK_FILM,
  MOCK_FILM,
  MOCK_FILM,
  MOCK_FILM,
  MOCK_FILM,
  MOCK_FILM,
].map((film, index) => ({
  ...film,
  imdbID: index.toString(),
  details: { ...film.details, imdbID: index.toString() },
}));
