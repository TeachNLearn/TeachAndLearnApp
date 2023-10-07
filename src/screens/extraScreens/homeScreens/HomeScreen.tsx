import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import {AuthContext} from '../../../store/auth-context';
import RecommendedCards from '../../../components/homeScreenComponent/RecommendedCards';
import UpcomingCards from '../../../components/homeScreenComponent/UpcomingCards';
import PopularRequest from '../../../components/homeScreenComponent/PopularRequest';
import HomeCardsHeader from '../../../components/homeScreenComponent/HomeCardsHeader';
import SearchComponent from '../../../components/homeScreenComponent/SearchComponent';
import Carausal from '../../../components/carausal/Carausal';
import {VIDEOS_FOR_CARAUSAL} from '../../../helpers/data';
import {
  FONT_FAMILY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../utils/globalContants';
import Icon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';

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

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [RecommendedcourseData, setRecommendedcourseData] = useState<
    RecommendedCourse[]
  >([]);
  const [upcomingClassesData, setupcomingClassesData] = useState<
    UpcomingClass[]
  >([]);
  const [PopularCourseData, setPopularCourseData] = useState<PopularCourse[]>(
    [],
  );
  const {token} = useContext(AuthContext);

  const handleSearch = () => {
    // Perform search action with searchText
    console.log('Searching for:', searchText);
  };

  const FetchRecommendedClasses = () => {
    axios
      .get(`${BASE_URL}${apiVersion}/teach/recommended-classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setRecommendedcourseData(response.data.stats);
        //  console.log(response.data.stats);
      })
      .catch(error => {
        console.log('error fetching data', error);
      });
  };

  const UpcomingClasses = () => {
    axios
      .get(`${BASE_URL}${apiVersion}/user/myclasses/upcoming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setupcomingClassesData(response.data);
        console.info('upcoming courses data');
        console.log(response.data);
        console.log(upcomingClassesData);
      })
      .catch(error => {
        console.log('error fetching data', error);
      });
  };

  const PopularCourses = () => {
    axios
      .get(`${BASE_URL}${apiVersion}/learn/top-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setPopularCourseData(response.data.stats);
        // console.log(response.data.stats, 'Poppuler cards');
      })
      .catch(error => {
        console.log('error fetching data', error);
      });
  };

  useEffect(() => {
    FetchRecommendedClasses();
    UpcomingClasses();
    PopularCourses();
  }, [token]);

  return (
    <ScrollView style={styles.HomeParentContainer}>
      <View style={styles.HomeTxtContainer}>
        <Text style={styles.txtOne}>Hello Rahul 👋</Text>
        <Text style={styles.txtTwo}>What do you want to learn today?</Text>
      </View>
      <SearchComponent
        searchText={searchText}
        onSearchPress={handleSearch}
        onSearchTextChange={setSearchText}
      />

      <View style={{paddingHorizontal: 25, paddingBottom: 20}}>
        <Text style={styles.txtOne}>Create a learn card</Text>
        <TouchableOpacity
          style={{
            height: 50,
            width: '100%',
            marginTop: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.10)',
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
      </View>

      {/* second parent Container */}

      <View style={styles.SecondParentContainer}>
        <ScrollView style={{marginBottom: 80, marginTop: 40}}>
          <HomeCardsHeader
            title="Recommended Classes"
            onViewAllPress={() => {}}
            icon={true}
          />
          {/* Recommended Courses cards */}
          <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over your data and generate Recommended cards */}
              {RecommendedcourseData.length > 0 ? (
                <>
                  {RecommendedcourseData.map((item, index) => (
                    <RecommendedCards ReItem={item} key={index} />
                  ))}
                </>
              ) : (
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD}}>
                    Currently no recommendations
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
          <HomeCardsHeader
            title="My Upcoming Classes"
            onViewAllPress={() => {}}
            icon={true}
          />
          <ScrollView>
            <View style={styles.UpcomingcardsParentContainer}>
              {upcomingClassesData.length > 0 ? (
                <>
                  {upcomingClassesData.length > 0 &&
                    upcomingClassesData.map((item, index) => (
                      <UpcomingCards item={item} key={index} />
                    ))}
                </>
              ) : (
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD}}>
                    Currently no upcoming classes
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Popular Request section  */}
          <HomeCardsHeader
            title="Rising Requests"
            onViewAllPress={() => {}}
            icon={true}
          />
          <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over Popular cards*/}
              

              {PopularCourseData.length > 0 ? (
                <>
                 {PopularCourseData.length > 0 &&
                PopularCourseData.map((item, index) => (
                  //  console.log(item);
                  <PopularRequest item={item} key={index} />
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

          {/* carausal */}
          <HomeCardsHeader
            title="Watch these videos to know how and why to use Teach and Learn"
            icon={false}
          />
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
    fontSize: 28,
    fontWeight: '600',
    color: '#FFF',
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
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
});

export default HomeScreen;
