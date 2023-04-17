import { ChatGPTAPI } from "chatgpt";
import proxy from "https-proxy-agent";
import nodeFetch from "node-fetch";
import { Config } from "../config";

export class GptModel {
  chatGpt: ChatGPTAPI;

  constructor() {
    const apiKey = Config.apiKey;

    this.chatGpt = new ChatGPTAPI({
      apiKey,
      completionParams: {
        temperature: 0.5,
        top_p: 0.8,
      },
      fetch: (input: string, init = {}) => {
        const defaultOptions = {
          agent: proxy(Config.proxy),
        };

        const mergedOptions: RequestInit = {
          ...defaultOptions,
          ...init,
        };

        return nodeFetch(input, mergedOptions as any);
      },
    });
  }

  async sendMessage() {
    try {
      await this.chatGpt.sendMessage("Hello");
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
