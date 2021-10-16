import React, { createContext, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import firebaseConfig from "../shared/configs/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const auth = firebase.auth();
  const database = firebase.firestore();
  const storage = firebase.storage();
  const payload = { database, auth, storage };

  return (
    <FirebaseContext.Provider value={payload}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext);
