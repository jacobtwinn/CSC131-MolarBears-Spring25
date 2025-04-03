
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

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Flex 
        direction={["column", "row"]} 
        align="center" 
        justify="space-between" 
        maxW="1200px" 
        mx="auto" 
        px={6} 
        py={16}
      >
        {/* Text Content */}
        <VStack 
          align="start" 
          spacing={6} 
          maxW={["100%", "50%"]} 
          pr={[0, 10]}
        >
          <Text 
            fontSize={["3xl", "4xl", "5xl"]} 
            fontWeight="bold" 
            lineHeight="tight"
          >
            Treat Yourself 
            <br />
            with a <Text as="span" color="blue.400">beautiful</Text> 
            <br />
            white smile.
          </Text>

          {/* Service Boxes */}
          <HStack 
            spacing={[4, 6]} 
            mt={6} 
            w="full" 
            align="stretch"
          >
            {/* Preventive Care */}
            <VStack 
              flex={1} 
              align="start" 
              p={4} 
              borderWidth={1} 
              borderRadius="md" 
              borderColor="gray.200"
            >
              <Text fontWeight="bold" color="blue.500">01.</Text>
              <Text fontWeight="semibold">Preventive Care</Text>
              <Button 
                variant="link" 
                color="blue.500" 
                rightIcon={<>→</>}
              >
                Learn More
              </Button>
            </VStack>

            {/* Restorative Care */}
            <VStack 
              flex={1} 
              align="start" 
              p={4} 
              borderWidth={1} 
              borderRadius="md" 
              borderColor="gray.200"
            >
              <Text fontWeight="bold" color="blue.500">02.</Text>
              <Text fontWeight="semibold">Restorative Care</Text>
              <Button 
                variant="link" 
                color="blue.500" 
                rightIcon={<>→</>}
              >
                Learn More
              </Button>
            </VStack>

            {/* Orthodontic Care */}
            <VStack 
              flex={1} 
              align="start" 
              p={4} 
              borderWidth={1} 
              borderRadius="md" 
              borderColor="gray.200"
            >
              <Text fontWeight="bold" color="blue.500">03.</Text>
              <Text fontWeight="semibold">Orthodontic Care</Text>
              <Button 
                variant="link" 
                color="blue.500" 
                rightIcon={<>→</>}
              >
                Learn More
              </Button>
            </VStack>
          </HStack>
        </VStack>

        {/* Image */}
        <Box 
          w={["100%", "50%"]} 
          display={["none", "block"]}
        >
          <Image 
            src="/home_afro.png" 
            alt="Smiling woman" 
            objectFit="cover" 
            borderRadius="lg"
          />
        </Box>
      </Flex>

      {/* Family Care Section */}
      <Flex 
        direction={["column", "row"]} 
        align="center" 
        justify="space-between" 
        maxW="1200px" 
        mx="auto" 
        px={6} 
        py={16}
        gap={10}
      >
        {/* Image */}
        <Box w={["100%", "50%"]}>
          <Image 
            src="/family.jpg" 
            alt="Dental care for family" 
            objectFit="cover" 
            borderRadius="lg"
            boxShadow="md"
          />
        </Box>

        {/* Text Content */}
        <VStack 
          align="start" 
          spacing={6} 
          maxW={["100%", "50%"]}
        >
          <Text 
            fontSize={["3xl", "4xl"]} 
            fontWeight="bold" 
            lineHeight="tight"
          >
            Expert dental care 
            <br />
            for the whole family.
          </Text>

          <Text color="gray.600" lineHeight="tall">
            Regular checkups, cleanings, and dental exams are essential for maintaining good oral health. We offer a full range of preventive care services, including fluoride treatments, dental sealants, and oral cancer screenings. The Bear essentials for a healthy, happy smile! Our new patient information page provides helpful information about what to expect during your first visit and what to bring with you.
          </Text>

          <HStack spacing={4}>
            <Button 
              colorScheme="blue" 
              variant="solid" 
              px={6}
            >
              Read About the Team
            </Button>
            <Button 
              colorScheme="blue" 
              variant="outline" 
              px={6}
            >
              Learn More
            </Button>
          </HStack>
        </VStack>
      </Flex>

      {/* Services Section */}
      <Box 
        bg="blue.50" 
        py={16}
        px={6}
      >
        <Box maxW="1200px" mx="auto">
          <Flex 
            direction={["column", "row"]} 
            align={["start", "center"]} 
            justify="space-between" 
            mb={12}
          >
            {/* Left side heading */}
            <Box maxW={["100%", "40%"]}>
              <Text 
                fontSize={["3xl", "4xl", "5xl"]} 
                fontWeight="bold" 
                lineHeight="tight"
              >
                Everything 
                <br />
                you need 
                <br />
                in one 
                <br />
                place.
              </Text>
            </Box>
          </Flex>

          {/* Services Grid */}
          <Grid 
            templateColumns={["1fr", "1fr", "repeat(3, 1fr)"]} 
            gap={8}
          >
            {/* Preventive Care */}
            <GridItem>
              <VStack align="start" spacing={4}>
                <Box w={12} h={12}>
                  <Image 
                    src="/public/preventive-icon.png" 
                    alt="Preventive Care Icon" 
                    w="full" 
                    h="full" 
                  />
                </Box>
                <Text fontWeight="bold" fontSize="xl">Preventive Care</Text>
                <Text color="gray.600">
                  Regular check-ups and fluoride treatments to prevent tooth decay and gum disease.
                </Text>
              </VStack>
            </GridItem>

            {/* Restorative Care */}
            <GridItem>
              <VStack align="start" spacing={4}>
                <Box w={12} h={12}>
                  <Image 
                    src="/public/restorative-icon.png" 
                    alt="Restorative Care Icon" 
                    w="full" 
                    h="full" 
                  />
                </Box>
                <Text fontWeight="bold" fontSize="xl">Restorative Care</Text>
                <Text color="gray.600">
                  Fillings, crowns, bridges, and dentures to restore damaged or missing teeth. No need to <Text as="span" fontWeight="bold">Bear</Text> the pain, gentle care, every time!
                </Text>
              </VStack>
            </GridItem>

            {/* Orthodontic Care */}
            <GridItem>
              <VStack align="start" spacing={4}>
                <Box w={12} h={12}>
                  <Image 
                    src="/public/orthodontic-icon.png" 
                    alt="Orthodontic Care Icon" 
                    w="full" 
                    h="full" 
                  />
                </Box>
                <Text fontWeight="bold" fontSize="xl">Orthodontic Care</Text>
                <Text color="gray.600">
                  Braces and clear aligners to straighten teeth and correct bite issues.
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
