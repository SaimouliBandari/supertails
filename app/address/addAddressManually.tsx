import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import Header from "@/components/header/header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import { Controller, useForm, useWatch } from "react-hook-form";
import { getAddressesFromZipCode, getPlaceDetails } from "@/services/location.api.service";
import { GOOGLE_API_KEY } from "@/constants/variables";
import useStore from "@/store/store";

/**
 * A component for manually adding a new address with user details.
 * 
 * This component provides a form interface for users to input:
 * - Address details (pincode, city, state, house/flat number, building number, road name)
 * - Receiver's details (name, phone number, pet name)
 * 
 * Features:
 * - Auto-fills city and state based on pincode input
 * - Form validation using react-hook-form
 * - Google Places API integration for address verification
 * - Location coordinates storage for delivery
 * - Option to set as default address
 * - Keyboard avoiding behavior for better mobile UX
 * 
 * @component
 * @example
 * ```tsx
 * <AddAddressManually />
 * ```
 * 
 * @returns {JSX.Element} A form interface for adding a new address
 * 
 * @dependencies
 * - expo-router
 * - react-hook-form
 * - expo-checkbox
 * - @expo/vector-icons
 * 
 * @uses
 * - useStore - For state management
 * - getAddressesFromZipCode - API service for pincode validation
 * - getPlaceDetails - Google Places API service
 */
export default function AddAddressManually() {
  const router = useRouter();
  const { setLocationAndAddress, setDeliveryAddress } = useStore();
  const { control, handleSubmit, reset, watch, getValues } = useForm({
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

  const [pincode] = watch(["pincode"]);

  useEffect(() => {

    reset({ "address": "", "buildingNo": "Na", "city": "Visakhapatnam", "houseFlat": "18-214/1", "petName": "Simba", "pincode": "530027", "receiverName": "Mouli", "receiverPhone": "8985521158", "roadName": "Bharath nagar 7th lane", "state": "Andhra Pradesh" })

  }, [])

  useEffect(() => {
    if (pincode) {
      getAddressesFromZipCode(pincode).then((data) => {
        console.log("Addresses:", data);

        if (data && data.length > 0) {
          const address = data[0];
          reset({
            ...getValues(),
            pincode: address.pincode,
            city: address.city,
            state: address.state,
          });
        } else {
          reset({
            ...getValues(),
            city: "",
            state: "",
          });
        }

      })
    }
  }, [pincode])

  const onBackNavigation = () => {
    router.back();
  };

  /**
   * Fetches place predictions from the Google Places API based on the input text.
   * 
   * @param {string} text - The input text to search for place predictions.
   * @returns {Promise<void>} A promise that resolves when the fetch operation is complete.
   * 
   * @throws Will log an error to the console if the fetch operation fails.
   */
  const fetchPlaces = async (text: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&language=en&key=${GOOGLE_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      return data?.predictions?.[0] || null;
    } catch (error) {
      console.error(error);

    }
  };

  async function onSaveAddress(address: any) {
    console.log(address, "<<<< Address");
    const searQuery = `${address.pincode},${address.city},${address.state},${address.houseFlat}`;
    const predictedPlace = await fetchPlaces(searQuery);
    const predictedCoordinates = await getPlaceDetails(predictedPlace.place_id)
    // console.log(predictedPlace, "<<<< PredictedPlace", predictedCoordinates, "<<<< predictedCoordinates");
    setLocationAndAddress({
      latitude: predictedCoordinates.latitude,
      longitude: predictedCoordinates.longitude,
      longitudeDelta: 0.001,
      latitudeDelta: 0.001,
    }, predictedCoordinates);

    setDeliveryAddress({
      ...address
    }, { ...address })

    router.push("/address/confirmManualLocation")
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="h-full">
          <Header title="Add address" icon={icon} />
          <ScrollView className="flex-1 px-[16px]">
            <View className="h-[16.91px] mt-[18px] mb-[7.96px]">
              <Text className="text-primary font-gotham font-[325] text-[14px] text-start leading-[16.8px] tracking-[-0.02em]">
                Address
              </Text>
            </View>

            <View className="bg-card px-[8px] pb-[18px] pt-[13.13px] rounded-[12px] ">
              <Controller
                control={control}
                name="pincode"
                rules={{ required: "Pincode is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <View>
                    <TextInput
                      className="border h-[48px] border-gray-300 py-[16px] ps-[18px] rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder placeholder:text-[12px] placeholder:text-placeholder"
                      placeholder="Pincode"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
              />
              <View className="flex flex-row justify-between my-[12px]">
                <Controller
                  control={control}
                  name="city"
                  rules={{ required: "City is required" }}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <View>
                      <TextInput
                        className="border h-[48px] w-[158px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                        placeholder="City"
                        keyboardType="numeric"
                        onChangeText={onChange}
                        value={value}
                      />
                      {fieldState.error?.message && <Text className="my-1 mx-2 text-sm text-red-600">{fieldState.error?.message}</Text>}

                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="state"
                  rules={{ required: "State is required" }}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <View>
                      <TextInput
                        className="border h-[48px] w-[158px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                        placeholder="State"
                        onChangeText={onChange}
                        value={value}
                      />
                      {fieldState.error?.message && <Text className="my-1 mx-2 text-sm text-red-600">{fieldState.error?.message}</Text>}

                    </View>
                  )}
                />
              </View>

              <Controller
                control={control}
                name="houseFlat"
                rules={{ required: "House/ Flat no. is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <View>
                    <TextInput
                      className="border h-[48px] border-gray-300 p-3 mb-[10px] rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                      placeholder="House/Flat no."
                      onChangeText={onChange}
                      value={value}
                    />
                    {fieldState.error?.message && <Text className="my-1 mx-2 text-sm text-red-600">{fieldState.error?.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="buildingNo"
                rules={{ required: "Building no. is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <View>
                    <TextInput
                      className="border h-[48px] border-gray-300 p-3 mb-[10px] rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                      placeholder="Building no."
                      onChangeText={onChange}
                      value={value}
                    />
                    {fieldState.error?.message && <Text className="my-1 mx-2 text-sm text-red-600">{fieldState.error?.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="roadName"
                rules={{ required: "Road name/ Area/ Colony is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <View>
                    <TextInput
                      className="border h-[48px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                      placeholder="Road name/ Area/ Colony"
                      onChangeText={onChange}
                      value={value}
                    />
                    {fieldState.error?.message && <Text className="my-1 mx-2 text-sm text-red-600">{fieldState.error?.message}</Text>}
                  </View>
                )}
              />
            </View>

            <View className="h-[16.91px] mt-[16px] mb-[8px]">
              <Text className="text-primary font-gotham font-[325] text-[14px] text-start leading-[16.8px] tracking-[-0.02em]">
                Receiver’s details
              </Text>
            </View>

            <View className="h-[194px] bg-card px-[8px] rounded-[12px] pt-[13px]">
              <Controller
                control={control}
                name="receiverName"
                rules={{ required: "Receiver’s name is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <View>
                    <TextInput
                      className="border h-[48px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder mb-[12px]"
                      placeholder="Receiver’s name"
                      onChangeText={onChange}
                      value={value}
                    />
                    {fieldState.error?.message && <Text className="my-1 mx-2 text-sm text-red-600">{fieldState.error?.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="receiverPhone"
                rules={{ required: "Phone number is required" }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <View>
                    < TextInput
                      className="border h-[48px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder mb-[12px]"
                      placeholder="Receiver’s phone number"
                      keyboardType="phone-pad"
                      onChangeText={onChange}
                      value={value}
                    />
                    {fieldState.error?.message && <Text className="my-1 mx-2 text-sm text-red-600">{fieldState.error?.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="petName"
                render={({ field: { onChange, value }, fieldState }) => (
                  <View>
                    <TextInput
                      className="border h-[48px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                      placeholder="Pet's Name"
                      onChangeText={onChange}
                      value={value}
                    />
                    {fieldState.error?.message && <Text className="my-1 mx-2 text-sm text-red-600">{fieldState.error?.message}</Text>}
                  </View>
                )}
              />
            </View>
          </ScrollView>
          <View className="h-[96px] bg-foreground w-full flex flex-col justify-center items-center">
            <View className="w-fit">
              <View className="w-[164px] h-[21px] flex flex-row self-start mb-[10px]">
                <Checkbox
                  className="h-[20px] w-[20px] me-[10px]"
                  color="#000000"
                  value={true}
                  onValueChange={() => { }}
                />
                <Text>Set as default address</Text>
              </View>
              <TouchableOpacity
                className="bg-primary w-[343px] h-[40px] rounded-[6px] flex justify-center items-center"
                onPress={handleSubmit(onSaveAddress)}
              >
                <Text className="text-primary-foreground font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
                  Confirm location
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView >

    </SafeAreaView >
  );
}