import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS_ELEMENTS, FONT_FAMILY } from '../../../utils/globalContants'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/AntDesign'
import SkeletonLoaderHorizontalWithReanimatedGradient from '../skeletonUi/Skeleton'

const Groups = () => {
    const user = [1,2,3,4,5,6,7,8,9,0]
    // const i =0
    return (
      <ScrollView>  
         <TouchableOpacity style={{backgroundColor:'white',elevation:1.5,padding:4,borderRadius:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
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
                       <TouchableOpacity style={{backgroundColor:COLORS_ELEMENTS.headline,elevation:1.5,paddingHorizontal:5,borderRadius:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
                       <View style={styles.backgroundGradient}/>
                     <View style={{flexDirection:'column',justifyContent:'center',bottom:9}}>
                        <SkeletonLoaderHorizontalWithReanimatedGradient height={10} width={150}/>
                        <SkeletonLoaderHorizontalWithReanimatedGradient height={10} width={100}/>
                     </View>
                       </TouchableOpacity>
                  </>
              )
          })
         }
      </ScrollView>
    )
}

export default Groups

const styles = StyleSheet.create({
    backgroundGradient: {
        // backgroundColor:'rgba(0,0,0,0.12)',
        backgroundColor:'white',
        opacity:0.3,
        height:40,
        width:40,
        borderRadius:20
      },
})