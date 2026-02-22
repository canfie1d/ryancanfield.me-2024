import { createFileRoute } from "@tanstack/react-router";
import JourneysEnd from "~/pages/JourneysEnd";

export const Route = createFileRoute("/_app/journey-to-eryndor")({
  component: JourneysEnd,
});
