import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../store/auth-context';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import axios from 'axios';
import {forumProps} from '../../types/ForumTypes';
import QuestionContainer from './questionContainer';
import AnswerContainer from './answerContainer';
import PostForumBtn from './ForumBtn';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CardHeader from '../general-components/CardHeader';
const ForumOverview = ({route}: any) => {
  console.log(route.params.id);

  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>(authCtx.token);

  const [forumId, setForumId] = useState<string>(route.params.id);
  const [forum, setForum] = useState<forumProps>();

  async function fetchForum() {
    await axios
      .get(`${BASE_URL}${apiVersion}/forum/${forumId}`, {
        headers: getHeaders(userToken),
      })
      .then(({data}: any) => {
        const forumData = data.data.data[0];
        console.log('FORUM DATA');
        console.log(data.data.data[0]);
        setForum(forumData);
        // setIsLoading(false);
      })
      .catch((data: any) => {
        console.log(data);
        // setIsLoading(false);
      });
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (forumId) {
      fetchForum();
    }
  }, [forumId, isFocused]);

  type RootStackParamList = {
    CreateForumAnswer: {forumID: string | undefined};
  };

  const screenNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const createForumAnswerNavigator = () => {
    if (forum) {
      screenNavigation.navigate('CreateForumAnswer', {
        forumID: forum._id,
      });
    } else {
      return;
    }
  };

  return forum ? (
    <ScrollView style={{backgroundColor:'#FFF'}}>
        <CardHeader
        title='Forum Overview'
        ShowMenuIcon={false}
        onBackPress={() => {}}
        onMenuPress={() => {}}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          margin:20 ,
         
        }}>
        <PostForumBtn
          text="Post answer"
          onPressFunc={createForumAnswerNavigator}
        />
      </View>
      <View style={styles.container}>
        <QuestionContainer
          createdBy={forum.createdBy}
          question={forum.question}
          upvotes={forum.upvotes}
          tagline={forum.tagline}
          forumId={forum._id}
          userToken={userToken}
          noAnswers={forum.answers.length == 0}
          createdAt={forum.createdAt}
        />
        <Text style={styles.replyheading}>Replies</Text>
        {forum?.answers.length != 0 && (
          <View style={styles.answerGrid}>
            {forum?.answers.map((ans, idx) => {
              return (
                <AnswerContainer
                  key={idx}
                  answer={ans}
                  forumId={forum._id}
                  userToken={userToken}
                />
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  ) : (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={48} color="#094067" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 40,
    marginHorizontal: 8,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12,
    // backgroundColor: "white",
    // flex: 1,
  },
  heading: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  answerGrid: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
  },
  replyheading: {
    color: '#000',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    paddingHorizontal: 6,
    marginBottom: 4,
    marginTop: 6,
  },
  loaderContainer: {
    // borderColor: "black",
    // borderWidth: 1,
    flex: 1,
    // paddingTop: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForumOverview;
