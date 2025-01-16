import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export default function AddressPlaceholder() {
  return (
    <View className=" flex flex-row">
      <View className="w-[252px] h-[62px] self-start flex flex-row ms-[16px]">
        <View style={{ flex: 1, flexDirection: "row", height: "100%" }}>
          <MaskedView
            style={{ flex: 1, flexDirection: "row", height: "100%" }}
            maskElement={
              <Ionicons
                name="location-sharp"
                size={24}
                style={{ color: "black" }}
              />
            }
          >
            <LinearGradient
              colors={["hsla(75, 70%, 38%, 1)", "hsla(75, 71%, 24%, 1)"]}
              style={{ flex: 1, height: "100%" }}
            />
          </MaskedView>
        </View>

        <View className="w-[221px]">
          <Text>Even Healthcare Office</Text>
          <Text>
            11th Cross Rd, Stage 3, Indiranagar, Bengaluru, Karnataka{" "}
          </Text>
        </View>

        {/* <Ionicons name="location-sharp" size={24} style={{ color: 'blue' }} /> */}
      </View>
      <TouchableOpacity className="bg-primary-foreground w-[64px] h-[26px] flex justify-center items-center rounded-[4px] ">
        <Text className="text-secondary font-gotham font-[350] text-[12px] text-center leading-[14.4px]">
          Change
        </Text>
      </TouchableOpacity>
    </View>
  );
}
