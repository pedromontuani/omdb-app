import React from 'react';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native';

interface IFABProps {
  icon: string;
  onPress(): void;
}

const FAB: React.FC<IFABProps> = ({ icon, onPress }) => {
  return (
    <StyledTouchableOpacity onPress={onPress}>
      <StyledIcon name={icon} />
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  bottom: ${Platform.OS === 'ios' ? 40 : 20}px;
  right: 20px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: ${({ theme: { colors } }) => colors.primary};
  align-items: center;
  justify-content: center;
  elevation: 6;
  ${Platform.OS === 'ios' &&
  css`
    box-shadow: 0 3px 4.65px rgba(0, 0, 0, 0.27);
  `}
  z-index: 100;
`;

export const StyledIcon = styled(Icon)`
  font-size: 28px;
  color: ${({ theme: { colors } }) => colors.white};
`;

export default React.memo(FAB);
