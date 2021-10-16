import React, { createContext, useContext, useState, useEffect } from "react";
import { Keyboard, Alert } from "react-native";
import { useFirebaseContext } from "./FirebaseContext";
import faker from "faker";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { auth, database } = useFirebaseContext();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const handleError = (err) => {
    switch (err.code) {
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/wrong-password":
        return "You have entered an incorrect password.";
      case "auth/user-not-found":
        return "Unfortunately, the account that you tried to login does not exist.";
      default:
        return "Something went wrong, please try again.";
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser != null) {
        database
          .collection("profiles")
          .doc(authUser.uid)
          .onSnapshot((snapshot) => {
            setUser({
              id: authUser.uid,
              ...snapshot.data(),
            });
            setAuthLoading(false);
            Keyboard.dismiss(0);
          });
      } else {
        setUser(null);
        setAuthLoading(false);
      }
    });
  }, []);

  const signup = (data) => {
    setAuthLoading(true);
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const createdUser = result.user.uid;
        database
          .collection("profiles")
          .doc(createdUser)
          .set({
            email: data.email,
            username: data.username,
            profile_image: `${faker.image.people()}?random=${Math.round(
              Math.random() * 1000
            )}`,
            followers: [],
            following: [],
            bookmarks: [],
          })
          .then((res) => console.log("success signup"));
      })
      .catch((err) => {
        Alert.alert(err.message);
        setAuthLoading(false);
      });
  };

  const login = (email, password) => {
    setAuthLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("login success");
      })
      .catch((err) => {
        Alert.alert(handleError(err));
        setAuthLoading(false);
      });
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
