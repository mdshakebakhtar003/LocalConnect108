import { Pressable, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import painter from '../../Data/painter'
const providerprofile = () => {
  return (
    <View>
      <View style={{height:220,marginLeft:'auto',marginRight:'auto',marginTop:2,backgroundColor:'white',borderRadius:5,width:'90%'}}>
      <Pressable style={{borderRadius:50,backgroundColor:'white',height:80,width:80
        ,marginLeft:'auto',marginRight:'auto',marginTop:10}}>
        <Image source={require('../../assets/profile.png')} style={{height:80,width:80,borderRadius:50}}/>
      </Pressable>
      <Text style={{marginTop:5,marginLeft:'auto',marginRight:'auto',fontWeight:'bold'}}>Harii</Text>
        <View style={{backgroundColor:'navy',borderRadius:10,marginLeft:'auto',marginRight:'auto',marginTop:2}}>
          <Text style={{color:'white',padding:5}}>Worker</Text>
        </View>
        <View style={{backgroundColor:'',borderRadius:0,marginLeft:'auto',marginRight:'auto',marginTop:2,flexDirection:'row',justifyContent:'space-around'}}>
          <Image source={require('../../assets/approved.png')} style={{height:20,width:20,marginTop:6}}></Image>
          <Text style={{color:'green',marginTop:6}}>Verified</Text>
        </View>
        <View style={{backgroundColor:'',borderRadius:0,marginLeft:'auto',marginRight:'auto',marginTop:2,flexDirection:'row',justifyContent:'space-around'}}>
          <Image source={require('../../assets/placeholder.png')} style={{height:18,width:18,marginTop:4}}></Image>
          <Text style={{color:'dodgerblue',marginTop:4}}>Location</Text>
        </View>
      </View>
      <Pressable style={{marginTop:-18,marginLeft:'auto',marginRight:'auto',backgroundColor:'navy',height:30,width:'60%',borderRadius:10}}>
        <Text style={{color:'white',fontWeight:'bold',padding:0,marginLeft:'auto',marginRight:'auto'}}>
          Book Service
        </Text>
      </Pressable>
      <View style={{height:200,marginLeft:'auto',marginRight:'auto',marginTop:5,backgroundColor:'white',borderRadius:5,width:'90%'}}>
        <Text style={{fontWeight:'bold',marginLeft:10,marginTop:10,fontSize:16}}>Service Provider Details</Text>
       <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,marginTop:10}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../../assets/helmet.png')} style={{height:20,width:20}} />
        <View>
         <Text style={{marginLeft:5}}>Experience</Text>
          <Text style={{marginLeft:5}}>1 years</Text></View>
        </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../../assets/wallet.png')} style={{height:20,width:20}} />
          <View>
          <Text style={{marginLeft:5}}>Hourly rate</Text>
                    <Text style={{marginLeft:5}}>1 / hr</Text></View>
        </View>
       </View>
       <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:10,marginTop:20}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../../assets/verified.png')} style={{height:20,width:20}} />
          <View>
          <Text style={{marginLeft:5}}>Job done</Text>
          <Text style={{marginLeft:5}}>100</Text></View>
        </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../../assets/star.png')} style={{height:20,width:20}} />
          <View>
          <Text style={{marginLeft:5}}>Rating</Text>
                    <Text style={{marginLeft:5}}>5 star</Text></View>
        </View>
       </View>
      </View>
      <View style={{height:200,marginLeft:'auto',marginRight:'auto',marginTop:2,backgroundColor:'white',borderRadius:5,width:'90%'}}>
        <Text style={{fontWeight:'bold',fontSize:16}}>Reviews</Text>
      </View>
    </View>
  )
}

export default providerprofile

const styles = StyleSheet.create({})