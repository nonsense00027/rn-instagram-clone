import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import {
  useAuthContext,
  useStoriesContext,
  useStyleContext,
} from "../../contexts";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Stories = ({ data }) => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { theme } = useStyleContext();
  const { getStories } = useStoriesContext();

  const handlePersonalStory = () => {
    const stories = getStories(user.id);
    if (stories.length > 0) {
      // console.log("naa", stories);
      navigation.navigate("Story", { stories: stories });
    } else {
      navigation.navigate("StoryUpload");
    }
  };

  const handleStory = (item) => {
    if (item.id === user.id) {
      handlePersonalStory();
    } else {
      const stories = getStories(item.id);
      if (stories.length > 0) {
        navigation.navigate("Story", { stories: stories });
      } else {
        navigation.navigate("User", { id: item.id });
      }
    }
  };

  const hasStories = (item) => {
    return getStories(item.id).length > 0;
  };

  const renderItem = ({ item }) => (
    <View style={[tw`w-16 items-center justify-center`]}>
      {item.id === user.id && (
        <TouchableOpacity
          style={[
            tw`absolute bottom-5 right-1 z-10 rounded-full h-6 w-6 items-center justify-center border-white`,
            { borderWidth: 2, backgroundColor: "#0275d8" },
          ]}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("StoryUpload")}
        >
          <Icon type="font-awesome" name="plus" size={10} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={tw`h-16 w-16 rounded-full`}
        activeOpacity={0.5}
        onPress={() => handleStory(item)}
      >
        <Image
          style={[
            tw`h-16 w-16 rounded-full`,
            { borderWidth: hasStories(item) ? 3 : 0, borderColor: "#0275d8" },
          ]}
          resizeMode="cover"
          source={{ uri: item.image || item.profile_image }}
        />
      </TouchableOpacity>
      <Text style={[tw`text-xs mt-2`, { color: theme.text }]} numberOfLines={1}>
        {item.user || item.username}
      </Text>
    </View>
  );

  return (
    <View style={tw`px-3 py-4`}>
      <FlatList
        ItemSeparatorComponent={() => <View style={tw`w-3`} />}
        data={[user, ...data]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Stories;
