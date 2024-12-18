import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { AuthStackParamList } from "../../router/AuthStack";
import { normalizeVertical } from "../../utils/responsiveSizing";
import { Colors } from "../styles/colors";
import StackHeader from "../../components/StackHeader";
import { Controller, useForm } from "react-hook-form";
import { StyledText } from "../../styledComponents/Text";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";
import CommonStyle from "../styles/common";
import { useAuth } from "../../context/authContext";
import { z } from "zod";
import { SignupSchema } from "../../zod/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../services/auth.service";
import { signup } from "../../context/actions/auth.action";

const Signup = () => {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const { state, dispatch } = useAuth();
    type SignupFormData = z.infer<typeof SignupSchema>;
    const {
        control,
        handleSubmit,
        formState: { errors }

    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            fullname: "",
            password: "",
            username: ""
        }
    })
    const goBack = () => {
        navigation.goBack();
    }
    const handleSignup = async (data: SignupFormData) => {
        try {
            const { email, fullname, password, username } = data;
            const res = await registerUser(email, password, username, fullname);
            signup(dispatch, res);
        } catch (error) {
            console.log("Error :: Signup : ", error)
        }
    }
    return (
        <View style={[CommonStyle.container, styles.container]}>
            <StackHeader label="Sign Up" onPressBack={goBack} />
            <View style={styles.input_container}>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => <InputField onChangeText={onChange} value={value} icon="person-outline" placeholder="Name" />}
                    name="fullname"
                />
                {errors.fullname && <StyledText style={styles.text_danger}>{errors.fullname.message}</StyledText>}
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => <InputField onChangeText={onChange} value={value} icon="at" placeholder="Username" />}
                    name="username"
                />
                {errors.username && <StyledText style={styles.text_danger}>{errors.username.message}</StyledText>}
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

                <GradientButton title="Sign Up" onPress={handleSubmit(handleSignup)} style={styles.button} />
                <TouchableOpacity onPress={goBack} activeOpacity={0.8}>
                    <StyledText style={styles.link_text}>Login</StyledText>
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
export default Signup;