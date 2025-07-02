import { View, Text, Alert, TouchableOpacity, TextInput, Image } from 'react-native';
import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { loginWithGoogle } from '../service/request/auth';
import { resetAndNavigate } from '../utils/NavigationUtils';
import { useMutation } from '@tanstack/react-query';

GoogleSignin.configure({
  webClientId: '50061400611-9oq911c24s0h6ss6rq3g3cmgqamphkm4.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const loginMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: () => {
      resetAndNavigate('HomeScreen');
    },
    onError: error => {
      console.error('Login failed:', error);
      Alert.alert('Login Error', 'Failed to login with Google. Please try again.');
    }
  });

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();
      loginMutation.mutate(idToken);
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  return (
    <View>
      <Image
        source={require('../assets/images/cover.jpeg')}
        className="w-full h-64 bg-cover"
      />
      <View className="p-4">
        <Text>
          Create Account or Sign In
        </Text>
        <View className="my-4 mt-12 border-1 gap-2 border border-black px-2 flex-row items-center">
          <Text className="font-okra w-[10%] font bold text-base">
            +91
          </Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
            keyboardType="number-pad"
            placeholder="Enter your phone number"
            className="font-okra h-11 w-[90%]"
          />
        </View>
        <TouchableOpacity
          onPress={handleGoogleLogin}
          className="bg-blue-500 p-3 rounded-lg flex-row items-center justify-center"
        >
          <Text className="text-white font-okra">Sign in with Google</Text>
        </TouchableOpacity>
        <Text className="text-center my-4 text-gray-700">
          -------OR-------
        </Text>
        <View className="flex-row items-center justify-center gap-4">
          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="border border-1 border-gray-300 p-2"
          >
            <Image
              source={require('../assets/images/google.png')}
              className="w-5 h-5 contain-size"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="border border-1 border-gray-300 p-2"
          >
            <Image
              source={require('../assets/images/apple.png')}
              className="w-5 h-5 contain-size"
            />
          </TouchableOpacity>
        </View>
        <Text className="font-okra text-sm text-gray-500 font-medium mt-10 w-72 self-center">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
