import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
const NAVY = 'navy';
const BLACK = 'black';
const WHITE = 'white';

const SettingsScreen = () => {
  const router=useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const toggle = setter => () => setter(prev => !prev);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => { router.replace('(tabs)/profile'); }}>
          <Ionicons name="arrow-back" size={24} color={WHITE} />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* App Settings */}
        <Text style={styles.sectionTitle}>App Settings</Text>

        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>Dark Mode</Text>
            <Text style={styles.itemSubtitle}>Use dark theme</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={toggle(setDarkMode)}
            thumbColor={darkMode ? NAVY : '#ccc'}
            trackColor={{ false: '#aaa', true: 'grey' }}
          />
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>Language</Text>
            <Text style={styles.itemSubtitle}>English</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={NAVY} />
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>App Cache</Text>
            <Text style={styles.itemSubtitle}>Currently using 24.5 MB</Text>
          </View>
          <TouchableOpacity style={styles.clearBtn}>
            <Text style={styles.clearText}>Clear Cache</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Preferences */}
        <Text style={styles.sectionTitle}>Notification Preferences</Text>

        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>Push Notifications</Text>
            <Text style={styles.itemSubtitle}>Receive app notifications</Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={toggle(setPushNotifications)}
            thumbColor={pushNotifications ? NAVY : '#ccc'}
            trackColor={{ false: '#aaa', true: NAVY }}
          />
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>Email Notifications</Text>
            <Text style={styles.itemSubtitle}>Receive emails for updates</Text>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={toggle(setEmailNotifications)}
            thumbColor={emailNotifications ? NAVY : '#ccc'}
            trackColor={{ false: '#aaa', true: NAVY }}
          />
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>SMS Notifications</Text>
            <Text style={styles.itemSubtitle}>Receive text messages</Text>
          </View>
          <Switch
            value={smsNotifications}
            onValueChange={toggle(setSmsNotifications)}
            thumbColor={smsNotifications ? NAVY : '#ccc'}
            trackColor={{ false: '#aaa', true: NAVY }}
          />
        </View>

        {/* About & Support */}
        <Text style={styles.sectionTitle}>About & Support</Text>

        <View style={styles.item}>
          <Text style={styles.itemTitle}>App Version</Text>
          <Text style={styles.itemSubtitle}>1.0.0</Text>
        </View>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={22} color={NAVY} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>About Us</Text>
          <Ionicons name="chevron-forward" size={22} color={NAVY} />
        </TouchableOpacity>

        {/* Account */}
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.logoutItem}>
          <FontAwesome name="sign-out" size={20} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteItem}>
          <FontAwesome name="trash" size={20} color="red" />
          <Text style={styles.logoutText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  header: {
    backgroundColor: NAVY,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: WHITE,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NAVY,
    marginTop: 24,
    marginBottom: 8,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: BLACK,
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#555',
  },
  clearBtn: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearText: {
    color: 'navy',
    fontWeight: '500',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: WHITE,
    borderRadius: 8,
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  deleteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: WHITE,
    borderRadius: 8,
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
