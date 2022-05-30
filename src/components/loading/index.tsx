import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

const Loading: React.FC<{}> = () => {
  const { colors } = useTheme();
  return (
    <StyledContainer>
      <ActivityIndicator size="large" color={colors.primary} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 80px;
`;

export default React.memo(Loading);
