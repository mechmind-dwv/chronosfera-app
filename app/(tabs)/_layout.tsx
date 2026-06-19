import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerStyle: { backgroundColor: '#0f172a' },
      headerTintColor: '#38bdf8',
      headerTitleStyle: { fontWeight: 'bold' },
      tabBarStyle: { backgroundColor: '#0f172a', borderTopWidth: 0 },
      tabBarActiveTintColor: '#38bdf8',
      tabBarInactiveTintColor: '#475569'
    }}>
      <Tabs.Screen name="index" options={{ title: 'Pulso Solar' }} />
      <Tabs.Screen name="theory" options={{ title: '4ª Ley' }} />
    </Tabs>
  );
}
