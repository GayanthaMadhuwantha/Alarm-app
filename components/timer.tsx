import React from "react";
import { View,Text, StyleSheet } from "react-native";

import Timerbutton from "./timerbutton";
import { millisecondsToHuman } from "./timerUtils";




export default function timer({id,label,elapsed}){
    const elapsedString = millisecondsToHuman(elapsed);
return (
    <View style={styles.timerContainer}>
        <Text style={styles.title}>{label}</Text>
        <Text style={styles.elapsedTime}>{elapsedString}</Text>
        <View style={styles.buttonGroup}>
           
        </View>
    </View>
);
}

const styles = StyleSheet.create({
    timerContainer: {
    backgroundColor: 'white',
    borderColor: '#d6d7da',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    },
    title: {
    fontSize: 14,
    fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 26,
fontWeight: 'bold',
textAlign: 'center',
paddingVertical: 15,
},
buttonGroup: {
flexDirection: 'row',
justifyContent: 'space-between',
},
});

    

