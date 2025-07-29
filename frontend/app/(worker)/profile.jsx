import axios from 'axios';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { logout } from '../../utils/userSlice'; // <-- adjust path as needed

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [bgcolor, setbgcolor] = useState('navy');
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState('');
  const [number, setNumber] = useState('');
  const [userData, setUserData] = useState({});
  const [location, setlocation] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const serverUrl = 'http://10.165.131.87:12345';
  const photoUrl = userData.profileImage ? `${serverUrl}/${userData.profileImage}` : null;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const url = `${serverUrl}/worker/profile/${user?.email}`;
        const res = await axios.get(url);
        setUserData(res.data.user);
      } catch (err) {
        Alert.alert('Failed to fetch profile', err.message);
      }
      setLoading(false);
    };
    if (user?.email) fetchProfile();
  }, [user?.email]);

  // Prefill modal fields when opening
  const openModal = () => {
    onChangeText(userData.name || '');
    setNumber(userData.phone || '');
    setlocation(userData.location || '');
    setImage(null);
    setModalVisible(true);
  };

  // Image picker
  const changeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  // Save profile changes
  const savechanges = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('email', userData.email);
      formData.append('name', text);
      formData.append('phone', number);
      formData.append('location', location);
      if (image) {
        formData.append('profileImage', {
          uri: image,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }
      await axios.post(`${serverUrl}/worker/edit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Profile updated successfully');
      // Refresh profile data
      const res = await axios.get(`${serverUrl}/worker/profile/${user?.email}`);
      setUserData(res.data.user);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
    setSaving(false);
  };

  // --- Navigation handlers for each section using router.replace ---
  const handleFavourites = () => {
    router.replace('/wallet');
  };
  const handleServiceHistory = () => {
    router.replace('profile/servicehistory');
  };
  const handlePayments = () => {
    router.replace('profile/payments');
  };
  const handlePrivacy = () => {
    router.replace('profile/privacy');
  };
  const handleHelp = () => {
    router.replace('profile/help');
  };
  const handleSettings = () => {
    router.replace('/settings');
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            router.replace('/login');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="navy" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Modal with blur and green view */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{ height: 430, backgroundColor: 'white', width: '90%', borderRadius: 16, padding: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Edit your Profile</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Image source={require('../../assets/close.png')} style={{ height: 18, width: 18 }} />
                </Pressable>
              </View>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={userData.name}
                placeholderTextColor="black"
              />
              <Text style={styles.label}>Phone no</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNumber}
                value={number}
                placeholder={userData.phone}
                keyboardType="numeric"
                placeholderTextColor="black"
              />
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                onChangeText={setlocation}
                value={location}
                placeholder={userData.location}
                placeholderTextColor="black"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <Pressable onPress={changeImage}>
                  <Image source={require('../../assets/gallery1.jpeg')} style={{ height: 40, width: 40 }} />
                  <Text style={{ color: 'navy', fontSize: 12, textAlign: 'center' }}>
                    Change Image
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: 'navy',
                    borderRadius: 20,
                    height: 50,
                    width: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                  onPress={savechanges}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      Save Changes
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>

      {/* Main content */}
      <View style={{ width: '100%', height: 60, backgroundColor: 'white', justifyContent: 'center' }}>
        <Text style={styles.header}>Profile</Text>
      </View>
      <View style={{ width: '100%', height: 200, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Pressable style={{ width: 80, height: 80, borderRadius: 50, backgroundColor: 'lightgray', marginLeft: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={{ width: 80, height: 80, borderRadius: 50 }} />
            ) : (
              <Text style={{ textAlign: 'center', lineHeight: 80 }}>No Image</Text>
            )}
          </Pressable>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
              {userData.name}
            </Text>
            <Text style={{ marginTop: 2 }}>
              {userData.phone}
            </Text>
            <Text>
              {userData.location}
            </Text>
          </View>
        </View>
        <Pressable
          style={{
            marginTop: 20,
            backgroundColor: bgcolor,
            height: 50,
            borderRadius: 10,
            marginLeft: 20,
            marginRight: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={openModal}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Edit Profile
          </Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={handleFavourites} style={styles.menuItem}>
          <Text>Favourites</Text>
        </Pressable>
        <Pressable onPress={handleServiceHistory} style={styles.menuItem}>
          <Text>Service History</Text>
        </Pressable>
        <Pressable onPress={handlePayments} style={styles.menuItem}>
          <Text>Payments</Text>
        </Pressable>
        <Pressable onPress={handlePrivacy} style={styles.menuItem}>
          <Text>Privacy & Security</Text>
        </Pressable>
        <Pressable onPress={handleHelp} style={styles.menuItem}>
          <Text>Help & Support</Text>
        </Pressable>
        <Pressable onPress={handleSettings} style={styles.menuItem}>
          <Text>Settings</Text>
        </Pressable>
      </View>
      <Pressable onPress={handleLogout} style={{ marginLeft: 10, height: 30, marginTop: 20 }}>
        <Text style={{ color: 'red' }}>
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 20,
    padding: 5,
    paddingBottom: 5,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#f6f8fa',
  },
  menuItem: {
    marginLeft: 30,
    height: 30,
    marginTop: 30,
    justifyContent: 'center',
  },
});