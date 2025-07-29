import { StyleSheet, Text, View, ScrollView, Pressable, Alert, Modal, Image, TouchableOpacity, TextInput } from 'react-native';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
// Import your icons from assets
import calendarIcon from '../../assets/calendar.png';
import timeIcon from '../../assets/clock.png';
import locationIcon from '../../assets/location.png';
import starIcon from '../../assets/star.png'; // Add your star icon
import io from 'socket.io-client';
import React, { useRef } from 'react';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';


const Bookings = () => {
  const router=useRouter();
  const user = useSelector((store) => store.user);
  const [upcomingdata, setUpcomingData] = useState([]);
  const [pastdata, setPastData] = useState([]);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);

  // Review modal state
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewStars, setReviewStars] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch upcoming bookings
  useEffect(() => {
    if (activeTab === 'Upcoming') {
      const fetchBook = async () => {
        try {
          const url = `http://10.165.131.87:12345/book/users/${user?.email}`;
          const res = await axios.get(url);
          const filtered = res.data.user.filter((item) => item.status === 'Pending');
          setUpcomingData(filtered);
        } catch (err) {
          Alert.alert('Failed to fetch bookings', err.message);
          console.log(err);
        }
      };
      fetchBook();
    }
  }, [user?.email, activeTab]);

  // Fetch past bookings
  useEffect(() => {
    if (activeTab === 'Past') {
      const fetchBook = async () => {
        try {
          const url = `http://10.165.131.87:12345/book/users/${user?.email}`;
          const res = await axios.get(url);
          const filtered = res.data.user.filter(
            (item) => item.status === 'Completed' || item.status === 'Cancelled'
          );
          setPastData(filtered);
        } catch (err) {
          Alert.alert('Failed to fetch bookings', err.message);
          console.log(err);
        }
      };
      fetchBook();
    }
  }, [user?.email, activeTab]);
  const [userdata,setUserdata]=useState({});
  useEffect(()=>{
    const fetchuser = async () => {
      try {
        const url = `http://10.165.131.87:12345/user/profile/${user?.email}`;
        const res = await axios.get(url);
        setUserdata(res.data.user);
      } catch (err) {
        Alert.alert('Failed to fetch userdata', err.message);
        console.log(err);
      }
    };
    fetchuser();
  }, []);
  // Cancel modal handler
  const handleCancelPress = (booking) => {
    setSelectedBooking(booking);
    setCancelModalVisible(true);
  };

  // Chat modal handler
  const handleChatPress = (booking) => {
    setSelectedBooking(booking);
    setChatModalVisible(true);
  };

  // Review modal handler
  const handleReviewPress = (booking) => {
    setSelectedBooking(booking);
    setReviewStars(0);
    setReviewModalVisible(true);
  };

  // Confirm cancel
  const confirmCancel = () => {
    setCancelModalVisible(false);
    axios.post(`http://10.165.131.87:12345/book/modify/${selectedBooking._id}`, { status: 'Cancelled' })
      .then(() => {
        Alert.alert('Order canceled');
        // Here you can also call your API to cancel the order
      })
      .catch((err) => {
        Alert.alert('Failed to cancel order', err.message);
        console.log(err);
      });
  };

  // Submit review
  const submitReview = () => {
    // You can send reviewStars to your backend here
    setReviewModalVisible(false);
    const url = `http://10.165.131.87:12345/worker/rate/${selectedBooking?.email}`;
      axios.post(url, { rating: reviewStars }).then(() => {
         Alert.alert('Thank you for your review!');
        // Here you can also call your API to cancel the order
      })
      .catch((err) => {
        Alert.alert('Failed to review', err.message);
        console.log(err);
      });
    const url1 = `http://10.165.131.87:12345/rate/${selectedBooking?.email}`;
      axios.post(url1, { rating: reviewStars, comment: text, date: new Date() , name: userdata.name,photo: userdata.profileImage }).then(() => {
         Alert.alert('review submitted!');
        // Here you can also call your API to cancel the order
      })
      .catch((err) => {
       Alert.alert('review not submitted', err.message);
        console.log(err);
      });

    setReviewStars(0);
   


  };
const [text, onChangeText] = React.useState(''); // D


// At top level of Bookings component
const socket = useRef(io('http://10.165.131.87:12345')).current;
const [chatMessages, setChatMessages] = useState([]);
const [chatInput, setChatInput] = useState('');
const [typing, setTyping] = useState(false);
const [typingUser, setTypingUser] = useState(null);
const chatScrollRef = useRef();

// Inside useEffect to load chat and setup socket
useEffect(() => {
  if (selectedBooking && chatModalVisible) {
    const roomId = selectedBooking._id;
    const userName = user.name;

    socket.emit('joinRoom', { roomId, userName });

    axios.get(`http://10.165.131.87:12345/messages/${roomId}`).then((res) => {
      setChatMessages(res.data);
    });
    console.log("chatid", roomId);
    console.log("bookingId", selectedBooking._id);
    axios.post(`http://10.165.131.87:12345/book/chat/${selectedBooking._id}`, { chatid: roomId }).then((res) => {
      setChatMessages((prev) => [...prev, res.data]);
    });
    socket.on('receiveMessage', (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });

    socket.on('userTyping', (userTypingName) => {
      if (userTypingName !== userName) setTypingUser(userTypingName);
    });

    socket.on('userStopTyping', (userTypingName) => {
      if (userTypingName === typingUser) setTypingUser(null);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('userTyping');
      socket.off('userStopTyping');
    };
  }
}, [selectedBooking, chatModalVisible]);

const handleSend = () => {
  if (!chatInput.trim()) return;
  const roomId = selectedBooking._id;
  socket.emit('sendMessage', {
    roomId,
    sender: user.name,
    text: chatInput.trim(),
  });
  setChatInput('');
  socket.emit('stopTyping', { roomId, userName: user.name });
};

const handleTyping = (text) => {
  setChatInput(text);
  const roomId = selectedBooking._id;
  socket.emit('typing', { roomId, userName: user.name });

  if (typing) clearTimeout(typing);
  const timeout = setTimeout(() => {
    socket.emit('stopTyping', { roomId, userName: user.name });
  }, 1000);
  setTyping(timeout);
};

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => { router.replace('(tabs)/dashboard'); }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Text style={styles.heading}>My Bookings</Text>

      {/* Cancel Modal */}
      <Modal
        visible={cancelModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Are you sure you want to cancel?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable style={styles.modalButton} onPress={confirmCancel}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, { backgroundColor: 'gray' }]} onPress={() => setCancelModalVisible(false)}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Chat Modal */}
      <Modal
        visible={chatModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setChatModalVisible(false)}
      >
    <View style={[styles.chatModalContent, { padding: 16, backgroundColor: '#f9f9f9' }]}>
  <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#333' }}>
    Chat with {selectedBooking?.wname}
  </Text>

  <ScrollView
    style={{
      height: 280,
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      marginBottom: 12,
    }}
    ref={chatScrollRef}
    onContentSizeChange={() => chatScrollRef.current?.scrollToEnd({ animated: true })}
  >
    {chatMessages.map((msg, idx) => (
      <View
        key={idx}
        style={{
          alignSelf: msg.sender === user.name ? 'flex-end' : 'flex-start',
          backgroundColor: msg.sender === user.name ? '#d1e7dd' : '#e9ecef',
          marginVertical: 4,
          padding: 10,
          borderRadius: 16,
          maxWidth: '80%',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text style={{ fontWeight: '600', color: '#333' }}>{msg.sender}</Text>
        <Text style={{ marginTop: 4, color: '#444' }}>{msg.text}</Text>
      </View>
    ))}
    {typingUser && (
      <Text style={{ fontStyle: 'italic', color: '#666', marginTop: 6 }}>
        {typingUser} is typing...
      </Text>
    )}
  </ScrollView>

  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 12,
      paddingVertical: 6,
    }}
  >
    <TextInput
      placeholder="Type your message"
      value={chatInput}
      onChangeText={handleTyping}
      style={{
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
        color: '#333',
      }}
      placeholderTextColor="#aaa"
    />
    <TouchableOpacity onPress={handleSend}>
      <Text style={{ color: '#007bff', fontWeight: 'bold', fontSize: 16 }}>Send</Text>
    </TouchableOpacity>
  </View>

  <Pressable
    style={{
      marginTop: 20,
      backgroundColor: '#6c757d',
      paddingVertical: 10,
      borderRadius: 10,
    }}
    onPress={() => setChatModalVisible(false)}
  >
    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Close</Text>
  </Pressable>
</View>

      </Modal>

      {/* Review Modal */}
      <Modal
        visible={reviewModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.chatModalContent}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Leave a Review</Text>
            <Pressable style={{marginTop:5 ,backgroundColor:'lightgrey',height:'100',width:"80%"}}>
                      <TextInput
                        style={{padding:5}}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Enter your review"
                        placeholderTextColor="#888"
                      />
                    </Pressable>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setReviewStars(star)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={starIcon}
                    style={{
                      width: 32,
                      height: 32,
                      marginHorizontal: 4,
                      tintColor: reviewStars >= star ? '#FFD700' : '#ccc',
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Pressable style={styles.modalButton} onPress={submitReview} disabled={reviewStars === 0}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
            </Pressable>
            <Pressable style={[styles.modalButton, { backgroundColor: 'gray', marginTop: 10 }]} onPress={() => setReviewModalVisible(false)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          onPress={() => setActiveTab('Upcoming')}
          style={[styles.tabContainer, activeTab === 'Upcoming' && styles.tabContainerActive]}
        >
          <Text style={[styles.tab, activeTab === 'Upcoming' && styles.tabActive]}>Upcoming</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('Past')}
          style={[styles.tabContainer, activeTab === 'Past' && styles.tabContainerActive]}
        >
          <Text style={[styles.tab, activeTab === 'Past' && styles.tabActive]}>Past</Text>
        </Pressable>
      </View>

      {/* Booking List */}
      <ScrollView>
        {activeTab === 'Upcoming' && upcomingdata.map((item, idx) => (
          <View key={item._id || idx} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{item.wtag}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
            <Text style={styles.provider}>Service by {item.wname}</Text>
            <View style={styles.detailRow}>
              <Image source={calendarIcon} style={styles.icon} />
              <Text style={styles.detail}>{item.Date}</Text>
              <Image source={timeIcon} style={[styles.icon, { marginLeft: 12 }]} />
              <Text style={styles.detail}>{item.Time || item.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Image source={locationIcon} style={styles.icon} />
              <Text style={styles.detail}>{item.Address}</Text>
            </View>
            {/* Action Buttons */}
            <View style={styles.actionRow}>
              <Pressable style={styles.actionButton} onPress={() => handleCancelPress(item)}>
                <Image source={require('../../assets/close.png')} style={{ width: 18, height: 18, marginRight: 6 }} />
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.actionButton} onPress={() => handleChatPress(item)}>
                <Image source={require('../../assets/chat.png')} style={{ width: 18, height: 18, marginRight: 6 }} />
                <Text style={{ color: 'navy', fontWeight: 'bold' }}>Chat</Text>
              </Pressable>
            </View>
          </View>
        ))}
        {activeTab === 'Past' && pastdata.map((item, idx) => (
          <View key={item._id || idx} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{item.wtag}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
            <Text style={styles.provider}>Service by {item.wname}</Text>
            <View style={styles.detailRow}>
              <Image source={calendarIcon} style={styles.icon} />
              <Text style={styles.detail}>{item.Date}</Text>
              <Image source={timeIcon} style={[styles.icon, { marginLeft: 12 }]} />
              <Text style={styles.detail}>{item.Time || item.time}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={styles.detailRow}>
                <Image source={locationIcon} style={styles.icon} />
                <Text style={styles.detail}>{item.Address}</Text>
              </View>
              {item.status === 'Completed' && (
                <Pressable
                  style={[styles.actionButton, { backgroundColor: 'navy', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }]}
                  onPress={() => handleReviewPress(item)}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Review</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainerActive: {
    backgroundColor: 'navy',
  },
  tab: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 16,
    color: '#666',
    width: '100%',
  },
  tabActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: 'navy',
  },
  status: {
    backgroundColor: '#e0e7ff',
    color: '#4f46e5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  provider: {
    color: 'black',
    marginTop: 4,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  detail: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: 280,
    alignItems: 'center',
  },
  chatModalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: 320,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: 'navy',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});