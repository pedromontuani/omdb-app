import React from 'react';
import HomeScreen from '../../src/screens/home';

import { customRender, rendererCreate } from '../utils';
import { initialState } from '../../src/store/slices/films-slice';
import * as filmsSlice from '../../src/store/slices/films-slice';
import * as store from '../../src/store';
import { MOCK_FILMS_LIST } from '../../__mocks__/films';
import { fireEvent } from '@testing-library/react-native';

jest.useFakeTimers();

describe('testing home screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  }),
    it('should match snapshot', async () => {
      const tree = rendererCreate(<HomeScreen />);
      expect(tree).toMatchSnapshot();
    });

  it('should render no-data component', async () => {
    const { getByTestId } = customRender(<HomeScreen />);

    const noDataComponent = await getByTestId('no-data');

    expect(noDataComponent).toBeTruthy();
  });

  it('should render the films cards', async () => {
    const useSelector = jest.spyOn(store, 'useAppSelector');
    useSelector.mockImplementationOnce(selectorFn =>
      selectorFn({ films: { ...initialState, films: MOCK_FILMS_LIST } }),
    );

    const { getAllByTestId } = customRender(<HomeScreen />);

    const cards = await getAllByTestId('film-card');

    expect(cards).toHaveLength(MOCK_FILMS_LIST.length);
  });

  it('should call search action', async () => {
    const MOCK_QUERY = 'Avengers';
    const GET_FILMS = jest.spyOn(filmsSlice, 'GET_FILMS');
    const useSelector = jest.spyOn(store, 'useAppSelector');
    useSelector.mockImplementationOnce(selectorFn =>
      selectorFn({ films: { ...initialState, films: MOCK_FILMS_LIST } }),
    );

    const { getByTestId } = customRender(<HomeScreen />);

    const searchInput = await getByTestId('search-input');
    const searchButton = await getByTestId('search-button');

    await fireEvent.changeText(searchInput, MOCK_QUERY);
    await fireEvent.press(searchButton);

    expect(GET_FILMS).toHaveBeenCalledWith({ query: MOCK_QUERY });
  });
});
