import { useState } from "react"
import { Button, FlatList, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { User } from "../../types/User";
import ChatCard from "../../components/ChatCard";

const Search = () => {
    const [text, setText] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const handleSearch = async () => {
        try {
            const res = await fetch(`http://10.175.0.244:3000/api/v1/users?id=${text}`);
            const { data } = await res.json();
            setUsers(data)
        } catch (e) {
            console.log(`Error occured while searching users:`, e);
        }
    }
    return (
        <View>
            <TextInput style={{ borderWidth: 1, marginBottom: 2 }} onChangeText={t => setText(t)} />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={users}
                renderItem={({ item }) => <ChatCard data={item} />}
                keyExtractor={(item) => item.username}
            />
        </View>
    )
}

export default Search;