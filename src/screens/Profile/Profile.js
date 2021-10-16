import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import {
  useStyleContext,
  usePostsContext,
  useFirebaseContext,
  useAuthContext,
} from "../../contexts";
import { ProfileRoute } from "../../routes/ProfileRoute";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import faker from "faker";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";

function ProfileStat({ stat, title, theme }) {
  return (
    <View style={tw`items-center`}>
      <Text style={[tw`font-semibold text-2xl`, { color: theme.text }]}>
        {stat}
      </Text>
      <Text style={{ color: theme.text }}>{title}</Text>
    </View>
  );
}

const Profile = () => {
  const navigation = useNavigation();
  const { database, storage } = useFirebaseContext();
  const { user } = useAuthContext();
  const { posts } = usePostsContext();
  const { theme } = useStyleContext();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMyPosts = () => {
    return posts.filter((item) => item.user === user.id);
  };
  const getMyBookmarks = () => {
    return posts.filter((item) => user.bookmarks.includes(item.id));
  };

  const uploadImage = async () => {
    setLoading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const key = faker.datatype.uuid();
    var ref = storage.ref(`profile_images/${user.id}/${key}`);
    await ref.put(blob);

    ref
      .getDownloadURL()
      .then((url) => {
        database
          .collection("profiles")
          .doc(user.id)
          .set({ profile_image: url }, { merge: true })
          .then((res) => {
            setImage(null);
            setLoading(false);
          });
      })
      .catch((err) => console.log(err));
  };

  const pickFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        setImage(data);
      }
    } else {
      Alert.alert("Camera Permission Needed");
    }
  };

  return (
    <Container>
      {/* HEAD */}
      <View style={tw`flex-row items-center px-4`}>
        <View style={tw`items-center`}>
          <View>
            <TouchableOpacity
              style={tw`absolute bottom-0 z-10 right-0 bg-gray-200 rounded-full h-9 w-9 items-center justify-center ${
                !image && "bg-opacity-60"
              } border-2 border-white`}
              onPress={image ? uploadImage : pickFromGallery}
            >
              {image ? (
                <Icon type="font-awesome" name="check" color="#0275d8" />
              ) : (
                <Icon type="material" name="add-photo-alternate" color="gray" />
              )}
            </TouchableOpacity>
            {image && (
              <TouchableOpacity
                style={tw`absolute bottom-0 z-10 left-0 bg-gray-200 rounded-full h-9 w-9 items-center justify-center ${
                  !image && "bg-opacity-60"
                } border-2 border-white`}
                onPress={() => setImage(null)}
              >
                <Icon type="font-awesome" name="close" color="gray" />
              </TouchableOpacity>
            )}

            <Avatar
              size={100}
              rounded
              title={user.username.split("")[0]}
              source={{
                uri: image?.uri || user.profile_image,
              }}
            />
          </View>
          <Text style={{ color: theme.text, marginTop: 10, fontWeight: "600" }}>
            {user.username}
          </Text>
        </View>
        <View style={tw`flex-grow`}>
          <TouchableOpacity
            style={tw`items-center justify-end flex-row absolute right-0 top-1 z-10`}
            onPress={() => navigation.navigate("Settings")}
          >
            <Text style={[tw`mr-1`, { color: theme.text }]}>Settings</Text>
            <Icon type="ionicon" name="settings-outline" color={theme.icon} />
          </TouchableOpacity>
          <View style={tw`flex-1 flex-row items-center justify-evenly`}>
            <ProfileStat
              title="Posts"
              stat={getMyPosts().length}
              theme={theme}
            />
            <ProfileStat
              title="Followers"
              stat={user.followers.length}
              theme={theme}
            />
            <ProfileStat
              title="Following"
              stat={user.following.length}
              theme={theme}
            />
          </View>
        </View>
      </View>

      {/* PROFILE ROUTE */}
      <View style={tw`mt-4 flex-1`}>
        <ProfileRoute posts={getMyPosts()} bookmarks={getMyBookmarks()} />
      </View>
      {loading && (
        <View
          style={{
            backgroundColor: "white",
            opacity: 0.4,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <LottieView
            style={{
              height: 200,
            }}
            source={require("../../assets/animations/loading.json")}
            autoPlay
            loop
            speed={1.5}
          />
        </View>
      )}
    </Container>
  );
};

export default Profile;
