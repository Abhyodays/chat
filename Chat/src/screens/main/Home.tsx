import { StyleSheet, TouchableOpacity, View } from "react-native"
import CommonStyles from '../styles/common'
import { StyledText } from "../../styledComponents/Text"
import { useAuth } from "../../context/authContext"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../router/MainStack"
import { normalize, normalizeVertical } from "../../utils/responsiveSizing"
import SearchField from "../../components/SearchField"
import { useCallback, useEffect, useState } from "react"
import { User } from "../../types/User"
import { addMessage, connectToDatabase, createTables, getAllChatUsers, updateChatUser } from "../../db/db"
import { ChatUser } from "../../types/ChatUser"
import { getUserDetails, loadChatUsersDetails } from "../../services/user.service"
import UserList from "../../components/UserList"
import { socket } from "../../socket/socket"
import { useNewMessageCount } from "../../context/NewMessageCount"
const Home = () => {
    const { state: auth } = useAuth();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const [users, setUsers] = useState<User[]>([]);
    const { increaseCount } = useNewMessageCount();

    const gotoSearch = () => {
        navigation.navigate('Search');
    }
    useEffect(() => {
        socket.emit('register', { email: auth.user?.email })
        return (() => {
            console.log("socket disconnected")
        });

    }, []);

    // for users on home screen in order
    const loadChatUsers = useCallback(async (email: string) => {
        try {
            const db = await connectToDatabase();
            await createTables(db);
            const chatUsers: ChatUser[] = await getAllChatUsers(db, email);
            const userWithDetails = await loadChatUsersDetails(chatUsers);
            setUsers(userWithDetails);
        } catch (error) {
            console.log("Error :: loadChatUsers :: ", error);
        }
    }, [auth.user?.email]);

    useEffect(() => {
        if (!socket || !auth.user?.email) return;
        const handleError = (data: { message: string }) => {
            console.log("socket error:", data.message);
        };
        // On receveing messages 
        const handleMessageReceived = async (data: Message) => {
            console.log(`received to ${auth.user?.email}:`, data.message);
            const userEmail = auth.user?.email;
            try {
                if (data.receiver === userEmail) {
                    // new message count increase
                    increaseCount(data.sender);
                    // save for persistent messages
                    await updateDatabase({ ...data, author: userEmail });
                    // to prevent duplicate api calls for user details
                    const existingUser = users.find(u => u.email === data.sender);
                    if (existingUser) {
                        setUsers(prevUsers => {
                            const filteredUsers = prevUsers.filter(u => u.email !== existingUser.email);

                            return [existingUser, ...filteredUsers];
                        });
                    } else {
                        let newUser = await getUserDetails(data.sender);
                        const updatedUsers = [newUser, ...users];
                        setUsers(updatedUsers);
                    }
                    socket.emit("message_received", data);
                }
            } catch (error) {
                console.log("Error :: handleMessageReceived ::", error);
            }
        };

        socket.connect();
        socket.on("connect", () => console.log("Socket connected."));
        socket.on("message received", handleMessageReceived);
        socket.on("error", handleError);

        return () => {
            socket.off("message received", handleMessageReceived);
            socket.off("error", handleError);
            socket.disconnect();
        };
    }, [auth.user?.email]);
    // 
    const updateDatabase = async (data: Message) => {
        try {
            const db = await connectToDatabase();
            const userEmail = auth.user?.email;
            let chatUser = data.receiver;

            if (data.sender !== userEmail) {
                chatUser = data.sender;
            }

            await updateChatUser(db, {
                id: chatUser,
                latestMessage: data.message,
                latestMessageTime: data.created_at,
                author: userEmail!,
            });

            await addMessage(db, data);
        } catch (error) {
            console.log("Error :: updateDatabase ::", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (auth.user?.email) {
                loadChatUsers(auth.user.email);
            }
        }, [auth.user?.email])
    );

    return (
        <View style={[CommonStyles.container]}>
            <TouchableOpacity onPress={() => navigation.navigate('Account')} activeOpacity={0.8}>
                <StyledText style={[CommonStyles.text, styles.title]}>{auth.user?.fullName.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')}</StyledText>
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoSearch} activeOpacity={0.8} style={styles.search}>
                <SearchField value={""} setValue={() => { }} editable={false} />
            </TouchableOpacity>
            <UserList data={users} />

        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: normalizeVertical(24),
        marginHorizontal: normalize(10),
    },
    search: {
        marginVertical: normalizeVertical(10),
        marginLeft: normalize(10)
    }

})

export default Home;
