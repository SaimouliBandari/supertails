import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import "../global.css";
import { useFonts } from "expo-font";
import Header from "@/components/header/header";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Gotham-Rounded-Light": require("../assets/fonts/Gotham-Rounded-Light.ttf"),
    "Gotham-Rounded-Medium": require("../assets/fonts/Gotham-Rounded-Medium.ttf"),
    "Gotham-Rounded-Bold": require("../assets/fonts/Gotham-Rounded-Bold.ttf"),
    "Lato-Light": require("../assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("../assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato/Lato-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
