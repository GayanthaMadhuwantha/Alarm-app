import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Alarm',
          tabBarIcon: ({ color, focused }) => (
            
            <TabBarIcon name={focused ? 'alarm'  : 'alarm'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="countdown"
        options={{
          title: 'Countdown',
          tabBarIcon: ({ color, focused }) => (
            
            <TabBarIcon name={focused ? 'timer-sand'  : 'timer-sand'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Timer',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'timer-outline' : 'timer-outline'} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="clock"
        options={{
          title: 'Clock',
          tabBarIcon: ({ color, focused }) => (
            
            <TabBarIcon name={focused ? 'clock-outline'  : 'clock-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
