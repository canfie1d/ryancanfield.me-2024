import { createFileRoute } from "@tanstack/react-router";
import { getStore } from "@netlify/blobs";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
};

export const Route = createFileRoute("/api/delete-achievements")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = (await request.json()) as { username: string };
          const { username } = body;

          if (!username) {
            return Response.json(
              { msg: "Missing username" },
              { status: 400, headers }
            );
          }

          const achievementStore = getStore({ name: "achievements" });
          await achievementStore.delete(username);

          return Response.json({ msg: "Deleted" }, { headers });
        } catch (err) {
          console.error(err);
          return Response.json(
            { msg: "Internal error" },
            { status: 500, headers }
          );
        }
      },
      DELETE: async ({ request }: { request: Request }) => {
        try {
          const body = (await request.json()) as { username: string };
          const { username } = body;

          if (!username) {
            return Response.json(
              { msg: "Missing username" },
              { status: 400, headers }
            );
          }

          const achievementStore = getStore({ name: "achievements" });
          await achievementStore.delete(username);

          return Response.json({ msg: "Deleted" }, { headers });
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
