import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import React, {ReactElement,useContext} from 'react';
import {COLORS_ELEMENTS, COLORS_ILLUSTRATION, FONT_FAMILY, SCREEN_WIDTH} from '../../utils/globalContants';
import ScreenHeader from '../../components/general-components/ScreenHeader';
import LearnCard from './cardsScreen/LearnCard';
import CreateTeachCard from '../classroom/CreateTeachCard';
import Loader from '../../components/general-components/Loader';
import Icon from 'react-native-vector-icons/Entypo';
import Search from './searchComponent/Search';
import LearnCardData from '../../components/learnCardComponents/LearnCardData';
import CompletedClasses from '../../components/class-component/CompletedClasses';
import { Helper_Context } from '../../store/helper_context';
import SkeletonLoaderHorizontalWithReanimatedGradient from './skeletonUi/Skeleton';
import SkeletonLoder from '../../components/general-components/SkeletonLoder';

const CardScreen = (props: any) => {

  const ACTIVE_LINK_ELEMENTS = [
    {
      name: 'Learn Cards',
    },
    {
      name: 'Teach Cards',
    },
  ];

  const [element, setElement] = React.useState<string>('learn_cards');
  const [activeLink, setActiveLink] = React.useState('Learn Cards');

  const handleSectionChange = (
    section: 'Learn Cards' | 'Teach Cards' | string,
  ): void => {
    setActiveLink(section);
  };

  React.useEffect(() => {
    if (activeLink === 'Learn Cards') {
      setElement(
        // <LearnCard/>
        'learn_cards',
      );
    } else if (activeLink === 'Teach Cards') {
      setElement(
        // <TeachCards/>
        'teach_cards',
      );
    }
  }, [activeLink]);

  const {role} = useContext(Helper_Context)
  console.log(props)

  return (
    <>
      <View style={{padding: 0}}>
        <Search />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        {ACTIVE_LINK_ELEMENTS?.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[activeLink === e.name && styles.activeSegment]}
              onPress={() => handleSectionChange(e.name)}>
              <Text style={styles.segmentText}>{e.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {element === 'learn_cards' ? (
        <ScrollView
        refreshControl={
          <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
           <View style={{paddingHorizontal:20}}>
                   {
                    role === 'learn'?(
                      <>
                    <TouchableOpacity
                      onPress={()=>props.props.navigation.navigate('CreateLearnCard')}
                      style={{
                      height: 50,
                      width: '100%',
                      marginTop: 10,
                      borderRadius: 5,
                      backgroundColor: COLORS_ILLUSTRATION.tertiary,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      paddingHorizontal: 5,
                    }}>
                    <Icon
                      name="plus"
                      size={25}
                      color={'white'}
                      style={{alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 17,
                        fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                        color: 'white',
                      }}>
                      Create Learn Card
                    </Text>
                  </TouchableOpacity>
                      </>
                    ):null
                   }
         </View>
         {
          props?.isLoading  === true ?(
               <View style={{paddingHorizontal:20}}>
                  <SkeletonLoder height={250}/>
               </View>
          ):(
            props?.learnCards.map((card:any, index:number) => (
              <>
                {props.isLoading ? (
               <Loader/>
                ) : (
                  <View style={{paddingHorizontal:20,marginTop:10}}>
                    <LearnCardData {...card} key={index} isTeachCard={false} />
                  </View>
                )}
              </>
            ))
          )
         }
        </ScrollView>
      ) : (
        <>
          <CompletedClasses role={role} props={props}/>
        </>
      )}
    </>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  activeSegment: {
    borderBottomColor: '#674FF1',
    borderBottomWidth: 2,
    // width: '22%',
    alignItems: 'center',
  },
  segmentText: {
    color: '#000',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  elementWrapper: {
    // marginHorizontal: 8,
    margin: 20,
  },
  loader:{
    backgroundColor: '#094067',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // alignSelf:'center',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    height:250,
    rowGap: 14,
    marginTop:20
    // cursor: 'pointer',
    // justifyContent:'center'
  }
});
