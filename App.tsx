/* eslint-disable prettier/prettier */
import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import AuthContextProvider, {AuthContext} from './src/store/auth-context';
import TabNavigation from './src/navigation/TabNavigation';
import StackNavigation from './src/navigation/StackNavigation';
import {AppAsyncUserStorage} from './src/utils/globalContants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForumOverview from './src/components/forum-components/ForumOverview';
import Login from './src/screens/auth/Login';
import LearnCardOverview from './src/screens/requests/LearnCardOverview';
import ClassOverview from './src/screens/classroom/ClassOverview';
import CreateLearnCard from './src/screens/requests/CreateLearnCard';
import CreateTeachCard from './src/screens/classroom/CreateTeachCard';
import CreateForum from './src/screens/forum/CreateForum';
import PostForumAnswer from './src/components/forum-components/postForumAnswer';
import SingleClassroom from './src/screens/classroom/SingleClassroom';
import Forum from './src/screens/forum/Forum';
import Classes from './src/screens/classroom/Classes';
import MyFavourite from './src/components/user-profile-component/user-menu-component/MyFavourite';
import MyWallet from './src/components/user-profile-component/user-menu-component/MyWallet';
import EditAcademicInfo from './src/components/user-profile-component/user-menu-component/EditAcademicInfo';
import EditContactInfo from './src/components/user-profile-component/user-menu-component/EditContactInfo';
import Toast from 'react-native-toast-message';
import Splash from './src/components/splash/Splash';
import EditUserProfile from './src/components/user-profile-component/user-menu-component/EditUserProfile';
import { Helper_Context_Provider } from './src/store/helper_context';
import Review from './src/components/review/Review';
import OtherUserprofile from './src/screens/profile/OtherUserProfile';
import ChatScreen from './src/screens/chat/ChatScreen';
import GroupChatModal from './src/screens/extraScreens/community/GroupChatModal';
import EditGroup from './src/screens/chat/EditGroup';
import AddMembers from './src/screens/chat/AddMembers';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchUser from './src/screens/chat/SearchUser';
import FilterSearch2 from './src/components/SearchComponent/filterSearch_2/FilterSearch2';
import SearchPageForHome from './src/components/homeScreenComponent/SearchPageForHome';
import FilterSearch from './src/components/SearchComponent/FilterSearch';

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return authCtx.isAuthenticated ? <TabNavigation /> : <StackNavigation />;
};

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedUserData = await AsyncStorage.getItem(AppAsyncUserStorage);
      console.log(storedUserData);

      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        authCtx.setLocalUser(parsedData);
      }

      setTimeout(() => {
        setIsTryingLogin(false);
      }, 2500);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return (
      isTryingLogin ?<Splash/>:null
    );
  }

  return <Navigation />;
}

const Stack = createNativeStackNavigator();

const NavigationScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
         
        <Stack.Screen
          name="BottomTabs"
          component={Root}
          options={{
            title: 'Bottom Tabs',
            headerShown: false,
          }}
        />
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="Mywallet" component={MyWallet} />
        <Stack.Screen name="MyFav" component={MyFavourite} />
        <Stack.Screen name="EditContactInfo" component={EditContactInfo} />
        <Stack.Screen name="EditAcademicInfo" component={EditAcademicInfo} />
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
        <Stack.Screen name="ForumOverview" component={ForumOverview} />
        <Stack.Screen name="CreateForum" component={CreateForum} />
        <Stack.Screen name="CreateForumAnswer" component={PostForumAnswer} />
        <Stack.Screen name="LearnCardOverview" component={LearnCardOverview} />
        <Stack.Screen name="CreateLearnCard" component={CreateLearnCard} />
        <Stack.Screen name="Classes" component={Classes} />
        <Stack.Screen name="OtherUserProfile" component={OtherUserprofile}/>
        <Stack.Screen name="ChatScreen" options={{
          animation:'slide_from_right'
        }} component={ChatScreen}/>
        <Stack.Screen name="ClassOverview" component={ClassOverview} />
        <Stack.Screen name="SingleClassroom" component={SingleClassroom} />
        <Stack.Screen name="CreateTeachCard" component={CreateTeachCard} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="SearchUser" options={{
          animation:'slide_from_bottom'
        }} component={SearchUser} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AddMembers" 
        options={{
          animation:'slide_from_bottom'
        }}
        component={AddMembers} />

        <Stack.Screen name="SearchHome" 
        options={{
          animation:'slide_from_right'
        }}
        component={SearchPageForHome} />


          <Stack.Screen name="Filter_Search" 
        options={{
          animation:'slide_from_bottom'
        }}
        component={FilterSearch2} />

        <Stack.Screen name="Filter_Searchs" 
        options={{
          animation:'slide_from_bottom'
        }}
        component={FilterSearch} />


        <Stack.Screen 
        options={{
          animation:'slide_from_right'
        }} 
        name="EditGroup" component={EditGroup} />

        <Stack.Screen name="GroupAdd" 
        options={{
          animation:'slide_from_bottom'
        }}
        component={GroupChatModal} />
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (

    <AuthContextProvider>
      <Helper_Context_Provider>
        <GestureHandlerRootView style={{flex:1}}>
          <NavigationScreens />
        </GestureHandlerRootView>
      </Helper_Context_Provider>
      <Toast/>
    </AuthContextProvider>
    
  );
};

export default App;
