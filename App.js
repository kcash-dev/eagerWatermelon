import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Screens
import HomeScreen from './src/screens/HomeScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

//Theme
import { colors } from './theme/Variables'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={ HomeScreen }
            options={{
              headerStyle: {
                backgroundColor: colors.primary
              }
            }}
          />
          <Stack.Screen 
            name="Stats" 
            component={ StatsScreen }
            options={{
              headerStyle: {
                backgroundColor: colors.primary
              }
            }}
          />
          <Stack.Screen 
            name="Settings" 
            component={ SettingsScreen }
            options={{
              headerStyle: {
                backgroundColor: colors.primary
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
