import React from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import Rating from '../rating';

interface ICardProps {
  title: string;
  imageUrl: string;
  genres: string;
  rating: number;
  onPress(): void;
}

const Card: React.FC<ICardProps> = ({
  title,
  imageUrl,
  rating,
  genres,
  onPress,
}) => {
  return (
    <StyledTouchableOpacity onPress={onPress}>
      <StyledImage source={{ uri: imageUrl }} resizeMode="cover" />
      <StyledContentOuter>
        <StyledContentInner>
          <StyledTitle numberOfLines={1}>{title}</StyledTitle>
          <StyledGenres numberOfLines={1}>{genres}</StyledGenres>
        </StyledContentInner>
        <Rating rating={rating} />
      </StyledContentOuter>
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  height: 280px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: ${({ theme: { colors } }) => colors.white};
  elevation: 2;
  ${Platform.OS === 'ios' &&
  css`
    box-shadow: 1px 0 1.41px rgba(0, 0, 0, 0.2);
  `}
`;

const StyledImage = styled.Image`
  flex: 0.7;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StyledContentOuter = styled.View`
  flex: 0.3;
  flex-direction: row;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 20px;
`;

const StyledContentInner = styled.View`
  flex: 1;
  justify-content: center;
  padding-right: 15px;
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme: { colors } }) => colors.primary};
`;

const StyledGenres = styled.Text`
  font-size: 13px;
  margin-bottom: 5px;
`;

export default React.memo(Card);
