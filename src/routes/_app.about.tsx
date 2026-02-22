import { createFileRoute } from "@tanstack/react-router";
import About from "~/pages/About";

export const Route = createFileRoute("/_app/about")({
  component: About,
});
