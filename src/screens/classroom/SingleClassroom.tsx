import React, {ReactElement, useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {classroomProps} from '../../types/classroomType';
import {AuthContext} from '../../store/auth-context';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import Overview from '../../components/class-component/signleClass-components/Overview';
import AllAnnouncements from '../../components/class-component/signleClass-components/AllAnnouncements';
import Participants from '../../components/class-component/signleClass-components/Participants';

const SingleClassroom = ({route}: any) => {
  const authCtx = useContext(AuthContext);

  const [classroomId, setClassroomId] = useState<string>(route.params.id);
  const [userToken, setUserToken] = useState<string>(authCtx.token);
  const [userId, setUserId] = useState<string>(authCtx.user._id);
  const [classroom, setClassroom] = useState<classroomProps>();
  const [activeLink, setActiveLink] = useState('overview');
  const [classElemType, setClassElemType] = useState<string>('all classes');
  const [backLink, setBackLink] = useState<string>('/classes');
  const [learnCardId, setlearnCardId] = useState<string>('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const link = route.params?.backPageLink;
    if (link) {
      setBackLink(link);
    }

    const navLink = route.params?.navLink;
    if (navLink) {
      setActiveLink(navLink);
    }
    const elemLink = route.params?.elemType;
    if (elemLink) {
      setClassElemType(elemLink);
    }

    const learnCardId = route.params?.learnCardId;
    if (learnCardId) {
      setlearnCardId(learnCardId);
    }
  }, []);

  async function fetchClassroom() {
    await axios
      .get(`${BASE_URL}${apiVersion}/teach/${classroomId}`, {
        headers: getHeaders(userToken),
      })
      .then(({data}) => {
        const card = data.teachCard;
        console.log(data);
        setClassroom(card);
        setIsLoading(false);
      })
      .catch(data => {
        console.log(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (classroomId) {
      fetchClassroom();
    }
  }, [classroomId]);

  const [element, setElement] = useState<ReactElement>();

  useEffect(() => {
    if (classroom) {
      setElement(
        <Overview {...classroom} userId={userId} userToken={userToken} />,
      );
    }
  }, [classroom]);

  useEffect(() => {
    if (classroom) {
      if (activeLink == 'overview') {
        setElement(
          <Overview {...classroom} userId={userId} userToken={userToken} />,
        );
      } else if (activeLink == 'classroom') {
        setElement(
          <AllAnnouncements
          // callLink={classroom.callLink}
          // cardBanner={classroom.cardBanner}
          // topic={classroom.topic}
          // isTeacher={checkTeacher(userId, classroom.createdBy._id)}
          // teachCardId={classroom._id}
          // userToken={userToken}
          // classElemType={classElemType}
          />,
        );
      } else if (activeLink == 'people') {
        setElement(
          <Participants
          // cardBanner={classroom.cardBanner}
          // createdBy={classroom.createdBy}
          // studentsEnrolled={classroom.studentsEnrolled}
          // topic={classroom.topic}
          // localUserId={userId}
          />,
        );
      }
    } else {
    }
  }, [activeLink]);

  const handleSectionChange = (
    section: 'overview' | 'classroom' | 'people',
  ): void => {
    setActiveLink(section);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={[activeLink === 'overview' && styles.activeSegment]}
          onPress={() => handleSectionChange('overview')}>
          <Text style={styles.segmentText}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[activeLink === 'classroom' && styles.activeSegment]}
          onPress={() => handleSectionChange('classroom')}>
          <Text style={styles.segmentText}>Classroom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[activeLink === 'people' && styles.activeSegment]}
          onPress={() => handleSectionChange('people')}>
          <Text style={styles.segmentText}>People</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.elementWrapper}>{element}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  activeSegment: {
    borderBottomColor: '#674FF1',
    borderBottomWidth: 2,
    width: '20%',
    alignItems: 'center',
  },
  segmentText: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  elementWrapper: {
    // marginHorizontal: 8,
    margin: 30,
  },
});

export default SingleClassroom;
