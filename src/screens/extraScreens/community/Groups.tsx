import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { COLORS_ELEMENTS, FONT_FAMILY } from '../../../utils/globalContants'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/AntDesign'
import SkeletonLoaderHorizontalWithReanimatedGradient from '../skeletonUi/Skeleton'
import GroupChatModal from './GroupChatModal'
import { ToastHOC } from '../../../helpers/Toast'
import axios from 'axios'
import { BASE_URL, apiVersion } from '../../../utils/apiRoutes'
import { getHeaders } from '../../../utils/helperFunctions'
import { AuthContext } from '../../../store/auth-context'
import { useIsFocused } from '@react-navigation/native'

const Groups = (props:any) => {
    const user = [1, 2, 3];

    const authCtx = useContext(AuthContext);
    const isFocused = useIsFocused();
    const [allChats, setAllChats] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
  
    const fetchAllChat = async () => {
      try {
        setLoading(true);
        await axios
          .post(
            `${BASE_URL}${apiVersion}/chat/getGroup`,
            {},
            {
              headers: getHeaders(authCtx.token),
            },
          )
          .then(({data}) => {
            if (data.status === 1) {
              setLoading(false);
              setAllChats(data?.chats);
              // ToastHOC.successAlert('success', '');
            } else {
              setLoading(false);
            }
          })
          .catch((err: any) => {
            setLoading(false);
            ToastHOC.errorAlert(err.message, '');
          });
      } catch (error: any) {
        setLoading(false);
        ToastHOC.errorAlert('Error', error.message);
      }
    };
  
  
    

    React.useEffect(() => {
      if (isFocused === true) {
        fetchAllChat();
        return () => {
          fetchAllChat()
        }
      }
    }, [isFocused === true]);
    // const i =0
    return (
      <ScrollView > 
         <TouchableOpacity onPress={()=>props.props.navigation.navigate('GroupAdd',{
          token:authCtx.token,
          userId:authCtx.user._id
         })} style={{backgroundColor:'white',elevation:1.5,padding:4,borderRadius:5,flexDirection:'row',alignItems:'center',marginTop:10}}>
                <View style={{borderWidth:1,width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                    <Icon1 name='addusergroup' size={20} color={'#222222'}/>
                </View>
                <View style={{flexDirection:'row',marginLeft:10}}>
                    <Icon name='plus' size={20} color={'#222222'}/>
                    <Text style={{textAlign:'center',color:'#222222',fontSize:15,fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>Create Group</Text>
                </View>
         </TouchableOpacity>
         {loading ? (
        user?.map((e, i) => {
          return (
            <View key={i}>
              <View
                style={{
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  backgroundColor: COLORS_ELEMENTS.headline,
                  elevation: 1.5,
                }}>
                <View style={styles.backgroundGradient} />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bottom: 10,
                  }}>
                  <SkeletonLoaderHorizontalWithReanimatedGradient
                    height={10}
                    width={150}
                  />
                  <SkeletonLoaderHorizontalWithReanimatedGradient
                    height={10}
                    width={100}
                  />
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <>
          {allChats?.map((e:any, i:number) => {
            return (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  backgroundColor: COLORS_ELEMENTS.headline,
                  elevation: 1.5,
                  padding: 10,
                  gap: 10,
                }}
                key={i}
                // onPress={()=>createChat(e)}.
                onPress={()=>props.props.navigation.navigate('ChatScreen',{
                    user:{name:e.chatName},
                    data:{chat:{_id:e._id}},
                    userId:authCtx.user._id,
                    // token:authCtx.token,
                    photo:e?.chatPhoto,
                    // allData:e
                })}
                >
                <Image
                  source={{uri: e.chatPhoto}}
                  style={{width: 40, height: 40, borderRadius: 20}}
                />
                <View
                  style={{flexDirection: 'column', justifyContent: 'center'}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: FONT_FAMILY.NUNITO_BOLD,
                      fontSize: 15,
                    }}>
                    {e?.chatName}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: FONT_FAMILY.NUNITO_REGULAR,
                      fontSize: 12,
                    }}>
                   {
                    e?.latestMessage === undefined ||e?.latestMessage=== null ?(
                        <>
                            <Text>Start conversation </Text>
                        </>
                    ):(
                        e?.latestMessage?.sender?.name + " : " + e?.latestMessage?.content
                    )
                   }
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      )}
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