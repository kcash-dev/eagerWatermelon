import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Screens
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HabitDetailsScreen from '../screens/HabitDetailsScreen';

//Theme
import { colors } from '../../theme/Variables'
import HeaderRight from '../components/HeaderRight';

const Stack = createNativeStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={ HomeScreen }
          options={{
              headerStyle: {
              backgroundColor: colors.primary
              },
              headerRight: () => (
                <HeaderRight/>
              ),
              headerTitleStyle: {
                color: colors.white
              }
          }}
        />
        <Stack.Screen 
          name="Stats" 
          component={ StatsScreen }
          options={{
              headerStyle: {
                backgroundColor: colors.primary
              },
              headerTitleStyle: {
                color: colors.white
              }
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={ SettingsScreen }
          options={{
              headerStyle: {
                backgroundColor: colors.primary
              },
              headerTitleStyle: {
                color: colors.white
              }
          }}
        />
        <Stack.Screen 
          name="Habit Details" 
          component={ HabitDetailsScreen }
          options={{
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTitleStyle: {
                color: colors.white
              }
          }}
        />
    </Stack.Navigator>
  );
}
