import { Link} from "react-router-dom"
import { pageData } from "./pageData"
import { Box, Flex, Text, Button, HStack, Image} from "@chakra-ui/react"

export function Navbar() {
  return (
    <div>
      <Box bg="white" px={6} py={4} boxShadow="sm">
        <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
          {/* Logo */}
          <HStack spacing={2}>
            <Image src="/logo.png" alt="Molar Bears Logo" boxSize="32px" />
            <Text fontWeight="bold" fontSize="xl">
              Molar <Text as="span" color="blue.400">Bears</Text>
            </Text>
          </HStack>

          {/* Navigation Links */}
          {pageData.map((page) => {
            return (
              <Link to={page.path}>
                <Button>
                  {page.name}
                </Button>
              </Link>
            )
          })}

          {/* Log In Button */}
          <Button colorScheme="blackAlpha" variant="solid" px={6}>
            Log In
          </Button>
        </Flex>
      </Box>
    </div>
  );
};