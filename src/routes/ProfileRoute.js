import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Posts from "../screens/Profile/Posts";
import { Icon } from "react-native-elements";
import { useStyleContext } from "../contexts/StyleContext";
import Bookmarks from "../screens/Profile/Bookmarks";

const Tab = createMaterialTopTabNavigator();

export function ProfileRoute({ posts, bookmarks, selectImage }) {
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
    >
      <Tab.Screen
        name="Posts"
        component={Posts}
        initialParams={{ posts, selectImage }}
        options={{
          tabBarIcon: () => (
            <Icon type="material" name="grid-on" color={theme.icon} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
        initialParams={{ bookmarks }}
        options={{
          tabBarIcon: () => (
            <Icon type="feather" name="bookmark" color={theme.icon} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}
