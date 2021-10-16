import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("theme", jsonValue);
  } catch (e) {}
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("theme");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};

export const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
  const [theme, setTheme] = useState({ isDarkMode: false });

  useEffect(() => {
    getData().then((res) => {
      if (res) {
        setTheme(res);
      }
    });
  }, []);

  const changeTheme = () => {
    if (theme.isDarkMode) {
      storeData({ ...theme, isDarkMode: false }).then((res) =>
        setTheme({ isDarkMode: false })
      );
    } else {
      storeData({ ...theme, isDarkMode: true }).then((res) =>
        setTheme({ isDarkMode: true })
      );
    }
  };

  const getTheme = () => {
    if (theme?.isDarkMode) {
      return {
        background: "#18191A",
        text: "#ffffff",
        icon: "#ffffff",
        post: "#242526",
        placeholder: "rgba(255,255,255,0.3)",
        reelsHeader: "rgba(0,0,0,0.3)",
        senderBubble: "#18191A",
      };
    } else {
      return {
        background: "#ffffff",
        text: "#000000",
        icon: "#000000",
        post: "#ffffff",
        placeholder: "rgba(0,0,0,0.3)",
        reelsHeader: "rgba(255,255,255,0.3)",
        senderBubble: "#18191A",
      };
    }
  };

  return (
    <StyleContext.Provider
      value={{ theme: getTheme(), isDarkMode: theme?.isDarkMode, changeTheme }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export const useStyleContext = () => useContext(StyleContext);
