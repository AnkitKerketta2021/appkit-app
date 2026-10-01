import cors from "cors";
import express from "express";

import authRoutes from "./routes/authRoutes.js";
import { ensureUsersFile } from "./utils/userFile.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
  })
);

app.use(
  express.json({
    limit: "10kb"
  })
);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Appkit API is running."
  });
});

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found."
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error."
  });
});

async function startServer() {
  await ensureUsersFile();

  app.listen(PORT, () => {
    console.log(`Appkit API running at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
