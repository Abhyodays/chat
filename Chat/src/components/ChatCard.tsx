import { Text, TouchableOpacity, View } from "react-native"
import { User } from "../types/User"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AuthStackParamList } from "../router/AuthStack"
import { io } from 'socket.io-client';

type CardPropType = {
    data: User
}
const ChatCard = ({ data }: CardPropType) => {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>()
    const goToChat = () => {


        navigation.navigate('Chat', { user: data });
    }
    return (
        <TouchableOpacity onPress={goToChat}>
            <View style={{ backgroundColor: 'yellow', paddingVertical: 20 }}>
                <Text>{data.fullName}</Text>
            </View>
        </TouchableOpacity>
    )

}

export default ChatCard;