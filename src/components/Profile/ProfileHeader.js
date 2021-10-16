import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Avatar, Button } from "react-native-elements";
import { useStyleContext } from "../../contexts/StyleContext";
import { useNavigation } from "@react-navigation/native";

function ActionButton({ title, followed, action }) {
  const { theme } = useStyleContext();
  return (
    <Button
      containerStyle={{ flex: 1, marginHorizontal: 2 }}
      buttonStyle={{
        backgroundColor: followed ? "#0275d8" : theme.background,
        borderColor: "lightgray",
        borderWidth: 1,
        paddingVertical: 6,
      }}
      titleStyle={{ color: followed ? "white" : theme.text, fontSize: 14 }}
      title={title}
      onPress={action}
    />
  );
}
const ProfileHeader = ({
  user,
  username,
  profile_image,
  posts,
  followers,
  following,
  followed,
  handleFollow,
}) => {
  const navigation = useNavigation();
  const { theme } = useStyleContext();

  const handleMessage = () => {
    navigation.navigate("Conversation", { id: user });
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <View style={tw`items-center`}>
        <View>
          <Avatar
            size={100}
            rounded
            title={username.split("")[0]}
            source={{
              uri: profile_image,
            }}
          />
        </View>
        <Text style={[tw`mt-2 font-bold`, { color: theme.text }]}>
          {username}
        </Text>
      </View>
      <View style={tw`flex-grow`}>
        <View style={tw`flex-1 flex-row items-center justify-evenly`}>
          <View style={tw`items-center`}>
            <Text style={[tw`font-semibold text-2xl`, { color: theme.text }]}>
              {posts}
            </Text>
            <Text style={{ color: theme.text }}>Posts</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={[tw`font-semibold text-2xl`, { color: theme.text }]}>
              {followers}
            </Text>
            <Text style={{ color: theme.text }}>Followers</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={[tw`font-semibold text-2xl`, { color: theme.text }]}>
              {following}
            </Text>
            <Text style={{ color: theme.text }}>Following</Text>
          </View>
        </View>
        <View style={tw`px-2 flex-row`}>
          <ActionButton
            title={followed ? "Unfollow" : "Follow"}
            followed={followed}
            action={handleFollow}
          />
          <ActionButton title="Message" action={handleMessage} />
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});
