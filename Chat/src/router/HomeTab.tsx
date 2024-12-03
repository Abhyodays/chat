import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "./MainStack";
import Account from "../screens/main/Account";
import Chats from "../screens/main/Home";

type BottomTabsParamList = {
    Chats: undefined,
    Account: undefined
}
const HomeTabs = () => {
    const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();
    return (
        <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
            <BottomTabs.Screen name="Chats" component={Chats} />
            <BottomTabs.Screen name="Account" component={Account} />
        </BottomTabs.Navigator>
    )
}

export default HomeTabs;