import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';

export default function CountdownTimer() {
 /* const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            scheduleNotification();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const startPauseResume = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      if (timeLeft === 0) {
        const totalSeconds = (parseInt(hours || 0) * 3600) + (parseInt(minutes || 0) * 60) + parseInt(seconds || 0);
        if (totalSeconds <= 0) {
          Alert.alert("Invalid Time", "Please set a valid time.");
          return;
        }
        setTimeLeft(totalSeconds);
      }
      setIsRunning(true);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setHours('');
    setMinutes('');
    setSeconds('');
  };

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time is up!',
        body: 'Your countdown timer has finished.',
      },
      trigger: null,
    });
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleMinutesChange = (value) => {
    const intValue = parseInt(value);
    if (intValue >= 0 && intValue < 60) {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (value) => {
    const intValue = parseInt(value);
    if (intValue >= 0 && intValue < 60) {
      setSeconds(value);
    }
  };*/

  return (
    <View style={styles.container}>
      {/*{timeLeft === 0 && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="00"
            keyboardType="numeric"
            value={hours}
            onChangeText={setHours}
            selectionColor={'black'}
          />
          <Text style={styles.separator}>:</Text>
          <TextInput
            style={styles.input}
            placeholder="00"
            keyboardType="numeric"
            value={minutes}
            onChangeText={handleMinutesChange}
            selectionColor={'black'}
          />
          <Text style={styles.separator}>:</Text>
          <TextInput
            style={styles.input}
            placeholder="00"
            keyboardType="numeric"
            value={seconds}
            onChangeText={handleSecondsChange}
            selectionColor={'black'}
          />
        </View>
      )}
      <Text style={styles.time}>{formatTime(timeLeft)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={startPauseResume} style={styles.button}>
          <Text style={styles.buttonText}>{isRunning ? <MaterialCommunityIcons name="motion-play-outline" size={50} color="black" /> : timeLeft > 0 ?  <MaterialCommunityIcons name="motion-pause-outline" size={50} color="black" /> : <MaterialCommunityIcons name="motion-play-outline" size={50} color="black" />}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={styles.button}>
        <MaterialCommunityIcons name="reload" size={52} color="black" />
        </TouchableOpacity>
      </View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '20%',
    textAlign: 'center',
    fontSize:50,
  },
  separator: {
    fontSize: 35,
    alignSelf: 'center',fontWeight:'500',
  },
  time: {
    fontSize: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
