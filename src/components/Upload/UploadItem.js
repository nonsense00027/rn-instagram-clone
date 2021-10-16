import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useStyleContext } from "../../contexts/StyleContext";

export default function UploadItem({ item, action, handleAddPhoto, type }) {
  const { theme } = useStyleContext();

  return (
    <View style={tw`h-32 w-28`}>
      {item.role === "plus" ? (
        <TouchableOpacity
          onPress={handleAddPhoto}
          style={[
            tw`items-center justify-center h-full bg-gray-100 border-gray-200 rounded-md`,
            { borderWidth: 1, backgroundColor: theme.post },
          ]}
          activeOpacity={0.5}
        >
          {type === "image" ? (
            <Icon
              type="material-community"
              name="image-plus"
              color={theme.icon}
            />
          ) : (
            <Icon type="material" name="video-collection" color={theme.icon} />
          )}

          <Text style={[tw`text-xs mt-2`, { color: theme.text }]}>
            Add {type}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={tw`rounded-md`}>
          <Image
            style={tw`h-full w-full rounded-md`}
            resizeMode="cover"
            source={{ uri: item.uri }}
          />
        </View>
      )}
    </View>
  );
}
