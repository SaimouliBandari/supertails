import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

/**
 * Root layout component for the application.
 * Handles font loading and initial app setup.
 * 
 * @component
 * @returns {JSX.Element | null} Returns the root layout structure with SafeAreaProvider and Stack navigator,
 *                               or null while fonts are loading
 * 
 * @remarks
 * This component:
 * - Loads custom fonts (Gotham Rounded and Lato variants)
 * - Manages the splash screen visibility
 * - Provides safe area context for the app
 * - Sets up the basic navigation stack
 * 
 * The component will return null until all fonts are loaded, at which point
 * it will hide the splash screen and render the main navigation structure.
 */
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
