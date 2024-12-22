import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);

// Basic error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// General error handling
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
