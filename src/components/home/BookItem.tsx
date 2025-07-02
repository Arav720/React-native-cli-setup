import React from 'react';
import { View, Text } from 'react-native';

interface BookItemProps {
  item: any; // Replace 'any' with your ticket type if available
}

const BookItem: React.FC<BookItemProps> = ({ item }) => {
  return (
    <View className="p-4 mb-2 bg-gray-100 rounded-lg">
      <Text className="font-bold text-lg">{item.busName || 'Bus Name'}</Text>
      <Text className="text-gray-700">From: {item.from}</Text>
      <Text className="text-gray-700">To: {item.to}</Text>
      <Text className="text-gray-500">Status: {item.status}</Text>
      {/* Add more fields as needed */}
    </View>
  );
};

export default BookItem;