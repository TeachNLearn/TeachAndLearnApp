import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { answerProps } from "../../types/ForumTypes";


interface answersProps {
  answer: answerProps;
}

const AnswerContainer = ({ answer }: answersProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <View style={styles.userChip}>
          <Image
            style={styles.image}
            source={{ uri: answer.answeredBy.photo }}
          />
          <Text style={styles.userText}>@{answer.answeredBy.name}</Text>
        </View>
        <View style={styles.dot}></View>
        <Text style={styles.userText}>
          {moment(answer.createdAt).fromNow()}
        </Text>
      </View>
      <View>
        <Text style={styles.answerText}>{answer.answer}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
  },
  userDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginBottom: 8,
  },
  userChip: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  userText: {
    color: "#000",
    fontSize: 14,
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
    width: 26,
    height: 26,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1,
  },
  answerText: {
    color: "#4A5578",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
  },
});

export default AnswerContainer;
