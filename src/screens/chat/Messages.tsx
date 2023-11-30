import { Pressable, StyleSheet, Text, View,  ToastAndroid} from 'react-native'
import React from 'react'
import Animated,{ runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated'
import {FlingGestureHandler,Directions, State, PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler'
import { FONT_FAMILY, SCREEN_WIDTH } from '../../utils/globalContants'
import moment from 'moment'
import { trigger } from "react-native-haptic-feedback";
import "react-native-get-random-values";
import Clipboard from '@react-native-clipboard/clipboard';
import { v4 as uuidv4 } from 'uuid';

const Messages = ({data,index,userId,setReplyEnabled,userName,setReplymsg}:any) => {

  const [selectedReply  , setselectedReply  ] = React.useState('')
    let starting_point = 0
    let x = useSharedValue(starting_point)
    const check = data?.sender[0]?._id[0] === userId
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
  
                
    const gestureHandle = useAnimatedGestureHandler({
      onStart:(e)=>{
      },
      onActive:(e)=>{
        x.value = SCREEN_WIDTH/2.4
      },
      onEnd:(e)=>{
        x.value = withSpring(starting_point,{duration:4500})
      }
    })
    
    const animatedStyles = useAnimatedStyle(()=>{
      return {
        transform:[{translateX:x.value}]
      }
    })

    const goToMsg = (e:any)=>{
      // setselectedReply(e.uniqueIdForRefrence)
    }
  return (
  


      <FlingGestureHandler
      onHandlerStateChange={({nativeEvent})=>{
        if(nativeEvent.state === State.ACTIVE){
            trigger('impactLight',options)
            setReplymsg({
              _id:data.uniqueIdForRefrence,
              name:check?userName:data?.sender[0]?.name[0],
              msg:data.content
            })
            setReplyEnabled(true)
        }
      }}  
      onGestureEvent={gestureHandle}
      >
  
       <Animated.View style={[animatedStyles]}>
       <Pressable onLongPress={()=>{
        Clipboard.setString(data.content)
        ToastAndroid.show('text copied',200)
       }}
        style={[{
          alignSelf: check?'flex-end':'flex-start',
          padding: 10,
          borderRadius: 15,
          backgroundColor: check?'#0881fe':'#eaeae5',
          marginTop: 10,
          maxWidth: '80%',

        }]}>
        <Text
          style={{
            fontSize: check?1:11,
            fontFamily: FONT_FAMILY.NUNITO_BOLD,
            textAlign: 'left',
          }}>
          {check ?null:data?.sender[0]?.name[0]}
        </Text>
    
        {
           data?.replyMsgInfoName !== null?(
          <Pressable onPress={()=>goToMsg(data)} style={{padding:2,borderRadius:10,backgroundColor:check?'#eaeae5':'#0881fe',paddingHorizontal:5}}>
              <Text style={{fontFamily:FONT_FAMILY.NUNITO_BOLD,fontSize:14,color:check?'#222':'#fff'}}>{data?.replyMsgInfoName}</Text>
            <Text style={{fontFamily:FONT_FAMILY.NUNITO_MEDIUM,fontSize:12,color:check?'#222':'#fff'}}>{data?.mergedDocuments[0]?.content}</Text>
          </Pressable>
          ):null
        }
       <View>
       <Text style={{color:check?'#fff':'#222'}}>{data.content}</Text>
        <Text
          style={{
            color: check?'#222':'#0881fe',
            fontSize: 11,
            alignSelf:'flex-end',
            bottom:3
          }}>
          {moment(data?.createdAt).format('h:mm a')}
        </Text>
       </View>
      </Pressable>
       </Animated.View>
    
      </FlingGestureHandler>
   
  // </View>
);
    
  
}

export default Messages

const styles = StyleSheet.create({})