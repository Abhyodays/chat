import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text, View } from "react-native"
import { AuthStackParamList } from "../../router/AuthStack";

const Login = () => {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    return (
        <View>
            <Text>Login</Text>
            <Button title="Signup" onPress={() => navigation.push("Signup")} />
        </View>
    )
}

export default Login;