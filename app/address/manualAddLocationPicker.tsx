import AddressPlaceholder from "@/components/addressPlaceholder";
import Header from "@/components/header/header";
import LocationPermission from "@/components/locationPermision";
import { GOOGLE_API_KEY } from "@/constants/variables";
import { getPlaceDetails } from "@/services/location.api.service";
import useStore from '@/store/store';
import { generateAddress } from "@/utils/generator.service";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import classNames from "classnames";
import { Image } from "expo-image";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync, reverseGeocodeAsync } from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import type { Region } from "react-native-maps";
import MapView, { MapMarker, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

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
    // Added this extra functionality
    return "Not granted";
  }

  let location = await getCurrentPositionAsync({});

  return {
    latitude: +location.coords.latitude,
    longitude: +location.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  }

}

/**
 * A component for picking and confirming a location on a map.
 * 
 * This component provides functionality to:
 * - Display a map with a draggable marker
 * - Search for locations using Google Places API
 * - Use current device location
 * - Display address details
 * - Confirm selected location
 * 
 * @component
 * 
 * @example
 * ```tsx
 * <LocationPicker />
 * ```
 * 
 * @remarks
 * The component uses:
 * - expo-location for getting device location
 * - react-native-maps for map display
 * - Google Places API for location search
 * - Custom store for location state management
 * 
 * @state
 * - address: Selected address details
 * - region: Current map region coordinates
 * - query: Search input text
 * - results: Location search results
 * - isUserChangedLocation: Flag for user interaction with map
 * - showEnableModal: Controls visibility of location permission modal
 * 
 * @dependencies
 * - @expo/vector-icons
 * - expo-location
 * - react-native-maps
 * - Google Places API
 * 
 * @returns React component that renders a location picker interface with map, 
 * search functionality, and location confirmation controls
 */
export default function ManualAddressLocationPicker() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<MapMarker>(null);
  const searchRef = useRef<TextInput>(null);
  const [address, setAddress] = useState<any | null>(null);
  const { location, setLocationAndAddress } = useStore()
  const [region, setRegion] = useState<Region | null>(regionDataGenerator(location?.latitude, location?.longitude));
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isUserChangedLocation, setIsUserChangedLocation] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(true);

  useEffect(() => {
    if (location) {
      setRegion(regionDataGenerator(location.latitude, location.longitude));
      onRegionChange(location as Region, true);
    }
  }, [location]);

  const onBackNavigation = () => {
    router.back();
  };

  const onConformationNavigation = () => {
    router.push("/address/confirmLocation");
    setIsUserChangedLocation(false);
    setLocationAndAddress(region as Region, address);
  };

  const onLocationChangeRequest = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  const onOutOfFocus = () => {
    setQuery("");
    setResults([]);
  }


  const onRegionChange = (region: Region, isInitial?: any) => {
    console.log("onRegionChange >>> ", region, isUserChangedLocation);

    if (!isUserChangedLocation && isInitial !== true) {
      return;
    }

    reverseGeocodeAsync(region).then(([address]) => {
      console.log("reverseGeocodeAsync >>> ", address, "address");
      setAddress({
        name: address.name,
        latitude: region.latitude,
        longitude: region.longitude,
        formatted_address: generateAddress(address),
        address_components: [],
        place_id: null,
        plus_code: null,
        address_url: null
      })
    });
  };


  const onCurrentLocation = () => {
    setIsUserChangedLocation(true);
    getCurrentLocation().then((location) => {

      if (location == "Not granted") {
        setShowEnableModal(true)
        return
      }

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

  const getGeoCode = async (longitude: number, latitude: number) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("getGeoCode >>> ", data);
  }

  const fetchGeoCode = async (place_id: string) => {
    setIsUserChangedLocation(false);
    getPlaceDetails(place_id).then((data) => {

      setRegion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Move the map to the selected location
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
      }
      setAddress(data);
    })
  }

  /**
   * Fetches place predictions from the Google Places API based on the input text.
   * 
   * @param {string} text - The input text to search for place predictions.
   * @returns {Promise<void>} A promise that resolves when the fetch operation is complete.
   * 
   * @throws Will log an error to the console if the fetch operation fails.
   */
  const fetchPlaces = async (text: string) => {

    setQuery(text);
    let params = `&language=en&location=${location?.latitude},${location?.longitude}&radius=50000`
    if (!location?.latitude || !location?.longitude) {
      params = `&language=en`
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}${params}&radius=50000`;
    console.log("fetchPlaces >>> ", url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("fetchPlaces >>> ", data);
      setResults(data.predictions || []);
    } catch (error) {
      console.error(error);
    }
  };

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
        <Header title="Confirm location" icon={icon} />
        <View className="flex-1 w-full h-full" style={styles.container}>

          <View style={styles.autocompleteContainer} className="bg-transparent">
            <View style={{ width: 343 }} className="flex flex-row justify-center bg-[#FFFFFF] rounded-[16px] border-[1px] border-[#EAECF0] h-[48px]">
              <View className="pt-[16px] pe-[7.5px] ms-[16px]">
                <Image
                  source={require("../../assets/images/search.png")}
                  style={{ width: 18, height: 18 }}
                />
              </View>
              <TextInput
                ref={searchRef}
                className="flex-1"
                placeholder="Search area, street, name..."
                value={query}
                onChangeText={fetchPlaces}
              />
            </View>
            <View style={{ marginTop: -14, zIndex: -1, borderBottomEndRadius: 16, borderBottomStartRadius: 16, width: 343, backgroundColor: '#FFF6F7', height: 64 }}>

              <LocationPermission showEnableModal={showEnableModal} styles={{ borderBottomEndRadius: 16, borderBottomStartRadius: 16, marginTop: 14, display: 'flex', justifyContent: 'center', maxWidth: 343 }} onCloseEv={() => { setShowEnableModal(false) }} />
            </View>
            <FlatList
              data={results}
              className="bg-[#FFFFFF] rounded-[16px] mt-[2px] max-h-[200px] w-[360px]"
              contentContainerClassName={classNames(results.length ? "px-[10px] py-[5px]" : null)}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity onPress={() => fetchGeoCode(item.place_id)}>
                    <View className="h-[69px] py-[10px]">
                      <View className="flex flex-row">
                        <Image
                          source={require("../../assets/images/pin-location.png")}
                          style={{ height: 24, width: 24 }}
                        />
                        <View className="ms-[13px]">
                          <Text className="font-gotham text-[14px] font-[350] leading-[16.8px] text-primary mb-[3px]">
                            {item.structured_formatting.main_text}
                          </Text>

                          <Text className="font-lato text-[12px] font-[400] leading-[16.2px] ">
                            {item.structured_formatting.secondary_text}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            />
          </View>

          <View style={styles.currentLocationButtonContainer} className="bg-transparent">
            <TouchableOpacity
              className="bg-card rounded-[6px] flex justify-center items-center w-[187px] h-[39px] px-[20px] pt-[10px] pb-[9px] border-[0.6px] border-primary shadow-drop-shadow"
              onPress={onCurrentLocation}
              style={{ height: 39, width: 187, padding: 10 }}
            >
              <View className="flex flex-row items-center justify-between">
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
          </View>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
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
            showsCompass={true}
            showsMyLocationButton={true}
            onPanDrag={() => (setIsUserChangedLocation(true), onOutOfFocus())}
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
                {/* <Image
                  source={require("@/assets/images/marker-ellipse.png")}
                  style={{ width: 38, height: 38 }}
                /> */}
                <View className="flex flex-row justify-center items-center bg-[#DAFF6F] w-[38px] h-[38px] rounded-full opacity-[50%]">
                  <View className="bg-[#1F2937] w-[12px] h-[12px] rounded-full"></View>
                </View>
              </View>
            </Marker>
          </MapView>
          <View className="h-[145px] bg-card flex flex-col justify-center items-center">
            <AddressPlaceholder onChange={onLocationChangeRequest} name={address?.name} address={address?.formatted_address} />
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
    </SafeAreaView >
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
    left: 0,
    right: 0,
    zIndex: 100,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  currentLocationButtonContainer: {
    position: "absolute",
    bottom: 157,
    left: 0,
    right: 0,
    zIndex: 1,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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


