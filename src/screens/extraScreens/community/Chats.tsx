import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONT_FAMILY } from '../../../utils/globalContants'
import { TouchableOpacity } from 'react-native'
import SkeletonLoaderHorizontalWithReanimatedGradient from '../skeletonUi/Skeleton'

const Chats = (props:any) => {
    const user = [1,2,3,4,5,6,7,8,9,0]
  return (
    <ScrollView>  
       {
        user?.map((e,i)=>{
            return (
                <>
                    <TouchableOpacity style={{padding:5,borderRadius:5,flexDirection:'row',alignItems:'center',marginTop:10,backgroundColor:'white',elevation:1.5}}>
                    <View style={styles.backgroundGradient}/>
                      {/* <View style={{borderWidth:1,width:40,height:40,borderRadius:20,backgroundColor:'white'}}/> */}
                      {/* <Text style={{textAlign:'center',color:'white',marginLeft:10,fontSize:15,fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>Garvit {i+1}</Text> */}
                     <View style={{flexDirection:'column',justifyContent:'center',bottom:5}}>
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

export default Chats

const styles = StyleSheet.create({
  backgroundGradient: {
    backgroundColor:'rgba(0,0,0,0.12)',
    height:40,
    width:40,
    borderRadius:20
  },
})