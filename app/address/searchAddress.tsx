import Header from "@/components/header/header";
import LocationPermission from "@/components/locationPermision";
import { GOOGLE_API_KEY } from "@/constants/variables";
import useGeoLocationStore from "@/store/geoLocationStore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";

//TODO align add address manually.

export default function SearchAddress() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { location, setLocation } = useGeoLocationStore()


  const onBackNavigation = () => {
    router.back();
  };

  const onSaveAddress = () => { };

  const onManualAddressEntry = () => {
    router.push("/address/addAddressManually");
  };

  const onLocationSelection = (location: any) => {
    // TODO Need to implement navigation


  };

  const fetchPlaces = async (text: string) => {
    setQuery(text);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&language=en&location=${location?.latitude},${location?.longitude}&radius=50000`;
    try {
      const response = await fetch(url);
      const data = await response.json();
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
    <SafeAreaView className="h-full ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={Platform.OS === "ios" ?  : 0}
        className="flex-1 flex-col relative"
      >
        <Header title="Add address" icon={icon} />
        <LocationPermission />
        <View className="h-[48px] shadow-white border-[1px] rounded-[16px] flex flex-row mx-[16px] mt-[14px]">
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

        <TouchableOpacity className="mt-[15px]">
          <View className="w-full h-[40px] flex flex-row items-center justify-between ps-[16px]">
            <View className="flex flex-row items-center justify-between">
              <View className="me-[5px]">
                <Image
                  source={require("../../assets/images/pin-location-primary.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
              <Text className="text-secondary font-gotham font-[350] text-[14px] leading-[16.8px]">
                Use current location
              </Text>
            </View>
            <View className="me-[5px] justify-self-end">
              <Image
                source={require("../../assets/images/arrow.png")}
                style={{ width: 24, height: 24 }}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View className="ps-[16px] pe-[26px] mt-[9px]">
          <View className=" border-b-[0.4px] border-[#00000033]"></View>
          <Text className="font-[325] text-[12px] leading-[14.4px] font-gotham mt-[18px]">
            SEARCH RESULTS
          </Text>
          <FlatList
            className="mt-[8px]"
            data={results}
            keyExtractor={(item: any) => item.place_id}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity onPress={() => onLocationSelection(item)}>
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
        <TouchableOpacity
          className="mt-[15px] bg-card h-[46px] w-full justify-self-end bottom-0"
          onPress={() => onManualAddressEntry()}
        >
          <View className="flex-1 flex flex-row items-center justify-center ps-[16px]">
            <View className="me-[5px]">
              <Image
                source={require("../../assets/images/pin-add.png")}
                style={{ width: 24, height: 24 }}
              />
            </View>
            <Text className="text-secondary font-gotham font-[350] text-[14px] leading-[16.8px]">
              Add address manually
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}