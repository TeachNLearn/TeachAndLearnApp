import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputHolder from "../../components/inputHolder";
// import Button from "../components/general-comp/button";
import { BASE_URL, apiVersion } from "../../utils/apiRoutes";
import axios from "axios";
import { isValidEmail } from "../../utils/helperFunctions";
import { AuthContext } from "../../store/auth-context";

interface loginDataProps {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<loginDataProps>({
    email: "",
    password: "",
  });

  const authCtx = useContext(AuthContext);

  function updateFields(fields: Partial<loginDataProps>) {
    setLoginData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const handleValidation = () => {
    const { email, password } = loginData;
    if (email === "" || password === "") {
      return false;
    } else if (!isValidEmail(email)) {
      return false;
    } else if (password.length < 6) {
      return false;
    }
    return true;
  };

  const loginHandler = async () => {
    console.log(loginData);
    if (handleValidation()) {
      await axios
        .post(`${BASE_URL}${apiVersion}/auth/login`, {
          email: loginData.email,
          password: loginData.password,
        })
        .then(({ data }) => {
          const user = data.data.user;
          console.log(data.token);
          authCtx.authenticate(data.token);
        })
        .catch((data) => {
          console.log(data);
        });
    }
  };

  useEffect(() => {
    // console.log(loginData.email);
  }, [loginData]);

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.text}>Welcome</Text>
        <Text style={styles.text}>back</Text>
        <Text style={styles.smallerText}>Log in to your account</Text>
      </View>
      <View style={styles.formContainer}>
        <InputHolder
          label="Email"
          name="email"
          type="string"
          value={loginData.email}
          placeholderText="Enter Email"
          updateFields={updateFields}
          hasDropdown={false}
        />
        <InputHolder
          label="Password"
          name="password"
          type="password"
          value={loginData.password}
          updateFields={updateFields}
          placeholderText="Enter Password"
          hasDropdown={false}
        />
        {/* <Button onPress={loginHandler}>Login</Button> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    rowGap: 40,
    alignItems: "center",
  },
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
  formContainer: {
    width: "90%",
    // borderWidth: 1,
    // borderColor: "black",
    marginHorizontal: "auto",
    rowGap: 28,
  },
  input: {
    borderColor: "#D5D9EB",
    borderRadius: 8,
    borderWidth: 1.5,
    height: 40,
    margin: 12,
    padding: 10,
    color: "#000000",
    outline: "none",
    fontSize: 16,
    // fontWeight: '400',
  },
  button: {
    borderRadius: 8,
  },
});

export default Login;
