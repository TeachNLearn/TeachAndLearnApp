import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatHeader from './ChatHeader';
import {
  COLORS_ELEMENTS,
  COLORS_ILLUSTRATION,
  FONT_FAMILY,
} from '../../utils/globalContants';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';
import {ToastHOC} from '../../helpers/Toast';
import {useIsFocused} from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Loader from '../../components/general-components/Loader';

const EditGroup = (props: any) => {
  const {chatUser, chatId, token} = props?.route?.params;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [chatIdInfo, setChatIdInfo] = React.useState(null);
  const [removeUser, setRemoveUser] = React.useState<boolean>(false);
  const [newArray, setNewArray] = React.useState<any>([]);
  const [renameg, setRenameg] = React.useState<string>('')

  const setArray = (elem: any) => {
    if (newArray.includes(elem)) {
      setNewArray(newArray.filter((item: any) => item !== elem));
    } else {
      if (chatIdInfo.groupAdmin._id === elem) {
        ToastHOC.infoAlert('Admin cant be rmeoved', '');
      }
      else{
        setNewArray((preElem: any) => [...preElem, elem]);
      }
    }
  };

  const authCtx = useContext(AuthContext);
  // const {token} =
  const isFocused = useIsFocused();

  const fetchChatIdInfo = async () => {
    try {
      setLoading(true);
      await axios
        .post(
          `${BASE_URL}${apiVersion}/chat/fetchGroup`,
          {
            chatId: chatId,
          },
          {
            headers: getHeaders(authCtx.token),
          },
        )
        .then(({data}) => {
          setChatIdInfo(data.payload);
          console.log('Data', data);
          setLoading(false);
          // socket.emit('sendPrivateMessage', {message, roomId,userId });
        })
        .catch((err: any) => {
          setLoading(false);
          ToastHOC.errorAlert(err.message, '');
        });
    } catch (error: any) {
      setLoading(false);
      console.log('err', error.message);
    }
  };

  const forRemovingUser = () => {
    setRemoveUser(!removeUser);
  };

  React.useEffect(() => {
    if (isFocused === true) {
      console.log('000');
      fetchChatIdInfo();
    }
  }, [isFocused === true]);

  const removeUsers = async () => {
    console.log('LL', chatId);
    try {
      await axios
        .put(
          `${BASE_URL}${apiVersion}/chat/remove/${chatId}`,
          {
            userId: newArray,
          },
          {
            headers: getHeaders(authCtx.token),
          },
        )
        .then(({data}) => {
          console.log('DT', data);
          fetchChatIdInfo();
          ToastHOC.successAlert('User Removed', data.message);
          setNewArray([]);
          setRemoveUser(false);

          // setExistingUser(data.payload.users);
          // console.log('Data', data.payload.users.length);
          // setLoading(false);
          // socket.emit('sendPrivateMessage', {message, roomId,userId });
        })
        .catch((err: any) => {
          // setLoading(false);
          ToastHOC.errorAlert(err.message, '');
        });
    } catch (error: any) {
      console.log('error orrcured ==> ', error.message);
    }
  };


  const renameGroup = async () => {
    try {
      await axios
        .patch(
          `${BASE_URL}${apiVersion}/chat/rename/${chatId}`,
          {
            chatName:renameg,
            chatPhoto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&usqp=CAU'
          },
          {
            headers: getHeaders(authCtx.token),
          },
        )
        .then(({data}) => {
          fetchChatIdInfo();
          setRenameg('')
          props.navigation.navigate("Community")
          ToastHOC.successAlert('Group renamed', data.message);

        })
        .catch((err: any) => {
          ToastHOC.errorAlert(err.message, '');
        });
    } catch (error: any) {
      console.log('error orrcured ==> ', error.message);
    }
  };


  return (
   <View style={{flex:1}}>
       <View
          style={{
            height: 50,
            padding: 5,
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            elevation: 4,
            backgroundColor: COLORS_ELEMENTS.headline,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', gap: 15}}>
              <Icon
                onPress={() => props.navigation.goBack()}
                name="arrow-back"
                color={'#fff'}
                size={30}
                style={{alignSelf: 'center'}}
              />
              <Image
                source={{
                  uri: !chatUser?.photo
                    ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                    : chatUser.photo,
                }}
                style={{width: 40, height: 40, borderRadius: 20, borderWidth: 1}}
              />
            </View>
            <View>
              <Text style={{fontFamily: FONT_FAMILY.NUNITO_BOLD, color: '#fff',paddingLeft:10}}>
                {!chatIdInfo?.isGroupChat ?chatUser.name:chatIdInfo?.chatName}
              </Text>
            </View>
  
          </View>
  
  
          {
            renameg.length>0?(
              
          <TouchableOpacity onPress={()=>renameGroup()} style={{paddingRight:10}}>
          <Text style={{color: '#fff',fontFamily:FONT_FAMILY.NUNITO_BOLD}}>Save</Text>
        </TouchableOpacity>
            ):null
          }
        </View>
    {
      loading?(
        <>
          <Loader/>
        </>
      ):(
        <>
     
  
        <View style={{borderWidth: 1, padding: 20, flex: 1}}>
          {
            chatIdInfo?.isGroupChat ?(
              <>
                <View style={{marginTop: 20}}>
            <Text style={{fontFamily: FONT_FAMILY.NUNITO_BOLD}}>
              Rename Group
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#222',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon size={18} name="pencil" />
              <TextInput
                // onChangeText={(e)=>setGroupName(e)}
                style={{padding: 5, width: '75%', color: '#222'}}
                value={renameg}
                onChangeText={(e)=>setRenameg(e)}
              />
            </View>
          </View>
  
        {
          chatIdInfo?.groupAdmin?._id === authCtx?.user?._id ?(
            <View style={{marginTop: 20}}>
            {/* add members */}
            <Pressable
              onPress={() => {
                props.navigation.navigate('AddMembers', {
                  chatId: chatId,
                  chatIdInfo:chatIdInfo?.users
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                borderWidth: 1,
                padding: 5,
                borderRadius: 3,
              }}>
              <Icon1 name="addusergroup" size={25} />
              <Text style={{fontFamily: FONT_FAMILY.NUNITO_BOLD}}>
                Add Members
              </Text>
            </Pressable>
  
            {/* Remove members */}
            <Pressable
              onPress={() => forRemovingUser()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 20,
                borderWidth: 1,
                padding: 5,
                borderRadius: 3,
              }}>
              <Icon1 name="deleteusergroup" size={25} />
  
              <Text style={{fontFamily: FONT_FAMILY.NUNITO_BOLD}}>
                Remove Members
              </Text>
            </Pressable>
          </View>
          ):null
        }
  
              </>
            ):null
          }
          <View style={{marginTop: 20}}>
            <Text style={{fontFamily: FONT_FAMILY.NUNITO_BOLD}}>
              All Group Members ( {chatIdInfo?.users.length} members )
            </Text>
          </View>
  
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: 20}}>
            {chatIdInfo?.users?.map((e, i) => {
              return removeUser ? (
                <Pressable
                  onPress={() => setArray(e._id)}
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor:chatIdInfo?.groupAdmin?._id === e._id?'#fff': COLORS_ILLUSTRATION.stroke,
                    borderRadius: 6,
                    padding: 3,
                    elevation: 3,
                    marginTop: 10,
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <Image
                      source={{
                        uri: e.photo
                          ? e.photo
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&usqp=CAU',
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 1,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                        color: chatIdInfo?.groupAdmin?._id === e._id ?'#222':'#fff',
                      }}>
                      {e?.name}{' '}
                    </Text>
                  </View>
                  <View>
                    {chatIdInfo?.groupAdmin?._id === e._id ? (
                      <Text
                        style={{
                          fontFamily: FONT_FAMILY.NUNITO_ITALIC,
                          fontSize: 12,
                          color: chatIdInfo?.groupAdmin?._id === e._id?'#222':'#fff',
                        }}>
                        Admin
                      </Text>
                    ) : newArray.includes(e._id) ? (
                      <Icon name="trash-bin" color={'#fff'} size={20} />
                    ) : null}
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: 'white',
                    borderRadius: 6,
                    padding: 3,
                    elevation: 3,
                    marginTop: 10,
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <Image
                      source={{
                        uri: e.photo
                          ? e.photo
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&usqp=CAU',
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 1,
                      }}
                    />
                    <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD}}>
                      {e?.name}{' '}
                    </Text>
                  </View>
                  <View>
                    {chatIdInfo?.groupAdmin?._id === e._id ? (
                      <Text
                        style={{
                          fontFamily: FONT_FAMILY.NUNITO_ITALIC,
                          fontSize: 12,
                        }}>
                        Admin
                      </Text>
                    ) : null}
                  </View>
                  {/* <View style={{borderWidth:1,width:20,height:20,borderRadius:10}}>
  
              </View> */}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        {newArray.length > 0 && removeUser === true ? (
          <Pressable
            onPress={() => removeUsers()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS_ILLUSTRATION.stroke,
              flex: 0.08,
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.NUNITO_BOLD,
                color: '#fff',
                fontSize: 20,
              }}>
              Remove
            </Text>
          </Pressable>
        ) : null}
      </>
      )
    }
   </View>
  );
};

export default EditGroup;

const styles = StyleSheet.create({});
