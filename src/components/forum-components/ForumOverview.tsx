import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { BASE_URL, apiVersion } from "../../utils/apiRoutes";
import { getHeaders } from "../../utils/helperFunctions";
import axios from "axios";
import { forumProps } from "../../types/ForumTypes";
import QuestionContainer from "./questionContainer";
import AnswerContainer from "./answerContainer";

const ForumOverview = ({ navigation, route }: any) => {
  console.log(route.params.id);

  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>(authCtx.token);

  const [forumId, setForumId] = useState<string>(route.params.id);
  const [forum, setForum] = useState<forumProps>();

  async function fetchForum() {
    await axios
      .get(`${BASE_URL}${apiVersion}/forum/${forumId}`, {
        headers: getHeaders(userToken),
      })
      .then(({ data }: any) => {
        const forumData = data.data.data[0];
        console.log("FORUM DATA");

        console.log(data.data.data[0]);
        setForum(forumData);
        // setIsLoading(false);
      })
      .catch((data: any) => {
        console.log(data);
        // setIsLoading(false);
      });
  }

  useEffect(() => {
    if (forumId && userToken) {
      fetchForum();
    }
  }, [forumId, userToken]);

  return forum ? (
    <ScrollView>
      <View style={styles.container}>
        <QuestionContainer
          createdBy={forum.createdBy}
          question={forum.question}
          upvotes={forum.upvotes}
          tagline={forum.tagline}
          forumId={forum._id}
          userToken={userToken}
          noAnswers={forum.answers.length == 0}
          createdAt={forum.createdAt}
        />
        <Text style={styles.replyheading}>Replies</Text>
        {forum?.answers.length != 0 && (
          <View>
            {forum?.answers.map((ans, idx) => {
              return <AnswerContainer key={idx} answer={ans} />;
            })}
          </View>
        )}
      </View>
    </ScrollView>
  ) : (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={48} color="#094067" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginHorizontal: 8,
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
  },
  heading: {
    color: "#000",
    fontFamily: "Nunito",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
  },
  answerGrid: {
    display: "flex",
    flexDirection: "column",
    rowGap: 20,
  },
  replyheading: {
    color: "#000",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "300",
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  loaderContainer: {
    // borderColor: "black",
    // borderWidth: 1,
    flex: 1,
    // paddingTop: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ForumOverview;
