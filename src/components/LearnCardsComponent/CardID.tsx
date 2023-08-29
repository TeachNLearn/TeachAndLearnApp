import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionican from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';

import { Alert } from 'react-native';

interface cardIdProps {
  id: string;
}

const CardID = (props: cardIdProps) => {
   const copyToClipboard = () => {
    Clipboard.setString(props.id);
       Alert.alert('Copied', 'Card ID copied to clipboard');
  };
  return (
    <View
      style={{
        backgroundColor: '#094067',
        padding: 16,
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom:20 ,
        
      }}>
         

      <Text
        style={{
          color: '#FFF',
          fontWeight: '700',
          fontSize: 14,
          letterSpacing: 1,
        
          
        }}>
          <TouchableOpacity onPress={copyToClipboard}>
             <Ionican name='copy-outline' size={24} style={{alignItems:'center' , marginTop:10 ,  color: '#FFF',
          fontWeight: '700',
          }} />
          </TouchableOpacity>
        Card ID :-{props.id}
        
      </Text>
      
    </View>
  );
};

export default CardID;
