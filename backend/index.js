import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ImageKit from "@imagekit/nodejs";
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
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
