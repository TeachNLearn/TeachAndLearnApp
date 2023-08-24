import React from 'react'
import { View } from "react-native"
import { teachingCardProps } from '../../types/teachingCardType';

interface gridProps {
    teachCards: Array<teachingCardProps>;
    elemType?: string;
  }

const ClassGrid = (props: gridProps) => {
  return (
    <View>

    </View>
  )
}

export default ClassGrid