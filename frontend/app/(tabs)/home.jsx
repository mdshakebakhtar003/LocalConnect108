import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import React, { useEffect } from 'react';
import categories from '../../Data/categories';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const Index = () => {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('');
  const [filteredCategories, setFilteredCategories] = React.useState(categories);

  useEffect(() => {
    if (text === '') {
      setFilteredCategories(categories); // reset
    } else {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [text]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.lgo}>
          <Image source={require('../../assets/Logo.png')} style={styles.img} />
          <Text style={styles.txt}>LocalConnect</Text>
        </View>
        <Image source={require('../../assets/menu.png')} style={styles.menu} />
      </View>

      <View style={styles.searchdiv}>
        <Image source={require('../../assets/icon.png')} style={styles.icon} />
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

      <View>
        <Text style={styles.services}>Most Booked Categories</Text>
        <FlatList
          style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
          data={filteredCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Link
              href={`/components/${item.name}`}
              asChild
              style={styles.horizontalItem}
            >
              <TouchableOpacity>
                <Image source={item.Icon} style={styles.caticon} />
                <Text style={styles.catname}>{item.name}</Text>
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.services}>Categories</Text>
        <FlatList
          data={filteredCategories}
          numColumns={3}
          key={'3columns'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
          renderItem={({ item }) => (
            <Link href={`/components/${item.name}`} asChild>
              <TouchableOpacity>
                <View style={styles.gridItem}>
                  <Image source={item.Icon} style={styles.caticon1} />
                  <Text style={styles.catname1}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 250,
    width: '100%',
    backgroundColor: 'navy',
  },
  lgo: {
    flexDirection: 'row',
    width: 192.58,
    height: 71.42,
  },
  img: {
    width: 80,
    height: 80,
    marginTop: 10,
    marginLeft: 15,
  },
  txt: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 30,
  },
  menu: {
    width: 30,
    height: 30,
    marginTop: 30,
    marginRight: 15,
  },
  searchdiv: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: -20,
  },
  icon: {
    opacity: 0.5,
    height: 24,
    width: 24,
  },
  input: {
    
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  services: {
    fontSize: 18,
    marginLeft: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  horizontalItem: {
    alignItems: 'center',
    marginLeft: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  caticon: {
    width: 50,
    height: 50,
  },
  catname: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
  gridItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 4, // dynamic width for 3 items
    marginHorizontal: 9,
    elevation: 2,
  },
  caticon1: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  catname1: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});
