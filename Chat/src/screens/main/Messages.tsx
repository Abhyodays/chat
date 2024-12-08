import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MainStackParamList } from "../../router/MainStack";
import { useAuth } from "../../context/authContext";
import { ScrollView } from "react-native";
import CommonStyle from "../styles/common";
import StackHeader from "../../components/StackHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Colors } from "../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { normalizeVertical } from "../../utils/responsiveSizing";
import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import { addMessage, connectToDatabase, getAllMessages } from "../../db/db";
import { StyledText } from "../../styledComponents/Text";

const Messages = () => {
    const route = useRoute<RouteProp<MainStackParamList, "Messages">>()
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const [text, setText] = useState("")
    const receiver = route.params.user
    const { state: auth } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSend = () => {
        if (text.trim().length === 0) return;
        const data = {
            to: receiver.email,
            from: auth.user?.email,
            message: text
        }
        socket.emit("send message", data);
    }
    const handleChange = (text: string) => {
        setText(text);
    }

    useEffect(() => {
        socket.on("message received", async (data) => {
            const { sender, receiver, message } = data;
            console.log("sender:", sender)
            console.log("receiver:", receiver)
            console.log("message:", message)
            const db = await connectToDatabase();
            await addMessage(db, { sender, receiver, message, created_at: new Date().toISOString() })
        })
        socket.on("error", (data) => {
            console.log("socket error:", data.message)
        })
    }, [socket])


    useEffect(() => {
        const loadData = async () => {
            const db = await connectToDatabase();
            const res = await getAllMessages(db);
            console.log("res:", res);
            setMessages(res);
        }
        loadData();
    }, [])

    const goBack = () => navigation.goBack()
    return (
        <View style={[CommonStyle.container]}>
            <StackHeader label={receiver.fullName} onPressBack={goBack} />
            <FlatList
                style={{ flex: 1 }}
                data={messages}
                renderItem={({ item }) => <StyledText style={{ color: Colors.dark.text.primary }}>{item.message}</StyledText>}
                keyExtractor={(item) => item.id?.toString()!}
            />
            <View style={styles.input_container}>
                <TextInput
                    multiline={true}
                    textAlignVertical="top"
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    selectionColor={Colors.dark.light_gray}
                    value={text}
                    onChangeText={handleChange}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={handleSend}>
                    <View style={styles.icon_container}>
                        <Icon name="send" size={30} color={Colors.dark.text.primary} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input_container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingBottom: 10,
        alignItems: 'flex-end',
        gap: 5,
        justifyContent: 'center'
    },
    input: {
        flex: 1,
        backgroundColor: Colors.dark.gray,
        borderRadius: 10,
        color: Colors.dark.text.primary,
        fontSize: normalizeVertical(18),
        paddingLeft: 10
    },
    icon_container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        backgroundColor: Colors.dark.light_gray,
        height: 50,
        borderRadius: 10
    },
})

export default Messages;