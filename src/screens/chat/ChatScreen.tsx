import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useRef} from 'react';
import {
  COLORS_ILLUSTRATION,
  FONT_FAMILY,
} from '../../utils/globalContants';
import Icon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import io from 'socket.io-client';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import {ToastHOC} from '../../helpers/Toast';
import LinearGradient from 'react-native-linear-gradient';
import ChatHeader from './ChatHeader';
import {AuthContext} from '../../store/auth-context';
import Messages from './Messages';
import Icon1 from 'react-native-vector-icons/Entypo'
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

var socket: any;

const ChatScreen = (props: any) => {
  const {user, data} = props?.route?.params;

  const authCtx = useContext(AuthContext);
  let userId = authCtx.user._id;
  let userName = authCtx.user.name;

  const [newValue, height] = React.useState(20);
  const [roomId, setRoomId] = React.useState(data?.chat?._id);
  const [message, setMessage] = React.useState('');
  const [dataMessage, setDataMessage] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [chatIdInfo, setChatIdInfo] = React.useState(null);
  const [loading1, setLoading1] = React.useState(false);
  const [replyEnabled, setReplyEnabled] = React.useState(false);
  const [bottom, setBottom] = React.useState(0)

  
  const [replymsg, setReplymsg] = React.useState({
    _id:null,
    name:null,
    msg:''
  })

  const dir = ['l','r','l','r','l']

  const isFocused = useIsFocused();

  const ENDPOINT = 'https://teachandlearn.online';
  const flatListRef:any =useRef()

  // const ENDPOINT = 'http://192.168.29.82:8000'

  const fetchMsg = async () => {
    // flatListRef?.current?.scrollToEnd();
    try {
      setReplyEnabled(false)
      setLoading(true);
      await axios
        .get(`${BASE_URL}${apiVersion}/msg/${roomId}`, {
          headers: getHeaders(authCtx.token),
        })
        .then(({data}) => {
          setDataMessage(data.msgs);
          setLoading(false);
          // socket.emit('sendPrivateMessage', {message, roomId,userId });
        })
        .catch((err: any) => {
          setLoading(false);
          ToastHOC.errorAlert(err.message, '');
        });
    } catch (error: any) {
      console.log('err', error.message);
    }
  };

  const fetchChatIdInfo = async () => {
    try {
      setLoading1(true);
      await axios
        .post(
          `${BASE_URL}${apiVersion}/chat/fetchGroup`,
          {
            chatId: roomId,
          },
          {
            headers: getHeaders(authCtx.token),
          },
        )
        .then(({data}) => {
          setChatIdInfo(data.payload);
          setLoading1(false);
          // socket.emit('sendPrivateMessage', {message, roomId,userId });
        })
        .catch((err: any) => {
          setLoading1(false);
          ToastHOC.errorAlert(err.message, '');
        });
    } catch (error: any) {
      setLoading1(false);
      console.log('err', error.message);
    }
  };

  React.useEffect(() => {
    if (isFocused === true) {
      // console.log(isFocused)
      setReplymsg({
        _id:null,
        name:null,
        msg:'',
      })
      fetchMsg();
      fetchChatIdInfo();
    }
    socket = io(ENDPOINT);
    socket.emit('joinRoom', roomId);
    socket.on(
      'receivedPrivateMessage',
      (msg: any, userId: any, userName: string,replymsg:any,ui:any) => {
        // setReplyEnabled(false)
       console.log("MESSGA",replymsg)
        setReplymsg({
          _id:null,
          name:null,
          msg:'',
        })
        
      
          setDataMessage((prev: any) => [
            ...prev,
            {content: msg, sender:[ {_id: [userId], name:[ userName]}],uniqueIdForRefrence:ui,mergedDocuments:[{content:replymsg?.msg}],replyMsgInfoName:replymsg?.name
          }
            // replyMsgInfoName:replymsg?.name  },
            // {content: msg, sender:[ {_id: [userId], name:[ userName]}],uniqueIdForRefrence:ui,mergedDocuments:[{}],},
          ]);
        
      
      },
    );

    return () => {
      socket.disconnect();
    };
  }, []);


  const updateSize = (h: any) => {
   if(h <125){
    console.log("DDDD",h)
    height(h);
    setBottom(h-40)
   }else{
    null
   }
  };

  const sendMsg = async () => {
    console.log("PPPPP",replymsg)
    setReplyEnabled(false)
    let ui = uuidv4()
    if (roomId === '') {
      //   socket.emit('sendMessage', message);
    } else {
      try {
        // setReplyEnabled(false)
        // setReplymsg({})
        socket.emit('sendPrivateMessage', {message, roomId, userId, userName,replymsg,ui});
        setMessage('');

        await axios
          .post(
            `${BASE_URL}${apiVersion}/msg/${roomId}`,
            {
              chatMessage: message,
              uniqueId:ui,
              replyId:replymsg?._id,
              name:replymsg?.name
            },
            {
              headers: getHeaders(authCtx.token),
            },
          )
          .then(({data}) => {
           
            // socket.emit('sendPrivateMessage', {message, roomId,userId });
          })
          .catch((err: any) => {
            // setLoading(false);
    
            ToastHOC.errorAlert(err.message, '');
          });

        //for surance
      } catch (error) {
        console.log('Send message error ==> ', error);
      }
      // socket.emit('sendPrivateMessage', {message, userName, roomId});
      // setMessage('');
    }
  };



  return (
    <View  style={{flex: 1}}>
      <ChatHeader
        chatUser={user}
        props={props}
        chatInfo={chatIdInfo}
        loading={loading1}
        chatId={roomId}
      />
      <View
  style={{borderColor:'red',flex:.92}}
      >
        <View style={{padding: 10}}>
          {loading ? (
            <>
              {
                dir?.map((e,i)=>{
                  return(
                    <LinearGradient
                    key={i}
                colors={['#6190E8', '#d8dbe9']}
                style={{
                  width: 100,
                  height: 45,
                  borderRadius: 20,
                  marginTop: 10,
                  alignSelf: e==='l'?'flex-start':'flex-end',
                }}
              />
                  )
                })
              }
           
            </>
          ) : (
            <View>
              {dataMessage.length > 0 ? (

                <FlatList
                  data={dataMessage}
                  ref={flatListRef}
                  onContentSizeChange={() => {flatListRef.current.scrollToEnd() }}
                  renderItem={({item, index}) => {
                    return (
                      <Messages
                        data={item}
                        index={index}
                        userId={userId}
                        setReplyEnabled={setReplyEnabled}
                        replyEnabled={replyEnabled}
                        setReplymsg={setReplymsg}
                        userName={userName}
                      />
                    );
                  }}
                />
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'center',
                      fontFamily: FONT_FAMILY.NUNITO_MEDIUM,
                    }}>
                    Start Conversation
                  </Text>
                </>
              )}
            </View>
          )}
        </View>
      </View>

      {/* starting of textinput area */}

      <View style={{position: 'absolute', bottom: 10, width: '100%',flex:0.8}}>
      {
        replyEnabled ?(
          <View
          style={{
            height: 50,
            paddingHorizontal: 10,
            width: '100%',
            position: 'absolute',
            bottom: newValue,
            justifyContent: 'space-between',
            flexDirection: 'row',
           
          }}>
          <View
            style={{
              width: '90%',
              height: 50,
              borderRadius: 0,
              paddingHorizontal: 10,
              backgroundColor: '#eaeae5',
              borderTopRightRadius:10,
              borderTopLeftRadius:10,
              flexDirection:'row',
              justifyContent:'space-between',alignItems:'center'
            }}>
           <View>
           <Text style={{fontFamily: FONT_FAMILY.NUNITO_BOLD}}>{replymsg?.name}</Text>
            <Text>{replymsg?.msg.slice(0, 30)}...</Text>
           </View>

           <View>
            <Icon1 name='cross' onPress={()=>{setReplyEnabled(false),setReplymsg({_id:'',name:'',msg:''})}} size={20}/>
           </View>
          </View>
          <View style={{ width: '10%'}}/>

        </View>
        ):null
      }
        <View
          style={{
            paddingHorizontal: 10,
            // height: height,
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TextInput
            style={{
              // height: newValue-10,
              height:newValue,
              bottom:bottom,
              width: '90%',
              borderRadius: 20,
              borderTopLeftRadius: replyEnabled ? 0:20,
              borderTopRightRadius: replyEnabled ? 0:20,
              paddingHorizontal: 10,
              color: '#222',
              elevation: 0.5,
              backgroundColor: '#fff',
            }}
            numberOfLines={4}
            editable={true}
            value={message}
            onChangeText={e => setMessage(e)}
            onContentSizeChange={e =>

              updateSize(e.nativeEvent.contentSize.height)
            }
            placeholder="Type message..."
            multiline={true}
            scrollEnabled
            placeholderTextColor={'#222'}
          />
          <View
            style={{width: '10%', alignItems: 'center', alignSelf: 'center'}}>
            {message.length > 0 ? (
              <TouchableOpacity onPress={() => sendMsg()}>
                <Icon size={23} color={COLORS_ILLUSTRATION.tertiary} name="send" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
