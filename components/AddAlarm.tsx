import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AddAlarm({ onPress }) {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.title}>
          <Text style={styles.icon}>+{" "}</Text> Add Alarm
        </Text>
      </TouchableOpacity>
    );
  }

const styles=StyleSheet.create({
    button:{
        height:50,
        width:'90%',
        backgroundColor:'black',
        color:'white',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        },
    title:{
        color:'white',
        textAlign:'center',
fontWeight:'bold',
        fontSize:16,

    },
    icon:{
fontSize:19,
    },
})