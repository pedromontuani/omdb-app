import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import noData from '../../assets/no-data/no-data.png';

const NoData: React.FC<{}> = () => {
  return (
    <StyledContainer>
      <Image source={noData} />
      <StyledText>Please use the search bar</StyledText>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 80px;
`;

const StyledText = styled.Text`
  margin-top: 60px;
  font-size: 16px;
  color: ${({ theme: { colors } }) => colors.darkGray};
`;

export default React.memo(NoData);
