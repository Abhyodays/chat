import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native"
import { MainStackParamList } from "../../router/MainStack";
import { useAuth } from "../../context/authContext";
import { ScrollView } from "react-native";
import CommonStyle from "../styles/common";
import StackHeader from "../../components/StackHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import UserCard from "../../components/UserCard";
import { Colors } from "../styles/colors";

const Messages = () => {
    const route = useRoute<RouteProp<MainStackParamList, "Messages">>()
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const receiver = route.params.user
    const { state: user } = useAuth();

    const goBack = () => navigation.goBack()
    return (
        <View style={[CommonStyle.container, { backgroundColor: '#fff' }]}>
            <StackHeader label={receiver.fullName} onPressBack={goBack} />
            <ScrollView style={{ flex: 1 }}>

            </ScrollView>
            <View style={styles.input_container}>
                <TextInput style={{ borderWidth: 2, width: 100 }} multiline={true} textAlignVertical="top" />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input_container: {
        backgroundColor: Colors.dark.gray,
        flexDirection: 'row',
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 10
    }
})

export default Messages;