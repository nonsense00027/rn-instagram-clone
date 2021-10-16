import React, { createContext, useContext, useState, useEffect } from "react";
import { collectIdsAndDocs } from "../shared/utilities";
import { useAuthContext } from "./AuthContext";
import { useFirebaseContext } from "./FirebaseContext";
import firebase from "firebase";

export const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const { database } = useFirebaseContext();
  const { user } = useAuthContext();
  const [chats, setChats] = useState([]);

  useEffect(
    () =>
      database
        .collection("profiles")
        .doc(user.id)
        .collection("chats")
        .orderBy("modified", "desc")
        .onSnapshot((snapshot) =>
          setChats(snapshot.docs.map((doc) => collectIdsAndDocs(doc)))
        ),
    []
  );

  const sendMessage = async (receiver, message) => {
    await database
      .collection("profiles")
      .doc(user.id)
      .collection("chats")
      .doc(receiver)
      .set({
        modified: new Date(),
      });

    await database
      .collection("profiles")
      .doc(receiver)
      .collection("chats")
      .doc(user.id)
      .set({
        modified: new Date(),
      });

    database
      .collection("profiles")
      .doc(user.id)
      .collection("chats")
      .doc(receiver)
      .collection("conversations")
      .add({
        user: user.id,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    database
      .collection("profiles")
      .doc(receiver)
      .collection("chats")
      .doc(user.id)
      .collection("conversations")
      .add({
        user: user.id,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <ChatsContext.Provider
      value={{
        chats,
        sendMessage,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChatsContext = () => useContext(ChatsContext);
