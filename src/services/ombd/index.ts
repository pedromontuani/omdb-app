import axios from 'axios';
import { OMDB_API_KEY } from '../../contants';
import { IFilmsQueryResponse } from '../../types';

const api = axios.create({
  baseURL: 'http://www.omdbapi.com/',
  params: {
    apikey: OMDB_API_KEY,
  },
});

export const getFilmsByQuery = (title: string, year: string | undefined) =>
  api.get<IFilmsQueryResponse>('', { params: { s: title, y: year } });

export const getFilmById = (id: string) => api.get('', { params: { i: id } });
