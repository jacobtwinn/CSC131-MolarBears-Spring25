import { 
    Box, 
    Flex, 
    Text
  } from "@chakra-ui/react";


  export function PatientVisitHistory() {
    return (
      <Box 
        bg="white" 
        minH="100vh">
        <Flex pl={2}>
          <Text 
            color="black"
            fontSize="lg" 
            mt={124}>
            Patient Visit History
          </Text>
        </Flex>
        <Box 
          bg="#5BA3BB"
          h="50px">
          <Flex 
            pl={2} 
            align="center"
            gap={135}
            h="100%"
            color="white"
            fontSize="sm">
            <Text>DATE</Text>
            <Text>PATIENT</Text>
            <Text>DENTIST</Text>
            <Text>SERVICE</Text>
          </Flex>
        </Box>
      </Box>
    );
  };