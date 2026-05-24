import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ImageKit from "@imagekit/nodejs";
import OpenAI from "openai";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});
app.get("/test", (req, res) => {
  res.send("It works");
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
