import { useRoute } from "@react-navigation/native";
import React from "react";
import Container from "../../components/Container";
import CustomHeader from "../../components/CustomHeader";
import StoryCarousel from "./StoryCarousel";

const Story = () => {
  const route = useRoute();
  console.log("stories params", route.params);

  return (
    <Container>
      {/* <CarouselModal data={route.params?.stories} startIndex={0} /> */}
      <StoryCarousel data={route.params?.stories} />
    </Container>
  );
};

export default Story;
