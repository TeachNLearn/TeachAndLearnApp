import { ScrollView, StyleSheet, Text, TouchableOpacity, View,Pressable } from 'react-native'
import React, { ReactElement } from 'react'
import ScreenHeader from '../../components/general-components/ScreenHeader';
import Chats from './community/Chats';
import Groups from './community/Groups';
import Search from './searchComponent/Search';
import { COLORS_ELEMENTS, FONT_FAMILY } from '../../utils/globalContants';
import Loader from '../../components/general-components/Loader';
import Icon from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../../store/auth-context';


const Community = (props:any) => {

  const ACTIVE_LINK_ELEMENTS = [
    {
      name: 'Chats',
    },
    {
      name: 'Groups',
    }
  ];

  const authCtx = React.useContext(AuthContext);

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
            <Chats props={props}/>
          );
      } else if (activeLink == 'Groups') {
        setElement(
            <Groups props={props}/>
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
    {/* onPress={()=>props.props.navigation.navigate('GroupAdd',{
          token:authCtx.token,
          userId:authCtx.user._id
         })} */}
    <Pressable onPress={()=>activeLink === 'Chats' ?props.navigation.navigate('SearchUser'):props.navigation.navigate('GroupAdd',{
          token:authCtx.token,
          userId:authCtx.user._id
         })} style={{borderWidth:1,borderColor:'#094067',height:40,borderRadius:3,paddingHorizontal:5,flexDirection:'row',alignItems:'center',gap:6}}>
                <Icon name='search1' size={20} color={'#094067'}/>
                <Text style={{fontFamily:FONT_FAMILY.NUNITO_ITALIC,color:COLORS_ELEMENTS.grey}}>{activeLink === 'Chats'?'search user to create chat' : 'create group chat'}</Text>
    </Pressable>
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