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
}

const Participants = (props: participantProps) => {
  return (
    <View style={{display: 'flex', flexDirection: 'column', rowGap: 32}}>
      <View>
        <ParticipantList heading="Teachers" teacherObj={props.createdBy} />
      </View>
      <View>
        {props.studentsEnrolled.length != 0 ? (
          <ParticipantList
            heading="Students"
            listArr={props.studentsEnrolled}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Participants;
