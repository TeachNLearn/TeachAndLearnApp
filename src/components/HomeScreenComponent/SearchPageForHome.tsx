import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { FONT_FAMILY, SCREEN_HEIGHT } from '../../utils/globalContants';
import axios from 'axios';
import { BASE_URL, apiVersion } from '../../utils/apiRoutes';
import { getHeaders } from '../../utils/helperFunctions';
import { AuthContext } from '../../store/auth-context';
import LearnCardData from '../learnCardComponents/LearnCardData';
import TeachCards from '../../screens/extraScreens/cardsScreen/TeachCards';


const SearchPageForHome = () => {

  const authCtx = useContext(AuthContext);

  const [searchText, setSearchText] = React.useState('xyz')
  const [showLearnCard, setShowLearnCard] = React.useState([])
  const [showDropDown, setShowDropDown] = React.useState(false)
  const [users, setUsers] = React.useState([])
  const [classes, setClasses] = React.useState([])

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
        // console.log(data);
        const classes = data.classes;
        const learnCards = data.learnCards;
        const users = data.users;
  

        console.log(classes.length,learnCards.length,users.length)
        setShowLearnCard(learnCards)
        setUsers(users)
        setClasses(classes)
        // setSearchedUsers(users);
        // setSearchedLearnCards(learnCards);
        // setSearchedTeachCards(classes);
        // if (props.updateSearchFeedProps) {
        //   props.updateSearchFeedProps(query, users, learnCards, classes);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
    
    } catch (error:any) {
      console.log('error occured ==> ',error.message)
    }
  }
  
  React.useEffect(() => {
    const processChanges = debounce(searchQuery,1000);
    processChanges()
  }, [searchText])



  return (
    <View style={{flex:1,padding:20}}>
      <View style={{borderRadius:7,borderWidth:1,height:40,flexDirection:'row',alignItems:'center',paddingHorizontal:10}}>
      <Icon name="search1" size={18} />
        <TextInput
        placeholder='search...'
        value={searchText}
        onChangeText={(e)=>setSearchText(e)}
        placeholderTextColor={'#222'}
        style={{color:'#222'}}
        />
      </View>

      {/* dropdown */}
     <View>
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{borderRadius:7,height:SCREEN_HEIGHT,marginTop:10,display:showLearnCard.length > 0?'block':'block'}}>
          <View>
            <Text style={{fontSize:22,fontFamily:FONT_FAMILY.NUNITO_BOLD}}>{users?.length > 0?'Users':showLearnCard.length > 0?'Learn Card':''}</Text>
          </View>

          {/* other content */}
         {
          users?.length > 0?(
            users?.map((e:any,i:number)=>{
              return (
              <View key={i} style={{marginTop:10,flexDirection:'row',alignItems:'center',gap:10}}>
                <Image source={{uri:e?.photo}} style={{borderWidth:1,width:30,height:30,borderRadius:15}}/>
                <Text style={{fontFamily:FONT_FAMILY.NUNITO_MEDIUM}}>{e?.userName}</Text>
              </View>
              )
            })
          ):null
         }

{  showLearnCard?.length >0?(
  showLearnCard?.map((e: any, i: number) => {
    return(
      <View key={i} style={{marginTop:10}}>
         <LearnCardData {...e} key={i} isTeachCard={false} />
      </View>
    )
  })
):(
  null
)
            }

<View style={{marginTop:10}}>
<Text style={{fontSize:22,fontFamily:FONT_FAMILY.NUNITO_BOLD}}>{classes?.length > 0?'Teach Cards':''}</Text>
        

        {  classes?.length >0?(
          
          classes?.map((e: any, i: number) => {
            return(
              <View key={i}>
                 <LearnCardData {...e} key={i} isTeachCard={true} />
              </View>
            )
          })
        ):(
          null
        )
                    }

</View>
        </ScrollView>

        {/* down content */}

     
            
     </View>
      
    </View>
  )
}

export default SearchPageForHome

const styles = StyleSheet.create({})