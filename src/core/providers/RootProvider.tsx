import { store } from '@src/store';
import React, { FC, PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UnistylesProvider } from 'react-native-unistyles';
import { Provider } from 'react-redux';

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UnistylesProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </UnistylesProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootProvider;
