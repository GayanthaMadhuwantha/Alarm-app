import React, { useEffect, useState, useCallback } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const timeZones = [
  { label: "New York", timeZone: "America/New_York" },
  { label: "London", timeZone: "Europe/London" },
  { label: "Tokyo", timeZone: "Asia/Tokyo" },
  { label: "Chennai", timeZone: "Asia/Kolkata" },
  { label: "Kolkata", timeZone: "Asia/Kolkata" },
  { label: "Mumbai", timeZone: "Asia/Kolkata" },
  { label: "New Delhi", timeZone: "Asia/Kolkata" },
  { label: "Kathmandu", timeZone: "Asia/Kathmandu" },
  { label: "Astana", timeZone: "Asia/Almaty" },
  { label: "Bonaire", timeZone: "America/Kralendijk" },
  { label: "Sint Eustatius and Saba", timeZone: "America/Kralendijk" },
 { label: "Sarajevo", timeZone: "Europe/Sarajevo" },
  { label: "Gaborone", timeZone: "Africa/Gaborone" },
  { label: "Cayman Islands", timeZone: "America/Cayman" },
  { label: "Detroit", timeZone: "America/Detroit" },
  { label: "Eirunepe", timeZone: "America/Eirunepe" },
  { label: "Los Angeles", timeZone: "America/Los_Angeles" },
  { label: "Sydney", timeZone: "Australia/Sydney" },
  { label: "Beijing", timeZone: "Asia/Shanghai" },
  { label: "Paris", timeZone: "Europe/Paris" },
  { label: "Berlin", timeZone: "Europe/Berlin" },
  { label: "Moscow", timeZone: "Europe/Moscow" },
  { label: "Cairo", timeZone: "Africa/Cairo" },
  { label: "Johannesburg", timeZone: "Africa/Johannesburg" },
  { label: "Sao Paulo", timeZone: "America/Sao_Paulo" },
  { label: "Mexico City", timeZone: "America/Mexico_City" },
  { label: "Bangkok", timeZone: "Asia/Bangkok" },
  { label: "Seoul", timeZone: "Asia/Seoul" },
  { label: "Hong Kong", timeZone: "Asia/Hong_Kong" },
  { label: "Singapore", timeZone: "Asia/Singapore" },
  { label: "Dubai", timeZone: "Asia/Dubai" },
  { label: "Kuala Lumpur", timeZone: "Asia/Kuala_Lumpur" },
  { label: "Istanbul", timeZone: "Europe/Istanbul" },
  { label: "Tel Aviv", timeZone: "Asia/Tel_Aviv" },
  { label: "Athens", timeZone: "Europe/Athens" },
  { label: "Rome", timeZone: "Europe/Rome" },
  { label: "Barcelona", timeZone: "Europe/Madrid" },
  { label: "Amsterdam", timeZone: "Europe/Amsterdam" },
  { label: "Stockholm", timeZone: "Europe/Stockholm" },
  { label: "Copenhagen", timeZone: "Europe/Copenhagen" },
  { label: "Helsinki", timeZone: "Europe/Helsinki" },
  { label: "Oslo", timeZone: "Europe/Oslo" },
  { label: "Zurich", timeZone: "Europe/Zurich" },
  { label: "Geneva", timeZone: "Europe/Zurich" },
  { label: "Vienna", timeZone: "Europe/Vienna" },
  { label: "Prague", timeZone: "Europe/Prague" },
  { label: "Budapest", timeZone: "Europe/Budapest" },
  { label: "Warsaw", timeZone: "Europe/Warsaw" },
  { label: "Kiritimati", timeZone: "Pacific/Kiritimati" },
  { label: "Midway islands", timeZone: "Pacific/Midway" },
  { label: "Honolulu", timeZone: "Pacific/Honolulu" },
];

export default function WorldTime({ visible, onClose }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = useCallback((date, timeZone) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone
    }).format(date);
  }, []);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity style={styles.timeZoneContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.clock}>{formatTime(time, item.timeZone)}</Text>
    </TouchableOpacity>
  ), [time, formatTime]);

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={timeZones}
            keyExtractor={(item) => item.label}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.timecontent}
          />
          <View style={styles.titleItem1}>
            <Text></Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ textAlign: 'right' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width:'95%',
    backgroundColor: 'white',
    maxHeight:'70%',
    borderRadius:8,
  },
  timeZoneContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop:'5%',
    padding:10,
  },
  label:{
    fontWeight:'400',
    fontSize:16,

  },
  timecontent:{
    width:'90%',
    marginLeft:'5%',
  },
  clock:{
    color:'#B8B8B8',
    fontSize:16,
  },
  titleItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginTop:'5%',
    width:'94%',
    marginBottom:20,
    

  },
});