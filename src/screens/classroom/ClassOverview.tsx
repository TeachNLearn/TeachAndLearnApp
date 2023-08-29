import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
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
import CardDescription from '../../components/LearnCardsComponent/CardDescription';
import Tagbox from '../../components/LearnCardsComponent/Tagbox';
import CardTopic from '../../components/LearnCardsComponent/CardTopic';

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
      <View
        style={{
          margin: 30,
          display: 'flex',
          flexDirection: 'column',
          rowGap: 20,
        }}>
        <ClassBanner image={teachCard.cardBanner} />
        <CardTopic topic={teachCard.topic} />
        <View>
          <UserChip
            name={teachCard.createdBy.name}
            photo={teachCard.createdBy.photo}
            userId={teachCard.createdBy._id}
            imgBorder="black"
            textColor="black"
            hasUnderline={true}
          />
        </View>
        <View>
          <Text>
            {getReadableDate(teachCard.date)}
            <View></View>
            {getReadableTime(teachCard.classStartsAt)}
            {' - '}
            {getReadableTime(teachCard.classEndsAt)}
          </Text>
        </View>
        <CardDescription
          description={teachCard.description}
          standard={teachCard.standard}
          programme={teachCard.programme}
        />
        <Tagbox tags={teachCard.tags} />
      </View>
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
