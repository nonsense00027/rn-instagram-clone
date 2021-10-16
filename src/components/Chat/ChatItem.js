import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import {
  useProfilesContext,
  useFirebaseContext,
  useAuthContext,
  useStyleContext,
} from "../../contexts";
import { Avatar } from "react-native-elements";
import { collectIdsAndDocs } from "../../shared/utilities";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const ChatItem = ({ item }) => {
  const navigation = useNavigation();
  const { database } = useFirebaseContext();
  const { user } = useAuthContext();
  const { getUserInfo } = useProfilesContext();
  const { theme } = useStyleContext();
  const info = getUserInfo(item.id);
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      database
        .collection("profiles")
        .doc(user.id)
        .collection("chats")
        .doc(item.id)
        .collection("conversations")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );
  return (
    <TouchableOpacity
      style={[
        tw`flex-row py-2 px-2 rounded-md items-center`,
        { backgroundColor: theme.post },
      ]}
      activeOpacity={0.6}
      onPress={() => navigation.navigate("Conversation", { id: item.id })}
    >
      <Avatar
        rounded
        size={45}
        source={{ uri: info.profile_image }}
        title={info.username.split("")[0]}
      />
      <View style={tw`flex-1 px-2`}>
        <View style={tw`flex-row pb-1`}>
          <Text style={[tw`flex-1 font-bold`, { color: theme.text }]}>
            {info.username}
          </Text>
          {messages.length > 0 && (
            <Text style={[tw`opacity-70 text-xs`, { color: theme.text }]}>
              {moment(new Date(messages[0].timestamp?.toDate())).format(
                "h:mm a"
              )}
            </Text>
          )}
        </View>

        {messages.length > 0 && (
          <Text
            style={[tw`opacity-70`, { color: theme.text }]}
            numberOfLines={1}
          >
            {messages[0].message}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
