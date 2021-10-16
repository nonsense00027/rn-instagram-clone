import { useNavigation } from "@react-navigation/native";
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
  SafeAreaView,
} from "react-native";
import { Avatar } from "react-native-elements";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import tw from "tailwind-react-native-classnames";
import { useProfilesContext, useStyleContext } from "../../contexts";
import logo from "../../assets/img/logo.png";

const sampleData = [{ id: "1", image: logo }];
function Carousel({ data }) {
  console.log("data here", data);
  return (
    <View style={tw`h-full w-full`}>
      <SwiperFlatList
        index={0}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <TouchableOpacity activeOpacity={1}>
              <Image
                resizeMode="cover"
                style={{ height: "100%", width: "100%" }}
                source={{ uri: item.image }}
                // source={item.image}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default function StoryCarousel({ data }) {
  const navigation = useNavigation();
  const { getUserInfo } = useProfilesContext();
  const { theme } = useStyleContext();
  // console.log("data here", data);
  const info = getUserInfo(data[0]?.user);
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1 bg-white`}>
        <TouchableOpacity
          activeOpacity={1}
          style={tw`bg-black z-10 w-full h-full justify-center`}
          onPress={() => navigation.navigate("Main")}
        >
          <View style={tw`absolute top-4 left-4 w-full flex-row items-center`}>
            <Avatar source={{ uri: info.profile_image }} rounded size={50} />
            {/* <Avatar title="ns" rounded size={50} /> */}
            {/* <Text style={tw`text-white font-semibold`}>{info.username}</Text> */}
            <View style={tw`ml-2`}>
              <Text style={tw`text-white font-semibold`}>nonsense27</Text>
              <Text style={tw`text-white font-semibold text-xs opacity-70`}>
                Popular
              </Text>
            </View>
          </View>
          <TouchableWithoutFeedback style={tw`h-4/6`}>
            <View style={tw`items-center justify-center h-4/6`}>
              <Carousel data={data} />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  child: { width, justifyContent: "center" },
});
