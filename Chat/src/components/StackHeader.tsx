import { StyleSheet, Text, View, ViewStyle } from "react-native"
import { normalize, normalizeVertical } from "../utils/responsiveSizing"
import Icon from 'react-native-vector-icons/Ionicons'
import { StyledText } from "../styledComponents/Text"
import { Colors } from "../screens/styles/colors"



type StackHeaderProp = {
    label: string,
    onPressBack?: () => void,
    style?: ViewStyle
}
const StackHeader = ({ label, onPressBack, style }: StackHeaderProp) => {
    return (
        <View style={[styles.container, style]}>
            <Icon name="arrow-back" style={[styles.text, styles.icon]} onPress={onPressBack} />
            <StyledText style={[styles.text, styles.label]}>{label}</StyledText>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: normalizeVertical(65),
        backgroundColor: Colors.dark.background,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(10),
        gap: normalize(15)
    },
    text: {
        fontSize: normalizeVertical(24),
        color: Colors.dark.text.primary,
    },
    label: {
    },
    icon: {
        fontSize: normalizeVertical(24),
    }
})
export default StackHeader;