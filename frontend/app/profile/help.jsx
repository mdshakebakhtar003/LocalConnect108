import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const NAVY = 'navy';

const QUICK_TOPICS = [
  { label: 'Booking Issues', icon: <MaterialIcons name="event-note" size={22} color={NAVY} /> },
  { label: 'Payment Problems', icon: <MaterialIcons name="payment" size={22} color={NAVY} /> },
  { label: 'Service Quality', icon: <MaterialIcons name="star-border" size={22} color={NAVY} /> },
  { label: 'Account Issues', icon: <FontAwesome name="user-o" size={22} color={NAVY} /> },
];

const FAQS = [
  {
    question: 'How do I book a service?',
    answer: 'To book a service, browse available services, select your preferred option, and follow the on-screen instructions to complete your booking.',
  },
  {
    question: 'How do payments work?',
    answer: 'We offer multiple payment options including credit/debit cards, digital wallets, and cash on delivery for some services. Payments are processed securely through our payment gateway and you will receive a receipt via email after payment.',
  },
  {
    question: 'Can I reschedule my booking?',
    answer: 'Yes, you can reschedule your booking from your dashboard or by contacting support before the scheduled time.',
  },
  {
    question: 'How can I track my service provider?',
    answer: 'You can track your service provider in real-time from your dashboard once your booking is confirmed.',
  },
];

const Help = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const router = useRouter();

  const handleExpand = (idx) => {
    setExpanded(expanded === idx ? null : idx);
  };

  // Contact actions
  const callSupport = () => Linking.openURL('tel:18001234567');
  const emailSupport = () => Linking.openURL('mailto:support@mdshakebakhtar003.com');
  const startChat = () => alert('Live chat feature coming soon!');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('(worker)/profile')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={{ marginLeft: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help topics..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity>
            <Text style={{ color: NAVY, fontWeight: 'bold', marginRight: 8 }}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Help */}
        <Text style={styles.sectionTitle}>Quick Help</Text>
        <View style={styles.quickRow}>
          {QUICK_TOPICS.map((topic, idx) => (
            <View key={topic.label} style={styles.quickBox}>
              {topic.icon}
              <Text style={styles.quickText}>{topic.label}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.viewAllHelp} onPress={() => {}}>
          <Text style={{ color: NAVY, fontWeight: 'bold' }}>View all help topics</Text>
          <Ionicons name="chevron-forward" size={18} color={NAVY} />
        </TouchableOpacity>

        {/* Contact Us */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactBox}>
          <View style={styles.contactRow}>
            <Ionicons name="call-outline" size={22} color={NAVY} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.contactTitle}>Call Support</Text>
              <Text style={styles.contactSub}>9AM - 9PM, All Days</Text>
            </View>
            <TouchableOpacity style={styles.contactBtn} onPress={callSupport}>
              <Text style={{ color: NAVY, fontWeight: 'bold' }}>1800-123-4567</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color={NAVY} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.contactTitle}>Live Chat</Text>
              <Text style={styles.contactSub}>Chat with our support team</Text>
            </View>
            <TouchableOpacity style={styles.contactBtn} onPress={startChat}>
              <Text style={{ color: NAVY, fontWeight: 'bold' }}>Start Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="mail-outline" size={22} color={NAVY} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.contactTitle}>Email Support</Text>
              <Text style={styles.contactSub}>support@mdshakebakhtar003.com</Text>
            </View>
            <TouchableOpacity style={styles.contactBtn} onPress={emailSupport}>
              <Text style={{ color: NAVY, fontWeight: 'bold' }}>Email Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqSection}>
          {FAQS.map((faq, idx) => (
            <View key={faq.question}>
              <Pressable
                style={styles.faqQuestion}
                onPress={() => handleExpand(idx)}
              >
                <Text style={styles.faqQText}>{faq.question}</Text>
                <Ionicons
                  name={expanded === idx ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#333"
                />
              </Pressable>
              {expanded === idx && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.viewMoreFaqs} onPress={() => {}}>
            <Text style={{ color: NAVY, fontWeight: 'bold' }}>View more FAQs</Text>
            <Ionicons name="chevron-forward" size={18} color={NAVY} />
          </TouchableOpacity>
        </View>

        {/* Send Us a Message */}
        <Text style={styles.sectionTitle}>Send Us a Message</Text>
        <View style={styles.messageBox}>
          <Text style={styles.messageLabel}>Your Message</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Describe your issue or question..."
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={() => alert('Message sent!')}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Help;

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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#f6f8fa',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#222',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 18,
    marginBottom: 8,
    color: '#222',
  },
  quickRow: {
    marginHorizontal: 8,
    marginBottom: 8,
  },
  quickBox: {
    backgroundColor: '#f6f8fa',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginVertical: 6,
    marginHorizontal: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickText: {
    color: '#222',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
  },
  viewAllHelp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 16,
    gap: 4,
  },
  contactBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginBottom: 16,
    padding: 4,
    elevation: 1,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  contactTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  contactSub: {
    color: '#888',
    fontSize: 13,
  },
  contactBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f6f8fa',
  },
  faqSection: {
    marginHorizontal: 8,
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingBottom: 8,
    marginBottom: 16,
    elevation: 1,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 2,
    marginTop: 8,
  },
  faqQText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    flex: 1,
  },
  faqAnswer: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
    marginBottom: 2,
  },
  faqAText: {
    color: '#444',
    fontSize: 15,
    lineHeight: 21,
  },
  viewMoreFaqs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 8,
    gap: 4,
  },
  messageBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginTop: 8,
    padding: 14,
    elevation: 1,
  },
  messageLabel: {
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    fontSize: 15,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    minHeight: 80,
    marginBottom: 16,
    color: '#222',
    backgroundColor: '#f6f8fa',
  },
  sendBtn: {
    backgroundColor: NAVY,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
});