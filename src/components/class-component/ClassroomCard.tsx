import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { teachingCardProps } from '../../types/teachingCardType';
import { AuthContext } from '../../store/auth-context';
import { userProps } from '../../types/UserTypes';
import { userDataType } from '../../types/userDataType';

interface classCardProps {
  teachCard: teachingCardProps;
  elemType?: string;
  fromLearnCard?: boolean;
  learnCardId?: string;
}

const ClassroomCard = (props: classCardProps) => {

  const authCtx = useContext(AuthContext);

  const [userToken, setuserToken] = useState<string>(authCtx.token);
  const [localUser, setLocalUser] = useState<userDataType>(authCtx.user);
  

  // const checkEnrolledClass = () => {
  //   if (localUser) {
  //     // console.log(props.teachCard.studentsEnrolled);
  //     const bool = props.teachCard.studentsEnrolled.filter((student) => {
  //       return student == localUser._id;
  //     });
  //     // console.log(bool);
  //     return bool.length;
  //   } else {
  //     return null;
  //   }
  // };

  return (

    <View>

    </View>
      )
}

export default ClassroomCard