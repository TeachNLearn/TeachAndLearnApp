import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import UserImg from '../../../assets/Images/cardImg.png';
import CardHeader from '../../general-components/CardHeader';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import {getHeaders} from '../../../utils/helperFunctions';
import {userListProps} from '../../../types/userListProps';
import {AuthContext} from '../../../store/auth-context';
import UserList from '../../profileComponents/UserList';

const MyFavourite: React.FC = (props:any) => {
  const authCtx = useContext(AuthContext);
  const [localUserId, setlocalUserId] = useState<string>(authCtx.user._id);
  const [userToken, setUserToken] = useState<string>(authCtx.token);
  const [isLoading, setisLoading] = useState(false);

  const [favouriteusers, setFavouriteusers] = useState<Array<userListProps>>();

  const fetchUserFavourites = async () => {
    setisLoading(true);
    await axios
      .get(`${BASE_URL}${apiVersion}/user/myfavourites`, {
        headers: getHeaders(userToken),
      })
      .then(({data}) => {
        console.log(data);
        setFavouriteusers(data.userFavourites.favouriteUsers);
        setisLoading(false);
      })
      .catch(data => {
        console.log(data);
        setisLoading(false);
      });
  };

  useEffect(() => {
    if (userToken) {
      fetchUserFavourites();
    }
  }, [userToken]);

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF',
        flex: 1,
      }}>
      <CardHeader
        title="My Favourite"
        ShowMenuIcon={false}
        onBackPress={() => {props.navigation.goBack()}}
        onMenuPress={() => {}}
      />
      {favouriteusers && (
        <UserList localUserId={localUserId} userArr={favouriteusers} />
      )}
    </View>
  );
};

export default MyFavourite;

const styles = StyleSheet.create({});
