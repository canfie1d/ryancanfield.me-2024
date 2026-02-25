import { createFileRoute } from "@tanstack/react-router";
import SecretRoute from "~/pages/SecretRoute";

export const Route = createFileRoute("/_app/6374")({
  component: () => <SecretRoute achievementId="number_cruncher" />,
});
