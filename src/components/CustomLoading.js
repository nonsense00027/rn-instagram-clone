import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const CustomLoading = () => {
  return (
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
        source={require("../assets/animations/loading.json")}
        autoPlay
        loop
        speed={1.5}
      />
    </View>
  );
};

export default CustomLoading;
