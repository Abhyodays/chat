import { createStackNavigator } from "@react-navigation/stack"
import Messages from "../screens/main/Messages";
import Account from "../screens/main/Account";
import HomeTabs from "./HomeTab";

export type MainStackParamList = {
    Home: undefined,
    Account: undefined,
    Messages: undefined
}
const MainStack = () => {
    const Stack = createStackNavigator<MainStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen name="Messages" component={Messages} />
        </Stack.Navigator>
    )
}

export default MainStack;