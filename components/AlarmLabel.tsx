import { useState } from "react";
import { Modal, TextInput, TouchableOpacity, View,Text, StyleSheet } from "react-native";

export default function Alarmlabel({visible, onClose, onSave}){
    const [label, setLabel] = useState('');

  const handleSave = () => {
    onSave(label);
  };
    return(
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        
        <View style={styles.container}>
        <Text style={styles.title}>Label</Text>
        <TextInput value={label} style={styles.inputlable} onChangeText={setLabel} selectionColor={'black'} placeholder="Enter Title" />
        <View style={styles.titleItem1}>
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
        justifyContent:'space-evenly',
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
    marginRight: '-30%',
    width: 17,
    height: 17,
    marginLeft:5,
  },
})