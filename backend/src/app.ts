import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Health check (useful for tests & deployment)
app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "API is running" });
});

export default app;
