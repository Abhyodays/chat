import { StyleSheet, Text, View, ViewStyle } from "react-native"
import { normalize, normalizeVertical } from "../utilities/responsiveSizing"
import Icon from 'react-native-vector-icons/AntDesign'
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
            <Icon name="left" style={[styles.text, styles.icon]} onPress={onPressBack} />
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
        paddingHorizontal: normalize(10)
    },
    text: {
        fontSize: normalizeVertical(18),
        color: Colors.dark.text.primary
    },
    label: {
        flex: 1,
        textAlign: 'center'
    },
    icon: {
        fontSize: normalizeVertical(24),
    }
})
export default StackHeader;