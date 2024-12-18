import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AuthStackParamList } from "../../router/AuthStack";
import CommonStyles from '../styles/common'
import StackHeader from "../../components/StackHeader";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";
import { normalizeVertical } from "../../utils/responsiveSizing";
import { StyledText } from "../../styledComponents/Text";
import { Colors } from "../styles/colors";
import { Controller, useForm } from 'react-hook-form'
import { z } from "zod";
import { loginSchema } from "../../zod/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/authContext";
import { login } from '../../context/actions/auth.action'

const Login = () => {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const { state, dispatch } = useAuth();
    const goBack = () => {
        navigation.goBack();
    }
    const handleCreateAccount = () => {
        navigation.navigate('Signup')
    }

    type LoginFormData = z.infer<typeof loginSchema>;
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const handleLogin = async (data: LoginFormData) => {
        try {
            const res = await loginUser(data.email, data.password);
            login(dispatch, res);
        } catch (error) {
            console.log("Error in login:", error)
        }
    }
    return (
        <View style={[CommonStyles.container, styles.container]}>
            <StackHeader label="Login" onPressBack={goBack} />
            <View style={styles.input_container}>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => <InputField onChangeText={onChange} value={value} icon="mail-outline" placeholder="Email" />}
                    name="email"
                />
                {errors.email && <StyledText style={styles.text_danger}>{errors.email.message}</StyledText>}
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) =>
                        <InputField value={value} onChangeText={onChange} icon="lock-closed-outline" placeholder="Password" secureTextEntry={true} />}
                />
                {errors.password && <StyledText style={styles.text_danger}>{errors.password.message}</StyledText>}

                <GradientButton title="Login Now" onPress={handleSubmit(handleLogin)} style={styles.button} />
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
    },
    text_danger: {
        color: 'red',
        fontSize: normalizeVertical(16)
    }
})



export default Login;