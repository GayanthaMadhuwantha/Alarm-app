import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import WorldTime from "@/components/Worldtime";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [worldClock, setWorldClock] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const modalVisible = () => {
    setWorldClock(true);
  }

  const closeModal = () => {
    setWorldClock(false);
  }

  return (
    <View style={styles.container}>
      <WorldTime visible={worldClock} onClose={closeModal} />
      <View style={styles.localtime}>
        <Text style={styles.localclock}>{time.toLocaleTimeString()}</Text>
      </View>
      <TouchableOpacity onPress={modalVisible}>
        <Fontisto name="world-o" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  localtime: {
    marginBottom: 20,
  },
  localclock: {
    fontSize: 48,
  },
});
