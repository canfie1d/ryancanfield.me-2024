import { getStore } from "@netlify/blobs";
import { headers } from "../config";
import { AchievementType } from "../src/stores/achievements";

export const handler = async (req: Request) => {
  try {
    const body = await req.json() as { achievement: AchievementType; username: string };
    const { achievement, username } = body;

    if (!username || !achievement) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ msg: "Missing username or achievement" }),
      };
    }

    const achievementStore = getStore({ name: "achievements" });

    const existing = await achievementStore.get(username, { type: "json" }).catch(() => null);
    const currentList: AchievementType[] = Array.isArray(existing) ? existing : [];

    if (currentList.some((a) => a.id === achievement.id)) {
      return { statusCode: 200, headers, body: JSON.stringify({ msg: "Already exists" }) };
    }

    achievement.collectedDate = new Date().toISOString();
    const updated = [...currentList, achievement];

    await achievementStore.setJSON(username, updated);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ msg: "Achievement added" }),
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
