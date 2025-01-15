import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/header/header'

export default function Location() {

    const router = useRouter()


    const onBackNavigation = () => {
        router.back()
    }

    const icon = <TouchableOpacity onPress={onBackNavigation}>
        <View className='h-[40px] w-[40px] flex flex-col justify-center items-center me-[4px]'>
            <MaterialCommunityIcons name="keyboard-backspace" size={24} color="black" />
        </View>
    </TouchableOpacity>

    return (
         <SafeAreaView>
              <View className="h-full">
                <Header title="Select delivery location" icon={icon} />
            <Text>Location</Text>
        </View>
        </SafeAreaView>
    )
}