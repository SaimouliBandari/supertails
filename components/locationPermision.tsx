import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { Linking, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';


const LocationPermission = ({ showEnableModal = false, styles = {}, onCloseEv = () => { } }) => {

    useEffect(() => {
        setModalVisible(showEnableModal)
    }, [showEnableModal])

    const onModalClose = () => {
        setModalVisible(false)
        onCloseEv()
    }

    const [modalVisible, setModalVisible] = React.useState(showEnableModal);
    return (
        <View className="flex flex-row justify-between items-center h-[46px] bg-[#FFF6F7]" style={styles} >
            <View className='flex flex-row justify-start items-center'>
                <View className='ms-[16px] me-[8px]'>
                    <Image
                        source={require('../assets/images/pin-add-diabled.png')}
                        style={{ width: 32, height: 32 }}
                    />
                </View>
                <View className='h-[30px] my-[8px]'>
                    <Text className="font-gotham font-[350] text-[12px] leading-[14.4px]">Enable location permission</Text>
                    <Text className="font-lato font-[400] text-[10px] leading-[19.2px] mb-4">Your precise location helps us deliver on time            </Text>
                </View>
            </View>
            <TouchableOpacity
                className="bg-primary w-[68px] h-[28px] rounded-[8px] flex justify-center items-center me-[16px]"
                onPress={() => setModalVisible(true)}
            >
                <Text className="text-primary-foreground font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
                    Enable
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={onModalClose}
            >
                <TouchableWithoutFeedback onPress={onModalClose}>

                    <View className="flex-1 justify-center items-center bg-opacity-50">
                        <View className="bg-[#FFFFFF] rounded-[16px] w-[249px] h-[256px] p-[16px] ">
                            <View className="flex flex-row h-[56px]">
                                <Image
                                    source={require('../assets/images/pin-add-diabled.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                                <View className='w-[193px]'>
                                    <Text className="font-gotham font-[350] text-[14px] mb-[6px] leading-[18.2px]">Enable location permission</Text>
                                    <Text className="font-lato font-[400] text-[12px] text-[#606268] leading-[15.6px]">Please enable location permissions for a better experience</Text>
                                </View>
                            </View>
                            <View className=' border-b-[0.6px] border-[#00000033] my-[12px]'></View>

                            <View className="space-y-0">
                                <View className='flex flex-row justify-start items-start'>
                                    <Image source={require("../assets/images/supertails.png")} style={{ marginEnd: 9, height: 20, width: 20 }} />
                                    <Text className="font-lato font-[400] text-[14px]">Choose “Supertails”</Text>
                                </View>
                                <View className="h-6 w-[2px] bg-gray-300 self-start ms-[8px]"></View>
                                <View className='flex flex-row justify-start items-center '>
                                    <Image source={require("../assets/images/geo-permission.png")} style={{ marginEnd: 9, height: 20, width: 20 }} />
                                    <Text className="font-lato font-[400] text-[14px]">Go to location</Text>
                                </View>
                                <View className="h-6 w-[2px] bg-gray-300 self-start ms-[8px]"></View>
                                <View className='flex flex-row justify-start items-center'>
                                    <Image source={require("../assets/images/click-on.png")} style={{ marginEnd: 9, height: 20, width: 20 }} />
                                    <Text className="font-lato font-[400] text-[14px]">Click on “While using app”</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                className="bg-primary w-[217px] h-[32px] rounded-[8px] flex justify-center items-center mt-[16px]"
                                onPress={() => (Linking.openSettings(), setModalVisible(false))}
                            >
                                <Text className="text-primary-foreground font-gotham font-[325] text-[16px] text-center leading-[19.2px]">
                                    Go to settings
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal >
        </View >
    );
};

export default LocationPermission;