import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text} from 'react-native';
import {announcementProps} from '../../../types/announcementProps';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import {DATA_LIMIT} from '../../../utils/globalContants';
import {checkMoreData, getHeaders} from '../../../utils/helperFunctions';
import {View} from 'react-native';
import Announcement from '../Announcement';

interface classProps {
  topic: string;
  callLink: string;
  isTeacher: boolean;
  teachCardId: string;
  userToken: string;
  classElemType: string;
}

const AllAnnouncements = (props: classProps) => {
  const [announcements, setAnnouncements] = useState<Array<announcementProps>>(
    [],
  );

  const [announcementSet, setAnnouncementSet] = useState<number>(0);
  const [hasMoreData, sethasMoreData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);

  async function fetchAnnouncements() {
    setLoaderLoading(true);
    await axios
      .get(
        `${BASE_URL}${apiVersion}/teach/${props.teachCardId}/announcements`,
        {
          params: {
            limit: DATA_LIMIT,
            page: announcementSet + 1,
          },
          headers: getHeaders(props.userToken),
        },
      )
      .then(({data}) => {
        console.log(data.announcements);
        checkMoreData(data.announcements, sethasMoreData);
        setAnnouncements(prev => [...prev, ...data.announcements]);
        setIsLoading(false);
        setLoaderLoading(false);
        setAnnouncementSet(prev => prev + 1);
      })
      .catch(data => {
        console.log(data);
        setIsLoading(false);
        setLoaderLoading(false);
        setLoaderLoading(false);
      });
  }

  useEffect(() => {
    if (props.userToken) {
      fetchAnnouncements();
    }
  }, [props.userToken]);

  return (
    <ScrollView>
      <View style={{display: 'flex', flexDirection: 'column', rowGap: 20}}>
        {isLoading ? (
          <ActivityIndicator size={40} color="#094067" />
        ) : announcements.length != 0 ? (
          <View style={{display: 'flex', flexDirection: 'column', rowGap: 28}}>
            {announcements.map((announcement, index) => {
              return <Announcement {...announcement} key={index} />;
            })}
          </View>
        ) : (
          <Text
            style={{
              fontWeight: '600',
              fontSize: 32,
            }}>
            No announcements yet!!
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default AllAnnouncements;
