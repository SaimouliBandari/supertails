import { View, Text, TouchableOpacity } from "react-native";
import classNames from "classnames";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export type TAddressPlaceholder = {
  onChange: () => void;
  name: string
  address: string,
};

export default function AddressPlaceholder({ onChange, name = '', address = '' }: TAddressPlaceholder) {


  return (
    <View className="flex flex-row justify-around ">
      <View className="w-[252px] h-[62px] self-start flex flex-row ms-[16px] me-[26px]">
        <View className=" flex-1 flex-row h-full">
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
          <Text className=" font-gotham text-[18px] font-[350] leading-[21.6px] text-primary me-[6px]" numberOfLines={1}> {name}</Text>
          <Text className=" font-lato text-[14px] font-[400] leading-[16.8px] text-[#6B7280]" numberOfLines={2}>
            {address}
          </Text>
        </View>

        {/* <Ionicons name="location-sharp" size={24} style={{ color: 'blue' }} /> */}
      </View>
      <TouchableOpacity
        className="bg-primary-foreground w-[64px] h-[26px] flex justify-center items-center rounded-[4px] "
        onPress={() => onChange()}
      >
        <Text className="text-secondary font-gotham font-[350] text-[12px] text-center leading-[14.4px]">
          Change
        </Text>
      </TouchableOpacity>
    </View>
  );
}
