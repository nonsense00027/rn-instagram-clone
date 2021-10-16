import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import tw from "tailwind-react-native-classnames";

export default function Carousel({ data, selectImage }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={tw`h-96 w-full`}>
      <SwiperFlatList
        paginationStyleItem={{
          height: 8,
          width: 8,
          marginHorizontal: 4,
        }}
        paginationDefaultColor="rgba(255,255,255,0.3)"
        paginationActiveColor={"black"}
        index={0}
        showPagination
        data={data}
        onChangeIndex={({ index, prevIndex }) => setSelectedIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <TouchableOpacity
              onPress={() => selectImage(selectedIndex)}
              activeOpacity={1}
            >
              <Image
                resizeMode="cover"
                style={{ height: "100%", width: "100%" }}
                source={{ uri: item }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  //   container: { backgroundColor: "white", height: widthD / 1.8 },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.5, textAlign: "center" },
});
