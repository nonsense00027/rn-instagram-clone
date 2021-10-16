import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Container from "../../components/Container";
import tw from "tailwind-react-native-classnames";
import { Button, Icon } from "react-native-elements";
import Conversations from "../../components/Conversation/Conversations";
import {
  useChatsContext,
  useAuthContext,
  useFirebaseContext,
  useProfilesContext,
  useStyleContext,
} from "../../contexts";
import { collectIdsAndDocs } from "../../shared/utilities";
import moment from "moment";

const Conversation = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { getUserInfo } = useProfilesContext();
  const { theme } = useStyleContext();
  const { database } = useFirebaseContext();
  const { user } = useAuthContext();
  const { sendMessage } = useChatsContext();
  const info = getUserInfo(route.params.id);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(
    () =>
      database
        .collection("profiles")
        .doc(user.id)
        .collection("chats")
        .doc(route.params.id)
        .collection("conversations")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );

  const handleSendMessage = () => {
    setMessage("");

    sendMessage(route.params.id, message).then((res) => {});
  };

  return (
    <Container>
      <View
        style={[
          tw`flex-row p-3 items-center`,
          { borderBottomWidth: 0.2, borderBottomColor: "lightgray" },
        ]}
      >
        <TouchableOpacity style={tw`pr-4`} onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            type="material-community"
            size={30}
            color={theme.icon}
          />
        </TouchableOpacity>

        <Image
          style={tw`h-12 w-12 rounded-full mr-1`}
          resizeMode="cover"
          source={{ uri: info.profile_image }}
        />
        <View style={tw`pl-2`}>
          <Text
            style={[
              tw`text-black font-semibold`,
              { color: theme.text, fontSize: 16 },
            ]}
          >
            {info.username}
          </Text>
          {messages.length > 0 && messages[0].timestamp && (
            <Text style={[tw`opacity-70`, { color: theme.text }]}>
              {moment(new Date(messages[0].timestamp?.toDate())).fromNow()}
            </Text>
          )}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
        keyboardVerticalOffset={50}
      >
        <Conversations data={messages} />

        <View
          style={[
            tw`flex-row items-center py-3 px-5 mt-2`,
            { borderTopWidth: 0.2, borderTopColor: "lightgray" },
          ]}
        >
          <TextInput
            style={[
              tw`flex-grow h-full rounded-md px-2`,
              { backgroundColor: theme.post, color: theme.text },
            ]}
            selectionColor={theme.text}
            placeholderTextColor={theme.placeholder}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <Button
            disabledStyle={{
              backgroundColor: theme.background,
            }}
            buttonStyle={{
              backgroundColor: theme.background,
            }}
            titleStyle={{
              color: "#0275d8",
            }}
            disabled={message.length < 1}
            icon={
              <Icon
                type="material"
                name="send"
                color={message.length < 1 ? "gray" : theme.icon}
              />
            }
            onPress={handleSendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Conversation;
