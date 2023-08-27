import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { classroomProps } from '../../types/classroomType';
import { AuthContext } from '../../store/auth-context';

const SingleClassroom = ({route}: any) => {

  const authCtx = useContext(AuthContext);

  const [classroomId, setClassroomId] = useState<string>(route.params.id);
  const [userToken, setUserToken] = useState<string>(authCtx.token);
  const [userId, setUserId] = useState<string>(authCtx.user._id);
  const [classroom, setClassroom] = useState<classroomProps>();
  const [activeLink, setActiveLink] = useState("overview");
  const [classElemType, setClassElemType] = useState<string>("all classes");
  const [backLink, setBackLink] = useState<string>("/classes");
  const [learnCardId, setlearnCardId] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  return (
    <View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[activeSection === 'Classes' && styles.activeSegment]}
            onPress={() => handleSectionChange('Classes')}>
            <Text style={styles.segmentText}>Classes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[activeSection === 'Requests' && styles.activeSegment]}
            onPress={() => handleSectionChange('Requests')}>
            <Text style={styles.segmentText}>Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[activeSection === 'Users' && styles.activeSegment]}
            onPress={() => handleSectionChange('Users')}>
            <Text style={styles.segmentText}>Users</Text>
          </TouchableOpacity>
        </View> */}
    </View>
  )
}

export default SingleClassroom