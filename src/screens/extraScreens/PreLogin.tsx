import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS_ELEMENTS, COLORS_ILLUSTRATION, FONT_FAMILY, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/globalContants'
import Carausal from '../../components/carausal/Carausal'
import { VIDEOS_FOR_CARAUSAL } from '../../helpers/data'

const PreLogin = () => {
  return (
    <ScrollView style={{padding:20,flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Pressable style={styles.btn}>
        <Text style={styles.btnTxt}>Login</Text>
      </Pressable>
      <Pressable style={styles.btn}>
        <Text style={styles.btnTxt}>Sign Up</Text>
      </Pressable>
      </View>

      <View style={{borderWidth:1,height:300,padding:10,marginTop:15,borderRadius:10}}>
      <Text>
        Connect with Students from all across the globe 
      </Text>
      </View>

      <View style={{marginTop:15}}>
             <Carausal
             data={VIDEOS_FOR_CARAUSAL}
             style={{height:230,width:SCREEN_WIDTH/2.2,borderRadius:10,marginTop:10,backgroundColor:'#ffffff',elevation:4,borderWidth:1}}
             imageStyle={{width:SCREEN_WIDTH-25,height:180,borderRadius:10}}
             imageContainerWidth={SCREEN_WIDTH-45}
             imageContainerHeight={SCREEN_HEIGHT/3}
             movingLinesWidthForIndex={SCREEN_WIDTH}
             dotsAlignment={SCREEN_WIDTH/2.2}
           />
      </View>

      <View style={{marginTop:0,padding:20}}>
        <Text style={{textAlign:'center'}}>Watch these videos to know why and how to learn teach and learn</Text>
      </View>

      <Pressable style={[styles.btn,{justifyContent:'center',alignItems:'center'}]}>
        <Text style={[styles.btnTxt,{textAlign:'center'}]}>Check out our blog</Text>
      </Pressable>
    </ScrollView>
  )
}

export default PreLogin

const styles = StyleSheet.create({
  btn:{
    borderWidth:1,
    padding:15,
    paddingHorizontal:23,
    borderRadius:10
  },
  btnTxt:{
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,
    color:'#222222'
  }
})