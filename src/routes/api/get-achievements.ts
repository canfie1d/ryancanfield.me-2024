import { createFileRoute } from "@tanstack/react-router";
import { getStore } from "@netlify/blobs";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
};

export const Route = createFileRoute("/api/get-achievements")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const username = url.searchParams.get("user");

        if (!username) {
          return Response.json(
            { msg: "Missing user parameter" },
            { status: 400, headers }
          );
        }

        try {
          const achievementStore = getStore({ name: "achievements" });
          const achievements = await achievementStore
            .get(username, { type: "json" })
            .catch(() => null);

          if (achievements) {
            return Response.json({ achievements }, { headers });
          }
          return Response.json(
            { msg: "No achievements found" },
            { status: 404, headers }
          );
        } catch (err) {
          console.error("Error fetching achievements:", err);
          return Response.json(
            { msg: "Internal error" },
            { status: 500, headers }
          );
        }
      },
    },
  },
});
