import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from "react-redux";
import Logo from '../assets/Logo.png';
import { addUser } from '../utils/userSlice';
import * as ImagePicker from 'expo-image-picker';

const Register = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
    Experience: '',
    Hourly_rate: '',
    Job_done: '',
    tag: '',
    location: '',
  });
  const [image, setImage] = useState(null);
  const [role, setRole] = useState('user');
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct usage
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleChange1 = () => {
    setRole('user');
    setForm({ ...form, role: 'user' });
  };

  const handleChange2 = () => {
    setRole('worker');
    setForm({ ...form, role: 'worker' });
  };

  const handleRegister = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.phone ||
      !form.location ||
      (role === 'worker' && (
        !form.Experience ||
        !form.Hourly_rate ||
        !form.Job_done ||
        !form.tag
      )) ||
      !image
    ) {
      Alert.alert('All fields are required');
      return;
    }
    const url = `http://10.165.131.87:12345/${role}/register`;
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('profileImage', {
      uri: image,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    try {
      await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Signup successful');
      dispatch(addUser({ email: form.email }));
      if (role === 'worker') {
        router.replace('/(worker)/home');
      } else {
        router.replace('/(tabs)/home');
      }
    } catch (err) {
      Alert.alert('Signup failed', err.message);
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }} style={{ width: '100%' }}>
        <View style={{ marginTop: 100 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: 'navy' }}>
            Welcome to LocalConnect
          </Text>
          <Image source={Logo} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 30 }} />
        </View>
        <View style={{ width: '90%', paddingHorizontal: 20, marginTop: 20, backgroundColor: 'white', borderEndColor: 'navy', borderRadius: 10 }}>
          <View style={{ marginTop: 50, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Pressable
              style={{
                height: 50,
                width: 140,
                backgroundColor: role === 'user' ? 'gray' : 'navy',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 0
              }}
              onPress={handleChange1}
            >
              <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center' }}>
                User
              </Text>
            </Pressable>
            <Pressable
              style={{
                height: 50,
                width: 140,
                backgroundColor: role === 'worker' ? 'gray' : 'navy',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 2
              }}
              onPress={handleChange2}
            >
              <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center' }}>
                Worker
              </Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChangeText={text => handleChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={form.password}
              onChangeText={text => handleChange('password', text)}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Phone No."
              value={form.phone}
              onChangeText={text => handleChange('phone', text)}
              keyboardType="phone-pad"
            />

            {role === 'worker' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Experience"
                  value={form.Experience}
                  onChangeText={text => handleChange('Experience', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Hourly Rate"
                  value={form.Hourly_rate}
                  onChangeText={text => handleChange('Hourly_rate', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Jobs Done"
                  value={form.Job_done}
                  onChangeText={text => handleChange('Job_done', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Tag"
                  value={form.tag}
                  onChangeText={text => handleChange('tag', text)}
                />
              </>
            )}
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={form.location}
              onChangeText={text => handleChange('location', text)}
            />
            <TouchableOpacity onPress={pickImage} style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'navy', padding: 10, borderRadius: 5, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Select Profile Image</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
            <Button title="Register" onPress={handleRegister} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});