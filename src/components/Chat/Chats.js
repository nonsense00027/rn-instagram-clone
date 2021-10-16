import React from "react";
import { Text, View, FlatList } from "react-native";
import ChatItem from "./ChatItem";
import tw from "tailwind-react-native-classnames";

const chats = [{ id: "1" }, { id: "2" }];
const Chats = ({ data }) => {
  const renderItem = ({ item }) => <ChatItem item={item} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={tw`h-2`}></View>}
      //   horizontal
      renderItem={renderItem}
    />
  );
};

export default Chats;
