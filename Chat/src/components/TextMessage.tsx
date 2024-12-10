import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { View } from "react-native"
import { useAuth } from "../context/authContext";
import { normalize, normalizeVertical } from "../utils/responsiveSizing";
import { Colors } from "../screens/styles/colors";
import { StyledText } from "../styledComponents/Text";
import CommonStyle from "../screens/styles/common";
import { memo } from "react";

type TextMessageProp = {
    message: Message;
}
const TextMessage = ({ message }: TextMessageProp) => {
    const { state: auth } = useAuth();
    const isSent = auth.user?.email === message.sender;
    const containerStyle: StyleProp<ViewStyle> =
        isSent
            ? {
                backgroundColor: Colors.dark.gray,
                alignSelf: 'flex-end'
            }
            : {
                backgroundColor: Colors.dark.beige,
                alignSelf: 'flex-start'
            };
    return (
        <View style={[styles.container, containerStyle]}>
            <StyledText style={[CommonStyle.text, styles.text, { color: isSent ? Colors.dark.text.primary : Colors.dark.background }]}>{message.message}</StyledText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: normalize(320),
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center'
    },
    text: {
        fontSize: normalizeVertical(16),
        marginVertical: normalizeVertical(7)
    }
})

export default memo(TextMessage);