import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import tw from "tailwind-react-native-classnames";
import { Button, Icon } from "react-native-elements";
import UploadList from "../../components/Upload/UploadList";
import * as ImagePicker from "expo-image-picker";
import {
  useAuthContext,
  usePostsContext,
  useStyleContext,
} from "../../contexts";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/Container";
import CustomLoading from "../../components/CustomLoading";

const uploadPostSchema = Yup.object().shape({
  caption: Yup.string()
    .min(1, "")
    .max(2200, "Caption has reached the character limit."),
});

const Uploader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useStyleContext();
  const { user } = useAuthContext();
  const { addPost, addVideo } = usePostsContext();
  const [images, setImages] = useState([{ role: "plus", uri: "plus" }]);
  const [video, setVideo] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeUploadModal = () => {
    setUploadModal(false);
  };

  const pickFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      setUploadModal(false);
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          route.params.type === "image"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        // allowsMultipleSelection: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        if (route.params.type === "image") {
          let newImages = [data, ...images];
          setImages(newImages);
        } else {
          let newImages = [data, { role: "plus", uri: "plus" }];
          setImages(newImages);
        }
      }
    } else {
      Alert.alert("Camera Permission Needed");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      setUploadModal(false);
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newImages = [data, ...images];
        setImages(newImages);
      }
    } else {
      Alert.alert("Camera Permission Needed");
    }
  };

  const handleAddPhoto = () => {
    setUploadModal(true);
  };

  const handleAddPost = (values) => {
    setLoading(true);
    Keyboard.dismiss(0);
    let newImages = images.filter((image) => !image.role);
    addPost(
      {
        ...values,
        user: user.id,
        username: user.username,
        likes: [],
      },
      newImages
    ).then((res) => {
      setLoading(false);
      Alert.alert("Posts uploaded successfully!");
      navigation.navigate("Main");
    });
  };

  const handleSubmitPost = (values) => {
    if (route.params.type === "image") {
      handleAddPost(values);
    } else {
      handleAddVideo(values);
    }
  };

  const handleAddVideo = (values) => {
    setLoading(true);
    Keyboard.dismiss(0);
    addVideo(
      {
        ...values,
        user: user.id,
        username: user.username,
        likes: [],
      },
      images[0]
    ).then((res) => {
      setLoading(false);
      Alert.alert("Posts uploaded successfully!");
      navigation.navigate("Main");
    });
  };

  return (
    <Container>
      <View style={tw`px-5 pt-8`}>
        <View>
          <UploadList
            items={images}
            action={null}
            handleAddPhoto={handleAddPhoto}
            type={route.params.type}
          />
        </View>
        <Formik
          initialValues={{ caption: "" }}
          onSubmit={(values) => handleSubmitPost(values)}
          validationSchema={uploadPostSchema}
          validateOnMount={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <View style={tw`mt-6`}>
              <View style={tw`bg-gray-100 mb-3`}>
                <TextInput
                  multiline
                  numberOfLines={5}
                  style={[
                    tw`p-4 ${Platform.OS === "ios" && "h-32"}`,
                    { backgroundColor: theme.post, color: theme.text },
                  ]}
                  selectionColor={theme.text}
                  placeholderTextColor={theme.placeholder}
                  placeholder="Enter caption here..."
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                  editable
                />
              </View>
              <Button
                buttonStyle={{
                  paddingVertical: 12,
                }}
                disabledStyle={{
                  backgroundColor: theme.post,
                }}
                icon={
                  <Icon
                    style={tw`mr-2`}
                    type="feather"
                    name="send"
                    color="white"
                  />
                }
                title="Upload Post"
                onPress={handleSubmit}
                disabled={!isValid || images.length < 2}
              />
            </View>
          )}
        </Formik>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={uploadModal}
        onRequestClose={closeUploadModal}
      >
        <TouchableOpacity
          style={tw`flex-1`}
          onPress={closeUploadModal}
          activeOpacity={1}
        >
          <View
            style={tw`absolute bottom-0 h-44 w-full flex-row justify-evenly py-4 border-t border-gray-200`}
          >
            <TouchableOpacity
              style={[
                tw`flex-1 items-center justify-center`,
                {
                  borderRightColor: "lightgray",
                  borderRightWidth: 1,
                },
              ]}
              onPress={pickFromCamera}
            >
              <Icon
                type="material-community"
                name="camera"
                color={theme.icon}
              />
              <Text style={{ color: theme.text }}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 items-center justify-center`}
              onPress={pickFromGallery}
            >
              <Icon type="material-community" name="image" color={theme.icon} />
              <Text style={{ color: theme.text }}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {loading && <CustomLoading />}
    </Container>
  );
};

export default Uploader;
