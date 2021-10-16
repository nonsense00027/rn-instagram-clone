import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import CustomLoading from "../../components/CustomLoading";
import { useAuthContext, useStyleContext } from "../../contexts";
import Socials from "./Socials";
import CustomTextfield from "./CustomTextfield";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email address is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigation = useNavigation();
  const { login, authLoading } = useAuthContext();
  const { theme } = useStyleContext();

  const handleLogin = (values) => {
    login(values.email, values.password);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
      }}
    >
      <View style={tw`items-center`}>
        <Image
          style={tw`h-24 w-24`}
          resizeMode="contain"
          source={{
            uri: "http://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png",
          }}
        />
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={loginSchema}
        // validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <View style={tw`px-5 mt-4`}>
            <CustomTextfield
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              autoFocus={true}
              error={errors.email}
            />
            <CustomTextfield
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              autoFocus={false}
              error={errors.password}
              password={true}
            />
            <Button
              buttonStyle={{
                paddingVertical: 10,
                marginTop: 10,
              }}
              disabledStyle={{
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
              title="Login"
              onPress={handleSubmit}
              disabled={!isValid || !values.email}
            />
          </View>
        )}
      </Formik>

      <View style={tw`px-5 mt-4`}>
        <View style={tw`my-4 flex-row items-center justify-center`}>
          <Text style={[tw`text-center`, { color: theme.text }]}>
            Don't have account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={tw`text-blue-400`}> Register Here</Text>
          </TouchableOpacity>
        </View>

        <Text style={tw`text-center opacity-60`}>or</Text>
        <Socials />
      </View>
      {authLoading && <CustomLoading />}
    </View>
  );
};

export default Login;
