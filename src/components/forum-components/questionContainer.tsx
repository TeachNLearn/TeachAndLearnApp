import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface questionProps {
  tagline: string;
  question: string;
  upvotes: string[];
  forumId: string;
  //   userId: string;
  userToken: string;
  createdBy: {
    _id: string;
    userName: string;
    name: string;
    photo: string;
  };
  noAnswers: boolean;
  createdAt: string;
}

const QuestionContainer = (props: questionProps) => {
  const userImg = props.createdBy.photo;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.heading}>{props.tagline}</Text>
        </View>
        <View style={styles.userDetails}>
          <View style={styles.userChip}>
            <Image style={styles.image} source={{ uri: userImg }} />
            <Text style={styles.userText}>@{props.createdBy.userName}</Text>
          </View>
          <View style={styles.dot}></View>
          <Text style={styles.userText}>
            {moment(props.createdAt).fromNow()}
          </Text>
        </View>
        <View>
          <Text style={styles.question}>{props.question}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    // marginHorizontal: 8,
    paddingHorizontal: 6,
    paddingBottom: 20,
    borderBottomColor: "#D0D5DD",
    borderBottomWidth: 2,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 12,
  },
  heading: {
    color: "#000",
    // fontFamily: "Nunito",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "700",
  },
  userDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginBottom: 6,
  },
  userChip: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  userText: {
    color: "#000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: "black",
  },
  image: {
    width: 34,
    height: 34,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1,
  },
  question: {
    color: "#4A5578",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
});

export default QuestionContainer;
