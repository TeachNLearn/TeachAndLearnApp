import React from 'react'
import { Text } from 'react-native';
import { FlatList, View } from 'react-native';

interface arrChipProps {
    listArr: string[];
    name: string;
    updateFields: any;
  }

interface chipProps {
    chipText: string
}

const Chip = (props: any) => {
    console.log(props);
    
    return (
        <View>
            <Text>{props}</Text>
        </View>
    )
} 

const ArrChip = (props: arrChipProps) => {
  return (
    <View>
      <FlatList
        data={props.listArr}
        renderItem={Chip}
      />
    </View>
  )
}

export default ArrChip
