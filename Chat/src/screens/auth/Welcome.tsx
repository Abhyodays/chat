import { NavigationContainer, useNavigation, useTheme } from "@react-navigation/native";
import { Button, Image, StyleSheet, Text, View } from "react-native"
import { AuthStackParamList } from "../../router/AuthStack";
import { StackNavigationProp } from "@react-navigation/stack";
import CommonStyle from '../styles/common'
import { normalize, normalizeVertical } from "../../utils/responsiveSizing";
import { StyledText } from "../../styledComponents/Text";
import GradientButton from "../../components/GradientButton";
import { Colors } from "../styles/colors";
import { useEffect } from "react";
import { client } from "../../axios/axiosClient";


const Welcome = () => {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const theme = useTheme();

    const handleStarted = () => {
        navigation.navigate('Login')
    }
    return (
        <View style={CommonStyle.container}>
            <View style={styles.poster}>
                <Image source={require("../../assets/images/Illustration.png")} resizeMode="contain" style={styles.poster_image} />
            </View>
            <View style={styles.text_container}>
                <StyledText style={styles.poster_title}>
                    Break the boundaries and connect with the people all over the world
                </StyledText>
            </View>
            <View style={styles.button_container}>
                <GradientButton title="Get Started" onPress={handleStarted} />
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    dark_bg: {
        backgroundColor: Colors.dark.background
    },
    poster_image: {
        height: normalizeVertical(271),
        width: normalize(260)
    },
    poster: {
        width: '100%',
        alignItems: 'center',
        marginTop: normalizeVertical(100)
    },
    poster_title: {
        width: '65%',
        fontSize: normalizeVertical(30),
        fontWeight: 'bold',
        alignItems: 'center',
        lineHeight: normalizeVertical(40),
        color: "#fff"
    },
    text_container: {
        alignItems: 'center',
        marginTop: normalizeVertical(60)
    },
    button_container: {
        alignItems: 'center',
        marginTop: normalizeVertical(50)
    }
})


export default Welcome;