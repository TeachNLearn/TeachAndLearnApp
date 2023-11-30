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

  const [key, setKey] = React.useState<string>('')
  const [allPeople, setAllPeople] = React.useState<any>([])
  const [newArray, setNewArray] = React.useState<any>([]);
  const [existingUser, setExistingUser] = React.useState<any>([])
  const [loading, setLoading] = React.useState<boolean>(false)

//   const {chatIdInfo} = props.route.params

  const authCtx = useContext(AuthContext)
  const isFocused = useIsFocused()

  
 
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
        console.log("DATTA",data.payload)
        setLoading(false)
      setAllPeople(data.payload)
      })
      .catch((err:any) => {
        setLoading(false)
        // ToastHOC.errorAlert('User not found','')
      });
    } catch (error:any) {
      setLoading(false)
      ToastHOC.errorAlert('Error',error.message)
    }
  }

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
          props.navigation.navigate('ChatScreen',{
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
    getAllUser()
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
              <>
                <Pressable onPress={()=>createChat(e)}
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
          </View>
          )
        })
      }
        </ScrollView>
       </View>
          </>
        )
       }
    </View>
  )
}

export default AddMembers

const styles = StyleSheet.create({})