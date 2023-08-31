import { View, Text, StyleSheet, ScrollView, Image,  TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState  , useContext} from 'react';
import { AuthContext } from '../../store/auth-context';

// import Fontawesome from 'react-native-vector-icons/FontAwesome5';
import Ionican from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import UserProfileHeader from '../../components/user-profile-component/UserProfileHeader';
import UserMode from '../../components/user-profile-component/UserMode'
import UserNameAndTagline from '../../components/user-profile-component/UserNameAndTagline';
import UserStats from '../../components/user-profile-component/UserStats'
import {GeneralMenu ,GeneralMenuItem } from '../../components/user-profile-component/UserMenu'
interface ImageInfo {
  uri: string;
  base64: string;
}
const Userprofile: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const [isLearnMode, setIsLearnMode] = useState<boolean>(true);
 const defaultImageSource = require('../../assets/Images/userProfilePic.png');
  const [profileImage, setProfileImage] = useState<ImageInfo>({
    uri: defaultImageSource.uri,
    base64: '',
  });

  const toggleMode = () => {
    setIsLearnMode(!isLearnMode);
  };

   const handleImagePicker = async (sourceType: 'gallery' | 'camera') => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        includeBase64: true,
        mediaType: 'photo',
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        compressImageQuality: 0.7,
        includeExif: true,
        // cropperToolbarTitle: 'Crop Image',
        cropperToolbarColor: '#094067',
        cropperToolbarWidgetColor: '#FFF',
        cropperActiveWidgetColor: '#094067',
        cropperStatusBarColor: '#094067',
        cropperToolbarTitle: 'Edit Photo',
        forceJpg: true,
        compressVideoPreset: 'MediumQuality',
        writeTempFile: true,
        useFrontCamera: sourceType === 'camera',
        // cropping: true,
        // includeBase64: true,
      });

      console.log(image);
      
      setProfileImage({
        uri: image.path,
        base64: image.data,
      });
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

 const handleLogout = () => {
  authCtx.logout();

 }

 
  
  const switchWidth = 60; // Customize the width of the switch
  const switchHeight = 30;
    const thumbSize = 10;
  return (
    <ScrollView style={{}}>
    <View style={styles.userProfileParentContainer}>
     <UserProfileHeader title='@ethanatex' onBackPress={() => {}} onMenuPress={() =>{}} />
    <TouchableWithoutFeedback onPress={() => handleImagePicker('gallery')}>
       <View>
          <Image
              source={profileImage.uri ? { uri: profileImage.uri } : defaultImageSource}
              style={styles.UserImg}
              resizeMode="contain"
            />
       </View>
    </TouchableWithoutFeedback>
     <UserNameAndTagline 
     name="Ethan Alexander"
     educationInfo="B. Tech Artificial Intelligence student and part-time Web Developer"
     />
     <UserMode
        isLearnMode={isLearnMode}
        toggleMode={toggleMode}
        learnModeText="Learn Mode"
        teachModeText="Teach Mode"
      />
  
    </View>
    <View style={{backgroundColor:'#094067' , borderTopLeftRadius:50 , borderTopRightRadius:50}}>

     <Text style={{color:'#FFF' , fontSize:22 , fontWeight:'600' , letterSpacing:0.44  , margin:25 ,    fontFamily:'Nunito',}}>Stats as Teacher</Text>
      <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'space-evenly', marginBottom:20  , }}>
       <UserStats label="Tought" value={24} />
       <UserStats label="Attended" value={24} />
       <UserStats label="Rating" value={24} /> 
      </View>


     <Text style={{color:'#FFF' , fontSize:22 , fontWeight:'600' , letterSpacing:0.44  , margin:25 ,    fontFamily:'Nunito',}}>Stats as Student</Text>
      <View style={{ marginLeft:65, alignItems:'flex-start' ,justifyContent:'flex-start', marginBottom:20  , }}>
        <UserStats label='Attended' value={2} />
      </View>
     
       <GeneralMenu>
        <Text style={{color:"#000" , fontFamily:'Nunito' , fontWeight:'600' , letterSpacing:0.44, margin:40 ,fontSize:22 ,}}>General</Text>
        <GeneralMenuItem iconName="card-outline" text="My Wallet" onPress={() => {}} />
        <GeneralMenuItem iconName="heart-outline" text="My Favourites" onPress={() => {}} />
        <GeneralMenuItem iconName="trash-outline" text="Delete Account" onPress={() => {}} />
        <GeneralMenuItem iconName="log-out-outline" text="Logout" onPress={handleLogout} />
      </GeneralMenu>
      
   
    </View>

     </ScrollView>
  
  )
}

const styles = StyleSheet.create({
userProfileParentContainer:{
flex:1,
flexDirection:'column',
alignItems:'center',
justifyContent:'center',
margin:60 ,
},

UserImg:{
width:97 ,
height:97 ,
},

GeneralMenu:{
  color:'#000' ,
  fontFamily:'Nunito' ,
  fontSize:18 ,
  fontWeight:'500' ,
  marginLeft:10 ,

}
})

export default Userprofile