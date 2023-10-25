import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactElement } from 'react'
import ScreenHeader from '../../components/general-components/ScreenHeader';
import Chats from './community/Chats';
import Groups from './community/Groups';
import Search from './searchComponent/Search';
import { FONT_FAMILY } from '../../utils/globalContants';
import Loader from '../../components/general-components/Loader';

const Community = () => {

  const ACTIVE_LINK_ELEMENTS = [
    {
      name: 'Chats',
    },
    {
      name: 'Groups',
    }
  ];

  const [element, setElement] = React.useState<ReactElement>();
  const [activeLink, setActiveLink] = React.useState('Chats');
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSectionChange = (
    section: 'Learn Cards' | 'Teach Cards' | string,
  ): void => {
    setActiveLink(section);
  };


  React.useEffect(() => {

      if (activeLink == 'Chats') {
        setElement(
            <Chats/>
          );
      } else if (activeLink == 'Groups') {
        setElement(
            <Groups/>
        );
      }
  }, [activeLink]);
  return (
    <View style={{flex:.9}}>
    <>
         <ScreenHeader
        title={activeLink}
        ShowMenuIcon={false}
        onBackPress={() => {
          // props.navigation.goBack();
        }}
        onMenuPress={() => {}}
      />

    <View style={{padding:20}}>
      <Search/>
    </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop:10,
        }}>
        {ACTIVE_LINK_ELEMENTS?.map(e => {
          return (
            <TouchableOpacity
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
        <ScrollView>
          <View style={styles.elementWrapper}>{element}</View>
        </ScrollView>
      )}
    </>
    </View>
  )
}

export default Community

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