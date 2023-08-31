import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import UserChip from '../general-components/UserChip';
import {answerProps} from '../../types/forumAnswerProps';
import RatingContainer from './RatingContainer';

interface answersContainerProps {
  answer: answerProps;
  forumId: string;
  userToken: string;
}

const AnswerContainer = ({
  answer,
  forumId,
  userToken,
}: answersContainerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <UserChip
          name={answer.answeredBy.name}
          photo={answer.answeredBy.photo}
          userId={answer.answeredBy._id}
          imgBorder="black"
          textColor="black"
        />
        <View style={styles.dot}></View>
        <Text style={styles.userText}>
          {moment(answer.createdAt).fromNow()}
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.ratingContainer}>
          <RatingContainer
            forumId={forumId}
            answerId={answer._id}
            upvotes={answer.upvotes}
            isAnswer={true}
            userToken={userToken}
          />
        </View>
        <Text style={styles.answerText}>{answer.answer}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#D5D9EB',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginBottom: 8,
  },
  userText: {
    color: '#000',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
    columnGap: 4,
    width: '100%',
  },
  ratingContainer: {
    width: '8%',
    paddingTop: 4,
  },
  answerText: {
    color: '#4A5578',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    width: '92%',
  },
});

export default AnswerContainer;
