import { useRoute } from "@react-navigation/native";
import React from "react";
import Container from "../../components/Container";
import StoryCarousel from "./StoryCarousel";

const Story = () => {
  const route = useRoute();

  return (
    <Container>
      <StoryCarousel data={route.params?.stories} />
    </Container>
  );
};

export default Story;
