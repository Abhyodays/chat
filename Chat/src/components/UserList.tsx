import { FlatList, StyleSheet, View } from "react-native"
import { User } from "../types/User";
import UserCard from "./UserCard";
import { normalize, normalizeVertical } from "../utils/responsiveSizing";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../router/MainStack";

type UserListProp = {
    data: User[];

}
const UserList = ({ data }: UserListProp) => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const goToMessages = (user: User) => {
        navigation.navigate("Messages", { user })
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item }) =>
                <UserCard data={item} handlePress={() => goToMessages(item)} />
            }
            keyExtractor={item => item.username}
            contentContainerStyle={styles.user_list}
        />
    )
}

const styles = StyleSheet.create({
    user_list: {
        gap: normalizeVertical(20),
        paddingTop: normalizeVertical(20),
        paddingHorizontal: normalize(10)
    }
})
export default UserList;