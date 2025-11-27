import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from '../container/login';
import OTPScreen from '../container/otp';
import Register from '../container/register';
import RideOption from '../container/rideOption';
import TripCompleted from '../container/tripCompleted';
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from './drawerNavigation';
const AppNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="OTP" component={OTPScreen} />
                <Stack.Screen name="Register" component={Register} />                
                <Stack.Screen name="RideOption" component={RideOption} />
                <Stack.Screen name="TripCompleted" component={TripCompleted} />
                <Stack.Screen name="Main" component={MyDrawer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigation;
