import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useStyleContext, useAuthContext } from "../../contexts";

const ConversationsItem = ({ item }) => {
  const { user } = useAuthContext();
  const { theme, isDarkMode } = useStyleContext();

  return (
    <View
      style={[
        tw`${
          user.id === item.user ? "self-end" : "self-start border-white"
        } px-6 rounded-xl py-2 mx-2 my-1`,
        {
          backgroundColor:
            user.id === item.user ? "#DBDCDB" : theme.senderBubble,
          maxWidth: "75%",
          borderWidth: isDarkMode ? 0.2 : 0,
        },
      ]}
    >
      <Text
        style={[
          tw`${user.id === item.user ? "text-gray-700" : "text-white"}`,
          { fontSize: 16 },
        ]}
      >
        {item.message}
      </Text>
    </View>
  );
};

export default ConversationsItem;

const styles = StyleSheet.create({});
