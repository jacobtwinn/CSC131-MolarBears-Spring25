import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const ScrollBoxes = ({ reviewData = [], selectedDentist, user, onDelete }) => {
  return (
    <div>
      {reviewData.map((review, index) => (
        <Box
          key={review._id || index}
          borderRadius="xl"
          p={6}
          bg="white"
          boxShadow="lg"
          maxW="800px"
          maxH="300px"
          mx="auto"
          my={3}
        >
          <Flex justify="space-between" mb={2} align="center">
            <Flex align="center">
              <Text fontWeight="bold" fontSize="lg">
                {review.reviewer}
              </Text>
              <Text fontSize="md" fontWeight="bold" color="orange.400" ml={4}>
                Rating: {review.rating}/5
              </Text>
            </Flex>
            {`${user.firstName} ${user.lastName}` === review.reviewer && (
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => onDelete(review._id)}
              >
                Delete
              </Button>
            )}
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