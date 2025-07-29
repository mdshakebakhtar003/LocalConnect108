import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import React from 'react';
import morecategories from '../../Data/morecategories';
import { useRouter } from 'expo-router';

const More = () => {
  const router = useRouter();

  const handlePress = (item) => {
    router.push(`/category/${item.name}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={morecategories}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)} style={styles.card}>
            <Image source={item.Icon} style={styles.icon} />
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fa',
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
