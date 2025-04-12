import fetch from "node-fetch"; // Ensure you have installed node-fetch

const testResetPassword = async () => {
  const response = await fetch("http://localhost:5001/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: "ethanwardlow@gmail.com" }),
  });

  const data = await response.json();
  console.log("Response from server:", data);
};

testResetPassword().catch((error) => console.error("Error:", error));