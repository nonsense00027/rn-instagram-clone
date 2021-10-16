import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserRoute } from "./UserRoute";
import Create from "../screens/Create/Create";
import Comment from "../screens/Comment/Comment";
import User from "../screens/User/User";
import Settings from "../screens/Settings/Settings";
import Like from "../screens/Like/Like";
import Conversation from "../screens/Conversation/Conversation";
import { useStyleContext } from "../contexts/StyleContext";
import Edit from "../screens/Edit/Edit";
import Story from "../screens/Story/Story";
import Uploader from "../screens/Story/Uploader";

const Stack = createStackNavigator();

export const HomeRoute = ({}) => {
  const { theme } = useStyleContext();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: () => null,
            cardStyle: {
              backgroundColor: theme.background,
            },
          }}
          initialRouteName="Main"
        >
          <Stack.Screen name="Main" component={UserRoute} />
          <Stack.Screen name="Create" component={Create} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="Like" component={Like} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Conversation" component={Conversation} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="Story" component={Story} />
          <Stack.Screen name="StoryUpload" component={Uploader} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
