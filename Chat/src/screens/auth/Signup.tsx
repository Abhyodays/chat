import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text, View } from "react-native"
import { AuthStackParamList } from "../../router/AuthStack";

const Signup = () => {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    return (
        <View>
            <Text>Signup</Text>
            <Button title="Login" onPress={() => navigation.goBack()} />
        </View>
    )
}

export default Signup;