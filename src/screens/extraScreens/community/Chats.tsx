import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS_ELEMENTS, COLORS_ILLUSTRATION, FONT_FAMILY } from '../../../utils/globalContants'
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
                    <TouchableOpacity style={{paddingHorizontal:5,borderRadius:5,flexDirection:'row',alignItems:'center',marginTop:10,backgroundColor:COLORS_ELEMENTS.headline,elevation:1.5}}>
                    <View style={styles.backgroundGradient}/>
                     <View style={{flexDirection:'column',justifyContent:'center',bottom:10}}>
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
    // backgroundColor:'rgba(0,0,0,0.12)',
    backgroundColor:'white',
    opacity:.3,
    height:40,
    width:40,
    borderRadius:20
  },
})