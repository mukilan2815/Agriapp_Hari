import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { AdvisoryScreen } from '../screens/AdvisoryScreen';
import { PestDetectionScreen } from '../screens/PestDetectionScreen';
import { MarketScreen } from '../screens/MarketScreen';
import { VoiceBotScreen } from '../screens/VoiceBotScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { FeedbackScreen } from '../screens/FeedbackScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Advisory" component={AdvisoryScreen} options={{ title: 'Expert Advisory' }} />
        <Stack.Screen name="PestDetection" component={PestDetectionScreen} options={{ title: 'Pest Check' }} />
        <Stack.Screen name="Market" component={MarketScreen} options={{ title: 'Mandi Prices' }} />
        <Stack.Screen name="VoiceBot" component={VoiceBotScreen} options={{ title: 'Voice Assistant' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Send Feedback' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
