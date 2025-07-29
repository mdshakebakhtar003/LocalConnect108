import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const StarRow = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Image
        key={i}
        source={require('../../../assets/star.png')}
        style={[
          styles.starIcon,
          { tintColor: i <= Number(rating) ? '#FFD700' : '#ccc' },
        ]}
      />
    );
  }
  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default function AllReviews() {
  const { id } = useLocalSearchParams();
  const [worker, setWorker] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await axios.get(`http://10.165.131.87:12345/worker/${id}`);
        setWorker(res.data.workers);
      } catch (err) {
        setError('Failed to load worker.');
        console.error(err);
      }
    };
    fetchWorker();
  }, [id]);

  useEffect(() => {
    if (!worker?.email) return;
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://10.165.131.87:12345/rate/${worker.email}`);
        setAllReviews(res.data);
        setFilteredReviews(res.data); // Default show all
      } catch (err) {
        setError('Failed to load reviews.');
        console.error(err);
      }
    };
    fetchReviews();
  }, [worker]);

  const handleFilter = (rating) => {
    if (rating === null) {
      setFilteredReviews(allReviews);
      setSelectedRating(null);
    } else {
      const filtered = allReviews.filter((r) => Number(r.rating) === rating);
      setFilteredReviews(filtered);
      setSelectedRating(rating);
    }
  };

  if (error) return <Text>{error}</Text>;
  if (!worker || !allReviews) return <Text>Loading reviews...</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          onPress={() => handleFilter(null)}
          style={[styles.filterButton, selectedRating === null && styles.activeFilter]}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handleFilter(num)}
            style={[
              styles.filterButton,
              selectedRating === num && styles.activeFilter,
            ]}
          >
            <Text style={styles.filterText}>{num}★</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Review List */}
      <View style={{ minHeight: 200, marginTop: 10 }}>
        {filteredReviews.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No reviews yet.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredReviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <View style={styles.headerRow}>
                  <Image
                    source={{ uri: `http://10.165.131.87:12345/${item.photo}` }}
                    style={styles.avatar}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.uname}>{item.uname}</Text>
                    <StarRow rating={item.rating} />
                    <Text style={styles.date}>
                      {item.date ? new Date(item.date).toLocaleDateString() : ''}
                    </Text>
                  </View>
                </View>
                <Text style={styles.comment}>"{item.comment}"</Text>
              </View>
            )}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginTop: 6,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeFilter: {
    backgroundColor: 'navy',
  },
  filterText: {
    color: 'black',
    fontWeight: 'bold',
  },
  reviewCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  uname: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
    marginTop: 2,
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  comment: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 30,
  },
});