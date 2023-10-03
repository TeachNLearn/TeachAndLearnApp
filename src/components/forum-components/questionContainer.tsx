import moment from 'moment';
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import UserChip from '../general-components/UserChip';
import RatingContainer from './RatingContainer';

interface questionProps {
  tagline: string;
  question: string;
  upvotes: string[];
  forumId: string;
  userToken: string;
  createdBy: {
    _id: string;
    userName: string;
    name: string;
    photo: string;
  };
  noAnswers: boolean;
  createdAt: string;
}

const QuestionContainer = (props: questionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.ratingContainer}>
          <RatingContainer
            upvotes={props.upvotes}
            isAnswer={false}
            forumId={props.forumId}
            userToken={props.userToken}
          />
        </View>
        <View>
          <Text style={styles.heading}>{props.tagline}</Text>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.userDetails}>
          <UserChip
            name={props.createdBy.userName}
            photo={props.createdBy.photo}
            userId={props.createdBy._id}
            imgBorder="black"
            textColor="black"
          />
          <View style={styles.dot}></View>
          <Text style={styles.userText}>
            {moment(props.createdAt).fromNow()}
          </Text>
        </View>
        <View>
          <Text style={styles.question}>{props.question}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 6,
    paddingBottom: 20,
    borderBottomColor: '#D0D5DD',
    borderBottomWidth: 2,
    backgroundColor: '#FFF',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
    columnGap: 4,
    width: '100%',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  ratingContainer: {
    width: '10%',
    paddingTop: 6,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12,
  },
  heading: {
    color: '#000',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '700',
    // borderColor: 'black',
    // borderWidth: 1,
    width: '95%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 6,
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
  question: {
    color: '#4A5578',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

export default QuestionContainer;
