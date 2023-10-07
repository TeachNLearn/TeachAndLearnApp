import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS_ELEMENTS, COLORS_ILLUSTRATION, FONT_FAMILY, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/globalContants'
import Carausal from '../../components/carausal/Carausal'
import { VIDEOS_FOR_CARAUSAL } from '../../helpers/data'
import Icon from 'react-native-vector-icons/Feather'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import YoutubePlayer from "react-native-youtube-iframe";
import Animated from 'react-native-reanimated'


const PreLogin = () => {

  const [youtubeStep, setYoutubeStep] = React.useState<number>(0)

  return (
    <ScrollView contentContainerStyle={{padding:20}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Pressable style={styles.btn1}>
        <Text style={styles.btnTxt}>Login</Text>
      </Pressable>
      <Pressable style={styles.btn2}>
        <Text style={styles.btnTxt}>Sign Up</Text>
      </Pressable>
      </View>

      <View style={{height:SCREEN_HEIGHT/3,padding:15,marginTop:15,borderRadius:5,backgroundColor:COLORS_ILLUSTRATION.secondary,justifyContent:'space-around'}}>
      <Text style={{fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,color:'#222',fontSize:15}}>
        Connect with Students from all across the globe 
      </Text>
      <Text style={{fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,color:'#222',fontSize:15}}>
        Share your problems , share there solutions
      </Text>
      <Text style={{fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,color:'#222',fontSize:15}}>
        Organize bite-sized classes. Schedule as you want
      </Text>
      <Text style={{fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,color:'#222',fontSize:15}}>
        Teach and Learn !
      </Text>
      </View>

      <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        {
          youtubeStep === 0 ?<Text>     </Text>:(
            <>
               <Icon1 name='arrow-back-ios' onPress={()=>setYoutubeStep(youtubeStep-1)} size={22} color={'#222'}/>
            </>
          )
        }
        <YoutubePlayer
           height={150}
           webViewStyle={{
            width:SCREEN_WIDTH/1.4,
            borderWidth:1,
           }}
           play={false}
           videoId={VIDEOS_FOR_CARAUSAL[youtubeStep].videoId}
           mediaplaybackrequiresuseraction={true}
           forceAndroidAutoplay={false}
          />
        {
          youtubeStep === VIDEOS_FOR_CARAUSAL.length-1 ?<Text>     </Text>:(
            <>
               <Icon1 name='arrow-forward-ios' onPress={()=>setYoutubeStep(youtubeStep+1)} size={22} color={'#222'}/>
            </>
          )
        }
             {/* <Carausal
             data={VIDEOS_FOR_CARAUSAL}
             style={{height:230,width:SCREEN_WIDTH/2.2,borderRadius:10,marginTop:10,backgroundColor:'#ffffff',elevation:4,borderWidth:1}}
             imageStyle={{width:SCREEN_WIDTH-25,height:180,borderRadius:10}}
             imageContainerWidth={SCREEN_WIDTH-45}
             imageContainerHeight={SCREEN_HEIGHT/3}
             movingLinesWidthForIndex={SCREEN_WIDTH}
             dotsAlignment={SCREEN_WIDTH/2.2}
           /> */}

      </View>

      <Animated.View
      style={{flexDirection:'row',width:SCREEN_WIDTH-50,justifyContent:'center',alignItems:'center',marginTop:5}}>
        {VIDEOS_FOR_CARAUSAL?.map((e, i) => {
          return (
            <View
              key={i}
              style={{
                width: youtubeStep == i ? 40 : 16,
                height: youtubeStep == i ? 10 : 8,
                borderRadius: youtubeStep == i ? 5 : 4,
                backgroundColor:
                  youtubeStep == i ? COLORS_ILLUSTRATION.stroke : COLORS_ELEMENTS.paragraph,
                marginLeft: 5,
              }}/>
          );
        })}
      </Animated.View>
      

      <View style={{marginTop:0,padding:20}}>
        <Text style={{textAlign:'center',fontSize:16,fontFamily:FONT_FAMILY.NUNITO_BOLD,color:COLORS_ELEMENTS.headline}}>Watch these videos to know why and how to learn teach and learn</Text>
      </View>

      

      <Pressable style={[{justifyContent:'center',alignItems:'center',backgroundColor:COLORS_ILLUSTRATION.stroke,height:50,borderRadius:5,flexDirection:'row',gap:5}]}>
        <Text style={[styles.btnTxt,{textAlign:'center'}]}>Check out our blog</Text>
        <Icon name='arrow-up-right' size={18}  color={'#fff'}/>
      </Pressable>
    </ScrollView>
  )
}

export default PreLogin

const styles = StyleSheet.create({
  btn1:{
    padding:15,
    paddingHorizontal:23,
    borderRadius:5,
    backgroundColor:COLORS_ILLUSTRATION.tertiary
  },
  btn2:{
    padding:15,
    paddingHorizontal:23,
    borderRadius:5,
    backgroundColor:COLORS_ILLUSTRATION.secondary
  },
  btnTxt:{
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,
    color:COLORS_ELEMENTS.buttonTxt
  }
})