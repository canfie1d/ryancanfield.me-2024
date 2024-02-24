import { Handler } from "@netlify/functions";
import { Redis } from "@upstash/redis";
import { env, headers } from "../config";

export const handler: Handler = async (event) => {
  const redis = new Redis({
    url: env.upstashUrl,
    token: env.upstashToken,
  });

  try {
    await redis.set("achievements", JSON.stringify([]));

    return {
      statusCode: 200,
      headers: headers,
    };
  } catch (err) {
    console.error(err); // output to netlify function log
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify(err),
    };
  }
};
