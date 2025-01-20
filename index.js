import express from "express";
import longScript from "./longScript.js"; // Using ES module import

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Route to run the long script
app.get("/run-script", async (req, res) => {
  try {
    const result = await longScript(); // Run the script
    res.json({ message: result });
  } catch (error) {
    console.error("Error executing script:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
