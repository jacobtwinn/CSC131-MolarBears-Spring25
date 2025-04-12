// components/LoggedInNavbar.jsx
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  HStack,
  Link,
  Image,
  Spacer,
  Button,
} from "@chakra-ui/react";

// Custom dropdown component with active styling.
const Dropdown = ({ title, linkBase, children }) => {
  const location = useLocation();
  // Active if the current URL starts with the provided linkBase.
  const isActive = location.pathname.startsWith(linkBase);

  return (
    <Box
      position="relative"
      mx={2}
      _hover={{
        "& .dropdown-content": { display: "block" },
      }}
    >
      <Button
        variant="link"
        fontWeight="bold"
        color={isActive ? "blue.400" : "blackAlpha.800"}
        _hover={{ color: "blue.600" }}
      >
        {title}
      </Button>
      <Box
        className="dropdown-content"
        position="absolute"
        top="100%"
        left={0}
        bg="white"
        boxShadow="md"
        display="none"
        zIndex={1}
      >
        {children}
      </Box>
    </Box>
  );
};

const LoggedInNavbar = () => {
  const location = useLocation();
  const isHomeActive = location.pathname === "/home";

  return (
    <Box bg="white" px={6} py={4} boxShadow="sm">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo and Brand */}
        <HStack spacing={2}>
          <Image src="/logo.png" alt="Molar Bears Logo" boxSize="32px" />
          <Text fontWeight="bold" fontSize="xl">
            Molar <Text as="span" color="blue.400">Bears</Text>
          </Text>
        </HStack>

        <Spacer />

        {/* Navigation Links */}
        <Flex align="center">
          {/* Home link with active styling */}
          <Link
            as={RouterLink}
            to="/home"
            fontWeight="bold"
            color={isHomeActive ? "blue.400" : "blackAlpha.800"}
            _hover={{ color: "blue.600" }}
            mx={2}
          >
            HOME
          </Link>

          {/* Dropdown menus */}
          <Dropdown title="FINANCIALS" linkBase="/financials">
            <Link
              as={RouterLink}
              to="/financials/placeholder1"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
            <Link
              as={RouterLink}
              to="/financials/placeholder2"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
            <Link
              as={RouterLink}
              to="/financials/placeholder3"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
          </Dropdown>

          <Dropdown title="SERVICES" linkBase="/services">
            <Link
              as={RouterLink}
              to="/services/placeholder1"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
            <Link
              as={RouterLink}
              to="/services/placeholder2"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
            <Link
              as={RouterLink}
              to="/services/placeholder3"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
          </Dropdown>

          <Dropdown title="APPOINTMENT" linkBase="/appointment">
            <Link
              as={RouterLink}
              to="/appointment/placeholder1"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
            <Link
              as={RouterLink}
              to="/appointment/placeholder2"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
            <Link
              as={RouterLink}
              to="/appointment/placeholder3"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
          </Dropdown>

          <Dropdown title="INFORMATION" linkBase="/information">
            <Link
              as={RouterLink}
              to="/information/placeholder1"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
            <Link
              as={RouterLink}
              to="/information/placeholder2"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
            <Link
              as={RouterLink}
              to="/information/placeholder3"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              placeholder
            </Link>
          </Dropdown>
        </Flex>

        <Spacer />

        {/* Profile image instead of avatar or sign-out button */}
        <Box mx={2}>
          <Link as={RouterLink} to="/profile">
            <Image
              src="/profile-icon.png" // Replace with your profile image path or URL.
              alt="Profile"
              boxSize="32px"
              borderRadius="full"
            />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoggedInNavbar;
