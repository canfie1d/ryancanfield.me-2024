export const env = {
  upstashUrl: process.env.UPSTASH_REDIS_REST_URL || "",
  upstashToken: process.env.UPSTASH_REDIS_REST_TOKEN || "",
};

export const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Max-Age": "2592000",
  "Access-Control-Allow-Credentials": "true",
};
