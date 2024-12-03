import { Button, Text, View } from "react-native"
import { logout } from "../../context/actions/auth.action"
import { useAuth } from "../../context/authContext"

const Account = () => {
    const { dispatch } = useAuth();
    const handleLogout = async () => {
        logout(dispatch);
    }
    return (
        <View>
            <Text>Account</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    )
}

export default Account;