import React, {useContext, useState} from 'react';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import axios from 'axios';
import {getHeaders} from '../../utils/helperFunctions';
import {StyleSheet, Text, View} from 'react-native';
import UpvoteSvg from '../svgComponents/UpvoteSvg';
import {TouchableOpacity} from 'react-native';
import {AuthContext} from '../../store/auth-context';

interface ratingProps {
  userToken: string;
  isAnswer: boolean;
  upvotes: string[];
  forumId: string;
  answerId?: string;
}

const RatingContainer = (props: ratingProps) => {
  const authCtx = useContext(AuthContext);

  const [localUserID, setLocalUserID] = useState(authCtx.user._id);

  const [upvoteArr, setUpvoteArr] = useState(props.upvotes);

  const upvoteCheck = () => {
    return upvoteArr.includes(localUserID);
  };

  const upvoteHandler = async () => {
    if (!props.isAnswer) {
      await axios
        .patch(
          `${BASE_URL}${apiVersion}/forum/${props.forumId}`,
          {},
          {
            headers: getHeaders(props.userToken),
          },
        )
        .then(({data}) => {
          console.log(data);
          const newUpvotes = data.updatedForum.upvotes;
          setUpvoteArr(newUpvotes);
        })
        .catch(data => {
          // console.log(data.response.data.message);
        });
    } else {
      await axios
        .patch(
          `${BASE_URL}${apiVersion}/forum/${props.forumId}/answers/${props.answerId}`,
          {},
          {
            headers: getHeaders(props.userToken),
          },
        )
        .then(({data}) => {
          console.log(data);
          const newUpvotes = data.updatedAnswer.upvotes;
          setUpvoteArr(newUpvotes);
        })
        .catch(data => {
          console.log(data.response.data.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={upvoteHandler}>
        <UpvoteSvg
          color={upvoteCheck() ? '#094067' : 'rgba(125, 137, 176, 0.4)'}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.text,
          props.isAnswer ? styles.isAnswerText : styles.nonAnswerText,
        ]}>
        {upvoteArr.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  text: {
    color: '#000',
    fontFamily: 'Nunito',
    fontWeight: '500',
  },
  isAnswerText: {
    fontSize: 17,
  },
  nonAnswerText: {
    fontSize: 20,
  },
});

export default RatingContainer;
