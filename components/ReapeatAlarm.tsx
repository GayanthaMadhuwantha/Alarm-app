import React, { useState } from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import CheckBox from 'expo-checkbox';

export default function RepeatAlarm({ visible, onClose, onSave }) {
  const [repeatDays, setRepeatDays] = useState([]);

  const handleRepeatDayChange = (day) => {
    setRepeatDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const handleSave = () => {
    onSave(repeatDays); // Pass the selected days back to the parent component or save them as needed
    onClose(); // Close the modal
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Repeat</Text>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <TouchableOpacity key={index} style={styles.titleItem1} onPress={() => handleRepeatDayChange(day)}>
              <CheckBox
                value={repeatDays.includes(day)}
                onValueChange={() => handleRepeatDayChange(day)}
                color={repeatDays.includes(day) ? 'black' : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.daylabel}>{day}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.titleItem}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.cancelButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}


const styles=StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      container: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      titleItem1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:95,
        position:'relative',
        width: '90%',
        marginTop:'5%',
    
      },
      title:{
        fontSize: 17,
        fontWeight:'bold',
        textAlign:'left',
      },
      inputlable:{
        marginTop:10,
        fontSize:16,
        borderBottomWidth: 1,
        borderBottomColor:'black',
      },
      cancelButton:{
fontSize:15,
      },
      checkbox: {
        width: 17,
        height: 17,
        marginLeft:'-20%',
      },
      titleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width: '90%',
        marginTop:'10%',
    
      },
      daylabel:{
        fontSize:16,
        marginLeft:30,
      },
})