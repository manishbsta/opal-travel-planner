import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  return (
    <View className='flex-1 items-center justify-center'>
      <TouchableOpacity className='rounded-lg bg-red-500 p-4 px-10'>
        <Text className='text-white'>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
