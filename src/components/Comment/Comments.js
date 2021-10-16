import React from "react";
import { View, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import CommentItem from "./CommentItem";

const Comments = ({ data }) => {
  const renderItem = ({ item }) => <CommentItem item={item} />;

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={tw`h-2`} />}
      data={data}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default Comments;
