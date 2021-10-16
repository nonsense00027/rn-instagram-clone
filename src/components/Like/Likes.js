import React from "react";
import { View, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import LikesItem from "./LikesItem";

const Likes = ({ data }) => {
  const renderItem = ({ item }) => <LikesItem item={item} />;

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={tw`h-2`} />}
      data={data}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  );
};

export default Likes;
