import axios from 'axios';
import { BlurView } from 'expo-blur';
import { Link, useRouter } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector } from "react-redux";
import star from '../../assets/star.png';

import RazorpayCheckout from 'react-native-razorpay';
const Barber = () => {
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [serviceDate, setServiceDate] = useState('');
  const [serviceTime, setServiceTime] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [Price,setPrice]=useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const user = useSelector((store) => store.user);
    const [bookid,setbookid]=useState('');
    const { category } = useLocalSearchParams();
    console.log(category);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://10.165.131.87:12345/worker/data/${category}`;
        const res = await axios.get(url);
        setUserData(res.data.workers);
      } catch (err) {
        //Alert.alert('No worker found');
      }
    };
    
    fetchData();
    const fetchData1 = async () => {
      try {
        const url = `http://10.165.131.87:12345/user/profile/${user?.email}`;
        const res = await axios.get(url);
        setuserdata(res.data.user);
      } catch (err) {
        Alert.alert('Failed to fetch profile', err.message);
      }
    };
    
    fetchData1();

  }, []);

  const openModal = (worker) => {
    setSelectedWorker(worker);
    //setPrice()
    setModalVisible(true);
  };
const serverUrl = 'http://10.165.131.87:12345';
  const photoUrl = `${serverUrl}/${userData.profileImage}`;
  console.log("photoUrl",photoUrl);
  const confirmBooking = () => {
    if (!serviceDate || !serviceTime || !address) {
      Alert.alert('Please fill all required fields');
      return;
    }
  // Razorpay payment
  const options = {
    description: `Booking service with ${selectedWorker.name}`,
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: "INR",
    key: "rzp_test_1qYPwJ2DWfCkzb", // Your Razorpay key
    amount: selectedWorker.Hourly_rate * 100, // Amount in paise
    name: "Service Booking",
    prefill: {
      name: userdata.name,
      email: userdata.email,
      contact: userdata.phone,
    },
    theme: { color: "navy" },
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      // Payment success, continue booking
      postBooking();
    //  Alert.alert('Payment Success', `Payment ID: ${data.razorpay_payment_id}`);
      console.log("Payment Success", data);
    })
    .catch((error) => {
      console.log("Razorpay Payment Failed", error);
     // Alert.alert('Payment Failed', error.description || 'Payment cancelled');
    });


  // Post booking data to the server
  // Ensure you have the correct endpoint and data structure

    if (!selectedWorker || !userdata) {
      Alert.alert('Please select a worker and ensure user data is available.');
      return;
    }
    const postData = async () => {
      try {
        const url = 'http://10.165.131.87:12345/book/service';
        console.log({"Date": serviceDate, "Time": serviceTime, "Address": address, "instruction": instructions, "email": selectedWorker.email,"name":userdata.name,"phone":userdata.phone});
        const res = await axios.post(url,{"Date": serviceDate, "Time": serviceTime, "Address": address, "instruction": instructions, "email": selectedWorker.email,"name":userdata.name,"phone":userdata.phone,"uemail":userdata.email,"price":selectedWorker.Hourly_rate,"wname":selectedWorker.name,"wtag":selectedWorker.tag,"status":"Pending"});
        setbookid(res.data.newUser._id);
        if (bookid!==null) {
          Alert.alert('Booking Successful', 'Your service has been booked successfully.');
        } 
        else {
          Alert.alert('Booking Successful', 'Your service has been booked successfully.');
        //  Alert.alert('Booking Failed', 'Please try again later.');
        }
      } catch (err) {
        // Alert.alert('Booking Failed', 'Internal server error. Please try again later.');
      }
    };
    postData();
    if(bookid!==null){
    const otpsend = async () => {
      try {
        const url = `http://10.165.131.87:12345/otp/send/${bookid}/${user?.email}`;

        const res = await axios.post(url);
        console.log("res",bookid,user?.email);
        if (res.status === 200) {
          Alert.alert('OTP Sent', 'An OTP has been sent to your email and phone.');
        } else {
          Alert.alert('OTP Sent', 'An OTP has been sent to your email and phone.');
         // Alert.alert('OTP Failed', 'Failed to send OTP. Please try again later.');
        }
      } catch (err) {
       // Alert.alert('OTP Failed', 'Internal server error. Please try again later.');
      }
    };
    otpsend();
  };

  setModalVisible(false);
  setServiceDate('');
  setServiceTime('');
  setAddress('');
    setInstructions('');
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirmDate = (date) => {
    setServiceDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  const handleConfirmTime = (time) => {
    setServiceTime(moment(time).format('hh:mm A'));
    hideTimePicker();
  };

  return (
    <View>
      {/* MODAL */}
      
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <Text style={styles.title}>Book Service</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Image
                    source={require('../../assets/close.png')}
                    style={{ height: 18, width: 18 }}
                  />
                </Pressable>
              </View>

              <Text style={styles.label}>Service Details</Text>
              <Text style={styles.subText}>
                with {selectedWorker?.name || 'Provider'}
              </Text>

              <Text style={styles.label}>Select Date</Text>
              <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                <Text style={{ color: serviceDate ? 'black' : 'grey' }}>
                  {serviceDate || 'Pick a date'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Select Time</Text>
              <TouchableOpacity style={styles.input} onPress={showTimePicker}>
                <Text style={{ color: serviceTime ? 'black' : 'grey' }}>
                  {serviceTime || 'Select a time slot'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Service Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter the address for service"
                placeholderTextColor="grey"
                value={address}
                onChangeText={setAddress}
              />

              <Text style={styles.label}>Special Instructions (Optional)</Text>
              <TextInput
                style={[styles.input, { height: 60 }]}
                placeholder="Any specific details or instructions"
                placeholderTextColor="grey"
                value={instructions}
                onChangeText={setInstructions}
                multiline
              />

              <TouchableOpacity style={styles.bookBtn} onPress={confirmBooking}>
                <Text style={styles.bookText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>

        {/* Pickers */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />
      </Modal>

      {/* LIST OF PROVIDERS */}
      <FlatList
        style={{ marginTop: 0, marginLeft: 10, marginRight: 10 }}
        data={userData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 5,
              marginLeft: 5,
              borderRadius: 5,
              padding: 1,
              height: 150,
              width: '100%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
                height: 150,
              }}
            >
              <Image source={{ uri: `${serverUrl}/${item.profileImage}` }} style={{ height: 70, width: 70,borderRadius: 35,borderColor:'navy' }} />
              <View>
                <Link
                  href={`/workerprofile/${item._id}`}
                  asChild
                  style={{
                    alignItems: '',
                    marginLeft: 1,
                    backgroundColor: 'white',
                    borderRadius: 0,
                    padding: 5,
                    width: '100%',
                  }}
                >
                  <TouchableOpacity>
                    
                    <Text style={styles.catname}>{item.name}</Text>
                    <Text style={styles.catname}>
                      {item.Experience} experience
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.catname}>{Number(item.rating.reduce((sum, val) => sum + val, 0) / item.rating.length).toFixed(1) }</Text>
                      <Image source={star} style={{ height: 15, width: 15,marginLeft:5 }} />
                    </View>
                    <Text style={styles.catname}>rs {item.Hourly_rate}</Text>
                  </TouchableOpacity>
                </Link>
              </View>
              <Pressable
                style={{
                  marginTop: 2,
                  backgroundColor: 'navy',
                  borderRadius: 5,
                  padding: 5,
                }}
                onPress={() => openModal(item)}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>Book Now</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Barber;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 5,
    color: 'black',
  },
  catname: {
    fontSize: 16,
    color: 'black',
    fontWeight: '',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    color: 'black',
  },
  subText: {
    fontSize: 14,
    marginBottom: 10,
    color: 'grey',
  },
  bookBtn: {
    backgroundColor: 'navy',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bookText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
