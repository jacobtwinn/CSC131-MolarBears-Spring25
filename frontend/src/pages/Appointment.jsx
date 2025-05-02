// Appointment.jsx (Chakra UI Updated: Calendar Highlights for Booked Dates)
import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  useToast,
  Flex,
  Divider,
  Select,
  Center,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";

const AppointmentPage = () => {
  const toast = useToast();
  const { userInfo } = useAuth();

  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [formTime, setFormTime] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [reason, setReason] = useState("");
  const [provider, setProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState(new Set());

  const formattedDate = date.toISOString().split("T")[0];

  const providerOptions = {
    Cleaning: ["Dr. Drill", "Dr. Molar"],
    Orthodontic: ["Dr. Fang", "Dr. Brace"],
    "Restorative Care": ["Dr. Molar", "Dr. Crown"],
    Other: ["Dr. Drill", "Dr. Fang", "Dr. Molar"],
  };

  useEffect(() => {
    fetchAppointments();
    fetchMarkedDates();
  }, [formattedDate]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        `http://localhost:5001/api/appointments?date=${formattedDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      toast({ title: "Failed to fetch appointments", status: "error" });
    }
  };

  const fetchMarkedDates = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch("http://localhost:5001/api/appointments/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const uniqueDays = new Set(data.map((appt) => new Date(appt.date).toDateString()));
      setMarkedDates(uniqueDays);
    } catch (err) {
      console.error("Failed to load marked dates", err);
    }
  };

  const handleSubmit = async () => {
    if (!formTime || !provider) {
      toast({ title: "Please select a time and provider", status: "warning" });
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId
      ? `http://localhost:5001/api/appointments/${editingId}`
      : `http://localhost:5001/api/appointments`;

    const token = localStorage.getItem("jwtToken");

    try {
      setLoading(true);
      await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: new Date(date).toISOString(),
          time: formTime,
          reason,
          provider,
        }),
      });
      setFormTime("");
      setEditingId(null);
      setReason("");
      setProvider("");
      toast({
        title: `Appointment ${editingId ? "updated" : "booked"}`,
        status: "success",
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      await fetchAppointments();
      await fetchMarkedDates();
    } catch (err) {
      toast({ title: "Submission failed", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (appt) => {
    setFormTime(appt.time);
    setReason(appt.reason || "");
    setProvider(appt.provider || "");
    setEditingId(appt._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwtToken");
    try {
      await fetch(`http://localhost:5001/api/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Appointment cancelled", status: "info" });
      await new Promise((resolve) => setTimeout(resolve, 300));
      await fetchAppointments();
      await fetchMarkedDates();
    } catch (err) {
      toast({ title: "Delete failed", status: "error" });
    }
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let min = 0; min < 60; min += 15) {
        const h = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour < 12 ? "AM" : "PM";
        const mm = min.toString().padStart(2, "0");
        slots.push(`${h}:${mm} ${ampm}`);
      }
    }
    return slots;
  };

  const availableProviders = providerOptions[reason] || [];

  return (
    <Box maxW="800px" mx="auto" mt={8} p={4}>
      <Heading mb={4} color="blue.500" fontSize="2xl" textAlign="center">
        Manage Appointments
      </Heading>

      <Center>
        <Calendar
          onChange={setDate}
          value={date}
          tileDisabled={({ date }) => isWeekend(date)}
          tileContent={({ date }) =>
            markedDates.has(date.toDateString()) ? (
              <Box
                w={2}
                h={2}
                mt={1}
                mx="auto"
                borderRadius="full"
                bg="blue.400"
              />
            ) : null
          }
        />
      </Center>

      <Box mt={6}>
        <Heading size="md" mb={2}>
          {appointments.length ? "Your Appointments" : "No Appointments"} for {date.toDateString()}
        </Heading>
        <VStack align="stretch" spacing={3}>
          {appointments.map((appt) => (
            <Flex
              key={appt._id}
              p={3}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              justify="space-between"
              bg={appt.status === "rescheduled" ? "orange.50" : "gray.50"}
            >
              <Box>
                <Text fontWeight="bold">{appt.time}</Text>
                <Text fontSize="sm">{appt.reason || "General"} w/ {appt.provider}</Text>
              </Box>
              <HStack>
                <Button size="sm" onClick={() => handleEdit(appt)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(appt._id)}>
                  Cancel
                </Button>
              </HStack>
            </Flex>
          ))}
        </VStack>
      </Box>

      <Divider my={6} />

      <Box>
        <Heading size="md" mb={3}>
          {editingId ? "Edit Appointment" : "Book New Appointment"}
        </Heading>
        <VStack spacing={4} align="stretch">
          <Select
            placeholder="Select time"
            value={formTime}
            onChange={(e) => setFormTime(e.target.value)}
          >
            {generateTimeSlots().map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Select service"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="Cleaning">Cleaning</option>
            <option value="Orthodontic">Orthodontic</option>
            <option value="Restorative Care">Restorative Care</option>
            <option value="Other">Other</option>
          </Select>

          <Select
            placeholder="Select provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            isDisabled={!reason}
          >
            {availableProviders.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </Select>

          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
          >
            {editingId ? "Update Appointment" : "Book Appointment"}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AppointmentPage;
