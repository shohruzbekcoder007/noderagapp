import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);


const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,  // API kalitingizni .env fayldan oling
  load_in_8bit: true,  // 8-bit quantization
  device_map: "auto"
});

export default model;
