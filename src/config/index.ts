interface ConfigProps {
  apiKey: string;
  proxy: string;
}

export const Config = {
  apiKey: process.env.API_KEY || "",
  proxy: process.env.PROXY || "",
} as const satisfies ConfigProps;
