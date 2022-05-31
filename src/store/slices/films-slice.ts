import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilm } from '../../types';

export interface IFilmsState {
  films: Array<any>;
  sort: 'ALPHABETICAL' | 'RATING';
  year?: string;
  query: string;
  status: 'success' | 'pending' | 'error' | null;
  error: string | null;
}

export const initialState: IFilmsState = {
  films: [],
  sort: 'ALPHABETICAL',
  query: '',
  year: undefined,
  status: null,
  error: null,
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    GET_FILMS: (state, _: PayloadAction<IGetFilmsAction>) => ({
      ...state,
      films: [],
      status: 'pending',
    }),
    GET_FILMS_SUCCESS: (
      state,
      { payload }: PayloadAction<IGetFilmesSuccessAction>,
    ) => ({
      ...state,
      ...payload,
      status: 'success',
    }),
    GET_FILMS_ERROR: (state, { payload }: PayloadAction<IErrorAction>) => ({
      ...state,
      ...payload,
      status: 'error',
    }),
    SET_SORT: (state, { payload }: PayloadAction<ISetSortAction>) => ({
      ...state,
      sort: payload.sort,
    }),
  },
});

interface IErrorAction {
  error: string;
}

interface IGetFilmsAction {
  query: string;
  year?: string;
}

interface IGetFilmesSuccessAction {
  films: IFilm[];
  query: string;
}

interface ISetSortAction {
  sort: 'ALPHABETICAL' | 'RATING';
}

const { actions, reducer } = filmsSlice;

export { reducer };

export const { GET_FILMS, GET_FILMS_ERROR, GET_FILMS_SUCCESS, SET_SORT } =
  actions;
