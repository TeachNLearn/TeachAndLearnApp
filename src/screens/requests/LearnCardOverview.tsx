import axios from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {learnCardProps} from '../../types/learnCardType';
import {teachingCardProps} from '../../types/teachingCardType';
import {getHeaders} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';
import {Text, View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import SvgComponentInterested from '../../components/svgComponents/InterestedSvg';
import Tagbox from '../../components/learnCardComponents/Tagbox';
import CardID from '../../components/learnCardComponents/CardID';
import InterestedButton from '../../components/learnCardComponents/InterestedButton';
import UserChip from '../../components/general-components/UserChip';
import CardDescription from '../../components/learnCardComponents/CardDescription';
import DueDate from '../../components/learnCardComponents/DueDate';
import CardTopic from '../../components/learnCardComponents/CardTopic';
import ScreenHeader from '../../components/general-components/ScreenHeader';
import { FONT_FAMILY } from '../../utils/globalContants';
import LearnCardData from '../../components/learnCardComponents/LearnCardData';

const LearnCardOverview = (props: any) => {
  const authCtx = useContext(AuthContext);
  const [userToken, setuserToken] = useState<string>(authCtx.token);

  const [learnCardId, setLearnCardId] = useState<string>(props.route.params.id);
  const [learnCard, setlearnCard] = useState<learnCardProps>();
  const [teachCards, setTeachCards] = useState<Array<teachingCardProps>>();
  const [refreshing, setRefreshing] = React.useState(false);


  const [totalInterestedStudents, setTotalInterestedStudents] =
    useState<number>();

  const [isLoading, setIsLoading] = useState(true);
  const [teachCardLoader, setTeachCardLoader] = useState(true);

  async function fetchLearnCard() {
    await axios
      .get(`${BASE_URL}${apiVersion}/learn/${learnCardId}`)
      .then(({data}) => {
        // console.log(data.data.data);
        const cardData = data.data.data[0];
        console.log(cardData);
        setlearnCard(cardData);
        setIsLoading(false);
        setTotalInterestedStudents(cardData.interestedStudents.length);
      });
  }

  async function fetchTeachCardsOnLearnCard() {
    await axios
      .get(`${BASE_URL}${apiVersion}/learn/${learnCardId}/teach`)
      .then(({data}) => {
        console.log("FF",data.data.data);
        setTeachCards(data.data.data);
        setTeachCardLoader(false);
      });
  }

  const [isInterestedLoading, setisInterestedLoading] =
    useState<boolean>(false);

  const interestedHandler = async () => {
    setisInterestedLoading(true);
    await axios
      .patch(
        `${BASE_URL}${apiVersion}/learn/${learnCard?._id}/interested`,
        {},
        {
          headers: getHeaders(userToken),
        },
      )
      .then(({data}) => {
        console.log(data.updatedLearnCard.interestedStudents);
        const newInterestedStudents: string[] =
          data.updatedLearnCard.interestedStudents;
        setisInterestedLoading(false);
        if (learnCard) {
          const newLearnCard = learnCard;
          newLearnCard.interestedStudents = newInterestedStudents;
          setlearnCard(newLearnCard);
          setTotalInterestedStudents(newInterestedStudents.length);
        }
      });
  };

  useEffect(() => {
    if (learnCardId) {
      fetchLearnCard();
      fetchTeachCardsOnLearnCard();
    }
  }, [learnCardId]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTeachCardsOnLearnCard()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    learnCard && (
      <View style={{flex: 1}}>
        {/* Header */}
        <ScreenHeader
        title="Learn Cards Overview"
        ShowMenuIcon={false}
        onBackPress={() => {props.navigation.goBack()}}
        onMenuPress={() => {}}
      />
       <View style={{padding:20}}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        style={styles.scrollContainer}>
          <View style={styles.OverviewContainer}>
            <View
              style={{
                margin: 30,
                display: 'flex',
                flexDirection: 'column',
                rowGap: 20,
              }}>
              <CardTopic topic={learnCard.topic} />
              <DueDate dueDate={learnCard.dueDate} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <UserChip
                  name={learnCard.createdBy === null?'':props.createdBy.userName}
                  photo={learnCard.createdBy === null?'':props.createdBy.photo}
                  userId={learnCard.createdBy === null?'':props.createdBy._id}
                  imgBorder="#000000"
                  textColor="black"
                  hasUnderline={true}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 4,
                  }}>
                  <SvgComponentInterested />
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: '700',
                      fontFamily: 'Nunito',
                    }}>
                    {totalInterestedStudents} Interested
                  </Text>
                </View>
              </View>
              <CardDescription
                description={learnCard.description}
                programme={learnCard.programme}
                standard={learnCard.standard}
              />
              <Tagbox tags={[learnCard.preferredLanguage, ...learnCard.tags]} />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <InterestedButton />
                <CardID id={learnCard._id} />
              </View>
            </View>
          </View>

          <Text style={{fontSize:19,color:'black',fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,marginTop:10}}>Teach cards on this learn card</Text>


          {/* have made new component of teach cards */}
          {
            teachCards?.map((e,i)=>{
              return (
                // <TeachCardData {...e} key={i}/>
                <LearnCardData {...e} key={i} isTeachCard={true}/>
              )
            })
          } 
        </ScrollView>
       </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  learncardOverviewHeadConainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#FFF',
    elevation: 8,
    height: 60,
  },

  OverviewheadTxt: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '600',
  },

  OverviewContainer: {
    // flex:1 ,
    // backgroundColor: '#FAFAFC',

    // padding:20,
    // height:"200%"
  },

  scrollContainer: {
    flexGrow: 1,
    // backgroundColor:'#FFF' ,
    // marginBottom: 30,
    // marginTop: 20,
    // height:'500%'
  },
});

export default LearnCardOverview;
