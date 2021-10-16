import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useRoute } from "@react-navigation/native";

const Posts = () => {
  const route = useRoute();

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={[tw`h-40 w-full`, { flex: 1 / 3 }]}>
      <Image
        style={tw`h-full w-full`}
        resizeMode="cover"
        source={{ uri: item.image[0] }}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={route.params?.posts}
      horizontal={false}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default Posts;
