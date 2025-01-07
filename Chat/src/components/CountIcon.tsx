import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../screens/styles/colors";

const CountIcon = ({ count }: { count: number }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.count}>{count}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark.beige,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    count: {
        color: Colors.dark.charcoal,
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 1,
        paddingHorizontal: 4
    }
})
export default CountIcon;