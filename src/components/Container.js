import React from "react";
import { View } from "react-native";
import { useStyleContext } from "../contexts/StyleContext";

const Container = ({ children }) => {
  const { theme } = useStyleContext();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {children}
    </View>
  );
};

export default Container;
