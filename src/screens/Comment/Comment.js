import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Comments from "../../components/Comment/Comments";
import {
  useStyleContext,
  usePostsContext,
  useFirebaseContext,
  useAuthContext,
} from "../../contexts";
import { collectIdsAndDocs } from "../../shared/utilities";
import { Button } from "react-native-elements";
import CustomHeader from "../../components/CustomHeader";

const Comment = () => {
  const route = useRoute();
  const { theme } = useStyleContext();
  const { database } = useFirebaseContext();
  const { user } = useAuthContext();
  const { addComment } = usePostsContext();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(
    () =>
      database
        .collection(route.params.type)
        .doc(route.params.id)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setComments(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );

  const handleComment = () => {
    const { type, ...data } = route.params;
    addComment(data, comment, type).then((res) => {
      setComment("");
    });
  };

  return (
    <View style={[tw`flex-1`, { backgroundColor: theme.background }]}>
      <CustomHeader title="Comments" canShare={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
        keyboardVerticalOffset={50}
      >
        <View style={tw`flex-1 px-3`}>
          <View style={{ flex: 1 }}>
            <Comments data={comments} />
          </View>
        </View>

        {/* ADD COMMENT */}
        <View
          style={[
            tw`flex-row items-center py-3 px-5`,
            { borderTopColor: "lightgray", borderTopWidth: 0.2 },
          ]}
        >
          <Image
            style={tw`h-10 w-10 rounded-full mr-4`}
            resizeMode="cover"
            source={{ uri: user.profile_image }}
          />
          <TextInput
            style={[
              tw` flex-1 h-full rounded-md px-2`,
              { backgroundColor: theme.post, color: theme.text },
            ]}
            selectionColor={theme.text}
            multiline={true}
            numberOfLines={4}
            placeholder="Add a comment..."
            placeholderTextColor={theme.placeholder}
            value={comment}
            onChangeText={(text) => setComment(text)}
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
            disabled={comment.length < 1}
            title="Post"
            onPress={handleComment}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Comment;
