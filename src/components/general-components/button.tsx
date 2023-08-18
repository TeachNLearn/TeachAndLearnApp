import React from "react";
import { StyleSheet, Text } from "react-native";
import { Pressable, View } from "react-native";

interface btnProps {
  children: string;
  onPress: any;
}

const Button = ({ children, onPress }: btnProps) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable style={styles.pressableContainer} onPress={onPress}>
        <View>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    // borderWidth: 1,
    // borderColor: "black",
    // paddingHorizontal: 20,
    paddingVertical: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#094067",
    marginTop: 10,
  },
  pressableContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
    // borderColor: "white",
    // borderWidth: 2,
  },
  text: {
    color: "#FFF",
    // font-family: Nunito;
    fontSize: 18,
    // fontStyle: "normal",
    fontWeight: "400",
    // line-height: normal;
  },
});

export default Button;
