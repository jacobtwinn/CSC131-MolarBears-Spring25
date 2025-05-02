// components/LoggedInNavbar.jsx
import React from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  HStack,
  Link,
  Image,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

// Custom dropdown component with active styling.
const Dropdown = ({ title, linkBase, children }) => {
  const location = useLocation();
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

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
    window.location.reload();
  };

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

          {/* Appointment dropdown */}
          <Dropdown title="APPOINTMENT">
            <Link
              as={RouterLink}
              to="/appointments"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              Book an Appointment
            </Link>
            <Link
              as={RouterLink}
              to="/visit-history"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              Visit History
            </Link>
            <Link
              as={RouterLink}
              to="/appt-guidelines"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              Guidelines/Forms
            </Link>
          </Dropdown>

          {/* Financials dropdown */}
          <Dropdown title="FINANCIALS">
            <Link
              as={RouterLink}
              to="/financial-history"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              Financial History
            </Link>
            <Link
              as={RouterLink}
              to="/payment-info"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              Payment Info
            </Link>
            <Link
              as={RouterLink}
              to="/financials/placeholder3"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              Placeholder
            </Link>
          </Dropdown>

          {/* Information dropdown */}
          <Dropdown title="INFORMATION">
            <Link
              as={RouterLink}
              to="/reviews"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              Provider Reviews
            </Link>
            <Link
              as={RouterLink}
              to="/about"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              About Us
            </Link>
            <Link
              as={RouterLink}
              to="/faq"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              FAQs
            </Link>
            <Link
              as={RouterLink}
              to="/information/placeholder1"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              Placeholder
            </Link>
            <Link
              as={RouterLink}
              to="/information/placeholder2"
              display="block"
              p={2}
              _hover={{ bg: "gray.100" }}
            >
              Placeholder
            </Link>
          </Dropdown>
        </Flex>

        <Spacer />

        {/* Profile image */}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={
              <Image
                src="/profile-icon.png"
                alt="Profile"
                boxSize="32px"
                borderRadius="full"
              />
            }
            variant="ghost"
            _hover={{ bg: "gray.100" }}
          />
          <MenuList>
            <MenuItem as={RouterLink} to="/user-info">
              Edit Account
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default LoggedInNavbar;
