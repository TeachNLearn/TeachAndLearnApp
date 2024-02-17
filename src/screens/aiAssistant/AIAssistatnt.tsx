import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONT_FAMILY } from '../../utils/globalContants'

const AIAssistatnt = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     <Text style={{fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD_ITALIC,fontSize:16,textAlign:'center'}}> Our Ai Assistant will be coming soon</Text>
    </View>
  )
}

export default AIAssistatnt

const styles = StyleSheet.create({})