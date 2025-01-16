import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function AddressLayout() {
  return (
    <>
      <Stack
        initialRouteName="searchAddress"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="searchAddress" options={{ headerShown: false }} />
        <Stack.Screen name="location" options={{ headerShown: false }} />
        <Stack.Screen name="confirmLocation" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
