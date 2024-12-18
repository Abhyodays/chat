import { InteractionManager, StyleSheet, View } from "react-native"
import CommonStyle from "../styles/common"
import SearchField from "../../components/SearchField"
import { useEffect, useRef, useState } from "react"
import { User } from "../../types/User"
import { getUsers } from "../../services/user.service"
import UserList from "../../components/UserList"
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from "../styles/colors"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../router/MainStack"
import { TextInput } from "react-native-gesture-handler"

const Search = () => {
    const [query, setQuery] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

    const handleSearch = async () => {
        const text = query.trim();
        if (text.length === 0) return;
        const users: User[] = await getUsers(query.trim());
        setUsers(users);
    }
    const goBack = () => {
        navigation.goBack();
    }
    const inputRef = useRef<TextInput>();
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            inputRef.current?.focus();
        });
    }, [])
    return (
        <View style={CommonStyle.container}>
            <View style={styles.header}>
                <Icon name="arrow-back" color={Colors.dark.text.primary} size={30} onPress={goBack} />
                <SearchField onSearch={handleSearch} value={query} setValue={setQuery} ref={inputRef} />
            </View>
            <UserList data={users} />
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
})

export default Search;