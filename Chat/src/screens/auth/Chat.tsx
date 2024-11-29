import { useState } from "react";
import { Button, Text, View } from "react-native"
import { TextInput } from "react-native-gesture-handler";

const Chat = () => {
    const [message, setMessage] = useState<string>("")
    return (
        <View style={{ flex: 1 }}>
            <Text>Chat here</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0, left: 0 }}>
                <TextInput onChangeText={text => setMessage(text)} value={message} style={{ borderWidth: 1, flex: 0.8 }} />
                <Button title="send" onPress={() => console.log("send")} />
            </View>
        </View>
    )
}

export default Chat;