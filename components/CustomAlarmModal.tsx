import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, TextInput, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import AlarmSoundModal from '@/components/AlarmSoundModal';
import Alarmlabel from '@/components/AlarmLabel';
import RepeatAlarm from './ReapeatAlarm';



export default function CustomAlarmModal({ visible, onClose, onSave, alarmData }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [alarmSound, setAlarmSound] = useState('');
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);
  const [isSoundModalVisible, setIsSoundModalVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSound, setSelectedSound] = useState(null);
  const [defaultDateTime, setDefaultDateTime] = useState(new Date());


  useEffect(() => {
    if (visible) {
      setSelectedTime(alarmData?.time || "");
      setSelectedDays(alarmData?.repeatDays || []);
      setSelectedSound(alarmData?.sound || null);
      setIsVibrationEnabled(alarmData?.vibrationEnabled ?? true);
      setLabel(alarmData?.label || '');
    }
  }, [visible, alarmData]);

  const handleConfirm = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock
    const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

    setSelectedTime(formattedTime);
    setDatePickerVisibility(false);
  };

  const handleSelectSound = (sound) => {
    setAlarmSound(sound.name);
    setSelectedSound(sound);
    setIsSoundModalVisible(false);
  };

  const handleAlarmPress = () => { 
    setDefaultDateTime(new Date());
      setDatePickerVisibility(true)
      
  };
  const handleLabelUpdate = (newLabel) => {
    setLabel(newLabel);
    setIsLabelModalVisible(false);
  };

  const handleRepeatSave = (days) => {
    setSelectedDays(days);
    setRepeatModalVisible(false);
  };

 

  const handleSaveAlarm = () => {
    const now = new Date();
    const [time, period] = selectedTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    // Adjust hours for AM/PM
    let adjustedHours = hours;
    if (period === 'PM' && hours < 12) {
      adjustedHours += 12;
    } else if (period === 'AM' && hours === 12) {
      adjustedHours = 0;
    }

    // Create the alarm date
    const alarmDate = new Date(
      now.getFullYear(), 
      now.getMonth(), 
      now.getDate(), 
      adjustedHours, 
      minutes
    );

    // Check if the alarm time is in the past and adjust to the next day if necessary
    if (alarmDate <= now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const alarmData = {
      id: alarmData ? alarmData.id : new Date().getTime(),
      time: selectedTime,
      date: alarmDate,
      repeatDays: selectedDays,
      sound: alarmSound,
      label: label,
      vibrationEnabled: isVibrationEnabled,
      enabled: true,
    };

    onSave(alarmData);
    onClose();
  };
  

  

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
                    {selectedTime ? (
              <TouchableOpacity onPress={() => handleAlarmPress()}>
                <Text style={styles.selectedTime}>{selectedTime}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => setDatePickerVisibility(true)}>
                <Text style={styles.title}>
                  <Text style={styles.icon}>+{" "}</Text> Pick time
                </Text>
              </TouchableOpacity>
            )}



       <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            date={defaultDateTime}
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />

<TouchableOpacity style={styles.titleItem} onPress={() => setRepeatModalVisible(true)}>
<MaterialIcons name="content-copy" size={20} color="black" />
        <Text style={styles.options}>Repeat</Text>
        <Text style={{ marginLeft: 10, fontSize: 16, color: '#B8B8B8' }}>
          {selectedDays.length > 0 ? selectedDays.join(', ') : 'Once'}
        </Text>
      </TouchableOpacity>

      <RepeatAlarm
        visible={isRepeatModalVisible}
        onClose={() => setRepeatModalVisible(false)}
        onSave={handleRepeatSave}
      />
                  <TouchableOpacity style={styles.titleItem} onPress={() => setIsSoundModalVisible(true)}>
                    <MaterialCommunityIcons name="bell-ring-outline" size={20} color="black" />
                    <Text style={styles.options}>Alarm Sound   <Text style={{marginLeft:10,fontSize:16,color:'#B8B8B8'}}>{selectedSound?.name || 'Sound 1'}</Text></Text>
                    </TouchableOpacity>
                    <AlarmSoundModal
                visible={isSoundModalVisible}
                onClose={() => setIsSoundModalVisible(false)}
                onSelectSound={handleSelectSound}
              />

          
          <TouchableOpacity style={styles.titleItem} onPress={() => setIsLabelModalVisible(true)}>
            <MaterialIcons name="label-outline" size={20} color="black" />
            <Text style={styles.options}>Label</Text>
            <Text style={{marginLeft:10,fontSize:16,color:'#B8B8B8'}}>{label ? label : 'Label'}</Text>
            </TouchableOpacity>
            <Alarmlabel visible={isLabelModalVisible} onClose={() => setIsLabelModalVisible(false)} onSave={handleLabelUpdate} />
            

          <View style={styles.titleItem}>
            <MaterialIcons name="vibration" size={20} color="black" />
            <Text style={styles.options}>Vibration</Text>
            <Switch value={isVibrationEnabled} onValueChange={setIsVibrationEnabled}
              trackColor={{ true: 'black' }}
              thumbColor={isVibrationEnabled ? 'white' : 'white'}
            /></View>
          <View style={styles.titleItem1}>
            <TouchableOpacity onPress={onClose} ><Text style={styles.options}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleSaveAlarm} disabled={!selectedTime}><Text style={[styles.options, { color: selectedTime ? 'black' : '#B8B8B8' }]}>Add</Text></TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles=StyleSheet.create({
titleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop:'10%',

  },
  titleItem1: {
    flexDirection: 'row',
    justifyContent:'space-between',
    width: '95%',
    marginTop:'5%',
    marginLeft:'-5%',


  },
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

overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  options:{
    marginLeft:10,
    fontSize:16,
  },
  selectedTime:{
fontSize:35,
  },
  
});

