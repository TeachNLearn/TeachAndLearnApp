import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactElement } from 'react'
import { FONT_FAMILY } from '../../utils/globalContants';
import ScreenHeader from '../../components/general-components/ScreenHeader';
import LearnCard from './cardsScreen/LearnCard';
import CreateTeachCard from '../classroom/CreateTeachCard';
import Loader from '../../components/general-components/Loader';
import TeachCards from './cardsScreen/TeachCards';
import Search from './searchComponent/Search';

const CardScreen = () => {
  const ACTIVE_LINK_ELEMENTS = [
    {
      name: 'Learn Cards',
    },
    {
      name: 'Teach Cards',
    }
  ];

  const [element, setElement] = React.useState<ReactElement>();
  const [activeLink, setActiveLink] = React.useState('Learn Cards');
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSectionChange = (
    section: 'Learn Cards' | 'Teach Cards' | string,
  ): void => {
    setActiveLink(section);
  };


  React.useEffect(() => {

      if (activeLink == 'Learn Cards') {
        setElement(
            <LearnCard/>
          );
      } else if (activeLink == 'Teach Cards') {
        setElement(
            <TeachCards/>
        );
      }
  }, [activeLink]);




  return (
    <>
      <ScrollView>
         <ScreenHeader
        title={activeLink}
        ShowMenuIcon={false}
        onBackPress={() => {
          // props.navigation.goBack();
        }}
        onMenuPress={() => {}}
      />

    <View style={{padding:10}}>
      <Search/>
    </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        {ACTIVE_LINK_ELEMENTS?.map((e,i)=> {
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
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.elementWrapper}>{element}</View>
      )}
    </ScrollView>
    </>
  )
}

export default CardScreen

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
});
