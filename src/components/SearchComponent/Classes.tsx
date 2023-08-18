import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconS from 'react-native-vector-icons/FontAwesome5';
import IconSe from 'react-native-vector-icons/MaterialCommunityIcons';

const Classes = () => {
  return (
    <View style={{alignItems:'center' , justifyContent:'center' , flexDirection:'column'}}>
       <View style={{backgroundColor:'#094067' , height:300 , width:'80%' , marginTop:30 ,elevation:8 ,borderRadius:20 ,padding:30 ,}}>
      <Text style={{fontSize:20 , color:'#ef4565', marginBottom:20 ,}}>
        Web Development 
      </Text>
      <Text style={{fontSize:18 , color:'#fffffe' , marginBottom:20 ,}}>
        NodeJs
      </Text>
      <View style={{flexDirection:'row' , }}>
        <IconS name="user-circle" size={22} color="orange"/>
        <Text style={{color:'#fffffe', marginLeft:10 , fontSize:15, marginBottom:20 ,}}>emperor</Text>
      </View>
     <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
        <View style={{flexDirection:'row' ,alignItems:'center' }}>
          <IconS name="bolt" size={20} color="#FFD465"/>
          <Text style={{color:'#fffffe',marginLeft:10 }}>3</Text>
          <Text style={{color:'#fffffe', marginLeft:10}}>Interested</Text>
         </View>
         <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Text style={{color:'#fffffe'}}>Due</Text>
          <Text style={{color:'#fffffe', marginLeft:5}}>June</Text>
          <Text style={{color:'#fffffe', marginLeft:5}}>14</Text>
         </View>
     </View>
     
  <View style={{flexDirection:'row' ,flexWrap:'wrap', alignItems:'center' , marginTop:20 ,}}>
    <View style={{backgroundColor:'#3da9fc' , alignItems:'center' , justifyContent:'center' , marginRight:10 , padding:5, maxWidth: '30%', elevation:5 , borderRadius:8}}>
      <Text style={{color:'#fffffe'}}>Backend</Text>
    </View>
    <View style={{backgroundColor:'#3da9fc' , alignItems:'center' , justifyContent:'center', marginRight:10, padding:5, maxWidth: '30%', elevation:5 , borderRadius:8}}>
      <Text style={{color:'#fffffe'}}>Nodejs</Text>
    </View>
    <View style={{backgroundColor:'#3da9fc' , alignItems:'center' , justifyContent:'center', marginRight:10, padding:5, maxWidth: '30%', elevation:5 , borderRadius:8}}>
      <Text style={{color:'#fffffe'}}>express</Text>
    </View>
    <View style={{backgroundColor:'#3da9fc' , alignItems:'center' , justifyContent:'center', marginRight:10, padding:7,maxWidth: '30%' , marginTop:30 , elevation:5 , borderRadius:5}}>
      <Text style={{color:'#fffffe'}}>mongoDb</Text>
    </View>
   </View>

    </View>
    </View>
   
  )
}


const styles = StyleSheet.create({
   
})

export default Classes