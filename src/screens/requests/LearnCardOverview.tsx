import axios from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {learnCardProps} from '../../types/learnCardType';
import {teachingCardProps} from '../../types/teachingCardType';
import {getHeaders} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';

const LearnCardOverview = () => {
  const authCtx = useContext(AuthContext);

  const [userToken, setuserToken] = useState(authCtx.token);

  const [learnCard, setlearnCard] = useState<learnCardProps>();
  const [teachCards, setTeachCards] = useState<Array<teachingCardProps>>();

  const [totalInterestedStudents, setTotalInterestedStudents] =
    useState<number>();

  const [isLoading, setIsLoading] = useState(true);
  const [teachCardLoader, setTeachCardLoader] = useState(true);

  //   get id from navigatiiona ans set state
  const [learnCardId, setLearnCardId] = useState();

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

  return <div>LearnCardOverview</div>;
};

export default LearnCardOverview;
