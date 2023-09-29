import React from 'react';
import {Text} from 'react-native';
import { FONT_FAMILY } from '../../utils/globalContants';

interface cardTopicProps {
  topic: string;
}

const CardTopic = ({topic}: cardTopicProps) => {
  return (
    <Text
      style={{
        color: '#000',
        fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
        fontSize: 23,
        // fontWeight: '700',
        lineHeight: 30,
      }}>
      {topic}
    </Text>
  );
};

export default CardTopic;
