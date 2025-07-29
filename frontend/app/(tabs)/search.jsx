import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  const [text, onChangeText] = React.useState(''); // Default text empty for better UX

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Search</Text>
      </View>

      <View style={styles.searchWrapper}>
        <Pressable style={styles.searchBox}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search for services"
            placeholderTextColor="#888"
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          Search for workers using the filters above
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // light background
  },
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchWrapper: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  searchBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2, // for subtle shadow on Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  info: {
    marginTop: 60,
    marginLeft: 25,
  },
  infoText: {
    color: '#333',
    fontSize: 16,
  },
});
