import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/auth/Signup";
import Welcome from "../screens/auth/Welcome";
import Login from "../screens/auth/Login";

export type AuthStackParamList = {
    Welcome: undefined,
    Login: undefined,
    Signup: undefined
}
const AuthStack = () => {
    const Stack = createStackNavigator<AuthStackParamList>();
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}

export default AuthStack;