import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
import prisma from "./prisma/prisma.client.js"; // Importing Prisma service

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);

// Basic 404 error handling for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err); // Log the error for debugging
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Start the server
const port = process.env.PORT || 3000;

(async () => {
  try {
    // Initialize Prisma
    await prisma.initialize();

    // Start the Express server
    const server = app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    // Handle graceful shutdown on SIGINT or SIGTERM
    const gracefulShutdown = async () => {
      await prisma.shutdown(); // Disconnect Prisma
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    };

    // Listen for termination signals
    process.on("SIGINT", gracefulShutdown); // Ctrl+C
    process.on("SIGTERM", gracefulShutdown); // Kubernetes or hosting platform signal
  } catch (error) {
    console.error("Error starting the application:", error);
    process.exit(1); // Exit with an error code if Prisma initialization fails
  }
})();
