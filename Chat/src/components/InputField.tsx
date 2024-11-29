import { useRef, useState } from "react"
import { StyleSheet, Text } from "react-native";
import { View } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons'
import { normalize, normalizeVertical } from "../utilities/responsiveSizing";
import { Colors } from "../screens/styles/colors";


type InputFieldProp = {
    icon?: string,
    placeholder?: string
    setValue: (v: string) => void,
    value: string
}

const InputField = ({ icon, placeholder, value, setValue }: InputFieldProp) => {
    const handleChangeText = (text: string) => {
        setValue(text)
    }
    const inputRef = useRef<TextInput>(null);
    const handleIconPress = () => {
        inputRef.current?.focus();
    }
    return (
        <View style={styles.container}>
            {icon && <Icon name={icon} style={styles.icon} onPress={handleIconPress} />}
            <TextInput
                value={value}
                onChangeText={handleChangeText}
                placeholder={placeholder}
                style={styles.input}
                underlineColorAndroid="transparent"
                selectionColor={Colors.dark.background}
                ref={inputRef}
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
        height: normalizeVertical(80),
        borderRadius: normalize(40),
        paddingHorizontal: 20
    },
    icon: {
        fontSize: normalizeVertical(25)
    },
    input: {
        fontSize: normalizeVertical(20),
        color: '#fff',
        marginHorizontal: 10,
        marginRight: 20,
        minWidth: normalize(240)
    }
})

export default InputField;