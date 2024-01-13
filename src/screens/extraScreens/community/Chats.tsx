import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {
  COLORS_ELEMENTS,
  COLORS_ILLUSTRATION,
  FONT_FAMILY,
} from '../../../utils/globalContants';
import {TouchableOpacity} from 'react-native';
import SkeletonLoaderHorizontalWithReanimatedGradient from '../skeletonUi/Skeleton';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import {getHeaders} from '../../../utils/helperFunctions';
import {AuthContext} from '../../../store/auth-context';
import {ToastHOC} from '../../../helpers/Toast';
import {useIsFocused} from '@react-navigation/native';

const Chats = (props: any) => {
  const user = [1, 2, 3];

  const authCtx = useContext(AuthContext);
  console.log("TO",authCtx.token)
  const isFocused = useIsFocused();
  const [allChats, setAllChats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchAllChat = async () => {
    try {
      setLoading(true);
      await axios
        .post(
          `${BASE_URL}${apiVersion}/chat/get`,
          {},
          {
            headers: getHeaders(authCtx.token),
          },
        )
        .then(({data}) => {
          if (data.status === 1) {
            setLoading(false);
            setAllChats(data?.chats);
            ToastHOC.successAlert('success', '');
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


  const createChat = async(user:any)=>{
    try {
      await axios
      .post(
        `${BASE_URL}${apiVersion}/chat`,
        {
          userId:user._id,
        },
        {
          headers: getHeaders(authCtx.token),
        }
      )
      .then(({ data }) => {
        if(data.status === 1){
          // ToastHOC.successAlert("success","")
          props.props.navigation.navigate('ChatScreen',{
            user:user,
            data:data,
            userId:authCtx.user._id,
            // token:authCtx.token
           })
        }
       
      })
      .catch((err:any) => {
        ToastHOC.errorAlert(err.message,'could not create chat')
      });
    } catch (error:any) {
      ToastHOC.errorAlert('Error',error.message)
    }
  }

  React.useEffect(() => {
    if (isFocused === true) {
      fetchAllChat();
      return () => {
        fetchAllChat()
      }
    }
  }, [isFocused === true]);

  return (
    <ScrollView>
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
                  
                }}
                key={i}>
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
            const filter = e.users.filter((e:any) => e._id !== authCtx.user._id);
            return (
              <TouchableOpacity
              key={i}
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
                onPress={()=>createChat(filter[0])}
                >
                <Image
                  source={{uri: filter[0].photo}}
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
                    {filter[0].name}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: FONT_FAMILY.NUNITO_REGULAR,
                      fontSize: 12,
                    }}>
 {
                    e?.latestMessage === undefined ?(
                        <>
                            <Text>Start conversation </Text>
                        </>
                    ):(
                        e?.latestMessage?.content
                    )
                   }                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </ScrollView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  backgroundGradient: {
    // backgroundColor:'rgba(0,0,0,0.12)',
    backgroundColor: 'white',
    opacity: 0.3,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
