import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type StyledTextProp = {
    children: ReactNode,
    style?: StyleProp<TextStyle>
}
export const StyledText = ({ children, style }: StyledTextProp) => {
    return (
        <Text style={[style, defaultStyle.text]}>{children}</Text>
    )
}

const defaultStyle = StyleSheet.create({
    text: {
        fontFamily: "Poppins",
    }
})
