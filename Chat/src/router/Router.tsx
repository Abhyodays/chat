import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { StatusBar, useColorScheme } from "react-native";

const Router = () => {
    const isAuthenticated = false;
    return (
        <NavigationContainer>
            <StatusBar barStyle={"light-content"} backgroundColor={"#000"} />
            {
                isAuthenticated
                    ? <MainStack />
                    : <AuthStack />
            }
        </NavigationContainer>
    )
}

export default Router;