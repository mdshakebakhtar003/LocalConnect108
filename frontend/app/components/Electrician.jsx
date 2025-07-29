import { StyleSheet, Text, View ,FlatList,Image, Pressable,TouchableOpacity} from 'react-native'
import React from 'react'
import clean from '../../Data/clean'
import star from '../../assets/star.png'
import { Link } from 'expo-router'
import providerprofile from './providerprofile'
import plumber from '../../Data/electrician'
const Electrician = () => {

  return (
    <View>
       <FlatList
          style={{ marginTop: 0, marginLeft: 10, marginRight: 10 }}
          data={plumber}
          vertical
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Link href={`./providerprofile`} asChild style={{ alignItems: '', marginLeft: 1, backgroundColor: 'white', borderRadius: 0, padding: 5,width:'100%' }}>
          <TouchableOpacity style={{ marginTop:5, marginLeft: 5, backgroundColor: '', borderRadius: 5, padding: 1,height:150,width:'100%' }}>
             <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'white',borderRadius:10,padding:10,height:150}}>
              <Image source={item.Icon} style={{height:30,width:30}} />
              <View>
              <Text style={styles.catname}>{item.name} </Text>
              <Text style={styles.catname}>{item.experience} experience</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.catname}>{item.rating} </Text>
                <Image source={star} style={{height:15,width:15}} />
              </View>
              <Text style={styles.catname}>{item.price}</Text>
              </View>
              <Pressable style={{marginTop:2,backgroundColor:'navy',borderRadius:5,padding:5}}>
              <Text style={{color:'white',fontSize:16}}>Book Now</Text></Pressable>
            </View>
            
            
            </TouchableOpacity>
            </Link>

          )}
          keyExtractor={(item) => item.id}
        />

    </View>
  )
}

export default Electrician




const styles = StyleSheet.create({})