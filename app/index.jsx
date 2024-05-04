import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className=" bg-[#fff] flex flex-1 items-center justify-center">
      <Text className='text-3xl font-pblack'>HexCraft!</Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{ color: 'blue' }}>Go to Home</Link >
    </View>
  );
}


