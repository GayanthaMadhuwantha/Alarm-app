import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Timerbutton from "./timerbutton";

export default function timeform({id,label}) {
    const onSubmit=id ? 'update' : 'create';
    return(
        <View style={styles.formContainer}>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Title</Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} underlineColorAndroid="transparent" defaultValue={label} />
                </View>
            </View>

            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Project</Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} underlineColorAndroid="transparent"/>
                </View>
            </View>

            <View style={styles.buttonGroup}>
                
            </View>
        </View>
);
}

const styles = StyleSheet.create({
formContainer: {
    backgroundColor: 'white',
    borderColor: '#D6D7DA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
},
attributeContainer: {
    marginVertical: 8,
},
textInputContainer: {
    borderColor: '#D6D7DA',
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
},
textInput: {
    height: 30,
    padding: 5,
    fontSize: 12,
},
textInputTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
},
buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
});


