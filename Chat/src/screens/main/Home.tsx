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
import { loadChatUsersDetails } from "../../services/user.service"
import UserList from "../../components/UserList"
import { socket } from "../../socket/socket"
const Home = () => {
    const { state: auth } = useAuth();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([])
    const gotoSearch = () => {
        navigation.navigate('Search');
    }
    useEffect(() => {
        socket.emit('register', { email: auth.user?.email })
        return (() => {
            console.log("socket disconnected")
        });

    }, [])
    const updateDatabase = async (data: Message) => {
        try {
            const db = await connectToDatabase();
            let chatUser = data.receiver
            if (data.sender !== auth.user?.email) {
                chatUser = data.sender
            }
            await updateChatUser(db,
                {
                    id: chatUser,
                    latestMessage: data.message,
                    latestMessageTime: data.created_at,
                    author: auth.user?.email!
                })
            await addMessage(db, data);
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        const handleMessageReceived = async (data: Message) => {
            console.log(`received to ${auth.user?.email}:`, data.message)
            const authorEmail = auth.user?.email!
            try {
                if (data.receiver === authorEmail) {
                    await updateDatabase({ ...data, author: authorEmail });
                }
            } catch (error) {
                console.log("Error :: handleMessageReceived ::", error)
                throw error;
            }
        };
        socket.on("message received", handleMessageReceived)
    })
    useFocusEffect(
        useCallback(() => {
            const loadChatUsers = async (email: string) => {
                try {
                    const db = await connectToDatabase();
                    await createTables(db);
                    const chatUsers: ChatUser[] = await getAllChatUsers(db, email);
                    const userWithDetails = await loadChatUsersDetails(chatUsers);
                    setUsers(userWithDetails);
                } catch (error) {
                    console.log("Error :: loadChatUsers :: ", error);
                }
            };
            if (auth.user?.email) {
                loadChatUsers(auth.user.email);
            }
        }, [auth.user?.email])
    );
    return (
        <View style={[CommonStyles.container]}>
            <TouchableOpacity onPress={() => navigation.navigate('Account')} activeOpacity={0.8}>
                <StyledText style={[CommonStyles.text, styles.title]}>{auth.user?.fullName}</StyledText>
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoSearch} activeOpacity={0.8} style={styles.search}>
                <SearchField value={query} setValue={setQuery} editable={false} />
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
