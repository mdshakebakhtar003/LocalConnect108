import { FlatList, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { Link, useRouter } from 'expo-router';
const index = () => {
  const user = useSelector((store) => store.user);
  const [bookData, setBookData] = useState([]);
  
const router = useRouter();
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const url = `http://10.165.131.87:12345/book/users/${user?.email}`;
        const res = await axios.get(url);
        setBookData(res.data.user);
      } catch (err) {
        Alert.alert('Failed to fetch profile', err.message);
        console.log(err);
      }
    };
    fetchBook();
  }, [user?.email]);
  const bookService = () => {
    // Navigate to booking screen
    router.replace('/(tabs)/home');
    console.log("Book Service Pressed");
  };
  const viewHistory = () => {
    // Navigate to booking history screen
   router.replace('/(booking)/' + user?.email);
    console.log("View History Pressed");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={{ width: '100%', height: 60, marginTop: 0, backgroundColor: 'white' }}>
          <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: 15, padding: 10, fontSize: 20 }}>Dashboard</Text>
        </View>

        <View>
          <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 10, fontWeight: 'bold', marginBottom: 10 }}>Welcome back</Text>
        </View>

        <View style={{ height: 140, backgroundColor: 'white', marginLeft: 15, marginRight: 15, borderRadius: 10, padding: 10 }}>
          <Text style={{ marginTop: 20, marginLeft: 10 }}>Quick Actions</Text>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View>
              <Pressable style={{ marginLeft: 5, width: 150, height: 50, backgroundColor: 'navy', borderRadius: 10 }} onPress={bookService}>
                <Text style={{ fontSize: 16, color: 'white', paddingLeft: 15, paddingRight: 10, paddingTop: 10 }}>Book Service</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={{ marginLeft: 5, width: 150, height: 50, backgroundColor: 'navy', borderRadius: 10 }} onPress={viewHistory}>
                <Text style={{ fontSize: 16, color: 'white', paddingLeft: 15, paddingRight: 10, paddingTop: 10 }}>My Bookings</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>
          Upcoming Services
        </Text>
        <View style={{ height: 150, backgroundColor: 'white', marginLeft: 15, marginRight: 15, borderRadius: 10, padding: 10 }}>
          <Text>Home Cleaning</Text>
          <Text>Service by:Amit Verma</Text>
          <Text>2025-04-10</Text>
          <Text>10:00 AM</Text>
          <Text>123 Main St, Bangalore</Text>
          <Pressable>
            <Text>View Details</Text>
          </Pressable>
        </View>

        <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>
          Recent Service History
        </Text>

        <FlatList
          data={bookData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ height: 80, backgroundColor: 'white', marginLeft: 15, marginRight: 15, borderRadius: 10, padding: 10, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{item.wtag}</Text>
                <Text style={{ color: 'navy' }}>₹{item.price}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Date: {item.Date}</Text>
                <Text>Worker: {item.wname}</Text>
              </View>
              <Text>Rating: {item.rating}</Text>
            </View>
          )}
          scrollEnabled={false} // FlatList inside ScrollView: disable its own scroll
        />
        <Pressable onPress={viewHistory}>
          <Text style={{ color: 'navy', fontSize: 16, marginLeft: 'auto', marginRight: 'auto', fontWeight: 'bold' }}>
            View All History
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})