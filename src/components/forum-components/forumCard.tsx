import React from "react";
import { forumProps } from "../../types/ForumTypes";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styled } from "styled-components/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const Section = styled.TouchableOpacity`
  /* border: 1px solid red; */
  background: #094067;
  /* box-shadow: -4px 12px 16px -4px rgba(16, 24, 40, 0.08), */
  /* -2px 4px 6px -2px rgba(16, 24, 40, 0.03); */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 32px;
  gap: 16px;
  cursor: pointer;
  /* transition: all 0.15s linear; */
`;

const Question = styled.Text`
  color: #d8eefe;
  /* font-family: "Nunito"; */
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 36px;
`;

const Details = styled.View`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`;

type forumCardProps = forumProps & {
  userToken: string;
};

const ForumCard = (props: forumCardProps) => {
  type RootStackParamList = {
    ForumOverview: { id: string } | undefined;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const forumNavigator = () => {
    navigation.navigate(`ForumOverview`, {
      id: props._id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={forumNavigator}>
      <View>
        <Text style={styles.topic}>{props.topic}</Text>
      </View>
      <View>
        {props.tagline.length > 85 ? (
          <Text style={styles.question}>
            {props.tagline.slice(0, 84)}
            &nbsp;
            <Text>...</Text>
          </Text>
        ) : (
          <Text style={styles.question}>{props.tagline}</Text>
        )}
      </View>
      <View style={styles.userDetails}>
        <Text style={styles.userText}>@{props.createdBy.userName}</Text>
        <View style={styles.dot}></View>
        <Text style={styles.userText}>{moment(props.createdAt).fromNow()}</Text>
      </View>
      <View style={styles.stats}>
        <View>
          {/* <Plus color="#fff" /> */}
          <Text style={styles.userText}>{props.upvotes.length}</Text>
        </View>
        <View>
          {/* <Comments /> */}
          <Text style={styles.userText}>{props.answers.length}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#094067",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 32,
    paddingVertical: 20,
    rowGap: 12,
    cursor: "pointer",
  },
  topic: {
    color: "#ef4565",
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "600",
  },
  question: {
    fontWeight: "600",
    fontSize: 22,
    color: "#d8eefe",
    fontStyle: "normal",
    lineHeight: 28,
  },
  userDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 14,
  },
  userText: {
    fontWeight: "500",
    fontSize: 16,
    color: "#ffffff",
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
});

export default ForumCard;
