import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL, apiVersion } from '../../utils/apiRoutes';
import { ToastHOC } from '../../helpers/Toast';
import { getHeaders } from '../../utils/helperFunctions';
import { AuthContext } from '../../store/auth-context';
import {useIsFocused} from '@react-navigation/native';
import { COLORS_ILLUSTRATION, FONT_FAMILY } from '../../utils/globalContants';
import Icon2 from 'react-native-vector-icons/FontAwesome6'
import { TouchableOpacity } from 'react-native';
import Loader from '../../components/general-components/Loader';



const AddMembers = (props:any) => {

  const [key, setKey] = React.useState<string>('all')
  const [allPeople, setAllPeople] = React.useState<any>([])
  const [newArray, setNewArray] = React.useState<any>([]);
  const [existingUser, setExistingUser] = React.useState<any>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  const {chatId,chatIdInfo} = props.route.params

  const authCtx = useContext(AuthContext)
  const isFocused = useIsFocused()

  
  const setArray = (elem: any) => {
    if (newArray.includes(elem)) {
      setNewArray(newArray.filter((item: any) => item !== elem));
    } else {
      const check = existingUser.find((e)=>e._id === elem)
      if(check === undefined){
        setNewArray((preElem: any) => [...preElem, elem]);
      }
      else{
        ToastHOC.infoAlert('User already added in group',"")
      }
    }
  };

  const getAllUser = async()=>{
    try {
      setLoading(true)
      await axios
      .get(
        `${BASE_URL}${apiVersion}/chat/search/${key}`,
        {
          headers: getHeaders(authCtx.token),
        }
      )
      .then(({ data }) => {
        setLoading(false)
        let result = data?.payload.filter(e => !chatIdInfo.some(k => e?._id === k?._id));
      setAllPeople(result)
      })
      .catch((err:any) => {
        setLoading(false)
        ToastHOC.errorAlert('User not found','')
      });
    } catch (error:any) {
      setLoading(false)
      ToastHOC.errorAlert('Error',error.message)
    }
  }

  
  const fetchChatIdInfo = async () => {
    try {
     
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
          setExistingUser(data.payload.users);
          // console.log('Data', data.payload.users.length);
          // setLoading(false);
          // socket.emit('sendPrivateMessage', {message, roomId,userId });
        })
        .catch((err: any) => {
          // setLoading(false);
          ToastHOC.errorAlert(err.message, '');
        });
    } catch (error: any) {
      // setLoading(false);
      console.log('err', error.message);
    }
  };

  const addUser = async()=>{
    try {
      await axios
      .put(
        `${BASE_URL}${apiVersion}/chat/add/${chatId}`,
        {
          userId: newArray,
        },
        {
          headers: getHeaders(authCtx.token),
        },
      )
      .then(({data}) => {
        props.navigation.goBack()
        ToastHOC.successAlert('Users added', '');

        // setExistingUser(data.payload.users);
        // console.log('Data', data.payload.users.length);
        // setLoading(false);
        // socket.emit('sendPrivateMessage', {message, roomId,userId });
      })
      .catch((err: any) => {
        // setLoading(false);
        ToastHOC.errorAlert(err.message, '');
      });
    } catch (error:any) {
      console.log("error orrcured ==> ",error.message)
    }
  }

  React.useEffect(() => {
    getAllUser()
    if(isFocused === true){
      fetchChatIdInfo()
    }
    if(key.length === 0){
      setKey('all')
    }
  }, [isFocused === true,key])
  

  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',elevation:1,borderBottomWidth:.5}}>
       <View style={{flexDirection:'row',alignItems:'center',marginLeft:3}}>
       <Icon
            onPress={() => props.navigation.goBack()}
            name="arrow-back"
            color={'#222'}
            size={30}
            style={{alignSelf: 'center'}}
          />
       <TextInput
        placeholder='search...'
        placeholderTextColor={'#222'}
        onChangeText={(e)=>setKey(e)}
        style={{height:50,paddingHorizontal:10,width:'80%',color:'#222'}}
        />
       </View>
        <Icon size={26} style={{marginRight:10}} name="search"   />


      </View>

      
      {/* people */}
       {
        loading?(
          <>
            <Loader/>
          </>
        ):(
          <>
            <View style={{flex:newArray.length > 0?.93:1}}>
       <ScrollView contentContainerStyle={{paddingHorizontal:15,marginTop:20}}>
        {
        allPeople?.map((e:any,i:number)=>{

          return (
            <View key={i}>
            {newArray?.includes(e?._id) ? (
              <>
                <Pressable onPress={()=>setArray(e?._id)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: COLORS_ILLUSTRATION.stroke,
                    borderRadius: 6,
                    padding: 3,
                    elevation: 3,
                    marginTop: 10,
                    justifyContent: 'space-between',
                    paddingHorizontal:10
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <Image
                      source={{
                        uri: e.photo?e.photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&usqp=CAU',
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 1,
                      }}
                    />
                    <Text style={{color:'#fff',fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>{e?.name}</Text>
                  </View>
                  <View>
                  <Icon2 name='check' color={'#fff'} size={20} style={{width:20,height:20,borderRadius:10,alignSelf:'center'}}/>

                  </View>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={()=>setArray(e?._id)}
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
                    paddingHorizontal:10
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <Image
                      source={{
                        uri: e.photo?e.photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&usqp=CAU',
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 1,
                      }}
                    />
                    <Text style={{fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>{e?.name}</Text>
                  </View>
                  {/* <View style={{borderWidth:1,width:20,height:20,borderRadius:10}}>

        </View> */}
                </Pressable>
              </>
            )}
            
          </View>
          )
        })
      }
        </ScrollView>
       </View>
      {
        newArray.length >0?(
          <TouchableOpacity onPress={()=>addUser()} style={{backgroundColor:COLORS_ILLUSTRATION.stroke,flex:.07,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontFamily:FONT_FAMILY.NUNITO_BOLD,color:'#fff',fontSize:20}}>Add</Text>
          </TouchableOpacity>
        ):(
          null
        )
      }
          </>
        )
       }
    </View>
  )
}

export default AddMembers

const styles = StyleSheet.create({})