import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import CommonStyles from '../styles/common'
import { StyledText } from "../../styledComponents/Text"
import { useAuth } from "../../context/authContext"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../router/MainStack"
import { normalize, normalizeVertical } from "../../utils/responsiveSizing"
import SearchField from "../../components/SearchField"
import { useEffect, useState } from "react"
import UserCard from "../../components/UserCard"
import { User } from "../../types/User"
import { client } from "../../axios/axiosClient"
import { socket } from "../../socket/socket"
const Home = () => {
    const { state: auth } = useAuth();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([])
    const handleSearch = async () => {
        try {
            const res = await client.get(`/users?id=${query}`)
            let fetchedUsers: User[] = res.data.data;
            fetchedUsers = fetchedUsers.filter(u => u.username !== auth.user?.username)
            setUsers(fetchedUsers)
        } catch (error) {
            console.log("Error :: Search users:", error)
        }
    }
    const goToMessages = (user: User) => {
        navigation.navigate('Messages', { user })
    }
    useEffect(() => {
        console.log('connecting')
        socket.connect();
        socket.emit('register', { email: auth.user?.email })
        return (() => {
            socket.disconnect();
            console.log("socket disconnected")
        })
    }, [])
    return (
        <View style={[CommonStyles.container]}>
            <TouchableOpacity onPress={() => navigation.navigate('Account')} activeOpacity={0.8}>
                <StyledText style={[CommonStyles.text, styles.title]}>{auth.user?.fullName}</StyledText>
            </TouchableOpacity>
            <SearchField value={query} setValue={setQuery} onSearch={handleSearch} />
            <FlatList
                data={users}
                renderItem={({ item }) =>
                    <UserCard data={item} handlePress={() => goToMessages(item)} />
                }
                keyExtractor={item => item.username}
                contentContainerStyle={styles.user_list}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: normalizeVertical(24),
        marginHorizontal: normalize(10),
    },
    user_list: {
        gap: normalizeVertical(20),
        paddingTop: normalizeVertical(20),
        paddingHorizontal: normalize(10)
    }
})

export default Home