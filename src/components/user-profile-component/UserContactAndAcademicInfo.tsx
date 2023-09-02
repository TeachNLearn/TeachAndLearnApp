import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ProfileComponentProps {
  navigation: any;
  editIcon : JSX.Element // You can update this to the appropriate navigation type
}

interface Styles {
  container: ViewStyle;
  sectionContainer: ViewStyle;
  editButton: ViewStyle;
  infoContainer: ViewStyle;
  tag: ViewStyle;
  tagsContainer: ViewStyle;
  textStyle: TextStyle;
}

const styles: Styles = {
  container: {
    backgroundColor: '#D8EEFE',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 450,
    flex: 1,
    flexDirection: 'column',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 40,
    marginBottom: 20,
  },
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  tag: {
    backgroundColor: '#D8EEFE',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  textStyle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Nunito',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
};

const UserContactAndAcademicInfo: React.FC<ProfileComponentProps> = ({ navigation,editIcon }) => {
  return (
    <View style={styles.container}>
      {/* Contact Information */}
      <View>
        <View style={styles.sectionContainer}>
          <Text style={styles.textStyle}>Contact Information</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              navigation.navigate('EditContactInfo');
            }}
          >
            <Text>Edit{' '}</Text>
            {editIcon}
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: 'gray' }}>UserName</Text>
            <Text style={{ color: '#000', fontWeight: '700' }}>garv_it</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: 'gray' }}>Email</Text>
            <Text style={{ color: '#000', fontWeight: '700' }}>
              garv@123gmail.com
            </Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: 'gray' }}>Phone No.</Text>
            <Text style={{ color: '#000', fontWeight: '700' }}>908978603</Text>
          </View>
        </View>
      </View>

      {/* Academic Information */}
      
  <View>
  <View style={styles.sectionContainer}>
    <Text style={styles.textStyle}>Academic Information</Text>
    <TouchableOpacity
      style={styles.editButton}
      onPress={() => {
        navigation.navigate('EditAcademicInfo');
      }}
    >
      <Text>Edit{" "}</Text>
      {editIcon}
    </TouchableOpacity>
  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 42 }}>
        <Text style={{ color: 'gray' }}>Course</Text>
        <Text style={{ color: '#000', fontWeight: '700' }}>Btech ECE</Text>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: 'gray' }}>Strong Subject</Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={{ color: '#000', fontWeight: '700' }}>Tag1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ color: '#000', fontWeight: '700' }}>Tag2</Text>
          </View>
          {/* Add more tags as needed */}
        </View>
      </View>
    </View>
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: 'gray' }}>Interested Subject</Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={{ color: '#000', fontWeight: '700' }}>Tag1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ color: '#000', fontWeight: '700' }}>Tag2</Text>
          </View>
          {/* Add more tags as needed */}
        </View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' , marginBottom: 20}}>
        <Text style={{ color: 'gray' }}>Preferred Language</Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={{ color: '#000', fontWeight: '700' }}>Tag1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ color: '#000', fontWeight: '700' }}>Tag2</Text>
          </View>
          {/* Add more tags as needed */}
        </View>
      </View>
    </View>
  </View>
</View>
    </View>
  );
};

export default UserContactAndAcademicInfo;
