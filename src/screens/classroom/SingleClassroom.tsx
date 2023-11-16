import React, {ReactElement, useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {classroomProps} from '../../types/classroomType';
import {AuthContext} from '../../store/auth-context';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import Overview from '../../components/class-component/singleClassComponents/Overview';
import AllAnnouncements from '../../components/class-component/singleClassComponents/AllAnnouncements';
import Participants from '../../components/class-component/singleClassComponents/Participants';
import {ScrollView} from 'react-native';
import {checkClassTeacher} from '../../components/class-component/classFunctions';
import {useIsFocused} from '@react-navigation/native';
import ScreenHeader from '../../components/general-components/ScreenHeader';
import Loader from '../../components/general-components/Loader';
import {FONT_FAMILY} from '../../utils/globalContants';

const SingleClassroom = (props: any) => {
  const authCtx = useContext(AuthContext);

  console.log("PPOP",props.route.params.id)
  const [classroomId, setClassroomId] = useState<string>(props.route.params.id);
  const [userToken, setUserToken] = useState<string>(authCtx.token);
  const [userId, setUserId] = useState<string>(authCtx.user._id);
  const [classroom, setClassroom] = useState<classroomProps>();
  const [activeLink, setActiveLink] = useState('Overview');
  const [classElemType, setClassElemType] = useState<string>('all classes');
  const [backLink, setBackLink] = useState<string>('/classes');
  const [learnCardId, setlearnCardId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const ACTIVE_LINK_ELEMENTS = [
    {
      name: 'Overview',
    },
    {
      name: 'Classroom',
    },
    {
      name: 'People',
    },
  ];

  useEffect(() => {
    const link = props.route.params?.backPageLink;
    if (link) {
      setBackLink(link);
    }

    const navLink = props.route.params?.navLink;
    if (navLink) {
      setActiveLink(navLink);
    }
    const elemLink = props.route.params?.elemType;
    if (elemLink) {
      setClassElemType(elemLink);
    }

    const learnCardId = props.route.params?.learnCardId;
    if (learnCardId) {
      setlearnCardId(learnCardId);
    }
  }, []);

  async function fetchClassroom() {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}${apiVersion}/teach/${classroomId}`, {
        headers: getHeaders(userToken),
      })
      .then(({data}) => {
        const card = data.teachCard;
        console.log("ALLL",card);
        setClassroom(card);
        setIsLoading(false);
      })
      .catch(data => {
        console.log(data);
        setIsLoading(false);
      });
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (classroomId) {
      fetchClassroom();
    }
  }, [classroomId, isFocused]);

  const [element, setElement] = useState<ReactElement>();

  useEffect(() => {
    if (classroom !== null) {
      setElement(
        <Overview props={props.route.params.props} {...classroom} userId={userId} userToken={userToken} />,
      );
    }
    else{
      setElement(
        <>
          <Text>Currently No overview</Text>
        </>
      )
    }
  }, [classroom]);

  useEffect(() => {
    if (classroom !== null) {
      if (activeLink == 'Overview') {
        setElement(
          <Overview  props={props.route.params.props} {...classroom} userId={userId} userToken={userToken} />,
        );
      } else if (activeLink == 'Classroom') {
        setElement(
          <AllAnnouncements
            callLink={classroom.callLink}
            topic={classroom.topic}
            isTeacher={checkClassTeacher(classroom.createdBy._id, userId)}
            teachCardId={classroom._id}
            userToken={userToken}
            classElemType={classElemType}
            props={props.route.params.props}

          />,
        );
      } else if (activeLink == 'People') {
        setElement(
          <Participants
            createdBy={classroom.createdBy}
            studentsEnrolled={classroom.studentsEnrolled}
            topic={classroom.topic}
            localUserId={userId}
            props={props.route.params.props}
          />,
        );
      }
    } else {
      setElement(
        <>
          <Text style={{fontSize:18,fontWeight:'bold',alignSelf:'center'}}>Currently No {activeLink}</Text>
        </>
      )
    }
  }, [activeLink]);

  const handleSectionChange = (
    section: 'Overview' | 'Classroom' | 'People' | string,
  ): void => {
    setActiveLink(section);
  };

  return (
    <ScrollView>
      <ScreenHeader
        title={activeLink}
        ShowMenuIcon={false}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onMenuPress={() => {}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        {ACTIVE_LINK_ELEMENTS?.map(e => {
          return (
            <TouchableOpacity
              style={[activeLink === e.name && styles.activeSegment]}
              onPress={() => handleSectionChange(e.name)}>
              <Text style={styles.segmentText}>{e.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.elementWrapper}>{element}</View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activeSegment: {
    borderBottomColor: '#674FF1',
    borderBottomWidth: 2,
    width: '22%',
    alignItems: 'center',
  },
  segmentText: {
    color: '#000',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  elementWrapper: {
    // marginHorizontal: 8,
    margin: 30,
  },
});

export default SingleClassroom;
