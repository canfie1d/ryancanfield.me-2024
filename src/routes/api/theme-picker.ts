import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/theme-picker")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const colors = await request.json().catch(() => undefined);
        const res = await fetch("http://colormind.io/api/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "ui", input: colors }),
        });
        const data = await res.json();
        return Response.json(data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Methods": "*",
          },
        });
      },
    },
  },
});
