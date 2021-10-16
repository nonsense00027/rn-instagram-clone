import React from "react";
import { StyleSheet, FlatList } from "react-native";
import ConversationsItem from "./ConversationsItem";

const Conversations = ({ data }) => {
  const renderItem = ({ item }) => <ConversationsItem item={item} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      inverted
    />
  );
};

export default Conversations;

const styles = StyleSheet.create({});
