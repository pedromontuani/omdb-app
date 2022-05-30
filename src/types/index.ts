export interface IFilm {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  details: IFilmDetails;
}

export interface IRating {
  Source: 'Internet Movie Database' | 'Rotten Tomatoes' | 'Metacritic';
  Value: string;
}

export type IFilmDetails = {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: IRating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  avgRating: number;
};

export interface IFilmsQueryResponse {
  Search: IFilm[];
  Response: 'True' | 'False';
  Error?: string;
  totalResults: number;
}
