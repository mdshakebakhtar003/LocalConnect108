import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from "react-redux";
import Logo from '../assets/Logo.png';
import { addUser } from '../utils/userSlice'; // Uncomment and adjust if using Redux

const Login = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [role, setRole] = useState('user');
  const router = useRouter();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleChange1 = () => {
    setRole('user');
  };

  const handleChange2 = () => {
    setRole('worker');
  };

  const handleLogin = () => {
    if (!form.email || !form.password) {
      Alert.alert('All fields are required');
      return;
    }
    const url = `http://10.165.131.87:12345/${role}/login`;
    axios.post(url, form)
      .then(res => {
        Alert.alert('Login successful');
        dispatch(addUser({ email: form.email }));
        if (role === 'worker') {
          router.replace('/(worker)/home');}
       else router.replace('/(tabs)/home');
      })
      .catch(err => {
        Alert.alert('Login failed', err.message);
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <View style={{ marginTop: 100 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: 'navy' }}>
          Welcome to LocalConnect
        </Text>
        <Image source={Logo} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 30 }} />
      </View>
      <View style={{ height: '60%', width: '90%', paddingHorizontal: 20, marginTop: 20, backgroundColor: 'white', borderEndColor: 'navy' }}>
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
        <TextInput
          style={{ height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginTop: 20 }}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
        />
        <TextInput
          style={{ height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginTop: 20 }}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={text => handleChange('password', text)}
        />
        <Pressable style={{ height: 50, backgroundColor: 'navy', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} onPress={handleLogin}>
          <Text style={{ fontSize: 18, color: '#fff' }}>Login</Text>
        </Pressable>
        <Pressable onPress={() => router.replace('/register')}>
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Don't have an account? <Text style={{ color: 'navy' }}>Register</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;