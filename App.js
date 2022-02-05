import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import HomeScreen from './src/screens/HomeScreen';

//Theme
import { colors } from './theme/Variables'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Home" 
            component={ HomeScreen }
            options={{
              headerStyle: {
                backgroundColor: colors.primary
              }
            }}
          />
          {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
