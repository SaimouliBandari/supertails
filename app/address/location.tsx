import Header from "@/components/header/header";
import { GOOGLE_API_KEY } from "@/constants/variables";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import AddressPlaceholder from "@/components/addressPlaceholder";
import { reverseGeocodeAsync, requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);


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
    console.log(region);
    
    // getGeoCode(region.longitude, region.latitude);
    reverseGeocodeAsync(region).then(([address]) => {
      console.log(address, "address");
      setAddress({
        name: address.streetNumber,
        latitude: region.latitude,
        longitude: region.longitude,
        formatted_address:generateAddress(address), 
        address_components:[],
        place_id: null,
        plus_code:null,
        address_url:null 
      })
      // setAddress(address[0])
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

  const getGeoCode = async (longitude:number, latitude:number) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data.result));
  }

  const fetchGeoCode = async (place_id: string) => {
    // https://maps.googleapis.com/maps/api/place/details/json?place_id=PLACE_ID&key=YOUR_API_KEY

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_API_KEY}`;
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    console.log(url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { lat, lng } = data.result.geometry.location;
      const formatted_address = data.result.formatted_address;
      const { name, address_components, place_id, plus_code, url: address_url } = data.result;
      console.log(JSON.stringify({ lat, lng, formatted_address, name, address_components, place_id, plus_code, address_url }));
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
      setAddress({ latitude:lat, longitude: lng, formatted_address, name, address_components, place_id, plus_code, address_url });
    } catch (error) {
      console.error(error);
    }
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
    console.log(url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.predictions[0]);

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
        <Header title="Select delivery location" icon={icon} />
        <View className="flex-1 w-full h-full" style={styles.container}>
          {/* <GooglePlacesAutocomplete
            ref={searchRef}
            placeholder="Search area, street, name..."
            fetchDetails={true}
            enableHighAccuracyLocation={true}
            nearbyPlacesAPI="GooglePlacesSearch"
            onPress={(data, details: any) => {
              // Extract the location details
              const { lat, lng } = details.geometry.location;
              console.log(lat, lng);
              
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
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.textInput,
            }}
          /> */}
          <View style={styles.autocompleteContainer} className="bg-transparent">
            <View className="flex flex-row justify-center w-[334px] bg-[#FFFFFF] rounded-[16px] border-[1px] border-[#EAECF0] h-[48px]">
              <View className="pt-[16px] pe-[7.5px] ms-[16px]">
                <Image
                  source={require("../../assets/images/search.png")}
                  style={{ width: 18, height: 18 }}
                />
              </View>
              <TextInput
                className="flex-1"
                placeholder="Search area, street, name..."
                value={query}
                onChangeText={fetchPlaces}
              />
            </View>
            <FlatList
              data={results}
              className="bg-[#FFFFFF] rounded-[16px] mt-[2px] max-h-[200px] w-[334px]"
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

          <View>
            
          </View>
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
    left: 0,
    right: 0,
    zIndex: 1,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

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


