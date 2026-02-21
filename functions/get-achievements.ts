import { getStore } from "@netlify/blobs";
import { headers } from "../config";

export const handler = async (req: Request) => {
  const url = new URL(req.url);
  const username = url.searchParams.get("user");

  if (!username) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ msg: "Missing user parameter" }),
    };
  }

  try {
    const achievementStore = getStore({ name: "achievements" });
    const achievements = await achievementStore.get(username, { type: "json" }).catch(() => null);

    if (achievements) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ achievements }),
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ msg: "No achievements found" }),
      };
    }
  } catch (err) {
    console.error("Error fetching achievements:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ msg: "Internal error" }),
    };
  }
};
