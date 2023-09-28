import React from 'react';
import {forumProps} from '../../types/ForumTypes';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import PlusSvg from '../svgComponents/PlusSvg';
import CommentSvg from '../svgComponents/CommentSvg';

type forumCardProps = forumProps & {
  userToken: string;
};

const ForumCard = (props: forumCardProps) => {
  type RootStackParamList = {
    ForumOverview: {id: string} | undefined;
    
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const forumNavigator = () => {
    navigation.navigate(`ForumOverview`, {
      id: props._id,
    });
  
  };

  return (
    <Pressable style={styles.container} onPress={forumNavigator}>
      <View>
        <Text style={styles.topic}>{props.topic}</Text>
      </View>
      <View>
        {props.tagline.length > 85 ? (
          <Text style={styles.question}>
            {props.tagline.slice(0, 84)}
            &nbsp;
            <Text>...</Text>
          </Text>
        ) : (
          <Text style={styles.question}>{props.tagline}</Text>
        )}
      </View>
      <View style={styles.userDetails}>
        <Text style={styles.userText}>@{props.createdBy.userName}</Text>
        <View style={styles.dot}></View>
        <Text style={styles.userText}>{moment(props.createdAt).fromNow()}</Text>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.stat}>
          <PlusSvg color="#fff" />
          <Text style={styles.userText}>{props.upvotes.length}</Text>
        </View>
        <View style={styles.stat}>
          <CommentSvg />
          <Text style={styles.userText}>{props.answers.length}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#094067',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 32,
    paddingVertical: 20,
    rowGap: 12,
    cursor: 'pointer',
  },
  topic: {
    color: '#ef4565',
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '600',
  },
  question: {
    fontWeight: '600',
    fontSize: 22,
    color: '#d8eefe',
    fontStyle: 'normal',
    lineHeight: 28,
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 14,
  },
  userText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#ffffff',
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  stat: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
});

export default ForumCard;
