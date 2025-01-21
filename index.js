import express from "express";
import longScript from "./longScript.js"; // Import the long script as an ES module

let scriptRunning = false;

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Route to run the long script
app.get("/run-script", async (req, res) => {
  if (scriptRunning) {
    return res.status(400).json({ message: "Script is already running." });
  }

  try {
    scriptRunning = true;
    const result = await longScript(); // Run the script
    res.json({ message: result });
  } catch (error) {
    console.error("Error executing script:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  } finally {
    scriptRunning = false;
  }
});

// Route to stop the script (if possible)
app.get("/stop-script", (req, res) => {
  if (!scriptRunning) {
    return res.status(400).json({ message: "No script is running." });
  }

  // Here, implement the logic to stop the script if possible
  scriptRunning = false;
  res.json({ message: "Script stopped successfully." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
