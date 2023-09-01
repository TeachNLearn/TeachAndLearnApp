import React from 'react';
import {Text} from 'react-native';

interface cardTopicProps {
  topic: string;
}

const CardTopic = ({topic}: cardTopicProps) => {
  return (
    <Text
      style={{
        color: '#000',
        fontFamily: 'Nunito',
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 30,
      }}>
      {topic}
    </Text>
  );
};

export default CardTopic;
