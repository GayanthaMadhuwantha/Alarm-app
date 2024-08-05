import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function timerbutton(small,color,label,onPress) {
    return(
        <TouchableOpacity style={styles.button1} onPress={onPress}> 
        <Text style={[styles.buttonText, small ? styles.small : styles.large, { color }, ]}> {label} </Text>
        </TouchableOpacity>

    );
    
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        minWidth: 100,
        borderWidth: 2,
        borderRadius: 3,
    },
    small: {
        fontSize: 14,
        padding: 5,
     },
    large: {
        fontSize: 16,
        padding: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
    },
    button1: {
        backgroundColor: 'black',
        color: 'white',
        borderRadius:50,
        height:50,
        width:'90%',
        top:60,
      },
 /* title:{
      fontSize:16,
      color:'white',
      fontWeight:'bold',
  },*/
    })