import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  bottom: 20px;
  right: 20px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: ${({ theme: { colors } }) => colors.primary};
  align-items: center;
  justify-content: center;
  elevation: 6;
  z-index: 100;
`;

export const StyledIcon = styled(Icon)`
  font-size: 28px;
  color: ${({ theme: { colors } }) => colors.white};
`;

export default React.memo(FAB);
