import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Switch, View, Text, FlatList, TouchableOpacity, Alert,Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CheckBox, { Checkbox } from 'expo-checkbox';
import * as Notifications from 'expo-notifications';


import CustomAlarmModal from '@/components/CustomAlarmModal';
import AddAlarm from '@/components/AddAlarm';
import AlarmScreen from '@/components/AlarmBackground';
import { getMusic } from '@/scripts/getMusic';
import { Audio } from 'expo-av';

const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Notification permissions are required to set alarms.');
  }

  if (Platform.OS === 'android') {
    const { status: drawOverStatus } = await Notifications.requestPermissionsAsync();
    if (drawOverStatus !== 'granted') {
      Alert.alert('Draw over other apps permission is required for alarm notifications.');
    }
  }
};

export default function HomeScreen() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [alarms, setAlarms] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [editingAlarm, setEditingAlarm] = useState(null);
  const [selectedAlarms, setSelectedAlarms] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isChecked, setChecked] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificationIds, setNotificationIds] = useState({});
  const [selectedSound, setSelectedSound] = useState(null);
  const [playingAlarm, setPlayingAlarm] = useState(null);
  const [isAlarmScreenVisible, setAlarmScreenVisible] = useState(false);
  const [snoozeInterval, setSnoozeInterval] = useState(5);
  const [currentAlarmTime, setCurrentAlarmTime] = useState(''); // Default snooze interval of 5 minutes
  const [selectedAlarmData, setSelectedAlarmData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const soundRef = useRef(null);

  useEffect(() => {
    requestPermissions();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      const { sound } = notification.request.content.data;
      if (sound) {
        setAlarmScreenVisible(true);
        const soundFile = getMusic(sound);
        playSound(soundFile);
      }
      setCurrentAlarmTime(new Date(notification.date).toLocaleTimeString());
    });

    return () => {
      subscription.remove();
    };
  }, []);


  useEffect(() => {
    const loadAlarms = async () => {
      try {
        const savedAlarms = await AsyncStorage.getItem('alarms');
        if (savedAlarms) {
          setAlarms(JSON.parse(savedAlarms));
        }
      } catch (error) {
        console.error('Failed to load alarms from AsyncStorage', error);
      }
    };

    loadAlarms();
  }, []);

  const saveAlarms = async (alarms) => {
    try {
      await AsyncStorage.setItem('alarms', JSON.stringify(alarms));
    } catch (error) {
      console.error('Failed to save alarms to AsyncStorage', error);
    }
  };

  
  const handleSaveAlarm = (newAlarm) => {
    const [time, period] = newAlarm.time.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
  
    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid time format:', newAlarm.time);
      return;
    }
  
    const adjustedHours = period === 'PM' && hours < 12 ? hours + 12 :
      period === 'AM' && hours === 12 ? 0 : hours;
  
    const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  
    const now = new Date();
  
    const createAlarmDate = (day) => {
      const alarmDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (day + 7 - now.getDay()) % 7,
        adjustedHours,
        minutes
      );
  
      if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 7);
      }
  
      return alarmDate;
    };
  
    if (isNaN(now.getTime())) {
      console.error('Invalid date provided:', now);
      return;
    }
  
    const alarmData = {
      ...newAlarm,
      time: formattedTime,
      repeatDays: newAlarm.repeatDays,
      sound: newAlarm.sound,
      label:newAlarm.label,
      enabled: true,
    };
    let updatedAlarms;
    if (editingAlarm !== null) {
      updatedAlarms = alarms.map((alarm, index) =>
        index === editingAlarm ? alarmData : alarm
      );
    } else {
      updatedAlarms = [...alarms, alarmData];
    }
  
    if (alarmData.enabled) {
      if (alarmData.repeatDays && alarmData.repeatDays.length > 0) {
        alarmData.repeatDays.forEach(day => {
          const alarmDate = createAlarmDate(day);
          scheduleNotification(alarmDate, alarms.length, alarmData.sound || "Default Sound");
        });
      } else {
        const alarmDate = createAlarmDate(now.getDay());
        scheduleNotification(alarmDate, alarms.length, alarmData.sound || "Default Sound");
      }
    }
  
    setAlarms(updatedAlarms);
    saveAlarms(updatedAlarms);
    setModalVisible(false);
    setEditingAlarm(null);
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const scheduleNotification = async (date, alarmId, sound) => {
    const trigger = date.getTime() - new Date().getTime();
    console.log('Scheduling notification for:', trigger, 'ms from now');

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alarm",
          body: `It's time for your alarm set for ${date.toLocaleTimeString()}`,
          sound: true,
          data: { sound: sound || "Default Sound" },
        },
        trigger: { 
          seconds: Math.floor(trigger / 1000) },
      });

      setNotificationIds((prevNotificationIds) => ({
        ...prevNotificationIds,
        [alarmId]: notificationId,
      }));
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  };

  const cancelNotification = async (alarmId) => {
    if (notificationIds[alarmId]) {
      try {
        await Notifications.cancelScheduledNotificationAsync(notificationIds[alarmId]);
        setNotificationIds((prevIds) => {
          const { [alarmId]: _, ...remainingIds } = prevIds;
          return remainingIds;
        });
      } catch (error) {
        console.error('Failed to cancel notification:', error);
      }
    }
  };
  

  const handleDelete = () => {
    if (selectedAlarms.length > 0) {
      const updatedAlarms = alarms.filter((_, index) => !selectedAlarms.includes(index));
      selectedAlarms.forEach((index) => cancelNotification(index));
      setAlarms(updatedAlarms);
      saveAlarms(updatedAlarms);
      setSelectedAlarms([]);
      setIsSelectionMode(false);
    }
  };
  

  const handleConfirm = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    if (editingAlarm !== null) {
      // Update the existing alarm
      const updatedAlarms = alarms.map((alarm, index) =>
        index === editingAlarm ? { ...alarm, time: formattedTime, date } : alarm
      );
      setAlarms(updatedAlarms);
      saveAlarms(updatedAlarms);
      setEditingAlarm(null);
    } else {
      setSelectedTime(formattedTime);
      setModalVisible(true);
    }
    hideDatePicker();
  };
  
  const handleCancelSelection = () => {
    setSelectedAlarms([]);
    setIsSelectionMode(false);
  };

  const toggleSelection = (index) => {
    if (selectedAlarms.includes(index)) {
      setSelectedAlarms(selectedAlarms.filter(i => i !== index));
    } else {
      setSelectedAlarms([...selectedAlarms, index]);
    }
  };

  const handleAlarmPress = (index) => {
    if (isSelectionMode) {
      toggleSelection(index);
    } else {
      setEditingAlarm(index); // Set the index of the alarm being edited
      setSelectedAlarmData(alarms[index]); // Set the selected alarm data
      setModalVisible(true);
    }
  };
  ;

  const handleAddAlarmPress = () => {
    setModalVisible(true);
    setEditingAlarm(null);
  };


  const playSound = async (soundFile) => {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      soundRef.current = sound;
      await sound.setIsLoopingAsync(true); // Ensure the sound loops
      await sound.playAsync();
      setPlayingAlarm(alarmId);
  };
  
  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setPlayingAlarm(null);
  };

  const handleCloseAlarmScreen = () => {
    stopSound();
    setAlarmScreenVisible(false);
  };

  const handleSnooze = async () => {
    if (playingAlarm !== null) {
      const snoozeTime = new Date();
      snoozeTime.setMinutes(snoozeTime.getMinutes() + snoozeInterval);
  
      await scheduleNotification(snoozeTime, playingAlarm, "Sound 1");
      handleCloseAlarmScreen();
    }
  };
  
  const handleDismiss = () => {
    stopSound();
    setAlarmScreenVisible(false);
    setIsSwitchOn(false);
  };

  const handleLongPress = (index) => {
    setIsSelectionMode(true);
    setSelectedAlarms([index]);
  };

  const handleSelectAll = () => {
    if (selectedAlarms.length === alarms.length) {
      setSelectedAlarms([]);
    } else {
      setSelectedAlarms(alarms.map((_, index) => index));
    }
  };
 
  return (
    
    <View style={styles.container}>
      {isAlarmScreenVisible && (
        <AlarmScreen
          alarmTime={currentAlarmTime}
          onSnooze={handleSnooze}
          onDismiss={handleDismiss}
        />
      )}
      <CustomAlarmModal visible={isModalVisible} onClose={handleCloseModal} onSave={handleSaveAlarm} alarmData={selectedAlarmData} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={styles.titleItem}>

        
        
        {isSelectionMode ? (
          <View style={styles.titleItem1}>
             <TouchableOpacity onPress={handleSelectAll}>
           <MaterialIcons name="select-all" size={22} />
         </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelSelection} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>⨉</Text>
          </TouchableOpacity>
          
          </View>
        ):(
<Text style={styles.title}>Alarms</Text>
        )}
       
      </View>
      <FlatList
        data={alarms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleAlarmPress(index)} onLongPress={() => handleLongPress(index)}>
            <View style={styles.alarmItem}>
              {isSelectionMode && (
                <TouchableOpacity onPress={() => toggleSelection(index)} style={styles.checkbox}>
                <MaterialCommunityIcons
                  name={selectedAlarms.includes(index) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  color={selectedAlarms.includes(index) ? 'black' : 'gray'}
                  size={22}
                  
                />
              </TouchableOpacity>
              )}
              <Text style={[styles.alarmContent, { color: item.enabled ? '#000' : '#B8B8B8' }]}>
                {item.time}
              </Text>
              <Switch
                style={styles.switch}
                value={item.enabled}
                trackColor={{ true: 'black' }}
                thumbColor={item.enabled ? 'white' : 'white'}
                onValueChange={async (value) => {
                  const updatedAlarms = alarms.map((alarm, i) =>
                    i === index ? { ...alarm, enabled: value } : alarm
                  );
                  if (value) {
                    scheduleNotification(item.date, index, "Sound 1");
                  } else {
                    await stopSound();
                    cancelNotification(index);
                  }
                  setAlarms(updatedAlarms);
                  saveAlarms(updatedAlarms);
                }}
              />
            </View>
            <Text style={{ fontSize: 14, marginTop: '-8%', padding: 5, marginLeft: "3%", color: item.enabled ? '#000' : '#B8B8B8' }}>
              {item.repeatDays && item.repeatDays.length > 0 ? item.repeatDays.join(', ') : 'No Repeat'}
            </Text>
          </TouchableOpacity>
        )}
      />
      {isSelectionMode ? (
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <MaterialIcons name="delete-outline" size={30} color="black" />
        </TouchableOpacity>
      ) : (
        <AddAlarm onPress={handleAddAlarmPress} /> // Fixed component name capitalization
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%',
  },
  checkbox: {
    marginRight: '-30%',
    marginLeft:10,
  },
  title: {
    fontSize: 20,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop:'5%',
  },
  titleItem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  timeText: {
    fontSize: 24,
    marginRight: 10,
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomColor: '#ccc',
    width: '95%',
  },
  alarmContent: {
    fontSize: 35,
    textAlign: 'left',
    marginLeft: 10,
  },
  switch: {
    // Adjust any specific styles for the Switch here if needed
  },
  deleteButton: {
    marginVertical: 10,
  },
  cancelButton: {
    // Styles for the cancel button
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight:'bold',
    marginRight:20,
  },
});
