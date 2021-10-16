import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { Icon, Switch } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useAuthContext, useStyleContext } from "../../contexts";
import Container from "../../components/Container";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuthContext();
  const { changeTheme, theme, isDarkMode } = useStyleContext();

  const handleChangeTheme = () => {
    changeTheme();
  };

  return (
    <Container>
      <CustomHeader title="Settings" />

      <View style={tw`px-3`}>
        <TouchableOpacity
          style={[
            tw`flex-row justify-between items-center py-3 px-4 my-1 rounded-md`,
            { backgroundColor: theme.post },
          ]}
          onPress={() => navigation.navigate("Edit")}
        >
          <View style={tw`flex-row items-center`}>
            <Icon
              type="font-awesome"
              name="edit"
              size={26}
              color={theme.icon}
            />
            <Text style={[tw`text-lg ml-4`, { color: theme.text }]}>
              Edit Profile
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={[
            tw`flex-row justify-between items-center py-3 px-3 rounded-md my-1`,
            { backgroundColor: theme.post },
          ]}
        >
          <View style={tw`flex-row items-center`}>
            <Icon
              type="material-community"
              name="theme-light-dark"
              size={26}
              color={theme.icon}
            />
            <Text style={[tw`text-lg ml-4`, { color: theme.text }]}>Theme</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text style={[tw`text-xs opacity-60`, { color: theme.text }]}>
              Light
            </Text>
            <Switch
              style={tw`mx-2`}
              value={isDarkMode}
              onChange={handleChangeTheme}
            />
            <Text style={[tw`text-xs opacity-60`, { color: theme.text }]}>
              Dark
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            tw`flex-row justify-between items-center py-3 px-4 my-1 rounded-md`,
            { backgroundColor: theme.post },
          ]}
          onPress={logout}
        >
          <View style={tw`flex-row items-center`}>
            <Icon type="material" name="logout" size={26} color={theme.icon} />
            <Text style={[tw`text-lg ml-4`, { color: theme.text }]}>
              Signout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Settings;
