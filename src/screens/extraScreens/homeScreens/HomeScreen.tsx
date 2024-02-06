import {View, Text, StyleSheet, ScrollView, Pressable,Linking, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import {AuthContext} from '../../../store/auth-context';
import HomeCardsHeader from '../../../components/homeScreenComponent/HomeCardsHeader';
import SearchComponent from '../../../components/homeScreenComponent/SearchComponent';
import {VIDEOS_FOR_CARAUSAL} from '../../../helpers/data';
import {
  COLORS_ELEMENTS,
  COLORS_ILLUSTRATION,
  FONT_FAMILY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../utils/globalContants';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native';
import UserModeForHome from '../../../components/user-profile-component/UserModeForHome';
import { Helper_Context } from '../../../store/helper_context';
import { getHeaders } from '../../../utils/helperFunctions';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import YoutubePlayer from "react-native-youtube-iframe";
import GlobalCard from '../../../components/homeScreenComponent/GlobalCard';
import Animated from 'react-native-reanimated';
import Carausal from '../../../components/carausal/Carausal';
import UserprofileSvg from '../../../components/svgComponents/UserProfileIconSvg';

interface RecommendedCourse {
  subject: string;
  topic: string;
  interested: number;
  coins: number;
  length: number;
  createdBy: {
    userName: string;
    photo: string;
  };
  dueDate: string;
  tags: string[];
  date?: string; // Include properties expected by RecommendedCards
  classStartsAt?: string;
  classEndsAt?: string;
  // Add more properties as needed
}

interface UpcomingClass {
  subject: string;
  topic: string;
  interested: number;
  coins: number;
  length: number;
  dueDate: string;
  createdBy: {
    userName: string;
    photo: string;
  };
  // Add more properties as needed
}

interface PopularCourse {
  subject: string;
  topic: string;
  interested: number;
  coins: number;
  length: number;
  dueDate: string;
  tags: string[];
  createdBy: {
    userName: string;
    photo: string;
  };

  // Add more properties as needed
}

const HomeScreen = (props:any) => {
  const [searchText, setSearchText] = useState('');
  const [RecommendedcourseData, setRecommendedcourseData] = useState<
    RecommendedCourse[]
  >([]);
  const [classesCreatedByMe, setClassesCreatedByMe] = useState<
  any[]
>([]);
const [myLearnCards, setMyLearnCards] = useState<
any[]
>([]);

const [myUnReviewedClasses, setMyUnreviewedClasses] = useState<
any[]
>([]);
  const [upcomingClassesData, setupcomingClassesData] = useState<
    UpcomingClass[]
  >([]);
  const [PopularCourseData, setPopularCourseData] = useState<PopularCourse[]>(
    [],
  );
  
  const {token,user} = useContext(AuthContext);
  const {setRole,role,setLearn_mode,learn_mode}:any = useContext(Helper_Context)
  const [loading, setLoading] = useState<boolean>(false)
  const [loading1, setLoading1] = useState<boolean>(false)
  const [loading2, setLoading2] = useState<boolean>(false)
  const [loading3, setLoading3] = useState<boolean>(false)
  const [loading4, setLoading4] = useState<boolean>(false)
  const [loading5, setLoading5] = useState<boolean>(false)
  const [youtubeStep, setYoutubeStep] = React.useState<number>(0)


    const handlePress =  (url:any) => {
      return Linking.openURL(url)
    }

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


  const handleSearch = () => {
    // Perform search action with searchText
  };

  const FetchRecommendedClasses = () => {
    setLoading(true)
    axios
      .get(`${BASE_URL}${apiVersion}/teach/recommended-classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
       setTimeout(() => {
        setLoading(false)
       }, 1500);
        setRecommendedcourseData(response.data.stats);

        //  console.log(response.data.stats);
      })
      .catch(error => {
        setTimeout(() => {
          setLoading(false)
         }, 1500);
        console.log('error fetching data', error);
      });
  };


  const fetchClassesCreatedByme = async () => {
    setLoading1(true)
    await axios
      .get(`${BASE_URL}${apiVersion}/user/my-teach-cards`, {
        headers: getHeaders(token),
      })
      .then(({ data }) => {
        // console.log("classes created by me ==> ",data);
        setTimeout(() => {
          setLoading1(false)
         }, 1500);
        setClassesCreatedByMe(data?.myCards)
        // setMyTeachCardsIsLoading(false);
      }).catch((err)=>{
        setTimeout(() => {
          setLoading1(false)
         }, 1500);
        console.log('error occuring in classes fetching')
      })
  };

  const fetchMyLearnCards = async () => {
    setLoading2(true)
    await axios
      .get(`${BASE_URL}${apiVersion}/user/my-learn-cards`, {
        headers: getHeaders(token),
      })
      .then(({ data }) => {
        // console.log("my learn cards==>",data);
        setTimeout(() => {
          setLoading2(false)
         }, 1500);
        setMyLearnCards(data.myCards);
        // setmyLearnCardsIsLoading(false);
      }).catch((err)=>{
        setTimeout(() => {
          setLoading2(false)
         }, 1500);
        console.log('err occured')
      })
  };

  const fetchMyUnreviewedClasses = async () => {
    setLoading3(true)
    await axios
      .get(`${BASE_URL}${apiVersion}/user/my-unreviewd-classes`, {
        headers: getHeaders(token),
      })
      .then(({ data }) => {
        // console.log(data);
        setTimeout(() => {
          setLoading3(false)
         }, 1500);
        setMyUnreviewedClasses(data.unreviewedClasses);
        // setUnreviewedIsLoading(false);
        
      }).catch((err)=>{
        setTimeout(() => {
          setLoading3(false)
         }, 1500);
        console.log('err occured in fetching unreviewed cards')
      })
  };

  const UpcomingClasses = () => {
    setLoading4(true)
    axios
      .get(`${BASE_URL}${apiVersion}/user/myclasses/upcoming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setupcomingClassesData(response?.data?.upcomingClasses);
        setTimeout(() => {
          setLoading4(false)
         }, 1500);
        // console.info('upcoming courses data');
        // console.log(response.data);
        // console.log(upcomingClassesData);
      })
      .catch(error => {
        setTimeout(() => {
          setLoading4(false)
         }, 1500);
        console.log('error fetching data', error);
      });
  };

  const PopularCourses = () => {
    setLoading5(true)
    axios
      .get(`${BASE_URL}${apiVersion}/learn/top-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setPopularCourseData(response.data.stats);
        setTimeout(() => {
          setLoading5(false)
         }, 1500);
        // console.log(response.data.stats, 'Poppuler cards');
      })
      .catch(error => {
        setTimeout(() => {
          setLoading5(false)
         }, 1500);
        console.log('error fetching data', error);
      });
  };

  useEffect(() => {
    FetchRecommendedClasses();
    UpcomingClasses();
    PopularCourses();
    fetchClassesCreatedByme();
    fetchMyLearnCards();
    fetchMyUnreviewedClasses();
  }, [token]);


  

  return (
    <ScrollView style={styles.HomeParentContainer}>
      <View style={styles.HomeTxtContainer}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
         
      <Text style={styles.txtOne}>Hello {user?.userName} 👋</Text>
      <Pressable onPress={()=>props.navigation.navigate('Userprofile')} style={{borderWidth:1,borderColor:'#fff',padding:5,borderRadius:20}}>
      <UserprofileSvg
            fill={'#fff'}
            height={24}
            width={24}
            active={true}
          />
      </Pressable>
      </View>

      
        <View style={{marginTop:20}}>
        <UserModeForHome
          isLearnMode={learn_mode}
          toggleMode={toggleMode}
          learnModeText="Learn"
          teachModeText="Teach"
        />
        </View>
        {
          role === 'learn' ?<Text style={styles.txtTwo}>What do you want to learn today?</Text>:<Text style={styles.txtTwo}>Teach something you know</Text>
        }
      </View>
  
      <SearchComponent
        searchText={searchText}
        onSearchPress={handleSearch}
        onSearchTextChange={setSearchText}
        props={props}
      />

       

      <View style={{paddingHorizontal: 25, paddingBottom: 20}}>
        {
          role === 'learn' ?(
            <>
        <TouchableOpacity
        onPress={()=>props.navigation.navigate('CreateLearnCard')}
          style={{
            height: 50,
            width: '100%',
            marginTop: 10,
            borderRadius: 5,
            backgroundColor: COLORS_ILLUSTRATION.tertiary,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 5,
          }}>
          <Icon
            name="plus"
            size={25}
            color={'white'}
            style={{alignSelf: 'center'}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
              color: 'white',
            }}>
            Create Learn Card
          </Text>
        </TouchableOpacity>
            </>
          ):(
            <>
        <TouchableOpacity
          onPress={()=>props.navigation.navigate('CreateTeachCard')}
          style={{
            height: 50,
            width: '100%',
            marginTop: 10,
            borderRadius: 5,
            backgroundColor: COLORS_ILLUSTRATION.tertiary,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 5,
          }}>
          <Icon
            name="plus"
            size={25}
            color={'white'}
            style={{alignSelf: 'center'}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
              color: 'white',
            }}>
            Create Teach Card
          </Text>
        </TouchableOpacity>
            </>
          )
        }
      </View>

      {/* second parent Container */}

      <View style={styles.SecondParentContainer}>
        <ScrollView style={{marginBottom: 80, marginTop: 40}}>
          <HomeCardsHeader
            title="Recommended Classes"
            onViewAllPress={() => {props.navigation.navigate('Classes',{
              barTo:1
            })}}
            icon={true}
          />
          {/* Recommended Courses cards */}
          <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over your data and generate Recommended cards */}
              {RecommendedcourseData?.length > 0 ? (
                <>
                  {RecommendedcourseData?.map((item, index) => (
                    <GlobalCard isLoading={loading} props={props} ReItem={item} key={index} />
                  ))}
                </>
              ) : (
                <View style={{paddingHorizontal: 20,marginTop:20}}>
                  <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD}}>
                    Currently no recommendations
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>



          {/* Classes created by me */}
          <HomeCardsHeader
            title="Classes Created By Me"
            onViewAllPress={() => {props.navigation.navigate('Classes')}}
            icon={true}
          />
          <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over your data and generate Recommended cards */}
              {classesCreatedByMe?.length > 0 ? (
                <>
                  {classesCreatedByMe?.map((item, index) => (
                    <GlobalCard isLoading={loading1} props={props} ReItem={item} key={index} />
                  ))}
                </>
              ) : (
                <View style={{paddingHorizontal: 20,marginTop:20}}>
                  <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD}}>
                    Currently no classes is created by me
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Fetch My Learn Cards */}
          {
            role === 'learn'?(
              <>
               <HomeCardsHeader
            title="My Learn Cards"
            onViewAllPress={() => {props.navigation.navigate('LearnCards')}}
            icon={true}
          />
          <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over your data and generate Recommended cards */}
              {myLearnCards?.length > 0 ? (
                <>
                  {myLearnCards?.map((item, index) => (
                    <GlobalCard isLoading={loading2} props={props} ReItem={item} key={index} />
                  ))}
                </>
              ) : (
                <View style={{paddingHorizontal: 20,marginTop:20}}>
                  <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD}}>
                    Currently no learn card is created by me
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
              </>
            ):null
          }

          {/* Unreviewed Classes */}
          <HomeCardsHeader
            title="Unreviewed Classes"
            onViewAllPress={() => {}}
            icon={true}
          />
          <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over your data and generate Recommended cards */}
              {myUnReviewedClasses?.length > 0 ? (
                <>
                  {myUnReviewedClasses?.map((item, index) => (
                    <GlobalCard isLoading={loading3} props={props} ReItem={item} key={index} />
                  ))}
                </>
              ) : (
                <View style={{paddingHorizontal: 20,marginTop:20}}>
                  <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD}}>
                    Currently no classes for review
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* My Upcoming classes */}

          <HomeCardsHeader
            title="My Upcoming Classes"
            onViewAllPress={() => {props.navigation.navigate('Classes',{
              barTo:2
            })}}
            icon={true}
          />
           <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over your data and generate Recommended cards */}
              {upcomingClassesData?.length > 0 ? (
                <>
                  {upcomingClassesData?.map((item, index) => (
                    <GlobalCard isLoading={loading4} props={props} ReItem={item} key={index} />
                  ))}
                </>
              ) : (
                <View style={{paddingHorizontal: 20,marginTop:20}}>
                  <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD}}>
                    Currently no upcoming classes
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Popular Request section  */}
         {
          role === 'learn'?(
            <>
               <HomeCardsHeader
            title="Rising Requests"
            onViewAllPress={() => {}}
            icon={true}
          />
          <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over Popular cards*/}
              

              {PopularCourseData?.length > 0 ? (
                <>
                 {PopularCourseData?.length > 0 &&
                PopularCourseData?.map((item, index) => (
                  //  console.log(item);
                  <GlobalCard isLoading={loading5} props={props} ReItem={item} key={index} />
                  ))}
                </>
              ) : (
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD}}>
                    Currently no rising request
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
            </>
          ):(
            null
          )
         }

          {/* carausal */}
          <HomeCardsHeader
            title="Watch these videos to know how and why to use Teach and Learn"
            icon={false} onViewAllPress={function (): void {
              throw new Error('Function not implemented.');
            } }          />
          
          <View style={{paddingHorizontal: 10}}>
            <Carausal
              data={VIDEOS_FOR_CARAUSAL}
              style={{
                height: 230,
                width: SCREEN_WIDTH / 2.2,
                borderRadius: 10,
                marginTop: 10,
                backgroundColor: '#ffffff',
                elevation: 4,
              }}
              imageStyle={{
                width: SCREEN_WIDTH - 25,
                height: 180,
                borderRadius: 10,
              }}
              imageContainerWidth={SCREEN_WIDTH - 25}
              imageContainerHeight={SCREEN_HEIGHT / 3}
              movingLinesWidthForIndex={SCREEN_WIDTH}
              dotsAlignment={SCREEN_WIDTH / 2.2}
            />
          </View>




          {/* <View style={{bottom:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,marginTop:20}}>
        
        {
          youtubeStep === 0 ?<Text>     </Text>:(
            <>
               <Icon1 name='arrow-back-ios' onPress={()=>setYoutubeStep(youtubeStep-1)} size={22} color={'#222'}/>
            </>
          )
        }
        <View style={{borderRadius:10,overflow:'hidden',backgroundColor:COLORS_ILLUSTRATION.stroke,justifyContent:'space-between'}}>
        <View>
        <YoutubePlayer
           height={150}
           webViewStyle={{
            width:SCREEN_WIDTH/1.4,
            // borderWidth:1,
           }}
           play={false}
           videoId={VIDEOS_FOR_CARAUSAL[youtubeStep].videoId}
           mediaplaybackrequiresuseraction={true}
           forceAndroidAutoplay={false}
          />
        </View>
          <View>
            <Text style={{flexWrap:'wrap',textAlign:'center',fontFamily:FONT_FAMILY.NUNITO_BOLD,color:COLORS_ILLUSTRATION.main,padding:10}}>{VIDEOS_FOR_CARAUSAL[youtubeStep].text}</Text>
          </View>
        </View>
        {
          youtubeStep === VIDEOS_FOR_CARAUSAL?.length-1 ?<Text>     </Text>:(
            <>
               <Icon1 name='arrow-forward-ios' onPress={()=>setYoutubeStep(youtubeStep+1)} size={22} color={'#222'}/>
            </>
          )
        }

      </View>

      <Animated.View
    style={{flexDirection:'row',width:SCREEN_WIDTH,justifyContent:'center',alignItems:'center',borderRadius:10}}>
        {VIDEOS_FOR_CARAUSAL?.map((e, i) => {
          return (
            <View
              key={i}
              style={{
                width: youtubeStep == i ? 40 : 16,
                height: youtubeStep == i ? 10 : 8,
                borderRadius: youtubeStep == i ? 5 : 4,
                backgroundColor:
                  youtubeStep == i ? COLORS_ILLUSTRATION.stroke : COLORS_ELEMENTS.paragraph,
                marginLeft: 5,
              }}/>
          );
        })}
      </Animated.View>
 */}





        <View style={{paddingHorizontal:20,marginTop:20}}>
        <Pressable onPress={()=>handlePress('https://teachandlearnglobal.blogspot.com')} style={[{justifyContent:'center',alignItems:'center',backgroundColor:COLORS_ILLUSTRATION.tertiary,height:50,flexDirection:'row',gap:5,marginTop:10,borderRadius:10}]}>
        <Text style={[styles.btnTxt,{textAlign:'center'}]}>Check out our blog</Text>
        <Icon name='arrow-up-right' size={18}  color={'#fff'}/>
      </Pressable>
        </View>
        </ScrollView>
      </View>

     
    </ScrollView>

    /* <TopBarClasses/> */

    // <Review/>
    // <PreLogin/>
    // <CardScreen/>
  );
};

const styles = StyleSheet.create({
  HomeParentContainer: {
    flex: 1,
    backgroundColor: '#094067',
  },
  HomeTxtContainer: {
    flexDirection: 'column',
    // alignItems:'center',
    margin: 25,
  },
  txtOne: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 10,
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    marginTop: 10,
  },
  txtTwo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
    marginTop:20
  },
  SecondParentContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  UpcomingcardsParentContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  UpcomingtxtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  LearningcardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt:{
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,
    color:COLORS_ELEMENTS.buttonTxt
  },
  searchBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    width: 47,
    height: 47,
  },
});

export default HomeScreen;
