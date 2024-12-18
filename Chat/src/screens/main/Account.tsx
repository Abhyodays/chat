import { Button, FlatList, Text, View } from "react-native"
import { logout } from "../../context/actions/auth.action"
import { useAuth } from "../../context/authContext"
import CommonStyle from "../styles/common";
import StackHeader from "../../components/StackHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../router/MainStack";
import UserCard from "../../components/UserCard";
import SettingsItemCard, { MenuItem } from "../../components/SettingsItemCard";
import { StyleSheet } from "react-native";
import { normalizeVertical } from "../../utils/responsiveSizing";
import { Alert } from "react-native";


const Account = () => {
    const { state: auth, dispatch } = useAuth();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>()
    const handleLogout = async () => {
        Alert.alert("Logout", "You will be logged out.", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Ok",
                onPress(value) {
                    logout(dispatch)
                },
                style: 'default'
            }
        ])
    }
    const goBack = () => {
        navigation.goBack();
    }
    const menuOptions: MenuItem[] = [

        {
            icon: "person-outline",
            label: "Account",
            onPress: () => { console.log("go to account") }
        },
        {
            icon: 'log-out-outline',
            label: 'Logout',
            onPress: handleLogout
        }
    ]

    return (
        <View style={CommonStyle.container}>
            <StackHeader label="Settings" onPressBack={goBack} />
            <UserCard data={auth.user!} />
            <FlatList
                data={menuOptions}
                renderItem={({ item }) => <SettingsItemCard {...item} />}
                style={styles.menu}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    menu: {
        marginTop: normalizeVertical(20)
    }
})

export default Account;