import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Button, Icon } from "react-native-elements";
import Carousel from "./Carousel";
import {
  useAuthContext,
  usePostsContext,
  useFirebaseContext,
  useStyleContext,
} from "../../contexts";
import { collectIdsAndDocs } from "../../shared/utilities";
import CarouselModal from "../CarouselModal";
import Head from "./Head";
import Reactions from "./Reactions";
import * as Animatable from "react-native-animatable";

const PostItem = ({ item }) => {
  const postRef = useRef(null);
  const { user } = useAuthContext();
  const { addComment } = usePostsContext();
  const { database } = useFirebaseContext();
  const { theme } = useStyleContext();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    postRef.current.animate("bounceIn");
  }, []);
  useEffect(
    () =>
      database
        .collection("posts")
        .doc(item.id)
        .collection("comments")
        .onSnapshot((snapshot) =>
          setComments(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );

  const handleComment = () => {
    addComment(item, comment, "posts").then((res) => {
      setComment("");
    });
  };

  const selectImage = (index) => {
    setSelectedImage(item.image);
    setStartIndex(index);
    setShowModal(true);
  };

  return (
    <Animatable.View
      ref={postRef}
      style={{ backgroundColor: theme.post, marginVertical: 8 }}
    >
      {/* HEADER */}
      <Head item={item} postRef={postRef} />
      {/* BODY */}
      {item.image?.length > 1 ? (
        <Carousel data={item.image} selectImage={selectImage} />
      ) : (
        <TouchableOpacity onPress={() => selectImage(0)} activeOpacity={1}>
          <Image
            style={tw`w-full h-96`}
            resizeMode="cover"
            source={{ uri: item.image[0] }}
          />
        </TouchableOpacity>
      )}

      {/* FOOTER */}
      <View style={tw`px-3 py-3`}>
        {/* REACTIONS */}
        <Reactions item={item} type="posts" showBookmark />

        {/* ADD COMMENT */}
        <View style={tw`flex-row items-center py-2`}>
          <Image
            style={tw`h-8 w-8 rounded-full mr-4`}
            resizeMode="cover"
            source={{ uri: user.profile_image }}
          />
          <TextInput
            style={[
              tw`h-full rounded-md px-2 py-2`,
              {
                color: theme.text,
                flex: 1,
                backgroundColor: theme.background,
              },
            ]}
            multiline={true}
            numberOfLines={4}
            selectionColor={theme.text}
            placeholderTextColor={theme.placeholder}
            placeholder={
              comments.length > 0
                ? "Add a comment..."
                : "Be the first one to comment..."
            }
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <Button
            disabledStyle={{
              backgroundColor: theme.post,
            }}
            buttonStyle={{
              backgroundColor: theme.post,
            }}
            titleStyle={{
              color: "#0275d8",
              fontSize: 15,
            }}
            disabled={comment.length < 1}
            title="Post"
            onPress={handleComment}
          />
        </View>
      </View>

      <CarouselModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedImage={selectedImage}
        startIndex={startIndex}
      />
    </Animatable.View>
  );
};

export default PostItem;
