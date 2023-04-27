import GptModel from "./lib/chatGPT.js";
import { Template } from "./template/prompt.js";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  console.log("process.env.API_KEY:", process.env.API_KEY);
  const gpt = new GptModel(process.env.API_KEY, process.env.PROXY);

  const result = await gpt.sendMessage(Template.welcome.robot);

  console.log(chalk.bgRed(result.text));
};

main();
