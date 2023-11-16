import React from 'react';
import {Text, View} from 'react-native';
import {student} from '../../../types/studentType';
import ParticipantList from '../ParticipantList';

interface participantProps {
  topic: string;
  createdBy: {
    name: string;
    photo: string;
    _id: string;
    userName: string;
  };
  studentsEnrolled: student[];
  localUserId: string;
  props:any
}

const Participants = (props: participantProps) => {
  return (
    <View style={{display: 'flex', flexDirection: 'column', rowGap: 32}}>
      <View>
        <ParticipantList props={props.props} heading="Teachers" teacherObj={props.createdBy} />
      </View>
      <View>
        {props.studentsEnrolled.length != 0 ? (
          <ParticipantList
            heading="Students"
            listArr={props.studentsEnrolled}
            props={props.props}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Participants;
