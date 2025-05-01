// FAQ.jsx
import React from "react";
import {
  Box,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Center,
} from "@chakra-ui/react";

const FAQ = () => {
  return (
    <Box bg="white" minH="100vh" py={10} px={6}>
      <Center>
        <Text fontSize="6xl" fontWeight="bold" mb={10} color="blue.400">
          FREQUENTLY ASKED QUESTIONS
        </Text>
      </Center>

      <Box maxW="900px" mx="auto">
        <Accordion allowMultiple>
          {/* FAQ 1 */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "blue.100" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  How do I book a dental appointment?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              You can book an appointment online through your user dashboard or by calling our office directly at 1-800-123-4567.
            </AccordionPanel>
          </AccordionItem>

          {/* FAQ 2 */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "blue.100" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  What should I bring to my first visit?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Please bring a valid ID, your insurance information (if applicable), and any medical history details we should know about.
            </AccordionPanel>
          </AccordionItem>

          {/* FAQ 3 */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "blue.100" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  How can I view or pay my balance online?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              After logging in, navigate to the Financials section and select "Financial History" to view and pay your balance securely.
            </AccordionPanel>
          </AccordionItem>

          {/* FAQ 4 */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "blue.100" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  How do I reset my password if I forget it?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Click "Forgot Password" on the login page, enter your registered email, and follow the instructions to reset your password.
            </AccordionPanel>
          </AccordionItem>

          {/* FAQ 5 */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "blue.100" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Can I leave a review for my dentist?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Absolutely! After your appointment, head to the Reviews section to leave feedback for your provider.
            </AccordionPanel>
          </AccordionItem>

        </Accordion>
      </Box>
    </Box>
  );
};

export default FAQ;
