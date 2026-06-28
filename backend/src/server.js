import express from "express";
import path from "node:path";
import { FRONTEND_URL, PORT } from "./config/serverConfig.js";
import { connectDB } from "./config/dbConfig.js";
import taskRouter from "./routes/taskRoutes.js";
import cors from "cors";
const app = express();

const __dirname = path.resolve();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});
app.use("/api/v1/task", taskRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
