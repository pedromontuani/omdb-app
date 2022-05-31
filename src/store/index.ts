import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { all } from 'redux-saga/effects';

import { reducer as filmsReducer } from './slices/films-slice';

import filmsSaga from './sagas/films-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

function* rootSaga() {
  yield all([filmsSaga()]);
}

export const store = configureStore({
  reducer: {
    films: filmsReducer,
  },
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
