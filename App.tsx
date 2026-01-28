import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { colors } from './src/theme/colors';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <AppNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
