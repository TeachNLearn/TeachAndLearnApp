import { View, Text , StyleSheet , TextInput , TouchableOpacity ,ScrollView } from 'react-native' ;
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconS from 'react-native-vector-icons/FontAwesome5';
import IconSe from 'react-native-vector-icons/MaterialCommunityIcons';


const Home = () => {

     const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Perform search action with searchText
    console.log('Searching for:', searchText);
  };
  return (
    <View style={styles.HomeParentContainer}>
        <View style={styles.HomeTxtContainer}>
           <Text style={styles.txtOne}>Hello Rahul 👋</Text>
           <Text style={styles.txtTwo}>What do you want to learn today?</Text>
        </View>


         <View style={{flexDirection:'row' , alignItems:'center' , marginBottom:40 ,}}>

        
         <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSearch}>
        <Icon name="search" size={24} color="white" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={searchText}
        onChangeText={setSearchText}
      />
     
        </View>

       <View style={styles.searchBtnContainer}>
       <IconSe name="arrow-top-right" size={24} color="#000" />
       </View>
   

     </View>


     <View style={styles.SecondParentContainer}>
      <ScrollView style={{marginBottom:80}}>

      
       <View style={styles.txtOneParentContainer}>
        <Text style={styles.txtOneSecondContainer}>Popular Courses</Text>
        <Text style={styles.txtTwoSecondContainer}>See all <IconS name="arrow-right" size={14} color="#000"/> </Text>
       
       </View>

       <View style={styles.LearningcardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.Learningcards}>
            <View style={styles.cardTxtContainer}>
            <Text style={styles.cardHead}>Web Development</Text>
            <Text style={styles.cardDesc}>Get started in Web Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.ImgAndNameContainer}>
            <Text style={styles.ImgInCard}><IconS name="user-circle" size={14} color="orange"/></Text>
            <Text style={styles.NameInCard}>Garvit Varshney</Text>
            </View>

            <View style={styles.InterestedStudentConatiner}>
            <Text style={styles.Interested}><IconS name="bolt" size={14} color="#FFD465"/>  22 interested</Text>
            <Text style={styles.coins}>icon 220 coins</Text>
            </View>

         
        </View>
        <View style={styles.Learningcards}>
           <View style={styles.cardTxtContainer}>
            <Text style={styles.cardHead}>App Development</Text>
            <Text style={styles.cardDesc}>Get started in App Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.ImgAndNameContainer}>
            <Text style={styles.ImgInCard}><IconS name="user-circle" size={14} color="orange"/></Text>
            <Text style={styles.NameInCard}>Priyanshu Joshi</Text>
            </View>

            <View style={styles.InterestedStudentConatiner}>
            <Text style={styles.Interested}><IconS name="bolt" size={14} color="#FFD465"/> 22 interested</Text>
            <Text style={styles.coins}>icon 220 coins</Text>
            </View>

         
        </View>
        <View style={styles.Learningcards}>
           <View style={styles.cardTxtContainer}>
            <Text style={styles.cardHead}>App Development</Text>
            <Text style={styles.cardDesc}>Get started in App Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.ImgAndNameContainer}>
            <Text style={styles.ImgInCard}><IconS name="user-circle" size={14} color="orange"/></Text>
            <Text style={styles.NameInCard}>Priyanshu Joshi</Text>
            </View>

            <View style={styles.InterestedStudentConatiner}>
            <Text style={styles.Interested}><IconS name="bolt" size={14} color="#FFD465"/> 22 interested</Text>
            <Text style={styles.coins}>icon 220 coins</Text>
            </View>
        </View>
        {/* Add more Learningcards here */}
      </ScrollView >
       </View>

        <View style={styles.UpcomingtxtContainer}>
        <Text style={styles.txtOneSecondContainer}>Upcoming Classes</Text>
        <Text style={styles.txtTwoSecondContainer}>See all <IconS name="arrow-right" size={14} color="#000"/> </Text>
       
       </View>


        <View style={styles.UpcomingcardsParentContainer}> 
       
       <View style={styles.Upcomingcards}>
           <View style={styles.cardTxtContainer}>
            <View style={{backgroundColor:'#094067' , width:'100%' , padding:10 , alignItems:'center' , justifyContent:'center' , marginBottom:20 ,borderRadius:30 , }}>
                <Text style={styles.UpcomingCardDate}><IconS name="calendar-week" size={14} color="#FFF"/>  10-8-2023</Text>
            </View>
            
            <Text style={styles.UpComingCardDesc}>Get started in App Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.UpcomingCardTimeAndNameContainer}>
              <Text style={styles.UpcomingCardName}><IconS name="user-circle" size={14} color="#094067"/> Priyanshu Joshi</Text>
            <Text style={styles.UpcomingCardTime}>10 pm - 11 pm</Text>
            
            </View>

            
        </View>

         <View style={styles.Upcomingcards}>
           <View style={styles.cardTxtContainer}>
             <View style={{backgroundColor:'#094067' , width:'100%' , padding:10 , alignItems:'center' , justifyContent:'center' , marginBottom:20 ,borderRadius:30 , }}>
                <Text style={styles.UpcomingCardDate}><IconS name="calendar-week" size={14} color="#FFF"/>  10-8-2023</Text>
            </View>
            <Text style={styles.UpComingCardDesc}>Get started in App Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.UpcomingCardTimeAndNameContainer}>
              <Text style={styles.UpcomingCardName}><IconS name="user-circle" size={14} color="#094067"/> Garvit</Text>
            <Text style={styles.UpcomingCardTime}>10 pm - 11 pm</Text>
            
            </View>

            
        </View>

         <View style={styles.Upcomingcards}>
           <View style={styles.cardTxtContainer}>
            <View style={{backgroundColor:'#094067' , width:'100%' , padding:10 , alignItems:'center' , justifyContent:'center' , marginBottom:20 ,borderRadius:30 , }}>
                <Text style={styles.UpcomingCardDate}><IconS name="calendar-week" size={14} color="#FFF"/>  10-8-2023</Text>
            </View>
            <Text style={styles.UpComingCardDesc}>Get started in App Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.UpcomingCardTimeAndNameContainer}>
              <Text style={styles.UpcomingCardName}><IconS name="user-circle" size={14} color="#094067"/> XYZ</Text>
            <Text style={styles.UpcomingCardTime}>10 pm - 11 pm</Text>
            
            </View>

            
        </View>


         </View>


</ScrollView>
     </View>
    
      
    </View>
  )
}

const styles = StyleSheet.create({
    HomeParentContainer:{
        flex:1 ,
     backgroundColor:'#094067',

    },
HomeTxtContainer:{
    flexDirection:'column',
    // alignItems:'center',
    margin:25 ,
},

txtOne:{
    fontSize:16 ,
fontWeight:'600',
color:'#FFF',
marginBottom:10 ,
fontFamily:'Nunito',
marginTop:10                                                           
},
txtTwo:{
fontSize:28 ,
fontWeight:'600',
color:'#FFF',
fontFamily:'Nunito',
},

 searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    margin:20 ,
   
    width:'70%',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'white',
    
  },
  submitButton: {
    padding: 10,
  },

  searchBtnContainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFF',
    borderRadius:8 ,
    width:50 ,
    height:50 ,

  },

  SecondParentContainer:{
    flex:1 ,
    backgroundColor:'#FFF' ,
    borderTopLeftRadius:50 ,
    borderTopRightRadius:50 ,
    
  } ,

  txtOneParentContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:20 ,
   
    
  },

  UpcomingtxtContainer:{
     flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:10 ,
  },

  txtOneSecondContainer:{
    margin:10 ,
    fontSize:24 ,
    color:'#000',
    fontWeight:'700',

  },

  txtTwoSecondContainer:{
    margin:10 ,
     fontSize:16 ,
    color:'#000',
    fontWeight:'600',

  },
 LearningcardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Learningcards: {
    width: 260,
    height: 200,
    backgroundColor: '#094067',
    borderRadius: 16,
    marginTop: 30,
    marginRight: 0, // Space between cards
    marginLeft: 40, // Space between cards
  },

  cardHead :{
color:'#FFF',
fontSize:10 ,
fontWeight:'500',
textTransform:'uppercase',
letterSpacing:0.2 ,
// margin:10 ,
marginTop:20 ,
marginLeft:10 ,
fontFamily:'Nunito',
  },

  cardDesc:{
 color:'#FFF',
fontSize:18 ,
fontWeight:'700',
padding:0 ,
margin:10 ,
fontFamily:'Nunito',
  },

  cardTxtContainer:{
    marginLeft:10 ,
  },

  ImgAndNameContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:15 ,
  },

  ImgInCard:{
    color:'#FFF',
    marginLeft:5 ,
    marginRight:5 ,
  },

  NameInCard:{
    color:'#FFF',
    fontSize:12 ,
    fontWeight:'400' ,
  } ,

  InterestedStudentConatiner:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:15 ,
  },

  Interested:{
  color:'#FFF',
  fontSize:12 ,
  fontWeight:'500' ,
  },

  coins:{
  color:'#FFF',
  fontSize:12 ,
  fontWeight:'500' ,
  },

  Upcomingcards:{
    alignItems:'center',
    justifyContent:'center',
    width: 320,
    height: 190,
    backgroundColor: '#D8EEFE',
    borderRadius: 16,
    marginTop: 13,
    marginBottom:10 ,
    paddingRight:30 ,
    paddingTop:10 ,
   
  },

  UpcomingcardsParentContainer:{
    flexDirection:"column",
    alignItems:'center',
    justifyContent:'center',
  },

  UpcomingCardTimeAndNameContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:20 ,
  },

  UpComingCardDesc:{
    color:'#000',
    fontWeight:'700',
    fontSize:18 ,
    fontFamily:'Nunito',
  },
 
  UpcomingCardDate:{
    
     color:'#FFF' ,
     fontWeight:'600',
     fontSize:16 ,
     fontFamily:'Nunito',
     

  },

  UpcomingCardName:{
    marginRight:20 ,
    // fontSize:15 ,
    color:'#000',
    fontWeight:'500',
    fontFamily:'Nunito',
    
  },
  UpcomingCardTime:{
    marginLeft:20 ,
    //  fontSize:10 ,
    color:'#000',
    fontWeight:'500',
    fontFamily:'Nunito',

  }
  


  
})

export default Home