import React from 'react';
import styled, { css, useTheme } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Platform, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../router';
import Rating from '../../components/rating';
import { IFilmDetails } from '../../types';

const DetailsScreen: React.FC<{}> = () => {
  const { measures } = useTheme();
  const {
    params: { filmDetails },
  } = useRoute<RouteProp<RootStackParamList, 'Details'>>();

  const { Poster, Title, Plot, Year, Country, Runtime, Genre, avgRating } =
    filmDetails;
  const { goBack } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <StyledSafeAreaView edges={['top']}>
      <StyledLinearGradient>
        <TouchableOpacity hitSlop={measures.hitSlop} onPress={goBack}>
          <StyledBackIcon name="arrow-back" />
        </TouchableOpacity>
      </StyledLinearGradient>
      <StyledScrollView>
        <StyledImage source={{ uri: Poster }} resizeMode="cover" />
        <StyledContentContainer>
          <StyledRow>
            <StyledTextContainer>
              <StyledTitle>{Title}</StyledTitle>
              <StyledGenres>{Genre}</StyledGenres>
            </StyledTextContainer>
            <Rating rating={avgRating} />
          </StyledRow>
          <StyledPlot>{Plot}</StyledPlot>
          {['Director', 'Actors', 'Writer', 'Awards'].map(key => (
            <InfoGroup
              key={key}
              title={key}
              value={filmDetails[key as keyof IFilmDetails] as string}
            />
          ))}
        </StyledContentContainer>
      </StyledScrollView>
      <StyledSafeAreaFooter>
        <StyledFooter>
          <FooterItem icon="event" value={Year} />
          <FooterItem icon="public" value={Country} />
          <FooterItem icon="timer" value={Runtime} />
        </StyledFooter>
      </StyledSafeAreaFooter>
    </StyledSafeAreaView>
  );
};

interface IInfoGroup {
  title: string;
  value: string;
}

interface IFooterItemProps {
  icon: string;
  value: string;
}

const InfoGroup: React.FC<IInfoGroup> = React.memo(({ title, value }) => {
  return (
    <StyledInfoGroupContainer>
      <StyledInfoGroupTitle>{title}</StyledInfoGroupTitle>
      <StyledInfoGroupValue>{value}</StyledInfoGroupValue>
    </StyledInfoGroupContainer>
  );
});

const FooterItem: React.FC<IFooterItemProps> = React.memo(({ icon, value }) => {
  return (
    <StyledFooterItemContainer>
      <StyledFooterIcon name={icon} />
      <StyledFooterItemLabel numberOfLines={1}>{value}</StyledFooterItemLabel>
    </StyledFooterItemContainer>
  );
});

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  /* background-color: ${({ theme: { colors } }) => colors.primary}; */
`;

const StyledLinearGradient = styled(LinearGradient).attrs(() => ({
  colors: ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)'],
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  padding: 10px;
  elevation: 3;
  z-index: 100;
  ${Platform.OS === 'ios' &&
  css`
    box-shadow: 1px 0 2.22px rgba(0, 0, 0, 0.23);
  `}
` as unknown as typeof View;

const StyledBackIcon = styled(Icon)`
  font-size: 26px;
  color: ${({ theme: { colors } }) => colors.white};
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.white};
`;

const StyledImage = styled.Image`
  height: 240px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const StyledContentContainer = styled.View`
  padding: 20px;
`;

const StyledRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledTextContainer = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const StyledTitle = styled.Text`
  font-size: 22px;
  margin-bottom: 4px;
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.primary};
`;

const StyledGenres = styled.Text`
  font-size: 12px;
  text-transform: capitalize;
`;

const StyledPlot = styled.Text`
  font-size: 15px;
  margin: 20px 0;
`;

const StyledInfoGroupContainer = styled.View`
  margin-bottom: 10px;
`;

const StyledInfoGroupTitle = styled.Text`
  font-size: 12px;
  color: ${({ theme: { colors } }) => colors.primary};
`;

const StyledInfoGroupValue = styled.Text`
  font-size: 15px;
`;

const StyledSafeAreaFooter = styled(SafeAreaView)`
  background-color: ${({ theme: { colors } }) => colors.lightGray};
  elevation: 2;
  ${Platform.OS === 'ios' &&
  css`
    box-shadow: 1px 0 1.41px rgba(0, 0, 0, 0.2);
  `}
`;

const StyledFooter = styled.View`
  height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const StyledFooterItemContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledFooterIcon = styled(Icon)`
  font-size: 26px;
  margin-bottom: 4px;
  color: ${({ theme: { colors } }) => colors.primary};
`;

const StyledFooterItemLabel = styled.Text`
  width: 100%;
  text-align: center;
`;

export default DetailsScreen;
