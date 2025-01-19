import useStore from '@/store/store';
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * The main component of the application that handles user type selection and location-based address addition.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @component
 * @example
 * return (
 *   <Index />
 * )
 *
 * @remarks
 * This component uses the `expo-location` and `expo-router` libraries to handle location permissions and navigation.
 * It also utilizes the `useStore` hook to manage state related to location and permission status.
 *
 * @function getCurrentLocation
 * Requests the user's location permission and retrieves the current location if granted.
 * If permission is denied, navigates to the address search screen.
 *
 * @function onAddAddress
 * Handles the logic for adding an address based on the user type.
 * If the user is new, it retrieves the current location.
 * If the user is existing, it navigates to the address selection screen.
 *
 * @state {string} userType - The type of user, either "new" or "existing".
 *
 * @hook useStore - Custom hook to manage location and permission state.
 * @hook useRouter - Hook from `expo-router` to handle navigation.
 * @hook useState - React hook to manage component state.
 *
 * @requires expo-location
 * @requires expo-router
 * @requires react-native
 * @requires react-native-get-random-values
 * @requires react-native-safe-area-context
 */
export default function Index() {
  const router = useRouter();
  const { setLocation, setIsLocationPermissionGranted } = useStore()
  const [userType, setUserType] = useState("new");

  async function getCurrentLocation() {

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setIsLocationPermissionGranted(false);
      router.push("/address/searchAddress");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    router.push({
      pathname: "/address/location",
    });
    setIsLocationPermissionGranted(true);
    setLocation({
      latitude: +location.coords.latitude,
      longitude: +location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    })
  }

  const onAddAddress = () => {
    if (userType === "new") {
      getCurrentLocation();
    } else {
      router.push("/address/selectAddress");
    }
  };

  return (
    <SafeAreaView>
      <View className="flex flex-col justify-between  items-center h-full">
        {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
        <View className='flex flex-col justify-center items-center flex-1 gap-10'>
          <TouchableOpacity
            className="bg-primary-foreground border-[0.6px] border-primary w-[343px] h-[48px] rounded-[6px] flex justify-center items-center"
            onPress={() => setUserType("existing")}
          >
            <Text className="text-secondary font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
              Existing User
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-primary-foreground border-[0.6px] border-primary w-[343px] h-[48px] rounded-[6px] flex justify-center items-center"
            onPress={() => setUserType("new")}
          >
            <Text className="text-secondary font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
              New User
            </Text>
          </TouchableOpacity>
        </View>


        <View className="bg-foreground w-full h-[76px] flex justify-center items-center">
          <TouchableOpacity
            className="bg-primary w-[343px] h-[48px] rounded-[6px] flex justify-center items-center"
            onPress={() => onAddAddress()}
          >
            <Text className="text-primary-foreground font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
              Add Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
