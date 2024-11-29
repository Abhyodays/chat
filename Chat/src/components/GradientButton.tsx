import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native"
import { StyledText } from "../styledComponents/Text"
import { normalize, normalizeVertical } from "../utilities/responsiveSizing"
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../screens/styles/colors"

type GradientButtonProps = {
    title: string,
    onPress: () => void,
    style?: ViewStyle
}
const GradientButton = ({ title, onPress, style }: GradientButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            <LinearGradient colors={[Colors.dark.teal, Colors.dark.light_teal]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[defaultStyle.container, style]}>
                <StyledText style={defaultStyle.button_text}>{title}</StyledText>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const defaultStyle = StyleSheet.create({
    container: {
        width: normalize(280),
        height: normalizeVertical(65),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    button_text: {
        fontSize: normalizeVertical(18),
        color: Colors.dark.text.primary
    }
})

export default GradientButton;