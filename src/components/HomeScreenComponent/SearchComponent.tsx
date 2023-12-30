import { View, Text , TouchableOpacity , StyleSheet , TextInput, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconSe from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign'
import { FONT_FAMILY } from '../../utils/globalContants';

interface SearchInputSectionProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchPress: () => void;
  props:any
}

const SearchComponent : React.FC<SearchInputSectionProps> = ({searchText , onSearchPress , onSearchTextChange,props}) => {
  return (
   
      <View
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={onSearchPress}>
            <Icon name="search" size={24} color="white" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={searchText}
            onChangeText={onSearchTextChange}
          />
          <Pressable style={styles.submitButton} onPress={()=>props?.navigation?.navigate('Filter_Search')}>
            <Icon1 name="filter" size={24} color="#fff" />
          </Pressable>

        </View>

        <View style={styles.searchBtnContainer}>
          <IconSe name="arrow-top-right" size={24} color="#000" />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    // margin: 23,
    marginLeft:23,
    marginRight:23,

    width: '70%',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'white',
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD

  },
  submitButton: {
    padding: 10,
  },

  searchBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    width: 47,
    height: 47,
  },
})

export default SearchComponent