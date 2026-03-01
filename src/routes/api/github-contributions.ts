import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/github-contributions")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const username =
          url.searchParams.get("username") ??
          process.env.GITHUB_USERNAME ??
          "canfie1d";
        try {
          const response = await fetch(
            `https://github-contributions.vercel.app/api/v1/${username}`
          );
          const data = await response.json();
          return Response.json(
            { data },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                  "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Methods": "*",
              },
            }
          );
        } catch (err) {
          console.error(err);
          return Response.json(
            { msg: (err as Error).message },
            { status: 500 }
          );
        }
      },
    },
  },
});
