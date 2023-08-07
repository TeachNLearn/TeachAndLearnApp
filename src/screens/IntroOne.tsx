import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const IntroOne: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/Images/IntroImg.png')} style={styles.introImg} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Teach , Learn and Grow</Text>
        <Text style={styles.headingpart}>Together !</Text>
        <View style={styles.paraContainer}>
          <Text style={styles.para}>This app aims to bring the students from all across the world together and give them a platform where they can teach other students as well as learn from them to aid their academics.</Text>
        </View>
        <View style={styles.sliderLogoContainer}>
          <Text style={styles.sliderLogoOne}></Text>
          <Text style={styles.sliderLogoTwo} onPress = {() => navigation.navigate('IntroTwo')}></Text>
          <Text style={styles.sliderLogoThree} onPress = {() => navigation.navigate('IntroThree')}></Text>
        </View>

        <View style={styles.btnContainer}>
          <Text style={styles.btntxt}>Skip</Text>
          <TouchableOpacity style={styles.btnTwo}  onPress = {() => navigation.navigate('IntroTwo')}>
            <Text style={styles.btntxtTwo}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#D8CEFF',
  },
  introImg: {
    width: '100%',
    height: 350,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginTop: 30,
    padding: 5,
  },
  headingpart: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginBottom: 30,
  },
  paraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  para: {
    fontWeight: '400',
    fontSize: 15,
    color: '#565266',
    margin: 20,
  },
  sliderLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  sliderLogoOne: {
    height: 10,
    width: 48,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#08222E',
  },
  sliderLogoTwo: {
    height: 10,
    width: 30,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#707997',
  },
  sliderLogoThree: {
    height: 10,
    margin: 5,
    width: 30,
    backgroundColor: '#707997',
    borderRadius: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  btnTwo: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: 100,
    marginLeft: 80,
    borderRadius: 15,
  },
  btntxtTwo: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  btntxt: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 80,
  },
});

export default IntroOne;
