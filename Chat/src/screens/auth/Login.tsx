import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AuthStackParamList } from "../../router/AuthStack";
import CommonStyles from '../styles/common'
import StackHeader from "../../components/StackHeader";
import InputField from "../../components/InputField";
import { useState } from "react";
import GradientButton from "../../components/GradientButton";
import { normalizeVertical } from "../../utils/responsiveSizing";
import { StyledText } from "../../styledComponents/Text";
import { Colors } from "../styles/colors";

const Login = () => {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const goBack = () => {
        navigation.goBack();
    }
    const handleCreateAccount = () => {
        navigation.navigate('Signup')
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        console.log("email:", email);
        console.log("Password:", password)
    }
    return (
        <View style={[CommonStyles.container, styles.container]}>
            <StackHeader label="Login" onPressBack={goBack} />
            <View style={styles.input_container}>
                <InputField setValue={setEmail} value={email} icon="mail-outline" placeholder="Email" />
                <InputField value={password} setValue={setPassword} icon="lock-closed-outline" placeholder="Password" />
                <GradientButton title="Login Now" onPress={handleLogin} style={styles.button} />
                <TouchableOpacity onPress={handleCreateAccount} activeOpacity={0.8}>
                    <StyledText style={styles.link_text}>Create Account</StyledText>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingBottom: normalizeVertical(30)
    },
    input_container: {
        alignItems: 'center',
        gap: 10
    },
    button: {
        marginTop: normalizeVertical(40)
    },
    link_text: {
        color: Colors.dark.teal,
        fontSize: normalizeVertical(16),
        textDecorationLine: "underline"
    }
})



export default Login;