import { StyleSheet, View } from 'react-native'
import React from 'react'
import SkeletonLoaderHorizontalWithReanimatedGradient from '../../screens/extraScreens/skeletonUi/Skeleton'
import { SCREEN_WIDTH } from '../../utils/globalContants'

interface ISkeletonLoader{
  height:number,
}

const SkeletonLoder:React.FC<ISkeletonLoader> = (props) => {
  return (
    <View style={styles.loader}>
    <View style={{alignSelf:'center'}}>
    <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.3} height={20}/>
     <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.5} height={20}/>
     <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.7} height={20}/>
     <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.4} height={20}/>
     <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.4} height={20}/>
    </View>
   </View>
  )
}

export default SkeletonLoder

const styles = StyleSheet.create({
    loader:{
        backgroundColor: '#094067',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        height:250,
        rowGap: 14,
        marginTop:20
      }
})