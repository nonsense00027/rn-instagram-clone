import { useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";
import Container from "../../components/Container";
import CustomHeader from "../../components/CustomHeader";
import Likes from "../../components/Like/Likes";

const Like = () => {
  const route = useRoute();

  return (
    <Container>
      <CustomHeader title="Likes" />
      <View style={tw`px-3`}>
        <Likes data={route.params.likes} />
      </View>
    </Container>
  );
};

export default Like;
