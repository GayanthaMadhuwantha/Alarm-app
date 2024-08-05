import React from "react";
import { TouchableOpacity , StyleSheet, Text, View} from "react-native";
import Timeform from "./timeform";
import Timerbutton from "./timerbutton";

export default function addevent({isOpen}){
    return(
        <View style={[styles.container, !isOpen && styles.buttonPadding]}>
{isOpen ? <Timeform id={undefined} label={undefined} /> : <Timerbutton small color="black"  label="+" />}
</View>
    );

}
const styles = StyleSheet.create({
    container: {
    paddingVertical: 10,
    },
    buttonPadding: {
    paddingHorizontal: 15,
    },

    
});