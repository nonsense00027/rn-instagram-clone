import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import {
  useAuthContext,
  useStyleContext,
  usePostsContext,
  useFirebaseContext,
  useProfilesContext,
} from "../../contexts";
import { useNavigation } from "@react-navigation/native";
import { collectIdsAndDocs } from "../../shared/utilities";

const Reactions = ({ item, type, showBookmark }) => {
  const navigation = useNavigation();
  const { theme } = useStyleContext();
  const { user } = useAuthContext();
  const { database } = useFirebaseContext();
  const { likePost, unlikePost } = usePostsContext();
  const { addBookmark, removeBookmark } = useProfilesContext();
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      database
        .collection(type)
        .doc(item.id)
        .collection("comments")
        .onSnapshot((snapshot) =>
          setComments(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );
  const hasLiked = () => {
    return item.likes.includes(user.id);
  };

  const hasComment = () => {
    return comments.some((item) => item.user === user.id);
  };

  const hasBookmarked = () => {
    return user.bookmarks.includes(item.id);
  };

  const handleLike = () => {
    if (hasLiked()) {
      unlikePost(item, type);
    } else {
      likePost(item, type);
    }
  };

  const handleBookmark = () => {
    if (hasBookmarked()) {
      removeBookmark(item.id);
    } else {
      addBookmark(item.id);
    }
  };
  return (
    <View>
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-row`}>
          <TouchableOpacity onPress={handleLike}>
            {hasLiked() ? (
              <Icon type="antdesign" name="heart" size={30} color="#CB3D5C" />
            ) : (
              <Icon
                type="antdesign"
                name="hearto"
                size={30}
                color={theme.icon}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`mx-3`}
            onPress={() => navigation.navigate("Comment", { ...item, type })}
          >
            {hasComment() ? (
              <Icon
                type="ionicon"
                name="chatbubble"
                size={30}
                color="#3D900B"
              />
            ) : (
              <Icon
                type="ionicon"
                name="chatbubble-outline"
                size={30}
                color={theme.icon}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon type="feather" name="send" size={30} color={theme.icon} />
          </TouchableOpacity>
        </View>
        {showBookmark && (
          <View>
            <TouchableOpacity style={tw`mx-2`} onPress={handleBookmark}>
              {hasBookmarked() ? (
                <Icon
                  type="font-awesome"
                  name="bookmark"
                  size={30}
                  color="#0275d8"
                />
              ) : (
                <Icon
                  type="font-awesome"
                  name="bookmark-o"
                  size={30}
                  color={theme.icon}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={tw`py-1`}>
        {item.likes.length > 0 ? (
          <TouchableOpacity
            style={tw`py-1`}
            onPress={() => navigation.navigate("Like", item)}
          >
            <Text style={([tw`font-bold text-sm`], { color: theme.text })}>
              {item.likes.length} {item.likes.length > 1 ? "likes" : "like"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={[tw`opacity-50 text-sm`, { color: theme.text }]}>
            Be the first one to like
          </Text>
        )}

        {comments.length > 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Comment", { ...item, type })}
          >
            <Text style={[tw`opacity-60`, { color: theme.text }]}>
              View {comments.length > 1 && "all"} {comments.length}{" "}
              {comments.length > 1 ? "comments" : "comment"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Reactions;
