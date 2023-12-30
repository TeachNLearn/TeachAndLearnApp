import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FONT_FAMILY, SCREEN_HEIGHT} from '../../utils/globalContants';
import DropDownComponent from './filter_search/DropDownComponent';
import DropDownBox from './filter_search/DropDownBox';
import {AuthContext} from '../../store/auth-context';
import axios from 'axios';
import {BASE_URL, BASE_URL1, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import {ToastHOC} from '../../helpers/Toast';
import LearnCardData from '../learnCardComponents/LearnCardData';
import Loader from '../general-components/Loader';
import ScreenHeader from '../general-components/ScreenHeader';

interface IFILTER_SEARCH {
  props: any;
}

const FilterSearch: React.FC<IFILTER_SEARCH> = props => {
  const AllText = ['Subject', 'Class', 'Language'];

  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [aboutt, setAboutt] = React.useState('');

  const setDD = (e: any) => {
    setOpenDropDown(!openDropDown);
    setAboutt(e);
  };

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setuserToken] = useState(authCtx.token);
  const [subject, setSubject] = useState('');
  const [standard, setStandard] = useState('');
  const [programme, setProgramme] = useState('');
  const [prefferedLanguage, setPrefferedLanguage] = useState('');
  const [allCards, setAllCards] = useState([]);

  const filterSearch = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL1}${apiVersion}/user/filter?standard=${standard}&subject=${subject}&programme=${programme}&preferredLanguage=${prefferedLanguage}`,
        {},
        {
          headers: getHeaders(userToken),
        },
      )
      .then(({data}) => {
        setIsLoading(false);
        ToastHOC.successAlert('Success in fetching cards', 'success');
        setAllCards(data?.payload);
      })
      .catch(data => {
        setIsLoading(false);
        ToastHOC.errorAlert('No Cards found', 'Unsuccessfull');
        setAllCards([]);
      });
  };

  React.useEffect(() => {
    filterSearch();
  }, [subject, standard, prefferedLanguage]);

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
      <View style={{gap: -10}}>
        <Pressable
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            setStandard(''),
              setSubject(''),
              setPrefferedLanguage(''),
              setOpenDropDown(false);
          }}>
          <Text style={{marginRight: 20}}>clear all</Text>
        </Pressable>
        <View
          style={{
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          {AllText.map((e: any, i: number) => {
            return (
              <DropDownComponent
                key={i}
                onPress={() => setDD(e)}
                heading={e}
                text={
                  e === 'Subject'
                    ? subject
                    : e === 'Class'
                    ? standard
                    : e === 'Language'
                    ? prefferedLanguage
                    : ''
                }
              />
            );
          })}
        </View>
        <Text style={{marginLeft: 20}}>Search results : {allCards.length}</Text>
      </View>
      {aboutt === 'Subject' ? (
        <DropDownBox
          setOpenDD={setOpenDropDown}
          setField={setSubject}
          showDropDown={openDropDown}
          aboutt={aboutt}
        />
      ) : aboutt === 'Class' ? (
        <DropDownBox
          setOpenDD={setOpenDropDown}
          showDropDown={openDropDown}
          setField={setStandard}
          aboutt={aboutt}
        />
      ) : aboutt === 'Language' ? (
        <DropDownBox
          setField={setPrefferedLanguage}
          setOpenDD={setOpenDropDown}
          showDropDown={openDropDown}
          aboutt={aboutt}
        />
      ) : null}

      <ScrollView contentContainerStyle={{padding: 20, bottom: 10}}>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {allCards.length > 0 ? (
              allCards?.map((e: any, i: number) => {
                return <LearnCardData {...e} key={i} isTeachCard={false} />;
              })
            ) : (
              <Text style={{alignSelf: 'center'}}>No Cards found</Text>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default FilterSearch;

const styles = StyleSheet.create({});
