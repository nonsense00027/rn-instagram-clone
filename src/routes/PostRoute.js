import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon } from "react-native-elements";
import { useStyleContext } from "../contexts/StyleContext";
import Uploader from "../screens/Create/Uploader";

const Tab = createMaterialTopTabNavigator();

export function PostRoute() {
  const { theme } = useStyleContext();
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: theme.background }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.post,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.text,
        },
      }}
      initialRouteName="Image"
    >
      <Tab.Screen
        name="Image"
        component={Uploader}
        initialParams={{ type: "image" }}
        options={{
          tabBarIcon: () => (
            <Icon type="entypo" name="images" color={theme.icon} />
          ),
          tabBarShowLabel: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Video"
        component={Uploader}
        initialParams={{ type: "video" }}
        options={{
          tabBarIcon: () => (
            <Icon type="entypo" name="folder-video" color={theme.icon} />
          ),
          tabBarShowLabel: false,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}
