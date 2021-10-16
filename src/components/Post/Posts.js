import React from "react";
import { FlatList } from "react-native";
import PostItem from "./PostItem";
import Stories from "../../screens/Home/Stories";
import { usePostsContext } from "../../contexts";

const Posts = ({ data }) => {
  const { posts } = usePostsContext();
  const renderItem = ({ item }) => <PostItem item={item} />;

  return (
    <FlatList
      data={posts}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={() => <Stories data={data} />}
    />
  );
};

export default Posts;
