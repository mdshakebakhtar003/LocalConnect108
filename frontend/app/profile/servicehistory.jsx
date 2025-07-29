import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const NAVY = 'navy';

const TABS = [
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const SERVICE_HISTORY = [
  {
    id: 1,
    type: 'Deep Cleaning',
    provider: 'CleanPro Services',
    date: '12 Apr 2025',
    time: '9:00 AM - 2:00 PM',
    location: 'Home, Indiranagar',
    price: '₹2,499',
    status: 'Upcoming',
    statusColor: NAVY,
  },
  // Add more items as needed
];

const ServiceHistory = () => {
  const [tab, setTab] = useState('ongoing');
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fb' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { router.replace('(worker)/profile') }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service History</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {TABS.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tabBtn, tab === t.key && styles.tabBtnActive]}
            onPress={() => setTab(t.key)}
          >
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {tab === 'ongoing' && SERVICE_HISTORY.length > 0 && (
          <View style={styles.cardBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={styles.avatarCircle}>
                <Ionicons name="briefcase-outline" size={28} color="#bbb" />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.serviceType}>{SERVICE_HISTORY[0].type}</Text>
                <Text style={styles.provider}>{SERVICE_HISTORY[0].provider}</Text>
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <View style={[styles.statusPill, { backgroundColor: '#fff', borderColor: SERVICE_HISTORY[0].statusColor, borderWidth: 2 }]}>
                  <Text style={{ color: SERVICE_HISTORY[0].statusColor, fontWeight: 'bold', fontSize: 13 }}>{SERVICE_HISTORY[0].status}</Text>
                </View>
              </View>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="date-range" size={16} color="#888" />
              <Text style={styles.infoText}>{SERVICE_HISTORY[0].date}</Text>
              <Ionicons name="time-outline" size={16} color="#888" style={{ marginLeft: 20 }} />
              <Text style={styles.infoText}>{SERVICE_HISTORY[0].time}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color="#888" />
              <Text style={styles.infoText}>{SERVICE_HISTORY[0].location}</Text>
            </View>
            <View style={styles.bottomRow}>
              <Text style={styles.price}>{SERVICE_HISTORY[0].price}</Text>
              <TouchableOpacity style={styles.contactBtn}>
                <Ionicons name="chatbubble-ellipses-outline" size={16} color={NAVY} />
                <Text style={{ color: NAVY, marginLeft: 6, fontWeight: 'bold' }}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* Add similar blocks for completed/cancelled if needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceHistory;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#222',
  },
  tabsRow: {
    flexDirection: 'row',
    margin: 12,
    marginBottom: 8,
    backgroundColor: '#f6f8fa',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabTextActive: {
    color: NAVY,
  },
  cardBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 18,
    marginBottom: 18,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceType: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  provider: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 2,
    gap: 4,
  },
  infoText: {
    color: '#444',
    fontSize: 14,
    marginLeft: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});