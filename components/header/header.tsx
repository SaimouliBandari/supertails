import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type THeader = {
    title: string;
    icon: any;
}

export default function Header({ title, icon }: THeader) {
    return (
        <View className="bg-foreground h-[48px] w-full flex flex-row items-center  px-[16px]">
            
            {icon}
            <Text className="text-primary font-gotham font-[350] text-[14px] text-center leading-[16.8px] tracking-[-0.02em]">{title}</Text>
        </View>
    )
}

// font-family: Gotham Rounded;
// font-size: 14px;
// font-weight: 350;
// line-height: 16.8px;
// letter-spacing: -0.02em;
// text-align: center;
// text-underline-position: from-font;
// text-decoration-skip-ink: none;
