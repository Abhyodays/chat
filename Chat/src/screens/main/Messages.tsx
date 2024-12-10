import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MainStackParamList } from "../../router/MainStack";
import { useAuth } from "../../context/authContext";
import { ScrollView } from "react-native";
import CommonStyle from "../styles/common";
import StackHeader from "../../components/StackHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Colors } from "../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { normalize, normalizeVertical } from "../../utils/responsiveSizing";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket/socket";
import { addMessage, connectToDatabase, getAllMessages, getAllMessagesOfUser } from "../../db/db";
import { StyledText } from "../../styledComponents/Text";
import { v4 as uuid } from 'uuid';
import TextMessage from "../../components/TextMessage";

const Messages = () => {
    const route = useRoute<RouteProp<MainStackParamList, "Messages">>()
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const [text, setText] = useState("")
    const receiver = route.params.user
    const { state: auth } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const messageListRef = useRef<FlatList>(null);
    const [isFABVisible, setIsFABVisible] = useState<boolean>(false);



    // send message, update input field, scroll to initial state,  emit event with data
    const handleSend = async () => {
        if (text.trim().length === 0) return;
        const data: Message = {
            id: uuid(),
            sender: auth.user?.email!,
            receiver: receiver.email,
            created_at: new Date().toISOString(),
            message: text
        }
        setMessages(pm => [data, ...pm])
        try {
            const db = await connectToDatabase();
            await addMessage(db, data)
        } catch (error) {
            console.log("Error :: addMessage :: ", error)
        }
        setText('');
        goToEnd();
        socket.emit("send message", data);
    }
    const handleChange = (text: string) => {
        setText(text);
    }

    // socket events for receiving messages and error
    useEffect(() => {
        const handleMessageReceived = async (data: Message) => {
            setMessages((prevMessages) => [data, ...prevMessages]);
            const db = await connectToDatabase();
            await addMessage(db, data);
        };

        const handleError = (data: { message: string }) => {
            console.log("socket error:", data.message);
        };

        socket.on("message received", handleMessageReceived);
        socket.on("error", handleError);

        return () => {
            socket.off("message received", handleMessageReceived);
            socket.off("error", handleError);
        };
    }, [socket]);

    // initially load all messages from db
    useEffect(() => {
        const loadData = async () => {
            const db = await connectToDatabase();
            const res = await getAllMessagesOfUser(db, auth.user?.email!);
            setMessages(res);
        }
        loadData();
    }, [])
    const goToEnd = () => {
        if (messageListRef.current && messages.length > 0) {
            messageListRef.current.scrollToIndex({ animated: false, index: 0 });
        }
    }
    const goBack = () => navigation.goBack()

    // toggle visibility of Go Down button
    const onViewableItemsChanged = ({ viewableItems }: any) => {
        const isFirstItemChanged = viewableItems.some((item: any) => item.index === 0);
        setIsFABVisible(!isFirstItemChanged);
    }
    return (
        <View style={[CommonStyle.container]}>
            <StackHeader label={receiver.fullName} onPressBack={goBack} />
            <FlatList
                inverted
                data={messages}
                renderItem={({ item }) => <TextMessage message={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.message_container}
                ref={messageListRef}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            />
            <View>

            </View>
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
            {
                isFABVisible
                &&
                <TouchableOpacity onPress={goToEnd} activeOpacity={0.8}>
                    <View style={styles.button_go_down}>
                        <Icon name="arrow-down" color={Colors.dark.beige} size={30} />
                    </View>
                </TouchableOpacity>
            }
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
    message_container: {
        gap: normalizeVertical(10),
        paddingHorizontal: 10,
        paddingTop: normalizeVertical(30)
    },
    button_go_down: {
        backgroundColor: Colors.dark.charcoal,
        borderRadius: 40,
        width: normalize(40),
        height: normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: normalize(70),
        right: normalize(20),
        elevation: 10,
    }
})

export default Messages;