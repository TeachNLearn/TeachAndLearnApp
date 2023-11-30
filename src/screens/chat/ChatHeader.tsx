import { StyleSheet, Text, View,Image ,TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS_ELEMENTS, FONT_FAMILY } from '../../utils/globalContants'
import Icon from 'react-native-vector-icons/Ionicons'

const ChatHeader = ({chatUser,props,chatInfo,loading,chatId}:any) => {
    let groupUsers = chatInfo?.users?.slice(0,3)
  return (
    <TouchableOpacity 
    onPress={()=>props.navigation.navigate('EditGroup',{
        chatInfo:chatInfo,
        chatUser:chatUser,
        chatId:chatId
    })}
    style={{height:50,padding:5,flexDirection:'row',gap:5,alignItems:'center',elevation:4,backgroundColor:COLORS_ELEMENTS.headline}}>
    <View style={{flexDirection:'row',gap:15}}>
    <Icon onPress={()=>props.navigation.goBack()} name='arrow-back' color={'#fff'} size={30} style={{alignSelf:'center'}}/>
      <Image source={{uri:!chatUser?.photo  ?"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png":chatUser.photo}} style={{width:40,height:40,borderRadius:20,borderWidth:1}}/>
    </View>
      <View>
        <Text style={{fontFamily:FONT_FAMILY.NUNITO_BOLD,color:'#fff'}}>{chatInfo?.isGroupChat?chatInfo?.chatName:chatUser.name}</Text>
       <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        {
            chatInfo?.isGroupChat ?(
                
                   loading?(
                    <View style={{width:100,height:10,backgroundColor:'#eaeae5',marginTop:5}}/>
                   ):(
                    groupUsers?.map((e:any,i:number)=>{
                        return (
                            i=== 0?(
                                <Text style={{fontSize:10,color:'#fff'}} key={i}>{e.name+','}</Text>
                            ):(
                               i===groupUsers.length-1 ?(
                                <Text style={{fontSize:10,color:'#fff'}} key={i}>{' '+e.name+'.........'}</Text>
                               ):(
                                <Text style={{fontSize:10,color:'#fff'}} key={i}>{' '+e.name + ','}</Text>
                               )
                            )
                            // <></> <View style={{width:100,height:10,backgroundColor:'#eaeae5',marginTop:5}}/>
                        )
                    })

                   )

                
            ):
            (
               null
            )
        }
       </View>
      </View>
    </TouchableOpacity>
  )
}

export default ChatHeader

const styles = StyleSheet.create({})