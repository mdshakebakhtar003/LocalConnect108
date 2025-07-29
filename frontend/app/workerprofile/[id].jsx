import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const StarRow = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Image
        key={i}
        source={require('../../assets/star.png')}
        style={[
          styles.starIcon,
          { tintColor: i <= Number(rating) ? '#FFD700' : '#ccc' },
        ]}
      />
    );
  }
  return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{stars}</View>;
};

export default function WorkerProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [worker, setWorker] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [review, setReview] = React.useState([]);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const response = await axios.get(`http://10.165.131.87:12345/worker/${id}`);
        setWorker(response.data.workers);
      } catch (err) {
        setError('Failed to load worker data.');
        console.error(err);
      }
    };
    fetchWorkerData();
  }, [id]);

  useEffect(() => {
    if (!worker || !worker.email) return;
    const fetchWorkerReview = async () => {
      try {
        const response = await axios.get(`http://10.165.131.87:12345/rate/${worker.email}`);
        setReview(response.data);
      } catch (err) {
        setError('Failed to load review data.');
        console.error(err);
      }
    };
    fetchWorkerReview();
  }, [worker]);

  if (error) {
    return <Text>{error}</Text>;
  }
  if (!worker) {
    return <Text>Loading...</Text>;
  }

  // Show only first 2 reviews
  const reviewsToShow = review.slice(0, 2);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.profileCard}>
        <Pressable style={styles.avatarPressable}>
          <Image source={{ uri: `http://10.165.131.87:12345/${worker.profileImage}` }} style={styles.avatar} />
        </Pressable>
        <Text style={styles.workerName}>{worker.name}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{worker.tag}</Text>
        </View>
        <View style={styles.rowCenter}>
          <Image source={require('../../assets/approved.png')} style={styles.iconSmall} />
          <Text style={{ color: 'green', marginTop: 6 }}>Verified</Text>
        </View>
        <View style={styles.rowCenter}>
          <Image source={require('../../assets/placeholder.png')} style={styles.iconTiny} />
          <Text style={{ color: 'dodgerblue', marginTop: 4 }}>{worker.location}</Text>
        </View>
      </View>
      <Pressable style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Service</Text>
      </Pressable>
      {/* Service Provider Details as a 2x2 grid */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Service Provider Details</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailsCell}>
            <Image source={require('../../assets/helmet.png')} style={styles.iconSmall} />
            <Text style={styles.detailsLabel}>Experience</Text>
            <Text style={styles.detailsValue}>{worker.Experience} years</Text>
          </View>
          <View style={styles.detailsCell}>
            <Image source={require('../../assets/wallet.png')} style={styles.iconSmall} />
            <Text style={styles.detailsLabel}>Hourly rate</Text>
            <Text style={styles.detailsValue}>{worker.Hourly_rate} / hr</Text>
          </View>
        </View>
        <View style={styles.detailsGrid}>
          <View style={styles.detailsCell}>
            <Image source={require('../../assets/verified.png')} style={styles.iconSmall} />
            <Text style={styles.detailsLabel}>Job done</Text>
            <Text style={styles.detailsValue}>{worker.Job_done}</Text>
          </View>
          <View style={styles.detailsCell}>
            <Image source={require('../../assets/star.png')} style={styles.iconSmall} />
            <Text style={styles.detailsLabel}>Rating</Text>
            <Text style={styles.detailsValue}>
              {worker.rating && worker.rating.length > 0
                ? (
                    Number(
                      worker.rating.reduce((sum, val) => sum + Number(val), 0) / worker.rating.length
                    ).toFixed(1)
                  )
                : 'N/A'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.reviewsCard}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Reviews</Text>
        <FlatList
          data={reviewsToShow}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeaderRow}>
                <Image
                  source={{ uri: `http://10.165.131.87:12345/${item.photo}` }}
                  style={styles.reviewAvatar}
                />
                <Text style={styles.reviewUemail}>{item.uname}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: "flex-start", marginTop: 4 }}>
                <StarRow rating={item.rating} />
                <Text style={styles.reviewDate}>{item.date ? new Date(item.date).toLocaleDateString() : ''}</Text>
              </View>
              <View style={styles.reviewCommentRow}>
                <Text style={styles.reviewText}>{item.comment}</Text>
              </View>
            </View>
          )}
          scrollEnabled={false}
        />
        {review.length > 2 && (
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => router.replace(`/workerprofile/allreviews/${id}`)}
          >
            <Text style={styles.showAllButtonText}>Show All Reviews</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    height: 220,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '90%',
  },
  avatarPressable: {
    borderRadius: 50,
    backgroundColor: 'white',
    height: 80,
    width: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  workerName: {
    marginTop: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    color: 'black',
  },
  tagContainer: {
    backgroundColor: 'navy',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 2,
  },
  tagText: {
    color: 'white',
    padding: 5,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 2,
  },
  iconSmall: {
    height: 20,
    width: 20,
    marginTop: 6,
  },
  iconTiny: {
    height: 18,
    width: 18,
    marginTop: 4,
  },
  bookButton: {
    marginTop: -18,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'navy',
    height: 30,
    width: '60%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsCard: {
    minHeight: 160,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '90%',
    paddingBottom: 10,
    paddingTop: 10,
  },
  detailsTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 0,
    fontSize: 16,
    marginBottom: 10,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  detailsCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#f6f8fa',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  detailsLabel: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  detailsValue: {
    fontWeight: 'bold',
    color: 'navy',
    marginTop: 2,
    fontSize: 15,
  },
  reviewsCard: {
    minHeight: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '90%',
    paddingBottom: 10,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 2,
    marginBottom: 6,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  reviewAvatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: 'lightgrey',
  },
  reviewUemail: {
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    fontSize: 16,
  },
  reviewRating: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 0,
  },
  reviewDate: {
    color: '#888',
    fontSize: 12,
    marginLeft: 8,
    flex: 0,
  },
  reviewCommentRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 2,
  },
  reviewText: {
    marginTop: 2,
    color: '#333',
    flex: 1,
    fontSize: 14,
    fontStyle: 'italic',
  },
  starIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 1,
  },
  showAllButton: {
    marginTop: -100,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  showAllButtonText: {
    color: 'navy',
    fontWeight: 'bold',
    fontSize: 15,
  },
});