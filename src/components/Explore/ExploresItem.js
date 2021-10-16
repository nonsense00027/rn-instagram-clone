import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import {
  useProfilesContext,
  useStyleContext,
  useAuthContext,
} from "../../contexts";
import { useNavigation } from "@react-navigation/native";

const ExploresItem = ({ item }) => {
  const navigation = useNavigation();
  const { followUser } = useProfilesContext();
  const { theme } = useStyleContext();
  const { user } = useAuthContext();

  const showFollowButton = () => {
    return !user.following.includes(item.id) && user.id !== item.id;
  };

  const isOwner = () => {
    return user.id === item.id;
  };

  const goToProfile = () => {
    if (item.id === user.id) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("User", { id: item.id });
    }
  };

  const handleFollow = () => {
    followUser(item.id, item);
  };

  return (
    <View
      style={[
        tw`flex-row py-2 px-2 rounded-md items-center`,
        { backgroundColor: theme.post },
      ]}
    >
      <TouchableOpacity
        style={tw`flex-row flex-grow items-center`}
        onPress={goToProfile}
      >
        <Image
          style={tw`h-12 w-12 rounded-full mr-2`}
          source={{ uri: item.profile_image }}
        />
        <View>
          <Text style={[tw`font-semibold`, { color: theme.text }]}>
            {item.username}
          </Text>
          <Text style={[tw`text-xs opacity-60`, { color: theme.text }]}>
            {item.email}
          </Text>
          <Text style={[tw`text-xs opacity-60`, { color: theme.text }]}>
            Popular
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        {showFollowButton() ? (
          <Button
            titleStyle={tw`text-sm`}
            title="Follow"
            onPress={handleFollow}
          />
        ) : (
          <View style={tw`px-3`}>
            {isOwner() ? (
              <Text style={{ color: theme.text }}>You</Text>
            ) : (
              <Icon type="evilicon" name="check" color={theme.icon} />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ExploresItem;
