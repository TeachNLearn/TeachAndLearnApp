import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import FontAwesom from 'react-native-vector-icons/FontAwesome5';
// import FontAwesom6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Userprofile from '../screens/profile/Userprofile';
import HomeSvg from '../components/SVGComponents/HomeIconSvg';
import UserprofileSvg from '../components/SVGComponents/UserProfileIconSvg';
import BookClasedSvg from '../components/SVGComponents/BookCloasedSvg';
import ForumSvg from '../components/SVGComponents/ForumSvg';
// import CreateClass from '../screens/classroom/CreateClass';
import ClassesSvg from '../components/SVGComponents/ClassesSvg';
// import Detail from '../screens/Detail';
import Search from '../screens/Search';
import LearnCardOverview from '../screens/requests/LearnCardOverview';
// import LearnCardOverviewNavigator from './LearnCardOverview';
import BuyClass from '../screens/Modals/BuyClass';
import Forum from '../screens/Forum/Forum';
// import LearnCards from '../screens/Search';
import LearnCards from '../screens/requests/LearnCards';
import Classes from '../screens/classroom/Classes';


const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: '#9695A5',

      tabBarLabelStyle: {
        fontSize: 9,
        fontWeight: 'bold',
      },
      tabBarStyle: {
        backgroundColor: '#2D2B4E',
        position: 'absolute',
        bottom: 10,
        left: 20,

        right: 20,
        elevation: 0,
        borderRadius: 40,
        height: 60,
      },
      tabBarShowLabel: false,
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <HomeSvg  fill={color} height={size} width={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Forum"
      component={Forum}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
         <ForumSvg fill={color} height={size} width={size}/>
        ),
      }}
    />

    

     <Tab.Screen
      name="LearnCards"
      component={LearnCards}

      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <BookClasedSvg fill={color} height={size} width={size} />
        ),
      }}

    />
    {/* <Tab.Screen name="LearnCardOverview" component={LearnCardOverview}options={{ headerShown: false,  }} /> */}
    

    

    <Tab.Screen
      name="Classes"
      component={Classes}

      options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <ClassesSvg fill={color} height={size} width={size}/>
        ),
      }}
     
    />

    <Tab.Screen
      name="Userprofile"
      component={BuyClass}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size ,focused}) => (
          <UserprofileSvg  fill={color} height={size} width={size} active={focused} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigation;
