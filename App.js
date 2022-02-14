import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Navs
import UserNav from './src/navs/UserNav';
import HomeNav from './src/navs/HomeNav';


//Theme
import { colors } from './theme/Variables'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserNav">
          <Stack.Screen name="UserNav" component={ UserNav } options={{ headerShown: false }}/>
          <Stack.Screen name="HomeNav" component={ HomeNav } options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
