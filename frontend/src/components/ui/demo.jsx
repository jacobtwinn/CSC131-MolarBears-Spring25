// src/components/Demo.jsx
import React from "react";
import { Button, HStack } from "@chakra-ui/react";

const Demo = () => {
  return (
    <HStack spacing={4}>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  );
};

export default Demo;
