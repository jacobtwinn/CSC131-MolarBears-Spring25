import { 
  Box, 
  Flex, 
  Text, 
  VStack, 
  HStack, 
  Input, 
  Button,  
  Grid, 
  GridItem,
  Icon
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Footer = () => {
  // Move useState inside the component
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box bg="gray.900" color="gray.400" py={12} px={6}>
      <Flex justify="center">
        <Grid 
          templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]}
          maxW="1400px"
          gap={8}
          w="100%"
          px={4}
        >
          {/* Information */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="semibold" color="white">
                Information
              </Text>
              <VStack align="start" spacing={2}>
                <Link to="/about" style={{ color: "silver" }}>About Us</Link>
                <Link to="/faq" style={{ color: "silver" }}>FAQs</Link>
                <Link to="/appt-guidelines" style={{ color: "silver" }}>Guidelines/Forms</Link>
                <Link to="/payment-info" style={{ color: "silver" }}>Insurance</Link>
              </VStack>
            </VStack>
          </GridItem>

          {/* Contact us */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="semibold" color="white">
                Contact us
              </Text>
              <VStack align="start" spacing={2}>
                <Text color="gray.400">6000 J Street</Text>
                <Text color="gray.400">Sacramento, CA 95826</Text>
                <HStack>
                  <Icon as={FaPhone} />
                  <Text color="gray.400">916-234-5678</Text>
                </HStack>
                <HStack>
                  <Icon as={FaEnvelope} />
                  <Text color="gray.400">services@molarbears.com</Text>
                </HStack>
              </VStack>
            </VStack>
          </GridItem>

          {/* Stay connected */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="semibold" color="white">
                Stay connected
              </Text>
              {submitted ? (
                <Text color="green.300">Thanks! You've been subscribed.</Text>
              ) : (
                <Flex>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    bg="gray.800"
                    border="none"
                    borderRadius="md 0 0 md"
                  />
                  <Button
                    bg="white"
                    color="gray.800"
                    borderRadius="0 md md 0"
                    _hover={{ bg: "gray.400" }}
                    onClick={() => {
                      if (email.trim()) {
                        setSubmitted(true);
                        setEmail("");
                      }
                    }}
                  >
                    SUBMIT
                  </Button>
                </Flex>
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Flex>

      {/* Copyright */}
      <Box maxW="1400px" mx="auto" mt={8} pt={6} borderTop="1px" borderColor="gray.700">
        <Text textAlign="right">
          Copyright © 2025 Molar Bears.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;