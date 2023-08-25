import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionican from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Classes from '../components/SearchComponent/Classes';
import Requests from '../components/SearchComponent/Requests';
import UserClasses from '../components/SearchComponent/UserClasses';


const Tab = createMaterialTopTabNavigator();

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState<
    'Classes' | 'Requests' | 'Users'
  >('Classes');

  const handleSectionChange = (
    section: 'Classes' | 'Requests' | 'Users',
  ): void => {
    setActiveSection(section);
  };

  const handleSearch = (): void => {
    // Perform search action with searchText
    console.log('Searching for:', searchText);
  };

  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: '#FFF',
          elevation: 16,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 70,
            marginBottom: 30,
          }}>
          <Ionican name="arrow-back-sharp" size={20} color="#000" />
          <Text
            style={{
              color: '#000',
              fontFamily: 'Nunito',
              fontSize: 18,
              fontWeight: '600',
              letterSpacing: 0.36,

            }}
          >
            Search

            {/* }}>
            Learn Cards */}

          </Text>
          <Ionican name="ellipsis-vertical-sharp" size={20} color="#000000" />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40,
            justifyContent: 'center',
          }}>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.searchIconContainer}
              onPress={handleSearch}>
              <FontAwesome name="search" size={16} color="#000" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#000"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <View style={styles.searchBtnContainer}>
            <MaterialIcon name="arrow-right" size={24} color="#FFF" />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[activeSection === 'Classes' && styles.activeSegment]}
            onPress={() => handleSectionChange('Classes')}>
            <Text style={styles.segmentText}>Classes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[activeSection === 'Requests' && styles.activeSegment]}
            onPress={() => handleSectionChange('Requests')}>
            <Text style={styles.segmentText}>Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[activeSection === 'Users' && styles.activeSegment]}
            onPress={() => handleSectionChange('Users')}>
            <Text style={styles.segmentText}>Users</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          {activeSection === 'Classes' && <Classes />}
          {activeSection === 'Requests' && <Requests />}
          {activeSection === 'Users' && <UserClasses />}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    borderColor: '#E9E9E9',
    borderWidth: 1,
    margin: 20,
    width: '70%',
  },
  searchIconContainer: {
    marginLeft: 10,
  },
  searchInput: {},
  searchBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  LearnClassTxt: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '600',
  },
  activeSegment: {
    borderBottomColor: '#674FF1',
    borderBottomWidth: 2,
    width: '20%',
    alignItems: 'center',
  },
  segmentText: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});

export default Search;
