import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import Header from '@/components/header/header'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { Controller, useForm } from 'react-hook-form'


export default function AddAddress() {

  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      address: '',
      pincode: '',
      city: '',
      state: '',
      houseFlat: '',
      buildingNo: '',
      roadName: '',
      receiverName: '',
      receiverPhone: '',
      petName: '',
    },
  });


  const onBackNavigation = () => {
    router.back()
  }

  const onSaveAddress = () => {

  }

  const icon = <TouchableOpacity onPress={onBackNavigation}>
    <View className='h-[40px] w-[40px] flex flex-col justify-center items-center me-[4px]'>
      <MaterialCommunityIcons name="keyboard-backspace" size={24} color="black" />
    </View>
  </TouchableOpacity>

  return (
    <SafeAreaView>
      <View className="h-full">
        <Header title="Add address" icon={icon} />
        <ScrollView className="flex-1 px-[16px]">
          <View className='h-[16.91px] mt-[18px] mb-[7.96px]'>
            <Text className="text-primary font-gotham font-[325] text-[14px] text-start leading-[16.8px] tracking-[-0.02em]">Address</Text>
          </View>

          <View className="bg-card px-[8px] pb-[18px] pt-[13.13px] rounded-[12px]">
            <Controller
              control={control}
              name="pincode"
              rules={{ required: 'Pincode is required' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border h-[48px] border-gray-300 py-[16px] ps-[18px] rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder placeholder:text-[12px] placeholder:text-placeholder"
                  placeholder="Pincode"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <View className='flex flex-row justify-between my-[12px]'>
              <Controller
                control={control}
                name="city"
                rules={{ required: 'City is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border h-[48px] w-[158px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                    placeholder="City"
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                control={control}
                name="state"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border h-[48px] w-[158px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                    placeholder="State"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>


            <Controller
              control={control}
              name="houseFlat"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border h-[48px] border-gray-300 p-3 mb-[10px] rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                  placeholder="House/Flat no."
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="buildingNo"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border h-[48px] border-gray-300 p-3 mb-[10px] rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                  placeholder="Building no."
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />


            <Controller
              control={control}
              name="roadName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border h-[48px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                  placeholder="Road name/ Area/ Colony"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />



          </View>

          <View className='h-[16.91px] mt-[16px] mb-[8px]'>
            <Text className="text-primary font-gotham font-[325] text-[14px] text-start leading-[16.8px] tracking-[-0.02em]">Receiver’s details</Text>
          </View>

          <View className='h-[194px] bg-card px-[8px] rounded-[12px] pt-[13px]'>
            <Controller
              control={control}
              name="receiverName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border h-[48px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder mb-[12px]"
                  placeholder="Receiver’s name"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="receiverPhone"
              rules={{ required: 'Phone number is required' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border h-[48px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder mb-[12px]"
                  placeholder="Receiver’s phone number"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="petName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border h-[48px] border-gray-300 p-3 rounded-[16px] bg-background placeholder:text-[12px] placeholder:text-placeholder"
                  placeholder="Pet's Name"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

        </ScrollView>
        <View className='h-[96px] bg-foreground w-full flex flex-col justify-center items-center'>
          <View className="w-fit">

            <View className="w-[164px] h-[21px] flex flex-row self-start mb-[10px]">
              <Checkbox className="h-[20px] w-[20px] me-[10px]" color="#000000" value={true} onValueChange={() => { }} />
              <Text>Set as default address</Text>
            </View>
            <TouchableOpacity className="bg-primary w-[343px] h-[40px] rounded-[6px] flex justify-center items-center" onPress={() => onSaveAddress()}>
              <Text className="text-primary-foreground font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
                Save address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}