import { View, StyleSheet, ViewStyle } from "react-native"
import { StyledText } from "../styledComponents/Text"
import { normalize, normalizeVertical } from "../utilities/responsiveSizing"

type GradientButtonProps = {
    title: string,
    onPress: () => void,
    style?: ViewStyle
}
const GradientButton = ({ title, onPress }: GradientButtonProps) => {
    return (
        <View style={defaultStyle.container}>
            <StyledText>{title}</StyledText>
        </View>
    )
}

const defaultStyle = StyleSheet.create({
    container: {
        width: normalize(280),
        backgroundColor: '#219B9D',
        height: normalizeVertical(50),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    button_text: {
        // fontSize:
    }
})

export default GradientButton;