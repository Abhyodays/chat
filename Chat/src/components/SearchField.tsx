import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../screens/styles/colors";
import { normalize } from "../utils/responsiveSizing";
import { useState } from "react";

type SearchFieldProp = {
    value: string;
    setValue: (text: string) => void;
    onSearch: () => void
}
const SearchField = ({ setValue, value, onSearch }: SearchFieldProp) => {

    return (
        <View style={styles.container}>
            <TextInput placeholder="Search here"
                style={styles.input}
                placeholderTextColor={Colors.dark.light_gray}
                value={value}
                onChangeText={text => setValue(text)}
                onBlur={onSearch}
            />
            <TouchableOpacity onPress={onSearch} activeOpacity={0.8}>
                <View style={styles.search_icon_container}>
                    <Icon name="search" size={30} color={Colors.dark.text.primary} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.gray,
        maxWidth: normalize(320),
        borderRadius: normalize(10),
        justifyContent: 'space-between',
        overflow: 'hidden',
        marginLeft: normalize(10),
        paddingLeft: 10,
        marginTop: 20
    },
    search_icon_container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        backgroundColor: Colors.dark.light_gray,
        height: 50,
        borderRadius: 10,
    },
    input: {
        fontSize: 18,
        color: Colors.dark.text.primary,
        flex: 1
    }
})
export default SearchField;