import React, { useState, useEffect } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { getMusic } from '@/scripts/getMusic';

export default function AlarmSoundModal({ visible, onClose, onSelectSound }) {
  const [selectedSound, setSelectedSound] = useState(null);
  const [sound, setSound] = useState(null);

  const [audioFiles, setAudioFiles] = useState([
    { name: 'Sound 1' },
    { name: 'Sound 2' },
  ]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async (soundFile) => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleSelectSound = async (item) => {
    setSelectedSound(item);
    const soundFile = getMusic(item.name);

    if (soundFile) {
      await playSound(soundFile);
      onSelectSound(item);  // Optionally call onSelectSound without closing the modal
    } else {
      console.error('Sound file not found for:', item.name);
    }
  };

  const handleAddRingtone = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*', // Filter for audio files
      });

      if (result.type === 'success') {
        const newSound = { name: result.name, path: { uri: result.uri } };
        setAudioFiles([...audioFiles, newSound]);
      }
    } catch (error) {
      console.error('Error picking ringtone:', error);
    }
  };

  const handleClose = () => {
    if (sound) {
      sound.stopAsync();
      sound.unloadAsync();
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.titleItem1}>
            <Text style={styles.modalTitle}>Select Alarm Sound</Text>
          </View>
          <FlatList
            data={audioFiles}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectSound(item)} style={styles.soundItemContainer}>
                <View style={styles.radioButton}>
                  {selectedSound === item.name && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.soundItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.addItem} onPress={handleAddRingtone}>
            <Text style={styles.addItemicon}>+</Text>
            <Text style={styles.addItemitle}> Add Ringtone</Text>
          </TouchableOpacity>
          <View style={styles.titleItem1}>
            <Text></Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '1%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  soundItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    height: 17.5,
    width: 18,
    borderWidth:2,
    borderRadius:50,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height:9,
    width: 9,
    borderRadius: 50,
    backgroundColor: '#000',
    justifyContent: 'space-around',
  },
  soundItem: {
    fontSize: 16,
  },
  cancelButton: {
    color: 'black',
  },
  addItem:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: '1%'
  },
  addItemicon:{
    fontWeight:'bold',
    fontSize:23,
  },
  addItemtitle:{
    fontSize:16,
    fontWeight:'bold',
    marginLeft:5
  },
});
