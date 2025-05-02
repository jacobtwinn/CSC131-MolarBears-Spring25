import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  IconButton,
  Grid,
  GridItem,
  VStack,
  HStack,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const { userInfo } = useAuth();
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userInfo || !userInfo._id) return;
      try {
        const res = await axios.get(`http://localhost:5001/api/notifications?userId=${userInfo._id}`);
        const unread = res.data.notifications.some((note) => !note.read); // Check for unread notifications
        setHasUnreadNotifications(unread);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, [userInfo]);

  const firstName = userInfo?.firstName || "User";
  const profilePicture = userInfo?.profilePicture || "/default-pfp.jpg";

  return (
    <Box p={8} fontFamily="Arial, sans-serif" position="relative">
      {/* Notification icon */}
      <Box position="absolute" top={4} right={4}>
        <IconButton
          icon={
            <Box position="relative">
              <BellIcon />
              {hasUnreadNotifications && (
                <Badge
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  bg="red.500"
                  borderRadius="full"
                  boxSize="8px"
                />
              )}
            </Box>
          }
          variant="ghost"
          aria-label="Notifications"
          fontSize="24px"
          as={Link}
          to="/notifications"
          _hover={{ bg: "blue.100" }}
          _active={{ bg: "blue.200" }}
        />
      </Box>

      {/* Welcome Header */}
      <Flex align="center" justify="center" direction="column">
        <Text fontSize="4xl" fontWeight="bold">
          Welcome, <Text as="span" color="blue.400">{firstName}!</Text>
        </Text>
        <Image
          src={profilePicture}
          alt="Profile"
          borderRadius="full"
          boxSize="120px"
          mt={4}
        />
      </Flex>

      {/* Content */}
      <Flex
        mt={12}
        gap={10}
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="start"
      >
        {/* Upcoming Visits */}
        <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={4} minW="300px">
          <Text fontWeight="bold" mb={4}>
            Upcoming Visits
          </Text>
          <VStack spacing={3} align="stretch">
            <Box p={3} borderRadius="md">
              <HStack>
                <VStack spacing={0} align="start">
                  <Text fontSize="lg" fontWeight="bold">01</Text>
                  <Text fontSize="sm">April</Text>
                </VStack>
                <Divider orientation="vertical" height="40px" borderColor="blue.400" />
                <Box>
                  <Text fontWeight="semibold">Consultation with Dr. Drill</Text>
                  <Text fontSize="sm">3:30pm - 4:00pm</Text>
                </Box>
              </HStack>
            </Box>
            <Box p={3} borderRadius="md">
              <HStack>
                <VStack spacing={0} align="start">
                  <Text fontSize="lg" fontWeight="bold">15</Text>
                  <Text fontSize="sm">April</Text>
                </VStack>
                <Divider orientation="vertical" height="40px" borderColor="blue.400" />
                <Box>
                  <Text fontWeight="semibold">Wisdom Tooth Surgery</Text>
                  <Text fontSize="sm">8:30am - 11:00am</Text>
                </Box>
              </HStack>
            </Box>
          </VStack>
        </Box>

        {/* Quick Actions */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <Button as={Link} to="/dental-appointments" w="100%" bg="blue.100">
              Book an Appointment
            </Button>
          </GridItem>
          <GridItem>
            <Button as={Link} to="/visit-history" w="100%" bg="blue.200">
              Visit History
            </Button>
          </GridItem>
          <GridItem>
            <Button as={Link} to="/reviews" w="100%" bg="blue.200">
              Employee Manager
            </Button>
          </GridItem>
          <GridItem>
            <Button as={Link} to="/financial-history" w="100%" bg="blue.100">
              AdminPlaceholder
            </Button>
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
};

export default AdminDashboard;
