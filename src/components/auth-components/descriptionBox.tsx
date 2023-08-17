import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";

const DescriptionBox = () => {
  return (
    <View style={styles.upperContainer}>
      <Text style={styles.text}>Welcome</Text>
      <Text style={styles.text}>back</Text>
      <Text style={styles.smallerText}>Log in to your account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: "#094067",
    width: "100%",
    paddingTop: 90,
    paddingBottom: 30,
    paddingLeft: 16,
  },
  text: {
    color: "#FFFFFF",
    // font-family: Nunito;
    fontSize: 46,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 52,
  },
  smallerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "300",
    marginTop: 12,
    // lineHeight: 1,
  },
});

export default DescriptionBox;
