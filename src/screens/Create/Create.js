import React from "react";
import Container from "../../components/Container";
import CustomHeader from "../../components/CustomHeader";
import { PostRoute } from "../../routes/PostRoute";

const Create = () => {
  return (
    <Container>
      <CustomHeader title="New Post" />
      <PostRoute />
    </Container>
  );
};

export default Create;
