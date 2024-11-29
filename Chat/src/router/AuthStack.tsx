import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/auth/Signup";
import Welcome from "../screens/auth/Welcome";
import Login from "../screens/auth/Login";
import Search from "../screens/auth/Search";
import { User } from "../types/User";
import Chat from "../screens/auth/Chat";

export type AuthStackParamList = {
    Welcome: undefined,
    Login: undefined,
    Signup: undefined,
    Search: undefined,
    Chat: { user: User }
}
const AuthStack = () => {
    const Stack = createStackNavigator<AuthStackParamList>();
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    )
}

export default AuthStack;