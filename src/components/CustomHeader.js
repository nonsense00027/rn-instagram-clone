import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useStyleContext } from "../contexts/StyleContext";

const CustomHeader = ({ title, canShare }) => {
  const navigation = useNavigation();
  const { theme } = useStyleContext();

  return (
    <View
      style={[
        tw`flex-row items-center justify-between px-5 pt-4 pb-8`,
        { backgroundColor: theme.background },
      ]}
    >
      <TouchableOpacity
        style={tw`flex-1 items-start`}
        onPress={() => navigation.goBack()}
      >
        <Icon type="entypo" name="chevron-left" color={theme.icon} />
      </TouchableOpacity>
      <View style={tw`flex-1 items-center`}>
        <Text style={[tw`text-lg font-semibold`, { color: theme.text }]}>
          {title}
        </Text>
      </View>
      <View style={tw`items-end flex-1`}>
        {canShare && <Icon type="feather" name="send" color={theme.icon} />}
      </View>
    </View>
  );
};

export default CustomHeader;
