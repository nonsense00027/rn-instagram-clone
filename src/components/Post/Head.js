import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import {
  useAuthContext,
  useProfilesContext,
  useStyleContext,
} from "../../contexts";
import tw from "tailwind-react-native-classnames";
import { Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { usePostsContext } from "../../contexts/PostsContext";

const Head = ({ item, postRef }) => {
  const navigation = useNavigation();
  const { theme } = useStyleContext();
  const { user } = useAuthContext();
  const { getUserInfo } = useProfilesContext();
  const { editPost, deletePost } = usePostsContext();
  const [showOption, setShowOption] = useState(false);
  const [captionEditing, setCaptionEditing] = useState(false);
  const [newCaption, setNewCaption] = useState(item.caption || "");

  const goToProfile = () => {
    if (item.user === user.id) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("User", { id: item.user });
    }
  };

  const handleEditCaption = () => {
    setCaptionEditing(true);
  };

  const handleCancelEdit = () => {
    setNewCaption(item.caption);
    setCaptionEditing(false);
    setShowOption(false);
  };

  const handleEditSave = () => {
    editPost(item.id, newCaption);
    handleCancelEdit();
  };

  const isOwner = () => {
    return item.user === user.id;
  };

  const handleOption = () => {
    setShowOption((prevOption) => !prevOption);
  };

  const handleDeletePost = () => {
    postRef.current.animate("bounceOut");
    setTimeout(() => {
      deletePost(item);
    }, 550);
  };

  return (
    <View
      style={[
        tw`border-t py-3 px-4`,
        { borderColor: theme.background, backgroundColor: theme.post },
      ]}
    >
      <View style={tw`flex-row justify-between`}>
        <View>
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={goToProfile}
          >
            <Image
              style={tw`h-9 w-9 rounded-full mr-2`}
              resizeMode="cover"
              source={{ uri: getUserInfo(item.user)?.profile_image }}
            />
            <Text style={[tw`font-bold`, { color: theme.text }]}>
              {getUserInfo(item.user)?.username}
            </Text>
          </TouchableOpacity>
          {captionEditing ? (
            <TextInput
              style={[
                tw`py-2 px-2 rounded-sm mt-2`,
                { backgroundColor: theme.background, color: theme.text },
              ]}
              multiline={true}
              value={newCaption}
              autoFocus={true}
              onChangeText={(text) => setNewCaption(text)}
            />
          ) : (
            <Text style={[tw`mt-2 z-10`, { color: theme.text }]}>
              {item.caption}
            </Text>
          )}
        </View>

        {captionEditing ? (
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity style={tw`mr-1`} onPress={handleCancelEdit}>
              <Icon
                style={tw`mr-2`}
                type="evilicon"
                name="close-o"
                color={theme.icon}
              />
            </TouchableOpacity>
            <Button
              icon={
                <Icon
                  style={tw`mr-2`}
                  type="evilicon"
                  name="check"
                  color="white"
                />
              }
              buttonStyle={tw`py-1`}
              titleStyle={tw`text-sm -ml-2`}
              title="Save"
              onPress={handleEditSave}
            />
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={handleOption}>
              {showOption ? (
                <Icon
                  type="font-awesome"
                  name="close"
                  size={16}
                  color={theme.icon}
                />
              ) : (
                <Icon
                  type="entypo"
                  name="dots-three-vertical"
                  size={16}
                  color={theme.icon}
                />
              )}
            </TouchableOpacity>

            {showOption && (
              <View
                style={[
                  tw`absolute right-6 top-0 w-36 rounded-sm px-2 py-2 z-50`,
                  {
                    borderWidth: 0.5,
                    borderColor: theme.placeholder,
                    backgroundColor: theme.post,
                    zIndex: 999,
                  },
                ]}
              >
                {isOwner() ? (
                  <>
                    <TouchableOpacity
                      style={tw`py-1`}
                      onPress={handleEditCaption}
                    >
                      <Text style={{ color: theme.text }}>Edit Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={tw`py-1`}
                      onPress={handleDeletePost}
                    >
                      <Text style={{ color: theme.text }}>Delete Post</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity>
                    <Text style={{ color: theme.text }}>Report Post</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Head;
