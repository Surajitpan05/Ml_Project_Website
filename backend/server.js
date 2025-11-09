import express from "express";
import cors from "cors";
import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// --- Fix for __dirname in ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- Create Express app ---
const app = express();
app.use(cors());
app.use(express.json());

// --- Ensure uploads folder exists ---
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// --- Multer setup for file uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// --- Python command & script path ---
const pythonCmd = process.env.PYTHON || process.env.PYTHON_BIN || "python";
const scriptPath = path.join(__dirname, "model", "run_model.py");

// --- Upload route ---
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;
  console.log("📂 File received:", filePath);

  // --- Spawn Python process ---
  const pythonProcess = spawn(pythonCmd, [scriptPath, filePath], { cwd: __dirname });

  let stdout = "";
  let stderr = "";

  pythonProcess.stdout.on("data", (chunk) => (stdout += chunk.toString()));
  pythonProcess.stderr.on("data", (chunk) => (stderr += chunk.toString()));

  // --- Timeout safety (60s default) ---
  const timeoutMs = Number(process.env.PY_TIMEOUT_MS || 60000);
  const timer = setTimeout(() => pythonProcess.kill("SIGKILL"), timeoutMs);

  pythonProcess.on("close", (code, signal) => {
    clearTimeout(timer);
    fs.unlink(filePath, () => {}); // cleanup file

    if (stderr) console.error("❌ Python stderr:", stderr);

    if (code !== 0) {
      return res
        .status(500)
        .json({ error: stderr || `Python exited with code ${code} (signal: ${signal})` });
    }

    try {
      const parsed = JSON.parse(stdout);
      return res.json(parsed);
    } catch {
      console.warn("⚠️ Could not parse Python stdout as JSON — returning raw output");
      return res.json({ raw: stdout });
    }
  });

  pythonProcess.on("error", (err) => {
    clearTimeout(timer);
    fs.unlink(filePath, () => {});
    console.error("Failed to start Python process:", err);
    res.status(500).json({ error: "Failed to spawn Python process", details: err.message });
  });
});

// --- Serve frontend (dist folder next to backend) ---
const frontendDir = path.join(__dirname, "dist");
if (fs.existsSync(frontendDir)) {
  app.use(express.static(frontendDir));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendDir, "index.html"));
  });
} else {
  app.get("/", (req, res) =>
    res.json({ status: "backend running", message: "No frontend build found in /dist" })
  );
}

// --- Start server ---
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
