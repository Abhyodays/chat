import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { User } from "../types/User";
import { normalize, normalizeVertical } from "../utils/responsiveSizing";
import CommonStyles from '../screens/styles/common'
import { StyledText } from "../styledComponents/Text";

type UserCardProp = {
    data: User,
    handlePress?: () => void
}
const UserCard = ({ data, handlePress }: UserCardProp) => {
    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <View style={[styles.container]}>
                <Image source={require('../assets/images/profile.jpg')} style={styles.poster} resizeMode="cover" />
                <StyledText style={[CommonStyles.text, styles.title]}>{data.fullName}</StyledText>
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
    }
})

export default UserCard;