import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS_ELEMENTS, FONT_FAMILY } from '../../../utils/globalContants'
import Icon from 'react-native-vector-icons/Entypo'

interface ISSC{
    component:any
    setComponent:any
}

const ShowSingleComponent:React.FC<ISSC> = ({component,setComponent}) => {
  return (
  component?.length > 0 ?(
    <View style={{marginTop:10,padding:5,borderRadius:10,marginLeft:5,backgroundColor:COLORS_ELEMENTS.headline,flexDirection:'row'}}>
    <Text style={{color:'#fff',fontFamily:FONT_FAMILY.NUNITO_BOLD}}>{component}</Text>
    <Icon onPress={()=>setComponent('')} style={{position:'absolute',right:-5,top:-10}} name='circle-with-cross' color={'#222'} size={16}/>
</View>
  ) :null
  )
}

export default ShowSingleComponent

const styles = StyleSheet.create({})