import { createStackNavigator } from "@react-navigation/stack"
import Messages from "../screens/main/Messages";
import Account from "../screens/main/Account";
import HomeTabs from "./HomeTab";
import Home from "../screens/main/Home";
import { User } from "../types/User";

export type MainStackParamList = {
    Home: undefined,
    Account: undefined,
    Messages: { user: User }
}
const MainStack = () => {
    const Stack = createStackNavigator<MainStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Messages" component={Messages} />
        </Stack.Navigator>
    )
}

export default MainStack;