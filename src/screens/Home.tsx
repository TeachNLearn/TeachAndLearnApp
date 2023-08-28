import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../utils/apiRoutes';
import {AuthContext} from '../store/auth-context';
import RecommendedCards from '../components/HomeScreenComponent/RecommendedCards';
import UpcomingCards from '../components/HomeScreenComponent/UpcomingCards';
import PopularRequest from '../components/HomeScreenComponent/PopularRequest';
import HomeCardsHeader from '../components/HomeScreenComponent/HomeCardsHeader';
import SearchComponent from '../components/HomeScreenComponent/SearchComponent';
import SvgComponent from '../components/SVGComponents/InterestedSvg';

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
  // Add more properties as needed
}

interface UpcomingClass {
  subject: string;
  topic: string;
  interested: number;
  coins: number;
  length: number;
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
  createdBy: {
    userName: string;
    photo: string;
  };
  // Add more properties as needed
}

const Home = () => {
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
        //  console.log(response.data);
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
        console.log(response.data.stats, 'Poppuler cards');
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
    <View style={styles.HomeParentContainer}>
      <View style={styles.HomeTxtContainer}>
        <Text style={styles.txtOne}>Hello Rahul 👋</Text>
        <Text style={styles.txtTwo}>What do you want to learn today?</Text>
      </View>
      <SearchComponent
        searchText={searchText}
        onSearchPress={handleSearch}
        onSearchTextChange={setSearchText}
      />

      <View style={styles.SecondParentContainer}>
        <ScrollView style={{marginBottom: 80, marginTop: 40}}>
          <HomeCardsHeader title="Popular Course" onViewAllPress={() => {}} />
          {/* Recommended Courses cards */}
          <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over your data and generate Recommended cards */}
              {RecommendedcourseData.length > 0 &&
                RecommendedcourseData.map((item, index) => (
                  <RecommendedCards item={item} key={index} />
                ))}
            </ScrollView>
          </View>

          <HomeCardsHeader title="Upcoming Classes" onViewAllPress={() => {}} />
          <View style={styles.UpcomingcardsParentContainer}>
            <UpcomingCards />
          </View>

          {/* Popular Request section  */}
          <HomeCardsHeader title="Popular Request" onViewAllPress={() => {}} />
          <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Here you can map over Popular cards*/}
              {PopularCourseData.length > 0 &&
                PopularCourseData.map((item, index) => (
                  //  console.log(item);
                  <PopularRequest item={item} key={index} />
                ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
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
    fontFamily: 'Nunito',
    marginTop: 10,
  },
  txtTwo: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFF',
    fontFamily: 'Nunito',
  },
  SecondParentContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  UpcomingcardsParentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
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

export default Home;
