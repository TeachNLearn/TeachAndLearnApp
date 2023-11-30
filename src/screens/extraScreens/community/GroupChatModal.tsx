import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6'
import ScreenHeader from '../../../components/general-components/ScreenHeader';
import {
  COLORS_ELEMENTS,
  COLORS_ILLUSTRATION,
  FONT_FAMILY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../utils/globalContants';
import SkeletonLoaderHorizontalWithReanimatedGradient from '../skeletonUi/Skeleton';
import axios from 'axios';
import { BASE_URL, apiVersion } from '../../../utils/apiRoutes';
import { getHeaders } from '../../../utils/helperFunctions';
import { ToastHOC } from '../../../helpers/Toast';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../components/general-components/Loader';


const GroupChatModal = (props: any) => {

  const {token,userId} = props.route.params
  const isFocused = useIsFocused()

  const [newArray, setNewArray] = React.useState<any>([]);
  const [datt, setDatt] = React.useState<any>([])
  const [page, setPage] = React.useState(1)
  const [groupName, setGroupName] = React.useState<string>('')
  const [searchPeople, setSearchPeople] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [key, setKey] = React.useState('')
  const [searchResult, setSearchResult] = React.useState<any>([])

  const setArray = (elem: any) => {
    if (newArray.includes(elem)) {
      console.log("YE")
      setNewArray(newArray.filter((item: any) => item !== elem));
    } else {
      console.log("No")
      setNewArray((preElem: any) => [...preElem, elem]);
    }
  };

  const getAllUser = async()=>{
    try {
      setLoading(true)
      console.log("PAGGE",page)

      await axios
      .get(
        `${BASE_URL}${apiVersion}/user/all?page=${key.length>0?1:page}&search=${key}`,
        {
          headers: getHeaders(token),
        }
      )
      .then(({ data }) => {
      let u = data.payload
      if(key.length > 0){
        // setPage(1)
        setSearchResult(u)
      }
      else if(key.length === 0){
        // u =[]
        setDatt((prev:any)=>[...prev,...u])
      }
      setLoading(false)
      })
      .catch((err:any) => {
        ToastHOC.errorAlert(err.message,'could not fetch people')
        setLoading(false)

      });
    } catch (error:any) {
      ToastHOC.errorAlert('Error',error.message)
      setLoading(false)

    }
  }

  
  React.useEffect(()=>{
    // setPage(1)
    if(key.length > 0){
      getAllUser()
    }
    
  },[key])
  

  React.useEffect(() => {
    if (isFocused === true) {
      console.log(999)
      getAllUser()
      setPage(2)
      // return () => {
      //   getAllUser()
      // }
    }
  }, [isFocused === true]);

  const [loadingMore, setLoadingMore] = React.useState(false);

  const handleScroll = (event:any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 1; // Adjust as needed
  
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom && !loadingMore) {
      // setPage(page+1)

      handleLoadMore();
    }
  };


  const handleLoadMore = () => {
    // Simulate fetching more data
   if(key.length >0){
    null
   }else{
    setPage(page+1)

    console.log("working")
    setLoadingMore(true);

      getAllUser()
      setLoadingMore(false);
   }
  };

  const createGroup = async()=>{
    try {
      await axios
      .post(
        `${BASE_URL}${apiVersion}/chat/group`,
        {
          users:newArray,
          chatName:groupName
        },
        {
          headers: getHeaders(token),
        }
      )
      .then(({ data }) => {
        ToastHOC.successAlert("success","group creaeted")
        props.navigation.goBack()
      })
      .catch((err:any) => {
        ToastHOC.errorAlert(err.message,'could not create group')
      });
    } catch (error:any) {
      ToastHOC.errorAlert(error.message,"Error occured")
    }
  }


 
  return (
    <View style={{flex: 1}}>
      <ScreenHeader
        ShowMenuIcon={false}
        onBackPress={() => props.navigation.goBack()}
        onMenuPress={() => createGroup()}
        isCreate={groupName.length > 0 && newArray.length > 0?true:false}
        title={'Group Chat'}
      />

      <View style={{padding: 20}}>
        <View style={{marginTop: 20}}>
          <Text style={{fontFamily:FONT_FAMILY.NUNITO_BOLD}}>Edit Group Name</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#222',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Icon size={18} name="pencil" />
            <TextInput 
            onChangeText={(e)=>setGroupName(e)}
            style={{padding: 5,width:'75%',color:'#222'}} />
          </View>
        </View>
     

        <View style={{marginTop: 20}}>
          <Text style={{fontFamily:FONT_FAMILY.NUNITO_BOLD}}>Add People {newArray.length > 0 ?'( '+newArray.length +' people selected )' : null}</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#222',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Icon size={18} name="search" />
            <TextInput
            onChangeText={(e)=>setKey(e)}
            style={{padding: 5,width:'75%',color:'#222'}} />
 
          </View>
         
          

        </View>
        
      </View>

      <View style={{flex: .9, height: '100%', padding: 20, }}>
      <Text style={{fontFamily:FONT_FAMILY.NUNITO_BOLD}}>Select From Peoples</Text>

        <View style={{marginTop:20}}>
        <ScrollView 
        onScroll={handleScroll} 
        scrollEventThrottle={10}
        // style={{height:500}}
        showsVerticalScrollIndicator={false}>
         {
          key.length > 0?(
            searchResult?.map((e:any, i:number) => {
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
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&usqp=CAU',
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
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&usqp=CAU',
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
              );
            })
          ):(
            datt?.map((e:any, i:number) => {
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
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&usqp=CAU',
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
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&usqp=CAU',
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
              );
            })
          )
         }
        </ScrollView>
        {
          loading?<Loader/>:null
        }
        </View>
      </View>
    </View>
  );
};

export default GroupChatModal;
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
