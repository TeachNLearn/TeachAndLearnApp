import { View, Text , TextInput , TouchableOpacity , StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionican from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Classes from '../Component/Classes';
import Requests from '../Component/Requests';
import UserClasses from '../Component/UserClasses';

const Tab = createMaterialTopTabNavigator();

const LearnCards = () => {
      const [searchText, setSearchText] = useState('');
      const navigation = useNavigation();
      const [activeSection, setActiveSection] = useState('Classes'); // Default active section

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleSearch = () => {
    // Perform search action with searchText
    console.log('Searching for:', searchText);
  };
  return (
    <View style={{ }} >

        <View 
        style=
        {{backgroundColor:'#FFF' , elevation: 16, 
         paddingBottom:10 , 
         shadowColor: '#000', // For iOS box shadow
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.2,
          shadowRadius: 2, 
           }}>
            <View style={{flexDirection:'row' , justifyContent:'space-around', marginTop:70 , marginBottom:30 ,}}>
               <Ionican name="arrow-back-sharp" size={20} color="#000" />
                <Text style={{color:'#000' , fontFamily:'Nunito' , fontSize:18 , fontWeight:'600' , letterSpacing:0.36}}>Learn Cards</Text>
                  <Ionican name="ellipsis-vertical-sharp" size={20} color="#000000" />
            </View>
            
         <View style={{flexDirection:'row' , alignItems:'center' , marginBottom:40 , justifyContent:'center'}}>

        
           <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchIconContainer} onPress={handleSearch}>
                  <FontAwesome  name="search" size={16} color="#000"/>
            </TouchableOpacity>
             <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#000"
              value={searchText}
              onChangeText={setSearchText}
              />
     
           </View>

             <View style={styles.searchBtnContainer}>
               <MaterialIcon name="arrow-right" size={24} color="#FFF" />
             </View>
   

        </View>

           <View style={{flexDirection:'row', justifyContent:'space-around' , alignItems:'center'}}> 
           {/* <TouchableOpacity onPress= {()=>navigation.navigate('')}>
                      <Text style= {styles.LearnClassTxt}>Classes</Text>
           </TouchableOpacity>
             
             <Text style= {styles.LearnClassTxt}>Requests</Text>
             <Text style= {styles.LearnClassTxt}>Users</Text> */}
              <TouchableOpacity
          style={[
           
            activeSection === 'Classes' && styles.activeSegment,
          ]}
          onPress={() => handleSectionChange('Classes')}
        >
          <Text style={styles.segmentText}>Classes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
         
            activeSection === 'Requests' && styles.activeSegment,
          ]}
          onPress={() => handleSectionChange('Requests')}
        >
          <Text style={styles.segmentText}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
           
            activeSection === 'Users' && styles.activeSegment,
          ]}
          onPress={() => handleSectionChange('Users')}
        >
          <Text style={styles.segmentText}>Users</Text>
        </TouchableOpacity>
           
           </View>
      </View>
      
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          {activeSection === 'Classes' && <Classes />}
          {activeSection === 'Requests' && <Requests />}
          {activeSection === 'Users' && <UserClasses />}
        </View>
      </ScrollView>
        
    
      
       
          
        {/* Render content based on activeSection */}
     
    
     


     
    </View>
  )
}

const styles = StyleSheet.create({
    scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FAFAFC',
    // height:2800 ,. 
   
  },
searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    // backgroundColor: 'rgba(255, 255, 255, 0.10)',
    // backgroundColor:'black',
    borderColor:'#E9E9E9',
    borderWidth:1 ,
    margin:20 ,
   
    width:'70%',
},

searchIconContainer:{
    marginLeft:10 ,
},

searchInput:{
//  marginRight:10 ,
},

searchBtnContainer:{
 justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000',
    borderRadius:8 ,
    width:50 ,
    height:50 ,
},

LearnClassTxt:{
  color:'#000', 
  fontFamily:'Nunito' ,
  fontSize:16 ,
  fontWeight:'600' ,

},


  activeSegment: {
   borderBottomColor:'#674FF1',
   borderBottomWidth:2 ,
   width:'20%' ,

   alignItems:'center'
   
  },
   segmentText: {
     color:'#000', 
  fontFamily:'Nunito' ,
  fontSize:16 ,
  fontWeight:'600' ,
  marginBottom:8 ,
  },
})

export default LearnCards ;