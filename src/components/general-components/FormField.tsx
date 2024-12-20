import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONT_FAMILY } from "../../utils/globalContants";

interface fieldProps {
  inputDesc: string;
  elem: JSX.Element;
}

const FormField = (props: fieldProps) => {
  return (
    <View style={styles.container} >
      <Text  style={styles.title} >{props.inputDesc}</Text>
      <View>{props.elem}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    rowGap: 4,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    fontFamily:FONT_FAMILY.NUNITO_MEDIUM
  },
  elemWrapper: {
    display: "flex",
    // marginLeft: 32
  },
});

export default FormField;
