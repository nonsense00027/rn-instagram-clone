import React, { useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import Home from "../screens/Home/Home";
import Explore from "../screens/Explore/Explore";
import Reel from "../screens/Reel/Reel";
import Chat from "../screens/Chat/Chat";
import Profile from "../screens/Profile/Profile";
import tw from "tailwind-react-native-classnames";
import { useStyleContext, useAuthContext } from "../contexts";

const Tabs = createBottomTabNavigator();

const screens = [
  {
    name: "Home",
    component: Home,
    iconType: "ionicon",
    activeIcon: "home",
    inactiveIcon: "home-outline",
    iconSize: 23,
  },
  {
    name: "Search",
    component: Explore,
    iconType: "ionicon",
    activeIcon: "search-sharp",
    inactiveIcon: "search-outline",
    iconSize: 23,
  },
  {
    name: "Reels",
    component: Reel,
    iconType: "material",
    activeIcon: "video-collection",
    inactiveIcon: "ondemand-video",
    iconSize: 23,
  },
  {
    name: "Chat",
    component: Chat,
    iconType: "ionicon",
    activeIcon: "chatbubble-ellipses",
    inactiveIcon: "chatbubble-ellipses-outline",
    iconSize: 23,
  },
  {
    name: "Profile",
    component: Profile,
    iconType: "font-awesome-5",
    activeIcon: "user-alt",
    inactiveIcon: "user",
    iconSize: 20,
  },
];

const animate1 = {
  0: { scale: 0.5, translateY: 0 },
  0.92: { translateY: -30 },
  1: { scale: 1.1, translateY: -20 },
};
const animate2 = {
  0: { scale: 1.1, translateY: -20 },
  1: { scale: 1, translateY: 0 },
};

const circle1 = {
  0: { scale: 0 },
  1: { scale: 1 },
};

const circle2 = {
  0: { scale: 1 },
  1: { scale: 0 },
};

const TabBarButton = ({ item, onPress, accessibilityState, user, theme }) => {
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);
  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: theme.background }}
      onPress={onPress}
      activeOpacity={1}
    >
      <Animatable.View
        style={styles.container}
        ref={viewRef}
        duration={300}
        easing="ease-out"
      >
        <View
          style={{
            ...styles.button,
            backgroundColor: theme.background,
            borderColor: theme.background,
          }}
        >
          <Animatable.View
            ref={circleRef}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: theme.text,
              borderRadius: 25,
            }}
            duration={300}
            easing="ease-in-out"
          />
          {item.name === "Profile" ? (
            <Image
              style={[
                tw`h-10 w-10 rounded-full`,
                { borderWidth: 1, borderColor: theme.text },
              ]}
              resizeMode="cover"
              source={{
                uri: user.profile_image,
              }}
            />
          ) : (
            <Icon
              type={item.iconType}
              name={focused ? item.activeIcon : item.inactiveIcon}
              color={focused ? theme.background : "#999"}
              size={item.iconSize}
            />
          )}
        </View>

        <Animatable.Text
          ref={textRef}
          style={{ fontSize: 10, color: theme.text, textAlign: "center" }}
        >
          {item.name}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export const UserRoute = ({}) => {
  const { user } = useAuthContext();
  const { theme } = useStyleContext();

  return (
    <Tabs.Navigator
      initialRouteName="Collab"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 65,
        },
        tabBarActiveTintColor: "black",
      }}
    >
      {screens.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            unmountOnBlur: true,
            tabBarLabel: item.name,
            tabBarButton: (props) => (
              <TabBarButton {...props} item={item} user={user} theme={theme} />
            ),
          }}
        />
      ))}
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
  },
});
