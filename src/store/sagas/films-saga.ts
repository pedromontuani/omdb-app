import { AxiosResponse } from 'axios';
import { all, call, put, takeLeading } from 'redux-saga/effects';

import { getFilmsByQuery, getFilmById } from '../../services/ombd';
import { IFilmDetails, IFilmsQueryResponse } from '../../types';
import {
  GET_FILMS,
  GET_FILMS_ERROR,
  GET_FILMS_SUCCESS,
} from '../slices/films-slice';

function* queryFilms({
  payload: { query, year } = { query: 'avengers' },
}: ReturnType<typeof GET_FILMS>) {
  try {
    const { data }: { data: IFilmsQueryResponse } = yield call(
      getFilmsByQuery,
      query,
      year,
    );

    if (data.Error) {
      yield put(GET_FILMS_ERROR({ error: data.Error }));
    } else {
      const responses: Array<AxiosResponse<IFilmDetails, any>> = yield all(
        data.Search.map(film => call(getFilmById, film.imdbID)),
      );

      data.Search = data.Search.map((film, index) => ({
        ...film,
        details: responses[index].data,
      }));

      yield put(
        GET_FILMS_SUCCESS({
          query,
          films: data.Search.map(film => {
            const ratings = film.details.Ratings;
            const sum = ratings.reduce((acc, rating) => {
              const { Source, Value } = rating;
              if (Source === 'Internet Movie Database') {
                return acc + parseFloat(Value.split('/')[0]) * 100;
              }
              if (Source === 'Rotten Tomatoes') {
                return acc + parseFloat(Value);
              }
              return acc + parseFloat(Value.split('/')[0]);
            }, 0);

            const avg = sum / ratings.length;
            const formattedRating = (avg * 5) / 1000;

            return {
              ...film,
              details: {
                ...film.details,
                avgRating: formattedRating,
              },
            };
          }),
        }),
      );
    }
  } catch (error: any) {
    yield put(GET_FILMS_ERROR({ error: error?.message }));
  }
}

export default function* watcher() {
  yield all([takeLeading(GET_FILMS, queryFilms)]);
}
