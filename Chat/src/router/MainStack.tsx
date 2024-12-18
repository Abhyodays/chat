import { createStackNavigator } from "@react-navigation/stack"
import Messages from "../screens/main/Messages";
import Account from "../screens/main/Account";
import HomeTabs from "./HomeTab";
import Home from "../screens/main/Home";
import { User } from "../types/User";
import Search from "../screens/main/Search";

export type MainStackParamList = {
    Home: undefined,
    Account: undefined,
    Messages: { user: User },
    Search: undefined
}
const MainStack = () => {
    const Stack = createStackNavigator<MainStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: "none" }}>
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    )
}

export default MainStack;