import { Alert, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setJobDone } from '../../utils/jobDoneSlice';

import date from '../../assets/calendar.png';
import time from '../../assets/clock.png';
import address from '../../assets/location.png';
import instruction from '../../assets/note.png';
import phone from '../../assets/phone.png';
import user from '../../assets/user.png';
import tick from '../../assets/tick.png';
import chatIcon from '../../assets/chat.png';

const socket = io('http://10.165.131.87:12345'); // 👈 update to your backend IP

const Book = () => {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [Otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatScrollRef = useRef(null);

  const dispatch = useDispatch();
  const jobDone = useSelector(state => state.jobDone[id]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://10.165.131.87:12345/book/${id}`);
        setBook(Array.isArray(response.data.bookings) ? response.data.bookings[0] : response.data.book);
      } catch (err) {
        setError('Failed to load book data.');
        console.error(err);
      }
    };
    if (id) fetchBookData();
  }, [id]);

  useEffect(() => {
    if (!book.chatid) return;

    socket.emit('joinRoom', book.chatid); // Join chat room using booking ID

    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [id]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        text: message,
        sender: 'worker', // or 'client'
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        room: id
      };
      socket.emit('sendMessage', msgData);
      setMessages(prev => [...prev, msgData]);
      setMessage('');
    }
  };

  const verifybook = async () => {
    try {
      const response = await axios.get(`http://10.165.131.87:12345/otp/${id}`);
      const otpFromApi = response.data.OTP?.otp;
      if (otpFromApi === Otp) {
        dispatch(setJobDone({ bookingId: id }));
        await axios.post(`http://10.165.131.87:12345/book/modify/${id}`, { status: 'Completed' });
        Alert.alert('OTP Confirmed', 'Your job has been done successfully.');
      } else {
        Alert.alert('OTP Error', 'The OTP you entered is incorrect.');
      }
    } catch (err) {
      setError('Failed to load otp data.');
      console.error(err);
    }
  };

  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!book) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Booking Info UI */}
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Booking Details</Text>
      </View>
      <View style={styles.card}>
        {/* All details */}
        {[{ icon: user, label: 'Name', value: book.name },
          { icon: phone, label: 'Phone', value: book.phone },
          { icon: address, label: 'Address', value: book.Address },
          { icon: instruction, label: 'Instruction', value: book.instruction },
          { icon: date, label: 'Date', value: book.Date },
          { icon: time, label: 'Time', value: book.Time }
        ].map(({ icon, label, value }) => (
          <View style={styles.row} key={label}>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        {/* Chat button */}
        <Pressable style={styles.actionButton} onPress={() => setModalVisible(true)}>
          <Image source={chatIcon} style={{ width: 18, height: 18, marginRight: 6 }} />
          <Text style={{ color: 'navy', fontWeight: 'bold' }}>Chat</Text>
        </Pressable>
      </View>

      {/* OTP Input */}
      <TextInput
        placeholder="Enter OTP"
        onChangeText={setOtp}
        value={Otp}
        editable={!jobDone}
        style={{
          marginTop: 20,
          padding: 12,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#ccc',
          marginHorizontal: 20,
          backgroundColor: jobDone ? '#e5ffe5' : 'white'
        }}
      />

      {/* Job Done Button */}
      {jobDone ? (
        <View style={styles.doneButton}>
          <Image source={tick} style={styles.tickIcon} />
          <Text style={styles.doneButtonText}>Job Done</Text>
        </View>
      ) : (
        <Pressable style={styles.button} onPress={verifybook}>
          <Text style={styles.buttonText}>Job Done</Text>
        </Pressable>
      )}

      {/* Chat Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Chat</Text>
          <FlatList
            ref={chatScrollRef}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            onContentSizeChange={() => chatScrollRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }) => (
              <View
                style={{
                  alignSelf: item.sender === 'worker' ? 'flex-end' : 'flex-start',
                  backgroundColor: item.sender === 'worker' ? '#dbeafe' : '#e2e8f0',
                  marginVertical: 4,
                  padding: 10,
                  borderRadius: 10,
                  maxWidth: '80%',
                }}
              >
                <Text style={{ fontSize: 16 }}>{item.text}</Text>
                <Text style={{ fontSize: 10, color: '#6b7280', textAlign: 'right' }}>{item.time}</Text>
              </View>
            )}
          />
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <TextInput
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                borderRadius: 8,
                marginRight: 10
              }}
            />
            <Pressable onPress={sendMessage} style={{ justifyContent: 'center', paddingHorizontal: 12 }}>
              <Text style={{ fontWeight: 'bold', color: 'navy' }}>Send</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => setModalVisible(false)} style={{ marginTop: 10, alignSelf: 'center' }}>
            <Text style={{ color: 'red' }}>Close</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // keep your existing styles here
  safeArea: { flex: 1 },
  headerBox: {
    alignItems: 'center', marginTop: 30, marginBottom: 10, padding: 10,
    backgroundColor: 'navy', borderRadius: 12, marginHorizontal: 20, elevation: 4,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
  },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
  card: {
    backgroundColor: 'white', marginTop: 30, marginHorizontal: 20,
    borderRadius: 16, padding: 24, elevation: 6, shadowColor: '#000',
    shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
  },
  row: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 18,
    borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingBottom: 8,
  },
  icon: { width: 26, height: 26, marginRight: 10, tintColor: '#1e3a8a' },
  label: { flex: 1, color: 'navy', fontWeight: 'bold', fontSize: 18 },
  value: { flex: 2, color: '#374151', fontSize: 18, textAlign: 'right' },
  error: { color: 'red', fontSize: 18, marginTop: 40, textAlign: 'center' },
  loading: { color: '#1e3a8a', fontSize: 18, marginTop: 40, textAlign: 'center' },
  button: {
    marginTop: 24, backgroundColor: 'navy', marginLeft: 'auto', marginRight: 'auto',
    width: '50%', borderRadius: 2, paddingVertical: 14, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  doneButton: {
    marginTop: 24, backgroundColor: '#22c55e', marginLeft: 'auto', marginRight: 'auto',
    width: '50%', borderRadius: 2, paddingVertical: 14, alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center',
  },
  doneButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18, marginLeft: 8 },
  tickIcon: { width: 24, height: 24, tintColor: '#fff' },
  actionButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e0f2fe',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
});

export default Book;
