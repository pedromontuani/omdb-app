import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import Card from '../../components/card';
import SearchHeader from '../../components/search-header';
import { useAppDispatch, useAppSelector } from '../../store';
import { GET_FILMS, SET_SORT } from '../../store/slices/films-slice';
import { IFilm } from '../../types';
import { RootStackParamList } from '../../router';
import FAB from '../../components/floating-action-button';
import FilterModal, { IFilterOption } from '../../components/filter-modal';
import { FILTER_OPTIONS } from '../../contants';
import NoData from '../../components/no-data';
import Loading from '../../components/loading';
import { useToast } from '../../context/toast-context';

const HomeScreen: React.FC<{}> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    films,
    sort,
    query: searchTerm,
    status,
    error,
  } = useAppSelector(state => state.films);

  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { showToast } = useToast();

  const renderItem = useCallback(
    ({ item: { Title, Poster, details } }: { item: IFilm }) => (
      <Card
        title={Title}
        imageUrl={Poster}
        genres={details.Genre}
        rating={details.avgRating}
        onPress={() => {
          navigate('Details', { filmDetails: details });
        }}
      />
    ),
    [navigate],
  );

  const queryFilms = (query: string) => {
    dispatch(GET_FILMS({ query }));
  };

  const onFilter = (option: IFilterOption, year: string) => {
    dispatch(SET_SORT({ sort: option.value }));
    dispatch(GET_FILMS({ query: searchTerm, year }));
  };

  const sortedFilms = useMemo(() => {
    return sort === 'ALPHABETICAL'
      ? [...films].sort((a, b) => {
          if (a.Title < b.Title) {
            return -1;
          }
          if (a.Title > b.Title) {
            return 1;
          }
          return 0;
        })
      : [...films].sort((a, b) => b.details.avgRating - a.details.avgRating);
  }, [films, sort]);

  useEffect(() => {
    if (status === 'error') {
      showToast({
        message: error || 'An error occurred. Please try again later',
        type: 'warning',
      });
    }
  }, [status, error, showToast]);

  return (
    <StyledSafeAreaView edges={['bottom']}>
      <StyledUpperSafeAreaView edges={['top']} />
      <SearchHeader onSubmit={queryFilms} />
      <StyledFlatList
        keyExtractor={item => item.imdbID}
        data={sortedFilms}
        renderItem={renderItem}
        ListEmptyComponent={status === 'pending' ? Loading : NoData}
      />
      <FAB icon="filter-list" onPress={() => setModalVisible(true)} />
      <FilterModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onConfirm={onFilter}
        filterOptions={FILTER_OPTIONS}
      />
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: #eee;
`;

const StyledUpperSafeAreaView = styled(SafeAreaView)`
  background-color: ${({ theme: { colors } }) => colors.primary};
  z-index: 1000;
`;

const StyledFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    padding: 20,
  },
}))`
  flex: 1;
` as unknown as typeof FlatList;

export default HomeScreen;
