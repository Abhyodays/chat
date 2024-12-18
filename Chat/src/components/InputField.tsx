import { useRef, useState } from "react"
import { StyleProp, StyleSheet, Text, TextInputProps } from "react-native";
import { View } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons'
import { normalize, normalizeVertical } from "../utils/responsiveSizing";
import { Colors } from "../screens/styles/colors";


type InputFieldProp = {
    icon?: string,
    placeholder?: string,
    onChangeText?: (text: string) => void,
    value: string,
    secureTextEntry?: boolean,
}

const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry }: InputFieldProp) => {
    const inputRef = useRef<TextInput>(null);
    const handleIconPress = () => {
        inputRef.current?.focus();
    }
    return (
        <View style={styles.container}>
            {icon && <Icon name={icon} style={styles.icon} onPress={handleIconPress} />}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={styles.input}
                underlineColorAndroid="transparent"
                selectionColor={Colors.dark.background}
                ref={inputRef}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={Colors.dark.light_gray}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        maxWidth: normalize(350),
        alignItems: 'center',
        backgroundColor: '#3f3f3f',
        height: normalizeVertical(70),
        borderRadius: normalize(35),
        paddingHorizontal: 20
    },
    icon: {
        fontSize: normalizeVertical(25),
        color: Colors.dark.light_gray
    },
    input: {
        fontSize: normalizeVertical(20),
        color: '#fff',
        marginHorizontal: 10,
        marginRight: 20,
        minWidth: normalize(240),
    }
})

export default InputField;