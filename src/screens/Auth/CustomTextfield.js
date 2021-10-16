import React from "react";
import { View, Text, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useStyleContext } from "../../contexts/StyleContext";

const CustomTextfield = ({
  label,
  value,
  onChangeText,
  onBlur,
  autoFocus,
  error,
  password,
}) => {
  const { theme } = useStyleContext();
  return (
    <View>
      <Text style={[tw`mt-4 mb-2`, { color: theme.text }]}>{label}</Text>
      <TextInput
        style={[
          tw`border ${
            error ? "border-red-400" : "border-gray-200"
          }  p-4 rounded-md`,
          { color: theme.text },
        ]}
        secureTextEntry={password}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
      {error && <Text style={tw`text-red-400 my-1`}>{error}</Text>}
    </View>
  );
};

export default CustomTextfield;
