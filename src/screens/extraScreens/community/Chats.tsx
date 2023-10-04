import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONT_FAMILY } from '../../../utils/globalContants'
import { TouchableOpacity } from 'react-native'

const Chats = () => {
    const user = [1,2,3,4,5,6,7,8,9,0]
  return (
    <ScrollView>  
       {
        user?.map((e,i)=>{
            return (
                <>
                    <TouchableOpacity style={{borderWidth:1,padding:4,borderRadius:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
                    <View style={{borderWidth:1,width:40,height:40,borderRadius:20}}/>
                    <Text style={{textAlign:'center',color:'#222222',marginLeft:10,fontSize:15,fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>Garvit {i+1}</Text>
                    </TouchableOpacity>
                </>
            )
        })
       }
    </ScrollView>
  )
}

export default Chats

const styles = StyleSheet.create({})