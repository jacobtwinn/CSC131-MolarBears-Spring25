// AppointmentGuidelines.jsx
import React from "react";
import { Box, Text, VStack, Button, Link } from "@chakra-ui/react";

const AppointmentGuidelines = () => {
  return (
    <Box bg="white" minH="100vh" py={10} px={6}>
      <Box maxW="900px" mx="auto">
        <Text fontSize="5xl" fontWeight="bold" mb={8} textAlign="center">
          Appointment <Text as="span" color="blue.400">Guidelines</Text>
        </Text>

        <VStack align="start" spacing={6} fontSize="lg" color="gray.700">
          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">Scheduling Appointments:</Text> <br />
            Appointments can be booked online through the dashboard or by calling our office. Please book at least 24 hours in advance.
          </Text>

          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">Cancellation Policy:</Text> <br />
            We kindly ask that you notify us at least 24 hours prior to your appointment if you need to cancel or reschedule. Late cancellations may incur a small fee.
          </Text>

          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">Arrival Time:</Text> <br />
            Please arrive 15 minutes early to complete any necessary paperwork and allow time for check-in.
          </Text>

          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">Required Documents:</Text> <br />
            Bring a valid photo ID, insurance information (if applicable), and any recent dental records.
          </Text>

          <Text>
            <Text as="span" fontWeight="bold" color="blue.400">Health and Safety:</Text> <br />
            If you are feeling unwell, please reschedule your appointment. Your health and safety is our top priority.
          </Text>
        </VStack>

        {/* Patient Forms Section */}
        <Box mt={16}>
          <Text fontSize="5xl" fontWeight="bold" mb={8} textAlign="center">
            Patient <Text as="span" color="blue.400">Forms</Text>
          </Text>
          <VStack align="start" spacing={6} fontSize="lg" color="gray.700">
            <Text>
              If you are a first-time patient, we recommend downloading and completing the patient intake form prior to your visit. Completing the form in advance will help expedite your check-in process.
            </Text>
            <Text>
              Alternatively, forms will be available at the front desk if you prefer to fill them out upon arrival. Remember, please plan to arrive 15 minutes early to complete any necessary paperwork before your scheduled appointment time.
            </Text>
            <Button colorScheme="blue" as={Link} href="/new-patient-forms.pdf" download>
              Download Patient Form
            </Button>
          </VStack>
        </Box>

      </Box>
    </Box>
  );
};

export default AppointmentGuidelines;
