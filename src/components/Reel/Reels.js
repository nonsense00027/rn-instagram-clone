import React, { useRef, useState } from "react";
import { FlatList, Dimensions } from "react-native";
import ReelsItem from "./ReelsItem";

const Reels = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const renderItem = ({ item, index }) => (
    <ReelsItem item={item} index={index} activeIndex={activeIndex} />
  );
  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    setActiveIndex(viewableItems);
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <FlatList
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      data={data}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      snapToInterval={Dimensions.get("window").height - 48}
      snapToAlignment={"start"}
      decelerationRate={"fast"}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default Reels;
