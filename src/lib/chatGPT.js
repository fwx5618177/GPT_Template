import { ChatGPTAPI } from "chatgpt";
import HttpsProxyAgent from "https-proxy-agent";

const nodeFetch = (url, init) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

export default class GptModel {
  chatGpt;

  constructor(apiKey, proxy) {
    this.proxy = proxy;
    this.chatGpt = new ChatGPTAPI({
      apiKey,
      completionParams: {
        temperature: 0.5,
        top_p: 0.8,
      },
      debug: false,
      fetch: (input, init) => {
        const defaultOptions = {
          agent: this.proxy ? HttpsProxyAgent(this.proxy) : null,
        };

        const mergedOptions = {
          ...defaultOptions,
          ...init,
        };

        return nodeFetch(input, mergedOptions);
      },
    });
  }

  async sendMessage(msg) {
    try {
      const result = await this.chatGpt.sendMessage(msg);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
