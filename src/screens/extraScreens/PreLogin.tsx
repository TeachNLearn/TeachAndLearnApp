import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS_ELEMENTS, COLORS_ILLUSTRATION, FONT_FAMILY, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/globalContants'
import Carausal from '../../components/carausal/Carausal'
import { IMAGES_FOR_CARAUSAL, VIDEOS_FOR_CARAUSAL } from '../../helpers/data'
import Icon from 'react-native-vector-icons/Feather'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import YoutubePlayer from "react-native-youtube-iframe";
import Animated from 'react-native-reanimated'
import CarausalForImage from '../../components/carausal/CarausalForImage'
import LinearGradient from 'react-native-linear-gradient'


const PreLogin = (props:any) => {

  const [youtubeStep, setYoutubeStep] = React.useState<number>(0)

  return (

      <ScrollView >
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
      <Pressable onPress ={()=>props.navigation.navigate('Login')} style={styles.btn1}>
        <Text style={styles.btnTxt}>Login</Text>
      </Pressable>
      <Pressable onPress ={()=>props.navigation.navigate('Signup')} style={styles.btn2}>
        <Text style={styles.btnTxt}>Sign Up</Text>
      </Pressable>
      </View>

    
       {/* carausal */}
       <View style={{bottom:20}}>
          <CarausalForImage
          data={IMAGES_FOR_CARAUSAL}
          style={{height:SCREEN_HEIGHT/3,width:SCREEN_WIDTH,borderRadius:10,marginTop:10,backgroundColor:'#ffffff',elevation:4}}
          imageStyle={{width:SCREEN_WIDTH-25,height:180,borderRadius:10}}
          imageContainerWidth={SCREEN_WIDTH-12.5}
          imageContainerHeight={SCREEN_HEIGHT/3}
          movingLinesWidthForIndex={SCREEN_WIDTH}
          dotsAlignment={SCREEN_WIDTH/2.2}
           />
      </View>

      <View style={{bottom:20,padding:20}}>
        <Text style={{textAlign:'center',fontSize:16,fontFamily:FONT_FAMILY.NUNITO_BOLD,color:COLORS_ELEMENTS.headline}}>Watch these videos to know why and how to learn teach and learn</Text>
      </View>

      <View style={{bottom:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20}}>
        
        {
          youtubeStep === 0 ?<Text>     </Text>:(
            <>
               <Icon1 name='arrow-back-ios' onPress={()=>setYoutubeStep(youtubeStep-1)} size={22} color={'#222'}/>
            </>
          )
        }
        <View style={{borderRadius:10,overflow:'hidden',backgroundColor:COLORS_ILLUSTRATION.stroke,justifyContent:'space-between'}}>
        <View>
        <YoutubePlayer
           height={150}
           webViewStyle={{
            width:SCREEN_WIDTH/1.4,
            // borderWidth:1,
           }}
           play={false}
           videoId={VIDEOS_FOR_CARAUSAL[youtubeStep].videoId}
           mediaplaybackrequiresuseraction={true}
           forceAndroidAutoplay={false}
          />
        </View>
          <View>
            <Text style={{flexWrap:'wrap',textAlign:'center',fontFamily:FONT_FAMILY.NUNITO_BOLD,color:COLORS_ILLUSTRATION.main,padding:10}}>{VIDEOS_FOR_CARAUSAL[youtubeStep].text}</Text>
          </View>
        </View>
        {
          youtubeStep === VIDEOS_FOR_CARAUSAL.length-1 ?<Text>     </Text>:(
            <>
               <Icon1 name='arrow-forward-ios' onPress={()=>setYoutubeStep(youtubeStep+1)} size={22} color={'#222'}/>
            </>
          )
        }

      </View>

      <Animated.View
    style={{flexDirection:'row',width:SCREEN_WIDTH,justifyContent:'center',alignItems:'center',borderRadius:10}}>
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
      
     <View style={{padding:20}}>
     <Pressable style={[{justifyContent:'center',alignItems:'center',backgroundColor:COLORS_ILLUSTRATION.tertiary,height:50,flexDirection:'row',gap:5,borderRadius:10}]}>
        <Text style={[styles.btnTxt,{textAlign:'center'}]}>Check out our blog</Text>
        <Icon name='arrow-up-right' size={18}  color={'#fff'}/>
      </Pressable>
     </View>
      
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
    backgroundColor:'rgb(61, 169, 252)'
  },
  btnTxt:{
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,
    color:COLORS_ELEMENTS.buttonTxt
  }
})