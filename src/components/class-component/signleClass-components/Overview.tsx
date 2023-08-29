import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {classroomProps} from '../../../types/classroomType';
import {classReview} from '../../../types/classReviewProps';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import {
  getHeaders,
  getReadableDate,
  getReadableTime,
} from '../../../utils/helperFunctions';
import axios from 'axios';
import ClassBanner from '../ClassBanner';
import UserChip from '../../general-components/UserChip';
import CardDescription from '../../LearnCardsComponent/CardDescription';
import Tagbox from '../../LearnCardsComponent/Tagbox';
import CardTopic from '../../LearnCardsComponent/CardTopic';
import CardID from '../../LearnCardsComponent/CardID';
import ClassDate from '../ClassDate';

type overallOverviewProps = classroomProps & {
  userId: string;
  userToken: string;
};

const Overview = (props: overallOverviewProps) => {
  const checkIsCompleted = () => {
    const date = new Date();
    const classEndingDate = props.classEndsAt;
    const ISOstring = new Date(classEndingDate);
    return date > ISOstring;
  };

  const checkHasReviewed = () => {
    const userID = props.userId;
    const reviews = props.reviews;

    const isReviewed = reviews.filter(review => {
      return review.user._id == userID;
    });

    return isReviewed.length == 1;
  };

  const [reviews, setReviews] = useState<Array<classReview>>();

  const fetchClassReviews = async () => {
    await axios
      .get(`${BASE_URL}${apiVersion}/teach/${props._id}/reviews`, {
        headers: getHeaders(props.userToken),
      })
      .then(({data}) => {
        console.log(data);
        setReviews(data.reviews);
      });
  };

  useEffect(() => {
    if (checkIsCompleted()) {
      fetchClassReviews();
    }
  }, []);

  return (
    <View style={{display: 'flex', flexDirection: 'column', rowGap: 20}}>
      <ClassBanner image={props.cardBanner} />
      <CardTopic topic={props.topic} />
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
            name={props.createdBy.userName}
            photo={props.createdBy.photo}
            imgBorder="black"
            textColor="black"
            userId={props.createdBy._id}
            hasUnderline={true}
          />
          <ClassDate
            date={props.date}
            classEndsAt={props.classEndsAt}
            classStartsAt={props.classStartsAt}
          />
        </View>
        <CardID id={props._id} />
      </View>
      <CardDescription
        programme={props.programme}
        standard={props.standard}
        description={props.description}
      />
      <Tagbox tags={[props.preferredLanguage, ...props.tags]} />
    </View>
  );
};

export default Overview;
