import React, { createContext, useContext, useState, useEffect } from "react";
import { collectIdsAndDocs } from "../shared/utilities";
import { useAuthContext } from "./AuthContext";
import { useFirebaseContext } from "./FirebaseContext";

export const ProfilesContext = createContext();

export const ProfilesProvider = ({ children }) => {
  const { database } = useFirebaseContext();
  const { user } = useAuthContext();
  const [profiles, setProfiles] = useState([]);

  useEffect(
    () =>
      database
        .collection("profiles")
        .onSnapshot((snapshot) =>
          setProfiles(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );

  const getUserInfo = (id) => {
    return profiles.filter((item) => item.id === id)[0];
  };

  const followUser = (id, profile) => {
    let newProfileFollowers = [...profile.followers, user.id];
    database
      .collection("profiles")
      .doc(id)
      .set({ followers: newProfileFollowers }, { merge: true });

    let newUserFollowing = [...user.following, id];
    database
      .collection("profiles")
      .doc(user.id)
      .set({ following: newUserFollowing }, { merge: true });
  };

  const unfollowUser = (id, profile) => {
    let newProfileFollowers = profile.followers.filter(
      (item) => item !== user.id
    );

    database
      .collection("profiles")
      .doc(id)
      .set({ followers: newProfileFollowers }, { merge: true });

    let newUserFollowing = user.following.filter((item) => item !== id);
    database
      .collection("profiles")
      .doc(user.id)
      .set({ following: newUserFollowing }, { merge: true });
  };

  const addBookmark = (id) => {
    const newBookmarks = [...user.bookmarks, id];
    database
      .collection("profiles")
      .doc(user.id)
      .set({ bookmarks: newBookmarks }, { merge: true });
  };

  const removeBookmark = (id) => {
    const newBookmarks = user.bookmarks.filter((item) => item !== id);
    database
      .collection("profiles")
      .doc(user.id)
      .set({ bookmarks: newBookmarks }, { merge: true });
  };

  const editProfile = (data) => {
    return new Promise((resolve, reject) => {
      database
        .collection("profiles")
        .doc(user.id)
        .set(data, { merge: true })
        .then(() => resolve("success"))
        .catch(() => reject());
    });
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        getUserInfo,
        followUser,
        unfollowUser,
        addBookmark,
        removeBookmark,
        editProfile,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};

export const useProfilesContext = () => useContext(ProfilesContext);
