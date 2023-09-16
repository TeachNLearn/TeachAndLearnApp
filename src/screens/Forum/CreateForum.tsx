import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import FormField from '../../components/general-components/FormField';
import InputHolder from '../../components/inputComponents/inputHolder';
import Button from '../../components/general-components/button';
import {getHeaders} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import CardHeader from '../../components/general-components/CardHeader';
interface createForumProps {
  tagline: string;
  question: string;
  topic: string;
}

const initialForumData: createForumProps = {
  tagline: '',
  question: '',
  topic: '',
};

const CreateForum = () => {
  const [forum, setForum] = useState<createForumProps>(initialForumData);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState(authCtx.token);

  function updateFields(fields: Partial<createForumProps>) {
    setForum(prev => {
      return {...prev, ...fields};
    });
  }

  const createForumHandler = async () => {
    console.log(forum);
    const {topic, tagline, question} = forum;
    // if (handleValidation()) {
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL}${apiVersion}/forum`,
        {
          topic,
          tagline,
          question,
        },
        {
          headers: getHeaders(userToken ?? ''),
        },
      )
      .then(() => {
        setIsLoading(false);
        setForum(initialForumData);
      })
      .catch((data: any) => {
        setIsLoading(false);
        console.log(data);
      });
    // }
  };

  return (
    <ScrollView style={styles.Scrollcontainer}>
         <CardHeader
        title='Create Forum'
        ShowMenuIcon={false}
        onBackPress={() => {}}
        onMenuPress={() => {}}
      />
      <View style={styles.container}>
        <FormField
          elem={
            <InputHolder
              type="text"
              label="Topic"
              name="topic"
              value={forum.topic}
              updateFields={updateFields}
              placeholderText="Topic like Physics, App Development, Trading etc"
            />
          }
          inputDesc="Pick a topic for your forum"
        />
        <FormField
          elem={
            <InputHolder
              type="text"
              label="Tagline"
              name="tagline"
              value={forum.tagline}
              updateFields={updateFields}
              placeholderText="A brief tagline for your question"
              isTextarea={true}
              textareaLines={4}
            />
          }
          inputDesc="Pick a tagline for your forum"
        />
        <FormField
          elem={
            <InputHolder
              type="text"
              label="Question"
              name="question"
              value={forum.question}
              updateFields={updateFields}
              placeholderText="Ask your question"
              isTextarea={true}
              textareaLines={8}
            />
          }
          inputDesc="Question for the forum"
        />
        <Button onPress={createForumHandler}>
          {isLoading ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            'Create Forum'
          )}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center' ,
    rowGap: 24,
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
  Scrollcontainer:{
    flexGrow:1 ,
    backgroundColor: 'white',
   padding:6.5 ,
   

  }
});

export default CreateForum;
