import React from "react";
import { View, Image, TouchableOpacity, Platform } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useStyleContext, useAuthContext } from "../contexts";
import logo from "../assets/img/logo.png";

const Header = () => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useStyleContext();
  const { user } = useAuthContext();
  return (
    <View
      style={tw`flex-row justify-between items-center border-gray-200 py-2 ${
        Platform.OS !== "ios" && "pt-6"
      }`}
    >
      <View>
        {isDarkMode ? (
          <Image style={tw`h-12 w-40`} resizeMode="contain" source={logo} />
        ) : (
          <Image
            style={tw`h-12 w-40`}
            resizeMode="contain"
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png",
            }}
          />
        )}
      </View>
      <View style={tw`flex-row pr-3`}>
        <TouchableOpacity
          style={tw`mx-2`}
          onPress={() => navigation.navigate("Create")}
        >
          <Icon type="antdesign" name="plussquareo" color={theme.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`mx-2`}>
          <Icon type="antdesign" name="hearto" color={theme.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`mx-2`}>
          <Icon type="feather" name="send" color={theme.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
