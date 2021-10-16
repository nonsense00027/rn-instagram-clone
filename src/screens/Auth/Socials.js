import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useStyleContext } from "../../contexts/StyleContext";

const Socials = () => {
  const { theme } = useStyleContext();
  return (
    <View>
      <TouchableOpacity
        style={tw`flex-row items-center justify-center border border-gray-200 rounded-md py-1 mt-3`}
      >
        <Image
          style={{
            width: 35,
            height: 35,
            marginRight: 5,
          }}
          source={{
            uri: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png",
          }}
        />
        <Text style={[tw`font-semibold`, { color: theme.text }]}>
          Sign in with Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-center border border-gray-200 rounded-md py-1 mt-2`}
      >
        <Image
          style={{
            width: 33,
            height: 33,
            marginRight: 5,
          }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png",
          }}
        />
        <Text style={[tw`font-semibold`, { color: theme.text }]}>
          Sign in with Facebook
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Socials;
