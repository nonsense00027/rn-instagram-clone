import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import ExploresItem from "./ExploresItem";

const Explores = ({ data }) => {
  const renderItem = ({ item }) => <ExploresItem item={item} />;

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

export default Explores;
