import { View, Text, TouchableOpacity } from 'react-native'
import Ionican from 'react-native-vector-icons/Ionicons';
import React from 'react'
import CoinsSvg from '../../components/SVGComponents/CoinsSvg';
import IconSe from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlert from './CancelClass';
import { useState } from 'react';

const BuyClass = () => {
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };
  return (
    <View style={{justifyContent:'center' , alignItems:'center' , flex:1 , backgroundColor: 'rgba(255, 255, 255, 0.34)'}}>
      <View style={{ width:340 , height:370 , backgroundColor:'#FFF' , borderRadius:28 , elevation:8}}>
         <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems:'center' , margin:20  }}>
            <Text style={{color:'#000' , fontFamily:'Nunito' , fontSize:18 , fontWeight:'600' , }}>
                Buy Class
            </Text>
            <Ionican name='close-outline' size={24} color='#000'/>
         </View>
         <View style={{margin:14, width:"100%"}}> 
            <Text style={{color:'#000' , fontFamily:'Nunito' , fontSize:22 , fontWeight:"700" , }}>
               Web Development Essentials - Crash Course from scratch 
            </Text>
         </View>

         <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'space-between' , margin:20 , marginBottom:-5 }}>
            <Text style={{color:'#4A5578' , fontFamily:'Nunito' , fontSize:16 , fontWeight:'400' ,}}>
                Time:
            </Text>
            <Text style={{color:'#000' , fontFamily:'Nunito' , fontSize:18 , fontWeight:'600' ,}}>
                27 Aug 09 - 10pm
            </Text>
         </View>
         <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'space-between' , margin:20 }}>
            <Text style={{color:'#4A5578' , fontFamily:'Nunito' , fontSize:16 , fontWeight:'400' ,}}>
                Coins
            </Text>
            <View style={{flexDirection:'row' , alignItems:'center' , marginLeft:20 , marginRight:20 ,  }}>
              <CoinsSvg fill='#000' height={20} width={20}/><Text style={{color:'#000' , fontFamily:'Nunito' , fontSize:18 , fontWeight:'700' ,}}> 250</Text>
            </View>
           
         </View>

         <View style={{alignItems:'center' , flexDirection:'row' , justifyContent:'center', backgroundColor:'#F8F8FA' , borderRadius:8 ,padding:10 ,}}>
            <Ionican name='information-circle-outline' size={20} color='#000' />
            <Text> {" "}You have {" "}</Text>
            <CoinsSvg/>
             <Text style={{color:'#000' , fontSize:16 , fontFamily:'Nunito' , fontWeight:'600'}}>450</Text> 
             <Text>{" "}coins right now.</Text>
         </View>
         <View style={{justifyContent:'center' , alignItems:'center' , marginTop:10 ,}}>
            <TouchableOpacity style={{ flexDirection:'row', justifyContent:'center'  , backgroundColor:'#674FF1'  , width:'80%' , padding:12 ,borderRadius:47 ,}}>
            <Text style={{color:'#FFF' , fontFamily:'Nunito' , fontWeight:'700' , fontSize:18}}>Buy </Text>
             {/* <IconSe name="arrow-top-right" size={20} color="#FFF" /> */}
             </TouchableOpacity>
         </View>
         
         
        
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={showAlert}>
        <Text>Show Custom Alert</Text>
      </TouchableOpacity>

      <CustomAlert
        visible={isAlertVisible}
        title="Cancel Class"
        message="Are you sure you want to cancel this class ? On cancelling this class the students would be refunded their coins and deductive from your side."
        onClose={hideAlert}
      />
    </View>
    </View>
  )
}

export default BuyClass