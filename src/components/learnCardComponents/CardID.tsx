import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Alert} from 'react-native';
import CopySvg from '../svgComponents/CopySvg';

interface cardIdProps {
  id: string;
}

const CardID = (props: cardIdProps) => {
  const copyToClipboard = () => {
    Clipboard.setString(props.id);
    Alert.alert('Copied', 'Card ID copied to clipboard');
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#094067',
        padding: 16,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6,
        borderRadius: 30,
      }}
      onPress={copyToClipboard}>
      <CopySvg />
      <Text
        style={{
          color: '#FFF',
          fontWeight: '700',
          fontSize: 14,
          letterSpacing: 1,
        }}>
        Card ID
      </Text>
    </TouchableOpacity>
  );
};

export default CardID;
