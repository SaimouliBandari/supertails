import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function AddressLayout() {
  return <>
      <Stack initialRouteName="addAddress" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="addAddress" options={{headerShown: false}}/>
        <Stack.Screen name="location" options={{headerShown: false}}/>

      </Stack>
    </>
}