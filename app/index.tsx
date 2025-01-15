import { Redirect, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  
  const onAddAddress = () => {
    router.push("/address/location")

  }

  return (
    <SafeAreaView>
      <View className="flex flex-col justify-end items-center h-full">
        {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
        <View className="bg-foreground w-full h-[76px] flex justify-center items-center">
          <TouchableOpacity className="bg-primary w-[343px] h-[48px] rounded-[6px] flex justify-center items-center" onPress={() => onAddAddress()}>
                <Text className="text-primary-foreground font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
                  Add Address
                </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
