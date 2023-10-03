import {View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import React from 'react';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../../store/auth-context';

// import Fontawesome from 'react-native-vector-icons/FontAwesome5';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import UserProfileHeader from '../../components/user-profile-component/UserProfileHeader';
import UserMode from '../../components/user-profile-component/UserMode';
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

const Userprofile: React.FC = (props: any) => {
  type RootStackParamList = {
    Login: undefined;
    Mywallet: undefined;
    MyFav: undefined;
    EditAcademicInfo: undefined;
    EditContactInfo: undefined;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const authCtx = useContext(AuthContext);
  const editIcon = <FontAwesome name="pen" size={15} color="#000" />;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLearnMode, setIsLearnMode] = useState<boolean>(true);
  const defaultImageSource = require('../../assets/Images/userProfilePic.png');
  const [currentMode, setCurrentMode] = useState<string>('')
  const [profileImage, setProfileImage] = useState<ImageInfo>({
    uri: defaultImageSource.uri,
    base64: '',
  });

  const toggleMode = (mode:boolean) => {
    console.log(mode)
    if(mode){
      setCurrentMode('teach')
    }else{
      setCurrentMode('learn')
    }
    setIsLearnMode(!isLearnMode);
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

  async function fetchMyDetails() {
    await axios
      .get(`${BASE_URL}${apiVersion}/user/me`, {
        headers: getHeaders(userToken),
      })
      .then(({data}) => {
        const user = data.data.data[0];
        user.token = userToken;
        console.log(user);
        setLocalUser(user);
      });
  }

  useEffect(() => {
    if (userToken) {
      fetchMyDetails();
    }
  }, [userToken]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMyDetails();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return localUser ? (
    <ScrollView
    style={{backgroundColor: "#fff"}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ScreenHeader
        ShowMenuIcon={false}
        onBackPress={() => props.navigation.goBack()}
        onMenuPress={() => {}}
        title="My Profile"
      />
      <View style={styles.userProfileParentContainer}>
        <ImagePickerButton
          handleImagePicker={handleImagePicker}
          profileImage={localUser.photo}
          defaultImageSource={defaultImageSource}
          style={{alignSelf:'center',justifyContent:'center',alignItems:'center'}}
          // Optional style prop
        />

        <TouchableOpacity
              style={[styles.editButton,{position:'absolute',right:0}]}
              onPress={() => {
                navigation.navigate('EditUserProfile');
              }}
            >
              <Text style={{color:'rgb(180, 35, 24)',fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>Edit{' '}</Text>
              {editIcon}
        </TouchableOpacity>
        {/* </View> */}
        <UserNameAndTagline
          name={localUser.name}
          educationInfo={localUser.tagline}
        />
        <UserMode
          isLearnMode={isLearnMode}
          toggleMode={toggleMode}
          learnModeText="Learn Mode"
          teachModeText="Teach Mode"
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
            showEdit
          />
          <GeneralMenu>
            <View
              style={{
                borderTopRightRadius: 50,
                borderTopLeftRadius: 50,
                backgroundColor: '#094067',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: FONT_FAMILY.NUNITO_BOLD,
                  // fontWeight: '600',
                  letterSpacing: 0.44,
                  margin: 40,
                  fontSize: 22,
                }}>
                Other Settings
              </Text>
              <GeneralMenuItem
                iconName="card-outline"
                text="My Wallet"
                onPress={() => {
                  navigation.navigate('Mywallet');
                }}
                showIcon={true}
              />
              <GeneralMenuItem
                iconName="heart-outline"
                text="My Favourites"
                onPress={() => {
                  navigation.navigate('MyFav');
                }}
                showIcon={true}
              />
              <GeneralMenuItem
                iconName="log-out-outline"
                text="Logout"
                onPress={showLogoutAlert}
                showIcon={true}
              />
              <GeneralMenuItem
                iconName="trash-outline"
                text="Delete Account"
                onPress={showDeleteAccountAlert}
                showIcon={true}
              />
            </View>
          </GeneralMenu>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CustomAlert
          visible={isDeleteAlertVisible}
          title="DeActivate Account"
          message="Are you sure you want to delete your account ?"
          onClose={hideDeleteAccountAlert}
          btn="Delete Account"
          btn2="Go back"
          goBack={goBack}
          onProceed={handleDeleteAccount}
        />
        <CustomAlert
          visible={isLogoutAlertVisible}
          title="Logout"
          message="Are you sure you want to log out ?"
          onClose={hideLogoutAlert}
          btn="Logout"
          btn2="Go back"
          goBack={goBack}
          onProceed={handleLogout}
        />
      </View>
    </ScrollView>
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

export default Userprofile;
