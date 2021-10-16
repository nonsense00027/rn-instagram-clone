import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import tw from "tailwind-react-native-classnames";
import { useStyleContext } from "../../contexts/StyleContext";
import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import Head from "../Post/Head";
import Reactions from "../Post/Reactions";

export default function ReelsItem({ item, index, activeIndex }) {
  const { theme } = useStyleContext();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    if (activeIndex) {
      if (index === activeIndex[0]?.index) {
        video.current.replayAsync();
      } else {
        video.current.stopAsync();
      }
    } else {
      video.current.stopAsync();
    }
  }, [activeIndex]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() =>
        status.isPlaying
          ? video.current.pauseAsync()
          : video.current.playAsync()
      }
    >
      <Head item={item} />
      <View style={tw`flex-1`}>
        <Video
          ref={video}
          style={tw`flex-1`}
          source={{ uri: item.video }}
          useNativeControls={false}
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        {!status.isPlaying && (
          <Animatable.View
            style={tw`absolute top-0 left-0 w-full h-full items-center justify-center opacity-70`}
            animation="bounceIn"
            duration={500}
          >
            <Icon type="ionicon" name="play" color="white" size={80} />
          </Animatable.View>
        )}
      </View>
      <View
        style={[
          tw` w-full bottom-0 h-40 px-4 pt-4`,
          { backgroundColor: theme.background },
        ]}
      >
        <Reactions item={item} type="reels" />
      </View>
    </TouchableOpacity>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height - 50,
    paddingBottom: Platform.OS === "ios" ? 50 : 0,
  },
});
