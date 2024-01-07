import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { FONT_FAMILY, SCREEN_HEIGHT } from '../../utils/globalContants';
import axios from 'axios';
import { BASE_URL, apiVersion } from '../../utils/apiRoutes';
import { getHeaders } from '../../utils/helperFunctions';
import { AuthContext } from '../../store/auth-context';
import LearnCardData from '../learnCardComponents/LearnCardData';


const SearchPageForHome = () => {

  const authCtx = useContext(AuthContext);

  const [searchText, setSearchText] = React.useState('xyz')
  const [showLearnCard, setShowLearnCard] = React.useState(null)
  const [showDropDown, setShowDropDown] = React.useState(false)

  function debounce(func:any, timeout:number){
    const thi:any = this
    let timer:any;
    return (...args:any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { console.log("applied"),func.apply(thi, args); }, timeout);
    };
  }

  const searchQuery = async()=>{
    try {
      await axios
      .post(
        `${BASE_URL}${apiVersion}/user/search`,
        {
          search: searchText,
        },
        {
          headers: getHeaders(authCtx?.token || ""),
        }
      )
      .then(({ data }) => {
        console.log(data);
        const classes = data.classes;
        const learnCards = data.learnCards;
        const users = data.users;
  

        console.log(classes,learnCards,users)
        setShowLearnCard(learnCards)
        // setSearchedUsers(users);
        // setSearchedLearnCards(learnCards);
        // setSearchedTeachCards(classes);
        // if (props.updateSearchFeedProps) {
        //   props.updateSearchFeedProps(query, users, learnCards, classes);
        // }
      })
      .catch((data) => {
        console.log(data);
      });
    
    } catch (error:any) {
      console.log('error occured ==> ',error.message)
    }
  }
  
  React.useEffect(() => {
    const processChanges = debounce(searchQuery,3000);
    processChanges()
  }, [searchText])



  return (
    <View style={{flex:1,borderWidth:1,borderColor:'#222',padding:20}}>
      <View style={{borderWidth:1,borderRadius:7,flexDirection:'row',alignItems:'center',paddingHorizontal:10}}>
      <Icon name="search1" size={18} />
        <TextInput
        placeholder='search...'
        value={searchText}
        onChangeText={(e)=>setSearchText(e)}
        />
      </View>

      {/* dropdown */}
     <View>
     <ScrollView contentContainerStyle={{borderWidth:1,borderRadius:7,height:SCREEN_HEIGHT/2.5,backgroundColor:'#fff',marginTop:10,padding:20}}>
          <View>
            <Text style={{fontSize:22,fontFamily:FONT_FAMILY.NUNITO_BOLD}}>Users</Text>
          </View>

          {/* other content */}
          <View style={{marginTop:10,flexDirection:'row',alignItems:'center',gap:10}}>
            <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU'}} style={{borderWidth:1,width:30,height:30,borderRadius:15}}/>
            <Text style={{fontFamily:FONT_FAMILY.NUNITO_MEDIUM}}>Garvit Jain</Text>
          </View>
        </ScrollView>

        {/* down content */}

     <ScrollView style={{borderWidth:1,height:SCREEN_HEIGHT,marginTop:10,backgroundColor:'red',position:'absolute',width:'100%'}}>
     
            {  showLearnCard?.map((e: any, i: number) => {
                return <LearnCardData {...e} key={i} isTeachCard={false} />;
              })
            }
     </ScrollView>
     </View>
      
    </View>
  )
}

export default SearchPageForHome

const styles = StyleSheet.create({})