import '@testing-library/jest-native/extend-expect';

//@ts-ignore
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true,
    ...originalModule,
    useFocusEffect: jest.fn(),
    useNavigation: jest.fn(() => ({
      dangerouslyGetParent: jest.fn(),
      navigate: jest.fn(),
    })),
    useIsFocused: jest.fn(),
    useRoute: () => ({
      params: {},
      name: '',
    }),
  };
});
