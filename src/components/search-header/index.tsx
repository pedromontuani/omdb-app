import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../../store';

interface ISearchHeaderProps {
  onSubmit: (value: string) => void;
}

const SearchHeader: React.FC<ISearchHeaderProps> = ({ onSubmit }) => {
  const [value, setValue] = useState<string>('');

  const { query } = useAppSelector(state => state.films);

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <StyledContainer>
      <StyledTextInput
        placeholder={'Search for films by name...'}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => onSubmit(value)}
      />
      <StyledTouchableOpactity onPress={() => onSubmit(value)}>
        <StyledIcon name="search" />
      </StyledTouchableOpactity>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  height: 60px;
  padding: 0 20px;
  background-color: ${({ theme: { colors } }) => colors.lightGray};
  z-index: 100;
  elevation: 5;
  ${Platform.OS === 'ios' &&
  css`
    box-shadow: 2px 1px 3.8px rgba(0, 0, 0, 0.25);
  `}
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
`;

const StyledTouchableOpactity = styled.TouchableOpacity`
  align-self: center;
  padding: 0 20px;
  margin-right: -20px;
`;

const StyledIcon = styled(Icon)`
  font-size: 24px;
  color: #bbb;
`;

export default React.memo(SearchHeader);
