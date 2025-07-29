import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RLayout() {
  const colorScheme = useColorScheme();
 

 

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      <>
       <StatusBar hidden={true} />
      <Stack>
       
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(Components)" options={{ headerShown: false }} />
        <Stack.Screen name="(workerprofile)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      </>
    
    </ThemeProvider>
  );
}
