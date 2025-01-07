import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { User } from "../types/User";
import { normalize, normalizeVertical } from "../utils/responsiveSizing";
import CommonStyles from '../screens/styles/common'
import { StyledText } from "../styledComponents/Text";
import { useNewMessageCount } from "../context/NewMessageCount";
import CountIcon from "./CountIcon";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type UserCardProp = {
    data: User,
    handlePress?: () => void
}
const UserCard = ({ data, handlePress }: UserCardProp) => {
    const { getCount } = useNewMessageCount();
    const count = getCount(data.email);
    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <View style={[styles.container]}>
                <Image source={require('../assets/images/profile.jpg')} style={styles.poster} resizeMode="cover" />
                <View style={[styles.container, styles.inner_container]}>
                    <StyledText style={[CommonStyles.text, styles.title]}>{data.fullName}</StyledText>
                    {count > 0 && <CountIcon count={count} />}
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    poster: {
        height: normalize(60),
        width: normalize(60),
        borderRadius: normalize(30)
    },
    title: {
        fontSize: normalizeVertical(20),
        marginLeft: normalize(20)
    },
    inner_container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingRight: 20
    }
})

export default UserCard;