import { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { headers } from "../config";

export const handler = async (_: Request, context: Context) => {
  try {
    const { username } = context.params;
    const achievements = await getStore("achievements");
    achievements.delete(username);

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
