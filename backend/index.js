import express from "express";
const PORT = process.env.PORT || 3000;

const app = express();
app.get("/test", (req, res) => {
  res.send("It works");
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
