import { getStore } from "@netlify/blobs";
import { headers } from "../config";

export const handler = async (req: Request) => {
  try {
    const body = await req.json() as { username: string };
    const { username } = body;

    if (!username) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ msg: "Missing username" }),
      };
    }

    const achievementStore = getStore({ name: "achievements" });
    await achievementStore.delete(username);

    return {
      statusCode: 200,
      headers,
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ msg: "Internal error" }),
    };
  }
};
