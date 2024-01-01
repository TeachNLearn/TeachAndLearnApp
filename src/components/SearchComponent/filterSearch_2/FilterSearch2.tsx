import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import ScreenHeader from '../../general-components/ScreenHeader';
import {subjects} from '../../../data/SUBJECT_LIST.json';
import {standard} from '../../../data/STANDARD_LIST.json';
import {languages} from '../../../data/LANGUAGE_LIST.json';
import Icon from 'react-native-vector-icons/AntDesign';
import ComponentForList from './ComponentForList';
import ShowSingleComponent from './ShowSingleComponent';
import { COLORS_ELEMENTS, COLORS_ILLUSTRATION, FONT_FAMILY } from '../../../utils/globalContants';
import axios from 'axios';
import { BASE_URL1, apiVersion } from '../../../utils/apiRoutes';
import { getHeaders } from '../../../utils/helperFunctions';
import { AuthContext } from '../../../store/auth-context';
import { ToastHOC } from '../../../helpers/Toast';

const FilterSearch2 = (props: any) => {
  const components = {
    SUBJECT: 'Subject',
    CLASS: 'Class',
    LANGUAGE: 'Language',
  };
  const AllText = [components.SUBJECT, components.CLASS, components.LANGUAGE];

  const authCtx = React.useContext(AuthContext);


  const [pressed, setPressed] = React.useState<String>(components.SUBJECT);
  const [selectOneSubject, setSelectOneSubject] = React.useState('');
  const [selectOneClass, setSelectOneClass] = React.useState('');
  const [selectOneLanguage, setSelectOneLanguage] = React.useState('');
  const [subjectss, setSubjectss] = React.useState<any>(subjects)
  const [standardss, setStandardss] = React.useState<any>(standard)
  const [languagess, setLanguagess] = React.useState<any>(languages)
  const [isLoading, setIsLoading] = React.useState<Boolean>(false)
  const [userToken, setuserToken] = React.useState(authCtx.token);



  const configureComponent = (k:any)=>{
   if(pressed === components.SUBJECT){
    const found = subjects.filter(item => item.toLowerCase().includes(k.toLowerCase()));
    setSubjectss(found)
   }
   else if(pressed === components.CLASS){
    const found = standard.filter(item => item.toLowerCase().includes(k.toLowerCase()));
    setStandardss(found)
   }
   else if(pressed === components.LANGUAGE){
    const found = languages.filter(item => item.toLowerCase().includes(k.toLowerCase()));
    setLanguagess(found)
   }
  }

  const applyFilters = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL1}${apiVersion}/user/filter?standard=${selectOneClass}&subject=${selectOneSubject}&programme=${''}&preferredLanguage=${selectOneLanguage}`,
        {},
        {
          headers: getHeaders(userToken),
        },
      )
      .then(({data}) => {
        setIsLoading(false);
        ToastHOC.successAlert('Success in fetching cards', 'success');
        console.log("ALL_Cards ==> ",data?.payload)
        // setAllCards(data?.payload);
      })
      .catch(data => {
        setIsLoading(false);
        ToastHOC.errorAlert('No Cards found', 'Unsuccessfull');
        // setAllCards([]);
      });
  };
  
  return (
    <>
      <ScreenHeader
        title="Filter Search"
        ShowMenuIcon={false}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onMenuPress={() => {}}
      />

        {/* filter for core_components */}

      <View style={{borderWidth: .7, flex: 1, flexDirection: 'row'}}>
        <View style={{width: '30%', backgroundColor:'#fff',flexDirection:'column',justifyContent:'space-between'}}>
         <View>
         {AllText.map((e: any, i: number) => {
            return (
              <Pressable
                onPress={() => {setPressed(e)}}
                key={i}
                style={{
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  height: 50,
                  justifyContent: 'center',
                  backgroundColor:pressed === e?COLORS_ELEMENTS.headline:'#fff'
                }}>
                <Text style={{color:pressed === e?COLORS_ELEMENTS.background:'#222',fontFamily:FONT_FAMILY.NUNITO_BOLD}}>{e}</Text>
              </Pressable>
            );
          })}
         </View>
          {/* apply filter */}
          <Pressable onPress={()=>applyFilters()} style={{backgroundColor:COLORS_ILLUSTRATION.tertiary,padding:10}}>
            <Text style={{color:'#fff',fontFamily:FONT_FAMILY.NUNITO_BOLD}}>Apply Filters</Text>
          </Pressable>
        </View>


        {/* filter for components */}

        <View
          style={{borderLeftWidth: 1, width: '70%', flexDirection: 'column'}}>
            <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1}}>
                <Icon name="search1" size={18} />
          <TextInput
            style={{height: 40,width:'100%'}}
            placeholder="search"
            placeholderTextColor={'#222'}
            onChangeText={(e:any)=>configureComponent(e)}
            />
            </View>
          <View style={{flexWrap: 'wrap',marginTop:10,flexDirection:'row'}}>
            <ShowSingleComponent setComponent={setSelectOneSubject} component={selectOneSubject}/>
            <ShowSingleComponent setComponent={setSelectOneClass} component={selectOneClass}/>
            <ShowSingleComponent setComponent={setSelectOneLanguage} component={selectOneLanguage}/>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              borderColor: 'red',
              marginTop: 10,
            }}>
            {pressed === components.SUBJECT ? (
              <ComponentForList
                setSelectOneComponent={setSelectOneSubject}
                selectOneComponent={selectOneSubject}
                component={subjectss}
              />
            ) : pressed === components.CLASS ? (
              <ComponentForList
                setSelectOneComponent={setSelectOneClass}
                selectOneComponent={selectOneClass}
                component={standardss}
              />
            ) : pressed === components.LANGUAGE ? (
              <ComponentForList
                setSelectOneComponent={setSelectOneLanguage}
                selectOneComponent={selectOneLanguage}
                component={languagess}
              />
            ) : (
              <ComponentForList
                setSelectOneComponent={setSelectOneSubject}
                selectOneComponent={selectOneSubject}
                component={subjectss}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default FilterSearch2;