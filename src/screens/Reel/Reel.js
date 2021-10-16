import * as React from "react";
import { View } from "react-native";
import Reels from "../../components/Reel/Reels";
import { usePostsContext } from "../../contexts/PostsContext";

export default function Reel() {
  const { reels } = usePostsContext();
  return (
    <View style={{ backgroundColor: "black" }}>
      <Reels data={reels} />
    </View>
  );
}
