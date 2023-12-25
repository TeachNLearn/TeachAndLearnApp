import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IDDC {
  text: string;
  onPress:()=>void;
  key:number,
  heading:string
}

const DropDownComponent: React.FC<IDDC> = props => {

  return (
    
      <Pressable
        onPress={props?.onPress}
        key={props.key}
        style={{
          borderWidth: 1,
          height: 35,
          borderRadius: 10,
          width: '30%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          
        }}>
        <Text style={{fontSize:11}}>{props?.text.length > 0?props.text:props.heading}</Text>
        <Icon name="keyboard-arrow-down" size={20} />
      </Pressable>

    
    
  );
};

export default DropDownComponent;

const styles = StyleSheet.create({});
