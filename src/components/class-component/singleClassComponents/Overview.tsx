import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {classroomProps} from '../../../types/classroomType';
import {classReview} from '../../../types/classReviewProps';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import {getHeaders} from '../../../utils/helperFunctions';
import axios from 'axios';
import ClassBanner from '../ClassBanner';
import UserChip from '../../general-components/UserChip';
import CardDescription from '../../learnCardComponents/CardDescription';
import Tagbox from '../../learnCardComponents/Tagbox';
import CardTopic from '../../learnCardComponents/CardTopic';
import CardID from '../../learnCardComponents/CardID';
import ClassDate from '../ClassDate';
import CancelClass from '../CancelClass';
import AddLink from '../AddLink';
import UserReview from '../UserReview';
import JoinClass from '../JoinClass';

type overallOverviewProps = classroomProps & {
  userId: string;
  userToken: string;
  props:any
};

const Overview = (props: overallOverviewProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [otherUserDetails, setOtherUserDetails] = useState(null)
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
      {!props.hasCancelled && !checkIsCompleted() ? (
        props.userId == props.createdBy._id ? (
          <AddLink
            callLink={props.callLink}
            teachCardId={props._id}
            userId={props.userId}
            userToken={props.userToken}
          />
        ) : (
          <JoinClass callLink={props.callLink} />
        )
      ) : props.userId ==
        props.createdBy
          ._id ? null : !checkHasReviewed() ? //   userToken={props.userToken} //   teachCardId={props._id} // <ReviewClass
      //   teacherID={props.createdBy._id}
      // />
      null : null}
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
            props={props.props}
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
      {!props.hasCancelled && props.userId === props.createdBy._id ? (
        !checkIsCompleted() ? (
          <CancelClass teachCardId={props._id} userToken={props.userToken} />
        ) : null
      ) : null}
    </View>
  );
};

export default Overview;
