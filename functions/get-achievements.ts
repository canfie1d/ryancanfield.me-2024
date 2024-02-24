import { Handler } from "@netlify/functions";
import { Redis } from "@upstash/redis";
import { env, headers } from "../config";

const redis = new Redis({
  url: env.upstashUrl,
  token: env.upstashToken,
});

export const handler: Handler = async () => {
  try {
    const response: Response | null = await redis.get("achievements");

    if (response) {
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(response),
      };
    } else {
      return {
        statusCode: 404,
        headers: headers,
        body: JSON.stringify({ msg: "No achievements found" }),
      };
    }
  } catch (err) {
    console.error(err); // output to netlify function log
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify(err),
    };
  }
};
