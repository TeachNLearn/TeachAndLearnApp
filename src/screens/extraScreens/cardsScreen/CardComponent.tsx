import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FONT_FAMILY, SCREEN_WIDTH } from '../../../utils/globalContants'
import Icon from 'react-native-vector-icons/Entypo'
import SkeletonLoaderHorizontalWithReanimatedGradient from '../skeletonUi/Skeleton'


interface ICardComponent{
  type:string
}

const CardComponent:React.FC<ICardComponent> = (props) => {
  const [loading, setLoading] = React.useState(false)
    const r = [
        1,2,3,4,5,6,7,8,9
    ]
  return (
   <>


   <ScrollView contentContainerStyle={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',width:'100%'}}>
     {
      props?.type === 'teach' ?
      <>
      <TouchableOpacity onPress={()=>console.log(props?.type)} style={{borderWidth:1,height:SCREEN_WIDTH/2.7,width:SCREEN_WIDTH/2.7,marginTop:10}}>
        <Icon name='plus' size={60} color={'#222222'} style={{alignSelf:'center'}}/>
        <Text style={{textAlign:'center',fontSize:17,fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,color:'#222222'}}>Create Teach Card</Text>
      </TouchableOpacity>
      </>:
      <>
      <TouchableOpacity onPress={()=>console.log(props?.type)} style={{borderWidth:1,height:SCREEN_WIDTH/2.7,width:SCREEN_WIDTH/2.7,marginTop:10}}>
        <Icon name='plus' size={60} color={'#222222'} style={{alignSelf:'center'}}/>
        <Text style={{textAlign:'center',fontSize:17,fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,color:'#222222'}}>Create Learn Card</Text>
      </TouchableOpacity>
      </>
     }
      {
        r?.map((e)=>{
            return (
                <View style={{marginTop:10}}>
                          {
                            loading === true?(
                              <></>
                            ):(
                              <>
                                <View style={{borderWidth:1,height:SCREEN_WIDTH/2.7,width:SCREEN_WIDTH/2.7,justifyContent:'center'}}>
                                  <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/2.8} height={10}/>
                                  <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/2.6} height={10}/>
                                  <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/3.2} height={10}/>
                                  <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/3.7} height={10}/>
                                </View>
                              </>
                            )
                          }
                </View>
            )
        })
      }
    </ScrollView>
   </>
  )
}

export default CardComponent

const styles = StyleSheet.create({})