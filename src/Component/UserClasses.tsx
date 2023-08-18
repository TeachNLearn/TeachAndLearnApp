import { View, Text, Image } from 'react-native'; // Import the Image component
import React from 'react';

const UserClasses = () => {
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          margin: 40,
          backgroundColor: '#FFF',
          height: 80,
          width:300,
          alignItems: 'center',
          borderRadius:8,
          elevation:4 ,
         
        }}
      >
        {/* Image */}
        <Image
          source={require('../assets/Images/userProfilePic.png')} // Replace with the actual path to your image
          style={{
            width: 50,
            height: 50,
            borderRadius: 40,
            marginRight: 10,
            marginLeft: 10,
          }}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Nunito',
              fontSize: 22,
              fontWeight: '700',
            }}
          >
            Ethan Alexander
          </Text>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Nunito',
              fontSize: 14,
              fontWeight: '400',
            }}
          >
            @ethanalex
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserClasses;
