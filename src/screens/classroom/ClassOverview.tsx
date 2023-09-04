import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {teachingCardProps} from '../../types/teachingCardType';
import {AuthContext} from '../../store/auth-context';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {
  getHeaders,
  getReadableDate,
  getReadableTime,
} from '../../utils/helperFunctions';
import {classReview} from '../../types/classReviewProps';
import ClassBanner from '../../components/class-component/ClassBanner';
import UserChip from '../../components/general-components/UserChip';
import CardDescription from '../../components/learnCardComponents/CardDescription';
import Tagbox from '../../components/learnCardComponents/Tagbox';
import CardTopic from '../../components/learnCardComponents/CardTopic';
import ClassDate from '../../components/class-component/ClassDate';
import CardID from '../../components/learnCardComponents/CardID';
import Button from '../../components/general-components/button';
import BuyClass from '../modals/BuyClass';

const ClassOverview = ({route}: any) => {
  const authCtx = useContext(AuthContext);

  const [teachCardId, setTeachCardId] = useState<string>(route.params.id);
  const [teachCard, setTeachCard] = useState<teachingCardProps>();
  const [userToken, setUserToken] = useState<string>(authCtx.token);
  const [userId, setUserId] = useState(authCtx.user._id);
  const [backLink, setBackLink] = useState<string>('/classes');
  const [learnCardId, setlearnCardId] = useState<string>('');

  useEffect(() => {
    const link = route.params.backPageLink;
    if (link) {
      setBackLink(link);
    }

    const learnCardId = route.params.learnCardId;
    if (learnCardId) {
      setlearnCardId(learnCardId);
    }
  }, []);

  async function fetchClassOverview() {
    await axios
      .get(`${BASE_URL}${apiVersion}/teach/${teachCardId}/overview`, {
        headers: getHeaders(userToken ?? ''),
      })
      .then(({data}) => {
        setTeachCard(data.teachCard);
      });
  }

  useEffect(() => {
    if (teachCardId) {
      fetchClassOverview();
    }
  }, [teachCardId]);

  const checkEnrollTimeLimit = () => {
    const currentDate = new Date();
    const limit = teachCard?.classStartsAt;
    if (limit) {
      const ISOstring = new Date(limit);
      return ISOstring > currentDate;
    }
  };

  const checkIsCompleted = () => {
    const date = new Date();
    if (teachCard) {
      const classEndingDate = teachCard?.classEndsAt;
      const ISOstring = new Date(classEndingDate);
      return date > ISOstring;
    }
  };

  const [reviews, setReviews] = useState<Array<classReview>>();
  const fetchClassReviews = async () => {
    await axios
      .get(`${BASE_URL}${apiVersion}/teach/${teachCard?._id}/reviews`, {
        headers: getHeaders(userToken ?? ''),
      })
      .then(({data}) => {
        console.log(data);
        setReviews(data.reviews);
      });
  };

  useEffect(() => {
    if (checkIsCompleted() && teachCard?._id) {
      fetchClassReviews();
    }
  }, [teachCard]);

  return (
    teachCard && (
      <ScrollView>
        <View
          style={{
            margin: 30,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 20,
          }}>
          <ClassBanner image={teachCard.cardBanner} />
          <CardTopic topic={teachCard.topic} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                rowGap: 6,
              }}>
              <UserChip
                name={teachCard.createdBy.name}
                photo={teachCard.createdBy.photo}
                userId={teachCard.createdBy._id}
                imgBorder="black"
                textColor="black"
                hasUnderline={true}
              />
              <ClassDate
                date={teachCard.date}
                classStartsAt={teachCard.classStartsAt}
                classEndsAt={teachCard.classEndsAt}
              />
            </View>
            <CardID id={teachCard._id} />
          </View>
          <CardDescription
            description={teachCard.description}
            standard={teachCard.standard}
            programme={teachCard.programme}
          />
          <Tagbox tags={teachCard.tags} />
          {checkEnrollTimeLimit() && (
            <BuyClass
              classEndsAt={teachCard.classEndsAt}
              classStartsAt={teachCard.classStartsAt}
              date={teachCard.date}
              price={teachCard.price}
              teachCardId={teachCard._id}
              title={teachCard.topic}
              userToken={userToken}
            />
          )}
        </View>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 12,
  },
});

export default ClassOverview;
