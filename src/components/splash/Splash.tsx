import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { BounceInLeft} from 'react-native-reanimated';
import { COLORS_ELEMENTS } from '../../utils/globalContants';

const Splash = (props:any) => {

  return (
   <View style={{flex:1,backgroundColor:COLORS_ELEMENTS.background}}>
    <Animated.View  entering={BounceInLeft.duration(2000)} style={[{flex:1,justifyContent:'center',alignItems:'center'}]}>
      <Image
      source={require('../../assets/Images/logo.png')}
      style={{width:200,height:100}}
      resizeMode='center'
      />
    </Animated.View>
   </View>
  )
}

export default Splash

const styles = StyleSheet.create({})