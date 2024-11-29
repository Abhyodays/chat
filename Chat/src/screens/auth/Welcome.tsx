import { NavigationContainer, useNavigation, useTheme } from "@react-navigation/native";
import { Button, Image, StyleSheet, Text, View } from "react-native"
import { AuthStackParamList } from "../../router/AuthStack";
import { StackNavigationProp } from "@react-navigation/stack";
import CommonStyle from '../styles/common'
import { normalize, normalizeVertical } from "../../utilities/responsiveSizing";
import { StyledText } from "../../styledComponents/Text";
import GradientButton from "../../components/GradientButton";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";


const Welcome = () => {

    const [conn, setConn] = useState<any>(null);

    useEffect(() => {
        try {
            const socket = io('http://10.175.0.244:3000/', {

            });

            socket.connect();

            socket.emit('init room', "{ roomId: 'test' }")
            setConn(socket);
        } catch (e) {
            console.log(e)
        }
    }, []);


    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const theme = useTheme();

    const handleStarted = () => {
        console.log("clicked");
        navigation.navigate('Search')
    }
    return (
        <View style={[CommonStyle.container, styles.dark_bg]}>
            <View style={styles.poster}>
                <Image source={require("../../assets/images/Illustration.png")} resizeMode="contain" style={styles.poster_image} />
            </View>
            <View style={styles.text_container}>
                <StyledText style={styles.poster_title}>
                    Break the boundaries and connect with the people all over the world
                </StyledText>
            </View>
            <GradientButton title="Get Started" onPress={handleStarted} />
            <Button title="Search" onPress={handleStarted} />
        </View>

    )
}
const styles = StyleSheet.create({
    dark_bg: {
        backgroundColor: "#000"
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
    }
})


export default Welcome;