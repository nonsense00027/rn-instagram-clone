import React from "react";
import { StatusBar } from "expo-status-bar";
import { HomeRoute } from "./routes/HomeRoute";
import { AuthRoute } from "./routes/AuthRoute";
import {
  PostsProvider,
  ProfilesProvider,
  ChatsProvider,
  StoriesProvider,
  useStyleContext,
  useAuthContext,
} from "./contexts";
import Container from "./components/Container";

export default function Main() {
  const { user } = useAuthContext();
  const { isDarkMode } = useStyleContext();
  return (
    <Container>
      {user ? (
        <ProfilesProvider>
          <PostsProvider>
            <ChatsProvider>
              <StoriesProvider>
                <HomeRoute />
              </StoriesProvider>
            </ChatsProvider>
          </PostsProvider>
        </ProfilesProvider>
      ) : (
        <AuthRoute />
      )}
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </Container>
  );
}
