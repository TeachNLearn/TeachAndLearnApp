import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FONT_FAMILY } from '../../../utils/globalContants'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/AntDesign'

const Groups = () => {
    const user = [1,2,3,4,5,6,7,8,9,0]
    // const i =0
    return (
      <ScrollView>  
         <TouchableOpacity style={{borderWidth:1,padding:4,borderRadius:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
                <View style={{borderWidth:1,width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                    <Icon1 name='addusergroup' size={20} color={'#222222'}/>
                </View>
                <View style={{flexDirection:'row',marginLeft:10}}>
                    <Icon name='plus' size={20} color={'#222222'}/>
                    <Text style={{textAlign:'center',color:'#222222',fontSize:15,fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>Create Group</Text>
                </View>
         </TouchableOpacity>
         {
          user?.map((e,i)=>{
              return (
                  <>
                       <TouchableOpacity style={{borderWidth:1,padding:4,borderRadius:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
                       <View style={{borderWidth:1,width:40,height:40,borderRadius:20}}/>
                       <Text style={{textAlign:'center',color:'#222222',marginLeft:10,fontSize:15,fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>Group {i+1}</Text>
                       </TouchableOpacity>
                  </>
              )
          })
         }
      </ScrollView>
    )
}

export default Groups

const styles = StyleSheet.create({})