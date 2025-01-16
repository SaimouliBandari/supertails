import AddressPlaceholder from "@/components/addressPlaceholder";
import Header from "@/components/header/header";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import type { Region } from "react-native-maps";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { regionDataGenerator } from "./location";
import useGeoLocationStore from "@/store/geoLocationStore";
import { generateAddress } from "@/utils/generator.service";

export default function LocationPicker() {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const { location: region, address } = useGeoLocationStore()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      address: "",
      pincode: "",
      city: "",
      state: "",
      houseFlat: "",
      buildingNo: "",
      roadName: "",
      receiverName: "",
      receiverPhone: "",
      petName: "",
    },
  });

  const onBackNavigation = () => {
    router.back();
  };

  const onConformationNavigation = () => {
    router.push("/address/selectAddress");
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
    <SafeAreaView className="flex-1 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >

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
                region={regionDataGenerator((region as any).latitude, (region as any).longitude)}

              ></MapView>
            </View>
            <View className="bg-card flex flex-1">
              <View className="h-[91px] py-[16px] border-b-[0.4px] border-b-border">
                <AddressPlaceholder onChange={() => { router.back() }} address={generateAddress(address)} name={address.name} />
              </View>
              <ScrollView className="px-[12px]">
                <View className="mt-[16px]">
                  <Text className="font-gotham text-start font-[325] text-primary text-[14px] leading-[16.8px] mb-[12px]">
                    Enter complete address
                  </Text>
                  <View>
                    <View className="border border-gray-300 h-[40px] mb-[8px] rounded-[8px]  flex flex-row items-center">
                      {/* <Ionicons name="home-outline" size={16} color={"black"} /> */}
                      <View className="py-[12px] ps-[10px]">
                        <Image
                          source={require("../../assets/images/house.svg")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                      <Controller
                        control={control}
                        name="houseFlat"
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            className=" flex-1 h-[48px] p-3  rounded-[16px] placeholder:text-[12px] placeholder:text-placeholder"
                            placeholder="House No./Flat no."
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                      />
                    </View>

                    <View className="border border-gray-300 h-[40px] mb-[8px] rounded-[8px]  flex flex-row items-center">
                      <View className="py-[12px] ps-[10px]">
                        <Image
                          source={require("../../assets/images/building.svg")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                      <Controller
                        control={control}
                        name="buildingNo"
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            className=" flex-1 h-[48px] p-3  rounded-[16px] placeholder:text-[12px] placeholder:text-placeholder"
                            placeholder="Building Name"
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                      />
                    </View>

                    <View className="border border-gray-300 h-[40px] mb-[8px] rounded-[8px]  flex flex-row items-center">
                      <View className="py-[12px] ps-[10px]">
                        <Image
                          source={require("../../assets/images/landmark.png")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                      <Controller
                        control={control}
                        name="roadName"
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            className=" flex-1 h-[48px] p-3 rounded-[16px] placeholder:text-[12px] placeholder:text-placeholder"
                            placeholder="Landmark"
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                      />
                    </View>
                  </View>
                </View>

                <View className="mt-[13px]">
                  <Text className="font-gotham font-[350] text-[16px] leading-[19.2px] mb-[12px]">
                    Save address as
                  </Text>
                  <View className="flex flex-row gap-2">
                    <View className="w-[68px] h-[26px] rounded-[4px] border-[0.4px] flex flex-row justify-center items-center border-outline">
                      <Image
                        source={require("../../assets/images/house-solid.png")}
                        style={{ width: 18, height: 18 }}
                      />
                      <Text className="font-gotham py-[6px] ps-[2px] font-[325] text-[12px] leading-[14.4px]">
                        Home
                      </Text>
                    </View>
                    <View className="w-[68px] h-[26px] rounded-[4px] border-[0.4px] flex flex-row justify-center items-center border-outline">
                      <Image
                        source={require("../../assets/images/office-solid.png")}
                        style={{ width: 18, height: 18 }}
                      />
                      <Text className="font-gotham py-[6px] ps-[2px] font-[325] text-[12px] leading-[14.4px]">
                        Office
                      </Text>
                    </View>
                    <View className="w-[68px] h-[26px] rounded-[4px] border-[0.4px] flex flex-row justify-center items-center border-outline">
                      <Image
                        source={require("../../assets/images/others-solid.png")}
                        style={{ width: 18, height: 18 }}
                      />
                      <Text className="font-gotham py-[6px] ps-[2px] font-[325] text-[12px] leading-[14.4px]">
                        Others
                      </Text>
                    </View>
                  </View>
                  <View className="mt-[15px]">
                    <View className="border border-gray-300 h-[40px] mb-[8px] rounded-[8px]  flex flex-row items-center">
                      {/* <Ionicons name="home-outline" size={16} color={"black"} /> */}
                      <View className="py-[12px] ps-[10px]">
                        <Image
                          source={require("../../assets/images/house.svg")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                      <Controller
                        control={control}
                        name="houseFlat"
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            className=" flex-1 h-[48px] p-3  rounded-[16px] placeholder:text-[12px] placeholder:text-placeholder"
                            placeholder="House No./Flat no."
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                      />
                    </View>

                    <View className="border border-gray-300 h-[40px] mb-[8px] rounded-[8px]  flex flex-row items-center">
                      <View className="py-[12px] ps-[10px]">
                        <Image
                          source={require("../../assets/images/building.svg")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                      <Controller
                        control={control}
                        name="buildingNo"
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            className=" flex-1 h-[48px] p-3  rounded-[16px] placeholder:text-[12px] placeholder:text-placeholder"
                            placeholder="Building Name"
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                      />
                    </View>

                    <View className="border border-gray-300 h-[40px] mb-[8px] rounded-[8px]  flex flex-row items-center">
                      <View className="py-[12px] ps-[10px]">
                        <Image
                          source={require("../../assets/images/landmark.png")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                      <Controller
                        control={control}
                        name="roadName"
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            className=" flex-1 h-[48px] p-3 rounded-[16px] placeholder:text-[12px] placeholder:text-placeholder"
                            placeholder="Landmark"
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                      />
                    </View>
                  </View>
                </View>
                <View className="w-full mt-[13px]">
                  <TouchableOpacity
                    className="bg-primary h-[40px] rounded-[6px] flex justify-center items-center"
                    onPress={() => 0}
                  >
                    <Text className="text-primary-foreground font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
                      Save address
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
