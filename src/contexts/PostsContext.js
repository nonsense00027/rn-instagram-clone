import React, { createContext, useContext, useState, useEffect } from "react";
import { collectIdsAndDocs } from "../shared/utilities";
import { useFirebaseContext } from "./FirebaseContext";
import firebase from "firebase";
import { useAuthContext } from "./AuthContext";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { database, storage } = useFirebaseContext();
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);

  useEffect(
    () =>
      database
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setPosts(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );
  useEffect(
    () =>
      database
        .collection("reels")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setReels(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );

  const uploadImage = async (image, key, index) => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      var ref = storage.ref(`posts/${key}/${key}-${index}`);
      await ref.put(blob);

      ref
        .getDownloadURL()
        .then((url) => {
          resolve(url);
        })
        .catch((err) => reject(err));
    });
  };

  const addPost = async (data, images) => {
    return new Promise(async (resolve, reject) => {
      let key = await database.collection("posts").add({});

      let imageUrls = [];
      await Promise.all(
        images.map(async (image, index) => {
          if (image) {
            await uploadImage(image, key.id, index)
              .then((url) => {
                imageUrls = [...imageUrls, url];
              })
              .catch((err) => reject(err));
          }
        })
      );

      database
        .collection("posts")
        .doc(key.id)
        .set({
          ...data,
          image: imageUrls,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((res) => resolve(res));
    });
  };

  const addVideo = (data, video) => {
    return new Promise(async (resolve, reject) => {
      let key = await database.collection("reels").add({});

      const response = await fetch(video.uri);
      const blob = await response.blob();
      var ref = storage.ref(`reels/${key.id}`);
      await ref.put(blob);

      ref
        .getDownloadURL()
        .then((url) => {
          database
            .collection("reels")
            .doc(key.id)
            .set({
              ...data,
              video: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => resolve(res));
        })
        .catch((err) => reject(err));
    });
  };

  const likePost = (item, type) => {
    let newLikes = [...item.likes, user.id];
    database
      .collection(type)
      .doc(item.id)
      .set({ ...item, likes: newLikes });
  };

  const unlikePost = (item, type) => {
    let newLikes = item.likes.filter((item) => item !== user.id);

    database
      .collection(type)
      .doc(item.id)
      .set({ ...item, likes: newLikes });
  };

  const addComment = async (item, comment, type) => {
    let data = {
      user: user.id,
      comment,
    };

    database
      .collection(type)
      .doc(item.id)
      .collection("comments")
      .add({
        ...data,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  const editPost = async (id, newCaption) => {
    database
      .collection("posts")
      .doc(id)
      .set({ caption: newCaption }, { merge: true });
  };

  const deletePost = (data) => {
    database.collection("posts").doc(data.id).delete();
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        reels,
        addPost,
        addVideo,
        likePost,
        unlikePost,
        addComment,
        editPost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => useContext(PostsContext);
