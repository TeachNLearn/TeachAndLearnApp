import { View, Text, StyleSheet, ScrollView, Image,  TouchableWithoutFeedback, TouchableOpacity , ActivityIndicator } from 'react-native'
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
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomAlert from '../Modals/CancelClass';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import UserContactAndAcademicInfo from '../../components/user-profile-component/UserContactAndAcademicInfo';
import ImagePickerButton from '../../components/user-profile-component/UserImagePicker'
interface ImageInfo {
  uri: string;
  base64: string | null | undefined;
}
const Userprofile: React.FC = () => {
   type RootStackParamList = {
   Login:undefined;
   Mywallet:undefined;
   MyFav:undefined;
   EditAcademicInfo:undefined;
   EditContactInfo:undefined;
  };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const authCtx = useContext(AuthContext);
   const editIcon = <FontAwesome name="pen" size={15} color="#000" />;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLearnMode, setIsLearnMode] = useState<boolean>(true);
 const defaultImageSource = require('../../assets/Images/userProfilePic.png');
  const [profileImage, setProfileImage] = useState<ImageInfo>({
    uri: defaultImageSource.uri,
    base64: '',
  });

  const toggleMode = () => {
    setIsLearnMode(!isLearnMode);
  };

  const [isLogoutAlertVisible, setIsLogoutAlertVisible] = useState<boolean>(false);
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState<boolean>(false);

  const showLogoutAlert = () => {
    setIsLogoutAlertVisible(true);
  };
  const showDeleteAccountAlert = () => {
    setIsDeleteAlertVisible(true);
  };

  const hideLogoutAlert = () => {
    setIsLogoutAlertVisible(false);
  };
  const hideDeleteAccountAlert = () => {
    setIsDeleteAlertVisible(false);
  };

  const handleLogout = () => {
      authCtx.logout();
      navigation.navigate('Login');
     hideLogoutAlert();
 }
  const handleDeleteAccount = () => {
    
      hideDeleteAccountAlert();
 }

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

 

 
  
  const switchWidth = 60; // Customize the width of the switch
  const switchHeight = 30;
    const thumbSize = 10;
  return (
   
    <ScrollView style={{}}>
    <View style={styles.userProfileParentContainer}>
     <UserProfileHeader title='@ethanatex' onBackPress={() => {}} onMenuPress={() =>{}} />
    <ImagePickerButton
        handleImagePicker={handleImagePicker}
        profileImage={profileImage}
        defaultImageSource={defaultImageSource}
        // Optional style prop
      />
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


                    
    {/* <View style={{ backgroundColor:'#D8EEFE' ,borderTopLeftRadius:50 , borderTopRightRadius:50 , borderBottomLeftRadius:30 , borderBottomRightRadius:30 , }}> */}
      {/* Stats  */}
      <View style={{backgroundColor:'#094067' ,borderTopLeftRadius:50 , borderTopRightRadius:50 ,}}>
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

      <View style={{backgroundColor:'#D8EEFE' , borderTopLeftRadius:50 , borderTopRightRadius:50 }}>
          <UserContactAndAcademicInfo navigation={navigation}  editIcon={editIcon} showAcademicInfo showContactInfo showEdit/>

     
       
       <GeneralMenu>
        <View style={{borderTopRightRadius:50 , borderTopLeftRadius:50 , backgroundColor:'#094067'}}>
        <Text style={{color:"#FFF" , fontFamily:'Nunito' , fontWeight:'600' , letterSpacing:0.44, margin:40 ,fontSize:22 ,}}>Other Settings</Text>
        <GeneralMenuItem iconName="card-outline" text="My Wallet" onPress={() => {navigation.navigate('Mywallet')}} showIcon={true} />
        <GeneralMenuItem iconName="heart-outline" text="My Favourites" onPress={() => {navigation.navigate('MyFav')}}showIcon={true} />
        <GeneralMenuItem iconName="log-out-outline" text="Logout" onPress={showLogoutAlert} showIcon={true}/>
         <GeneralMenuItem iconName="trash-outline" text="Delete Account" onPress={showDeleteAccountAlert}showIcon={true} />
        </View>
   
        
      </GeneralMenu>
       </View>
      </View>
      
   
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <CustomAlert
        visible={isDeleteAlertVisible}
        title="Delete Account"
        message="Are you sure you want to delete your account."
        onClose={hideDeleteAccountAlert}
        btn="Delete Account"
        onProceed={handleDeleteAccount}
      />

      <CustomAlert
        visible={isLogoutAlertVisible}
        title="Logout"
        message="Are you sure you want to log out ?."
        onClose={hideLogoutAlert}
        btn="Logout"
        onProceed={handleLogout}
      />
    </View>
    {/* </View> */}
  
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

},

 loadingIndicator: {
    marginTop: 20,
    flex:1 ,
    height:80 ,
    width:80 ,
    color:'#000' ,
    backgroundColor:'00FFFFFF'
  },

   tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 11,
    marginLeft: 18,
  },
  tag: {
    // backgroundColor: '#3da9fc',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
   
    borderWidth:1 ,
    borderColor:'gray' ,
    
  },
})

export default Userprofile