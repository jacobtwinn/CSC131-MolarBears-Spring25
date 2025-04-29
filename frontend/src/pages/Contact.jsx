// Contact.jsx
import React from "react";

import { 
  Box, 
  Flex, 
  Text, 
  VStack, 
  HStack, 
  Button, 
  Image,
  Grid,
  GridItem,
  Icon,
  Center
} from "@chakra-ui/react";

const Contact = () => {
  return (
    <Box bg="white" minH="100vh">
      <Box mt={20} mb={20} ml={-40} justify="center" textAlign="center">
        <Text color="black" fontSize="6xl" fontWeight="bold">
          CONTACT US
        </Text>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" columnGap={5} justifyContent="center">
        <GridItem colSpan={1} display="flex" justifyContent="center">
          <Box w="600px" h="725px" bg="gray.200" px={5} py={5} textAlign="center">
            <Image
              src="/telephone-call.png"  
              objectFit="contain"
              w="20%"
              mx="auto"
              mt={7}
            />
            <Text color="black" fontSize="4xl" fontWeight="bold" mx="auto" mt={7}>
              Phone
            </Text>
            <Text color="black" fontSize="2xl" fontWeight="bold" mx="auto" mt={7}>
              1-800-123-4567
            </Text>
            <Text color="black" fontSize="4xl" fontWeight="bold" mx="auto" mt={7}>
              Receptionist Availability
            </Text>
            <Text color="black" fontSize="2xl" fontWeight="bold" textDecoration="underline" mx="auto" mt={7}>
              Mon - Fri
            </Text>
            <Text color="black" fontSize="xl" fontWeight="bold" mx="auto" mt={7}>
              9 am - 5 pm
            </Text>
            <Text color="black" fontSize="2xl" fontWeight="bold" textDecoration="underline" mx="auto" mt={7}>
              Sat - Sun
            </Text>
            <Text color="black" fontSize="xl" fontWeight="bold" mx="auto" mt={7}>
              12 pm - 5 pm
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={1} display="flex">
          <Box w="600px" h="725px" bg="gray.200" px={5} py={5} textAlign="center">
            <Image
              src="/mail_120263.png"  
              objectFit="contain"
              w="25%"
              mx="auto"
              mt={3}
            />
            <Text color="black" fontSize="4xl" fontWeight="bold" mx="auto" mt={4}>
              Email
            </Text>
            <Text color="black" fontSize="2xl" fontWeight="bold" mx="auto" mt={7}>
              molarbearsco@gmail.com
            </Text>
            <Image
              src="/location.png"  
              objectFit="contain"
              w="14%"
              mx="auto"
              mt={20}
            />
            <Text color="black" fontSize="4xl" fontWeight="bold" mx="auto" mt={7}>
              Visit Us!
            </Text>
            <Text color="black" fontSize="2xl" fontWeight="bold"mx="auto" mt={7}>
            6000 J St, Sacramento, CA
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Contact;