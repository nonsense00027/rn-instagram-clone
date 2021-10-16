import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import Chats from "../../components/Chat/Chats";
import Container from "../../components/Container";
import { useChatsContext, useStyleContext } from "../../contexts";

const Chat = () => {
  const { theme } = useStyleContext();
  const { chats } = useChatsContext();

  return (
    <Container>
      <View style={tw`flex-1 px-3`}>
        <View style={tw`flex-row justify-between items-center px-4 py-4`}>
          <Text style={[tw`text-2xl font-semibold`, { color: theme.text }]}>
            Chats
          </Text>
          <TouchableOpacity>
            <Icon
              type="font-awesome"
              name="pencil-square-o"
              color={theme.icon}
            />
          </TouchableOpacity>
        </View>
        {chats.length > 0 ? (
          <View>
            <Chats data={chats} />
          </View>
        ) : (
          <View style={tw`flex-1 justify-center items-center opacity-70`}>
            <Icon
              type="ant-design"
              name="instagram"
              color={theme.icon}
              size={50}
            />
            <Text style={[tw`pt-2`, { color: theme.text }]}>
              Connect with other people..
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};

export default Chat;
