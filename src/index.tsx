import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';

import Router from './router';
import theme from './styles';
import { store } from './store';

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StyledStatusBar barStyle="light-content" />
          <Router />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

const StyledStatusBar = styled.StatusBar.attrs(({ theme: { colors } }) => ({
  backgroundColor: colors.primaryDark,
}))``;

export default App;
