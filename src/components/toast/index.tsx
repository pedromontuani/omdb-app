// @ts-ignore
import React, { useRef, useEffect, useMemo, memo, useCallback } from 'react';
import { Platform, Dimensions, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { useTheme } from 'styled-components/native';
import { useToast } from '../../context/toast-context';

type IconObj = {
  [key: string]: string;
};

const { width } = Dimensions.get('window');

const zIndex = Platform.select({
  ios: { zIndex: 100 },
  android: { elevation: 100 },
});

let timer: any;

interface IToastProps {
  testID?: string;
}

const Toast: React.FC<IToastProps> = ({ testID }) => {
  const pos = useRef(new Animated.Value(-120)).current;
  const { message, hideToast } = useToast();
  const { colors } = useTheme();

  const hide = useCallback(() => {
    clearTimeout(timer);
    Animated.timing(pos, {
      toValue: -120,
      useNativeDriver: true,
      duration: 250,
      easing: Easing.linear,
    }).start(() => {
      hideToast();
    });
  }, [hideToast, pos]);

  const show = useCallback(() => {
    clearTimeout(timer);
    Animated.timing(pos, {
      toValue: 0,
      useNativeDriver: true,
      duration: 450,
      easing: Easing.bounce,
    }).start();
    timer = setTimeout(() => hide(), message.duration);
  }, [hide, message.duration, pos]);

  useEffect(() => {
    message.show && show();
  }, [message, show]);

  const icon = useMemo<string>(() => {
    const icons: IconObj = {
      success: 'check',
      warning: 'close',
    };
    if (message.type) {
      return icons[message.type];
    }
    return 'close';
  }, [message]);

  const backgroundColor = useMemo<string>(() => {
    const mappedColors = {
      warning: colors.error,
      success: colors.success,
    };
    if (message.type) {
      return mappedColors[message.type as keyof typeof mappedColors];
    }
    return colors.error;
  }, [message, colors]);

  const content = useMemo(() => {
    if (message.showCloseButton) {
      return (
        <>
          <StyledHeader testID={testID}>
            <StyledTitle>{message.title}</StyledTitle>
            <StyledPressable onPress={hide}>
              <StyledIcon name={icon} />
            </StyledPressable>
          </StyledHeader>
          <StyledContent>{message.message}</StyledContent>
        </>
      );
    }
    return (
      <StyledContainer testID={testID}>
        <StyledIcon name={icon} />
        <StyledText>{message.message}</StyledText>
      </StyledContainer>
    );
  }, [
    hide,
    icon,
    message.message,
    message.showCloseButton,
    message.title,
    testID,
  ]);

  return (
    <StyledWrapper
      style={{ transform: [{ translateY: pos }], backgroundColor, ...zIndex }}>
      {content}
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Animated.View)`
  border-radius: 8px;
  position: absolute;
  width: ${width - 32}px;
  margin-top: 40px;
  margin-left: 16px;
  margin-right: 16px;
`;

const StyledContainer = styled.View`
  margin: 16px;
  flex-direction: row;
  align-items: center;
`;

const StyledHeader = styled.View`
  margin-top: 16px;
  margin-left: 24px;
  margin-right: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledText = styled.Text`
  color: ${({ theme: { colors } }) => colors.white};
  margin-left: 16px;
  margin-right: 16px;
`;

const StyledContent = styled.Text`
  margin: 16px 48px 16px 24px;
`;

const StyledTitle = styled.Text`
  font-size: 12px;
  margin-top: 8px;
`;

const StyledIcon = styled(Icon).attrs(({ theme: { colors } }) => ({
  color: colors.white,
  size: 22,
}))``;

const StyledPressable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  height: 24px;
  width: 24px;
`;

export default memo(Toast);
