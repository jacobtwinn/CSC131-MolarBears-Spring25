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

const About = () => {
  return (
    <Box bg="white" minH="100vh">
      <Grid templateRows="repeat(2, 1fr)" templateColumns="3fr 2fr" columnGap={1}>
        <GridItem colSpan={1}>
          <Box maxW="1200px" textAlign="justify" px={40} mt={20} mb={9}>
            <Text color="black" fontSize="6xl" fontWeight="bold" textAlign="center" mb={12}>
              ABOUT US
            </Text>
            <Text color="black" fontSize="lg">
              Dental clinic management entails a number of intricate administrative duties, such as arranging appointments, recording treatments, 
              managing patient records, and assessing employee performance. Conventional approaches to managing these procedures frequently lead to 
              mistakes, which cause operational difficulties and patient frustration. For orthodontic services to effectively manage a variety of 
              interactions, a strong, user-friendly management system is required.
              <br /><br />
              Our group, The Molar Bears, suggests the Dentist Clinic Management System (DCMS), a centralized digital platform made to optimize clinic 
              operations, as a solution to these problems. The system will offer a user-friendly interface for managing dental staff work hours, tracking 
              treatments, keeping thorough patient records, and making appointments. Our DCMS will improve operational efficiency and guarantee proper 
              salary management by including automated payroll calculations.
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={1} display="flex" justifyContent="left">
          <Box w="55%" h="auto" mt={52}>
            <Image 
              src="/logo.png" 
              objectFit="cover" 
              w="100%"
              h="auto"
            />
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box maxW="1850px" textAlign="justify" px={40}>
            <Text color="black" fontSize="lg">
              Outdated or poor record-keeping practices are the root cause of administrative issues in many dental clinics. Double bookings, appointment conflicts,
              and trouble collecting patient histories are all common problems with manual scheduling systems. In the same way, manually recording employee hours 
              and figuring out payment raises the possibility of mistakes, which could result in inaccurate salary payments and conflicts.
              <br /><br />
              Current options, like basic clinic management tools or scheduling software, frequently don't integrate staff work hours, patient records, and financial 
              calculations. Furthermore, financial limitations may make it difficult for smaller clinics to implement complete systems. Our DCMS will close this gap 
              by creating a scalable, user-friendly, personalized platform that offers a unified solution designed especially for dentistry clinics.
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default About;