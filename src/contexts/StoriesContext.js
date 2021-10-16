import React, { createContext, useContext, useState, useEffect } from "react";
import { useFirebaseContext } from "./FirebaseContext";
import { collectIdsAndDocs } from "../shared/utilities";
import firebase from "firebase";

export const StoriesContext = createContext();

export const StoriesProvider = ({ children }) => {
  const { database, storage } = useFirebaseContext();
  const [stories, setStories] = useState([]);
  console.log("stories", stories);
  useEffect(
    () =>
      database
        .collection("stories")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setStories(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );

  const addStory = (data, image) => {
    return new Promise(async (resolve, reject) => {
      let key = await database.collection("stories").add({});

      const response = await fetch(image.uri);
      const blob = await response.blob();
      var ref = storage.ref(`stories/${key.id}`);
      await ref.put(blob);

      ref
        .getDownloadURL()
        .then((url) => {
          database
            .collection("stories")
            .doc(key.id)
            .set({
              ...data,
              image: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => resolve(res));
        })
        .catch((err) => reject(err));
    });
  };

  const getStories = (id) => {
    return stories.filter((item) => item.user === id);
  };

  return (
    <StoriesContext.Provider value={{ stories, addStory, getStories }}>
      {children}
    </StoriesContext.Provider>
  );
};

export const useStoriesContext = () => useContext(StoriesContext);
