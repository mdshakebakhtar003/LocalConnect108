import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import appStore from '../utils/appStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
      <Provider store={appStore}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
     
      <>
       <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
         <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="(worker)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(components)" options={{ headerShown: false }} />
        <Stack.Screen name="(workerprofile)" options={{ headerShown: false }} />
         <Stack.Screen name="(bookprofile)" options={{ headerShown: false }} />
         <Stack.Screen name="(booking)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
     
      </>
     
    </ThemeProvider>
     </Provider>
  );
}
