import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { StatusBar, useColorScheme } from "react-native";
import { useAuth } from "../context/authContext";

const Router = () => {
    const { state } = useAuth()
    console.log(state.isLoggedIn)
    return (
        <NavigationContainer>
            <StatusBar barStyle={"light-content"} backgroundColor={"#000"} />
            {
                state.isLoggedIn
                    ? <MainStack />
                    : <AuthStack />
            }
        </NavigationContainer>
    )
}

export default Router;