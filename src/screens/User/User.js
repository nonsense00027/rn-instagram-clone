import { useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import {
  useStyleContext,
  useAuthContext,
  usePostsContext,
  useProfilesContext,
} from "../../contexts";
import { ProfileRoute } from "../../routes/ProfileRoute";
import tw from "tailwind-react-native-classnames";

const User = () => {
  const route = useRoute();
  const { theme } = useStyleContext();
  const { user } = useAuthContext();
  const { getUserInfo, followUser, unfollowUser } = useProfilesContext();
  const { posts } = usePostsContext();

  const info = getUserInfo(route.params.id);

  const getMyPosts = () => {
    return posts.filter((item) => item.user === route.params.id);
  };

  const hasFollowed = () => {
    return info.followers.includes(user.id);
  };

  const handleFollow = () => {
    console.log("click");
    if (hasFollowed()) {
      unfollowUser(route.params.id, info);
    } else {
      followUser(route.params.id, info);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <CustomHeader title={info.username} />
      <ProfileHeader
        user={route.params.id}
        username={info.username}
        profile_image={info.profile_image}
        posts={getMyPosts().length}
        followers={info.followers.length}
        following={info.following.length}
        followed={hasFollowed()}
        handleFollow={handleFollow}
      />

      <View style={[tw`flex-1 pt-4`, { backgroundColor: theme.background }]}>
        <ProfileRoute posts={getMyPosts()} />
      </View>
    </View>
  );
};

export default User;
