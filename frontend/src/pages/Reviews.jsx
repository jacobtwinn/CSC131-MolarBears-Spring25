import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollBoxes from "../components/ui/ScrollBoxes";
import "/src/CSS/Reviews.css";
import { Text, Box, Flex } from "@chakra-ui/react";

const Reviews = () => {
  const [reviewData, setReviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProviderMenu, setShowProviderMenu] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState("None");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [newReview, setNewReview] = useState({ rating: 5, review: "" });

  const toggleReviewForm = () => {
    setShowReviewForm(prev => !prev);
  };

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5001/api/Reviews");

        if (response.data && Array.isArray(response.data.reviews)) {
          const formatted = response.data.reviews.map((item) => ({
            ...item,
            date: item.date ? new Date(item.date).toISOString().slice(0, 10) : "1970-01-01",
            reviewer: item.reviewer || "Reviewer",
            dentist: item.dentist || "Unknown Dentist",
            rating: typeof item.rating === "number" ? item.rating : 0,
            review: item.review || "Review",
          }));
          setReviewData(formatted);
          setError(null);
        } else {
          setReviewData([]);
          setError("No reviews found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/UserInfo");
        if (response.data) {
          setUser({
            firstName: response.data.firstName || "First",
            lastName: response.data.lastName || "Last",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };

    fetchReviewData();
    fetchUserInfo();
  }, []);

  const submitReview = async () => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const reviewToSubmit = {
      reviewer: fullName,
      dentist: selectedDentist,
      rating: newReview.rating,
      review: newReview.review,
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      await axios.post("http://localhost:5001/api/Reviews", reviewToSubmit);
      setReviewData((prevData) => [reviewToSubmit, ...prevData]);
      setShowReviewForm(false);
      setNewReview({ rating: 5, review: "" });
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  const uniqueDentists = [...new Set(reviewData.map((r) => r.dentist))];

  const handleDentistSelect = (name) => {
    setSelectedDentist(name);
    setShowProviderMenu(false);
  };

  const renderProviderDropdown = () => (
    <div className="provider-menu-container">
      <button
        className="provider-button"
        onClick={() => setShowProviderMenu((prev) => !prev)}
      >
        {selectedDentist} ⏷
      </button>
      {showProviderMenu && (
        <div className="provider-menu">
          <div onClick={() => handleDentistSelect("All Provider Reviews")}>
            All Provider Reviews
          </div>
          {uniqueDentists.map((name, index) => (
            <div key={index} onClick={() => handleDentistSelect(name)}>
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderReviewForm = () => {
    if (
      selectedDentist === "All Provider Reviews" ||
      selectedDentist === "None" ||
      !showReviewForm
    ) {
      return null;
    }

    return (
      <Box maxW="600px" mx="auto" mt={4} p={4} bg="gray.100" borderRadius="md">
        <label>
          Rating:
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: Number(e.target.value) })
            }
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <br />

        <textarea
          rows="4"
          placeholder="Write your review..."
          value={newReview.review}
          onChange={(e) =>
            setNewReview({ ...newReview, review: e.target.value })
          }
          style={{ width: "100%", marginTop: "0.5rem" }}
        />

        <br />

        <button onClick={submitReview} className="review-submit-button">
          Submit Review
        </button>

        <button
          onClick={() => setShowReviewForm(false)}
          className="review-cancel-button"
          style={{ marginTop: "0.5rem", backgroundColor: "#e53e3e", color: "white" }}
        >
          Cancel
        </button>
      </Box>
    );
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/Reviews/${id}`);
      setReviewData((prev) => prev.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const filteredReviews =
    selectedDentist === "All Provider Reviews"
      ? reviewData
      : reviewData.filter((r) => r.dentist === selectedDentist);

  return (
    <div className="flex-layout">
      <div className="flex-grow">
        <Box
          bg="blue.400"
          p={4}
          borderRadius="md"
          boxShadow="md"
          maxW="420px"
          mx="auto"
          my={6}
        >
          <Flex align="center" justify="space-between">
            <Text color="black" fontWeight="bold">
              Choose Provider:
            </Text>
            <div>{renderProviderDropdown()}</div>
          </Flex>
        </Box>

        <Text color="white" textAlign="center" fontWeight="bold">
          {selectedDentist === "All Provider Reviews"
            ? "All Reviews"
            : `Reviews for ${selectedDentist}`}
        </Text>

        {reviewSuccess && (
          <Box
            bg="green.400"
            color="white"
            textAlign="center"
            p={2}
            borderRadius="md"
            maxW="400px"
            mx="auto"
            my={4}
            fontWeight="bold"
          >
            ✅ Review submitted successfully!
          </Box>
        )}

        {selectedDentist !== "All Provider Reviews" &&
        selectedDentist !== "None" &&
        !showReviewForm && (
          <Box textAlign="center" mb={4}>
            <button
              onClick={toggleReviewForm}
              className="review-toggle-button"
            >
              Leave a Review for {selectedDentist}
            </button>
          </Box>
        )}

        {renderReviewForm()}
        <br />

        {isLoading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ScrollBoxes
            reviewData={filteredReviews}
            selectedDentist={selectedDentist}
            user={user}
            onDelete={handleDeleteReview}
          />
        )}
      </div>
    </div>
  );
};

export default Reviews;