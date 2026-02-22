import { createFileRoute } from "@tanstack/react-router";
import { getStore } from "@netlify/blobs";
import type { AchievementType } from "~/stores/achievements";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
};

export const Route = createFileRoute("/api/add-achievement")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = (await request.json()) as {
            achievement: AchievementType;
            username: string;
          };
          const { achievement, username } = body;

          if (!username || !achievement) {
            return Response.json(
              { msg: "Missing username or achievement" },
              { status: 400, headers }
            );
          }

          const achievementStore = getStore({ name: "achievements" });
          const existing = await achievementStore
            .get(username, { type: "json" })
            .catch(() => null);
          const currentList: AchievementType[] = Array.isArray(existing)
            ? existing
            : [];

          if (currentList.some((a) => a.id === achievement.id)) {
            return Response.json({ msg: "Already exists" }, { headers });
          }

          achievement.collectedDate = new Date().toISOString();
          const updated = [...currentList, achievement];
          await achievementStore.setJSON(username, updated);

          return Response.json({ msg: "Achievement added" }, { headers });
        } catch (err) {
          console.error(err);
          return Response.json(
            { msg: "Internal error" },
            { status: 500, headers }
          );
        }
      },
    },
  },
});
