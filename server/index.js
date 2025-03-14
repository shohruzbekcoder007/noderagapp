import express from "express";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.js";

dotenv.config({ path: "../.env" });

const app = express();
app.use(express.json());

app.use("/chat", chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
