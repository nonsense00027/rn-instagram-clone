import React from "react";
import Main from "./src/Main";
import { StyleProvider } from "./src/contexts/StyleContext";
import { AuthProvider } from "./src/contexts/AuthContext";
import { FirebaseProvider } from "./src/contexts/FirebaseContext";
import StoryCarousel from "./src/screens/Story/StoryCarousel";

export default function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <StyleProvider>
          <Main />
          {/* <StoryCarousel /> */}
        </StyleProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}
