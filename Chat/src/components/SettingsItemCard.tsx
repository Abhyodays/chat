import { Settings, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SettingsMenuIcon } from "../types/SettingsMenuIcon"
import { normalizeVertical } from "../utils/responsiveSizing";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../screens/styles/colors";
import CommonStyle from "../screens/styles/common";
import { StyledText } from "../styledComponents/Text";

export type MenuItem = {
    icon: SettingsMenuIcon;
    label: string;
    onPress?: () => void
}
const SettingsItemCard = ({ icon, label, onPress }: MenuItem) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.container}>
                <Icon name={icon} size={30} color={Colors.dark.text.primary} />
                <StyledText style={[CommonStyle.text, styles.label]}>{label}</StyledText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: normalizeVertical(10),
        gap: 20
    },
    label: {
        fontSize: 20
    }
})

export default SettingsItemCard;