import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const ScrollBoxes = ({ reviewData = [], selectedDentist }) => {
  return (
    <div>
      {reviewData.map((review, index) => (
        <Box
          key={index}
          borderRadius="xl"
          p={6}
          bg="white"
          boxShadow="lg"
          maxW="800px"
          maxH="300px"
          mx="auto"
          my={1}
        >
          <Flex justify="space-between" mb={2} align="center">
            <Flex align="center">
              <Text fontWeight="bold" fontSize="lg">{review.reviewer}</Text>
              <Text fontSize="md" fontWeight="bold" color="orange.400" ml={4}>
                Rating: {review.rating}/5
              </Text>
            </Flex>
          </Flex>
          <Text color="gray.700" mb={2}>{review.review}</Text>
          {selectedDentist === "All Provider Reviews" && (
            <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={1}>
              Dentist: {review.dentist}
            </Text>
          )}
          <Text fontSize="sm" color="gray.400">{review.date}</Text>
        </Box>
      ))}
    </div>
  );
};

export default ScrollBoxes;