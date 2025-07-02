import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Adjust to your actual param list
type RootStackParamList = {
  BusListScreen: {
    item: {
      from: string;
      to: string;
      date: string;
    };
  };
};

const Search = () => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleSearchBuses = () => {
    if (!from || !to) {
      Alert.alert(
        'Missing Information',
        'Please select both departure and destination locations.'
      );
      return;
    }

    if (from === to) {
      Alert.alert(
        'Invalid Selection',
        'Departure and destination locations cannot be the same.'
      );
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      Alert.alert('Invalid Date', 'Please select a future date for your journey.');
      return;
    }

    navigation.navigate('BusListScreen', {
      item: { from, to, date: date.toISOString() },
    });
  };

  return (
    <View className="rounded-b-3xl overflow-hidden">
      <LinearGradient
        colors={['#78B0E6', '#fff']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View className="p-4">
          {/* FROM */}
          <View className="my-4 border z-20 bg-white rounded-lg">
            <TouchableOpacity
              className="p-4 flex-row items-center gap-4"
              onPress={() => {
                // Replace with your modal or picker logic
                const location = 'Gorakhpur'; // mock value
                setFrom(location);
              }}
            >
              <Image source={require('../../assets/images/bus.png')} />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {from || 'From'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* TO */}
          <View className="my-4 border z-20 bg-white rounded-lg">
            <TouchableOpacity
              className="p-4 flex-row items-center gap-4"
              onPress={() => {
                // Replace with your modal or picker logic
                const location = 'Lucknow'; // mock value
                setTo(location);
              }}
            >
              <Image source={require('../../assets/images/bus.png')} />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {to || 'To'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* DATE */}
          <View className="my-4 border z-20 bg-white rounded-lg">
            <TouchableOpacity
              className="p-4 flex-row items-center gap-4"
              onPress={() => setShowDatePicker(true)}
            >
              <Image source={require('../../assets/images/bus.png')} />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {date.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          {/* SEARCH BUTTON */}
          <TouchableOpacity
            className="bg-red-500 mt-4 rounded-xl p-4"
            onPress={handleSearchBuses}
          >
            <Text className="text-center text-white font-semibold text-lg">
              Search Buses
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* DATE PICKER */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          minimumDate={new Date()}
          maximumDate={maxDate}
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
};

export default Search;
