import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {teachingCardProps} from '../../types/teachingCardType';
import ClassroomCard from './ClassroomCard';

interface gridProps {
  teachCards: Array<teachingCardProps>;
  elemType?: string;
}

const ClassGrid = (props: gridProps) => {
  return (
    <View
    style={styles.container}>
      {props.teachCards.map((teachCard, index) => {
        return (
          <View>
            <ClassroomCard
            teachCard={teachCard}
            elemType={props.elemType}
            key={index}
          />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
  },
});

export default ClassGrid;
