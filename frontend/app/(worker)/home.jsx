import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import calendarIcon from '../../assets/calendar.png';
import timeIcon from '../../assets/clock.png';
import locationIcon from '../../assets/location.png';

const Index = () => {
  const user = useSelector((store) => store.user);
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('');
  const [bookdata, setbookData] = React.useState([]);
  const [filteredBookings, setFilteredBookings] = React.useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = `http://10.165.131.87:12345/book/profile/${user?.email}`;
        const res = await axios.get(url);
        res.data.user = res.data.user.filter((item) => item.status === 'Pending');
        setbookData(res.data.user);
        setFilteredBookings(res.data.user); // initialize filtered list
      } catch (err) {
        Alert.alert('Failed to fetch profile', err.message);
        console.log(err);
      }
    };
    fetchProfile();
  }, [user?.email]);

  // Filter bookings by customer name as user types
  useEffect(() => {
    if (text.trim() === '') {
      setFilteredBookings(bookdata);
    } else {
      setFilteredBookings(
        bookdata.filter((item) =>
          item.name?.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  }, [text, bookdata]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f8fa' }}>
      {/* Header */}
      <View style={styles.container}>
        <View style={styles.lgo}>
          <Image source={require('../../assets/Logo.png')} style={styles.img} />
          <Text style={styles.txt}>LocalConnect</Text>
        </View>
        <Image source={require('../../assets/menu.png')} style={styles.menu} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchdiv}>
        <Image source={require('../../assets/icon.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search for customer"
          placeholderTextColor="#888"
        />
      </View>

      <Text style={styles.services}>Booked Customers</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 10, paddingBottom: 20 }}
          data={filteredBookings}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 }}>
              No bookings found.
            </Text>
          }
          renderItem={({ item }) => (
            <Link
              href={`/bookprofile/${item._id}`}
              asChild
              style={styles.horizontalItem}
            >
              <TouchableOpacity style={styles.card}>
                <View style={styles.cardHeader}>
                  <Image
                    source={item.Icon ? item.Icon : require('../../assets/userp.jpeg')}
                    style={styles.caticon}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <View style={styles.detailRow}>
                      <Image source={calendarIcon} style={styles.cardIcon} />
                      <Text style={styles.cardDetail}>{item.Date}</Text>
                      <Image source={timeIcon} style={[styles.cardIcon, { marginLeft: 10 }]} />
                      <Text style={styles.cardDetail}>{item.Time || item.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Image source={locationIcon} style={styles.cardIcon} />
                      <Text style={styles.cardDetail} numberOfLines={1}>{item.Address}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 180,
    width: '100%',
    backgroundColor: 'navy',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  lgo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  img: {
    width: 70,
    height: 70,
    marginTop: 10,
  },
  txt: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    letterSpacing: 1,
  },
  menu: {
    width: 32,
    height: 32,
    marginTop: 30,
    marginRight: 20,
    tintColor: '#fff',
  },
  searchdiv: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: -28,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    opacity: 0.5,
    height: 24,
    width: 24,
  },
  input: {
    marginLeft: 10,
    fontSize: 17,
    color: 'black',
    flex: 1,
  },
  services: {
    fontSize: 20,
    marginLeft: 30,
    fontWeight: 'bold',
    marginTop: 28,
    color: 'navy',
    letterSpacing: 0.5,
  },
  horizontalItem: {
    marginBottom: 18,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginHorizontal: 2,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  caticon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0e7ff',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'navy',
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  cardIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
    tintColor: '#1e3a8a',
  },
  cardDetail: {
    fontSize: 14,
    color: '#374151',
    marginRight: 8,
    maxWidth: 160,
  },
  catname: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
});