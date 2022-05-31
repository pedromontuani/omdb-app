import React, { useEffect, useState } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
  TouchableOpacity,
  ModalProps,
} from 'react-native';
import styled, { css, useTheme } from 'styled-components/native';
import { RadioButtonInput } from 'react-native-simple-radio-button';
import { useAppSelector } from '../../store';

export interface IFilterOption {
  label: string;
  value: 'ALPHABETICAL' | 'RATING';
}

interface IFilterModalProps extends ModalProps {
  filterOptions: IFilterOption[];
  onConfirm(
    option: IFilterOption | undefined | null,
    year: string | undefined,
  ): void;
}

const FilterModal: React.FC<IFilterModalProps> = ({
  visible,
  onRequestClose,
  filterOptions,
  onConfirm,
}) => {
  const [selected, setSelected] = useState<IFilterOption>();
  const [yearInput, setYearInput] = useState<string | undefined>();

  const { year, sort } = useAppSelector(state => state.films);

  const renderItem = ({ item }: { item: IFilterOption }) => (
    <SortOption
      item={item}
      isSelected={selected === item}
      onPress={() => setSelected(item)}
    />
  );

  useEffect(() => {
    setYearInput(year);
    setSelected(filterOptions.find(opt => opt.value === sort));
  }, [year, sort, filterOptions]);

  return (
    <Modal
      animationType="fade"
      hardwareAccelerated
      transparent
      visible={visible}
      onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <StyledOuterContainer>
          <TouchableWithoutFeedback>
            <StyledContentContainer>
              <StyledTitle>Sort by</StyledTitle>
              <StyledFlatList
                data={filterOptions}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
              />
              <InputContainer>
                <StyledInput
                  keyboardType="numeric"
                  placeholder="Year"
                  value={yearInput}
                  onChangeText={setYearInput}
                />
              </InputContainer>
              <StyledButtonsContainer>
                <Button label="CANCEL" onPress={onRequestClose} />
                <Button
                  label="OK"
                  onPress={() => {
                    onConfirm(selected, yearInput);
                    onRequestClose?.();
                  }}
                />
              </StyledButtonsContainer>
            </StyledContentContainer>
          </TouchableWithoutFeedback>
        </StyledOuterContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

interface ISortOptionProps {
  isSelected: boolean;
  item: any;
  onPress(): void;
}

interface IButtonProps {
  onPress?(): void;
  label: string;
}

const SortOption: React.FC<ISortOptionProps> = ({
  isSelected,
  item,
  onPress,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledOptionContainer>
        <StyledOptionLabel>{item.label}</StyledOptionLabel>
        <StyledRadioButtonInput
          obj={{}}
          isSelected={isSelected}
          borderWidth={1.5}
          buttonInnerColor={colors.primary}
          buttonOuterColor={isSelected ? colors.primary : colors.darkGray}
          buttonSize={12}
          buttonOuterSize={20}
          onPress={onPress}
        />
      </StyledOptionContainer>
    </TouchableOpacity>
  );
};

const Button: React.FC<IButtonProps> = ({ onPress, label }) => {
  return (
    <StyledButtonTouchable onPress={onPress}>
      <StyledButtonLabel>{label}</StyledButtonLabel>
    </StyledButtonTouchable>
  );
};

const StyledOuterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const StyledContentContainer = styled.View`
  width: 300px;
  height: 330px;
  margin: 20px;
  background-color: ${({ theme: { colors } }) => colors.white};
  border-radius: 20px;
  padding: 25px;
  align-items: stretch;
  elevation: 5;
  ${Platform.OS === 'ios' &&
  css`
    box-shadow: o 2px 4px rgba(0, 0, 0, 0.25);
  `}
`;

const StyledTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const StyledFlatList = styled.FlatList`
  flex: 1;
` as unknown as typeof FlatList;

const StyledOptionContainer = styled.View`
  flex: 1;
  flex-direction: row;
  height: 45px;
  align-self: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 15px;
`;

const StyledRadioButtonInput = styled(RadioButtonInput)`` as unknown as any;

const StyledOptionLabel = styled.Text`
  flex: 1;
`;

const InputContainer = styled.View`
  flex: 1;
`;

const StyledInput = styled.TextInput`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme: { colors } }) => colors.gray};
`;

const StyledButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5px;
`;

const StyledButtonTouchable = styled.TouchableOpacity`
  padding: 5px 10px;
`;

const StyledButtonLabel = styled.Text`
  color: ${({ theme: { colors } }) => colors.primary};
`;

export default React.memo(FilterModal);
