import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const NAVY = 'navy';

const CARDS = [
  {
    id: 1,
    brand: 'visa',
    last4: '4242',
    exp: '05/27',
    default: true,
  },
  {
    id: 2,
    brand: 'mc',
    last4: '5555',
    exp: '08/26',
    default: false,
  },
];

const Payments = () => {
  const [tab, setTab] = useState('methods');
  const [cards, setCards] = useState(CARDS);
const router=useRouter();
  const setDefault = (id) => {
    setCards(cards.map(card => ({
      ...card,
      default: card.id === id,
    })));
  };

  const removeCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { router.replace('(tabs)/profile'); }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'methods' && styles.tabBtnActive]}
          onPress={() => setTab('methods')}
        >
          <Text style={[styles.tabText, tab === 'methods' && styles.tabTextActive]}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'transactions' && styles.tabBtnActive]}
          onPress={() => setTab('transactions')}
        >
          <Text style={[styles.tabText, tab === 'transactions' && styles.tabTextActive]}>Transactions</Text>
        </TouchableOpacity>
      </View>

      {tab === 'methods' && (
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {/* Add Payment Method */}
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={22} color="#fff" />
            <Text style={styles.addBtnText}>Add Payment Method</Text>
          </TouchableOpacity>

          {/* Cards */}
          {cards.map(card => (
            <View key={card.id} style={styles.cardBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {card.brand === 'visa' ? (
                  <View style={styles.visaIcon}><Text style={{ color: '#fff', fontWeight: 'bold' }}>VISA</Text></View>
                ) : (
                  <View style={styles.mcIcon}><Text style={{ color: '#fff', fontWeight: 'bold' }}>MC</Text></View>
                )}
                <Text style={styles.cardNum}>•••• {card.last4}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <MaterialIcons name="date-range" size={16} color="#888" />
                <Text style={styles.cardExp}>Expires {card.exp}</Text>
              </View>
              <View style={styles.cardActions}>
                {card.default ? (
                  <View style={styles.defaultBtn}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="green" />
                    <Text style={{ color: 'green', marginLeft: 4 }}>Default</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.setDefaultBtn}
                    onPress={() => setDefault(card.id)}
                  >
                    <Text style={{ color: NAVY }}>Set as default</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeCard(card.id)}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Secure Payments Notice */}
          <View style={styles.secureBox}>
            <Ionicons name="alert-circle-outline" size={20} color="#bfa100" style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.secureTitle}>Secure Payments</Text>
              <Text style={styles.secureText}>
                Your payment information is encrypted and securely stored. We do not store your full card details on our servers.
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {tab === 'transactions' && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#888', fontSize: 16 }}>No transactions found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Payments;

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
  addBtn: {
    backgroundColor: NAVY,
    borderRadius: 10,
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  cardBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 8,
    marginBottom: 18,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  visaIcon: {
    backgroundColor: '#2563eb',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
  },
  mcIcon: {
    backgroundColor: '#e11d48',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
  },
  cardNum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  cardExp: {
    color: '#888',
    fontSize: 14,
    marginLeft: 6,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  defaultBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6fbe6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
  },
  setDefaultBtn: {
    backgroundColor: '#f6f8fa',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
  },
  removeBtn: {
    backgroundColor: '#f87171',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 'auto',
  },
  secureBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fffbe6',
    borderRadius: 10,
    marginHorizontal: 8,
    marginTop: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ffe58f',
    gap: 8,
  },
  secureTitle: {
    color: '#bfa100',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  secureText: {
    color: '#bfa100',
    fontSize: 13,
    marginTop: 2,
    maxWidth: 320,
  },
});