import React from 'react';
import {userListProps} from '../../types/userListProps';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

interface listProps {
  userArr: Array<userListProps>;
  localUserId: string;
}

const UserList = ({userArr, localUserId}: listProps) => {
  type RootStackParamList = {
    Userprofile: undefined;
  };

  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const forumNavigator = () => {
    navigation.navigate(`Userprofile`);
  };

  //   const navigate = useNavigate();
  //   const userNavigationHandler = (userId: string) => {
  //     topNavigator();
  //     if (localUserId == userId) {
  //       navigate('/me');
  //     } else {
  //       navigate(`/user/${userId}`, {
  //         state: {
  //           userId: userId,
  //         },
  //       });
  //     }
  //   };

  return (
    <View style={styles.mainContainer}>
      {userArr.length != 0 ? (
        userArr.map((user, index) => {
          return (
            <TouchableOpacity
              style={styles.userContainer}
              key={index}
              onPress={() => forumNavigator()}>
              <Image
                style={styles.userImg}
                source={{uri: user.photo}}
                alt="user-img"
              />
              <View>
                <View style={styles.names}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.username}>@{user.userName}</Text>
                </View>
                <Text>{user.tagline}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View>
          <Text>No Users for this search</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginHorizontal: 25,
    marginTop: 40,
    // borderColor: 'black',
    // borderWidth: 2,
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    columnGap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomColor: '#d5d9eb',
    borderBottomWidth: 1,
    width: '100%',
  },
  userImg: {
    width: 51,
    height: 51,
    objectFit: 'cover',
    borderRadius: 30,
  },
  names: {
    display: 'flex',
    columnGap: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
    // letterSpacing: 1
  },
  username: {
    fontWeight: '400',
    fontSize: 15,
    color: '#000000',
  },
});

export default UserList;
