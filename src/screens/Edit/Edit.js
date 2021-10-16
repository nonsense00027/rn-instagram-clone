import React from "react";
import { View, Text, TextInput } from "react-native";
import Container from "../../components/Container";
import CustomHeader from "../../components/CustomHeader";
import {
  useAuthContext,
  useProfilesContext,
  useStyleContext,
} from "../../contexts";
import tw from "tailwind-react-native-classnames";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextfield from "../Auth/CustomTextfield";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  fullname: Yup.string().required("Fullname is required"),
});

const Edit = () => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { theme } = useStyleContext();
  const { editProfile } = useProfilesContext();
  const handleSubmit = (values) => {
    editProfile(values)
      .then((res) => navigation.goBack())
      .catch(() => console.log("something went wrong"));
  };
  return (
    <Container>
      <CustomHeader title="Edit Profile" />

      <Formik
        initialValues={{
          username: user.username,
          fullname: user.fullname || "",
        }}
        onSubmit={(values) => handleSubmit(values)}
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
              label="Username"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              autoFocus={true}
              error={errors.username}
            />
            <CustomTextfield
              label="Full name"
              value={values.fullname}
              onChangeText={handleChange("fullname")}
              onBlur={handleBlur("fullname")}
              autoFocus={false}
              error={errors.fullname}
            />
            <Button
              buttonStyle={{
                paddingVertical: 10,
                marginTop: 10,
              }}
              disabledStyle={{
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
              title="Save"
              onPress={handleSubmit}
              disabled={!isValid || !values.username}
            />
          </View>
        )}
      </Formik>
    </Container>
  );
};

export default Edit;
