import React from 'react';
import * as ReactNavigation from '@react-navigation/native';

import { rendererCreate } from '../utils';
import { MOCK_FILM } from '../../__mocks__/films';
import DetailsScreen from '../../src/screens/details';

jest.useFakeTimers();

describe('testing details screen', () => {
  beforeEach(() => {
    const useRoute = jest.spyOn(ReactNavigation, 'useRoute');
    useRoute.mockImplementation(() => ({
      params: {
        filmDetails: MOCK_FILM.details,
      },
      key: 'mock_key',
      name: 'details_screen',
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', async () => {
    const tree = rendererCreate(<DetailsScreen />);
    expect(tree).toMatchSnapshot();
  });
});
