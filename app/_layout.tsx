import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import '../global.css'
import { useFonts } from "expo-font";
import Header from "@/components/header/header";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {

  const [loaded] = useFonts({
    gotham: require("../assets/fonts/Gotham-Rounded-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return <SafeAreaProvider>
    <Stack initialRouteName="index" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      {/* <Stack.Screen name="/address/addAddress" options={{headerShown: true}}/> */}
    </Stack>
  </SafeAreaProvider>
}
