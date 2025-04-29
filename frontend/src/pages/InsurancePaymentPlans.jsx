// InsurancePaymentPlans.jsx
import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const InsurancePaymentPlans = () => {
  return (
    <Box bg="white" minH="100vh" py={10} px={6}>
      <Box maxW="900px" mx="auto">
        <Text fontSize="5xl" fontWeight="bold" mb={8} textAlign="center">
          Insurance & <Text as="span" color="blue.400">Payment Plans</Text>
        </Text>

        <VStack align="start" spacing={6} fontSize="lg" color="gray.700">
          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">Accepted Insurance:</Text> <br />
            We work with a wide variety of insurance providers to make your dental care as affordable as possible. If you have questions about your coverage, please call our office before your visit.
          </Text>

          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">In-Network Providers:</Text> <br />
            We are proud to be in-network with many major insurance companies, including Delta Dental, Cigna, MetLife, and Aetna.
          </Text>

          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">Out-of-Network Patients:</Text> <br />
            Even if we are out-of-network with your provider, you may still be eligible for reimbursement. Our front desk staff can help you with necessary forms.
          </Text>

          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">Payment Options:</Text> <br />
            We accept cash, major credit cards, HSA/FSA cards, and CareCredit financing. Full payment is due at the time services are rendered unless prior arrangements have been made.
          </Text>

          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">Flexible Payment Plans:</Text> <br />
            For more extensive treatment plans, we offer flexible payment arrangements to help you budget your dental care. Speak to our financial coordinator for more details.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default InsurancePaymentPlans;
