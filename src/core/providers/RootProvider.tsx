import { store } from '@src/store';
import React, { FC, PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UnistylesProvider } from 'react-native-unistyles';
import { Provider } from 'react-redux';

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <UnistylesProvider>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </UnistylesProvider>
    </Provider>
  );
};

export default RootProvider;
