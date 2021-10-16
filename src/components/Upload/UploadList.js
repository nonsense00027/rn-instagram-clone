import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import UploadItem from "./UploadItem";

export default function UploadList({ items, action, handleAddPhoto, type }) {
  const renderItem = ({ item }) => (
    <UploadItem
      item={item}
      action={action}
      handleAddPhoto={handleAddPhoto}
      type={type}
    />
  );

  return (
    <View>
      <FlatList
        ItemSeparatorComponent={() => <View style={tw`w-2`} />}
        data={items}
        horizontal={true}
        keyExtractor={(item) => item.uri.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
