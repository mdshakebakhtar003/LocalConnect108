import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const COLORS = {
  background: '#FFFFFF',
  text: '#000000',
  subtitle: '#333333',
  navy: 'navy',
  lightNavy: '#E8F0FF',
  border: '#E0E0E0',
  danger: '#D32F2F',
};

const PrivacySecurityScreen = () => {
  const router = useRouter();

  const [twoFactor, setTwoFactor] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [activityLogs, setActivityLogs] = useState(true);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to permanently delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button Header */}
      <View style={styles.header}>
       <TouchableOpacity onPress={() => { router.replace('(tabs)/profile'); }}>
                 <Ionicons name="arrow-back" size={24} color="black" />
               </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>🔒 Account Security</Text>

        {/* Change Password */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Change Password</Text>
            <Text style={styles.rowSubtitle}>Update your account password</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Two-Factor */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Two-Factor Authentication</Text>
            <Text style={styles.rowSubtitle}>Secure your account with 2FA</Text>
          </View>
          <Switch
            value={twoFactor}
            onValueChange={setTwoFactor}
            trackColor={{ false: '#ccc', true: '#AABFFF' }}
            thumbColor={twoFactor ? COLORS.navy : '#f4f3f4'}
          />
        </View>

        {/* Biometric */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Biometric Login</Text>
            <Text style={styles.rowSubtitle}>Use fingerprint or face recognition</Text>
          </View>
          <Switch
            value={biometricLogin}
            onValueChange={setBiometricLogin}
            trackColor={{ false: '#ccc', true: '#AABFFF' }}
            thumbColor={biometricLogin ? COLORS.navy : '#f4f3f4'}
          />
        </View>

        <Text style={styles.sectionTitle}>👁 Privacy Settings</Text>

        {/* Data Sharing */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Data Sharing</Text>
            <Text style={styles.rowSubtitle}>Share usage data to improve services</Text>
          </View>
          <Switch
            value={dataSharing}
            onValueChange={setDataSharing}
            trackColor={{ false: '#ccc', true: '#AABFFF' }}
            thumbColor={dataSharing ? COLORS.navy : '#f4f3f4'}
          />
        </View>

        {/* Location Tracking */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Location Tracking</Text>
            <Text style={styles.rowSubtitle}>Track location for better service</Text>
          </View>
          <Switch
            value={locationTracking}
            onValueChange={setLocationTracking}
            trackColor={{ false: '#ccc', true: '#AABFFF' }}
            thumbColor={locationTracking ? COLORS.navy : '#f4f3f4'}
          />
        </View>

        {/* Marketing Emails */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Marketing Emails</Text>
            <Text style={styles.rowSubtitle}>Receive marketing communications</Text>
          </View>
          <Switch
            value={marketingEmails}
            onValueChange={setMarketingEmails}
            trackColor={{ false: '#ccc', true: '#AABFFF' }}
            thumbColor={marketingEmails ? COLORS.navy : '#f4f3f4'}
          />
        </View>

        {/* Activity Logs */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Activity Logs</Text>
            <Text style={styles.rowSubtitle}>Track account activity for security</Text>
          </View>
          <Switch
            value={activityLogs}
            onValueChange={setActivityLogs}
            trackColor={{ false: '#ccc', true: '#AABFFF' }}
            thumbColor={activityLogs ? COLORS.navy : '#f4f3f4'}
          />
        </View>

        <Text style={styles.sectionTitle}>📦 Your Data</Text>

        {/* Download Data */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Download Your Data</Text>
            <Text style={styles.rowSubtitle}>Get a copy of your personal data</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
        </View>

        {/* Delete Account */}
        <View style={styles.deleteRow}>
          <View>
            <Text style={styles.deleteTitle}>Delete Account</Text>
            <Text style={styles.rowSubtitle}>Permanently remove your account</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>🔐 Your data is secure with us</Text>
          <Text style={styles.noteSubtitle}>
            We use industry-leading encryption and security practices to keep your personal information safe.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  content: {
    padding: 16,
    paddingBottom: 60,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  rowSubtitle: {
    fontSize: 13,
    color: COLORS.subtitle,
    marginTop: 2,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: COLORS.lightNavy,
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.navy,
    fontWeight: 'bold',
  },
  deleteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  deleteTitle: {
    fontSize: 16,
    color: COLORS.danger,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteBox: {
    backgroundColor: COLORS.lightNavy,
    padding: 16,
    marginTop: 24,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: COLORS.navy,
  },
  noteSubtitle: {
    fontSize: 13,
    color: COLORS.subtitle,
  },
});

export default PrivacySecurityScreen;
