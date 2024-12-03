import { StyleSheet } from "react-native";
import { Colors } from "../styles/colors"

const CommonStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.dark.background
    },
    text:{
        color: Colors.dark.text.primary
    }
})

export default  CommonStyle;