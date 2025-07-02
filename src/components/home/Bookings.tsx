import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  
} from 'react-native';

import Search from './Search';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import BookItem from './BookItem';
import { fetchUserTickets } from '../../service/request/bus'; // Ensure correct path
import { tabs } from '../../utils/dummyData'; // Use this one; removed hardcoded duplicate

const Bookings = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: tickets = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['userTickets'],
    queryFn: fetchUserTickets,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filteredBookings =
    selectedTab === 'All'
      ? (tickets as any[])
      : (tickets as any[]).filter((ticket: any) => ticket.status === selectedTab);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-lg">Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">Error loading bookings</Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="mt-4 bg-red-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 p-2 bg-white">
      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item._id}
        nestedScrollEnabled
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg">No bookings found</Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <Search />
            <Text className="text-2xl font-bold my-4">Past Bookings</Text>
            <View className="flex-row mb-4">
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg mx-1 ${
                    selectedTab === tab ? 'bg-red-500' : 'bg-gray-300'
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      selectedTab === tab ? 'text-white' : 'text-black'
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={({ item }) => <BookItem item={item} />}
      />
    </View>
  );
};

export default Bookings;
