import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//Screens
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

export default function UserNav() {
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen name="LoginScreen" component={ LoginScreen } options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={ RegisterScreen } options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}