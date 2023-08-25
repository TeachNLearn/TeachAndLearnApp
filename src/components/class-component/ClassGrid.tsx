import React from 'react';
import {View, StyleSheet} from 'react-native';
import {teachingCardProps} from '../../types/teachingCardType';
import ClassroomCard from './ClassroomCard';

interface gridProps {
  teachCards: Array<teachingCardProps>;
  elemType?: string;
}

const ClassGrid = (props: gridProps) => {
  return (
    <View style={styles.container}>
      {props.teachCards.map((teachCard, index) => {
        return (
          <ClassroomCard
            teachCard={teachCard}
            elemType={props.elemType}
            key={index}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 24,
  },
});

export default ClassGrid;
