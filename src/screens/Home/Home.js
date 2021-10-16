import React from "react";
import Header from "../../components/Header";
import Posts from "../../components/Post/Posts";
import {
  useAuthContext,
  useProfilesContext,
  useStyleContext,
} from "../../contexts";
import Container from "../../components/Container";

const Home = () => {
  const { profiles } = useProfilesContext();
  const { theme } = useStyleContext();
  const { user } = useAuthContext();

  const getProfiles = () => {
    return profiles.filter((item) => item.id !== user.id);
  };
  return (
    <Container>
      <Header />
      <Posts data={getProfiles()} />
    </Container>
  );
};

export default Home;
