import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'
const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

  const [showPassword, setShowPassword] = useState(
    false
  )
  return (
    <View className={`${otherStyles} space-y-2`}>
      <Text className='text-base text-gray-100 font-pmedium '>
        {title}
      </Text>
      <View className=' h-16 px-4 w-full bg-black-100 border-black-200 rounded-2xl border-2
       focus:border-secondary items-center
flex-row
      '>
        <TextInput
          className='flex-1 text-white text-base font-psemibold'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField