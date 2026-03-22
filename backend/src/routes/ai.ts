import express from "express";
import axios from "axios";
import multer from "multer";
import fs from "fs";
const pdfParse = require("pdf-parse");

// Configure Multer for basic disk buffering
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/chat", upload.single("file"), async (req, res) => {
  try {
    const message = req.body.message || "";
    const course = req.body.course || "web development";
    const mode = req.body.mode || "Study";
    const file = req.file;

    if (!message && !file) {
      return res.json({ reply: "Message or file is required." });
    }

    let fileContent = "";

    // 5. If file exists, read file content (for now only text/pdf)
    if (file) {
      try {
        if (file.mimetype === "application/pdf") {
          const dataBuffer = fs.readFileSync(file.path);
          const pdfData = await pdfParse(dataBuffer);
          fileContent = pdfData.text;
        } else {
          // Assume .txt or generic plaintext
          fileContent = fs.readFileSync(file.path, "utf8");
        }
      } catch (err) {
        console.error("Error reading file:", err);
      } finally {
        // ALWAYS cleanup the uploaded document immediately after reading it into memory
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    // 6. Combine file content with user message
    let fullInput = message;
    if (fileContent) {
      fullInput = `User message: ${message || "Please analyze this file."}\n\nFile content:\n${fileContent}`;
    }

    let modeInstruction = "";
    if (mode === "Study") {
      modeInstruction = "You are a friendly tutor. Explain simply with examples.";
    } else if (mode === "Explain") {
      modeInstruction = "Explain step-by-step in depth.";
    } else if (mode === "Quiz") {
      modeInstruction = "Generate 3-5 quiz questions with answers.";
    } else if (mode === "Code") {
      modeInstruction = "Help with coding. Provide clean code and explanation.";
    } else if (mode === "Plan") {
      modeInstruction = "Create a learning roadmap for the topic.";
    }

    const finalPrompt = `You are SkillNet AI Mentor.

Use the uploaded file content if provided.
${modeInstruction ? `\n${modeInstruction}\n` : ""}
Explain clearly:

${fullInput}`;

    // 7. Send fullInput to AI instead of just message
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: finalPrompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "No response";

    res.json({ reply });

  } catch (error: any) {
    console.error("AI ERROR:", error.response?.data || error.message);

    if (error.response?.status === 503) {
      return res.json({ reply: "AI is waking up, try again in a few seconds..." });
    }

    return res.json({ reply: "AI is taking too long or failed" });
  }
});

export default router;
