import React from "react";
import { StyleSheet, View } from "react-native";
import InputHolder from "../input/inputHolder";

interface SignUpData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type SignupFormProps = SignUpData & {
  updateFields: (fields: Partial<SignUpData>) => void;
};

const SignupForm = (props: SignupFormProps) => {
  return (
    <View style={styles.formContainer}>
      <InputHolder
        type="text"
        label="Full Name"
        value={props.fullName}
        name="fullName"
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Full Name"
      />
      <InputHolder
        type="text"
        label="Username (publicly visible)"
        value={props.userName}
        name="userName"
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Username (publicly visible)"
      />
      <InputHolder
        type="email"
        label="Email"
        name="email"
        value={props.email}
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Email"
      />
      <InputHolder
        type="password"
        label="Password"
        name="password"
        value={props.password}
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Password"
      />
      <InputHolder
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        value={props.confirmPassword}
        updateFields={props.updateFields}
        // isRequired={true}
        placeholderText="Confirm Password"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 28,
  },
});

export default SignupForm;
