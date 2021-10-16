import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import tw from "tailwind-react-native-classnames";

function Carousel({ data, startIndex }) {
  return (
    <View style={tw`h-full w-full`}>
      <SwiperFlatList
        index={startIndex}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <TouchableOpacity activeOpacity={1}>
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

export default function CarouselModal({
  showModal,
  setShowModal,
  selectedImage,
  startIndex,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={tw`bg-black z-10 w-full h-full justify-center`}
        onPress={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback style={tw`h-4/6`}>
          <View style={tw`items-center justify-center h-4/6`}>
            <Carousel data={selectedImage} startIndex={startIndex} />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  child: { width, justifyContent: "center" },
});
