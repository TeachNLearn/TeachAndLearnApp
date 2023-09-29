import React from 'react';
import {announcementProps} from '../../types/announcementProps';
import {StyleSheet, View} from 'react-native';
import UserChip from '../general-components/UserChip';
import {Text} from 'react-native';
import {getReadableDate, getReadableTime} from '../../utils/helperFunctions';
import { FONT_FAMILY } from '../../utils/globalContants';

const Announcement = (props: announcementProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UserChip
          name={props.sender.userName}
          photo={props.sender.photo}
          //   textSize="20px"
          //   imgSize="32px"
          textColor="black"
          userId={props.sender._id}
          imgBorder="black"
        />
        <Text style={styles.time}>
          {getReadableDate(props.createdAt) +
            ', ' +
            getReadableTime(props.createdAt)}
        </Text>
      </View>
      <Text style={styles.content}>{props.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 20,
    rowGap: 20,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    // elevation: 20,
    // shadowColor: '#52006A',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 26,
    color: '#000000',
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD
  },
});

export default Announcement;
