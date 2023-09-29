import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ProfileComponentProps {
  navigation?: any;
  editIcon?: JSX.Element;
  showAcademicInfo?: boolean;
  showContactInfo?: boolean;
  showEdit?:boolean
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
    padding:15,
    
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10,
  },
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth:1,
    borderRadius:20,
    borderColor:'grey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    // paddingVertical: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flexWrap:'wrap'
  },
  tag: {
    backgroundColor: '#D8EEFE',
    borderRadius: 10,
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textStyle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Nunito',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
};

const UserContactAndAcademicInfo: React.FC<ProfileComponentProps> = ({
  navigation,
  editIcon,
  showAcademicInfo = true,
  showContactInfo = true,
  showEdit = true,
}) => {
  return (
    <View style={styles.container}>
     <ScrollView showsVerticalScrollIndicator={false}>
     {showContactInfo && (
        <View style={{borderWidth:1,borderRadius:20,borderColor:'grey'}}>
          <View style={styles.sectionContainer}>
            <Text style={styles.textStyle}>Contact Information</Text>
              {showEdit && editIcon && navigation && (
                      <TouchableOpacity
                       style={styles.editButton}
                       onPress={() => {
                       navigation.navigate('EditContactInfo');
                       }}
                       >
              
              <Text style={{color:'rgb(180, 35, 24)'}}>Edit{' '}</Text>
              {editIcon}
              </TouchableOpacity>
                )}
          
          </View>

          {/* info container */}
          <View style={styles.infoContainer}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: 'gray' }}>UserName</Text>
              <Text style={{ color: '#000', fontWeight: '700' }}>garv_it</Text>
            </View>
            <View style={{ flexDirection: 'column'}}>
              <Text style={{ color: 'gray' }}>Email</Text>
              <Text style={{ color: '#000', fontWeight: '700' }}>
                garv@123gmail.com
              </Text>
            </View>
            <View style={{ flexDirection: 'column',marginTop:25}}>
              <Text style={{ color: 'gray' }}>Phone No.</Text>
              <Text style={{ color: '#000', fontWeight: '700' }}>908978603</Text>
            </View>
          </View>
        </View>
      )}

{showAcademicInfo && (
        <View style={{borderWidth:1,borderRadius:20,borderColor:'grey',marginTop:5}}>
          <View style={styles.sectionContainer}>
            <Text style={styles.textStyle}>Acadmic Information</Text>
            {showEdit &&  editIcon && navigation &&(
             <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                navigation.navigate('EditAcademicInfo');
              }}
            >
              <Text style={{color:'rgb(180, 35, 24)'}}>Edit{' '}</Text>
              {editIcon}
            </TouchableOpacity>
            )}
          
          </View>

          {/* info container */}
          <View style={styles.infoContainer}>

            <View style={{ flexDirection: 'column',justifyContent:'space-between' }}>
                <Text style={{ color: 'gray' }}>Course</Text>
                <Text style={{ color: '#000', fontWeight: '700' }}>Btech ECE</Text>
            </View>


            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: 'gray' }}>Preffered language</Text>
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


        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',flexWrap:'wrap'}}>
                <View style= {{ flexDirection: 'column'}}>
                    <Text style={{ color: 'gray' }}>Interested Subject</Text>
                <View style={styles.tagsContainer}>
                  <View style={styles.tag}>
                    <Text style={{ color: '#000', fontWeight: '700' }}>Tag1</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={{ color: '#000', fontWeight: '700' }}>Tag2</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={{ color: '#000', fontWeight: '700' }}>Tag2</Text>
                  </View>
                  {/* Add more tags as needed */}
                </View>
               </View>

            <View style={{ flexDirection: 'column' ,marginRight:15}}>
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

          
          </View>
        </View>
      )}

     </ScrollView>

    </View>
  );
};

export default UserContactAndAcademicInfo;
