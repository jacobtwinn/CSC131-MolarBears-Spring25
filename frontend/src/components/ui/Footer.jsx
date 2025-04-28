import { 
    Box, 
    Flex, 
    Text, 
    VStack, 
    HStack, 
    Input, 
    Button, 
    Link, 
    Grid, 
    GridItem,
    Icon
  } from "@chakra-ui/react";
  import { FaPhone, FaEnvelope } from "react-icons/fa";
  import React from "react";
  import { Link as routerLink } from "react-router-dom";
 
  
  
  
  const Footer = () => {
    return (
      <Box bg="gray.900" color="gray.400" py={12} px={6}>
        <Grid 
          templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(5, 1fr)"]}
          maxW="1400px" 
          mx="auto"
          gap={8}
        >
          {/* Patient Information */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="semibold" color="white">
                Patient Information
              </Text>
              <VStack align="start" spacing={2}>
                <Link as={routerLink} to="/about" color="gray.400">About Us</Link>
                <Link color="gray.400">History</Link>
                <Link color="gray.400">Before / Afters</Link>
                <Link color="gray.400">Testimonials</Link>
                <Link color="gray.400">Contact Us</Link>
              </VStack>
            </VStack>
          </GridItem>
  
          {/* Services */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="semibold" color="white">
                Services
              </Text>
              <VStack align="start" spacing={2}>
                <Link color="gray.400">Preventative Care</Link>
                <Link color="gray.400">Braces</Link>
                <Link color="gray.400">Dental Emergency</Link>
              </VStack>
            </VStack>
          </GridItem>
  
          {/* Legal */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="semibold" color="white">
                Legal
              </Text>
              <VStack align="start" spacing={2}>
                <Link color="gray.400">Privacy Policy</Link>
                <Link color="gray.400">Terms & Conditions</Link>
                <Link color="gray.400">Insurance</Link>
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
                  <Text color="gray.400">services@molarBears.com</Text>
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
              <Flex>
                <Input 
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
                >
                  SUBMIT
                </Button>
              </Flex>
            </VStack>
          </GridItem>
        </Grid>
  
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