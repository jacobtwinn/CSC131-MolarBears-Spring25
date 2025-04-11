// components/Navbar.tsx
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Link,
  Image,
  Spacer,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="white" px={6} py={4} boxShadow="sm">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo */}
        <HStack spacing={2}>
          <Image src="/logo.png" alt="Molar Bears Logo" boxSize="32px" />
          <Text fontWeight="bold" fontSize="xl">
            Molar{" "}
            <Text as="span" color="blue.400">
              Bears
            </Text>
          </Text>
        </HStack>
        <Spacer /> {/* This can help distribute space */}
        {/* Nav links */}
        <Flex align="center" gap={170}>
          {" "}
          {/* Adjust gap as needed */}
          <Link
            as={RouterLink}
            to="/"
            fontWeight="bold"
            color="blue.400"
            mx={2}
          >
            HOME
          </Link>
          <Link
            as={RouterLink}
            to="/about"
            fontWeight="bold"
            color="blackAlpha.800"
            mx={2}
          >
            ABOUT
          </Link>
          <Link
            as={RouterLink}
            to="/contact"
            fontWeight="bold"
            color="blackAlpha.800"
            mx={2}
          >
            CONTACT
          </Link>
        </Flex>
        <Spacer />
        {/* Log In Button */}
        <Button
          as={RouterLink}
          to="/login"
          colorScheme="blackAlpha"
          variant="solid"
          px={6}
        >
          Log In
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
