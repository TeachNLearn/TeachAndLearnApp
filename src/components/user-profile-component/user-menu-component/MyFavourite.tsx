import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import UserImg from '../../../assets/Images/cardImg.png';
import CardHeader from '../../general-components/CardHeader';

const MyFavourite: React.FC = () => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFF', flex: 1 }}>
      <CardHeader
        title='My Favourite'
        ShowMenuIcon={false}
        onBackPress={() => {}}
        onMenuPress={() => {}}
      />
      <View style={{ flexDirection: 'column', borderWidth: 1.5, borderColor: '#D3D3D3', width: 350, height: 100, margin: 20, padding: 40, backgroundColor: '#FFF', justifyContent: 'center', borderRadius: 10, marginTop: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={UserImg} style={{ height: 48, width: 48, marginRight: 10 }} />
          <Text style={{ color: '#000', fontFamily: 'Nunito', fontSize: 22, fontWeight: '700', letterSpacing: 0.44, marginRight: 10 }}>garvit</Text>
          <Text style={{ color: '#000', fontFamily: 'Nunito', fontSize: 18, fontWeight: '400', letterSpacing: 0.28 }}>garv_it</Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: '#000', fontFamily: 'Nunito', fontSize: 14, fontWeight: '400', maxWidth: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MyFavourite;

const styles = StyleSheet.create({

});
