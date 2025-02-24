import { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { headers } from "../config";

export const handler = async (_: Request, context: Context) => {
  const { username } = context.params;
  const achievements = getStore("achievements");

  const data = await achievements.getMetadata(username, {
    // consistency: "strong",
  });

  try {
    if (data) {
      return {
        statusCode: 200,
        headers: headers,
        body: data.metadata,
      };
    } else {
      return {
        statusCode: 404,
        headers: headers,
        body: JSON.stringify({ msg: "No achievements found" }),
      };
    }
  } catch (err) {
    console.error("Error fetching achievements:", err); // output to netlify function log
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify(err),
    };
  }
};
