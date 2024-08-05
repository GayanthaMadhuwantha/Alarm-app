import { TouchableOpacity } from 'react-native';
import { StyleSheet, Image, Platform, View, Text, PanResponder } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal } from 'react-native';


export default function AlarmScreen({alarmTime, onSnooze, onDismiss }) {
  return (
    <Modal>
   <View style={styles.container}>
    <Text style={styles.title}>Now Time is</Text>
    <Text style={styles.title1}>{alarmTime}</Text> 
    <Text style={styles.label}>Holiday</Text> 
    <View style={styles.titleItem}>
<TouchableOpacity style={styles.options} ><Text style={styles.cancelButtonText} onPress={onDismiss}><Ionicons name="close" size={36} color="black" /></Text></TouchableOpacity>
<TouchableOpacity style={styles.options} ><Text style={styles.cancelButtonText} onPress={onSnooze}><MaterialIcons name="snooze" size={35} color="black" /></Text></TouchableOpacity></View>
   </View></Modal>
  );
}

const styles = StyleSheet.create({
container:{
  backgroundColor:'black',
  height:'100%',
  justifyContent:'center',
  alignItems:'center',
},
title:{
  fontSize:26,
  color:'white',
  fontWeight:'300',
  marginTop:'-10%',
},
title1:{
  fontSize:60,
  color:'white',
  fontWeight:'400',
  marginTop:'40%',
},
cancelButtonText: {
  fontSize: 30,
  color: 'black',
  fontWeight:'bold',
  justifyContent: 'space-around',
},
titleItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '90%',
  marginTop:'70%',
},
options:{
  height:60,
  width:60,
  borderRadius:50,
  backgroundColor:'white',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
},
label:{
color:'white',
fontSize:20,
}
 
});
