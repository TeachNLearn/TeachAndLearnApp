import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FONT_FAMILY} from '../../utils/globalContants';

interface ProfileComponentProps {
  navigation?: any;
  editIcon?: JSX.Element;
  showAcademicInfo?: boolean;
  showContactInfo?: boolean;
  showEdit?: boolean;
  localUser?: any;
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
    // height: 450,
    // height:'20%',
    flex: 1,
    flexDirection: 'column',
    padding: 15,
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
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',
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
    flexWrap: 'wrap',
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
    // borderWidth:1
  },
  textStyle: {
    color: '#000',
    fontSize: 15,
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    // fontWeight: '700',
    textDecorationLine: 'underline',
  },
};

const ContactComponent = (props: any) => {
  return (
    <View style={{flexDirection: 'column', marginTop: 5}}>
      <Text
        style={{
          color: 'gray',
          fontFamily: FONT_FAMILY.NUNITO_MEDIUM,
          fontSize: 15,
        }}>
        {props.heading}
      </Text>
      <Text
        style={{
          color: '#000',
          fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
          fontSize: 15,
        }}>
        {props.name}
      </Text>
    </View>
  );
};

const UserContactAndAcademicInfo: React.FC<ProfileComponentProps> = ({
  navigation,
  editIcon,
  showAcademicInfo = true,
  showContactInfo = true,
  showEdit = true,
  localUser,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {showContactInfo && (
          <View style={{borderRadius: 20, borderColor: 'grey'}}>
            <View style={styles.sectionContainer}>
              <Text style={styles.textStyle}>Contact Information</Text>
              {showEdit && editIcon && navigation && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    navigation.navigate('EditContactInfo');
                  }}>
                  <Text
                    style={{
                      color: 'rgb(180, 35, 24)',
                      fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                    }}>
                    Edit{' '}
                  </Text>
                  {editIcon}
                </TouchableOpacity>
              )}
            </View>

            {/* info container */}
            <View style={styles.infoContainer}>
              <ContactComponent heading="Username" name={localUser?.userName} />
              <ContactComponent heading="Email" name={localUser?.email} />
              <ContactComponent
                heading="Phone No."
                name={localUser?.phoneNumber}
              />
            </View>
          </View>
        )}

        {showAcademicInfo && (
          <View
            style={{
              borderRadius: 20,
              borderColor: 'grey',
              marginTop: 5,
            }}>
            <View style={styles.sectionContainer}>
              <Text style={styles.textStyle}>Acadmic Information</Text>
              {showEdit && editIcon && navigation && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    navigation.navigate('EditAcademicInfo');
                  }}>
                  <Text
                    style={{
                      color: 'rgb(180, 35, 24)',
                      fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                    }}>
                    Edit{' '}
                  </Text>
                  {editIcon}
                </TouchableOpacity>
              )}
            </View>

            {/* info container */}
            <View style={styles.infoContainer}>
              <ContactComponent
                heading="Course"
                name={localUser.enrolledProgramme}
              />

              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    color: 'gray',
                    fontFamily: FONT_FAMILY.NUNITO_MEDIUM,
                  }}>
                  Preffered language
                </Text>
                <View style={styles.tagsContainer}>
                  {localUser?.preferredLanguages.map((e, i) => {
                    return (
                      <>
                        <View key={i} style={styles.tag}>
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                            }}>
                            {e}
                          </Text>
                        </View>
                      </>
                    );
                  })}

                  {/* Add more tags as needed */}
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  flexWrap: 'wrap',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      color: 'gray',
                      fontFamily: FONT_FAMILY.NUNITO_MEDIUM,
                    }}>
                    Interested Subject
                  </Text>
                  <View style={styles.tagsContainer}>

                    {
                      localUser?.interestedSubjects?.map((e,i)=>{
                        return(
                          <>
                             <View style={styles.tag}>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                        }}>
                        {e}
                      </Text>
                    </View>
                          </>
                        )
                      })
                    }
                    
                    {/* Add more tags as needed */}
                  </View>
                </View>

                <View style={{flexDirection: 'column', marginRight: 15}}>
                  <Text
                    style={{
                      color: 'gray',
                      fontFamily: FONT_FAMILY.NUNITO_MEDIUM,
                    }}>
                    Strong Subject
                  </Text>
                  <View style={styles.tagsContainer}>

                    {
                      localUser?.strongSubjects?.map((e,i)=>{
                        return (
                          <>
                               <View style={styles.tag}>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                        }}>
                        {e}
                      </Text>
                    </View>
                          </>
                        )
                      })
                    }
                   
                  
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
