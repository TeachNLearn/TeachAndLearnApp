import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import ImagePickerButton from '../../components/user-profile-component/UserImagePicker';
import UserProfileHeader from '../../components/user-profile-component/UserProfileHeader';
import UserNameAndTagline from '../../components/user-profile-component/UserNameAndTagline';
import UserStats from '../../components/user-profile-component/UserStats';
import UserContactAndAcademicInfo from '../../components/user-profile-component/UserContactAndAcademicInfo';
import UserImg from '../../assets/Images/userProfilePic.png';
import Button from '../../components/general-components/button';

const OtherUser: React.FC = () => {
  return (
    <ScrollView>

  
    <View style={{flexDirection:'column' , alignItems:'center' , justifyContent:'center' , flex:1 }}> 
        <View style={{flexDirection:'row' , alignItems:'center' ,  marginLeft:25 , marginRight:25 , marginTop:45 ,}}>
           <UserProfileHeader title="@ethanatex" onBackPress={() => {}} onMenuPress={() => {}} />
        </View>
        <View style={{flexDirection:'column' , alignItems:'center' , justifyContent:'center' , marginBottom:30 , width:350 }}>
           <View>
           <Image source={UserImg} />
           </View>
 
             <UserNameAndTagline
              name="Ethan Alexander"
              educationInfo="B. Tech Artificial Intelligence student and part-time Web Developer"
              />
   
         
        </View>
    
      </View>
      <View>
       
     
    

    <View style={{backgroundColor:'#094067' , width:'100%' , borderTopLeftRadius:50 , borderTopRightRadius:50}}>
        <Text style={styles.headerText}>Stats as Teacher</Text>
    <View style={styles.statsContainer}>
    
    <View style={{flexDirection:'row' , flex:1 , justifyContent:'space-evenly' ,width:'100%'}}>
      <UserStats label="Taught" value={24} />
        <UserStats label="Attended" value={24} />
        <UserStats label="Rating" value={24} />
    </View>
     </View>
      <Text style={styles.headerText}>Stats as Student</Text>
      <Text style={{ paddingHorizontal:60 , paddingVertical:10 , marginBottom:10 ,}}>
         <UserStats label="Attended" value={2}  />
      </Text>
    
       
        
             
        
      
  

      <View style={{width:'100%' ,height:350}}>
         <UserContactAndAcademicInfo  showEdit={false} showAcademicInfo showContactInfo={false} />
      </View>
      </View>
     
    </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.44,
    margin: 25,
    fontFamily: 'Nunito',
  },
  statsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    width:'100%'
  },
});

export default OtherUser;
