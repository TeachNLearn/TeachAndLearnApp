import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import PlusSvg from '../svgComponents/PlusSvg';
import FormField from '../general-components/FormField';
import {View} from 'react-native';
import InputHolder from '../inputComponents/inputHolder';
import {getHeaders} from '../../utils/helperFunctions';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import axios from 'axios';
import {AuthContext} from '../../store/auth-context';
import Button from '../general-components/button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ScreenHeader from '../general-components/ScreenHeader';
const PostForumAnswer = (props: any) => {
  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>(authCtx.token);

  const [forumId, setForumId] = useState(props.route.params.forumID);

  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string>('');

  function updateFields(content: string) {
    setAnswer(content);
  }

  type RootStackParamList = {
    ForumOverview: {forumID: string | undefined};
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const answerhandler = async () => {
    console.log(answer);

    // if (handleValidation()) {
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL}${apiVersion}/forum/${forumId}/answers`,
        {
          answer,
        },
        {
          headers: getHeaders(userToken),
        },
      )
      .then(() => {
        setAnswer('');
        setIsLoading(false);
        navigation.navigate('ForumOverview', {
          forumID: forumId,
        });
      })
      .catch(data => {
        setIsLoading(false);
      });
    // }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <ScreenHeader
        title="Post Answer"
        ShowMenuIcon={false}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onMenuPress={() => {}}
      />
      <View style={styles.container}>
        <FormField
          elem={
            <InputHolder
              name="answer"
              type="text"
              updateFields={updateFields}
              value={answer}
              isTextarea={true}
              placeholderText="Answer to the query..."
              textareaLines={6}
              hasSignleUpdate={true}
              onFocus={()=>{}}
            />
          }
          inputDesc="Forum Answer"
        />
        <Button
          containerStyles={{backgroundColor: '#ef4565'}}
          onPress={answerhandler}>
          {isLoading ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            'Post Answer'
          )}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 24,
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
});

export default PostForumAnswer;
