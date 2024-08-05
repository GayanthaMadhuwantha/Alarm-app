const Music = {
    'Sound 1': require('@/assets/music/alarm_15.mp3'),
    'Sound 2': require('@/assets/music/best_alarm.mp3'),
  };
  
  const getMusic = (name) => Music[name];
  
  export { getMusic };
  