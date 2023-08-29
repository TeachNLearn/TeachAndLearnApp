import axios from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {learnCardProps} from '../../types/learnCardType';
import {teachingCardProps} from '../../types/teachingCardType';
import {getHeaders} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';
import Ionican from 'react-native-vector-icons/Ionicons';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import SvgComponentInterested from '../../components/SVGComponents/InterestedSvg';
import Tagbox from '../../components/LearnCardsComponent/Tagbox';
import CardID from '../../components/LearnCardsComponent/CardID';
import InterestedButton from '../../components/LearnCardsComponent/InterestedButton';
import UserChip from '../../components/general-components/UserChip';
import CardDescription from '../../components/LearnCardsComponent/CardDescription';
import DueDate from '../../components/LearnCardsComponent/DueDate';
import CardTopic from '../../components/LearnCardsComponent/CardTopic';

const LearnCardOverview = ({route}: any) => {
  const authCtx = useContext(AuthContext);
  const [userToken, setuserToken] = useState<string>(authCtx.token);

  const [learnCardId, setLearnCardId] = useState<string>(route.params.id);
  const [learnCard, setlearnCard] = useState<learnCardProps>();
  const [teachCards, setTeachCards] = useState<Array<teachingCardProps>>();

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
        // console.log(data.data.data);
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
    }
  }, [learnCardId]);

  return (
    learnCard && (
      <View style={{flex: 1}}>
        {/* Header */}
        <View style={styles.learncardOverviewHeadConainer}>
          <Ionican name="arrow-back-sharp" size={20} color="#000" />
          <Text style={styles.OverviewheadTxt}>Learn Cards Overiew</Text>
          <Ionican name="ellipsis-vertical-sharp" size={20} color="#000000" />
        </View>

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.OverviewContainer}>
            <View style={{margin: 30}}>
              <CardTopic topic={learnCard.topic} />
              <DueDate dueDate={learnCard.dueDate} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <UserChip
                  name={learnCard.createdBy.name}
                  photo={learnCard.createdBy.photo}
                  userId={learnCard.createdBy._id}
                  imgBorder="#000000"
                  textColor="black"
                  hasUnderline={true}
                />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <SvgComponentInterested />
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '500',
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
              <View style={{marginTop: 20}}>
                <InterestedButton />
                <CardID id={learnCard._id} />
                <Tagbox tags={learnCard.tags} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  learncardOverviewHeadConainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    elevation: 8,
    height: 130,
  },

  OverviewheadTxt: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '600',
  },

  OverviewContainer: {
    // flex:1 ,
    backgroundColor: '#FAFAFC',

    // padding:20,
    // height:"200%"
  },

  scrollContainer: {
    // flexGrow: 1,
    // marginBottom: 30,
    // marginTop: 20,
    // height:'500%'
  },
});

export default LearnCardOverview;
