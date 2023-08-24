import { View, Text, StyleSheet, ScrollView, Image, Switch , TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useState } from 'react';
// import Fontawesome from 'react-native-vector-icons/FontAwesome5';
import Ionican from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
interface ImageInfo {
  uri: string;
  base64: string;
}
const Userprofile: React.FC = () => {
  const [isLearnMode, setIsLearnMode] = useState<boolean>(true);
 const defaultImageSource = require('../../assets/Images/userProfilePic.png');
  const [profileImage, setProfileImage] = useState<ImageInfo>({
    uri: defaultImageSource.uri,
    base64: '',
  });

  const toggleMode = () => {
    setIsLearnMode(!isLearnMode);
  };

   const handleImagePicker = async (sourceType: 'gallery' | 'camera') => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        includeBase64: true,
        mediaType: 'photo',
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        compressImageQuality: 0.7,
        includeExif: true,
        // cropperToolbarTitle: 'Crop Image',
        cropperToolbarColor: '#094067',
        cropperToolbarWidgetColor: '#FFF',
        cropperActiveWidgetColor: '#094067',
        cropperStatusBarColor: '#094067',
        cropperToolbarTitle: 'Edit Photo',
        forceJpg: true,
        compressVideoPreset: 'MediumQuality',
        writeTempFile: true,
        useFrontCamera: sourceType === 'camera',
        // cropping: true,
        // includeBase64: true,
      });

      console.log(image);
      
      setProfileImage({
        uri: image.path,
        base64: image.data,
      });
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

 

 
  
  const switchWidth = 60; // Customize the width of the switch
  const switchHeight = 30;
    const thumbSize = 10;
  return (
    <ScrollView style={{}}>
    <View style={styles.userProfileParentContainer}>
    
     
      <View style={{flexDirection:'row' , justifyContent:'space-between' , width:'100%' , marginBottom:30 ,}}>
           <Ionican name="arrow-back-sharp" size={20} color="#000" />
         <Text style={styles.userUniqueName}>@ethanatex</Text>
          <Ionican name="ellipsis-vertical-sharp" size={20} color="#000000" />
      </View>
     
    <TouchableWithoutFeedback onPress={() => handleImagePicker('gallery')}>
  <View>
    <Image
              source={profileImage.uri ? { uri: profileImage.uri } : defaultImageSource}
              style={styles.UserImg}
              resizeMode="contain"
            />
  </View>
</TouchableWithoutFeedback>
       
       <Text style={styles.userName}> Ethan Alexander</Text>
       <Text style={styles.userEduInfo}>B. Tech Artificial Intelligence student and part-time Web Developer</Text>
      <View style={styles.ModeOfuserConainer}>
      <Text style={isLearnMode ? styles.LearnModeTextActive : styles.LearnModeText}>Learn Mode</Text>
      <Switch
        value={isLearnMode}
        onValueChange={toggleMode}
        trackColor={{false: '#FFF', true: '#FFF'}}
        thumbColor={isLearnMode ? '#094067' : '#094067'}
        thumbStyle={{
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 4,
        }}
      
        style={{
          transform: [{ scaleX: switchWidth / 50 }, { scaleY: switchHeight / 30 }],
        }}
      />
      <Text style={!isLearnMode ? styles.TeachModeTextActive : styles.TeachModeText}>Teach Mode</Text>
    </View>

    
       
    
   
    </View>
    <View style={{backgroundColor:'#094067' , borderTopLeftRadius:50 , borderTopRightRadius:50}}>
     <Text style={{color:'#FFF' , fontSize:22 , fontWeight:'600' , letterSpacing:0.44  , margin:25 ,    fontFamily:'Nunito',}}>My Information</Text>
      <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'space-evenly', marginBottom:20  , }}>
        <View style={{flexDirection:'column' , alignItems:'center'}}>
          <Text style={styles.MyInfotxthead}>Tought</Text>
          <Text style={styles.MyInfotxtNum}>24</Text>
        </View>
        <View style={{flexDirection:'column' , alignItems:'center'}}>
          <Text  style={styles.MyInfotxthead}>Attended</Text>
          <Text style={styles.MyInfotxtNum}>24</Text>
        </View>
        <View style={{flexDirection:'column' , alignItems:'center'}}>
          <Text  style={styles.MyInfotxthead}>Rating</Text>
          <Text style={styles.MyInfotxtNum}>24</Text>
        </View>
      </View>
     
     
      <View style={{backgroundColor:'#D8EEFE' ,borderTopLeftRadius:50 , borderTopRightRadius:50, marginBottom:150 ,height:"100%"}}>
     <Text style={{color:"#000" , fontFamily:'Nunito' , fontWeight:'600' , letterSpacing:0.44, margin:40 ,fontSize:22 ,}}>General</Text>
     <View style={{ }}>
      <View style={{ flexDirection:'row' , borderBottomColor:'#000' , borderBottomWidth:1 , marginLeft:30 ,  marginRight:30 , marginTop:20 , marginBottom:30,  }}>
       <Ionican name="settings-outline" size={24} color="#000000" />
        <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems:'center' , width:'90%' , marginBottom:10 ,}}>
        <Text style={styles.GeneralMenu}>Settings</Text>
           <Ionican name="chevron-forward-outline" size={20} color="#000000" />
        </View>
      

      </View>
      <View style={{ flexDirection:'row' , borderBottomColor:'#000' , borderBottomWidth:1 , marginLeft:30 ,  marginRight:30 , marginTop:20 , marginBottom:30 ,alignItems:'center' }}>
        <Ionican name="card-outline" size={24} color="#000000" />
       <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems:'center' , width:'90%', marginBottom:10}}>
        <Text style={styles.GeneralMenu}>Payments</Text>
         <Ionican name="chevron-forward-outline" size={20} color="#000000" />
        </View>
      </View>
      <View style={{ flexDirection:'row' , borderBottomColor:'#000' , borderBottomWidth:1 , marginLeft:30 ,  marginRight:30 , marginTop:20 , marginBottom:30  , alignItems:'center'}}>
      <Ionican name="paper-plane-outline" size={24} color="#000000" />
      <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems:'center' , width:'90%', marginBottom:10}}>
        <Text style={styles.GeneralMenu}>Invite Friends</Text>
         <Ionican name="chevron-forward-outline" size={20} color="#000000" />
        </View>
      </View>
      <View style={{ flexDirection:'row' , borderBottomColor:'#000' , borderBottomWidth:1 , marginLeft:30 ,  marginRight:30 , marginTop:20 , marginBottom:30,alignItems:'center' }}>
        <Text>Icon</Text>
        <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems:'center' , width:'90%', marginBottom:10}}>
        <Text style={styles.GeneralMenu}>Invite Friends</Text>
         <Ionican name="chevron-forward-outline" size={20} color="#000000" />
        </View>
      </View>
     </View>
    </View>
   
    </View>

     </ScrollView>
  
  )
}

const styles = StyleSheet.create({
userProfileParentContainer:{
flex:1,
flexDirection:'column',
alignItems:'center',
justifyContent:'center',

margin:60 ,

},

userName:{
color:'#000',
fontFamily:'Nunito',
fontSize:24 ,
fontWeight:'700',
letterSpacing:0.40 ,
margin:20 ,
},

UserImg:{
width:97 ,
height:97 ,
},

userUniqueName:{
fontSize:18,
fontWeight:'600',
letterSpacing:0.36 ,
fontFamily:'Nunito',
color:'#000',
marginBottom:20 ,
 
},

userEduInfo:{
  color:'#697586',
  textAlign:'center',
  fontFamily:'Nunito',
  fontSize:14 ,
  fontWeight:'400',
  letterSpacing:0.2,
  width:"90%",
 

},

ModeOfuserConainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor:'#094067',
  borderRadius:60 ,
  margin:20 ,
  padding:20 ,
  width:'120%',

},

LearnModeText:{
  color:'#FFF',
  fontWeight:'600',
  fontSize:16 ,
  
},

TeachModeText:{
    color:'#FFF',
  fontWeight:'600',
  fontSize:16 ,
},

LearnModeTextActive:{
color:'#C2B9F9'
},

TeachModeTextActive:{
 color:'#C2B9F9'
},

MyInfotxthead:{
    color:'rgba(255, 255, 255, 0.90)',
    fontSize:12 ,
    fontWeight:'400',
    letterSpacing:0.24 ,
    fontFamily:'Nunito',
    
},

MyInfotxtNum:{
color:'#FFF',
fontSize:26 ,
fontWeight:'700' ,
letterSpacing:0.52 ,
fontFamily:'Nunito'
},

GeneralMenu:{
  color:'#000' ,
  fontFamily:'Nunito' ,
  fontSize:18 ,
  fontWeight:'500' ,
  marginLeft:10 ,

}
})

export default Userprofile