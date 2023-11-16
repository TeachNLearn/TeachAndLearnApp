import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FONT_FAMILY } from '../../utils/globalContants';

interface participantListProps {
  heading: string;
  listArr?: Array<listObj>;
  teacherObj?: listObj;
  props?:any
  // localUserId: string;
}

interface listObj {
  name: string;
  photo: string;
  _id: string;
  userName: string;
  props?:any
}

const ParticipantList = (props: participantListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{props.heading}</Text>
      <View style={styles.listContainer}>
        {Array.isArray(props.listArr) ? (
          props.listArr.map((user, index) => {
            return (
              <TouchableOpacity onPress={()=>props.props.navigation.navigate('OtherUserProfile',{
                otherUserId:user?._id
              })} style={styles.participant}>
                <Image style={styles.image} source={{uri: user.photo}} />
                <View style={styles.names}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.userName}>@ {user.userName}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.participant}>
            <Image
              style={styles.image}
              source={{uri: props.teacherObj?.photo}}
            />
            <TouchableOpacity onPress={()=>props.props.navigation.navigate('OtherUserProfile',{
              otherUserId:props?.teacherObj?._id
            })} style={styles.names}>
              <Text style={styles.name}>{props.teacherObj?.name}</Text>
              <Text style={styles.userName}>
                @ {props.teacherObj?.userName}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 22,
  },
  heading: {
    fontWeight: '600',
    fontSize: 26,
    width: '100%',
    paddingBottom: 5,
    color: '#3622a5',
    borderBottomWidth: 1,
    borderBottomColor: '#3622a5',
    fontFamily:FONT_FAMILY.NUNITO_BOLD
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 24,
  },
  participant: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    columnGap: 12,
  },
  image: {
    width: 51,
    height: 53,
    objectFit: 'cover',
    borderRadius: 50,
  },
  names: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    // fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 0.02,
    color: '#000000',
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD
  },
  userName: {
    fontWeight: '400',
    fontSize: 17,
    color: '#000000',
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD
  },
});

export default ParticipantList;
