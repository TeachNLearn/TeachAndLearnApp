import axios from 'axios';
import React, {useState} from 'react';
import {View} from 'react-native';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import RatingContainer from '../forum-components/RatingContainer';
import Rating from './Rating';
import FormField from '../general-components/FormField';
import InputHolder from '../input/inputHolder';

interface reviewProps {
  teachCardId: string;
  userToken: string;
  teacherID: string;
}

const UserReview = (props: reviewProps) => {
  const [rating, setRating] = useState<number>(1);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [hasReviewed, setHasReviewed] = useState(false);

  const updateReview = (content: string) => {
    setReview(content);
  };

  const submitReviewHandler = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL}${apiVersion}/teach/${props.teachCardId}/reviews`,
        {
          review,
          rating,
          teacherID: props.teacherID,
        },
        {
          headers: getHeaders(props.userToken),
        },
      )
      .then(({data}) => {
        console.log(data);
        setIsLoading(false);
        setHasReviewed(true);
        // thanksGiving();
      })
      .catch(data => {
        setIsLoading(false);
      });
  };

  return (
    <View>
      <Rating onRating={(rate: number) => setRating(rate)} rating={rating} />
      <FormField
        elem={
          <InputHolder
            name=""
            type="text"
            updateFields={updateReview}
            value={review}
            hasSignleUpdate={true}
            isTextarea={true}
            placeholderText="Tell us what you think of this class"
            textareaLines={6}
          />
        }
        inputDesc="Brief Review"
      />
    </View>
  );
};

export default UserReview;
