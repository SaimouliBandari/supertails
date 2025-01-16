import Header from "@/components/header/header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import type { Region } from "react-native-maps";
import MapView, { Marker, } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";


function radiansToDegrees(angle: number) {
  return angle * (180 / Math.PI);
}

function degreesToRadians(angle: number) {
  return angle * (Math.PI / 180);
}

function latitudesToKM(latitudes: number) {
  return latitudes * 110.574;
}

function kMToLatitudes(km: number) {
  return km / 110.574;
}

function longitudesToKM(longitudes: number, atLatitude: number) {
  return longitudes * 111.32 * Math.cos(degreesToRadians(atLatitude));
}

function kMToLongitudes(km: number, atLatitude: number) {
  return (km * 0.0089831) / Math.cos(degreesToRadians(atLatitude));
}

export default function LocationPicker() {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const [region, setRegion] = useState<Region | null>(null);
  // const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // const [location, setLocation] = useState<Location.LocationObject | null>(
  //   null
  // );

  // useEffect(() => {
  //   async function getCurrentLocation() {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     console.log(location);
  //     setRegion({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.1,
  //       longitudeDelta: 0.1,
  //     });
  //   }

  //   getCurrentLocation();
  // }, []);

  const onBackNavigation = () => {
    router.back();
  };

  const onConformationNavigation = () => {
    router.push('/address/selectAddress')
  }

  const icon = (
    <TouchableOpacity onPress={onBackNavigation}>
      <View className="h-[40px] w-[40px] flex flex-col justify-center items-center me-[4px]">
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={24}
          color="black"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View className="h-full">
        <Header title="Confirm Location" icon={icon} />
        <View className="flex-1 w-full h-full">
          <View className="h-[157px]">
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              // initialRegion={{
              //   latitude: 37.78825,
              //   longitude: -122.4324,
              //   latitudeDelta: 0.0922,
              //   longitudeDelta: 0.0421,
              // }}
              region={region as Region}
              onRegionChange={(ev) => setRegion(ev)
              }
              showsUserLocation
            ></MapView>
          </View>
              
        </View>
      </View>
    </SafeAreaView>
  );
}
