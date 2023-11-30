import {View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import React from 'react';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../../store/auth-context';

// import Fontawesome from 'react-native-vector-icons/FontAwesome5';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import UserProfileHeader from '../../components/user-profile-component/UserProfileHeader';
import UserMode from '../../components/user-profile-component/UserMode';
import Button from '../../components/general-components/button';
import UserNameAndTagline from '../../components/user-profile-component/UserNameAndTagline';
import {
  GeneralMenu,
  GeneralMenuItem,
} from '../../components/user-profile-component/UserMenu';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomAlert from '../modals/CancelClass';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import UserContactAndAcademicInfo from '../../components/user-profile-component/UserContactAndAcademicInfo';
import ImagePickerButton from '../../components/user-profile-component/UserImagePicker';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import StatsContainer from '../../components/profileComponents/StatsContainer';
import ScreenHeader from '../../components/general-components/ScreenHeader';
import {
  COLORS_ELEMENTS,
  COLORS_ILLUSTRATION,
  FONT_FAMILY,
} from '../../utils/globalContants';
import Loader from '../../components/general-components/Loader';
import { AirbnbRating } from 'react-native-ratings';
import { Helper_Context } from '../../store/helper_context';
import ReportUser from '../modals/ReportUserModal';
import { ToastHOC } from '../../helpers/Toast';

interface userProps {
  _id: string;
  name: string;
  userName: string;
  photo: string;
  tagline: string;
  email: string;
  enrolledProgramme: string;
  role: string;
  phoneNumber: string;
  classesEnrolled: string[];
  classesTaken: string[];
  interestedSubject: string;
  interestedSubjects: string[];
  strongSubject: string;
  strongSubjects: string[];
  language: string;
  preferredLanguages: string[];
  token: string;
}

interface ImageInfo {
  uri: string;
  base64: string | null | undefined;
}

const OtherUserprofile: React.FC = (props: any) => {
  type RootStackParamList = {
    Login: undefined;
    Mywallet: undefined;
    MyFav: undefined;
    EditAcademicInfo: undefined;
    EditContactInfo: undefined;
  };


  const [isReportUserVisible, setReportUserVisible] = useState<boolean>(false);

  const handleReportUserClick = () => {
    setReportUserVisible(true);
  };

  const handleReportUserClose = () => {
    setReportUserVisible(false);
  };

  const handleReportUserSave = async (inputValue: string) => {
    // Handle the saved value here, e.g., send it to the server
    if (inputValue != "") {
      // setIsLoading(true);
      await axios
        .post(
          `${BASE_URL}${apiVersion}/user/${props?.route?.params?.otherUserId}/report`,
          {
            inputValue,
          },
          {
            headers: getHeaders(userToken),
          }
        )
        .then(({ data }) => {
          console.log(data);
          // setIsLoading(false);
          // setInputValue("");
          ToastHOC.successAlert('Report','We have received your report')
          // onClose();
        })
        .catch((err:any) => {
          console.log(err.message);
          // setIsLoading(false);
          ToastHOC.errorAlert(err.message,'Error in receiving report')
        });
    }
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const authCtx = useContext(AuthContext);
  const {setRole,role,setLearn_mode,learn_mode} = useContext(Helper_Context)
  const editIcon = <FontAwesome name="pen" size={15} color="#000" />;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLearnMode, setIsLearnMode] = useState<boolean>(true);
  const defaultImageSource = require('../../assets/Images/userProfilePic.png');
  const [profileImage, setProfileImage] = useState<ImageInfo>({
    uri: defaultImageSource.uri,
    base64: '',
  });

  const toggleMode = (mode:boolean) => {
    console.log(mode)
    if(mode){

      setRole('learn')
      // setLearn_mode(false)
    }else{
      setRole('teach')
      // setLearn_mode(true)
    }
    setLearn_mode(!learn_mode);
  };

  const [isLogoutAlertVisible, setIsLogoutAlertVisible] =
    useState<boolean>(false);
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] =
    useState<boolean>(false);

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
  };

  const goBack = () => {
    hideLogoutAlert();
    hideDeleteAccountAlert();
  };

  const handleDeleteAccount = () => {
    hideDeleteAccountAlert();
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

  const switchWidth = 60; // Customize the width of the switch
  const switchHeight = 30;
  const thumbSize = 10;

  const [userToken, setUserToken] = useState<string>(authCtx.token);
  const [localUser, setLocalUser] = useState<userProps>();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const fetchUserDetails = async () => {
    await axios
      .get(`${BASE_URL}${apiVersion}/user/${props?.route?.params?.otherUserId}`, {
        headers: getHeaders(userToken),
      })
      .then(({ data }) => {
        console.log("OTHER",data);
       setLocalUser(data.user)
      });
  };
  

  useEffect(() => {
    if (userToken) {
      fetchUserDetails();
    }
  }, [userToken]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUserDetails();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const addToFav = async()=>{
    try {

    
        await axios
          .patch(
            `${BASE_URL}${apiVersion}/user/${props?.route?.params?.otherUserId}/addfavourite`,
            {},
            {
              headers: getHeaders(userToken),
            }
          )
          .then(({ data }) => {
            console.log(data.updatedUser);
            const favouriteusers = data.updatedUser.favouriteUsers;
            let user = data.updatedUser;
            user.token = props.userToken;
            if (favouriteusers.includes(props?.route?.params?.otherUserId)) {
              ToastHOC.successAlert('Added','user added to favourite')
            } else {
              ToastHOC.errorAlert('Removed','user removed from favourites')

            }
          })
          .catch((err:any) => {
            ToastHOC.errorAlert(err.message,'could not make changes')
          });
      
    } catch (error:any) {
      console.log("error occured ==> ",error.message)
    }
  }


  const createChat = async()=>{
    try {
   


      await axios
      .post(
        `${BASE_URL}${apiVersion}/chat`,
        {
          userId:localUser?._id,
        },
        {
          headers: getHeaders(userToken),
        }
      )
      .then(({ data }) => {
        console.log("POPO",data)
        if(data.status === 1){
          ToastHOC.successAlert("success","")
          props.navigation.navigate('ChatScreen',{
            user:localUser,
            data:{chat:{_id:data?.chat?._id}}
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


  return localUser ? (
    <>
      <ScreenHeader
  ShowMenuIcon={false}
  onBackPress={() => props.navigation.goBack()}
  onMenuPress={() => {}}
  title={localUser?.name}
/>
    <ScrollView
    style={{backgroundColor: "#fff"}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
     
      <View style={styles.userProfileParentContainer}>
          <View style={{width:'100%'}}>
          <ImagePickerButton
          handleImagePicker={handleImagePicker}
          profileImage={localUser.photo}
          defaultImageSource={defaultImageSource}
          style={{alignSelf:'center',justifyContent:'center',alignItems:'center'}}
          // Optional style prop
        />

          </View>
        {/* </View> */}
        <UserNameAndTagline
          name={localUser.name}
          educationInfo={localUser.tagline}
        />
      </View>
      <View
        style={{
          backgroundColor: '#094067',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <StatsContainer
          taught={localUser.classesTaken.length}
          userId={localUser._id}
          userToken={userToken}
          attended={localUser.classesEnrolled.length}
        />
        <View
          style={{
            backgroundColor: '#D8EEFE',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>
          <UserContactAndAcademicInfo
            navigation={navigation}
            editIcon={editIcon}
            showAcademicInfo
            showContactInfo
            showEdit={false}
            localUser={localUser}
          />
      
        </View>
        <GeneralMenu >
               <View style={{marginTop:0 , alignItems:'center',}}>
           <GeneralMenuItem iconName="document-text-outline" text="Message" onPress={() => createChat()} showIcon={true}/>
           <GeneralMenuItem iconName="heart-circle-outline" text="Add To Favourite" onPress={() => addToFav()} showIcon={true}/>
           <GeneralMenuItem iconName='warning-outline' text="Report User" onPress={()=>handleReportUserClick()}showIcon={true} />
           </View>
         </GeneralMenu>
      </View>
      <View style={{width:350}}>
        <ReportUser
        isVisible={isReportUserVisible}
        onClose={handleReportUserClose}
        onSave={handleReportUserSave}
        />
       </View> 
    
    </ScrollView>
    </>
  ) : (
    <Loader />
  );
};

const styles = StyleSheet.create({
  userProfileParentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
    rowGap: 16
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 11,
    marginLeft: 18,
  },
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth:1,
    borderRadius:20,
    borderColor:'grey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    // backgroundColor: '#3da9fc',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,

    borderWidth: 1,
    borderColor: 'gray',
  },

  UserImg: {
    width: 97,
    height: 97,
  },

  GeneralMenu: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
  },

  loadingIndicator: {
    marginTop: 20,
    flex: 1,
    height: 80,
    width: 80,
    color: '#000',
    backgroundColor: '00FFFFFF',
  },
});

export default OtherUserprofile;
