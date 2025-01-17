import AddressPlaceholder from "@/components/addressPlaceholder";
import Header from "@/components/header/header";
import { GOOGLE_API_KEY } from "@/constants/variables";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { reverseGeocodeAsync, requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import type { Region } from "react-native-maps";
import MapView, { MapMarker, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import useGeoLocationStore from '@/store/geoLocationStore';
import { generateAddress } from "@/utils/generator.service";

export function regionDataGenerator(latitude: any = 0, longitude: any = 0) {
  return {
    latitude: +latitude,
    longitude: +longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

}

async function getCurrentLocation() {

  let { status } = await requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return;
  }

  let location = await getCurrentPositionAsync({});

  return {
    latitude: +location.coords.latitude,
    longitude: +location.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  }

}

export default function LocationPicker() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<MapMarker>(null);
  const searchRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [address, setAddress] = useState<any | null>(null);
  const { location, setLocationAndAddress } = useGeoLocationStore()
  const [region, setRegion] = useState<Region | null>(regionDataGenerator(location?.latitude, location?.longitude));

  useEffect(() => {
    if (location) {
      setRegion(regionDataGenerator(location.latitude, location.longitude));
      onRegionChange(location as Region);
    }
  }, [location]);

  const onBackNavigation = () => {
    router.back();
  };

  const onConformationNavigation = () => {
    router.push("/address/confirmLocation");
    setLocationAndAddress(region as Region, address);
  };

  const onLocationChangeRequest = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  const onRegionChange = (region: Region) => {
    reverseGeocodeAsync(region).then((address) => {
      setAddress(address[0])
    });
  };

  const onCurrentLocation = () => {
    getCurrentLocation().then((location) => {
      if (location) {
        setRegion(regionDataGenerator(location.latitude, location.longitude));
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          });
        }
      }
    })
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
        <Header title="Select delivery location" icon={icon} />
        <View className="flex-1 w-full h-full" style={styles.container}>
          <GooglePlacesAutocomplete
            ref={searchRef}
            placeholder="Search area, street, name..."
            fetchDetails={true}
            onPress={(data, details: any) => {
              // Extract the location details
              const { lat, lng } = details.geometry.location;

              // Update the map's region
              setRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });

              // Move the map to the selected location
              if (mapRef.current) {
                mapRef.current.animateToRegion({
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                });
              }
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
              radius: 50000,
              location: `${region?.latitude},${region?.longitude}`,
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.textInput,

            }}
          />

          <TouchableOpacity
            className="bg-card rounded-[6px] flex justify-center items-center"
            onPress={onCurrentLocation}
            style={styles.currentLocationButton}
          >
            <View className="flex flex-row items-center justify-between ps-[20px] ">
              <View className="me-[4px]">
                <Image
                  source={require("../../assets/images/gps.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
              <Text className="text-secondary font-gotham font-[350] text-[14px] leading-[14.4px]">
                Use current location
              </Text>
            </View>
          </TouchableOpacity>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            // provider="google"
            region={
              {
                latitude: +(location?.latitude || 0),
                longitude: +(location?.longitude || 0),
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              } as unknown as Region
            }
            onRegionChange={(ev) => setRegion(ev)}
            onRegionChangeComplete={onRegionChange}
            showsMyLocationButton={true}
            showsCompass={true}
            showsScale={true}
            showsTraffic={true}
            showsBuildings={true}
            showsIndoors={true}
            showsPointsOfInterest={true}
            showsIndoorLevelPicker={true}
          >
            <Marker
              ref={markerRef}
              coordinate={{
                latitude: +(region?.latitude || 0),
                longitude: +(region?.longitude || 0),
              }}
            >
              <View className="flex flex-col justify-center items-center">
                <View className="w-[167px] h-[44px] bg-[#1F2937] rounded-[4px] flex justify-center items-center">
                  <Text className="text-[#F5F5F5] font-gotham font-[350] text-[10px] text-center leading-[12px]">
                    Order will be delivered here
                  </Text>
                  <Text className="text-[#F5F5F5] font-loto font-[400] text-[10px] text-center leading-[12px]">
                    Move the pin to change location
                  </Text>
                </View>
                <Image
                  source={require("@/assets/images/arrow-down.png")}
                  style={{ width: 20, height: 20, margin: -10 }}
                />
              </View>
            </Marker>
          </MapView>
          <View className="h-[145px] bg-card flex flex-col justify-center items-center">
            <AddressPlaceholder onChange={onLocationChangeRequest} name={address?.name} address={generateAddress(address)} />
            <TouchableOpacity
              className="bg-primary w-[343px] h-[35px] rounded-[6px] flex justify-center items-center"
              onPress={() => onConformationNavigation()}
            >
              <Text className="text-primary-foreground font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
                Confirm location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  autocompleteContainer: {
    position: "absolute",
    top: 16,
    left: 40,
    right: 40,
    zIndex: 1,
    width: 355,
    height: 48
  },
  currentLocationButton: {
    position: "absolute",
    bottom: 157,
    left: 110,
    right: 110,
    zIndex: 1,
    minWidth: 187,
    height: 48,
    borderColor: "#EF6C00",
    borderWidth: 0.6,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 9,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#EAECF0",
  },
});
