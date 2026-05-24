import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ImageKit from "@imagekit/nodejs";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, imageUrl } = req.body;

    console.log(message);
    console.log(imageUrl);

    if (!message && !imageUrl) {
      return res.status(400).json({
        error: "Message or image required",
      });
    }

    let contents = [];

    // text
    if (message) {
      contents.push({
        text: message,
      });
    }

    // image
    if (imageUrl) {
      contents.push({
        fileData: {
          fileUri: imageUrl,
          mimeType: "image/jpeg",
        },
      });
    }

    console.log(contents);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    return res.json({
      reply: response.text,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});
app.get("/auth", (req, res) => {
  const { token, expire, signature } =
    imagekit.helper.getAuthenticationParameters();

  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
});

app.get("/test", (req, res) => {
  res.send("It works");
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
