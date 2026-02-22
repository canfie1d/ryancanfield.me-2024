import { createFileRoute } from "@tanstack/react-router";
import Work from "~/pages/Work";

export const Route = createFileRoute("/_app/work")({
  component: Work,
});
