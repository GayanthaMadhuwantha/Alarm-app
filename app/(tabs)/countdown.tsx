import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CountDownScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(0);
  const lastElapsedTimeRef = useRef(0);

  useEffect(() => {
    loadTimer();
  }, []);

  useEffect(() => {
    saveTimer();
  }, [elapsedTime, isRunning]);

  const loadTimer = async () => {
    try {
      const storedElapsedTime = await AsyncStorage.getItem('elapsedTime');
      const storedIsRunning = await AsyncStorage.getItem('isRunning');
      if (storedElapsedTime) {
        setElapsedTime(JSON.parse(storedElapsedTime));
        lastElapsedTimeRef.current = JSON.parse(storedElapsedTime);
      }
      if (storedIsRunning) {
        setIsRunning(JSON.parse(storedIsRunning));
      }
    } catch (error) {
      console.error('Failed to load timer', error);
    }
  };

  const saveTimer = async () => {
    try {
      await AsyncStorage.setItem('elapsedTime', JSON.stringify(elapsedTime));
      await AsyncStorage.setItem('isRunning', JSON.stringify(isRunning));
    } catch (error) {
      console.error('Failed to save timer', error);
    }
  };

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - lastElapsedTimeRef.current;
      animationFrameRef.current = requestAnimationFrame(updateElapsedTime);
    } else if (!isRunning && animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isRunning]);

  const updateElapsedTime = () => {
    setElapsedTime(Date.now() - startTimeRef.current);
    animationFrameRef.current = requestAnimationFrame(updateElapsedTime);
  };

  const startPauseResume = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
    if (!isRunning) {
      startTimeRef.current = Date.now() - lastElapsedTimeRef.current;
      animationFrameRef.current = requestAnimationFrame(updateElapsedTime);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lastElapsedTimeRef.current = elapsedTime;
    }
  };

  const reset = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsRunning(false);
    setElapsedTime(0);
    lastElapsedTimeRef.current = 0;
  };

  const formatTime = (time) => {
    const milliseconds = `0${Math.floor((time % 1000) / 10)}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

    return { hours, minutes, seconds, milliseconds };
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(elapsedTime);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startPauseResume}><Text style={styles.time}>
        {hours}:{minutes}:{seconds}.
        <Text style={styles.milliseconds}>{milliseconds}</Text>
      </Text>
      <View style={styles.labelcontain}><Text style={styles.label}>Hours</Text><Text style={styles.label}>:</Text><Text style={styles.label}>Minutes</Text><Text style={styles.label}>:</Text><Text style={styles.label}>Seconds</Text></View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={startPauseResume} style={styles.area}>
          <Text>
            {isRunning ? (
              <MaterialCommunityIcons name="motion-pause-outline" size={50} color="black" />
            ) : elapsedTime > 0 ? (
              <MaterialCommunityIcons name="motion-play-outline" size={50} color="black" />
            ) : (
              <MaterialCommunityIcons name="motion-play-outline" size={50} style={{ fontWeight: 'bold' }} color="black" />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={styles.area}>
          <MaterialCommunityIcons name="reload" size={52} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 50,
    margin:10
  },
  milliseconds: {
    fontSize: 50,
    color:'#B8B8B8',
  },
  labelcontain: {
    flexDirection: 'row',
    fontSize:16,
  },
  label: {
    fontSize: 17,
    color:'#B8B8B8',
    marginLeft:8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginTop: '20%',
    width:'65%',
  },
  area: {
    padding: 8,
  },
  
});