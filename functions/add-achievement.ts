import { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { AchievementType } from "../src/stores/achievements";

const hasAchievement = async (store: any, id: string) => {
  const achievement = await store.getMetadata(id);
  return achievement !== null;
};

export const handler = async (req: Request, context: Context) => {
  try {
    const { username } = context.params;

    const newAchievement = req.body as unknown as AchievementType;

    const achievementStore = await getStore({
      name: username,
      // consistency: "strong",
    });

    if (await hasAchievement(achievementStore, newAchievement.id)) return;

    newAchievement.collectedDate = new Date().toISOString();

    achievementStore.setJSON(username, JSON.stringify(newAchievement));
  } catch (err) {
    return err;
  }
};
