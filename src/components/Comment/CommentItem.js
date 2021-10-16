import React from "react";
import { View, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useProfilesContext, useStyleContext } from "../../contexts";
import moment from "moment";

const CommentItem = ({ item }) => {
  const { getUserInfo } = useProfilesContext();
  const { theme } = useStyleContext();

  return (
    <View
      style={[
        tw`flex-row py-2 px-2 rounded-md items-center`,
        { backgroundColor: theme.post },
      ]}
    >
      <Image
        style={tw`h-12 w-12 rounded-full mr-2`}
        source={{ uri: getUserInfo(item.user).profile_image }}
      />
      <View style={tw`flex-1`}>
        <Text style={{ color: theme.text }}>
          <Text style={[tw`font-bold`, { color: theme.text }]}>
            {getUserInfo(item.user).username}{" "}
          </Text>{" "}
          {item.comment}
        </Text>
        <Text style={tw`text-gray-500 text-xs mt-1`}>
          {moment(new Date(item?.timestamp?.toDate())).fromNow()}
        </Text>
      </View>
      <View style={tw`pl-6`}>
        <Icon type="evilicon" name="heart" color={theme.icon} />
      </View>
    </View>
  );
};

export default CommentItem;
